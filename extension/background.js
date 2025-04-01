console.log("Background script loaded");
console.log("chrome.runtime.sendMessage available:", typeof chrome.runtime.sendMessage === 'function');

chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "SAVE_CREDENTIALS") {
        const { website, username, password } = message.data;
        chrome.storage.local.get(['access_token'], (result) => {
            const token = result.access_token;
            if (!token) {
                sendMessageIfPossible({
                    type: "NO_TOKEN",
                    message: "Please log in to your safePass account to save your credentials!"
                });
                return;
            }

            fetch('http://localhost:5000/api/save-detected-credentials', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ website, username, password })
            })
            .then(response => {
                if (!response.ok) {
                    if (response.status === 401) {
                        sendMessageIfPossible({
                            type: "NO_TOKEN",
                            message: "Please log in to your safePass account to save your credentials!"
                        });
                        return null;
                    }
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    console.log("Credentials saved:", data);
                    sendMessageIfPossible({
                        type: "SAVE_SUCCESS",
                        message: "Credentials saved successfully!"
                    });
                }
            })
            .catch(error => {
                console.error("Error saving credentials:", error);
                sendMessageIfPossible({
                    type: "SAVE_ERROR",
                    message: `Failed to save credentials: ${error.message}`
                });
            });
        });
    }
});

function sendMessageIfPossible(message) {
    try {
        chrome.runtime.sendMessage(message, (response) => {
            if (chrome.runtime.lastError) {
                console.log("No receiver for message:", message.type, chrome.runtime.lastError.message);
            } else {
                console.log("Message sent successfully:", message.type, response);
            }
        });
    } catch (error) {
        console.error("Failed to send message:", error);
    }
}
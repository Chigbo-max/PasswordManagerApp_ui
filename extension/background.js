
const runtime = typeof browser !== 'undefined' ? browser : chrome;

runtime.runtime.onMessage.addListener((message) => {
    if (message.type === "SAVE_CREDENTIALS") {
        const { website, username, password } = message.data;
        runtime.storage.Local.get(['token'], (result) => {
            const token = result.token;
            fetch('http://localhost:5000/save-detected-credentials', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify({ website, username, password })
            })
                .then(response => {
                    if (!response.ok) {
                        if (response.status === 401) {
                            runtime.runtime.sendMessage({
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
                        runtime.runtime.sendMessage({
                            type: "SAVE_SUCCESS",
                            message: "Credentials saved successfully!"
                        });

                    }
                })
                .catch(error => {
                    console.error("Error saving credentials:", error);
                    runtime.runtime.sendMessage({
                        type: "SAVE_ERROR",
                        message: `Failed to save credentials: ${error.message}`
                    })
                })

        })
    }
})



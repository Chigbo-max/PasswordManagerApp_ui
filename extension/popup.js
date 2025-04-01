document.getElementById('login').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, master_password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            chrome.storage.local.set({ access_token: data.access_token }, () => {
                document.getElementById('status').textContent = "Logged in! Try resubmitting to save credentials.";
                console.log("Access token stored:", data.access_token);
            });
        } else {
            document.getElementById('status').textContent = "Login failed: " + (data.message || "Unknown error");
        }
    })
    .catch(error => {
        document.getElementById('status').textContent = "Error: " + error.message;
    });
});

chrome.runtime.onMessage.addListener((message) => {
    const statusDiv = document.getElementById('status');
    if (message.type === "NO_TOKEN") {
        statusDiv.textContent = message.message;
    } else if (message.type === "SAVE_SUCCESS") {
        statusDiv.textContent = message.message;
    } else if (message.type === "SAVE_ERROR") {
        statusDiv.textContent = message.message;
    }
});
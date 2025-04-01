console.log("Content script loaded on:", window.location.href);
console.log("Chrome runtime available at load:", typeof chrome.runtime.sendMessage === 'function');

document.addEventListener("submit", (event) => {
    event.preventDefault(); 
    console.log("Submit event triggered");
    const form = event.target;
    if (form.tagName === "FORM") {
        const usernameInput = form.querySelector(
            "input[type='email'], input[name='email'], input[name='username'], input[id*='user'], input[name='login']"
        );
        const passwordInput = form.querySelector("input[type='password']");
        if (usernameInput && passwordInput && usernameInput.value && passwordInput.value) {
            const username = usernameInput.value;
            const password = passwordInput.value;
            const website = window.location.hostname;
            // console.log("Login detected:", { website, username, password });
            console.log("Chrome runtime available at submit:", typeof chrome.runtime.sendMessage === 'function');
            try {
                chrome.runtime.sendMessage({
                    type: "SAVE_CREDENTIALS",
                    data: { website, username, password }
                }, (response) => {
                    console.log("Message sent, response:", response);
                });
            } catch (error) {
                console.error("Error sending message:", error);
            }
        } else {
            console.log("No valid username/password fields found in form");
        }
    }
});
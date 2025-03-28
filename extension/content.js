

const runtime = typeof browser !== 'undefined'? browser: chrome;

doucument.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    if (form.tagName === "FORM"){
        const usernameInput = form.querySelector("input[type='email'], input[name='email'], input[name='username']");
        const passwordInput = form.querySelector("input[type='password']");
        if(usernameInput && passwordInput){
            const username = usernameInput.value;
            const password = passwordInput.value;
            const website = window.location.hostname;
            runtime.runtime.sendMessage({
                type: "SAVE_CREDENTIALS",
                data:{website,username, password}
            })
        }
    } 
})
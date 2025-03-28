
const runtime = typeof browser !== 'undefined' ? browser : chrome;

document.getElementById('login').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, master_password: password})
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'successs'){
            runtime.storage.local.set({ token: data.access_token }, () => {
                document.getElementById('status').textContent = "Logged in! Try resubmitting to save credentials.";
        });
    }else{
        document.getElementById('status').textContent = "Login failed.";

    }
    })
    .catch(error =>{
        document.getElementById('status').textContent = "Error: " + error.message;
    });

});

runtime.runtime.onMessage.addListener((message)=>{
    const statusDiv =  document.getElementById('status');
    if (message.type === "NO_TOKEN"){
        statusDiv.textContent = message.message;
    } else if (message.type === "SAVE_SUCCESS"){
        statusDiv.textContent = message.message;
    }else if (message.type === "SAVE_ERROR"){
        statusDiv.textContent = message.message;
    }
});







    async function init() {
        await downloadFromServer();
        users = JSON.parse(backend.getItem('users')) || [];

    }
    /*
async function init() {
    setURL("http://juan-desantos.developerakademie.net/Join/smallest_backend_ever");
    await downloadFromServer();
    users = (await JSON.parse(backend.getItem("users"))) || [];
    currentUser = (await JSON.parse(backend.getItem("currentUser"))) || [];

    checkPage();
}*/

function checkPage() {
    let url = window.location.pathname;
    
    if (url == "/index.html"){
        login();
    }
}
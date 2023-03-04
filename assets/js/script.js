/**
 * load server
 */
async function init() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

/**
 * check site
 */
function checkPage() {
    let url = window.location.pathname;
    if (url == "/index.html") {
        login();
    };
}
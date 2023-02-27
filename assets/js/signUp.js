let users = [
    {
        'name': 'Test Account',
        'email': 'test@test.de',
        'password': 'test12',
    }
];

/**
 * create a user
 */
async function signUp() {

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    let searchExistingEmail = users.find(u => u.email == email);

    if (searchExistingEmail) {
        userAlreadyExists();
    } else {
        users.push({ 'name': name, 'email': email.toLowerCase(), 'password': password });
        pushUsersToServer();

        setTimeout(() => {
            showLoginAfterSignup();
        }, 500);
    }
}

/**
 * save the user to server
 */
function pushUsersToServer() {
    backend.setItem('users', JSON.stringify(users));
}

/**
 * show window login after sign up
 */
function showLoginAfterSignup() {
    window.location.href = 'index.html';
}

/**
 * alert user exists
 */
function userAlreadyExists() {
    alert('already exist');
}

/**
 * Mshow login window
 */
function backToLogin() {
    window.location.href = 'index.html';
}
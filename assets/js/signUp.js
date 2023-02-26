let users = [
    {
        'name': 'Test Account',
        'email': 'test@test.de',
        'password': 'test12',
    }
];

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

 function pushUsersToServer() {
     backend.setItem('users', JSON.stringify(users));
}

function showLoginAfterSignup() {
    window.location.href = 'index.html';
}

function userAlreadyExists() {
    alert('already exist');
}


function backToLogin() {
    window.location.href = 'index.html';
}
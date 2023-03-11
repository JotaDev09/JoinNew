let rememberMe = false;

function activePwField() {
    // Get a reference to the password field and image
    var passwordField = document.getElementById("password");
    var image = document.getElementById("passwordImg");

    // Add an event listener to the password field to listen for the input event
    passwordField.addEventListener("input", function () {
        // If the password field has a value, change the image
        if (passwordField.value) {
            image.src = "./assets/img/hide.svg";
        }
        // If the password field is empty, change the image back to the default
        else {
            image.src = "./assets/img/lock.svg";
        }
    });
}

/**
 * init from server
 */
async function init() {
    await downloadFromServer();
    users = (await JSON.parse(backend.getItem("users"))) || [];
    activePwField();
}

/**
 * animated Join logo
 */
function animatedLogo() {
    if (window.matchMedia("(max-width: 480px)").matches) {
        document.getElementById("logo").style =
            "transform: translateX(-100%) translateY(-100%); left: 20px; top: 20px; scale: 0.4;";
    } else {
        document.getElementById("logo").style =
            "transform: translateX(-100%) translateY(-100%); left: 120px; top: 130px; scale: 1.0;";
    }
    showLogin();
}

/**
 * show login window
 */
function showLogin() {
    setTimeout(() => {
        document.getElementById("login-container").classList.remove("d-none");
    }, 900);
}

/**
 * show sign up window
 */
function showSignup() {
    window.location.href = "signup.html";
}


function toggleVisibility() {
    var passwordField = document.getElementById("password");
    var image = document.getElementById("passwordImg");

    // Get the current type of the password field (should be "password")
    var currentType = passwordField.type;

    // If the current type is "password", change it to "text" to show the password
    if (currentType == "password") {
        passwordField.type = "text";
        image.src = "./assets/img/eye.svg";
    }
    // If the current type is "text", change it back to "password" to hide the password again
    else {
        passwordField.type = "password";
        image.src = "./assets/img/hide.svg";
    }
}

/**
 * load message
 */
function loadMessage() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get("msg");
    if (msg) {
        msgBox.innerHTML = msg;
    }
}

/**
 * show log out
 */
function showLogOut() {
    let log_out = document.getElementById("log_out");
    if (log_out.classList.contains("d-none")) {
        log_out.style.animation = "fade_in 0.5s ease-in-out";
        log_out.classList.remove("d-none");
    } else {
        log_out.style.animation = "fade_out 0.5s ease-out";
        setTimeout(() => {
            log_out.classList.add("d-none");
        }, 400);
    }
}

/**
 * log in
 */
async function logIn() {
    await downloadFromServer();
    users = (await JSON.parse(backend.getItem("users"))) || [];
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let loggedUser = users.find(
        (u) => u.email == email && u.password == password
    );
    let existingEmail = users.find((u) => u.email == email);
    if (loggedUser) {
        localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
        await backend.setItem("users", JSON.stringify(users))
        window.location.href = "summary.html";
    } else if (!existingEmail) {
        showMessage("Email not found");
    } else {
        showMessage("Password not correct");
    }
}

/**
 * show an animated message for the user
 * @param {string} message Message-variable with the text that will be displayed
 */
function showMessage(message) {
    document.getElementById("login-response-text").innerHTML = message;
    document
        .getElementById("login-response")
        .classList.add("animated-login-response");
    document.getElementById("login-response").classList.remove("d-none");
    document.getElementById("bgByResponse").classList.remove("d-none");

    setTimeout(function () {
        //Lets the message disappear after 1500ms
        document.getElementById("bgByResponse").classList.add("d-none");
        document.getElementById("login-response").classList.add("d-none");
    }, 1500);
}

/**
 * loguin as guest
 */
function loginAsGuest() {
    document.getElementById("email").value = ""; // to prevent login to be executed
    document.getElementById("password").value = ""; // to prevent login to be executed
    localStorage.clear();
    window.location.href = "summary.html";
}


/**
 * reset password form
 */
function resetPasswordForm() {
    window.location.href = "resetPassword2.html";
}

/**
 * remember user
 */
function rememberUser() {
    let checkbox = document.getElementById("remember");
    if (checkbox.checked == true) {
        member = document.getElementById("email").value;
    } else {
        checkbox.checked = false;
    }
}

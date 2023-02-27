var inProgressTasksNr = 0;
var toDoTasksNr = 0;
var awaitFeedbackTasksNr = 0;
var doneTasksNr = 0;
var boardTasksNr = 0;
var urgentTasksNr = 0;
var member;

var menuIsOpen = false;


//open summary
function summary() {
    window.location.href = "summary.html";
}

//open board
function board() {
    window.location.href = "board.html";
}

//open addTask
function addTask() {
    window.location.href = "add_task.html";
}

//open contacts
function contacts() {
    window.location.href = "contacts.html";
}

//open legal notice
function legal() {
    document.getElementById("legal").classList.add("menu_dark");
    document.getElementById("contacts").classList.remove("menu_dark");
    document.getElementById("summary").classList.remove("menu_dark");
    document.getElementById("board").classList.remove("menu_dark");
    document.getElementById("addTask").classList.remove("menu_dark");
    window.location.href = "legal.html";
}

//open help site
function help() {
    document.getElementById("help").classList.add("d-none");
    window.location.href = "help.html";
}

//show log out
function user() {
    if (menuIsOpen) {
        document.getElementById("log_out").classList.add("d-none-float");
        document.getElementById("log_out").classList.remove("d-flex-float");
        document.getElementById("BGActive").classList.add("d-none");
        menuIsOpen = false;
    } else {
        document.getElementById("log_out").classList.remove("d-none-float");
        document.getElementById("log_out").classList.add("d-flex-float");
        document.getElementById("BGActive").classList.remove("d-none");
        menuIsOpen = true;
    }
}

//user log out
function logOut() {
    window.location.href = "index.html";
    //document.getElementById("email").value = member;
}

//greeting login
function greetUser() {
    greetAccordingToDayTime();
    greetUserName();
}

//greeting according with the time
function greetAccordingToDayTime() {
    var currentTime = new Date().getHours();
    if (currentTime < 12) {
        document.getElementById("greetText").innerHTML = "Good morning";
    } else if (currentTime < 18) {
        document.getElementById("greetText").innerHTML = "Good afternoon";
    } else {
        document.getElementById("greetText").innerHTML = "Good evening!";
    }
}

//greeting user name login
function greetUserName() {
    let loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
        document.getElementById("loggedUserName").innerHTML =
            loggedUser["name"];
    } else {
        document.getElementById("loggedUserName").innerHTML = "Guest";
    }
}

async function summaryUpdate() {
    await downloadFromServer();
    await loadTasks();
    loadPositionFrimBoard();
    renderNumberInSummary();
}

//load position frame
function loadPositionFrimBoard() {
    for (let i = 0; i < allTasks.length; i++) {
        const boardTasks = allTasks[i];
        if (boardTasks["position"] == "inProgress") {
            inProgressTasksNr++;
        }
        if (boardTasks["position"] == "todo") {
            toDoTasksNr++;
        }
        if (boardTasks["position"] == "awaitFeedback") {
            awaitFeedbackTasksNr++;
        }
        if (boardTasks["position"] == "done") {
            doneTasksNr++;
        }
        if (boardTasks["prio"] == "urgent") {
            urgentTasksNr++;
        }
    }
    boardTasksNr = allTasks.length;
}

//render number todos
function renderNumberInSummary() {
    let toDoTasks = document.getElementById("toDoTasks");
    let inProgressTasks = document.getElementById("inProgressTasks");
    let a_f_Tasks = document.getElementById("a_f_Tasks");
    let doneTasks = document.getElementById("doneTasks");
    let tasksInBoard = document.getElementById("tasksInBoard");
    let urgentTasks = document.getElementById("urgentTasks");
    inProgressTasks.innerHTML = `${inProgressTasksNr}`;
    toDoTasks.innerHTML = `${toDoTasksNr}`;
    a_f_Tasks.innerHTML = `${awaitFeedbackTasksNr}`;
    doneTasks.innerHTML = `${doneTasksNr}`;
    tasksInBoard.innerHTML = `${boardTasksNr}`;
    urgentTasks.innerHTML = `${urgentTasksNr}`;
}

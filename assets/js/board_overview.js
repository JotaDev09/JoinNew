const barNames = ["To do", "in progress", "Awaiting feedback", "Done"];
const barIDs = ["todo", "inProgress", "awaitFeedback", "done"];
let taskPosition = [];
//let assigne = [];
//let task = [];
//let subtasks = [];
//const prioList = ["urgent", "medium", "low"];
let subtasksLength = "";
const urgent = "./assets/img/arrows-up.svg";
const medium = "./assets/img/equal-sign.svg";
const low = "./assets/img/arrows-down.svg";
const urgentW = "./assets/img/arrows_up_w.svg";
const mediumW = "./assets/img/equal_sign_w.svg";
const lowW = "./assets/img/arrows_down_w.svg";
let choosenCatColor = "";
let prioColor;
let prioImg;
//let checkUp = "";
let boardPosition;
/*const catColor = [
    "#8AA4FF",
    "#FF0000",
    "#2AD300",
    "#FF8A00",
    "#E200BE",
    "#0038FF",
];*/

/**
 * save task info
 */
function saveTaskInfo() {
    let title = document.getElementById("popUpTitle").value;
    let description = document.getElementById("popUpDescription").value;
    let category = document.getElementById("popUpCategory").innerText;
    let dueDate = document.getElementById("dueDate").value;
    task = {
        title: title,
        description: description,
        category: category,
        prio: priority,
        dueDate: dueDate,
        subtasks: subtasks,
        assignes: assigne,
        position: boardPosition,
    };
}

/**
 * save task in backend
 */
async function saveTasksInBackend() {
    await backend.setItem("allTasks", JSON.stringify(allTasks));
    await backend.setItem("category", JSON.stringify(category));
    await backend.setItem("choosenColor", JSON.stringify(choosenColor));
}

/**
 * check date
 */
function dateChecker() {
    let today = new Date().toISOString().split("T")[0];

    document.getElementById("dueDate").setAttribute("min", today);
}

/**
 * refresh board
 */
function refresh() {
    readPosition();
    dragandDrop();
}

/**
 * load task in board
 */
async function loadTasks() {
    await loadTasksFromBackend();
    readPosition();
    dragandDrop();
}

/**
 * update task
 */
async function updateTask(id) {
    const pos = document.getElementById(`${id}`).parentNode.id;
    allTasks[id].position = `${pos}`;
    await saveTasksInBackend();
    await loadTasksFromBackend();
}

/**
 * load task from backend
 */
async function loadTasksFromBackend() {
    await downloadFromServer();
    allTasks = JSON.parse(backend.getItem("allTasks")) || [];
    choosenColor = JSON.parse(backend.getItem("choosenColor")) || [1, 4, 2, 5];
    category = JSON.parse(backend.getItem("category")) || [
        "Sales",
        "Backoffice",
        "Marketing",
        "Coding",
    ];
    users = JSON.parse(backend.getItem("contacts")) || [];
}

function checkInput() {}

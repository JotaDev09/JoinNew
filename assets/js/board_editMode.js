/**
 * edit taskk render
 */
function editMode(num) {
    boardPosition = allTasks[num].position;
    closePopUp();
    showEditTaskForm(num);
    fillTitle(num);
    fillDescription(num);
    findColor(num);
    checkAssignes(num);
    fillDueDate(num);
    checkPriority(num);
    //fillSubtasks(num);
}

/**
 * show edit task
 */
function showEditTaskForm(num) {
    document.getElementById("addTask_overlap").classList.remove("d-none");
    document.getElementById("bigPopUp").classList.remove("d-none");
    document.getElementById("bigPopUp").querySelector("h1").innerHTML = "Edit Task";
    document.getElementById("sendTask").innerHTML = "Edit Task";
    document.getElementById("sendTask").setAttribute("onclick", `editTaskPopUp(${num})`);
}

/**
 * edit title in task
 */
function fillTitle(num) {
    document.getElementById("popUpTitle").value = allTasks[num].title;
}

/**
 * edit description in task
 */
function fillDescription(num) {
    document.getElementById("popUpDescription").value = allTasks[num].description;
}

/**
 * edit colorin task
 */
function findColor(num) {
    for (let i = 0; i < category.length; i++) {
        if (category[i] == allTasks[num].category) {
            let color = catColor[choosenColor[i]];
            fillCategory(allTasks[num].category, i, color);
        }
    }
}

/**
 * edit category in task
 */
function fillCategory(name, num, color) {
    document.getElementById("popUpCategory").innerHTML = categoryParamPopUp(name, num, color);
    document.getElementById("popUpCategory").querySelector(".list-elements-height").classList.remove("list-elemnt");
    document.getElementById("popUpCategory").innerHTML += addImg();
}

/**
 * edit contact in task
 */
function checkAssignes(num) {
    assigne = allTasks[num].assignes
    expandMenuPopUp("popUpAssigne");
    closeMenuPopUp("popUpAssigne");
}

/**
 * edit date in task
 */
function fillDueDate(num) {
    document.getElementById("dueDate").value = allTasks[num].dueDate;
}

/**
 * edit priority in task
 */
function checkPriority(num) {
    switchBackground(allTasks[num].prio);
}

function fillSubtasks(num) {
    let subtask = document.getElementById("subtasks");
    
    let array = allTasks[num].subtasks;
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        subtasks.push(allTasks[num].subtasks[i]);
        subtask.innerHTML += addThisSubtask(element);
    }
}

/**
 * edit task in pop-up
 */
async function editTaskPopUp(num) {
    checkInputpopUp();
    if (checkUp == true) {
        saveTaskInfo();
        allTasks.splice(num, 1, task);
        saveTasksInBackend();
        subtasks = [];
        assigne = [];
        clearPopUp();
        closeWindow();
        refresh();
    }
}

/**
 * checkbox
 */
function checkbox(param) {
    let box = document.getElementById(`checkSubtask(${param})`);
    if (box.checked == true) {
        box.checked = false;
    } else {
        box.checked = true;
    }
}
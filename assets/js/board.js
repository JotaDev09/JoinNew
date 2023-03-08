let users = [];

/**
 * attaches event listeners to elements with the class "task" (which are intended to be dragged)
 * and elements with the class "column" (which are intended to be the drop targets).
 */
function dragandDrop() {
    const draggables = document.querySelectorAll(".task");
    const droppables = document.querySelectorAll(".column");

    draggables.forEach((task) => {
        task.addEventListener("dragstart", () => {
            task.classList.add("is-dragging"); // give some visual styling, while dragging
        });
        task.addEventListener("dragend", () => {
            task.classList.remove("is-dragging");
        });
    });

    droppables.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
            e.preventDefault(); // Allow the drop to happen

            const bottomTask = insertAboveTask(zone, e.clientY);
            const curTask = document.querySelector(".is-dragging");

            if (!bottomTask) {
                // if we don t have a task on the bottom of current draged task
                zone.appendChild(curTask);
            } else {
                // if we have have a task on the bottom of current task
                zone.insertBefore(curTask, bottomTask); // insert the current task before bottomTask
            }
        });
    });
}

/**
 * The insertAboveTask function is a helper function that is used by the dragandDrop function to determine which
 * task element is closest to a given mouse y-coordinate, when a task element is dragged over a column element.
 * @param {element} zone
 * @param {number} mouseY -  The mouse y-coordinate to use to determine which task element is closest.
 * @returns {element} - the closest Task element to the given mouse y-coordinate
 */
const insertAboveTask = (zone, mouseY) => {
    const taskNotDragging = zone.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffset = Number.NEGATIVE_INFINITY; // closest Position should have negative value

    /**
     * Dieser Code-Block ist eine Schleife, die durch eine Liste von Aufgabenelementen
     * namens taskNotDragging geht. In jeder Iteration holt es die obere Position des aktuellen Aufgabenelements,
     * berechnet den Abstand zwischen der gegebenen mouseY-Koordinate und dieser Position und speichert das
     * Aufgabenelement und den Abstand, wenn es näher an der gegebenen mouseY-Koordinate
     * als das zuvor gefundene Aufgabenelement ist.
     */
    taskNotDragging.forEach((task) => {
        const { top } = task.getBoundingClientRect();

        const offset = mouseY - top;

        if (offset < 0 && offset > closestOffset) {
            closestOffset = offset;
            closestTask = task;
        }
    });
    return closestTask;
};

/**
 * read position kanban
 */
function readPosition() {
    document.getElementById("kanban").innerHTML = "";
    document.getElementById("kanban").innerHTML = kanbanHeader();
    for (i = 0; i < allTasks.length; i++) {
        const section = allTasks[i].position;
        const task = allTasks[i];

        renderTask(section, task, i);
    }
}

/**
 * render tasks
 */
function renderTask(section, task, i) {
    
    //renderSubtasksLength(i);
    chooseColor(i);
    userPrio(i);
    innerHTMLCheck(todo, task);
    //showSubtasks(i); //Shows Subtask if subtask are in the array
    renderUsers(i); //Shows user they invited for this task
    priority = "";
}

/**
 * check input felders task
 */
function innerHTMLCheck(todo, task) {
    todo.innerHTML += taskings(
        i,
        task.title,
        task.description,
        task.category,
        subtasksLength,
        choosenCatColor,
        (prio = priority)
    );
}

/**
 * select priority
 */
function userPrio(num) {
    switch (allTasks[num].prio) {
        case "urgent":
            priority = urgent;
            break;
        case "medium":
            priority = medium;
            break;
        default:
            priority = low;
    }
}

/**
 * choose color category
 */
function chooseColor(num) {
    let cat = allTasks[num].category;
    for (let i = 0; i < category.length; i++) {
        const task = category[i];
        if (cat == task) {
            choosenCatColor = catColor[choosenColor[i]];
        }
    }
}

/**
 * erender subtasks
 */
function renderSubtasksLength(num) {
    const subs = allTasks[num].subtasks;
    subtasksLength = subs.length;
}

/**
 * show subtasks
 */
function showSubtasks(num) {
    const singleTask = allTasks[num].subtasks;

    if (singleTask.length > 0) {
        document
            .getElementById(`taskSubtasks${num}`)
            .classList.remove("d-none");
    }
}

/**
 * @param {string} param
 */
function showAddTaskForm() {
    const addTaskResp = window.matchMedia('(max-width: 500px)');

    if (addTaskResp.matches) {
        document.getElementById('bigPopUp').classList.add('d-none');
        window.location.href = "add_task.html";
    } else {
        bigPopUpResp()
    }
}

/**
 * pop-up responsive
 */
function bigPopUpResp(param) {
    document.getElementById("webpage").classList.add("posFixed");
    boardPosition = param;
    document.getElementById("addTask_overlap").classList.remove("d-none");
    document.getElementById("bigPopUp").classList.remove("d-none");
   // document.getElementById("bigPopUp").querySelector("h1").innerHTML =
    //    "Add Task";
   // document.getElementById("sendTask").innerHTML = "Add Task";
   // document
    //    .getElementById("sendTask")
     //   .setAttribute("onclick", 'addingTaskPopUp("todo")');
    //switchBackground(prioList[2]);
}

/**
 * render users
 */
function renderUsers(num) {
    let member = document.getElementById(`taskUser${num}`);
    member.innerHTML = "";
    let counter = 0;

    for (let i = 0; i < allTasks[num].assignes.length; i++) {
        const assigne = allTasks[num].assignes[i];
        if (counter < 2) {
            renderAllUser(assigne, member);
            counter++;
        } else if (counter == 2) {
            renderOnlyTwoUser(member, num);
            counter++;
        } else if (counter > 3) {
            break;
        }
    }
}

/**
 * render only two users
 */
function renderOnlyTwoUser(member, num) {
    let number = allTasks[num].assignes.length - 2;
    let name = `${number}+`;
    let userColor = "000000";
    member.innerHTML += taskUser(name, userColor);
}

/**
 * render all users
 */
function renderAllUser(assigne, member) {
    for (let i = 0; i < users.length; i++) {
        let thisUser = users[i];
        if (thisUser.name == assigne) {
            let userColor = thisUser.color;
            let name = assigne.substring(0, 2).toUpperCase();
            member.innerHTML += taskUser(name, userColor);
        }
    }
}

/**
 * show tasks from user
 */
function showThisTask(num) {
   // document.getElementById("taskDetail").classList.remove("d-none");
    document.getElementById("taskDetails").classList.remove("d-none");
    renderCurTask(num);
}

/**
 * render tasks
 */
function renderCurTask(num) {
    let curTask = allTasks[num];
    chooseColor(num);
    prioCheck(curTask);
    document.getElementById("taskDetails").innerHTML = "";
    document.getElementById("taskDetails").innerHTML += editTemplate(
        curTask,
        choosenCatColor,
        prioColor,
        prioImg,
        num
    );
    document.getElementById("youngAssigne").innerHTML = assignes();
    renderAssignes(num);
}

/**
 * check priority
 */
function prioCheck(curTask) {
    if (curTask.prio == "urgent") {
        prioColor = "#FF3D01";
        prioImg = urgentW;
    } else if (curTask.prio == "medium") {
        prioColor = "#FFA802";
        prioImg = mediumW;
    } else {
        prioColor = "#7AE229";
        prioImg = lowW;
    }
}

/**
* render contacts
*/
function renderAssignes(num) {
    let curTask = allTasks[num];
    const container = document.getElementById("popUpAssignes");
    container.innerHTML = ""; // Clear any existing paragraphs

    for (let i = 0; i < curTask.assignes.length; i++) {
        const name = curTask.assignes[i];
        const initials = name.substring(0, 2).toUpperCase();
        let color = findUserColor(name);
        container.innerHTML += taskUserwithName(initials, color, name);
    }
}

/**
 * render subtasks
 */
function renderSubtasks(num) {
    let curTask = allTasks[num];
    const container = document.getElementById("popUpSubtasks");
    container.innerHTML = ""; // Clear any existing inserts

    for (let i = 0; i < curTask.subtasks.length; i++) {
        const subtask = curTask.subtasks[i];
        container.innerHTML += taskSubtask(subtask, i);
    }
}

/**
 * find color for user
 */
function findUserColor(name) {
    for (let i = 0; i < users.length; i++) {
        const userName = users[i].name;
        if (userName == name) {
            return (color = users[i].color);
        }
    }
}

/**
 * close pop-up
 */
function closePopUp() {
   // document.getElementById("taskDetail").classList.add("d-none");
    document.getElementById("taskDetails").classList.add("d-none");
}

/**
 * edit title in task
 */
function closeWindow() {
    document.getElementById("addTask_overlap").classList.add("d-none");
    document.getElementById("bigPopUp").classList.add("d-none");
    //document.getElementById("webpage").classList.remove("posFixed");
    clearPopUp();
}

// function doNotCloseWindow(event) {
//     event.stopPropagation();
// }
function findTask() {
    let search = document.getElementById("searched_input").value;
    search = search.toLowerCase().trim();
    const boardTasks = document.querySelectorAll(".task");
    for (let j = 0; j < boardTasks.length; j++) {
        const div = boardTasks[j];
        const pElement = div.querySelector("p");
        const spElement = div.querySelector("span");
        let P_innerHTML = pElement.innerHTML.toLowerCase();
        let SP_innerHTML = spElement.innerHTML.toLowerCase();
        if (P_innerHTML.includes(search) || SP_innerHTML.includes(search)) {
            div.style.display = "block";
        } else {
            div.style.display = "none";
        }
    }
}

/**
 * colorized the background-color of choosen priority button
 * @param {string} prio
 */
function switchBackground(prio) {
    for (i = 0; i < prioList.length; i++) {
        const pref = prioList[i];

        backgroundOff(pref);
    }

    backgroundOn(prio);
    priority = prio;
}

/**
 * switch the background-color of choosen Priority-Button "ON"
 * @param {string} prio
 */
function backgroundOn(prio) {
    if (prio != "") {
        document.getElementById(`${prio}`).classList.add("prio-" + `${prio}`);
        document.getElementById(`${prio}`).classList.add("prio-img");
        document
            .getElementById(`${prio}`)
            .setAttribute("onclick", `backgroundOff("${prio}")`);
    }
}

/**
 * switch the background-color of choosen Priority-Button "OFF"
 * @param {string} prio
 */
function backgroundOff(prio) {
    if (prio != "") {
        document.getElementById(`${prio}`).classList.remove("prio-img");
        document
            .getElementById(`${prio}`)
            .classList.remove("prio-" + `${prio}`);
        document
            .getElementById(`${prio}`)
            .setAttribute("onclick", `switchBackground("${prio}")`);
    }
}

/*
 * show subtask into preview and push it in own array
 */
function addSubtask() {
    let input = document.getElementById("subtaskName").value;
    let subtask = document.getElementById("subtasks");

    if (input != "") {
        subtask.innerHTML += addThisSubtask(input);
        document.getElementById("subtaskName").value = "";
        subtasks.push(input);
    }
}

/**
 * same as subtask but using with enter-key
 */
function addSubtaskHitEnter() {
    document
        .getElementById("subtaskName")
        .addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                addSubtask();
            }
        });
}


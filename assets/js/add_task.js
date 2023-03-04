/**
 * add Tasks
 */
async function addingTask() {
    checkInput();
    if (checkUp == true) {
        saveTaskInfo();
        allTasks.push(task);
        saveTasksInBackend();
        subtasks = [];
        assigne = [];
        clear();
        userFeedback();
    }
}

/**
 * check Input
 */
function checkInput() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("dueDate").value;

    if ((title == "" && description == "" && priority == "" && date == "")) {
        alert(
            "Please enter a Title, Description, Date, Prio and invite a User"
        );
        checkUp = false;
    } else {
        checkUp = true;
    }
}

/**
 * save info form tasks
 */
function saveTaskInfo() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let category = document.getElementById("category").innerText;
    let dueDate = document.getElementById("dueDate").value;
    task = {
        title: title,
        description: description,
        category: category,
        prio: priority,
        dueDate: dueDate,
        subtasks: subtasks,
        assignes: assigne,
        position: "todo",
    };
}

/**
 * save tasks in backend
 */
async function saveTasksInBackend() {
    await backend.setItem("allTasks", JSON.stringify(allTasks));
    await backend.setItem("category", JSON.stringify(category));
    await backend.setItem("choosenColor", JSON.stringify(choosenColor));
}

/**
 * load tasks from backend
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

/**
 *  remove tasks
 */
function removeTasks() {
    window.location.href = "board.html";
}

/**
 * clear task preview
 */
function clear() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("category").innerText = "Select task Category";
    document.getElementById("category").innerHTML += addImg();
    miniMenu("assigne");
    miniMenu("category");
    document.getElementById("dueDate").value = "";
    //document.getElementById("subtaskName").value = "";
    //document.getElementById("subtasks").innerHTML = "";
    document.getElementById("avatar").innerHTML = "";
    switchBackground(prioList[2]);
}

/**
 * add title in tasks
 **/
function addTitleHitEnter() {
    let title = document.getElementById("title");

    if (title.value != "") {
        title.addEventListener("keydown", (event) => {
            if (event.key == "Enter") {
                document.getElementById("description").focus();
            }
        });
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

/**
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

function dateChecker() {
    let today = new Date().toISOString().split("T")[0];

    document.getElementById("dueDate").setAttribute("min", today);
}



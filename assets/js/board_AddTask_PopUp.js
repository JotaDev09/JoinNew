/**
 * ---------------------- Category Section ---------------------------
 */

/**
 * minimize categorylist
 * @param {string} param
 */
function miniMenuPopUp(param) {
    document.getElementById(`${param}`).classList.remove("d-none");
    document.getElementById(`${param}` + "-list").classList.add("d-none");
    document.getElementById(`new-${param}`).classList.add("d-none");
}

/**
 * minimize dropdown and shows the addCategory input
 */
function newCategoryPopUp() {
    miniMenuPopUp("popUpCategory");
    document.getElementById("popUpCategory").classList.add("d-none");
    document.getElementById("new-popUpCategory").classList.remove("d-none");
    colerCode();
}

function showCategoryPopUp(i) {
    let color = catColor[choosenColor[i]];
    document.getElementById("popUpCategory").innerHTML = categoryParam(
        category[i],
        i,
        color
    );
    document.getElementById("popUpCategory").innerHTML += addImg();
    document
        .getElementById("popUpCategory")
        .firstChild.classList.remove("list-elemnt");
    miniMenuPopUp("popUpCategory");
}

// function addCat() {
//     let newCat = document.getElementById("popUpCategoryName").value;
//     let i = category.length;

//     if (newCat != "") {
//         category.push(newCat);
//         appendCategoryPopUp();
//         miniMenuPopUp("popUpCategory");
//         document.getElementById("popUpCategoryName").value = "";
//         showCategoryPopUp(i);
//     } else {
//         miniMenuPopUp("popUpCategory");
//     }
// }

function addCatHitEnter() {
    document
        .getElementById("popUpCategoryName")
        .addEventListener("keyup", (event) => {
            if (event.key == "Enter") {
                addCat();
            }
        });
}

function deleteCat() {
    document.getElementById("popUpCategoryName").value = "";
    document.getElementById("popUpCategory").textContent =
        "Select task Category";
    document.getElementById("popUpCategory").innerHTML += addImg();
    miniMenuPopUp("popUpCategory");
}

/**
 * shows color Buttons under new Category Input
 */
function colerCode() {
    let colors = document.getElementById("colorCode");
    colors.innerHTML = "";
    for (let i = 0; i < catColor.length; i++) {
        const color = catColor[i];

        colors.innerHTML += addColorbtn(color, i);
    }
}

/**
 * --------------------- Assigned to Section ----------------------------
 */

function appendAssignesPopUp(id) {
    let assigne = document.getElementById(id);
    assigne.innerHTML = "";
    assigne.innerHTML += selectAssignePopUp();

    for (let i = 0; i < users.length; i++) {
        const elemnt = users[i].name;

        assigne.innerHTML += assigneParamPopUp(elemnt, i);
    }
    assigne.innerHTML += inviteAssignePopUp();
}

function newAssignePopUp() {
    miniMenuPopUp("popUpAssigne");
    document.getElementById("popUpAssigne").classList.add("d-none");
    document.getElementById("new-popUpAssigne").classList.remove("d-none");
}

function showAssignePopUp(num) {
    let checkbox = document.getElementById("checkbox" + num);

    if (checkbox.checked == true) {
        checkbox.checked = false;
        removeAssigneFromTask(num);
    } else {
        checkbox.checked = true;
        addAssignetoTask(num);
    }
}

function checkAssignePopUp() {
    document.getElementById("avatar").innerHTML = "";
    for (let i = 0; i < users.length; i++) {
        let checkbox = document.getElementById("checkbox" + i);
        const element = users[i].name;
        if (assigne.includes(element)) {
            checkbox.checked = true;
            addAvatar(i);
        }
    }
}

function addAssignetoTask(num) {
    let name = users[num].name;
    //let initials = users[num].name.substring(0, 2).toUpperCase();
    if (assigne.includes(name)) {
        checkAssignePopUp();
    } else {
        assigne.push(name);
        checkAssignePopUp();
    }
}

function removeAssigneFromTask(num) {
    let name = users[num].name;
    let index = assigne.indexOf(name);
    if (index > -1) {
        assigne.splice(index, 1);
    }
    checkAssignePopUp();
}

function addAvatar(num) {
    let name = users[num].name.substring(0, 2).toUpperCase();
    let color = users[num].color;

    document.getElementById("avatar").innerHTML += avatar(name, color);
}

function clearPopUp() {
    document.getElementById("popUpTitle").value = "";
    document.getElementById("popUpDescription").value = "";
    document.getElementById("popUpCategory").innerText = "Select task Category";
    document.getElementById("popUpCategory").innerHTML += addImg();
    miniMenuPopUp("popUpAssigne");
    miniMenuPopUp("popUpCategory");
    backgroundOff(priority);
    document.getElementById("dueDate").value = "";
    //document.getElementById("subtaskName").value = "";
    //document.getElementById("subtasks").innerHTML = "";
    document.getElementById("avatar").innerHTML = "";
}

async function addingTaskPopUp() {
    checkInputpopUp();
    if (checkUp == true) {
        saveTaskInfo();
        allTasks.push(task);
        saveTasksInBackend();
        subtasks = [];
        assigne = [];
        clearPopUp();
        closeWindow();
        refresh();
    }
}

function removeTasksPopUp() {
    subtasks = [];
    assigne = [];
    clearPopUp();
    closeWindow();
}

function checkInputpopUp() {
    let title = document.getElementById("popUpTitle").value;
    let description = document.getElementById("popUpDescription").value;
    let date = document.getElementById("dueDate").value;

    if ((title == "" || description == "" || priority == "" || date == "")) {
        alert(
            "Please enter a Title, Description, Date, Prio and invite a User"
        );
        checkUp = false;
    } else {
        checkUp = true;
    }
}
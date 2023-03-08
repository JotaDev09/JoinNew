/**
 * ---------------------- Category Section ---------------------------
 */

/**
 * minimize categorylist
 * @param {string} param
 */
function miniMenu(param) {
    document.getElementById(`${param}`).classList.remove("d-none");
    document.getElementById(`${param}` + "-list").classList.add("d-none");
    document.getElementById(`new-${param}`).classList.add("d-none");
}

/**
 * minimize dropdown and shows the addCategory input
 */
function newCategoryPopUp() {
    miniMenu("category");
    document.getElementById("category").classList.add("d-none");
    document.getElementById("new-category").classList.remove("d-none");
    colerCode();
}

/**
 * show category in pop-up
 */
function showCategoryPopUp(i) {
    let color = catColor[choosenColor[i]];
    document.getElementById("category").innerHTML = categoryParam(
        category[i],
        i,
        color
    );
    document.getElementById("category").innerHTML += addImg();
    document
        .getElementById("category")
        .firstChild.classList.remove("list-elemnt");
    miniMenu("category");
}

/**
 * add category
 */
function addCatHitEnter() {
    document
        .getElementById("categoryName")
        .addEventListener("keyup", (event) => {
            if (event.key == "Enter") {
                addCat();
            }
        });
}

/**
 * delete category
 */
function deleteCat() {
    document.getElementById("categoryName").value = "";
    document.getElementById("category").textContent =
        "Select task Category";
    document.getElementById("category").innerHTML += addImg();
    miniMenu("category");
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

/**
 * assign contact to pop-up
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

/**
 * new contact pop-up
 */
function newAssignePopUp() {
    miniMenu("assigne");
    document.getElementById("assigne").classList.add("d-none");
    document.getElementById("new-assigne").classList.remove("d-none");
}

/**
 * show contact in pop-up
 */
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

/**
 * check contacts
 */
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

/**
 * add contacto to task
 */
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

/**
 *  remove contact from task
 */
function removeAssigneFromTask(num) {
    let name = users[num].name;
    let index = assigne.indexOf(name);
    if (index > -1) {
        assigne.splice(index, 1);
    }
    checkAssignePopUp();
}

/**
 * add color to task
 */
function addAvatar(num) {
    let name = users[num].name.substring(0, 2).toUpperCase();
    let color = users[num].color;

    document.getElementById("avatar").innerHTML += avatar(name, color);
}

/**
 * erase pop-up
 */
function clearPopUp() {
    document.getElementById("popUpTitle").value = "";
    document.getElementById("popUpDescription").value = "";
    document.getElementById("category").innerText = "Select task Category";
    document.getElementById("category").innerHTML += addImg();
    miniMenu("assigne");
    miniMenu("category");
    backgroundOff(priority);
    document.getElementById("dueDate").value = "";
    //document.getElementById("subtaskName").value = "";
    //document.getElementById("subtasks").innerHTML = "";
    document.getElementById("avatar").innerHTML = "";
}

/**
 * add task
 */
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

/**
 * remove task from pop-up
 */
function removeTasksPopUp() {
    subtasks = [];
    assigne = [];
    clearPopUp();
    closeWindow();
}

/**
 * check input im pop-up
 */
function checkInputpopUp() {
    let title = document.getElementById("popUpTitle").value;
    let description = document.getElementById("popUpDescription").value;
    let date = document.getElementById("dueDate").value;

    if ((title == "" & description == "" & priority == "" & date == "")) {
        alert(
            "Please enter a Title, Description, Date, Prio and invite a User"
        );
        checkUp = false;
    } else {
        checkUp = true;
    }
}
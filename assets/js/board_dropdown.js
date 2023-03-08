/**
 * Open an Dropdown that you can choose a Category
 */
function expandMenuPopUp(id) {
    let button = document.getElementById(id);

    if (button.id == "popUpCategory") {
        button.classList.add("d-none");
        document
            .getElementById("popUpCategory-list")
            .classList.remove("d-none");
        appendCategoryPopUp("popUpCategory-list");
        miniMenuPopUp("popUpAssigne");
    } else {
        button.classList.add("d-none");
        document.getElementById("popUpAssigne-list").classList.remove("d-none");
        appendAssignesPopUp("popUpAssigne-list");
        checkAssignePopUp();
        miniMenuPopUp("popUpCategory");
    }
}

function appendCategoryPopUp(id) {
    let cat = document.getElementById(id);

    cat.innerHTML = "";

    cat.innerHTML += selectCatPopUp();
    cat.innerHTML += addOneCatPopUp();

    for (let i = 0; i < category.length; i++) {
        const elemnt = category[i];
        let color = catColor[choosenColor[i]];

        cat.innerHTML += categoryParamPopUp(elemnt, i, color);
    }
}

function closeMenuPopUp(param) {
    miniMenuPopUp(param);

    if (param == "popUpCategory") {
        document.getElementById("popUpCategory").textContent =
            "Select task Category";
        document.getElementById("popUpCategory").innerHTML += addImg();
    } else {
        document.getElementById("popUpAssigne").textContent =
            "Select contacts to assign";
        document.getElementById("popUpAssigne").innerHTML += addImg();
        checkAssignePopUp();
    }
}

/**
 * ---------------------- Category Section ---------------------------
 */

/**
 * minimize categorylist
 * @param {string} param - assigne or category
 */
function miniMenuPopUp(param) {
    document.getElementById(`${param}`).classList.remove("d-none");
    document.getElementById(`${param}` + "-list").classList.add("d-none");
    document.getElementById("new-" + `${param}`).classList.add("d-none");
}

/**
 * minimize dropdown and shows the addCategory input
 */
//function newCategory() {
//    miniMenuPopUp("popUpCategory");
//    document.getElementById("popUpCategory").classList.add("d-none");
//    document.getElementById("new-popUpCategory").classList.remove("d-none");
//    colerCode();
//}

function showCategory(i) {
    let color = catColor[choosenColor[i]];
    document.getElementById("popUpCategory").innerHTML = categoryParamPopUp(
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

function addCat() {
    let newCat = document.getElementById("popUpCategoryName").value;
    let i = category.length;

    if (newCat != "") {
        category.push(newCat);
        appendCategoryPopUp("popUpCategory");
        miniMenuPopUp("popUpCategory");
        document.getElementById("popUpCategoryName").value = "";
        showCategory(i);
    } else {
        miniMenuPopUp("popUpCategory");
    }
}

/**
 * check if enter is pressed
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

function deleteCat() {
    document.getElementById("popUpCategoryName").value = "";
    document.getElementById("popUpCategory").textContent = "Select task Category";
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
 * Add color to new Category
 * @param {number} num
 */
function colorAdd(num) {
    for (let i = 0; i < choosenColor.length; i++) {
        removeFocusColor(choosenColor[i]);
    }
    let newCat = document.getElementById("popUpCategoryName").value;

    if (newCat != "") {
        choosenColor.push(num);
        focusColor(num);
    } else {
        alert("Please enter a Category Name, bevor you choose a color")
        removeFocusColor(num);
    }
}

function focusColor(num) {
    document.getElementById(`color(${num})`).classList.add("focus");
}

function removeFocusColor(num) {
    document.getElementById(`color(${num})`).classList.remove("focus");
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

function newAssigne() {
    miniMenuPopUp("popUpAssigne");
    document.getElementById("popUpAssigne").classList.add("d-none");
    document.getElementById("new-popUpAssigne").classList.remove("d-none");
}

function showAssigne(num) {
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

/**
 * TODO: add invite function
 */
function newAssigne() {
    miniMenuPopUp("popUpAssigne");
    let assigne = document.getElementById("popUpAssigneName").value;
}

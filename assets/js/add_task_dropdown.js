/**
 * Open an Dropdown that you can choose a Category
 */
function expandMenu(id) {
    let button = document.getElementById(id);

    if (button.id == "category") {
        button.classList.add("d-none");
        document.getElementById("category-list").classList.remove("d-none");
        appendCategory("category-list");
        miniMenu("assigne");
    } else {
        button.classList.add("d-none");
        document.getElementById("assigne-list").classList.remove("d-none");
        appendAssignes("assigne-list");
        checkAssigne();
        miniMenu("category");
    }
}

/**
 * close menu
 */
function closeMenu(param) {
    miniMenu(param);

    if (param == "category") {
        document.getElementById("category").textContent =
            "Select task Category";
        document.getElementById("category").innerHTML += addImg();
    } else {
        document.getElementById("assigne").textContent =
            "Select contacts to assign";
        document.getElementById("assigne").innerHTML += addImg();
        checkAssigne();
    }
}

/**
 * ---------------------- Category Section ---------------------------
 */

/**
 * append of category
 */
function appendCategory(id) {
    let cat = document.getElementById(id);

    cat.innerHTML = "";

    cat.innerHTML += selectCat();
    cat.innerHTML += addOneCat();

    for (let i = 0; i < category.length; i++) {
        const elemnt = category[i];
        let color = catColor[choosenColor[i]];

        cat.innerHTML += categoryParam(elemnt, i, color);
    }
}

/**
 * minimize categorylist
 * @param {string} param - assigne or category
 */
function miniMenu(param) {
    document.getElementById(`${param}`).classList.remove("d-none");
    document.getElementById(`${param}` + "-list").classList.add("d-none");
    document.getElementById("new-" + `${param}`).classList.add("d-none");
}

/**
 * minimize dropdown and shows the addCategory input
 */
function newCategory() {
    miniMenu("category");
    document.getElementById("category").classList.add("d-none");
    document.getElementById("new-category").classList.remove("d-none");
    colerCode();
}

/**
 * show category
 */
function showCategory(i) {
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
 * add new category
 */
function addCat() {
    let newCat = document.getElementById("categoryName").value;
    let i = category.length;

    if (newCat != "") {
        category.push(newCat);
        appendCategory("category");
        miniMenu("category");
        document.getElementById("categoryName").value = "";
        showCategory(i);
    } else {
        miniMenu("category");
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

/**
 * delete category
 */
function deleteCat() {
    document.getElementById("categoryName").value = "";
    document.getElementById("category").textContent = "Select task Category";
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
 * Add color to new Category
 * @param {number} num
 */
function colorAdd(num) {
    for (let i = 0; i < choosenColor.length; i++) {
        removeFocusColor(choosenColor[i]);
    }
    let newCat = document.getElementById("categoryName").value;

    if (newCat != "") {
        choosenColor.push(num);
        focusColor(num);
    } else {
        alert("Please enter a Category Name, bevor you choose a color");
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

/**
 * append contacts
 */
function appendAssignes(id) {
    let assigne = document.getElementById(id);
    assigne.innerHTML = "";
    assigne.innerHTML += selectAssigne();

    for (let i = 0; i < users.length; i++) {
        const elemnt = users[i].name;

        assigne.innerHTML += assigneParam(elemnt, i);
    }
    assigne.innerHTML += inviteAssigne();
}

/**
 * new contact
 */
function newAssigne() {
    miniMenu("assigne");
    document.getElementById("assigne").classList.add("d-none");
    document.getElementById("new-assigne").classList.remove("d-none");
}

/**
 * show contact
 */
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

/**
 * check contact
 */
function checkAssigne() {
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
 * add contact to task
 */
function addAssignetoTask(num) {
    let name = users[num].name;
    //let initials = users[num].name.substring(0, 2).toUpperCase();
    if (assigne.includes(name)) {
        checkAssigne();
    } else {
        assigne.push(name);
        checkAssigne();
    }
}

/**
 * remove contact from task
 */
function removeAssigneFromTask(num) {
    let name = users[num].name;
    let index = assigne.indexOf(name);
    if (index > -1) {
        assigne.splice(index, 1);
    }
    checkAssigne();
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
 * new contact
 */
function newAssigne() {
    miniMenu("assigne");
    let assigne = document.getElementById("assigneName").value;
}

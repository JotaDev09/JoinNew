/**
 * Open an Dropdown that you can choose a Category
 */
function expandMenuPopUp(id) {
  let button = document.getElementById(id);

  if (button.id == "popUpCategory") {
      button.classList.add("d-none");
      document.getElementById("popUpCategory-list").classList.remove("d-none");
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

/**
* ---------------------- Category Section ---------------------------
*/

/**
*
*/
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

/**
* minimize categorylist
* @param {string} param
*/
function miniMenuPopUp(param) {
  document.getElementById(`${param}`).classList.remove("d-none");
  document.getElementById(`${param}` + "-list").classList.add("d-none");
}

/**
* minimize dropdown and shows the addCategory input
*/
function newCategoryPopUp() {
  miniMenuPopUp("category");
  document.getElementById("category").classList.add("d-none");
  document.getElementById("new-category").classList.remove("d-none");
  colerCode();
}

/**
 * show the category in drop down
 */
function showCategoryPopUp(i) {
  let color = catColor[choosenColor[i]];
  document.getElementById("popUpCategory").innerHTML = categoryParam(category[i], i, color);
  document.getElementById("popUpCategory").innerHTML += addImg();
  document.getElementById("popUpCategory").firstChild.classList.remove('list-elemnt');
  miniMenuPopUp("popUpCategory");
}

/**
 * add a new category
 */
function addCat() {
  let newCat = document.getElementById("categoryName").value;
  let i = category.length;

  if (newCat != "") {
      category.push(newCat);
      appendCategory();
      miniMenuPopUp("popUpCategory");
      document.getElementById("categoryName").value = "";
      showCategoryPopUp(i);
  } else {
      miniMenuPopUp("PopUpCategory");
  }
}

/**
 * add a name in the category
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
 * delete a new category
 */
function deleteCat() {
  document.getElementById("popUpategoryName").value = "";
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
 * add a color in new category
 */
function colorAdd(num) {
  let newCat = document.getElementById("popUpCategoryName").value;

  if (newCat != "") {
      choosenColor.push(num);
  }
}

/**
 * assigne a new pop-up
 */
function newAssignePopUp() {
  miniMenu('popUpAssigne');
  document.getElementById('popUpAssigne').classList.add('d-none');
  document.getElementById('new-popUpAssigne').classList.remove('d-none');
}

/**
 * show the assigne pop-up
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
 * check pop-up
 */
function checkAssignePopUp() {
  document.getElementById('avatar').innerHTML = "";
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
 * add contact to the tasks
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
 * remove contact from tasks
 */
function removeAssigneFromTask(num) {
  let name = users[num].name;
  let index = assigne.indexOf(name);
  if (index > -1) {
      assigne.splice(index, 1)
  }
  checkAssignePopUp();
}

/**
 * add color to contact
 */
function addAvatar(num) {
  let name = users[num].name.substring(0, 2).toUpperCase();
  let color = users[num].color

  document.getElementById('avatar').innerHTML += avatar(name, color);
}

/**
 * remove task
 */
function removeTasksPopUp() {
  subtasks = [];
  assigne = [];
  clearPopUp();
  closeWindow();
}
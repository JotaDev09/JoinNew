function selectCatPopUp() {
    return /*html*/ `<div class="list-elemnts-height"><li id="selectCat" onclick="closeMenuPopUp('popUpCategory')" class="list-elements-height list-elemnt space">Select task Category<img class="popup-arrow" src="../../assets/img/dropdown-arrow.svg"></img></li></div>`;
}

function selectAssignePopUp() {
    return /*HTML*/ `<div class="list-elemnts-height"><li onclick="closeMenuPopUp('popUpAssigne')" class="list-elements-height list-elemnt space">Select contacts to assign<img class="popup-arrow" src="../../assets/img/dropdown-arrow.svg"></img></li></div>`;
}

function assigneParamPopUp(name, i) {
    return /*html*/ `<div id="assigne${i}" onclick="showAssigne(${i})" class="list-elements-height list-elemnt space"><li class="list-elements-height">${name}</li><input class="checkbox" onclick="showAssigne(${i})" type="checkbox" id="checkbox${i}"/></div>`;
}

function inviteAssignePopUp() {
    return /*HTML*/ `<div class="list-elemnts-height"><li onclick="newAssigne()" class="list-elements-height list-elemnt space">Invite new contact<img class="size" src="../../assets/img/contacts2.svg"></img></li></div>`;
}

function editTemplate(task, color, prioColor, prioImg, num) {
    return /*html*/ `
        <div class="closeIcon" onclick="closePopUp()">
            <img src="assets/img/close.svg" alt="" class="x-pop" style="height: 36px" />
            <img src="assets/img/arrow-left-dark.svg" class="arrow-pop " alt="" style="height: 36px" />
        </div>
        <div
            class="taskCategoryView catPopUp"
            style="background-color: ${color}"
            id="popUp-category"
        >${task.category}</div>
        <h4 class="popUpHeadline" id="popUp-title">${task.title}</h4>
        <span class="text" id="popUp-description"
            >${task.description}
        </span>
        <div class="popUpDueDate">
            <p class="text bold">Due Date:</p>
            <p class="text paddingL75" id="popUp-date">${task.dueDate}</p>
        </div>
        <div class="popUpPriority">
            <p class="text bold">Priority:</p>
            <button class="size light btn prio-popUp" style="background-color: ${prioColor} !important" id="popUp-prio">${task.prio}
                <img src="${prioImg}" class="prioImg" />
            </button>
        </div>
        <div id="youngSubtasks" class="popUpSubtasks">
    
        </div>
        <div class="youngAssignes" id="youngAssigne">
            
        </div>
        <div
            class="taskCategoryView catPopUp d-none"
            style="background-color: orange"
            id="edit-category"
        ></div>
        <div class="editIcon" id="edit-btn">
            <img src="assets/img/pencil.svg" alt="" onclick="editMode(${num})"/>
        </div>`;
}

function assignes() {
    return /*html*/ `<p class="text bold">Assigned to:</p>
    <div id = "popUpAssignes"
        class="assignes"
        style="overflow-y: auto; height: 270px, width: 350px;"
    ></div>`;
}

function takeSubtasks() {
    return /*html*/ `<p class="text bold">Subtasks:</p>
    <div id = "popUpSubtasks"
        class="popUpSubtasks size"
        style="overflow-y: auto; height: 270px, width: 350px;"
    ></div>`;
}

function kanbanHeader() {
    return /*html*/ `<div class="column" id="todo">
    <div class="column_header">
        <h4 class="heading">Todo</h4>
        <img src="assets/img/plus_black.svg" class="plus_icon" onclick="showAddTaskForm()">
    </div>
</div>
<div class="column" id="inProgress">
    <div class="column_header">
        <h4 class="heading">In progress</h4>
        <img src="assets/img/plus_black.svg" class="plus_icon" onclick="showAddTaskForm()">
    </div>
</div>
<div class="column" id="awaitFeedback">
    <div class="column_header">
        <h4 class="heading heading_await">
            Awaiting feedback
        </h4>
        <img src="assets/img/plus_black.svg" class="plus_icon" onclick="showAddTaskForm()">
    </div>
</div>
<div class="column" id="done">
                            <div class="column_header">
                                <h4 class="heading">Done</h4>
                                <img src="assets/img/plus_black.svg" class="plus_icon" onclick="showAddTaskForm()">
                            </div>
                        </div>`;
}

function taskings(num, title, description, category, length, color, prio) {
    return /*html*/ `<div class="task" id="${num}" draggable="true" onclick="showThisTask(${num})" ondragend="updateTask(this.id)">
  <div class="taskCategoryView" style="background-color: ${color}">${category}</div>
  <p class="taskTitle">${title}</p>
  <span class="taskDescription">${description}</span>
  <!-- <div id="taskSubtasks${num}" class="taskSubtask d-none">
    <div class="taskSubtask-progressbar">
      <div class="progress-color" style="width: 0%;"></div>
    </div>
    <p>0/${length}</p> 
  </div> -->
  <div class="userTab">
  <div id="taskUser${num}" class="taskUser">
    
  </div>
  <img style="padding-top: 20px;" src="${prio}">
</div>
</div>`;
}

function taskUser(initials, color) {
    return /*html*/ `<div class="contact--left__UserAvatar margin-10r" style="background-color: #${color} !Important">
  <span class="contact-initials">${initials}</span>
</div>`;
}

function taskUserwithName(initials, color, name) {
    return /*html*/ `<div style="display: flex;align-items: center;"><div class="contact--left__UserAvatar2 margin-10r" style="background-color: #${color} !Important">
  <span class="contact-initials">${initials}</span>
</div><p id="assign0" class="text">${name}</p></div>`;
}

function taskSubtask(subtask, i) {
    return /*html*/ `<div class="taskSubtask-item" onclick="checkbox(${i})">
  <div class="taskSubtask-checkbox" ><input class="checkbox" type="checkbox" name="" id="checkSubtask(${i})"><p class="taskSubtask-text">${subtask}</p></div>
  `;
}

function addOneCatPopUp() {
    return /*html*/ '<li onclick="newCategoryPopUp()" class="list-elements-height list-elemnt">New Category</li>';
}

function categoryParamPopUp(elemnt, i, color) {
    return /*html*/ `<div class="list-elements-height list-elemnt" onclick="showCategory(${i})"><li class="list-elements-height">${elemnt}</li><div id="color${i}" class="color-btn2" style="background-color: ${color}"></div></div>`;
}

function addImg() {
    return /*HTML*/ '<img class="popup-arrow" src="../../assets/img/dropdown-arrow.svg"></img>';
}

function addColorbtn(color, i) {
    return /*html*/ `<div id="color(${i})" onclick="colorAdd(${i})" class="color-btn" style="background-color: ${color};"></div>`;
}

function avatar(name, color) {
    return /*html*/ `<div class="contact--left__UserAvatar margin-10r" style="background-color: #${color} !Important">
    <span class="contact-initials">${name}</span>
</div>`;
}

function addThisSubtask(aktion) {
    return /*html*/ `<div class="subtasks">
    <input
        class="checkbox"
        type="checkbox"
        name="Subtasks"
        id=""
    />
    <p class="light padding-10">
        ${aktion}
    </p>
</div>`;
}

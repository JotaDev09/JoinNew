function expandContacts() {
     document.getElementById('button2-drop_popup').classList.add('d-flex')
     document.getElementById('button1-drop_popup').classList.add('d-none')
     document.getElementById('avatar-drop_popup').classList.add('d-none')
}

function closeContacts() {
     document.getElementById('button2-drop_popup').classList.remove('d-flex')
     document.getElementById('button1-drop_popup').classList.remove('d-none')
     document.getElementById('avatar-drop_popup').classList.remove('d-none')
}

/**
 * edit taskk render
 */
async function editMode(num) {
     await loadTasksFromBackend()
     showEditTaskForm(num);
 
     /* boardPosition = allTasks[num].position;
      closePopUp();
      
      fillTitle(num);
      fillDescription(num);
      findColor(num);
      checkAssignes(num);
      fillDueDate(num);
      checkPriority(num);
      //fillSubtasks(num);*/
 }

 async function loadTasksFromBackend() {
     await downloadFromServer();
     allTasks = JSON.parse(backend.getItem("allTasks")) || [];
     /*
     choosenColor = JSON.parse(backend.getItem("choosenColor")) || [1, 4, 2, 5];
     category = JSON.parse(backend.getItem("category")) || [
         "Sales",
         "Backoffice",
         "Marketing",
         "Coding",
     ];
     users = JSON.parse(backend.getItem("contacts")) || [];*/
 }

/**
 * show edit task
 */
function showEditTaskForm(num) {
     document.getElementById("editTaskPopUp").classList.remove("d-none");
    // document.getElementById("taskDetail").classList.add("d-none");
     document.getElementById("taskDetails").classList.add("d-none");
     // document.getElementById("sendTask").setAttribute("onclick", `editTaskPopUp(${num})`);
 
     let edit = document.getElementById('editTaskPopUp');
     edit.innerHTML = editTaskPop(i);
     /*fillTitle(num);
     fillDescription(num);
     findColor(num);
     checkAssignes(num);
     fillDueDate(num);
     checkPriority(num);
     
     let titleEdit = document.getElementById('editTitle');
     titleEdit.value = allTasks[i]['title']
     let descriptionEdit = document.getElementById('descriptionPopUp');
      descriptionEdit.value = allTasks[i]['description'];
     */
 }
 
 function closeEditPopUp(num) {
     document.getElementById("editTaskPopUp").classList.add("d-none");
     // document.getElementById("sendTask").setAttribute("onclick", `editTaskPopUp(${num})`);
 }
 
 function editTaskPop(i) {
     return `<div class="edit_popup">
 
     <div class="close_edit_popup" onclick="closeEditPopUp()">
         <div class="close_pop_up" onclick="">
             <img class="close_img" src="assets/img/close2.svg">
         </div>
     </div>
     <div class="main_edit_popup">
         <div class="title_edit_popup center_flex_start">
             <a class="title_popup" id="editTitlePopUp">Title</a>
             <input class="input1_popup" id="editTitle">
         </div>
         <div class="description_edit_popup center_flex_start">
             <a class="description_popup">Description</a>
             <textarea class="textarea_popup" id="descriptionPopUp"></textarea>
         </div>
         <div class="date_edit_popup center_flex_start">
             <a class="date_popup">Due date</a>
             <input class="input2_popup" type="number" id="dueDatePoup" placeholder="dd/mm/yyyy">
             <div class="img_input2_popup">
                 <img class="calendar_popup" src="assets/img/calendar.svg">
             </div>
             </input>
         </div>
         <div class="prio_edit_popup center_flex_start">
             <a class="prio_popup">Prio</a>
             <div class="prio_btns_cont center_flex_start">
                 <button onclick="switchBackground('urgent')" class="prio_red_popup prio_bottons_popup"
                     id="urgent">
                     <a>Urgent</a>
                     <img src="assets/img/arrows-up.svg" class="" />
                 </button>
                 <button onclick="switchBackground('medium')" class="prio_yellow_popup prio_bottons_popup"
                     id="medium">
                     <a>Medium</a>
                     <img src="assets/img/equal-sign.svg" class="" />
                 </button>
                 <button onclick="switchBackground('low')" class="prio_green_popup prio_bottons_popup"
                     id="low">
                     <a>Low</a>
                     <img src="assets/img/arrows-down.svg" class="" />
                 </button>
             </div>
         </div>
         <div class="assigned_edit_popup center_flex_start">
             <a class="assigned_pop">Assigned to</a>
             <button class="selec_contact_popup" onclick="expandContacts()" id="button1-drop_popup">
                 <a class="text_select_popup">Select contacts to assign</a>
                 <img class="select_arrow_popup" src="assets/img/dropdown-arrow.svg">
             </button>
 
             <button class=" d-none drop_contact_popup " onclick="closeContacts()" id="button2-drop_popup">
                 <div class="drop_title_popup">
                     <a class="text_select_popup">Select contacts to assign</a>
                     <img class="select_arrow_popup" src="assets/img/dropdown-arrow.svg">
                 </div>
                 <div class="contacts_drop_popup" id="contacts_edit_popup">
                     <a class="contact_list_drop_popup"></a>
                     <input class="checkbox_drop_popup" type="checkbox">
                 </div>
                 <div class="invite_new_popup" type="button">
                     <a class="invite_contact_popup">Invite new Contact</a>
                     <img class="img_contacts_popup" src="assets/img/contacts.svg">
                 </div>
 
             </button>
 
             <div class="avatars_edit_popup" id="avatar-drop_popup">
                 <div class="color_avatar_popup"></div>
             </div>
         </div>
     </div>
     
         <button class="ok_btn_popup">
             <a class="ok_text_popup">Ok</a>
             <img src="assets/img/create.png"></img>
         </button>
     
 </div>`
 }
 
 /**
  * edit title in task
  */
 function fillTitle(num) {
     
     let titleEdit = document.getElementById('editTitle');
     titleEdit.value = allTasks[i]['title']
     console.log(titleEdit)
    
 }
 
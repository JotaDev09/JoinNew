let CONTACTS = [];
let CONTACTSPARSED = [];
let renderedhtml = "";
let OPENED_UUID = "";

// CSS Classes Manipulation
function newContactOpenOverlay() {
    document.getElementById("body__css-contactsAdd").classList.remove("hide");
    document.getElementById("body__overlapID").classList.remove("hide");
}

function editContactOpenOverlay() {
    document.getElementById("body__css-contactsEdit").classList.remove("hide");
    document.getElementById("body__overlapID").classList.remove("hide");
}

function closeAddPopup() {
    document.getElementById("body__css-contactsAdd").classList.add("hide");
    document.getElementById("body__overlapID").classList.add("hide");
}

function closeEditPopup() {
    document.getElementById("body__css-contactsEdit").classList.add("hide");
    document.getElementById("body__overlapID").classList.add("hide");
}

// Event Listener for form submit
addEventListener("submit", (e) => {
    if (e.target.id == "addContactForm") {
        pushNewContact();
        e.preventDefault();
    }
    if (e.target.id == "editContactForm") {
        editContactArray();
        e.preventDefault();
    }
});

// Get changes in media in JS with event listener
const mediaQueryMax = window.matchMedia("(max-width: 900px)");
const mediaQueryMin = window.matchMedia("(min-width: 901px)");
function handleTabletChange(e) {
    if (e.matches) {
        render();
    }
}
mediaQueryMax.addListener(handleTabletChange);
mediaQueryMin.addListener(handleTabletChange);
handleTabletChange(mediaQueryMax);
handleTabletChange(mediaQueryMin);

function editContactArray() {
    const name = document.getElementById("id-editContact__name").value;
    const email = document.getElementById("id-editContact__email").value;
    const phone = document.getElementById("id-editContact__phone").value;
    for (let i = 0; i < CONTACTS.length; i++) {
        if (CONTACTS[i][0] == OPENED_UUID) {
            CONTACTS[i][1] = name;
            CONTACTS[i][2] = email;
            CONTACTS[i][3] = phone;
        }
    }
    syncContactsToServer();
    closeEditPopup();
}

// push new contact in array
function pushNewContact() {
    const name = document.getElementById("id-newContact__name").value;
    const email = document.getElementById("id-newContact__email").value;
    const phone = document.getElementById("id-newContact__phone").value;
    const uuid = createContactUUID();
    const color = createColor();
    CONTACTS.push([uuid, name, email, phone, color]);
    syncContactsToServer();
    closeAddPopup();
}

/**
 * contacts Json to array
 */
function contactsJsonToArray() {
    for (let i = 0; i < CONTACTSPARSED.length; i++) {
        let contactString = JSON.stringify(CONTACTSPARSED[i]);
        let contactsParsed = JSON.parse(contactString);
        let contactUuid = contactsParsed["uuid"];
        let contactName = contactsParsed["name"];
        let contactEmail = contactsParsed["email"];
        let contactPhone = contactsParsed["phone"];
        let contactColor = contactsParsed["color"];
        CONTACTS.push([
            contactUuid,
            contactName,
            contactEmail,
            contactPhone,
            contactColor,
        ]);
        
    }
}

/**
 * contacts array to json
 */
function contactsArrayToJson() {
    let CONTACTSJSON = [];
    for (let i = 0; i < CONTACTS.length; i++) {
        let contactUuid = CONTACTS[i][0];
        let contactName = CONTACTS[i][1];
        let contactEmail = CONTACTS[i][2];
        let contactPhone = CONTACTS[i][3];
        let contactColor = CONTACTS[i][4];
        pushContactData = {
            uuid: contactUuid,
            name: contactName,
            email: contactEmail,
            phone: contactPhone,
            color: contactColor,
        };
        CONTACTSJSON.push(pushContactData);
        
    }
    return CONTACTSJSON;
}

//hex color generator
function createColor() {
    return Math.floor(Math.random() * 16777215).toString(16);
}

// UUID Generator - caution: not 100% unique, but does the job.
function createContactUUID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
            var r = (Math.random() * 16) | 0,
                v = c == "x" ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        }
    );
}

// Setting the stage for upcoming push
async function syncContactsToServer() {
    pushContacts();
    await render();
}

// Push contact array to server database.json
async function pushContacts() {
    const ParsedJson = contactsArrayToJson();
    await backend.setItem("contacts", JSON.stringify(ParsedJson));
}

/**
 * single contact card
 */
function renderSingleContactCard(uuid) {
    let contactColor = "";
    let contactName = "";
    let contactEmail = "";
    for (let i = 0; i < CONTACTS.length; i++) {
        if (CONTACTS[i][0] == uuid) {
            contactName = CONTACTS[i][1];
            contactEmail = CONTACTS[i][2];
            contactColor = CONTACTS[i][4];
        }
    }
    const width_responsive = Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
    );

    let contactInitials = contactName.substring(0, 2).toUpperCase();

    if (width_responsive < 900) {
        return /*html*/ `<div id="contact--${uuid}" class="contact--left__card" onclick='editContactOverlay("${uuid}")'><div class="contact--left__UserAvatar" style="background-color:${contactColor}"><span class="contact-initials">${contactInitials}</span></div><div class="contact--left__UserText"><div class="contact--left__UserText--Name">${contactName}</div><div class="contact--left__UserText--Email">${contactEmail}</div></div></div>`;
    } else {
        return /*html*/ `<div id="contact--${uuid}" class="contact--left__card" onclick='contactOpen("${uuid}")'><div class="contact--left__UserAvatar" style="background-color:${contactColor}"><span class="contact-initials">${contactInitials}</span></div><div class="contact--left__UserText"><div class="contact--left__UserText--Name">${contactName}</div><div class="contact--left__UserText--Email">${contactEmail}</div></div></div>`;
    }
}

function renderLeft(uuid) {
    renderedHtmlTemp = renderSingleContactCard(uuid);
    renderedhtml += renderedHtmlTemp;
    document.getElementById("id-contacts--card").innerHTML = renderedhtml;
    
}

/**
 * sget contact from server
 */
async function getContactsFromDb() {
    await downloadFromServer();
    CONTACTSPARSED = (await JSON.parse(backend.getItem("contacts"))) || [];
    contactsJsonToArray();
}

// startup entry - render contacts
async function startupContacts() {
    await getContactsFromDb();
    setTimeout(() => {
        render();
    }, 1000);
}

/**
 * render contacts
 */
function render() {
    for (let i = 0; i < CONTACTS.length; i++) {
        const renderContactCard = CONTACTS[i][0];
        renderLeft(renderContactCard);
    }
    renderedhtml = "";
    contactOpen("c569a0e5-a992-4537-82a9-1e69fd562fe3");
}

/**
 * open contacts
 */
function contactOpen(uuid) {
    try {
        const renderedContactsHtml = renderedHtmlContactRight(uuid);
        document.getElementById("id-contacts--main__rightCenter").innerHTML =
            renderedContactsHtml;
    } catch {}
}

/**
 * render html contacts
 */
function renderedHtmlContactRight(uuid) {
    let contactColor = "";
    let contactName = "";
    let contactEmail = "";
    let contactPhone = "";
    for (let i = 0; i < CONTACTS.length; i++) {
        if (CONTACTS[i][0] == uuid) {
            contactName = CONTACTS[i][1];
            contactEmail = CONTACTS[i][2];
            contactPhone = CONTACTS[i][3];
            contactColor = CONTACTS[i][4];
        }
    }
    let contactInitials = contactName.substring(0, 2).toUpperCase();
    return /*html*/ `
<div class="contacs--show__right--header"><div id="id-contacts__initials" style="background-color:${contactColor}" class="contacs--show__right--header__userPic">${contactInitials}</div><div class="contacs--show__right--header__userNameAddTask"><div id="id-contacts__name" class="contacs--show__right--header__userNameText">${contactName}</div><div class="hover__pointer" onclick="addTask()">+ Add Task</div></div></div><div class="contacs--show__right--contactInformation"><div class="contacs--show__right--contactInformation__Text">Contact Information</div><div class="hover__pointer contacs--show__right--contactInformation__EditContact" onclick='editContactOverlay("${uuid}")'><img src="assets/img/edit.png">Edit Contact</div></div><div class="contacs--show__right--ContainerBoldText">Email</div><div class="mail_contacts" id="id-contacts__email">${contactEmail}</div><div class="contacs--show__right--ContainerBoldText">Phone</div><div id="id-contacts__phone">${contactPhone}</div>`;
}

// open the "EDIT CONTACT" overlay and use actual values as placeholders
function editContactOverlay(uuid) {
    const contactsResp = window.matchMedia('(max-width: 760px)');

    editContactOpenOverlay();
    OPENED_UUID = uuid;
    let contactColor = "";
    let contactName = "";
    let contactEmail = "";
    let contactPhone = "";
    for (let i = 0; i < CONTACTS.length; i++) {
        if (CONTACTS[i][0] == uuid) {
            contactName = CONTACTS[i][1];
            contactEmail = CONTACTS[i][2];
            contactPhone = CONTACTS[i][3];
        }
    }
    document.getElementById("id-editContact__name").value = contactName;
    document.getElementById("id-editContact__email").value = contactEmail;
    document.getElementById("id-editContact__phone").value = contactPhone;
}

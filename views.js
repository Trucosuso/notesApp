// @ts-check


// GENERIC UI

/**
 * Class representing a generic view.
 */
class GenericView {
    /**
     * Create a generic view
     */
    constructor() {
        /** @type {Array<GenericNoteView>} */
        this.notes = [];
    }

    // Methods

    /**
     * Opens a new frame to enter the new note data
     */
    createNewNoteFrame() { }

    /**
     * Creates a new note
     */
    /**
     * Creates a new note and adds them to the note container
     * @param {Number} id Note ID
     * @param {String} title Note title
     * @param {String} text Note body
     * @param {Number} timestamp Note creation date
     * @param {String} color Note color
     */
    // eslint-disable-next-line no-unused-vars
    createNote(id, title, text, timestamp, color) { }

    /**
     * Deletes a note from view
     * @param {Number} notePositionInArray Note position in array this.notes
     */
    // eslint-disable-next-line no-unused-vars
    deleteNote(notePositionInArray) { }
}

/**
 * Class representing a generic note view
 * @extends HTMLDivElement
 */
class GenericNoteView extends HTMLDivElement {
    /**
     * Creates a note view
     * @param {Number} noteID Note ID
     * @param {String} noteTitle Note title
     * @param {String} noteText Note body
     */
    constructor(noteID, noteTitle, noteText) {
        super();

        // ID
        this.noteID = noteID;

        // Can be dragged
        /** @type {Boolean} */
        this.canBeDragged;

        // Note title
        this.noteTitle = document.createElement("p");
        this.noteTitle.appendChild(document.createTextNode(noteTitle));

        // Note text
        this.noteText = document.createElement("p");
        this.noteText.appendChild(document.createTextNode(noteText));
        this.noteText.style.whiteSpace = "pre-wrap";

        // Edit icon
        this.editIcon = document.createElement("button");
        this.editIcon.classList.add("material-icons");
        this.editIcon.appendChild(document.createTextNode("create"));

        // Delete icon
        this.deleteIcon = document.createElement("button");
        this.deleteIcon.classList.add("material-icons");
        this.deleteIcon.appendChild(document.createTextNode("delete"));

        // Apply edit icon
        this.applyIcon = document.createElement("button");
        this.applyIcon.classList.add("material-icons");
        this.applyIcon.appendChild(document.createTextNode("done"));
    }

    updateTime() { }

    /**
     * Changes the note to edit mode
     */
    startEditNote() { }

    /**
     * Changes the note back to default mode updating the changes
     */
    endEditNote() { }
}


// CORK UI

/**
 * Class representing an UI with cork board and sticky notes on it
 * @extends GenericView
 */
class CorkView extends GenericView {
    /**
     * Creates UI
     */
    constructor() {
        super();
        // Where to draw the interface
        this.ui = document.body;
        this.ui.classList.add("corkBackground");

        // Create controls
        let controlPanel = document.createElement("div");
        controlPanel.classList.add("controlPanelCork");

        let appTitle = document.createElement("p");
        appTitle.classList.add("appTitleCork");
        appTitle.appendChild(document.createTextNode("Sticky notes"));
        controlPanel.appendChild(appTitle);

        this.createNewNoteButton = document.createElement("button");
        this.createNewNoteButton.id = "createNewNoteButton";
        this.createNewNoteButton.classList.add("buttonCork");
        this.createNewNoteButton.classList.add("createNewNoteButtonCork");
        this.createNewNoteButton.appendChild(document.createTextNode("Add note"));
        controlPanel.appendChild(this.createNewNoteButton);

        // Button to change view
        this.changeViewButton = document.createElement("button");
        this.changeViewButton.id = "changeViewButton";
        this.changeViewButton.classList.add("buttonCork");
        this.changeViewButton.classList.add("changeViewButtonCork");
        this.changeViewButton.appendChild(document.createTextNode("Change view"));
        controlPanel.appendChild(this.changeViewButton);

        this.ui.appendChild(controlPanel);

        // Where to put notes
        this.background = document.createElement("section");
        this.ui.appendChild(this.background);

        // New note frame
        /** @type {NewNoteFrameCork} */
        this.newNoteFrame;

        // Define custom HTML elements. Done in main
        /* customElements.define("new-note-frame-cork", NewNoteFrameCork, { extends: "div" });
        customElements.define("note-cork", NoteCorkView, { extends: "div" }); */
    }

    /**
     * Opens a new frame to enter the new note data
     * @override
     */
    createNewNoteFrame() {
        this.newNoteFrame = new NewNoteFrameCork();
        this.ui.appendChild(this.newNoteFrame);

        // Event to close button
        this.newNoteFrame.closeButton.addEventListener("click", () => { this.closeNewNoteFrame(); });
    }

    /**
     * Closes the new note frame
     */
    closeNewNoteFrame() {
        this.createNewNoteButton.disabled = false;
        this.createNewNoteButton.classList.remove("disabled");
        this.newNoteFrame.remove();
    }

    /**
     * Creates a new note and adds them to the note container
     * @param {Number} id Note ID
     * @param {String} title Note title
     * @param {String} text Note body
     * @param {Number} timestamp Note creation date
     * @param {String} color Note color
     * @returns {NoteCorkView} Created note
     * @override
     */
    createNote(id, title, text, timestamp, color) {
        let note = new NoteCorkView(id, title, text, timestamp, 25, 75);
        this.background.appendChild(note);
        this.notes.push(note);
        return note;
    }

    /**
     * Deletes a note from view
     * @param {Number} notePositionInArray Note position in array this.notes
     */
    deleteNote(notePositionInArray) {
        this.notes[notePositionInArray].remove();
        this.notes.splice(notePositionInArray, 1);
    }
}

/**
 * Class representing a frame to enter data of a new note
 * @extends HTMLDivElement
 */
class NewNoteFrameCork extends HTMLDivElement {
    /**
     * Creates new note frame
     */
    constructor() {
        super();
        this.classList.add("newNoteFrameCork");

        let labelNoteTitleInput = document.createElement("label");
        labelNoteTitleInput.appendChild(document.createTextNode("Note title: "));
        labelNoteTitleInput.htmlFor = "noteTitleInput";
        labelNoteTitleInput.classList.add("labelNoteTitleInputCork");
        this.noteTitleInput = document.createElement("input");
        this.noteTitleInput.type = "text";
        this.noteTitleInput.id = "noteTitleInput";
        this.noteTitleInput.classList.add("noteTitleInputCork");

        this.noteTextInput = document.createElement("textarea");
        this.noteTextInput.classList.add("noteTextInputCork");

        this.closeButton = document.createElement("button");
        this.closeButton.appendChild(document.createTextNode("X"));
        this.closeButton.classList.add("buttonCork");
        this.closeButton.classList.add("closeButtonCork");

        this.addNoteButton = document.createElement("button");
        this.addNoteButton.appendChild(document.createTextNode("Add"));
        this.addNoteButton.classList.add("buttonCork");
        this.addNoteButton.classList.add("addNoteButtonCork");

        this.appendChild(this.closeButton);
        this.appendChild(this.addNoteButton);
        this.appendChild(labelNoteTitleInput);
        this.appendChild(this.noteTitleInput);
        this.appendChild(this.noteTextInput);
    }
}

/**
 * Class representing a note on the cork board
 * @extends GenericNoteView
 */
class NoteCorkView extends GenericNoteView {
    /**
     * Creates a note view
     * @param {Number} noteID Note ID
     * @param {String} noteTitle Note title
     * @param {String} noteText Note body
     * @param {Number} noteTimestamp Note creation date
     * @param {Number} x X coordinate of the top left side of the note in pixels
     * @param {Number} y Y coordinate of the top left side of the note in pixels
     */
    constructor(noteID, noteTitle, noteText, noteTimestamp, x, y) {
        super(noteID, noteTitle, noteText);
        // Styles
        this.style.width = "20rem";
        this.style.position = "absolute";
        this.style.left = x + "px";
        this.style.top = y + "px";
        this.classList.add("noteCork");

        // Can be dragged
        this.canBeDragged = true;

        // Note title
        this.noteTitle.classList.add("noteTitleCork");

        // Note text
        this.noteText.classList.add("noteTextCork");

        // Note creation date and text to show it
        this.timestamp = noteTimestamp;
        this.creationDateText = document.createElement("p");
        this.creationDateText.appendChild(document.createTextNode(""));
        this.creationDateText.classList.add("noteTimeCork");
        this.updateTime();

        // Edit icon
        this.editIcon.classList.add("noteButtonCork");

        // Delete icon
        this.deleteIcon.classList.add("noteButtonCork");

        // Input to edit title
        this.noteTitleInput = document.createElement("input");
        this.noteTitleInput.type = "text";
        this.noteTitleInput.value = this.noteTitle.innerText;
        this.noteTitleInput.classList.add("noteTitleCork");
        this.noteTitleInput.style.display = "none";

        // Input to edit text
        this.noteTextInput = document.createElement("textarea");
        this.noteTextInput.value = this.noteText.innerText;
        this.noteTextInput.rows = 10;
        this.noteTextInput.classList.add("noteTextCork");
        this.noteTextInput.style.display = "none";

        // Apply edit icon
        this.applyIcon.classList.add("noteButtonCork");
        this.applyIcon.style.display = "none";

        // Div to position the icons correctly
        let iconsDiv = document.createElement("div");
        iconsDiv.appendChild(this.editIcon);
        iconsDiv.appendChild(this.applyIcon);
        iconsDiv.appendChild(this.deleteIcon);

        this.appendChild(this.noteTitle);
        this.appendChild(this.noteTitleInput);
        this.appendChild(this.noteText);
        this.appendChild(this.noteTextInput);
        this.appendChild(iconsDiv);
        this.appendChild(this.creationDateText);
    }

    /**
     * Updates the text indicating when the note was created
     * @override
     */
    updateTime() {
        // Get how long ago it was created
        let dateUnits = {
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        // Function to get time and correspondant unit
        let getUnitAndValueDate = (secondsElapsed) => {
            for (const [unit, secondsInUnit] of Object.entries(dateUnits)) {
                if (secondsElapsed >= secondsInUnit || unit === "second") {
                    const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
                    return { value, unit };
                }
            }
        };


        let rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
        let secondsElapsed = (Date.now() - this.timestamp) / 1000;
        let { value, unit } = getUnitAndValueDate(secondsElapsed);

        // Update Text
        this.creationDateText.textContent = rtf.format(value, unit);
    }

    /**
     * Changes the note to edit mode
     * @override
     */
    startEditNote() {
        // Stop ability to drag note
        this.canBeDragged = false;

        // Change edit button to apply changes button
        this.editIcon.style.display = "none";
        this.applyIcon.style.display = "";

        // Change view to edit inputs
        this.noteTitle.style.display = "none";
        this.noteTitleInput.style.display = "";

        this.noteText.style.display = "none";
        this.noteTextInput.style.display = "";
    }

    /**
     * Changes the note back to default mode updating the changes
     * @override
     */
    endEditNote() {
        // Restore ability to drag note
        this.canBeDragged = true;

        // Change apply button to edit button
        this.applyIcon.style.display = "none";
        this.editIcon.style.display = "";

        // Change view to display text updating the changes
        this.noteTitle.textContent = this.noteTitleInput.value;
        this.noteTitleInput.style.display = "none";
        this.noteTitle.style.display = "";

        this.noteText.textContent = this.noteTextInput.value;
        this.noteTextInput.style.display = "none";
        this.noteText.style.display = "";
    }
}


// STACK UI

/**
 * Class representing an UI with notes on a stack. The last added note will be at the top
 * @extends GenericView
 */
class StackView extends GenericView {
    /**
     * Creates UI
     */
    constructor() {
        super();
        // Where to draw the interface
        this.ui = document.body;
        this.ui.classList.add("stackBody");

        // Create controls
        let controlPanel = document.createElement("div");
        controlPanel.classList.add("controlPanelStack");

        let appTitle = document.createElement("p");
        appTitle.classList.add("appTitleStack");
        appTitle.appendChild(document.createTextNode("Notes app"));
        controlPanel.appendChild(appTitle);

        this.createNewNoteButton = document.createElement("button");
        this.createNewNoteButton.id = "createNewNoteButton";
        this.createNewNoteButton.classList.add("buttonStack");
        this.createNewNoteButton.classList.add("createNewNoteButtonStack");
        this.createNewNoteButton.appendChild(document.createTextNode("Create new note"));
        controlPanel.appendChild(this.createNewNoteButton);

        // Button to change view
        this.changeViewButton = document.createElement("button");
        this.changeViewButton.id = "changeViewButton";
        this.changeViewButton.classList.add("buttonStack");
        this.changeViewButton.classList.add("createNewNoteButtonStack");
        this.changeViewButton.appendChild(document.createTextNode("Change view"));
        controlPanel.appendChild(this.changeViewButton);

        this.ui.appendChild(controlPanel);

        // Where to put notes
        this.background = document.createElement("section");
        this.background.classList.add("stackBackground");
        this.ui.appendChild(this.background);

        // New note frame
        /** @type {NewNoteFrameStack} */
        this.newNoteFrame;

        // Order for note to be flex elements
        this.order = 0;

        // Define custom HTML elements. Done in main because i dont know how to check if they are already defined
        /* customElements.define("new-note-frame-stack", NewNoteFrameStack, { extends: "div" });
        customElements.define("note-stack", NoteStackView, { extends: "div" }); */
    }

    /**
     * Opens a new frame to enter the new note data
     * @override
     */
    createNewNoteFrame() {
        this.newNoteFrame = new NewNoteFrameStack(this.order);
        this.background.appendChild(this.newNoteFrame);

        // Event to close button
        this.newNoteFrame.closeButton.addEventListener("click", () => { this.closeNewNoteFrame(); });
    }

    /**
     * Closes the new note frame
     */
    closeNewNoteFrame() {
        this.createNewNoteButton.disabled = false;
        this.createNewNoteButton.classList.remove("disabled");
        this.newNoteFrame.remove();
    }

    /**
     * Creates a new note and adds them to the note container
     * @param {Number} id Note ID
     * @param {String} title Note title
     * @param {String} text Note body
     * @param {Number} timestamp Note creation date
     * @param {String} color Note color
     * @returns {NoteStackView} Created note
     * @override
     */
    createNote(id, title, text, timestamp, color) {
        let note = new NoteStackView(id, title, text, timestamp, this.order--);
        this.background.appendChild(note);
        this.notes.push(note);
        return note;
    }

    /**
     * Deletes a note from view
     * @param {Number} notePositionInArray Note position in array this.notes
     */
    deleteNote(notePositionInArray) {
        this.notes[notePositionInArray].remove();
        this.notes.splice(notePositionInArray, 1);
    }
}

/**
 * Class representing a frame to enter data of a new note
 * @extends HTMLDivElement
 */
class NewNoteFrameStack extends HTMLDivElement {
    /**
     * Creates new note frame
     * @param {Number} order Order to add to the new note frame to be displayed a the top of the flex container
     */
    constructor(order) {
        super();
        this.classList.add("noteStack");
        this.classList.add("newNoteFrameStack");
        this.style.order = order.toString();
        this.style.width = "20vw";
        this.style.maxHeight = "20rem";
        this.style.minHeight = "15rem";
        this.style.minWidth = "15rem";

        let labelNoteTitleInput = document.createElement("label");
        labelNoteTitleInput.appendChild(document.createTextNode("Note title: "));
        labelNoteTitleInput.htmlFor = "noteTitleInput";
        labelNoteTitleInput.classList.add("labelNoteTitleInputStack");
        this.noteTitleInput = document.createElement("input");
        this.noteTitleInput.type = "text";
        this.noteTitleInput.id = "noteTitleInput";
        this.noteTitleInput.classList.add("noteTitleInputStack");

        this.noteTextInput = document.createElement("textarea");
        this.noteTextInput.classList.add("noteTextInputStack");

        let closeIcon = document.createElement("span");
        closeIcon.classList.add("material-icons");
        closeIcon.appendChild(document.createTextNode("close"));
        this.closeButton = document.createElement("button");
        this.closeButton.appendChild(closeIcon);
        this.closeButton.classList.add("closeButtonStack");

        this.addNoteButton = document.createElement("button");
        this.addNoteButton.appendChild(document.createTextNode("Add this note"));
        this.addNoteButton.classList.add("addNoteButtonStack");

        this.appendChild(labelNoteTitleInput);
        this.appendChild(this.noteTitleInput);
        this.appendChild(this.closeButton);
        this.appendChild(this.noteTextInput);
        this.appendChild(this.addNoteButton);
    }
}

/**
 * Class representing a note on the cork board
 * @extends GenericNoteView
 */
class NoteStackView extends GenericNoteView {
    /**
     * Creates a note view
     * @param {Number} noteID Note ID
     * @param {String} noteTitle Note title
     * @param {String} noteText Note body
     * @param {Number} noteTimestamp Note creation date
     * @param {Number} order Order to add to the note to be displayed in a flex container
     */
    constructor(noteID, noteTitle, noteText, noteTimestamp, order) {
        super(noteID, noteTitle, noteText);
        // Styles
        this.style.width = "20vw";
        this.style.maxHeight = "20rem";
        this.style.minWidth = "15rem";
        this.style.order = order.toString();
        this.classList.add("noteStack");

        // Can be dragged
        this.canBeDragged = false;

        // Note title
        this.noteTitle.classList.add("noteTitleStack");

        // Note text
        this.noteText.classList.add("noteTextStack");

        // Note creation date and text to show it
        this.timestamp = noteTimestamp;
        this.creationDateText = document.createElement("p");
        this.creationDateText.appendChild(document.createTextNode(""));
        this.creationDateText.classList.add("noteTimeStack");
        this.updateTime();

        // Edit icon
        this.editIcon.classList.add("noteButtonStack");

        // Delete icon
        this.deleteIcon.classList.add("noteButtonStack");

        // Input to edit title
        this.noteTitleInput = document.createElement("input");
        this.noteTitleInput.type = "text";
        this.noteTitleInput.value = this.noteTitle.innerText;
        this.noteTitleInput.classList.add("noteTitleStack");
        this.noteTitleInput.style.display = "none";

        // Input to edit text
        this.noteTextInput = document.createElement("textarea");
        this.noteTextInput.value = this.noteText.innerText;
        this.noteTextInput.rows = 10;
        this.noteTextInput.classList.add("noteTextStack");
        this.noteTextInput.style.display = "none";

        // Apply edit icon
        this.applyIcon.classList.add("noteButtonStack");
        this.applyIcon.style.display = "none";

        // Div to position the icons and the time correctly
        let bottomDiv = document.createElement("div");
        bottomDiv.classList.add("bottomDivStack");
        bottomDiv.appendChild(this.editIcon);
        bottomDiv.appendChild(this.applyIcon);
        bottomDiv.appendChild(this.deleteIcon);
        bottomDiv.appendChild(this.creationDateText);

        this.appendChild(this.noteTitle);
        this.appendChild(this.noteTitleInput);
        this.appendChild(this.noteText);
        this.appendChild(this.noteTextInput);
        this.appendChild(bottomDiv);
    }

    /**
     * Updates the text indicating when the note was created
     * @override
     */
    updateTime() {
        // Get how long ago it was created
        let dateUnits = {
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        // Function to get time and correspondant unit
        let getUnitAndValueDate = (secondsElapsed) => {
            for (const [unit, secondsInUnit] of Object.entries(dateUnits)) {
                if (secondsElapsed >= secondsInUnit || unit === "second") {
                    const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
                    return { value, unit };
                }
            }
        };


        let rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" });
        let secondsElapsed = (Date.now() - this.timestamp) / 1000;
        let { value, unit } = getUnitAndValueDate(secondsElapsed);

        // Update Text
        this.creationDateText.textContent = "Created " + rtf.format(value, unit);
    }

    /**
     * Changes the note to edit mode
     * @override
     */
    startEditNote() {
        // Change edit button to apply changes button
        this.editIcon.style.display = "none";
        this.applyIcon.style.display = "";

        // Change view to edit inputs
        this.noteTitle.style.display = "none";
        this.noteTitleInput.style.display = "";

        this.noteText.style.display = "none";
        this.noteTextInput.style.display = "";
    }

    /**
     * Changes the note back to default mode updating the changes
     * @override
     */
    endEditNote() {
        // Change apply button to edit button
        this.applyIcon.style.display = "none";
        this.editIcon.style.display = "";

        // Change view to display text updating the changes
        this.noteTitle.textContent = this.noteTitleInput.value;
        this.noteTitleInput.style.display = "none";
        this.noteTitle.style.display = "";

        this.noteText.textContent = this.noteTextInput.value;
        this.noteTextInput.style.display = "none";
        this.noteText.style.display = "";
    }
}

export { GenericView, GenericNoteView, CorkView, NewNoteFrameCork, NoteCorkView, StackView, NewNoteFrameStack, NoteStackView }

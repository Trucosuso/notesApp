// @ts-check
/**
 * Class representing a generic view.
 */
class GenericView {
    /**
     * Create a generic view
     */
    constructor() {
        /** @type {Array<HTMLDivElement>} */
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

    /**
     * Updates a note in view
     * @param {Number} id Note ID
     * @param {String} title Note title
     * @param {String} text Note body
     * @param {String} color Note color
     */
    // eslint-disable-next-line no-unused-vars
    updateNote(id, title, text, color) { }

}

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

        this.ui.appendChild(controlPanel);

        // Where to put notes
        this.background = document.createElement("section");
        this.ui.appendChild(this.background);

        // New note frame
        /** @type {NewNoteFrameCork} */
        this.newNoteFrame;

        // Define custom HTML elements
        customElements.define("new-note-frame", NewNoteFrameCork, { extends: "div" });
        customElements.define("note-cork", NoteCorkView, { extends: "div" });
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
 * Class representing a note on the cork board
 * @extends HTMLDivElement
 */
class NoteCorkView extends HTMLDivElement {
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
        super();
        // Styles
        this.style.width = "20rem";
        this.style.position = "absolute";
        this.style.left = x + "px";
        this.style.top = y + "px";
        this.classList.add("noteCork");

        // ID
        this.noteID = noteID;

        // Note title
        this.noteTitle = document.createElement("p");
        this.noteTitle.appendChild(document.createTextNode(noteTitle));
        this.noteTitle.classList.add("noteTitleCork");

        // Note text
        this.noteText = document.createElement("p");
        this.noteText.appendChild(document.createTextNode(noteText));
        this.noteText.style.whiteSpace = "pre-wrap";
        this.noteText.classList.add("noteTextCork");

        // Note creation date and text to show it
        this.creationDate = new Date(noteTimestamp);
        this.creationDateText = document.createElement("p");
        this.creationDateText.appendChild(document.createTextNode("Created at " + this.creationDate.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })));
        this.creationDateText.classList.add("noteTimeCork");

        // Delete icon
        this.deleteIcon = document.createElement("span");
        this.deleteIcon.classList.add("material-icons");
        this.deleteIcon.classList.add("noteDeleteIconCork");
        this.deleteIcon.style.cursor = "pointer";
        this.deleteIcon.appendChild(document.createTextNode("delete"));

        this.appendChild(this.noteTitle);
        this.appendChild(this.noteText);
        this.appendChild(this.deleteIcon);
        this.appendChild(this.creationDateText);
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


export { CorkView, NoteCorkView };

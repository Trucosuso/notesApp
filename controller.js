// @ts-check
import { Note } from "./models.js";
import { CorkView, StackView, GenericNoteView } from "./views.js";

/**
 * Controller class for note and its views
 */
class NotesController {
    /**
     * Loads the app with the chosen view
     * @param {String} viewToLoad "cork" or "stack"
     */
    constructor(viewToLoad = "cork") {
        // Create view
        /** @type {CorkView|StackView} */
        this.view;

        // Is dragging
        this.dragging = false;
        // Which note to move when clicked
        /** @type {GenericNoteView} */
        this.noteToMove = null;

        // Add event listener to move notes to window
        window.addEventListener("mousemove", (e) => {
            if (this.dragging && this.noteToMove.canBeDragged) {
                this.noteToMove.style.left = (e.clientX - 150) + "px";
                this.noteToMove.style.top = (e.clientY - 30) + "px";
            }
        });

        /** @type {Array<Note>} Array to store all the notes */
        this.notes = [];

        // ID to assing to the next note
        this.id = 0;

        // Load stored notes if there are any
        this.loadStoredNotes();

        this.loadView(viewToLoad);

        // Update time in notes every 10 seconds
        setInterval(() => {
            for (const noteView of this.view.notes) {
                noteView.updateTime();
            }
        }, 10000);
    }

    /**
     * Loads the selected UI
     * @param {String} viewToLoad "cork" or "stack"
     */
    loadView(viewToLoad) {
        // Load selected UI
        if (viewToLoad == "stack") {
            this.view = new StackView();
        } else {
            this.view = new CorkView();
        }

        // Adds event listener to create new note button
        this.view.createNewNoteButton.addEventListener("click", () => {
            this.view.createNewNoteFrame();
            this.view.createNewNoteButton.disabled = true;
            this.view.createNewNoteButton.classList.add("disabled");

            // Add event listener to the add note button in the new note frame
            this.view.newNoteFrame.addNoteButton.addEventListener("click", () => {
                this.createNote();
            });
        });

        // Add event listener to change the view to the other one
        this.view.changeViewButton.addEventListener("click", () => {
            if (this.view instanceof CorkView) {
                document.body = document.createElement("body");
                this.loadView("stack");
            } else {
                document.body = document.createElement("body");
                this.loadView("cork");
            }
        });

        // Add stored notes to view
        for (const note of this.notes) {
            this.addNoteToView(note);
        }
    }

    /**
     * Adds note to view. Addind its correspondant event listeners.
     * @param {Note} note Note to add to view
     */
    addNoteToView(note) {
        let noteView = this.view.createNote(note.id, note.title, note.text, note.timestamp, note.color);

        // Add event listener to delete icon
        noteView.deleteIcon.addEventListener("click", this.deleteNote.bind(this));

        // Add event listener to edit icon
        noteView.editIcon.addEventListener("click", this.startEdit.bind(this));

        // Add event listeners to move the note
        noteView.addEventListener("mousedown", (e) => {
            this.noteToMove = e.currentTarget;
            this.dragging = true;
        });
        noteView.addEventListener("mouseup", () => {
            this.dragging = false;
        });
    }

    /**
     * If the note has a title creates a new note reading its atributes from the inputs.
     * Stores it on the array of notes and updates the local storage.
     */
    createNote() {
        let title = this.view.newNoteFrame.noteTitleInput.value;
        if (title) {
            let text = this.view.newNoteFrame.noteTextInput.value;
            let timestamp = Date.now();
            let note = new Note(this.id, title, text, timestamp);
            this.notes.push(note);
            this.addNoteToView(note);
            this.view.closeNewNoteFrame();
            this.saveNotes();
            this.id++;
        }
    }

    /**
     * Starts editing the note clicked by the user
     * @param {MouseEvent} e 
     */
    startEdit(e) {
        /** @type {GenericNoteView} */
        let noteView = e.target.parentElement.parentElement;
        noteView.startEditNote();
        noteView.applyIcon.addEventListener("click", this.endEdit.bind(this));
    }

    /**
     * Ends editing the note clicked by the user and saves the changes
     * @param {MouseEvent} e 
     */
    endEdit(e) {
        /** @type {GenericNoteView} */
        let noteView = e.target.parentElement.parentElement;
        noteView.endEditNote();

        // Save changes to model
        let modifiedNote = this.notes.find((note) => note.id == noteView.noteID);
        modifiedNote.title = noteView.noteTitle.textContent;
        modifiedNote.text = noteView.noteText.textContent;

        this.saveNotes();
    }

    /**
     * Deletes the note clicked by the user
     * @param {MouseEvent} e 
     */
    deleteNote(e) {
        /** @type {GenericNoteView} */
        // @ts-ignore
        let noteView = e.target.parentElement.parentElement;

        // Search in the this.notes array the note to delete
        let notePositionInArray = this.notes.findIndex((note) => note.id == noteView.noteID);

        // Delete the note in this.notes and in the view
        this.notes.splice(notePositionInArray, 1);
        this.view.deleteNote(notePositionInArray);

        // Update saved notes
        this.saveNotes();
    }

    /**
     * Saves all notes in localStorage
     */
    saveNotes() {
        let notesInJSON = JSON.stringify(this.notes);
        localStorage.setItem("notes", notesInJSON);
    }

    /**
     * Loads all notes from localStorage if there is any.
     * Updates id to the appropiate number.
     */
    loadStoredNotes() {
        let notesInJSON = JSON.parse(localStorage.getItem("notes"));
        if (notesInJSON && notesInJSON.length > 0) {
            this.notes = notesInJSON;
            this.id = this.notes[this.notes.length - 1].id + 1;
        }
    }
}

export { NotesController };

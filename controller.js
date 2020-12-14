// @ts-check
import { Note } from "./models.js";
import { CorkView, NoteCorkView } from "./views.js";

/**
 * Controller class for note and its views
 */
class NotesController {
    constructor() {
        // Create view
        this.view = new CorkView();

        // Adds event listener to create new note
        this.view.createNewNoteButton.addEventListener("click", () => {
            this.view.createNewNoteFrame();
            this.view.createNewNoteButton.disabled = true;
            this.view.createNewNoteButton.classList.add("disabled");

            // Add event listener to create note to the add note button
            this.view.newNoteFrame.addNoteButton.addEventListener("click", () => {
                this.createNote();
            });
        });

        /** @type {Array<Note>} Array to store all the notes*/
        this.notes = [];

        // ID to assing to the next note
        this.id = 0;

        // Load stored notes if there are any
        this.loadStoredNotes();

        // Add stored notes to view
        for (const note of this.notes) {
            let noteView = this.view.createNote(note.id, note.title, note.text, note.timestamp, note.color);
            noteView.deleteIcon.addEventListener("click", this.deleteNote.bind(this));
        }

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
            let noteView = this.view.createNote(this.id, title, text, timestamp, "#FFFFFF");
            this.view.closeNewNoteFrame();
            this.saveNotes();
            this.id++;

            // Add event listener to delete icon
            noteView.deleteIcon.addEventListener("click", this.deleteNote.bind(this));
        }
    }

    /**
     * Deletes the note clicked by the user
     * @param {MouseEvent} e 
     */
    deleteNote(e) {
        /** @type {NoteCorkView} */
        // @ts-ignore
        let noteView = e.target.parentElement;

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
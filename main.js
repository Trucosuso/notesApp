// @ts-check
import { NotesController } from "./controller.js";
// To define custom html elements
import { NewNoteFrameCork, NoteCorkView, NewNoteFrameStack, NoteStackView } from "./views.js";

// Define custom HTML elements
customElements.define("new-note-frame-cork", NewNoteFrameCork, { extends: "div" });
customElements.define("note-cork", NoteCorkView, { extends: "div" });
customElements.define("new-note-frame-stack", NewNoteFrameStack, { extends: "div" });
customElements.define("note-stack", NoteStackView, { extends: "div" }); 

window.addEventListener("load", () => {
    new NotesController("cork");
});
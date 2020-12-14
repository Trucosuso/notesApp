// @ts-check
/**
 * Class representing a note
 */
class Note {
    /**
     * Create a note
     * @param {Number} id Note id
     * @param {String} title Note title
     * @param {String} text Note contents
     * @param {Number} timestamp Number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
     * @param {String} color Note color
     */
    constructor(id, title, text, timestamp, color = "white") {
        this.id = id;
        this.title = title;
        this.text = text;
        this.timestamp = timestamp;
        this.color = color;
    }
}

export { Note };

import DB from '../db/index.js';

export class Note {
  static get DB_PATH() {
    return 'notes'
  }

  static async writeDataNotes (notes) {
    return await DB.writeDataBase(Note.DB_PATH,  notes);
  }

  static async writeDataNote (note) {
    const notes = await Note.getDataNotes();
    return await Note.writeDataNotes([...notes, note]);
  }

  static async getDataNotes () {
    return await DB.readDataBase(Note.DB_PATH);
  }

  static async getDataNote (id) {
    const notes = await Note.getDataNotes();
    const note = notes.find(noteItem => `${noteItem.id}` === id);
    return note;
  }
}

export default Note;
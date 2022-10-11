import { Note } from '../../src/models/note.model.js';
import mocks from '../mocks/notes.mock.js';

export const generateRandomID = async() => {
  const fakeNote = new Note(mocks.FAKE_NOTE);
  await fakeNote.save();
  await fakeNote.remove();
  return fakeNote._id.toString();
};

export const getNotes = async() => {
  const notes = await Note.find({});
  return notes;
};

export const resetNotes = async() => await Note.deleteMany({});

export const initialNotes = async() =>
  await Promise.all(mocks.INITIAL_NOTES.map(async note => await (new Note(note)).save()));

export default {
  generateRandomID,
  getNotes,
  initialNotes,
  resetNotes
};
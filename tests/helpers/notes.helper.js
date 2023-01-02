import { Note } from '../../src/models/note.model.js';
import mocks from '../mocks/notes.mock.js';

export const generateRandomID = async(user) => {
  const fakeNote = new Note({ ...mocks.FAKE_NOTE, user: user._id });
  await fakeNote.save();
  await fakeNote.remove();
  return fakeNote._id.toString();
};

export const getNotes = async() => {
  const notes = await Note.find({});
  return notes;
};

export const resetNotes = async() => {
  await Note.deleteMany({});
};

export const initialize = async(user) => {
  await Promise.all(
    mocks.INITIAL_NOTES.map(
      async note => {
        const newNote = new Note({ ...note, user: user._id });
        return await newNote.save();
      }
    )
  );
};

export default {
  generateRandomID,
  getNotes,
  initialize,
  resetNotes
};
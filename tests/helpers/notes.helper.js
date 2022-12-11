import jwt from 'jsonwebtoken';
import { Note } from '../../src/models/note.model.js';
import mocks from '../mocks/notes.mock.js';

export const generateToken = user => jwt.sign({ email: user.email, id: user._id }, process.env.SECRET);

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

export const initialNotes = async(user) => {
  await Promise.all(mocks.INITIAL_NOTES.map(async note => await (new Note({ ...note, user: user._id })).save()));
};

export default {
  generateRandomID,
  getNotes,
  initialNotes,
  resetNotes
};
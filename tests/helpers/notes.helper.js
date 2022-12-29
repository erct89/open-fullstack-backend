import { Note } from '../../src/models/note.model.js';
import userHelpers from './users.helpers.js';
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
  await userHelpers.reset();
  await Note.deleteMany({});
};

export const initialize = async() => {
  await userHelpers.reset();
  await userHelpers.initialize();

  const users = await userHelpers.getAllUsers();
  const user = users[0];

  await Promise.all(mocks.INITIAL_NOTES.map(async note => await (new Note({ ...note, user: user._id })).save()));

  return user;
};

export default {
  generateRandomID,
  getNotes,
  initialize,
  resetNotes
};
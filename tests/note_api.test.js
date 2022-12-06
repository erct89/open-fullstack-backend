import mongoose from 'mongoose';
import supertest from 'supertest';
import { generateRandomID, initialNotes, resetNotes, getNotes } from './helpers/notes.helper.js';
import Server from '../src/models/server.model.js';

import { mocks } from './mocks/notes.mock.js';

describe('Suit notes api', () => {
  let api;

  beforeAll(() => {
    const server = new Server();
    api = supertest(server.app);
  });

  beforeEach(async() => {
    await resetNotes();
    await initialNotes();
  });

  describe('GET /api/notes', () => {

    test('Notes are returned json', async() => {
      await api.get('/api/notes')
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Notes are returned array Notes', async() => {
      const notes = await api.get('/api/notes');

      expect(Array.isArray(notes.body.data)).toBe(true);
    });

    test('Return all notes', async() => {
      const response = await api.get('/api/notes');
      const notes = response.body.data;

      expect(notes).toHaveLength(mocks.INITIAL_NOTES.length);
    });

    test('The first note is about HTTP methods', async() => {
      const response = await api.get('/api/notes');
      const content = response.body.data.map(note => note.content);
      const contentFirstNote = mocks.INITIAL_NOTES[0].content;

      expect(content).toContain(contentFirstNote);
    });

  });

  describe('POST /api/notes', () => {

    test('Notes are returned json', async() => {
      await api.post('/api/notes')
        .send(mocks.NEW_NOTE)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should be increase the number of total notes by one, when saving a new note.', async() => {
      await api.post('/api/notes')
        .send(mocks.NEW_NOTE);
      const allNotes = await getNotes();

      expect(allNotes).toHaveLength(mocks.INITIAL_NOTES.length + 1);
    });

    test('The new note must exist in the database after being added', async() => {
      await api.post('/api/notes')
        .send(mocks.NEW_NOTE);
      const allNotes = await getNotes();

      const allNotesContent = allNotes.map(note => note.content);

      expect(allNotesContent).toContain(mocks.NEW_NOTE.content);
    });

    test('Should be return error, when saving a empty new note', async() => {
      await api.post('/api/notes')
        .send({})
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });

  });

  describe('GET /api/notes/:id', () => {

    test('Note returned a json', async() => {
      const allNotes = await getNotes();
      const firstNote = allNotes[0];

      await api.get(`/api/notes/${firstNote._id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should return a note', async() => {
      const allNotes = await getNotes();
      const note = allNotes[0];

      const response = await api.get(`/api/notes/${note._id}`);

      expect(response.body.data.uid).toBe(note._id.toString());
    });

    test('Should return error, when get not exist id note', async() => {
      const fakeUID = await generateRandomID();
      await api.get(`/api/notes/${fakeUID}`)
        .expect(404)
        .expect('Content-Type', /application\/json/);
    });

  });

  describe('PUT /api/notes/:id', () => {

    test('Note returned a json', async() => {
      const allNotes = await getNotes();
      const selectedNoteID = String(allNotes[0]._id);

      await api.put(`/api/notes/${selectedNoteID}`)
        .send(mocks.PUT.BODY_SUCESS)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should modify content of note, when exist note', async() => {
      const allNotes = await getNotes();
      const selectedNoteID = String(allNotes[0]._id);

      const response = await api.put(`/api/notes/${selectedNoteID}`)
        .send(mocks.PUT.BODY_SUCESS);

      const modifyNote = response.body.data;
      expect(modifyNote).toMatchObject(mocks.PUT.BODY_SUCESS);
    });

    test('Should returned a 404 error, when exist not note', async() => {
      const selectedNoteID = await generateRandomID();

      await api.put(`/api/notes/${selectedNoteID}`)
        .send(mocks.PUT.BODY_SUCESS)
        .expect(404)
        .expect('Content-Type', /application\/json/);
    });

    test('Should returned a 400 error, when body request is not completed', async() => {
      const allNotes = await getNotes();
      const selectedNoteID = String(allNotes[0]._id);

      await api.put(`/api/notes/${selectedNoteID}`)
        .send(mocks.PUT.BODY_ERROR)
        .expect(400)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('PATCH /api/notes/:id', () => {

    test('Note returned a json', async() => {
      const allNotes = await getNotes();
      const selectedNoteID = String(allNotes[0]._id);

      await api.patch(`/api/notes/${selectedNoteID}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should modify property content of note, when exist note', async() => {
      const allNotes = await getNotes();
      const selectedNoteID = String(allNotes[0]._id);

      const response = await api.patch(`/api/notes/${selectedNoteID}`)
        .send(mocks.PATCH.BODY_CONTENT);

      const modifyNote = response.body.data;

      expect(modifyNote.content).toBe(mocks.PATCH.BODY_CONTENT.content);
    });

    test('Should modify property important of note, when exist note', async() => {
      const allNotes = await getNotes();
      const selectedNoteID = String(allNotes[0]._id);

      const response = await api.patch(`/api/notes/${selectedNoteID}`)
        .send(mocks.PATCH.BODY_IMPORTANT);

      const modifyNote = response.body.data;

      expect(modifyNote.important).toBe(mocks.PATCH.BODY_IMPORTANT.important);
    });

    test('Should modify property delete of note, when exist note', async() => {
      const allNotes = await getNotes();
      const selectedNoteID = String(allNotes[0]._id);

      const response = await api.patch(`/api/notes/${selectedNoteID}`)
        .send(mocks.PATCH.BODY_DELETE);

      const modifyNote = response.body.data;

      expect(modifyNote.delete).toBe(mocks.PATCH.BODY_DELETE.delete);
    });

    test('Should modify any properties of note, when exist note', async() => {
      const allNotes = await getNotes();
      const selectedNoteID = String(allNotes[0]._id);
      const body = { ...mocks.PATCH.BODY_DELETE, ...mocks.PATCH.BODY_CONTENT };

      const response = await api.patch(`/api/notes/${selectedNoteID}`)
        .send(body);

      const modifyNote = response.body.data;

      expect(modifyNote).toEqual(expect.objectContaining(body));
    });

    test('Should returned a error, when exist not note', async() => {
      const selectedNoteID = await generateRandomID();

      await api.patch(`/api/notes/${selectedNoteID}`)
        .send(mocks.PATCH.BODY_DELETE)
        .expect(404)
        .expect('Content-Type', /application\/json/);
    });
  });

  describe('DELETE /api/notes/:id', () => {

    test('Note returned a json', async() => {
      const allNotes = await getNotes();
      const firstNote = String(allNotes[0]._id);

      await api.delete(`/api/notes/${firstNote}`)
        .expect(200)
        .expect('Content-Type', /application\/json/);
    });

    test('Should remove a note, when exist note', async() => {
      const startNotes = await getNotes();
      const firstNote = String(startNotes[0]._id);

      const response = await api.delete(`/api/notes/${firstNote}`)
        .expect(200);

      const deleteNote = response.body.data;

      expect(deleteNote.delete).toBe(true);
    });

    test('Should remove error, when not exist note', async() => {
      const fakeUID = await generateRandomID();
      let allNotes = await getNotes();

      allNotes = allNotes.map(note => note._id.toString());

      expect(allNotes).not.toContain(fakeUID);

      await api.delete(`/api/notes/${fakeUID}`)
        .expect(404);
    });

  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
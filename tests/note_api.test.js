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
      const response = await api.post('/api/notes')
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

  describe('PUT /api/notes/:id', () => {});

  describe('PATCH /api/notes/:id', () => {});

  describe('DELETE /api/notes/:id', () => {

    test('Note returned a json', async() => {});

    test('Should remove a note, when exist note', async() => {});

    test('Should remove a note, when exist note', async() => {});

  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
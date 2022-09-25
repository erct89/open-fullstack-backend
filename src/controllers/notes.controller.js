import Note from '../models/note.model.js';

/**
 * Handle GET /api/notes
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const getNotes = async (request, response) => {
  const notes = await Note.find({});
  response.status(200).json({ data: notes });
};

/**
 * Handle POST /api/notes
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const createNote = async (request, response) => {
  const { content, important } = request.body;
  const newNote = new Note({ content, important });

  const note = await newNote.save();

  response.status(200).json({ data: note });
};

/**
 * Handle request GET /api/notes/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const getNote = async(request, response) => {
  const uid = request.params.id;
  const note = await Note.findById(uid);

  if (!note) {
    return response.status(404).json({ 'message': `Not found note ${uid}` });
  }

  response.status(200).json({ data: note });
};

/**
 * Handle request PUT /api/notes/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const updateNote = async(request, response) => {
  const uid = request.params.id;
  const { important, content } = request.body;

  if (!(typeof important === 'boolean') || !(typeof content === 'string')) {
    return response.status(400).json({ 'message': `Error not found all params` });
  }

  const data = await Note.findByIdAndUpdate(uid, { important, content }, { new: true });

  response.status(200).json({ data });
};

/**
 * Handle request PATCH /api/notes/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} error
 */
export const modifyNote = async(request, response) => {
  const uid = request.params.id;
  const body = request.body;
  let noteToUpdated = {};

  if (typeof body.important === 'boolean') {
    noteToUpdated.important = body.important;
  }

  if (typeof body.content === 'string' && body.content.trim().length) {
    noteToUpdated.content = body.content;
  }

  const data = await Note.findOneAndUpdate({ _id: uid }, noteToUpdated, { new: true });

  response.status(200).json({ data });
};

/**
 * Handle request DELETE /api/notes/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const removeNote = async(request, response) => {
  const id = request.params.id;
  const notes = await Note.getDataNotes();

  const indexNoteToRemove = notes.findIndex(noteItem => `${noteItem.id}` === id);

  if (indexNoteToRemove === -1) {
    return response.status(404).json({ 'message': `Not found note ${id}.` });
  }

  await Note.writeDataNotes([...notes.slice(0, indexNoteToRemove),...notes.slice(indexNoteToRemove + 1)]);
  response.status(200).json({ data: notes[indexNoteToRemove] });
};
import jwt from 'jsonwebtoken';
import Note from '../models/note.model.js';
import User from '../models/user.model.js';

const getTokenFrom = request => {
  const authorization = request.get('authorization');

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7);
  }

  return null;
};

/**
 * Handle GET /api/notes
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const getNotes = async (request, response) => {
  const notes = await Note.find({})
    .populate('user', { userName: 1, name: 1, email: 1 });

  response.status(200).json({ data: notes });
};

/**
 * Handle POST /api/notes
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const createNote = async (request, response) => {
  const token = getTokenFrom(request);
  const decoderToken = jwt.verify(token, process.env.SECRET);

  const { content, important } = request.body;
  const user = await User.findOne({ email: decoderToken.email });

  if (!token && !decoderToken.email || !user) {
    return response.status(401).json({ error: '401', data: { message: 'Unauthorized, missing token or invalid' } });
  }

  const newNote = new Note({ content, important, user: user._id });

  const note = await newNote.save();

  user.notes = [...user.notes, note._id];
  await user.save();

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
  const note = await Note.findById(uid)
    .populate('user', { userName: 1, name: 1, email: 1 });

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

  if (!data) {
    return response.status(404).json({ 'message': `Not found note ${uid}` });
  }

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

  if (typeof body.delete === 'boolean') {
    noteToUpdated.delete = body.delete;
  }

  if (typeof body.content === 'string' && body.content.trim().length) {
    noteToUpdated.content = body.content;
  }

  const data = await Note.findOneAndUpdate({ _id: uid }, noteToUpdated, { new: true });

  if (!data) {
    return response.status(404).json({ 'message': `Not found note ${uid}` });
  }

  response.status(200).json({ data });
};

/**
 * Handle request DELETE /api/notes/:id
 * @param {Object} request
 * @param {Object} response
 * @param {Function} next
 */
export const removeNote = async(request, response) => {
  const uid = request.params.id;
  const note = await Note.findById(uid);

  if (!note || note?.delete) {
    return response.status(404).json({ 'message': `Not found note ${uid}.` });
  }

  const data = await Note.findByIdAndUpdate(uid, { delete: true }, { new: true });
  response.status(200).json({ data });
};
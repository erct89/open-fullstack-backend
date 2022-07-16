import {v4 as uuidv4} from 'uuid';
import Note from '../models/note.model.js';

/**
 * Handle GET /api/notes
 * @param {Object} request 
 * @param {Object} response 
 */
export const getNotes = async (request, response) => {
  try {
    const notes = await Note.getDataNotes();
    response.status(200).json(notes);
  } catch (error) {
    console.error(`[ERROR][GET] notes`);
    console.error(error);
    response.status(500).send(error);
  }
}

/**
 * Handle POST /api/notes
 * @param {*} request 
 * @param {*} response 
 */
export const createNote = async (request, response) => {
  try {
    const id = uuidv4();
    const {name, important} = request.body;
    const newNote = {id, name, date: (new Date()).toISOString(), important: !!important}

    const data = await Note.writeDataNote(newNote);

    response.status(200).json({message: "Success Post", data});
  } catch (error) {
    console.error(`[ERROR][POST][${request}]`);
    console.error(error);
    response.status(500).send(error);
  }
}

/**
 * Handle request GET /api/notes/:id
 * @param {Object} request 
 * @param {Object} response 
 */
export const getNote = async(request, response) => {
  try {
    const id = request.params.id;
    const note = await Note.getDataNote(id);

    if (!note) {
      return response.status(404).json({"message": `Not found note ${id}`});
    }

    response.status(200).json({ data: note });
  } catch (error) {
    response.status(500).json({"message": `Error get note ${id}`, error});
  }
}

export const updateNote = async(request, response) => {}
export const modifyNote = async(request, response) => {}

/**
 * Handle request DELETE /api/notes/:id
 * @param {Object} request
 * @param {Object} response
 */
export const removeNote = async(request, response) => {
  try {
    const id = request.params.id;
    const notes = await Note.getDataNotes();

    const indexNoteToRemove = notes.findIndex(noteItem => `${noteItem.id}` === id);

    if (indexNoteToRemove === -1) {
      return response.status(404).json({"message": `Not found note ${id}.`});
    }

    await Note.writeDataNotes([...notes.slice(0, indexNoteToRemove),...notes.slice(indexNoteToRemove + 1)]);
    response.status(200).json({data: notes[indexNoteToRemove]});
  } catch (error) {
    response.status(500).json({"message": `Error delete note ${id}`, error});
  }
}
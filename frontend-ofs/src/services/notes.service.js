import axios from 'axios';
import {DB_BASE_URL, _getData} from './common.service';

const BASE_URL = `${DB_BASE_URL}/notes`;

/**
 * Api to get notes.
 * @async
 * @returns {Promise}
 */
export const getNotes = async () => {
  const response = await axios.get(BASE_URL);

  return await _getData(response);
}

/**
 * Api to post note
 * @param {Object} note 
 * @returns {Promise}
 */
export const postNote = async (note) => {
  const response = await axios.post(BASE_URL, note);

  return await _getData(response);
}

/**
 * Api to put note
 * @param {Object} note 
 * @returns {Promise}
 */
export const patchNote = async (note) => {
  const response = await axios.patch(`${BASE_URL}/${note.uid}`, note);

  return await _getData(response);
}

/**
 * Api to delete note
 * @param {Object} note 
 * @returns {Promise}
 */
export const deleteNote = async (note) => {
  const response = await axios.delete(`${BASE_URL}/${note.uid}`);

  return await _getData(response);
}
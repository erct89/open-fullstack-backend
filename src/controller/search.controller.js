import Mongoose from 'mongoose';
import { Contact } from '../models/contact.model.js';
import { Note } from '../models/note.model.js';

/**
 * Search Contact for id, name or number
 * @param {String} match 
 */
const searchContact = async(match) => {
  const isValidId = Mongoose.isValidObjectId(match);

  if (isValidId) {
    const data = await Contact.findById(match);
    return [data];
  }

  const regex = new RegExp(match, 'i');
  const data = await Contact.find({
    $or: [{ name: regex }, { number: regex }],
    $and: [{ delete: false }]
  });
  return data;
}

/**
 * Search note for id or content.
 * @param {String} match 
 */
const searchNote = async(match) => {
  const isValidId = Mongoose.isValidObjectId(match);

  if (isValidId) {
    const data = await Note.findById(match);
    return [data];
  }

  const regex = new RegExp(match, 'i');
  const data = await Note.find({ content: regex, delete: false });
  return data;
}

const COLLECTIONS = {
  [Contact.collection.name]: searchContact,
  [Note.collection.name]: searchNote
};

/**
 * 
 * @param {Object} request 
 * @param {Object} response 
 */
export const search = async(request, response) => {
  const { collection, match } = request.params;

  const handleSearch = COLLECTIONS[collection];

  if (!handleSearch) {
    response.status(404).json({ error: ''});
  }

  try {
    const data = await handleSearch(match);

    response.status(200).json({ data });
  } catch(error) {
    response.status(404).json({ error: 'Error - not found' });
  }
};

export default search;
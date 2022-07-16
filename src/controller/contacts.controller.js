import { v4 as uuidv4 } from 'uuid';
import Contact from '../models/contact.model.js';

/**
 * Handle GET /api/contacts
 * @param {Object} request
 * @param {Object} response
 */
export const getContacts = async (request, response) => {
  try {
    const contacts = await Contact.getDataContacts();
    response.status(200).json({ data: contacts });
  } catch (error) {
    console.log('[ERROR][GET] contacts:', error);
    response.status(500).json({
      message: 'Service error to get contacts',
      error: JSON.stringify(error),
    });
  }
};

/**
 * Handle POST /api/contacts
 * @param {Object} request
 * @param {Object} response
 */
export const createContact = async (request, response) => {
  try {
    const { name, number } = request.body;

    if (!name || !number) {
      return response
        .status(400)
        .json({ message: 'Missing parameters in the request.' });
    }

    const contacts = await Contact.getDataContacts();
    const findContact = contacts.find(contactItem => contactItem.name === name);

    if (findContact) {
      return response
        .status(400)
        .json({ message: 'A contact with the same name already exists' });
    }

    const contact = await Contact.writeDataContact({id: uuidv4(), name, number, date: (new Date()).toISOString()});
    response.status(200).json({ data: contact });
  } catch (error) {
    console.log('[ERROR][POST] contacts:', error);
    response.status(500).json({
      message: 'Service error to create contacts.',
      error: JSON.stringify(error),
    });
  }
};

/**
 * Handle GET /api/contacts/:id
 * @param {Object} request
 * @param {Object} response
 */
export const getContact = async (request, response) => {
  const { id } = request.params;

  try {
    const contact = await Contact.getDataContact(id);

    if (!contact) {
      return response.status(404).json({ message: `Not found contact ${id}` });
    }

    response.status(200).json({ data: contact });
  } catch (error) {
    console.log(`[ERROR][GET] contact ${id}:`, error);
    response.status(500).json({
      message: 'Service error to get contacts',
      error: JSON.stringify(error),
    });
  }
};

/**
 * Handle PUT /api/contacts/:id
 * @param {Object} request
 * @param {Object} response
 */
export const updateContact = (request, response) => {
  response.status(200).json({ message: 'PUT CONTACT ID' });
};

/**
 * Handle PATCH /api/contacts/:id
 * @param {Object} request
 * @param {Object} response
 */
export const modifyContact = (request, response) => {
  response.status(200).json({ message: 'PATCH CONTACT ID' });
};

/**
 * Handle DELETE /api/contacts/:id
 * @param {Object} request
 * @param {Object} response
 */
export const removeContact = (request, response) => {
  response.status(200).json({ message: 'PATCH CONTACT ID' });
};

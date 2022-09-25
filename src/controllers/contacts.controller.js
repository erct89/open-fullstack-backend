import Contact from '../models/contact.model.js';

/**
 * Handle GET /api/contacts
 * @param {Object} request
 * @param {Object} response
 */
export const getContacts = async (request, response) => {
  const contacts = await Contact.find({});
  response.status(200).json({ data: contacts });
};

/**
 * Handle POST /api/contacts
 * @param {Object} request
 * @param {Object} response
 */
export const createContact = async (request, response) => {
  const { name, phoneNumber } = request.body;

  if (!name || !phoneNumber) {
    return response.status(400)
      .json({ message: 'Missing parameters in the request.' });
  }

  const contact = new Contact({ name, phoneNumber });
  const contactResult = await contact.save();

  response.status(200).json({ data: contactResult });
};

/**
 * Handle GET /api/contacts/:id
 * @param {Object} request
 * @param {Object} response
 */
export const getContact = async (request, response) => {
  const { id } = request.params;

  const data = await Contact.findById(id);

  response.status(200).json({ data });
};

/**
 * Handle PUT /api/contacts/:id
 * @param {Object} request
 * @param {Object} response
 */
export const updateContact = async(request, response) => {
  const { id } = request.params;
  const { name, number, active = true } = request.body;

  if (!name || typeof name !== 'string' && name.trim().length) {
    return response.status(400).json({ message: 'Parameters do not comply with service agreements' });
  }

  if (!number || typeof number !== 'string' && number.trim().length < 6) {
    return response.status(400).json({ message: 'Parameters do not comply with service agreements' });
  }

  if (typeof active !== Boolean) {
    return response.status(400).json({ message: 'Parameters do not comply with service agreements' });
  }

  const data = await Contact.findByIdAndUpdate(id, { name, number, active }, { new: true, runValidators: true });

  response.status(200).json({ message: 'PUT CONTACT ID', data });
};

/**
 * Handle PATCH /api/contacts/:id
 * @param {Object} request
 * @param {Object} response
 */
export const modifyContact = async(request, response) => {
  const { id } = request.params;
  const { name, active, phoneNumber } = request.body;
  let proposal = {};

  if (typeof name === 'string' && name.trim().length > 0) {
    proposal = { ...proposal, name };
  }

  if (typeof phoneNumber === 'string' && phoneNumber.trim().length < 6) {
    proposal = { ...proposal, phoneNumber };
  }

  if (typeof active === Boolean) {
    proposal = { ...proposal, active };
  }

  if (!Object.keys(proposal).length) {
    return response.status(400).json({ message: '[ERROR][PATCH][CONTACT]: Error in params', error: 'Bad request' });
  }

  const data = await Contact.findByIdAndUpdate(id, proposal, { new: true, runValidators: true });
  response.status(200).json({ message: 'OK', data });
};

/**
 * Handle DELETE /api/contacts/:id
 * @param {Object} request
 * @param {Object} response
 */
export const removeContact = async(request, response) => {
  const { id } = request.params;

  const data = await Contact.findByIdAndDelete(id);
  response.status(200).json({ message: '[SUCCESS][DELETE][CONTACT]: Success', data });
};

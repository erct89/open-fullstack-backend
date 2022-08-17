import { Contact } from '../models/contact.model.js';

export const isUniqueContactName = errorCode => async (name) => {
  const searchContact = await Contact.find({ name });

  if (searchContact.length) {
    throw new Error(`${errorCode}-USER-NAME-EXIST`);
  }

  return true;
};

export const isUniqueContactPhoneNumber = errorCode => async (phoneNumber) => {
  const searchContact = await Contact.find({ phoneNumber });

  if (searchContact.length) {
    throw new Error(`${errorCode}-USER-PHONE-NUMBER-EXIST`);
  }

  return true;
};

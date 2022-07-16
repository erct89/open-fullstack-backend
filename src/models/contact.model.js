import DB from '../db/index.js';

export class Contact {
  static get DB_PATH() {
    return 'contacts';
  }

  static async writeDataContacts(contacts) {
    return await DB.writeDataBase(Contact.DB_PATH, contacts);
  }

  static async writeDataContact(contact) {
    const contacts = await Contact.getDataContacts();
    await Contact.writeDataContacts([...contacts, contact]);
    return contact;
  }

  static async getDataContacts() {
    return await DB.readDataBase(Contact.DB_PATH);
  }

  static async getDataContact(id) {
    const contacts = await Contact.getDataContacts();
    const contact = contacts.find((contactItem) => `${contactItem.id}` === id);
    return contact;
  }
}

export default Contact;

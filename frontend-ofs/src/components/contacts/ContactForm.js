import React, { useState } from 'react';

import Header from '../header/Header';

const EMPTY_CONTACT = { name: '', phoneNumber: '' };

export const ContactForm = ({ onAddNewContact, isValid = () => true }) => {
  const [newContact, setNewContact] = useState(EMPTY_CONTACT);

  const handleChange = (ev) => {
    const {
      target: { name, value },
    } = ev;

    switch (name) {
      case 'contact-name':
        setNewContact({ ...newContact, name: value });
        break;
      case 'contact-number':
        setNewContact({ ...newContact, phoneNumber: value });
        break;
    }
  };

  const isValidContact = ({ name, phoneNumber }) => {
    let result = true;

    // validar tamaño contacto
    result = !!name.trim().length;
    result = !!phoneNumber.match(/^[0-9]{9}$/g)?.length;

    // validad repeticion contacto.
    result = result && isValid({ name, phoneNumber });

    if (result) {
      setNewContact(EMPTY_CONTACT);
    }

    return result;
  };

  const handleOnSubmit = (ev) => {
    ev.preventDefault();

    if (isValidContact(newContact)) {
      onAddNewContact(newContact);
    }
  };

  return (
    <div>
      <Header level="2">Create new contact</Header>
      <form onSubmit={handleOnSubmit}>
        <div>
          <div>
            <label htmlFor="contact-name">
              Name:
              <input
                type="text"
                name="contact-name"
                placeholder="Nombre del contacto"
                required
                autoComplete='off'
                value={newContact.name}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Phone:
              <input
                type="tel"
                name="contact-number"
                min="9"
                max="9"
                placeholder="Phone number"
                required
                autoComplete='off'
                value={newContact.phoneNumber}
                onChange={handleChange}
              />
            </label>
          </div>
          <input type="submit" name="constact-button-add" value="ADD" />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;

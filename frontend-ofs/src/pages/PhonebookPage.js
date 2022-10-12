import React, { useState, useEffect } from 'react';

import * as contactService from '../services/contacts.service';

import ContactForm from '../components/contacts/ContactForm';
import ContactList from '../components/contacts/ContactList';
import ContactSearch from '../components/contacts/ContactSearch';
import Notification from '../components/notification/Notification';

import literals from '../locales/es.json';

export const PhonebookPage = (props) => {
  const [notify, setNotify] = useState({});
  const [contacts, setContacts] = useState([]);
  const [contactsFiltered, setContactsFiltered] = useState([]);
  const [errors, setErrors] = useState([]);

  const isValidContact = contact => true;

  const settingHandleErrors = codeError => rawError => {
    const { data } = rawError?.response;
    const {message, errors} = data;
    const errorMsg = [`<p>${message}<p>`, ...errors.map(error => `<p>${error.msg}<p>`)];

    setNotify({type:'error', multiple: true, message: errorMsg.join('')});

    console.log(`[ERROR]: ${codeError}`);
    console.log(rawError);
  }

  const handleGetContacts = () => {
    contactService.getContacts()
      .then(setContacts)
      .catch(settingHandleErrors('GET Contacts'));
  }

  const handleNewContact = (newContact) => {
    const indexContactRegister = contacts.findIndex((contactItem) => newContact.name === contactItem.name);

    if (indexContactRegister !== -1 && window.confirm(`The contact ${newContact.name} exist, want to update it?`)) {
      contactService.putContact({...contacts[indexContactRegister], ...newContact})
      .then(contactUpdate => {
        setContacts([...contacts.slice(0, indexContactRegister), contactUpdate,...contacts.slice(indexContactRegister+1)]);
        setNotify({type:'success', message: `The contact "${contactUpdate.name}" is modified.`});
      }).catch(settingHandleErrors('PUT contacts'));
    } else {
      contactService.postContact(newContact)
      .then(newContactItem => {
        setNotify({type:'success', message: `The contact "${newContactItem.name}" is created.`});
        setContacts([...contacts, newContactItem]);
      }).catch(settingHandleErrors('POST contacts'));
    }
  };

  const handleSeached = ({ search, value }) => {
    setContactsFiltered(value);
  };

  const handleSelectItem = (ev) => {
    console.log('CLICK LIST ITEM');
    console.log(ev);
  };

  const handleDeleteContact = (contact) => {
    // Confirmación
    if (window.confirm(`Delete ${contact.name}?`)) {
      contactService.deleteContact(contact)
        .then(() => {
          const index = contacts.findIndex(contactItem => contactItem.uid === contact.uid);
          const deleteContact = contacts[index];
          
          if (index > -1) {
            setNotify({type:'success', message: `The contact "${deleteContact.name}" is deleted.`});
          }

          handleGetContacts();
        }).catch(settingHandleErrors('DELETE contact'));
    }
  };

  useEffect(handleGetContacts,[]);

  return (
    <div hidden={props.hidden}>
      <ContactSearch
      list={contacts}
      path="name"
      onSearched={handleSeached.bind(this)}
      />
      <ContactForm
      onAddNewContact={handleNewContact}
      isValid={isValidContact}
      />
      <ContactList
      onSelectedItem={handleSelectItem}
      onDelete={handleDeleteContact}
      list={contactsFiltered.length ? contactsFiltered : contacts}
      literals ={literals}
      />
      <Notification 
      center 
      multiple={notify.multiple}
      type={notify.type}
      message={notify.message}
      />
    </div>
  );
};

export default PhonebookPage;

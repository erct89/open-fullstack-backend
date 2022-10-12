import React from 'react';

import Header from '../header/Header';
import List from '../list/List';
import ContactItem from './ContactItem';

export const ContactList = ({ list = [], literals, onSelectedItem, ...actions }) => {
  const isEmpty = list.length === 0;
  const emptyTemplate = <div><p>{literals['contact-list']['contacts-list-empty-message']}</p></div>;
  const listTemplate = <List items={list} literals={literals} pathToKey='id' customComponents={ContactItem} onSelectedItem={onSelectedItem} {...actions}/>

  return (
    <div>
      <Header level="2">{literals['contact-list']['contacts-list-header']}</Header>
      {isEmpty ? emptyTemplate : listTemplate}
    </div>
  );
};

export default ContactList;

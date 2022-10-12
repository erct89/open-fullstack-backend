import React, {useEffect, useState} from 'react';

import {translate} from '../libs/i18n';
import {getNotes, postNote, patchNote, deleteNote} from '../services/notes.service';

import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import List from '../components/list/List';
import Notification from '../components/notification/Notification';
import NoteItem from '../components/notes/NoteItem';
import NoteForm from '../components/notes/NoteForm';
import FilterItem from '../components/filter/FilterItem';

import literals from '../locales/es.json';

const FILTERS = [
  {id: 'ALL', value:'All', filter: note => true, label:'common.label-all' , default: true},
  {id:'IMPORTANT', value: 'Important', filter: note => note.important, label:'common.label-important'},
  {id:'DELETE', value: 'Delete', filter: note => note.delete, label: 'common.label-delete'}
];

const t = translate(literals);

export function NotePage (props) {
  const [error, setError] = useState({});
  const [filter, setFilter] = useState(FILTERS.find(filterItem => filterItem.default));
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState({});

  useEffect(() => {
    getNotes()
      .then(setNotes)
      .catch(error => {
        console.log('Get notes error: ');
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (error && error.message) {
      // setTimeout(() => setError({}), 3000);
    }
  }, [error]);

  /**
   * Handler to add note
   * @param {note} note 
   */
   const handleAddNote = ({content, important}) => {
    const newNote = {
      "content": content,
      "date": new Date().toISOString(),
      "important": !!(important)
    };

    postNote(newNote)
      .then(note => setNotes([...notes, note]))
      .catch(error => {
        console.log('Post notes error:');
        console.log(error);
      });
  }

  /**
   * Handler to modified note
   * @param {Object} modifiedNote 
   */
  const handleModified = (modifiedNote) => {
    const indexEditNote = notes.findIndex(noteItem => noteItem.id === modifiedNote.id);

    if (indexEditNote === -1) {
      setError({type: 'error', message: t('notes-page.error.note-not-found')});
      return;
    }

    if (modifiedNote.delete) {
      setError({type: 'error', message: t('notes-page.error.note-deleted-not-edit')});
      return;
    }

    patchNote(modifiedNote)
      .then(note => {
        setNotes([...notes.slice(0,indexEditNote), note, ...notes.slice(indexEditNote + 1, notes.length)]);
        setSelectedNote({});
      }).catch(error => {
        console.log('Put notes error:');
        console.log(error);
      });
  }

  /**
   * Selected iten to edit
   * @param {Object} note 
   */
  const handleSelectedItem = note => setSelectedNote(note);

  /**
   * Selected filter
   * @param {Object} filter
   */
  const handleSelectedFilter = filter => setFilter(filter);

  /**
   * Handle click delete button
   * @param {Object} note 
   */
  const handleDeleteItem = (note) => {
    const indexToFind = notes.findIndex(noteItem => noteItem.id === note.id);

    if (indexToFind !== -1 && note.delete) {
      deleteNote(note)
        .then(() => {
          setSelectedNote({});
          setNotes([...notes.slice(0, indexToFind), ...notes.slice(indexToFind + 1)])
        }).catch(error => {
          console.log('[ERROR]: DELETE note');
          console.log(error);
        });
    }
  }

  /**
   * Exit edit mode
  */
  const handleExitEditMode = () => setSelectedNote({});
  
  /**
   * Validator for new notes
   * @param {Object} note
   * @returns {Boolean}
   */
  const validationNewNote = note => true;

  return (
    <div className="Page" hidden={props.hidden}>
      <header className="App-header">
        <Header level="1">{t('notes-page.header-page')}</Header>
      </header>
      <main>
        <Header level="3">
          {!selectedNote?.content 
            ? t('notes-page.header-note') 
            : t('notes-page.header-edit')}
        </Header>
        <NoteForm 
          literals={literals} 
          onAdd={handleAddNote}
          onModified={handleModified}
          onDelete={handleDeleteItem}
          onExitEditMode={handleExitEditMode}
          validation={validationNewNote}
          editMode={!!selectedNote?.content}
          note={selectedNote}/>
        <Notification center type={error.type} message={error.message}/>

        <Header level="3">{t('notes-page.notes')}</Header>
        <Header level="4">Filter by:</Header>
        <List
          className="content mg-t--m mg-b--m"
          classNameList="row space-around"
          role="button"
          href="/#!/"
          customComponents={FilterItem}
          literals={literals}
          items={FILTERS}
          itemSelected={filter}
          onSelectedItem={handleSelectedFilter}>
        </List>
        <List
          classNameItem="note"
          literals={literals}
          items={notes?.filter(filter.filter)} 
          itemSelected={selectedNote}
          customComponents={NoteItem}
          emptyComponents={() => <p>{t('notes-page.empty-notes')}</p>}
          onSelectedItem={handleSelectedItem}>
        </List>
      </main>
      <Footer message={t('notes-page.footer-message')}></Footer>
    </div>
  );
}

export default NotePage;

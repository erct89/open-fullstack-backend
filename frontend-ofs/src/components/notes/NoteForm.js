import React, { useState, useEffect } from 'react';

import {translate} from '../../libs/i18n';

const INIT_STATES = {
  'NOTE': { content: '', important: false, default: false },
  'EDIT_MODE': false
};

export function NoteForm (props) {
  const { literals, note, validation, editMode, onAdd, onModified, onExitEditMode, onDelete} = props;

  const [innerNote, setInnerNote] = useState(INIT_STATES['NOTE']);
  const [innerEditMode, setInnerEditMode] = useState(INIT_STATES['EDIT_MODE']);

  const t = translate(literals);

  useEffect(() => {
    setInnerEditMode(editMode);
    if (editMode && note?.content) {
      setInnerNote({...note})
    }
  }, [note, editMode]);

  const reset = () => {
    setInnerNote(INIT_STATES['NOTE']);
    setInnerEditMode(INIT_STATES['EDIT_MODE']);
  }

  /**
   * Handle submit form
   * @param {Event} ev Event of submit form
   */
  const handleSubmit = (ev) => {
    ev && ev.preventDefault && ev.preventDefault();

    if (validation(innerNote)) {
      innerEditMode
        ? onModified(innerNote)
        : onAdd(innerNote);
    }

    reset();
  }

  /**
   * Handle changes event
   * @param {Event} ev Event change input
   */
  const handleChange = ev => {
    const {target} = ev;

    switch(target.name) {
      case 'note_content':
        setInnerNote({...innerNote, content: target.value});
        break;
        case 'note_important':
        setInnerNote({...innerNote, important: target.checked});
        break;
      default:
        break;
    }
  }


  const handleControlClick = (ev) => {
    const {target} = ev;

    switch(target.name) {
      case 'control-delete':
        if (innerNote.delete) {
          onDelete(innerNote)
        } else {
          onModified({...innerNote, delete: true});
        }
        break;
      case 'control-restart':
        onModified({...innerNote, delete: false});
        break;
      case 'control-exit-edit-mode':
        onExitEditMode();
        break;
        default:
          break;
        }

    setInnerEditMode(false);
    reset();
  }

  return (<form onSubmit={handleSubmit}>
    <div>
      <label>{t('note-form.label-note-input')}
        <input 
          type="text"
          name="note_content"
          value={innerNote.content}
          placeholder={t('note-form.placeholder-note-input')}
          autoComplete="off"
          onChange={handleChange}
          />
      </label>
    </div>
    <div>
      <label>
        {t('note-form.label-note-important')}
        <input type="checkbox" name="note_important"
          value="true"
          checked={innerNote.important}
          onChange={handleChange}
          />
      </label>
    </div>
    <div>
      <input type="submit" value={t(`note-form.label-note-submit-button${!innerEditMode ? '-create' : '-update'}`)} />
      {innerEditMode && !innerNote.delete && <input type="button" name="control-delete" value={t('common.label-delete')} onClick={handleControlClick} />}
      {innerEditMode && innerNote.delete && <input type="button" name="control-restart" value={t('common.label-restart')} onClick={handleControlClick} />}
      {innerEditMode && <input type="button" name="control-exit-edit-mode" value={t('note-form.label-note-exit-edit-mode-button')} onClick={handleControlClick} />}
    </div>
  </form>)
}

export default NoteForm;
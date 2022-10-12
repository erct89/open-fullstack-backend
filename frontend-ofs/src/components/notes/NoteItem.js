import './NoteItem.css';
import React from 'react';

export function NoteItem(props) {
  const {item, itemSelected, onSelect} = props;
  const {content, important} = item;

  const isFunction = (validateFunc) => validateFunc instanceof Function;
  const isSelected = () => itemSelected.id === item.id;

  const handleSelect = () => isFunction(onSelect) && onSelect(item);

  return (<div className={`${isSelected() ? 'note-selected' : ''} ${item.delete ? 'note-delete': ''}`} onClick={handleSelect}>
    <p >{important ? <span>[I]</span>: null} {content}</p>
  </div>);
}

export default NoteItem;
import React from 'react';

export const ContactItem = (props) => {
  const {item, literals, onSelect, onDelete} = props;

  const handleClick = ev => onSelect({...ev, itemSelected: item});
  const handleClickDelete = ev => onDelete(item);

  return (<div onClick={handleClick}>
    <p>
      <span>{item.name}</span> {item.phoneNumber}
      <input type="button" name="contact_delete" value={literals['common']['label-delete']} onClick={handleClickDelete}/>
    </p>
  </div>);
}

export default ContactItem;
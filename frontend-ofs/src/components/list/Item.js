import React from 'react';

export const Item = (props) => {
  const { classNameItem } = props;

  return (
    <li className={classNameItem}>
      {props.children}
    </li>);
};

export default Item;
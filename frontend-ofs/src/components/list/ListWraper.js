import React from 'react';

export function ListWraper (props) {
  const CustomTag = props.isOrder ? 'ol' : 'ul';
  return (<CustomTag className={props.className}>{props.children}</CustomTag>);
}

export default ListWraper;
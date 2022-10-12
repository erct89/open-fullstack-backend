import React from 'react';

import {translate} from '../../libs/i18n';

export const FilterItem = props => {
  const {item, itemSelected, classNameItem, literals, onSelect, ...restProps} = props;

  const t = translate(literals);

  return (
    <a 
      className={`${classNameItem || ''} ${item.id === itemSelected.id ? 'selected' : ''}`} 
      value={item.label}  
      onClick={() => onSelect(item)}
      {...restProps}>
      {t(item.label)}
    </a>);
};

export default FilterItem;
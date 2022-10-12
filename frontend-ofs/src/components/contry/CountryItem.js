import React from 'react';

export function CountryItem (props) {
  const {item, literals, onSelect} = props;

  const handleClick = (ev) => {
    onSelect && onSelect(item);
  }

  return (
    <div>
      <p>
        <span>{item.flag}</span> {item.name.common} 
        <input type="button" value={literals?.labelItemButton} onClick={handleClick}/>
      </p>
    </div>
  );
}

export default CountryItem;
import React, { useState } from 'react';

import Header from '../header/Header';

export const ContactSearch = ({ list, path, onSearched }) => {
  const [search, setSeach] = useState('');
  const [filterList, setFilterList] = useState([]);

  const handleChange = (ev) => {
    const {
      target: { name, value },
    } = ev;

    switch (name) {
      case 'search':
        setSeach(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const filtered = list.filter((item) => {
      return item[path].includes(search);
    });

    setFilterList(filtered);

    onSearched && onSearched({ search, value: filtered });
  };

  return (
    <div>
      <Header level="2">Busqueda de usuario</Header>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="search">
            <input
              type="search"
              name="search"
              placeholder="Search Contact"
              value={search}
              onChange={handleChange}
            />
            {search.length > 0 ? (
              <p>
                results: {filterList.length}/{list.length}
              </p>
            ) : null}
          </label>
        </div>
        <div>
          <input type="submit" name="submit" value="Buscar" />
        </div>
      </form>
    </div>
  );
};

export default ContactSearch;

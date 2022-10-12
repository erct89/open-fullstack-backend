import axios from 'axios';
import React, { useEffect, useState } from 'react';

const getSearchByNameCountries = async (name) => {
  const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);

  return response.data;
}

export function CountrySearchForm (props) {
  const { 
    labelSearch, 
    labelMoreInfo, 
    labelMoreInfoEmpty, 
    placeholderSearch, 
    defaultValue, 
    minSizeToSearh = 3,
    validator = () => true,
    showMoreInfo = true,
    onSearch = () => {},
    onSearchError = () => {} 
  } = props;
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    if (searchValue && searchValue.trim() && searchValue.length >= minSizeToSearh){
      getSearchByNameCountries(searchValue)
      .then(response => {
        onSearch(response);
        setSearchResult(response);
      }).catch(error => {
        onSearchError(error);
      });
    }
  }, [searchValue]);

  const handleChange = (ev) => {
    const {target} = ev;

    if (validator(target.value)) {
      setSearchValue(target.value);
    }
  }

  const renderMoreInfo = () => {
    if (!showMoreInfo) return null;
    if (searchValue && searchValue.length <= 0) return null;

    return searchResult.length > 0
      ? (<div>{labelMoreInfo} <span>{searchResult.length}</span></div>)
      : (<div>{labelMoreInfoEmpty}</div>);
  }

  return (
    <div className="search">
      <label>
        {labelSearch}
        <input 
          type="search" 
          name="search" 
          min={minSizeToSearh}
          value={defaultValue}
          placeholder={placeholderSearch}
          onChange={handleChange}/>
      </label>
      {renderMoreInfo()}
    </div>);
}

export default CountrySearchForm;
import React, { useEffect, useState } from 'react';

import axios from 'axios';

import Header from '../components/header/Header';
import List from '../components/list/List';
import CountrySearchForm from '../components/contry/CountrySearchForm';
import CountryDetails from '../components/contry/CountryDetails';
import CountryItem from '../components/contry/CountryItem';

const literals = {
  labelCountrySearch: 'Find countries: ',
  labelMoreInfo: 'Results ',
  labelMoreInfoEmpty:'No results',
  placeholderCountrySearch: 'Write contry to search'
};

// API countries
const getWeather = async (country) => {
  const { capitalInfo: { latlng } } = country;
  const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}&units=metric&lang=es`);

  console.log(response);
  return response.data;
}

export function CountriesPage(props) {
  const [countriesResult, setCountriesResult] = useState([]);
  const [country, setCountry] = useState();

  useEffect(() => {
    const finderCountry = countriesResult && countriesResult.length === 1 ? countriesResult[0] : null;

    if (finderCountry) {
      setCountry(finderCountry);
      getWeather(finderCountry)
        .then((weatherInfo) => {
          setCountry({...finderCountry, weatherInfo});
        })
        .catch(error => {
          console.log('weather error');
          console.log(error);
        });
    };
  }, [countriesResult]);

  const searchCountryValidator = (country) => true;

  const handleSearch = (countries) => {
    setCountriesResult(countries);
  };

  const handleSelectedItem = (country) => setCountry(country);

  const renderInfo = () => {
    if (!countriesResult || !countriesResult.length) {
      return null;
    }

    if (country) {
      return (<>
      <CountryDetails country={country} />
      </>);
    }

    if (countriesResult.length > 1) {
      return (<List 
        items={countriesResult} 
        pathToKey="cca3" 
        pageSize="10"
        customComponents={CountryItem} 
        onSelectedItem={handleSelectedItem}
        literals={{labelItemButton: "Show"}} />);
    }
  }

  return (<div className="page" hidden={props.hidden}>
    <header>
      <Header level="2">Countries</Header>
    </header>
    <main>
      <CountrySearchForm 
        showMoreInfo="true"
        minSizeToSearh="2"
        labelSearch={literals.labelCountrySearch} 
        labelMoreInfo={literals.labelMoreInfo}
        labelMoreInfoEmpty = {literals.labelMoreInfoEmpty}
        placeholderSearch={literals.placeholderCountrySearch}
        validator={searchCountryValidator} 
        onSearch={handleSearch}/>
      {renderInfo()}
    </main>
  </div>);
}

export default CountriesPage;
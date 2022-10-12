import React from 'react';

import Header from '../header/Header';
import List from '../list/List';

export function CountryDetails (props) {
  const { country } = props;
  const { name, capital, population, languages, flags, weatherInfo } = country || {};

  console.log('country details');
  console.log(country)

  return (<div>
    <Header level="3">{name?.common}</Header>
    <Header level="4">{name?.nativeName.common}</Header>
    <div>
      <Header level="4">Flag</Header>
      <img alt={name?.common} src={flags.svg}/>
    </div>
    
    <div>
      <Header level="4">Languages</Header>
      <List items={Object.values(languages)} customComponents={({item}) => (<p>{item}</p>)}></List>
    </div>

    <div>
      <Header level="4">More info</Header>
      <p><span>Capital: </span>{capital}</p>
      <p><span>Population: </span>{population}</p>
    </div>

   {weatherInfo ? (<div>
      <Header level="4">Weather in {capital}</Header>
      <p><img alt="weather icon" src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}/></p>
      <p><span>Temperature: </span>{weatherInfo.main.temp} ºC</p>
      <p><span>Temperature feel like: </span>{weatherInfo.main.feels_like} ºC</p>
      <p><span>Temperature min: </span>{weatherInfo.main['temp_min']} ºC</p>
      <p><span>Temperature max: </span>{weatherInfo.main['temp_max']} ºC</p>
      <p><span>Wind: </span>{weatherInfo.wind.speed} meter/seconds</p>
      <p><span>Humidity: </span> {weatherInfo.main.humidity} %</p>
      <p><span>Pressure: </span> {weatherInfo.main.pressure} hPa</p>
      <p><span>Visibility: </span>{weatherInfo.visibility} Km</p>
    </div>) : (<div><Header level="4">Weather in {capital}</Header><p>Loading info...</p></div>)}
  </div>);
}

export default CountryDetails;

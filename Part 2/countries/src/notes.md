```js
import React from "react";
import SearchedCountry from "./searchedCountry";

const country = ({ countries, filterState, handleShowCountry }) => {
    const filterCountry = countries.filter(country => country.name.toLowerCase().includes(filterState.toLowerCase()))
  
    const listCountryName = filterCountry.map(cntryName =>
      <p key={cntryName.alpha3Code}>{cntryName.name}</p>)
  
      const listCountryNameWithButton = filterCountry.map(cntryName2 =>
        <li key={cntryName2.name}>{cntryName2.name}<button onClick={handleShowCountry}>show</button></li>
      )
  
    if (listCountryName.length === 0) {
      return(
        <>
          <p>Search for a country</p>
        </>
      )
    } else if(listCountryName.length > 10) {
      return(
        <>
          <p>Too many matches, specify another filter</p>
        </>
      )
    } else if(listCountryName.length < 10 && listCountryName.length > 1) {
      return(
        <>
          <p>{listCountryNameWithButton}</p>
        </>
      )
    } else {
      return (
        <SearchedCountry listCountryName={listCountryName} filterCountry={filterCountry} />
      )
    }
  }

  export default country;
import React from "react";
import SearchedCountry from "./searchedCountry";

const country = ({ countries, filterState, handleShowCountry }) => {
    const filterCountry = countries.filter(country => country.name.toLowerCase().includes(filterState.toLowerCase()))
  
    if (filterCountry.length === 0) {
      return(
        <>
          <p>Search for a country</p>
        </>
      )
    } else if(filterCountry.length > 10) {
      return(
        <>
          <p>Too many matches, specify another filter</p>
        </>
      )
    } else if(filterCountry.length < 10 && filterCountry.length > 1) {
      return(
        <>
          {filterCountry.map(cntry => 
            <li key={cntry.name}>{cntry.name}<button onClick={(e) => {handleShowCountry(cntry.name)}}>Show</button></li>
          )}
        </>
      )
    } else {
      return (
        <SearchedCountry filterCountry={filterCountry} />
      )
    }
  }

  export default country;
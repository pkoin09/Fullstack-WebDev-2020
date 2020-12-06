import React from "react"
import Weather from "./weather"

const searchedCountry = ({ listCountryName, filterCountry }) => {
    const capital = filterCountry[0].capital
    const langs = filterCountry[0].languages.map(lang =>
      <li key={lang.iso639_2}>{lang.name}</li>
    )
    return(
      <>
        <h2>{listCountryName}</h2>
        <p>capital: {capital}</p>
        <p>Populatiion: {filterCountry[0].population}</p>
        <h3>Flag</h3>
        <img src={filterCountry[0].flag} alt="flag not rendered" height="100" width="150"/>
        <h3>Spoken Languages</h3>
        <ul>
          {langs}
        </ul>
        <Weather filterCountry={filterCountry} capital={capital} />
      </>
    );
  }

  export default searchedCountry;
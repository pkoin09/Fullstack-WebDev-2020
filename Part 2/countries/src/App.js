import React, { useState, useEffect } from "react";
import axios from "axios";
import Country from "./components/country";
import Form from "./components/form";
import './App.css';

function App() {
  //State
  const [countries, setCountries] = useState([]);
  const [filterState, setFilterState] = useState('');

  //Effect
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(res => {
        setCountries(res.data)
      })
  }, []);

  //Event handlers
  const handleCountryFilter = (e) => {
    setFilterState(e.target.value)
  }
  
  const handleShowCountry = (name) => {
    setFilterState(name)
  }

  const handleClick = (e) => {
    setFilterState(e.cntry.name)
  }

  return (
    <>
      <Form
        filterState={filterState}
        handleCountryFilter={handleCountryFilter}
      />
      <Country countries={countries} filterState={filterState} handleShowCountry={handleShowCountry} handleClick={handleClick} />
    </>
  );
}

export default App;

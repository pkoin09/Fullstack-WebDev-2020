import React from "react";

const MappedPerson = ({fPerson, removePersons}) => {
  // console.log('fPerson', fPerson)
  return(
    <>
      <li key={fPerson.id}>{fPerson.name} {fPerson.number}<button onClick={e => removePersons(fPerson.id)}>delete</button></li>
    </>
  );
}

const Person = ({ persons, newFilter, removePersons }) => {
    const filterPerson = persons.filter(fName => fName.name.toLowerCase().includes(newFilter.toLowerCase()))
    return(
      <>
      <h2>Numbers</h2>
        {filterPerson.map(fPerson => 
            <MappedPerson key={fPerson.id} fPerson={fPerson} removePersons={removePersons} />
        )}  
      </>
    );
  }

  export default Person;
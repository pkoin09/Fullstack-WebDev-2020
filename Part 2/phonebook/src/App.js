import React, { useState, useEffect } from "react";
import Filter from "./components/filter";
import Person from "./components/person";
import Form from "./components/form";
import Notification from "./components/notification";
import personService from "./services/persons";
import "./App.css";

const App = () => {
  //state
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState("");
  const [ newNum, setNewNum ] = useState("");
  const [ newFilter, setNewFilter ] = useState("");
  const [ errorMessage, setErrorMessage ] = useState({
    errMsg: "",
    errStatus: null
  });

  //effects
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //events
  const handleNameSubmit = (e) => {
    e.preventDefault()
    const nameObject = {
      name: newName,
      number: newNum
    }

    const findName = persons.map(listName => listName.name)
    if(findName.includes(newName)) {
      if(window.confirm(`${newName} is already added in the phonenbook, replace the old number with new one?`)){
        const id = persons.find(person=>person.name===newName).id
        const newObject = {
					name: newName,
          number: newNum
        }
        personService
          .update(id, newObject)
          .then(persToUpdate => {
            const errObject = {
              errMsg: `${persToUpdate.name} was successfully updated in the phonebook`,
              errStatus: "noError"
            }
            setErrorMessage(errObject)
            setTimeout(() => {
              setErrorMessage({...errorMessage, errMsg: null})
            }, 3000)
            setPersons(persons.map(person=> person.id!==id ? person : persToUpdate))
          })
          .catch(error=>{
            const errObject = {
              errMsg: `${newObject.name} has already been removed from the phonebook`,
              errStatus: "error"
            }
            setErrorMessage(errObject)
            setTimeout(() => {
              setErrorMessage({...errorMessage, errMsg: null})
            }, 3000)
            setPersons(persons.filter(person => person.id !== id))
          })
      }
    } else {
      personService
        .create(nameObject)
        .then(createdPersons => {
          const errObject = {
            errMsg: `${createdPersons.name} was successfully added in the phonebook`,
            errStatus: "noError"
          }
          setErrorMessage(errObject)
            setTimeout(() => {
              setErrorMessage({...errorMessage, errMsg: null})
            }, 3000)
          setPersons(persons.concat(createdPersons))
        })
    }
    setNewName("")
    setNewNum("")
  }

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const handleNumberChange = (e) => {
   setNewNum(e.target.value) 
  }
 
  const handleFilterChange = (e) => {
    setNewFilter(e.target.value)
  }

  const removePersons = (id) => {
    window.confirm("Do you want to delete the contact") 
      personService
          .trash(id)
          .then(persToRemove => {
            const persn = persons.filter(person=>person.id===id)
            const errObject = {
              errMsg: `${persn[0].name} was successfully removed from the phonebook`,
              errStatus: "noError"
            }
            setPersons(persons.filter(person=>person.id!==id))
            setErrorMessage(errObject)
            setTimeout(() => {
              setErrorMessage({...errorMessage, errMsg: null})
            }, 3000)
          })
          .catch(error => {
            const persn = persons.filter(person=>person.id===id)
            const errObject = {
              errMsg: `error removing ${persn[0].name} from the phonebook`,
              errStatus: "error"
            }
            setErrorMessage(errObject)
            setTimeout(() => {
              setErrorMessage({...errorMessage, errMsg: null})
            }, 3000)
          })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage}/>
      <div>
        <Filter handleFilterChange={handleFilterChange} />
      </div>
      <div>
        <Form
          newName={newName}
          newNum={newNum}
          handleNameSubmit={handleNameSubmit}
          handleNameChange={handleNameChange}
          handleNumberChange={handleNumberChange}
        />
        <Person 
          persons={persons} 
          newFilter={newFilter} 
          removePersons={removePersons}
        />
      </div>
    </div>
  )
}

export default App;

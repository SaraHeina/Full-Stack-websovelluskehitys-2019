import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])
  console.log('render', persons.length, 'persons')


  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    let id = 0;
    persons.forEach(p => p.name === nameObject.name ? id = p.id : 0)
    if (!persons.some(person => person.name === newName)) {
      personService
        .create(nameObject)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setNewName('')
          setNewNumber('')
          setMessage(
            `Lisättiin ${nameObject.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    } else {
      if (window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        personService
          .update(id, nameObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== id ? p : response))
            setNewName('')
            setNewNumber('')
            setMessage(
              `Päivitettiin ${nameObject.name}`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            const newList = persons.filter(p => p.id !== id)
            setPersons(newList)
            setNewName('')
            setNewNumber('')
            setErrorMessage(
              `Henkilö ${nameObject.name} on jo poistettu`
            )
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })

      }
    }
  }

  const removePerson = (event) => {
    const id = parseInt(event.target.id, 10)
    const name = event.target.name
    if (window.confirm(`Poistetaanko ${name}?`)) {
      personService
        .remove(id)
        .then(response => {
          const newList = persons.filter(p => p.id !== id)
          setPersons(newList)
          setMessage(
            `${name} on poistettu`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h1>Puhelinluettelo</h1>

      <Notification.Notification message={message} />
      <Notification.Error message={errorMessage}/>

      <Filter newFilter={newFilter}
        handleFilterChange={handleFilterChange} />

      <h2>Lisää uusi</h2>

      <PersonForm addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange} />

      <h2>Numerot</h2>

      <Persons persons={persons}
        newFilter={newFilter}
        removePerson={removePerson} />
    </div>
  )

}

export default App
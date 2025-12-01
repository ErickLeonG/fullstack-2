import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => (
  <div>
    filter shown with: <input value={filter} onChange={handleFilterChange}/>
  </div>
)

const PersonForm = ({ addPerson, newName, handlePersonNameChange, newNumber, handlePersonNumberChange }) => (
  <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={handlePersonNameChange} />
    </div>
    <div>
      number: <input value={newNumber} onChange={handlePersonNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({ persons, deletePerson }) => (
  <div>
    {persons.map((person) => (
      <div key={person.id}>
        {person.name} {person.number}
        <button key={person.id} onClick={() => deletePerson(person.id)}>delete</button>
      </div>
    ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.some(person => person.name === newName)) {
      personService
        .update(persons.find(person => person.name === newName).id, personObject)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      return
    }
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const deletePerson = (id) => {
    personService
      .borrar(id)
      .then(() => {
        setPersons(prev => prev.filter(person => person.id !== id))
      })
  }

  const handlePersonNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handlePersonNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = filter === '' ? persons : persons.filter(person => person.name.toLowerCase().startsWith(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
        <PersonForm addPerson={addPerson} newName={newName} handlePersonNameChange={handlePersonNameChange} newNumber={newNumber} handlePersonNumberChange={handlePersonNumberChange} />
      <h2>Numbers</h2>
        <Persons persons={personsToShow} deletePerson={deletePerson}/>
    </div>
  )
}

export default App
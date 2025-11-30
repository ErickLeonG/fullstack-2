import { useState } from 'react'

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

const Persons = ({ persons }) => (
  <div>
    {persons.map((person) => (
      <p key={person.name}>{person.name} {person.number}</p>
    ))}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if(persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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
        <Persons persons={personsToShow} />
    </div>
  )
}

export default App
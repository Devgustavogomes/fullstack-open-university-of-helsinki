import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Text from './components/Text'
import PersonForm from './components/PersonForm'


const App = () => {
  const [persons, setPersons] = useState([])
  const [id, setId] = useState(0)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState(false)
  const [personFilter, setPersonFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('promise fullfiled')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    setId(id + 1);

    const personObject = {
      name: newName,
      number: newNumber,
      id: id
    }

    if (!persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      setPersons(persons.concat(personObject));
    } else {
      alert(`${newName} is already added to phonebook`)
    }

  }

  const inputName = (event) => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const inputNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  const inputFilter = (event) => {

    if (event.target.value.trim() !== '') {
      setFilter(true)
    } else {
      setFilter(false)
    }

    console.log(filter)
    setPersonFilter(event.target.value.trim())
  }

  const numberToShow = filter
    ? persons.filter(person => person.name === personFilter)
    : persons

  return (
    <div>
      <Text content='Phonebook' />
      <Filter inputFilter={inputFilter} />
      <Text content='add a new' />
      <PersonForm addName={addName} inputName={inputName} inputNumber={inputNumber} />
      <Text content='Numbers' />
      <Persons persons={numberToShow} />
    </div>
  )
}

export default App
//import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ShownCountries from './components/ShownCountries'


const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filterCounties = countries
      .filter(country => country.name.toLocaleLowerCase().includes(newFilter.toLocaleLowerCase()))

  const handleClick = (event) => {
    setNewFilter(event.target.id)
  }

  return (
    <div>
      find countries:
            <input value={newFilter}
                   onChange={handleFilterChange} />
      <ShownCountries countries={filterCounties} click={handleClick} />
    </div>
  )

}

export default App;

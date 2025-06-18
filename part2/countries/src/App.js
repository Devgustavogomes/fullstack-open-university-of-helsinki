import { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import CountryInfo from './components/CountryInfo';



function App() {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountries(response.data))

  }, [])

  const inputCountry = (event) => {
    const countryToFilter = event.target.value.trim();
    if (countryToFilter) {
      setCountriesToShow(countries.filter((country) => country.name.common.toLowerCase().includes(countryToFilter.toLowerCase())))
    } else {
      setCountriesToShow([])
    }
  }

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        find countries: <input onChange={inputCountry} />
      </form>
      <CountryInfo countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;

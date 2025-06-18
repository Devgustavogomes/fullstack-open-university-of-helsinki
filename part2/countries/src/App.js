import { useState, useEffect } from 'react';
import './App.css';
import CountryInfo from './components/CountryInfo';
import FormCountry from './components/FormCountry';
import CountryServices from './services/CountryServices';



function App() {

  const [countries, setCountries] = useState([])
  const [countriesToShow, setCountriesToShow] = useState([])

  useEffect(() => {
    CountryServices
      .getCountries()
      .then(returnedCountries => setCountries(returnedCountries))
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
      <FormCountry inputCountry={inputCountry} />
      <CountryInfo countriesToShow={countriesToShow} />
    </div>
  );
}

export default App;

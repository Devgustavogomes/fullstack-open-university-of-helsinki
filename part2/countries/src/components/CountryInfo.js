import { useState, useEffect } from "react"
import CountryServices from "../services/CountryServices";

const CountryInfo = ({ countriesToShow }) => {
    const [countrySelected, setCountrySelected] = useState(null)
    const [weatherCountrySelected, setWeatherCountrySelected] = useState(null)

    useEffect(() => {
        if (countriesToShow.length === 1) {
            setCountrySelected(countriesToShow[0]);
        } else {
            setCountrySelected(null);
            setWeatherCountrySelected(null);
        }
    }, [countriesToShow]);

    useEffect(() => {
        if (countrySelected) {
            CountryServices
                .getWeather(countrySelected.name.common)
                .then(returnedWeather => setWeatherCountrySelected(returnedWeather))
        }
    }, [countrySelected])

    const showWeatherCountry = () => {
        return (
            <div>
                {weatherCountrySelected
                    ? (<div>
                        <h2>{`Weather in ${weatherCountrySelected.location.name}`}</h2>
                        <p>{`Temperature ${weatherCountrySelected.current.temp_c} Celsius`}</p>
                        <img src={weatherCountrySelected.current.condition.icon} />
                        <p>{`Wind ${weatherCountrySelected.current.wind_kph} k/h`}</p>
                    </div>)
                    : (<h2>{`loading weather...`}</h2>)
                }
            </div>
        )
    }

    const showCountry = (countries) => {
        return (
            countries.map(country => {
                return (
                    <div key={country.name.common}>
                        <h1>{country.name.common}</h1>
                        <p>{`Capital ${country.capital}`}</p>
                        <p>{`Area ${country.area}`}</p>
                        <h2>Languages</h2>
                        <ul>
                            {Object.values(country.languages).map(language => {
                                return <li key={language}> {language}</li>
                            })}
                        </ul>
                        <img src={country.flags.png} />
                        {showWeatherCountry()}
                    </div>
                )
            })
        )
    }



    if (countrySelected) {
        return showCountry([countrySelected])
    }

    if (countriesToShow.length <= 10) {
        return (
            countriesToShow.map(country => {
                return (
                    <div key={country.name.common}>
                        <p>{country.name.common}</p>
                        <button onClick={() => setCountrySelected(country)}>Show</button>
                    </div>
                )
            })
        )

    }

    return 'Too many matches, specify another filter'

}

export default CountryInfo



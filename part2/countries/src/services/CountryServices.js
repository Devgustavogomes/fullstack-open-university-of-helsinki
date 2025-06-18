import axios from 'axios'

const urlCountries = `https://studies.cs.helsinki.fi/restcountries/api/all`
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrlWeather = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`

const getCountries = () => {
    const request = axios.get(urlCountries)
    return request.then(response => response.data)
}

const getWeather = (name) => {
    const request = axios.get(`${baseUrlWeather}${name}`)
    return request.then(response => response.data)
}
export default { getCountries, getWeather }
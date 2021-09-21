import {useEffect, useState} from "react";
import axios from "axios";

const Weather = ({capital}) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    const [weather, setWeather] = useState();

    useEffect(() => {
        axios
            .get('http://api.weatherstack.com/current', {
                params: {access_key: apiKey, query: capital,}
            })
            .then(resp => setWeather(resp.data));
    }, [capital, apiKey]);

    return weather ? (
        <div style={{display: "flex", flexDirection: "column",}}>
            <h3>Weather in {capital}</h3>
            <span><b>temperature</b> {weather.current.temperature} Celsius</span>
            {weather.current.weather_icons.map(wi => (
                <img alt="weather img" width="5%" src={wi}/>
            ))}
            <span><b>wind</b> {weather.current.wind_speed} kmh direction {weather.current.wind_dir}</span>
        </div>
    ) : null;
}

const Country = ({country}) => {
    return (
        <div style={{display: "flex", flexDirection: "column",}}>
            <h2>{country.name}</h2>
            <span>capital {country.capital}</span>
            <span>population {country.population}</span>
            <h3>Languages</h3>
            <ul>
                {country.languages.map(l => <li>{l.name}</li>)}
            </ul>
            <img width="10%" src={country.flag} alt="Country flag"/>
            <Weather capital={country.capital}/>
        </div>
    )
}

export default Country;

import React, { useState } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_WEATHERSTACK_API_KEY

const Weather = ({capital}) => {
	const [countryWeather, setCountryWeather] = useState('');

	useState(() => {
		const url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
		axios
			.get(url)
			.then(res => {
				setCountryWeather(res.data)
				console.log("data", res.data)
			})
	}, [1000])

	const currWeather = countryWeather.current
	console.log("weather", countryWeather.current)
	if(! countryWeather) {
			return(
				<>
				</>
			);
	} else {
		return(
			<>
				<h3>Weather in {capital}</h3>
        <p><b>temperature:</b> {currWeather.temperature}</p>
        <img src={currWeather.weather_icons} alt="img not found" height="100" width="100" />
				<p><b>wind:</b> {currWeather.wind_speed}mph, direction {currWeather.wind_dir}</p>
			</>
		);
	}
}

export default Weather;
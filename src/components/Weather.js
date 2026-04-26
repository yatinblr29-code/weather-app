import React, { useEffect, useState } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import Search from "./Search";
import ToggleTheme from "./ToggleTheme";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [theme, setTheme] = useState("light");

  const API_KEY = "process.env.REACT_APP_API_KEY";

  // 📍 Get current location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCoords({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });
  }, []);

  // 🌦️ Fetch weather by coordinates
  useEffect(() => {
    if (!coords) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric`
      )
      .then((res) => setWeather(res.data));
  }, [coords]);

  const fetchByCity = async (city) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );
    setWeather(res.data);
  };

  return (
    <div className={theme}>
      <ToggleTheme theme={theme} setTheme={setTheme} />
      <Search onSearch={fetchByCity} />

      {weather && (
        <>
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp}°C</h3>
          <p>{weather.weather[0].main}</p>

          <Forecast coords={coords} apiKey={API_KEY} />
        </>
      )}
    </div>
  );
}

export default Weather;

import React, { useEffect, useState } from "react";
import axios from "axios";
import Forecast from "./Forecast";
import Search from "./Search";
import ToggleTheme from "./ToggleTheme";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [coords, setCoords] = useState(null);
  const [theme, setTheme] = useState("light");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.REACT_APP_API_KEY;

  // 🔍 DEBUG: check if Vercel is passing env variable
  console.log("API KEY:", API_KEY);

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

    const fetchWeather = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather`,
          {
            params: {
              lat: coords.lat,
              lon: coords.lon,
              appid: API_KEY,
              units: "metric",
            },
          }
        );

        setWeather(res.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch weather data (API error)");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [coords, API_KEY]);

  // 🌍 Fetch by city search
  const fetchByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);

      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            appid: API_KEY,
            units: "metric",
          },
        }
      );

      setWeather(res.data);
    } catch (err) {
      console.log(err);
      setError("City not found or API error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={theme}>
      <ToggleTheme theme={theme} setTheme={setTheme} />
      <Search onSearch={fetchByCity} />

      {/* 🔄 Loading state */}
      {loading && <p>Loading weather...</p>}

      {/* ❌ Error state */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* 🌤️ Weather display */}
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
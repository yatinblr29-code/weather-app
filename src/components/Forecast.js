import React, { useEffect, useState } from "react";
import axios from "axios";

function Forecast({ coords, apiKey }) {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    if (!coords) return;

    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=metric`
      )
      .then((res) => {
        setForecast(res.data.list.slice(0, 5));
      });
  }, [coords, apiKey]);

  return (
    <div>
      <h3>5-Day Forecast</h3>
      <div style={{ display: "flex", gap: "10px" }}>
        {forecast.map((item, index) => (
          <div key={index}>
            <p>{item.main.temp}°C</p>
            <p>{item.weather[0].main}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Forecast;
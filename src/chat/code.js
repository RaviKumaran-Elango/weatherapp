import React, { useState } from 'react';
import '../chat/code.css';

function Chat() {
  const [location, setLocation] = useState('');
  const [weather, setWeather] = useState(null);

  const handleChange = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWeather(location);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  const fetchWeather = async (location) => {
    const apiKey = 'tBpezqW8cmShZ634b1dt6yrfJw1JMWkD';
    const apiUrl = `https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature&timesteps=current&units=metric&apikey=${apiKey}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Error fetching weather data');
    }
    return await response.json();
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={handleChange}
          placeholder="Enter City, Country"
        />
        <button type="submit">Get Weather</button>
      </form>
      {weather && (
        <div className="weather-info">
          <h2>Current Temperature: {weather.timelines[0].intervals[0].values.temperature}°C</h2>
        </div>
      )}
    </div>
  );
}

export default Chat;

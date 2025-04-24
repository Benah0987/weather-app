'use client';

import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import WeatherCard from './components/WeatherCard';
import WeatherStats from './components/WeatherStats'; // Import WeatherStats if you are going to use it
import UnitToggle from './components/UnitToggle'; // Import UnitToggle if you want to allow temp unit switching

const Page = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C'); // 'C' for Celsius, 'F' for Fahrenheit

  const handleSearch = async (city: string) => {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.NEXT_PUBLIC_WEATHERAPI_KEY}&q=${city}&days=3`
    );

    const data = await response.json();
    setWeatherData(data);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'C' ? 'F' : 'C')); // Toggle between Celsius and Fahrenheit
  };

  return (
    <main className="min-h-screen p-4">
      <SearchBox onSearch={handleSearch} />

      {weatherData && (
        <div>
          {/* Weather Card */}
          <WeatherCard
            city={weatherData.location.name}
            date={weatherData.location.localtime.split(' ')[0]}
            iconUrl={weatherData.current.condition.icon}
            temperature={unit === 'C' ? weatherData.current.temp_c : weatherData.current.temp_f}
            description={weatherData.current.condition.text}
          />

          {/* Weather Stats */}
          <WeatherStats
            windSpeed={weatherData.current.wind_kph}
            humidity={weatherData.current.humidity}
          />

          {/* Unit Toggle */}
          <UnitToggle onToggle={toggleUnit} currentUnit={unit} />
        </div>
      )}
    </main>
  );
};

export default Page;

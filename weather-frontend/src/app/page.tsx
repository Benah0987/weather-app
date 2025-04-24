'use client';

import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import UnitToggle from './components/UnitToggle';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import WeatherStats from './components/WeatherStats';

// Sample data to render the UI (as per the wireframe)
const sampleForecast = [
  { date: '27 May', iconUrl: '/icons/sunny.png', tempMax: 18, tempMin: 14, description: 'Sunny' },
  { date: '28 May', iconUrl: '/icons/sunny.png', tempMax: 20, tempMin: 16, description: 'Sunny' },
  { date: '29 May', iconUrl: '/icons/sunny.png', tempMax: 19, tempMin: 15, description: 'Sunny' },
];

// Utility function to export data as CSV
const exportToCSV = (
  currentWeather: { city: string; date: string; temperature: number; description: string; unit: string },
  forecast: Array<{ date: string; tempMax: number; tempMin: number; description: string }>,
  stats: { windSpeed: number; humidity: number },
  unit: 'C' | 'F'
) => {
  const exportData = [
    { type: 'Current Weather', city: currentWeather.city, date: currentWeather.date, temperature: `${currentWeather.temperature}°${unit}`, description: currentWeather.description },
    { type: '', city: '', date: '', temperature: '', description: '' },
    ...forecast.map((day) => ({
      type: 'Forecast',
      city: '',
      date: day.date,
      temperature: `${day.tempMax}°${unit}/${day.tempMin}°${unit}`,
      description: day.description,
    })),
    { type: '', city: '', date: '', temperature: '', description: '' },
    { type: 'Stats', city: '', date: '', temperature: '', description: `Wind Speed: ${stats.windSpeed} km/h, Humidity: ${stats.humidity}%` },
  ];

  const headers = ['Type', 'City', 'Date', 'Temperature', 'Description'].join(',');
  const rows = exportData.map((row) => Object.values(row).join(',')).join('\n');
  const csvContent = `${headers}\n${rows}`;

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `weather-data-${currentWeather.city}-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
};

export default function Page() {
  const [currentUnit, setCurrentUnit] = useState<'C' | 'F'>('C');
  const [isLoading, setIsLoading] = useState(false);
  const [city, setCity] = useState('Nairobi');

  const handleSearch = (cityName: string) => {
    setIsLoading(true);
    setCity(cityName);
    setTimeout(() => setIsLoading(false), 1000); // Simulate API call
  };

  const handleToggleUnit = () => {
    setCurrentUnit(currentUnit === 'C' ? 'F' : 'C');
  };

  const convertTemp = (temp: number) => {
    if (currentUnit === 'F') {
      return Math.round((temp * 9) / 5 + 32);
    }
    return temp;
  };

  const handleExport = () => {
    const currentWeather = {
      city,
      date: '20th May 2027',
      temperature: convertTemp(13),
      description: 'Sunny',
      unit: currentUnit,
    };
    const stats = { windSpeed: 3, humidity: 80 };
    exportToCSV(currentWeather, sampleForecast.map(day => ({
      ...day,
      tempMax: convertTemp(day.tempMax),
      tempMin: convertTemp(day.tempMin),
    })), stats, currentUnit);
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full max-w-4xl flex flex-wrap justify-between items-center gap-4 mb-6">
        <SearchBox onSearch={handleSearch} isLoading={isLoading} />
        <div className="flex gap-2">
          <UnitToggle onToggle={handleToggleUnit} currentUnit={currentUnit} isLoading={isLoading} />
          <button onClick={handleExport} className="btn btn-primary" disabled={isLoading}>
            Export Data
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <WeatherCard
            city={city}
            date="20th May 2027"
            iconUrl="/icons/sunny-cloud.png"
            temperature={convertTemp(13)}
            description="Sunny"
            unit={currentUnit}
          />
        </div>

        <div className="flex-1 flex flex-col gap-6">
          <WeatherForecast
            forecast={sampleForecast}
            unit={currentUnit}
            convertTemp={convertTemp}
          />
          <WeatherStats windSpeed={3} humidity={80} />
        </div>
      </div>
    </div>
  );
}
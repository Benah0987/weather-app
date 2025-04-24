'use client';

import React, { useState } from 'react';
import SearchBox from './components/SearchBox';
import UnitToggle from './components/UnitToggle';
import WeatherCard from './components/WeatherCard';
import WeatherForecast from './components/WeatherForecast';
import WeatherStats from './components/WeatherStats';

const formatDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();

  const ordinalSuffix = (day: number): string => {
    if (day > 3 && day < 21) return 'th';
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  return `${day}${ordinalSuffix(day)} ${month} ${year}`;
};

const today = new Date();
const sampleForecast = Array.from({ length: 3 }, (_, index) => {
  const forecastDate = new Date(today);
  forecastDate.setDate(today.getDate() + index + 1);
  return {
    date: formatDate(forecastDate).split(' ')[0] + ' ' + formatDate(forecastDate).split(' ')[1],
    icon: 'sun',
    tempMax: 18 + index,
    tempMin: 14 + index,
    description: 'Sunny',
  };
});

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

  const todayFormatted = formatDate(today);

  const handleSearch = (cityName: string) => {
    setIsLoading(true);
    setCity(cityName);
    setTimeout(() => setIsLoading(false), 1000);
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
      date: todayFormatted,
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
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8 bg-base-100">
      {/* Header Section */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
        <div className="w-full sm:w-1/2">
          <SearchBox onSearch={handleSearch} isLoading={isLoading} />
        </div>
        <div className="flex gap-3">
          <UnitToggle onToggle={handleToggleUnit} currentUnit={currentUnit} isLoading={isLoading} />
          <button onClick={handleExport} className="btn btn-primary" disabled={isLoading}>
            Export Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6">
        {/* Left: Current Weather */}
        <div className="flex-1">
          <WeatherCard
            city={city}
            date={todayFormatted}
            icon="sun"
            temperature={convertTemp(13)}
            description="Sunny"
            unit={currentUnit}
          />
        </div>

        {/* Right: Forecast and Stats */}
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
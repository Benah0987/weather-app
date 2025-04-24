'use client';

import { useState, useEffect } from 'react';
import SearchBox from './components/SearchBox';
import UnitToggle from './components/UnitToggle';
import WeatherCard from './components/WeatherCard';
import WeatherStats from './components/WeatherStats';
import WeatherForecast from './components/WeatherForecast';

type WeatherData = {
  city: string;
  date: string;
  iconUrl: string;
  temperature: number;
  description: string;
  feelsLike: number;
  windSpeed: number;
  humidity: number;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
};

type ForecastData = {
  date: string;
  iconUrl: string;
  tempMax: number;
  tempMin: number;
  description: string;
}[];

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [unit, setUnit] = useState<'C' | 'F'>('C');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // First fetch coordinates using Geocoding API
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const geoData = await geoResponse.json();
      
      if (!geoData || geoData.length === 0) {
        throw new Error('City not found');
      }
      
      const { lat, lon } = geoData[0];
      
      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const weatherData = await weatherResponse.json();
      
      // Fetch forecast
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      
      // Process current weather data
      const processedWeather: WeatherData = {
        city: `${geoData[0].name}, ${geoData[0].country}`,
        date: new Date(weatherData.dt * 1000).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        iconUrl: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
        temperature: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        feelsLike: Math.round(weatherData.main.feels_like),
        windSpeed: Math.round(weatherData.wind.speed * 3.6), // Convert m/s to km/h
        humidity: weatherData.main.humidity,
        pressure: weatherData.main.pressure,
        visibility: weatherData.visibility,
        sunrise: new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()
      };
      
      // Process forecast data (next 3 days)
      const dailyForecast = forecastData.list
        .filter((item: any, index: number) => index % 8 === 0) // Get one reading per day
        .slice(0, 3) // Only next 3 days
        .map((item: any) => ({
          date: new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' }),
          iconUrl: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
          tempMax: Math.round(item.main.temp_max),
          tempMin: Math.round(item.main.temp_min),
          description: item.weather[0].main
        }));
      
      setWeather(processedWeather);
      setForecast(dailyForecast);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertTemp = (temp: number): number => {
    return unit === 'C' ? temp : Math.round((temp * 9/5) + 32);
  };

  return (
    <main className="container mx-auto px-4 py-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Weather Forecast</h1>
        
        <SearchBox 
          onSearch={fetchWeather} 
          isLoading={loading} 
        />
        
        {error && (
          <div className="alert alert-error mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}
        
        {weather && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <WeatherCard
                city={weather.city}
                date={weather.date}
                iconUrl={weather.iconUrl}
                temperature={convertTemp(weather.temperature)}
                description={weather.description}
                feelsLike={convertTemp(weather.feelsLike)}
                unit={unit}
              />
              
              <div>
                <WeatherStats
                  windSpeed={weather.windSpeed}
                  humidity={weather.humidity}
                  pressure={weather.pressure}
                  visibility={weather.visibility}
                  sunrise={weather.sunrise}
                  sunset={weather.sunset}
                />
                <UnitToggle 
                  onToggle={toggleUnit} 
                  currentUnit={unit} 
                  isLoading={loading}
                />
              </div>
            </div>
            
            {forecast && <WeatherForecast forecast={forecast} unit={unit} convertTemp={convertTemp} />}
          </>
        )}
      </div>
    </main>
  );
}
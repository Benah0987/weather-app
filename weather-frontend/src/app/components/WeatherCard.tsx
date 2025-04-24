import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun } from '@fortawesome/free-solid-svg-icons'; // Import the sun icon

export type WeatherCardProps = {
  city: string;
  date: string;
  icon: string; // Changed from iconUrl to icon (Font Awesome icon name)
  temperature: number;
  description: string;
  feelsLike?: number;
  unit?: 'C' | 'F';
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  date,
  icon,
  temperature,
  description,
  feelsLike,
  unit = 'C',
}) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="text-left mb-4">
          <h2 className="card-title text-2xl">{city}</h2>
          <p className="text-sm opacity-50">{date}</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <FontAwesomeIcon icon={faSun} className="w-24 h-24 my-4 text-yellow-500" />
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold">{temperature}</span>
            <span className="text-3xl">°{unit}</span>
          </div>
          <p className="text-lg capitalize my-2">{description}</p>
          {feelsLike && (
            <p className="text-sm opacity-75">Feels like: {feelsLike}°{unit}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
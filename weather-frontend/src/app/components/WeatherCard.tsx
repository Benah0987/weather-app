import React from 'react';

type WeatherCardProps = {
  city: string;
  date: string;
  iconUrl: string;
  temperature: number;
  description: string;
  feelsLike?: number;
  unit?: 'C' | 'F';
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  date,
  iconUrl,
  temperature,
  description,
  feelsLike,
  unit = 'C'
}) => {
  return (
    <div className="card bg-base-100 shadow-md">
      <div className="card-body items-center text-center">
        <h2 className="card-title text-2xl">{city}</h2>
        <p className="text-sm opacity-50">{date}</p>
        <img src={iconUrl} alt={description} className="w-24 h-24 my-4" />
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
  );
};

export default WeatherCard;
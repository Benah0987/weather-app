import React from "react";

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
    <div className="p-6 rounded-xl shadow-lg bg-white/90 dark:bg-gray-800 text-center space-y-4 transition-all hover:scale-[1.02] hover:shadow-xl">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{city}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
      <div className="flex justify-center items-center">
        <img 
          src={iconUrl} 
          alt={description} 
          className="mx-auto w-24 h-24 drop-shadow-md" 
        />
      </div>
      <div className="flex justify-center items-baseline gap-2">
        <p className="text-5xl font-bold text-gray-800 dark:text-white">{temperature}°</p>
        <span className="text-xl text-gray-600 dark:text-gray-300">{unit}</span>
      </div>
      <p className="text-lg capitalize text-gray-700 dark:text-gray-300">{description}</p>
      {feelsLike && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Feels like: {feelsLike}°{unit}
        </p>
      )}
    </div>
  );
};

export default WeatherCard;
'use client';

interface WeatherStatsProps {
  windSpeed: number;
  humidity: number;
  pressure?: number;
  visibility?: number;
  sunrise?: string;
  sunset?: string;
}

const WeatherStats = ({ 
  windSpeed, 
  humidity, 
  pressure, 
  visibility,
  sunrise,
  sunset
}: WeatherStatsProps) => {
  return (
    <div className="weather-stats p-6 mb-4 border rounded-xl bg-white/90 dark:bg-gray-800 shadow-md">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Weather Details</h3>
      <ul className="grid grid-cols-2 gap-4">
        <li className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-sm text-gray-500 dark:text-gray-400">Wind Speed</span>
          <span className="font-medium text-gray-800 dark:text-white">{windSpeed} km/h</span>
        </li>
        <li className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <span className="text-sm text-gray-500 dark:text-gray-400">Humidity</span>
          <span className="font-medium text-gray-800 dark:text-white">{humidity}%</span>
        </li>
        {pressure && (
          <li className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-500 dark:text-gray-400">Pressure</span>
            <span className="font-medium text-gray-800 dark:text-white">{pressure} hPa</span>
          </li>
        )}
        {visibility && (
          <li className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-500 dark:text-gray-400">Visibility</span>
            <span className="font-medium text-gray-800 dark:text-white">{visibility/1000} km</span>
          </li>
        )}
        {sunrise && (
          <li className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-500 dark:text-gray-400">Sunrise</span>
            <span className="font-medium text-gray-800 dark:text-white">{sunrise}</span>
          </li>
        )}
        {sunset && (
          <li className="flex flex-col p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-sm text-gray-500 dark:text-gray-400">Sunset</span>
            <span className="font-medium text-gray-800 dark:text-white">{sunset}</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default WeatherStats;
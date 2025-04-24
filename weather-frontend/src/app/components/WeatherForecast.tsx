import React from 'react';

// Export the types
export type ForecastItem = {
  date: string;
  iconUrl: string;
  tempMax: number;
  tempMin: number;
  description: string;
};

export type WeatherForecastProps = {
  forecast: ForecastItem[];
  unit: 'C' | 'F';
  convertTemp: (temp: number) => number;
};

const WeatherForecast: React.FC<WeatherForecastProps> = ({ forecast, unit, convertTemp }) => {
  return (
    <div className="bg-base-100 rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">3-Day Forecast</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {forecast.map((day, index) => (
          <div key={index} className="flex flex-col items-center p-4 bg-base-200 rounded-lg">
            <h3 className="font-semibold">{day.date}</h3>
            <img src={day.iconUrl} alt={day.description} className="w-16 h-16 my-2" />
            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">High</p>
                <p className="font-bold">{convertTemp(day.tempMax)}°{unit}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">Low</p>
                <p className="font-bold">{convertTemp(day.tempMin)}°{unit}</p>
              </div>
            </div>
            <p className="mt-2 text-sm capitalize">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
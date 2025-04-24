'use client';

// Export the interface
export interface WeatherStatsProps {
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
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Weather Stats</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Wind Speed</div>
              <div className="stat-value text-lg">{windSpeed}</div>
              <div className="stat-desc">km/h</div>
            </div>
          </div>
          
          <div className="stats shadow">
            <div className="stat">
              <div className="stat-title">Humidity</div>
              <div className="stat-value text-lg">{humidity}%</div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${humidity}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          {pressure && (
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Pressure</div>
                <div className="stat-value text-lg">{pressure}</div>
                <div className="stat-desc">hPa</div>
              </div>
            </div>
          )}
          
          {visibility && (
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Visibility</div>
                <div className="stat-value text-lg">{visibility/1000}</div>
                <div className="stat-desc">km</div>
              </div>
            </div>
          )}
          
          {sunrise && (
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Sunrise</div>
                <div className="stat-value text-lg">{sunrise}</div>
              </div>
            </div>
          )}
          
          {sunset && (
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">Sunset</div>
                <div className="stat-value text-lg">{sunset}</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherStats;
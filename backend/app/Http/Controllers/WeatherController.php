<?php 

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class WeatherController extends Controller
{
    public function getWeather(Request $request)
    {
        $city = $request->query('city', 'Nairobi');
        $unit = $request->query('unit', 'metric'); // metric = Celsius, imperial = Fahrenheit
        $apiKey = env('WEATHERAPI_KEY');

        $res = Http::get('http://api.weatherapi.com/v1/forecast.json', [
            'key' => $apiKey,
            'q' => $city,
            'days' => 4,
            'aqi' => 'no',
            'alerts' => 'no'
        ]);

        if ($res->failed()) {
            Log::error('WeatherAPI failed:', $res->json());
            return response()->json(['error' => 'Failed to fetch weather data'], 500);
        }

        $data = $res->json();

        return response()->json([
            'location' => $data['location']['name'] . ', ' . $data['location']['country'],
            'date' => $data['location']['localtime'],
            'unit' => $unit,
            'current' => [
                'temperature' => $unit === 'metric' ? $data['current']['temp_c'] : $data['current']['temp_f'],
                'description' => $data['current']['condition']['text'],
                'icon' => $data['current']['condition']['icon'],
                'wind' => $unit === 'metric' ? $data['current']['wind_kph'] . ' km/h' : $data['current']['wind_mph'] . ' mph',
                'humidity' => $data['current']['humidity'] . '%'
            ],
            'forecast' => collect($data['forecast']['forecastday'])->slice(1, 3)->map(function ($day) use ($unit) {
                return [
                    'day' => date('l', strtotime($day['date'])),
                    'temperature' => $unit === 'metric' ? $day['day']['avgtemp_c'] : $day['day']['avgtemp_f'],
                    'icon' => $day['day']['condition']['icon']
                ];
            })->values()
        ]);
    }
}

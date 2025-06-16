// OpenWeatherMap API service
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

const aiWeatherService = {
  predictWeather: async (coordinates, cropType) => {
    if (!OPENWEATHER_API_KEY) {
      throw new Error('OpenWeather API key is not configured');
    }

    try {
      // Get current weather
      const currentWeatherResponse = await fetch(
        `${OPENWEATHER_BASE_URL}/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      if (!currentWeatherResponse.ok) {
        throw new Error('Failed to fetch current weather data');
      }

      const currentWeather = await currentWeatherResponse.json();

      // Get 5-day forecast
      const forecastResponse = await fetch(
        `${OPENWEATHER_BASE_URL}/forecast?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${OPENWEATHER_API_KEY}`
      );

      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch weather forecast');
      }

      const forecast = await forecastResponse.json();

      // Process the data
      const processedData = {
        current: {
          temperature: Math.round(currentWeather.main.temp),
          humidity: currentWeather.main.humidity,
          rainfall: currentWeather.rain ? currentWeather.rain['1h'] || 0 : 0,
          description: currentWeather.weather[0].description,
          icon: currentWeather.weather[0].icon,
        },
        forecast: forecast.list.slice(0, 5).map(item => ({
          date: new Date(item.dt * 1000),
          temperature: Math.round(item.main.temp),
          humidity: item.main.humidity,
          rainfall: item.rain ? item.rain['3h'] || 0 : 0,
          description: item.weather[0].description,
          icon: item.weather[0].icon,
        })),
        alerts: currentWeather.alerts ? currentWeather.alerts.map(alert => ({
          event: alert.event,
          description: alert.description,
        })) : 'No severe weather alerts for your area.',
      };

      // Add crop-specific recommendations based on weather data
      processedData.recommendations = generateCropRecommendations(processedData, cropType);

      return processedData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw new Error('Failed to fetch weather data. Please try again later.');
    }
  },
};

// Helper function to generate crop-specific recommendations
function generateCropRecommendations(weatherData, cropType) {
  const recommendations = [];
  const { current, forecast } = weatherData;

  // Temperature-based recommendations
  if (current.temperature > 30) {
    recommendations.push('High temperature alert: Consider additional irrigation and shade protection for your crops.');
  } else if (current.temperature < 10) {
    recommendations.push('Low temperature alert: Protect your crops from frost damage.');
  }

  // Rainfall-based recommendations
  if (current.rainfall > 0) {
    recommendations.push('Rainfall detected: Adjust irrigation schedule accordingly.');
  }

  // Crop-specific recommendations
  switch (cropType.toLowerCase()) {
    case 'chilli':
      if (current.temperature > 35) {
        recommendations.push('Chilli crops are sensitive to high temperatures. Ensure adequate shade and water.');
      }
      break;
    case 'paddy':
      if (current.temperature < 20) {
        recommendations.push('Rice crops may be affected by low temperatures. Monitor growth closely.');
      }
      break;
    case 'cotton':
      if (current.humidity > 80) {
        recommendations.push('High humidity may affect cotton quality. Ensure proper ventilation.');
      }
      break;
    case 'tomato':
      if (current.temperature > 30 && current.humidity > 70) {
        recommendations.push('Tomato crops are at risk of fungal diseases in these conditions. Apply preventive measures.');
      }
      break;
  }

  return recommendations;
}

export default aiWeatherService; 
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

export async function getWeatherByCity(city) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file.",
    );
  }

  const params = new URLSearchParams({
    q: city,
    appid: apiKey,
    units: "metric",
  });
  const response = await fetch(`${WEATHER_URL}?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to get weather data.");
  }

  return data;
}

export async function getWeatherByLocation(latitude, longitude) {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file.",
    );
  }

  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    appid: apiKey,
    units: "metric",
  });
  const response = await fetch(`${WEATHER_URL}?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to get weather data.");
  }

  return data;
}

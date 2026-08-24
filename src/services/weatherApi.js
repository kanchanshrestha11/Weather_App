const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEOCODING_URL = "https://api.openweathermap.org/geo/1.0/direct";

function getApiKey() {
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error(
      "API key is missing. Add VITE_OPENWEATHER_API_KEY to your .env file.",
    );
  }

  return apiKey;
}

export async function getCitySuggestions(query, signal) {
  const params = new URLSearchParams({
    q: query,
    limit: "5",
    appid: getApiKey(),
  });
  const response = await fetch(`${GEOCODING_URL}?${params}`, { signal });

  if (!response.ok) {
    throw new Error("Unable to load city suggestions.");
  }

  return response.json();
}

export async function getWeatherByCity(city) {
  const params = new URLSearchParams({
    q: city,
    appid: getApiKey(),
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
  const params = new URLSearchParams({
    lat: latitude,
    lon: longitude,
    appid: getApiKey(),
    units: "metric",
  });
  const response = await fetch(`${WEATHER_URL}?${params}`);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to get weather data.");
  }

  return data;
}

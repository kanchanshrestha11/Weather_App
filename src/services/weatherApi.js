const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const GEOCODING_URL = "https://api.openweathermap.org/geo/1.0/direct";

function getApiKey() {
  return "413dbb0e7bf90ca5e9ae0f5de3d1bdab";
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

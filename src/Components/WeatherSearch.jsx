import { useState } from "react";

function WeatherSearch({ onSearch, loading }) {
  const [city, setCity] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const searchCity = city.trim();
    if (searchCity) onSearch(searchCity);
  }

  return (
    <form className="weather-search" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="city-search">
        City name
      </label>
      <input
        id="city-search"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        placeholder="Search a city, e.g. Kathmandu"
        autoComplete="off"
      />
      <button type="submit" disabled={loading || !city.trim()}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}

export default WeatherSearch;

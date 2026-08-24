import { useState } from "react";
import useCitySuggestions from "../hooks/useCitySuggestions";
import CitySuggestions from "./CitySuggestions";

function WeatherSearch({ onSearch, onSelectSuggestion, loading }) {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useCitySuggestions(city);

  function handleSubmit(event) {
    event.preventDefault();
    const searchCity = city.trim();
    if (searchCity) {
      setSuggestions([]);
      onSearch(searchCity);
    }
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
      <CitySuggestions
        suggestions={suggestions}
        onSelect={({ label, coordinates }) => {
          setCity(label);
          setSuggestions([]);
          onSelectSuggestion(coordinates);
        }}
      />
    </form>
  );
}

export default WeatherSearch;

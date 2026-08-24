import { formatCitySuggestion } from "../hooks/useCitySuggestions";

function CitySuggestions({ suggestions, onSelect }) {
  if (!suggestions.length) return null;

  return (
    <ul className="city-suggestions" role="listbox">
      {suggestions.map((city) => {
        const label = formatCitySuggestion(city);
        const coordinates = {
          latitude: city.lat,
          longitude: city.lon,
        };
        return (
          <li key={`${city.lat}-${city.lon}`}>
            <button
              type="button"
              onClick={() => onSelect({ label, coordinates })}
            >
              {label}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export default CitySuggestions;

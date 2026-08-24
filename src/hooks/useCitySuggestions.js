import { useEffect, useState } from "react";
import { getCitySuggestions } from "../services/weatherApi";

export function formatCitySuggestion(city) {
  return [city.name, city.state, city.country].filter(Boolean).join(", ");
}

function normalizeCityName(name) {
  return name
    .toLocaleLowerCase()
    .replace(/\s+metropolitan city$/, "")
    .trim();
}

export function rankCitySuggestions(cities, query) {
  if (!cities.length) return [];

  const normalizedQuery = normalizeCityName(query);
  const primaryCity = cities[0];
  const isPrimaryExactMatch =
    normalizeCityName(primaryCity.name) === normalizedQuery;

  if (!isPrimaryExactMatch) return cities;

  return cities.filter((city) => city.country === primaryCity.country);
}

export default function useCitySuggestions(query) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const search = query.trim();
    if (search.length < 2) {
      return undefined;
    }

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const cities = await getCitySuggestions(search, controller.signal);
        setSuggestions(rankCitySuggestions(cities, search));
      } catch (error) {
        if (error.name !== "AbortError") setSuggestions([]);
      }
    }, 300);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const visibleSuggestions = query.trim().length >= 2 ? suggestions : [];
  return [visibleSuggestions, setSuggestions];
}

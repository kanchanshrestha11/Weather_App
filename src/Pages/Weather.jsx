import { useDispatch, useSelector } from "react-redux";
import WeatherCard from "../Components/WeatherCard";
import WeatherSearch from "../Components/WeatherSearch";
import { fetchWeather } from "../features/weather/weatherSlice";
import "./Weather.css";

function Weather() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.weather);
  const loading = status === "loading";

  return (
    <main className="weather-page">
      <section className="weather-shell">
        <header className="weather-header">
          <p className="eyebrow">Live conditions</p>
          <h1>What’s the weather like?</h1>
          <p>Search any city for its current temperature and conditions.</p>
        </header>
        <WeatherSearch
          loading={loading}
          onSearch={(city) => dispatch(fetchWeather(city))}
        />
        {error && <p className="weather-error" role="alert">{error}</p>}
        {status === "idle" && (
          <div className="weather-empty">
            <span aria-hidden="true">☀️</span>
            <p>Your weather report will appear here.</p>
          </div>
        )}
        {loading && <div className="weather-loader" aria-label="Loading weather" />}
        {data && !loading && <WeatherCard weather={data} />}
        <p className="weather-credit">Weather data provided by OpenWeather</p>
      </section>
    </main>
  );
}

export default Weather;

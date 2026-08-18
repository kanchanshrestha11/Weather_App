import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLocalWeather,
  fetchWeather,
  toggleFavorite,
} from "../features/weather/weatherSlice";
import "./Home.css";

function Home() {
  const [city, setCity] = useState("");
  const [locationError, setLocationError] = useState("");
  const dispatch = useDispatch();
  const { data, status, error, favorites } = useSelector(
    (state) => state.weather,
  );
  const condition = data?.weather?.[0];
  const loading = status === "loading";
  const isFavorite = data
    ? favorites.some((favorite) => favorite.id === data.id)
    : false;

  function handleSearch(event) {
    event.preventDefault();
    const searchCity = city.trim();
    if (searchCity) dispatch(fetchWeather(searchCity));
  }

  function handleLocation() {
    setLocationError("");

    if (!navigator.geolocation) {
      setLocationError("Location is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch(
          fetchLocalWeather({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        );
      },
      () => {
        setLocationError(
          "Location permission was not granted. You can still search by city.",
        );
      },
    );
  }

  return (
    <main className="home-page">
      <div className="home-stars" aria-hidden="true" />
      <section className="home-content">
        <div className="home-copy">
          <p className="home-kicker">Real-time weather, wherever you are</p>
          <h1>
            Weather,
            <br />made <span>simple.</span>
          </h1>
          <p className="home-intro">
            Plan your day with current conditions for your location or any
            city around the world.
          </p>

          <form className="home-search" onSubmit={handleSearch}>
            <span aria-hidden="true">⌕</span>
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Search for a city..."
              aria-label="City name"
            />
            <button disabled={loading || !city.trim()}>
              {loading ? "Loading..." : "Search"}
            </button>
          </form>

          <button className="location-button" onClick={handleLocation}>
            <span aria-hidden="true">⌖</span> Use my current location
          </button>
          {(locationError || error) && (
            <p className="home-error" role="alert">{locationError || error}</p>
          )}
        </div>

        <div className="home-weather-wrap">
          {data ? (
            <article className="home-weather-card">
              <button
                className={`favorite-button ${isFavorite ? "is-favorite" : ""}`}
                onClick={() =>
                  dispatch(
                    toggleFavorite({
                      id: data.id,
                      name: data.name,
                      country: data.sys.country,
                    }),
                  )
                }
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                title={isFavorite ? "Remove from favorites" : "Add to favorites"}
              >
                {isFavorite ? "★" : "☆"}
              </button>
              <div className="home-card-top">
                <div>
                  <p className="home-label">Current weather</p>
                  <h2>{data.name}, {data.sys.country}</h2>
                  <p className="home-condition">{condition?.description}</p>
                </div>
                {condition && (
                  <img
                    src={`https://openweathermap.org/img/wn/${condition.icon}@2x.png`}
                    alt={condition.description}
                  />
                )}
              </div>
              <div className="home-temperature">
                {Math.round(data.main.temp)}<sup>°C</sup>
              </div>
              <p className="home-feels">
                Feels like {Math.round(data.main.feels_like)}°C
              </p>
              <div className="home-details">
                <div><span>Humidity</span><strong>{data.main.humidity}%</strong></div>
                <div><span>Wind</span><strong>{data.wind.speed} m/s</strong></div>
                <div><span>Pressure</span><strong>{data.main.pressure} hPa</strong></div>
                <div><span>Visibility</span><strong>{data.visibility / 1000} km</strong></div>
              </div>
            </article>
          ) : (
            <article className="home-weather-card home-placeholder">
              <div className="placeholder-sun">☀️</div>
              <h2>Your local forecast</h2>
              <p>
                Search for a city or allow location access to see live weather
                here.
              </p>
            </article>
          )}
        </div>
      </section>

      <section className="home-features">
        <div><span>🌡️</span><p><strong>Live conditions</strong>Temperature and feels-like data</p></div>
        <div><span>💨</span><p><strong>Weather details</strong>Wind, humidity and pressure</p></div>
        <div><span>🌍</span><p><strong>Worldwide search</strong>Look up cities around the globe</p></div>
      </section>
    </main>
  );
}

export default Home;

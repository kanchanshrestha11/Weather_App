function WeatherCard({ weather }) {
  const condition = weather.weather?.[0];
  const iconUrl = condition
    ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
    : null;

  return (
    <article className="weather-card">
      <div className="weather-location">
        <div>
          <p className="eyebrow">Current weather</p>
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p className="description">{condition?.description}</p>
        </div>
        {iconUrl && <img src={iconUrl} alt={condition.description} />}
      </div>

      <div className="temperature">
        {Math.round(weather.main.temp)}<span>°C</span>
      </div>

      <div className="weather-details">
        <div><span>Feels like</span><strong>{Math.round(weather.main.feels_like)}°C</strong></div>
        <div><span>Humidity</span><strong>{weather.main.humidity}%</strong></div>
        <div><span>Wind</span><strong>{weather.wind.speed} m/s</strong></div>
        <div><span>Pressure</span><strong>{weather.main.pressure} hPa</strong></div>
      </div>
    </article>
  );
}

export default WeatherCard;

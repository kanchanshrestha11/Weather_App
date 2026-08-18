import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchWeather,
  toggleFavorite,
} from "../features/weather/weatherSlice";

function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.weather.favorites);

  function showWeather(cityName) {
    dispatch(fetchWeather(cityName));
    navigate("/");
  }

  return (
    <main className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-6 py-16 text-white">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-sky-300">
          Saved places
        </p>
        <h1 className="mt-3 text-4xl font-bold sm:text-5xl">
          Your favorites
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-300">
          Save the places you check often and open their latest weather with
          one click.
        </p>

        {favorites.length === 0 ? (
          <div className="mt-12 rounded-3xl border border-white/15 bg-white/10 px-6 py-16 text-center shadow-2xl backdrop-blur-md">
            <span className="text-6xl" aria-hidden="true">☆</span>
            <h2 className="mt-5 text-2xl font-bold">No favorite places yet</h2>
            <p className="mx-auto mt-3 max-w-md text-slate-300">
              Search for a city on the Home page, then select the star on its
              weather card to save it here.
            </p>
            <Link
              to="/"
              className="mt-7 inline-block rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 py-3 font-bold transition hover:brightness-110"
            >
              Add a favorite
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((city) => (
              <article
                key={city.id}
                className="rounded-2xl border border-white/15 bg-white/10 p-6 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-sky-300">Saved location</p>
                    <h2 className="mt-1 text-2xl font-bold">
                      {city.name}, {city.country}
                    </h2>
                  </div>
                  <button
                    onClick={() => dispatch(toggleFavorite(city))}
                    className="text-2xl text-yellow-300 transition hover:scale-110"
                    aria-label={`Remove ${city.name} from favorites`}
                    title="Remove from favorites"
                  >
                    ★
                  </button>
                </div>
                <button
                  onClick={() => showWeather(city.name)}
                  className="mt-7 w-full rounded-xl bg-blue-500 px-4 py-3 font-bold transition hover:bg-blue-400"
                >
                  View current weather
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default Favorites;

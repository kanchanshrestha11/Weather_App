function About() {
  return (
    <main className="min-h-[calc(100vh-72px)] bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
          About SkyWeather
        </p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Weather information that helps you plan your day.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          SkyWeather gives you clear, up-to-date weather information without
          unnecessary distractions. Search for any city or use your current
          location to check the temperature, weather conditions, humidity,
          wind speed, pressure, visibility, and upcoming forecast.
        </p>

        <section className="mt-12 grid gap-5 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Local weather
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Allow location access to quickly view conditions near you, or
              search manually when you prefer.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Worldwide search
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Check current weather for cities around the world before you
              travel, commute, or make outdoor plans.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900">
              Useful forecasts
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Review upcoming conditions and temperature changes in a simple,
              readable format.
            </p>
          </article>
        </section>

        <section className="mt-12 rounded-2xl bg-slate-900 p-7 text-slate-200 sm:p-9">
          <h2 className="text-2xl font-bold text-white">
            Data and privacy
          </h2>
          <p className="mt-4 leading-7">
            Weather information is provided by OpenWeather and may change as
            new observations become available. Forecasts are estimates, so
            always follow official local warnings during severe weather.
          </p>
          <p className="mt-3 leading-7">
            Location access is optional. Your browser asks for permission
            before sharing your coordinates, and you can continue using city
            search if you choose not to allow it.
          </p>
        </section>
      </div>
    </main>
  );
}

export default About;

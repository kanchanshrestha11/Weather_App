import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 px-4 py-4 text-white shadow-md sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
        <Link
          to="/"
          className="text-xl font-bold tracking-tight transition hover:text-blue-400"
        >
          ☁️ SkyWeather
        </Link>

        <div className="flex items-center gap-1 sm:gap-3">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            <span aria-hidden="true">★</span> Favorites
          </Link>
          <Link
            to="/About"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            About
          </Link>
          <Link
            to="/Login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800 hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

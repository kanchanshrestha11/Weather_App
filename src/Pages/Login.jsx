import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    navigate("/home");
  }

  return (
    <main className="mx-auto max-w-md px-6 py-16">
      <form
        onSubmit={handleSubmit}
        className="rounded-2xl bg-white p-8 shadow-lg"
      >
        <h1 className="text-3xl font-bold text-slate-900">Log in</h1>
        <label className="mt-6 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="Enter your email"
        />
        <label className="mt-5 block text-sm font-medium" htmlFor="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          className="mt-6 w-full rounded-lg bg-blue-600 py-3 font-semibold text-white"
        >
          Log in
        </button>
      </form>
    </main>
  );
}

export default Login;

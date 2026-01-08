import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/auth/authSlice";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", {
        email: e.target.email.value,
        password: e.target.password.value,
      });

      const token = res.data.accessToken || res.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("role", res.data.role || "user");

      dispatch(loginSuccess(token));
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8">
        
        {/* Header */}
        <h1 className="text-2xl font-semibold text-center">Login</h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Hi, Welcome back 👋
        </p>

        {/* Google Login */}
        <button
          type="button"
          className="w-full mt-6 border py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5"
          />
          Login with Google
        </button>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="h-px bg-gray-200 flex-1" />
          <span className="text-xs text-gray-400">
            or login with email
          </span>
          <div className="h-px bg-gray-200 flex-1" />
        </div>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mb-4">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="e.g. johndoe@gmail.com"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-gray-600">
              <input type="checkbox" />
              Remember me
            </label>
            <span className="text-indigo-600 cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          <button
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-medium hover:bg-indigo-700"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Not registered yet?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-medium"
          >
            Create an account →
          </Link>
        </p>
      </div>
    </div>
  );
}

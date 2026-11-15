import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";
import { Eye, EyeOff, Package, LogIn, Mail, Lock } from "lucide-react";

// ─── Login Page ───────────────────────────────────────────────────────────────
// Controlled form that collects email + password, calls the login() function
// from AuthContext, and navigates to the correct dashboard based on user role.
// All backend errors (wrong credentials, server down) surface via react-hot-toast.

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // ── Form state ───────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Controlled input handler ─────────────────────────────────────────────────
  // A single handler for all inputs — reads the field's `name` attribute to
  // know which key in formData to update.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Form submission ──────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    // ── Client-side validation ──────────────────────────────────────────────
    // Catch empty fields before hitting the network.
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required.");
      return;
    }

    setIsLoading(true);

    try {
      // ── Call AuthContext login() ────────────────────────────────────────────
      // login() internally calls loginApi() → POST /login
      // On success: stores token + user in localStorage, updates React state,
      //             and returns the full backend response object.
      // On failure: throws the error so our catch block handles it below.
      const data = await login(email.trim(), password);

      toast.success(`Welcome back, ${data.user.name}!`);

      // ── Role-based navigation ───────────────────────────────────────────────
      // Backend sends user.role as "admin" or "employee".
      // Navigate to the matching dashboard — pages to be built later.
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee");
      }
    } catch (error) {
      // ── Backend error message ───────────────────────────────────────────────
      // Axios re-rejects after the response interceptor runs, so the full
      // error.response object is still available here.
      // We read error.response.data.message which is exactly what the backend
      // sends: "Invalid credentials", "Please fill all the fields", etc.
      // Fallback to a generic message if the network is completely unreachable.
      const message =
        error.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      // Always turn off the loading spinner regardless of outcome.
      setIsLoading(false);
    }
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-10">

      {/* react-hot-toast container — renders toasts at the top-center */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md">

        {/* ── Brand Header ─────────────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
            <Package className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            StockFlow
          </h1>
          <p className="text-blue-300 text-sm mt-1">
            Inventory Management System
          </p>
        </div>

        {/* ── Card ─────────────────────────────────────────────────────────── */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">Sign in</h2>
            <p className="text-slate-400 text-sm mt-1">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* ── Email field ────────────────────────────────────────────── */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Email address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-slate-400" />
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="you@company.com"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
                />
              </div>
            </div>

            {/* ── Password field ─────────────────────────────────────────── */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-slate-400" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
                />
                {/* Show / hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-200 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* ── Submit button ──────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-900/40 mt-2"
            >
              {isLoading ? (
                <>
                  {/* Inline spinner — no extra library needed */}
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Sign in
                </>
              )}
            </button>
          </form>
        </div>

        {/* ── Footer note ──────────────────────────────────────────────────── */}
        <p className="text-center text-slate-500 text-xs mt-6">
          © {new Date().getFullYear()} StockFlow · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Login;

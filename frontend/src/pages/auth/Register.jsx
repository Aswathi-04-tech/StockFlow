import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerApi } from "../../services/authApi";
import toast, { Toaster } from "react-hot-toast";
import {
  Eye,
  EyeOff,
  Package,
  UserPlus,
  Mail,
  Lock,
  User,
} from "lucide-react";

// ─── Email format regex ───────────────────────────────────────────────────────
// Defined at module level so it is never recreated.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ─── PasswordField ────────────────────────────────────────────────────────────
// Defined OUTSIDE Register so React sees a stable component reference across
// renders. If it were defined inside Register it would be a brand-new function
// on every render, React would unmount+remount the input, and the field would
// lose focus after every single keystroke.
//
// Props:
//   id, label, name, value, placeholder  — standard input attributes
//   show        → boolean — whether the text is visible
//   onToggle    → () => void — flips show state in the parent
//   onChange    → event handler from the parent's handleChange
//   disabled    → passed down so the field locks during API call
const PasswordField = ({
  id,
  label,
  name,
  value,
  placeholder,
  show,
  onToggle,
  onChange,
  disabled,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-slate-300 mb-1.5"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Lock size={16} className="text-slate-400" />
      </span>
      <input
        id={id}
        name={name}
        type={show ? "text" : "password"}
        autoComplete="new-password"
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className="w-full pl-9 pr-10 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
      />
      <button
        type="button"
        onClick={onToggle}
        className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-200 transition"
        aria-label={show ? `Hide ${label}` : `Show ${label}`}
      >
        {show ? <EyeOff size={16} /> : <Eye size={16} />}
      </button>
    </div>
  </div>
);

// ─── Register Page ────────────────────────────────────────────────────────────
const Register = () => {
  const navigate = useNavigate();

  // ── Form state ───────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Single controlled-input handler ──────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ── Client-side validation ────────────────────────────────────────────────────
  const validate = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name.trim()) {
      toast.error("Full name is required.");
      return false;
    }
    if (!email.trim()) {
      toast.error("Email address is required.");
      return false;
    }
    if (!EMAIL_REGEX.test(email.trim())) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (!password) {
      toast.error("Password is required.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return false;
    }
    if (!confirmPassword) {
      toast.error("Please confirm your password.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

    return true;
  };

  // ── Form submission ───────────────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);

    try {
      await registerApi({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      toast.success("Account created! Please sign in.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      const message =
        error.response?.data?.message || "Something went wrong. Try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center px-4 py-10">

      {/* Toast container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="w-full max-w-md">

        {/* ── Brand Header ──────────────────────────────────────────────────── */}
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

        {/* ── Card ──────────────────────────────────────────────────────────── */}
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-white">
              Create an account
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Register as an employee to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-5">

            {/* ── Full name ──────────────────────────────────────────────── */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-1.5"
              >
                Full name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <User size={16} className="text-slate-400" />
                </span>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder="Jane Smith"
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-white/10 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition"
                />
              </div>
            </div>

            {/* ── Email ──────────────────────────────────────────────────── */}
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

            {/* ── Password ───────────────────────────────────────────────── */}
            <PasswordField
              id="password"
              label="Password"
              name="password"
              value={formData.password}
              placeholder="Min. 6 characters"
              show={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* ── Confirm password ───────────────────────────────────────── */}
            <PasswordField
              id="confirmPassword"
              label="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              placeholder="Re-enter your password"
              show={showConfirm}
              onToggle={() => setShowConfirm((prev) => !prev)}
              onChange={handleChange}
              disabled={isLoading}
            />

            {/* ── Submit ─────────────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold py-2.5 rounded-lg text-sm transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-blue-900/40 mt-2"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Create account
                </>
              )}
            </button>
          </form>

          {/* ── Login link ──────────────────────────────────────────────────── */}
          <p className="text-center text-slate-400 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:text-blue-300 font-medium transition"
            >
              Sign in
            </Link>
          </p>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <p className="text-center text-slate-500 text-xs mt-6">
          © {new Date().getFullYear()} StockFlow · All rights reserved
        </p>
      </div>
    </div>
  );
};

export default Register;

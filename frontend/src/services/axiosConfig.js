import axios from "axios";

// ─── Axios Instance ────────────────────────────────────────────────────────────
// Creates a pre-configured Axios instance that all API calls in this app use.
// Every request automatically targets the backend at http://localhost:5000/api
// and carries the JWT token stored in localStorage, so individual API call
// sites never have to repeat the base URL or the auth header.

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ───────────────────────────────────────────────────────
// Runs before every request is sent.
// Reads the JWT token from localStorage and, if present, attaches it to the
// Authorization header in the standard "Bearer <token>" format.
// If no token exists (unauthenticated user) the request is forwarded as-is.

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ─── Response Interceptor ─────────────────────────────────────────────────────
// Runs after every response is received.
//
// 401 handling is intentionally scoped:
//   • Public auth endpoints (/login, /register) legitimately return 401 for
//     bad credentials. Those are NOT session-expiry signals, so we must NOT
//     clear localStorage or redirect — the calling component handles the error.
//   • All other 401s mean the token is missing, invalid, or expired, so we
//     clear stored credentials and send the user back to the login page.
//
// URL matching uses exact suffix checks (endsWith) instead of a loose
// includes() so a path like "/admin/register" is never accidentally treated
// as a public auth route.

// Routes that are allowed to return 401 without triggering a session reset.
const PUBLIC_AUTH_ROUTES = ["/login", "/register"];

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    // Check whether the failing request was aimed at a public auth endpoint.
    const isPublicAuthRoute = PUBLIC_AUTH_ROUTES.some((route) =>
      requestUrl.endsWith(route)
    );

    if (status === 401 && !isPublicAuthRoute) {
      // Token is gone or expired — wipe local state and force re-login.
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }

    // Always re-reject so the calling component's .catch() / try-catch still runs.
    return Promise.reject(error);
  }
);

export default axiosInstance;

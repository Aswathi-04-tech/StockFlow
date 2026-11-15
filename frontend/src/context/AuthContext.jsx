import { createContext, useContext, useState, useEffect } from "react";
import { loginApi } from "../services/authApi";

// ─── 1. Create the Context ────────────────────────────────────────────────────
// AuthContext is the shared container that holds authentication state and
// functions. Any component inside <AuthProvider> can read from it via useAuth.
// The default value is null — it only becomes meaningful once AuthProvider mounts.

const AuthContext = createContext(null);

// ─── 2. AuthProvider Component ────────────────────────────────────────────────
// Wraps the application (or a portion of it) and makes auth state available
// to every child component without prop drilling.

export const AuthProvider = ({ children }) => {

  // ─── 3. State ──────────────────────────────────────────────────────────────
  // user          → the logged-in user object { name, email, role } or null
  // token         → the JWT string or null
  // isAuthenticated → boolean derived from whether a token exists

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // ─── 6. Restore Session on App Load ────────────────────────────────────────
  // Runs once when the AuthProvider first mounts.
  // If a previous session's token and user exist in localStorage, we restore
  // them so the user does not have to log in again after a page refresh.

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        // localStorage value was corrupted — start with a clean slate.
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ─── 4. Login Function ─────────────────────────────────────────────────────
  // Called by the Login page with { email, password }.
  // Steps:
  //   a) Call the loginApi — Axios interceptor adds no token (not logged in yet).
  //   b) Destructure token and user from the backend response.
  //   c) Persist both to localStorage so they survive a page refresh.
  //   d) Update React state so the UI reflects the authenticated session.
  //   e) Return the full response so the caller can read success/message fields.
  //
  // Errors are NOT caught here — they propagate to the calling component so
  // the Login page can display the backend's error message to the user.

  const login = async (email, password) => {
    const data = await loginApi({ email, password });

    const { token: receivedToken, user: receivedUser } = data;

    // Persist to localStorage
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(receivedUser));

    // Update React state
    setToken(receivedToken);
    setUser(receivedUser);
    setIsAuthenticated(true);

    return data;
  };

  // ─── 5. Logout Function ────────────────────────────────────────────────────
  // Clears the session completely:
  //   • Removes stored credentials from localStorage.
  //   • Resets all three auth state values to their logged-out defaults.
  // After this runs, the axiosInstance request interceptor will find no token
  // in localStorage and will send requests without an Authorization header.

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // ─── Context Value ─────────────────────────────────────────────────────────
  // The object exposed to every consumer of this context.
  // Keep this flat — components destructure only what they need.

  const contextValue = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ─── 7. Custom useAuth Hook ───────────────────────────────────────────────────
// A thin wrapper around useContext(AuthContext).
// Benefits:
//   • Shorter import — `useAuth()` instead of `useContext(AuthContext)`.
//   • Guards against accidental use outside <AuthProvider> with a clear error.
//
// Usage in any component:
//   const { user, isAuthenticated, login, logout } = useAuth();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an <AuthProvider>.");
  }

  return context;
};

export default AuthContext;

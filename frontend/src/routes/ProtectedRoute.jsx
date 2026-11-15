import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// ─── ProtectedRoute ────────────────────────────────────────────────────────────
// A wrapper component that guards any route requiring authentication.
//
// Props:
//   children   → the actual page component to render if access is granted
//   requiredRole → "admin" | "employee" — the role allowed on this route
//
// Decision tree:
//   1. Not authenticated at all         → redirect to /login
//   2. Authenticated but wrong role     → redirect to their own dashboard
//   3. Authenticated + correct role     → render the page (children)

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();

  // ── Guard 1: Not logged in ─────────────────────────────────────────────────
  // The user has no token / session — send them to Login.
  // `replace` removes the protected URL from browser history so the back button
  // doesn't take them back to a page they cannot access.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // ── Guard 2: Logged in but wrong role ──────────────────────────────────────
  // e.g. an employee trying to visit /admin — send them to their own dashboard.
  // This prevents role escalation via direct URL manipulation.
  if (requiredRole && user?.role !== requiredRole) {
    const correctPath = user?.role === "admin" ? "/admin" : "/employee";
    return <Navigate to={correctPath} replace />;
  }

  // ── Guard 3: Authenticated + correct role — render the page ───────────────
  return children;
};

export default ProtectedRoute;

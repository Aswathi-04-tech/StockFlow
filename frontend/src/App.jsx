import { Routes, Route, Navigate } from "react-router-dom";
import {
  Boxes,
  Tags,
  Truck,
  ArrowLeftRight,
  Users,
  BarChart3,
} from "lucide-react";

// ── Pages ─────────────────────────────────────────────────────────────────────
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import EmployeeDashboard from "./pages/employee/EmployeeDashboard";

// ── Reusable Placeholder Page & Route Guard ───────────────────────────────────
import PlaceholderPage from "./components/common/PlaceholderPage";
import ProtectedRoute from "./routes/ProtectedRoute";

// ─── App — Central Route Map ──────────────────────────────────────────────────
// Defines public authentication routes and role-protected operational routes.
// Every authenticated route is rendered within DashboardLayout (internally inside
// each dashboard and placeholder page) and guarded by ProtectedRoute.

const App = () => {
  return (
    <Routes>
      {/* ── Root fallback ──────────────────────────────────────────────────── */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* ── Public Authentication Routes ───────────────────────────────────── */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ── Protected: Admin Routes (requiredRole="admin") ──────────────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/products"
        element={
          <ProtectedRoute requiredRole="admin">
            <PlaceholderPage
              title="Products Management"
              description="Catalog administration, SKU tracking, pricing rules, and item creation."
              icon={Boxes}
              badge="Admin Module"
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute requiredRole="admin">
            <PlaceholderPage
              title="Categories Management"
              description="Organize inventory classifications, sub-categories, and product groupings."
              icon={Tags}
              badge="Admin Module"
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/suppliers"
        element={
          <ProtectedRoute requiredRole="admin">
            <PlaceholderPage
              title="Suppliers Management"
              description="Manage vendor directories, supplier contacts, and procurement channels."
              icon={Truck}
              badge="Admin Module"
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/stock"
        element={
          <ProtectedRoute requiredRole="admin">
            <PlaceholderPage
              title="Stock Management"
              description="Centralized inventory audit, stock adjustments, batch receipts, and transfers."
              icon={ArrowLeftRight}
              badge="Admin Module"
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/employees"
        element={
          <ProtectedRoute requiredRole="admin">
            <PlaceholderPage
              title="Employees Management"
              description="Manage staff accounts, assign roles, permissions, and monitor activity."
              icon={Users}
              badge="Admin Module"
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reports"
        element={
          <ProtectedRoute requiredRole="admin">
            <PlaceholderPage
              title="Reports & Analytics"
              description="Inventory turnover, valuation summaries, stock movements, and audit exports."
              icon={BarChart3}
              badge="Admin Module"
            />
          </ProtectedRoute>
        }
      />

      {/* ── Protected: Employee Routes (requiredRole="employee") ────────────── */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute requiredRole="employee">
            <EmployeeDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/products"
        element={
          <ProtectedRoute requiredRole="employee">
            <PlaceholderPage
              title="Product Catalog"
              description="Browse products, search availability, check prices, and inspect specifications."
              icon={Boxes}
              badge="Staff Module"
            />
          </ProtectedRoute>
        }
      />
      <Route
        path="/employee/stock"
        element={
          <ProtectedRoute requiredRole="employee">
            <PlaceholderPage
              title="Stock Operations"
              description="Record inventory dispatches, verify incoming stock, and log item movements."
              icon={ArrowLeftRight}
              badge="Staff Module"
            />
          </ProtectedRoute>
        }
      />

      {/* ── 404 Catch-All Fallback ─────────────────────────────────────────── */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;

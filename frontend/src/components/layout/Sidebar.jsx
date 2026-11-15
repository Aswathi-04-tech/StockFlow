import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  Package,
  LayoutDashboard,
  Boxes,
  Tags,
  Truck,
  ArrowLeftRight,
  Users,
  BarChart3,
  X,
  Shield,
  UserCheck,
} from "lucide-react";

// ─── Navigation Definitions ───────────────────────────────────────────────────
// Role-based navigation items for StockFlow.
// Admin has access to full inventory, user management, and reporting.
// Employee has access to essential operational inventory workflows.

const ADMIN_NAV_ITEMS = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Products", path: "/admin/products", icon: Boxes },
  { name: "Categories", path: "/admin/categories", icon: Tags },
  { name: "Suppliers", path: "/admin/suppliers", icon: Truck },
  { name: "Stock Management", path: "/admin/stock", icon: ArrowLeftRight },
  { name: "Employees", path: "/admin/employees", icon: Users },
  { name: "Reports", path: "/admin/reports", icon: BarChart3 },
];

const EMPLOYEE_NAV_ITEMS = [
  { name: "Dashboard", path: "/employee", icon: LayoutDashboard },
  { name: "Products", path: "/employee/products", icon: Boxes },
  { name: "Stock Management", path: "/employee/stock", icon: ArrowLeftRight },
];

const Sidebar = ({ isMobileOpen, onCloseMobile }) => {
  const { user } = useAuth();

  // Determine active navigation links based on user role
  const navItems = user?.role === "admin" ? ADMIN_NAV_ITEMS : EMPLOYEE_NAV_ITEMS;

  return (
    <>
      {/* ── Mobile Backdrop ────────────────────────────────────────────────── */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar Container ──────────────────────────────────────────────── */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        {/* ── Header & Branding ────────────────────────────────────────────── */}
        <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-900/40">
              <Package size={22} />
            </div>
            <div>
              <span className="text-lg font-bold text-white tracking-tight leading-none block">
                StockFlow
              </span>
              <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wider block mt-0.5">
                Inventory
              </span>
            </div>
          </div>

          {/* Close button on mobile */}
          <button
            type="button"
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* ── Navigation List ──────────────────────────────────────────────── */}
        <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
            Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin" || item.path === "/employee"}
                onClick={onCloseMobile}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition duration-150 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-900/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/70"
                  }`
                }
              >
                <Icon size={18} className="shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* ── User Role Summary in Sidebar ─────────────────────────────────── */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-800/40">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                user?.role === "admin"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {user?.role === "admin" ? (
                <Shield size={16} />
              ) : (
                <UserCheck size={16} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {user?.name || "User"}
              </p>
              <span
                className={`inline-block text-[10px] uppercase font-bold tracking-wider ${
                  user?.role === "admin" ? "text-blue-400" : "text-emerald-400"
                }`}
              >
                {user?.role}
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

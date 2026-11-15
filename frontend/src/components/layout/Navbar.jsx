import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, LogOut, User, ShieldCheck } from "lucide-react";

// ─── Navbar ───────────────────────────────────────────────────────────────────
// Top navigation bar for the dashboard.
// Displays mobile hamburger toggle, current user identity, role badge,
// and a working Logout button.

const Navbar = ({ onToggleMobileSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const isAdmin = user?.role === "admin";

  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* ── Left Section: Mobile Toggle & Context ──────────────────────────── */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobileSidebar}
          className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          aria-label="Toggle navigation menu"
        >
          <Menu size={22} />
        </button>

        <div className="hidden sm:block">
          <h1 className="text-sm font-semibold text-white tracking-wide">
            Inventory Management Portal
          </h1>
          <p className="text-xs text-slate-400">
            {isAdmin ? "Administrator Workspace" : "Employee Workspace"}
          </p>
        </div>
      </div>

      {/* ── Right Section: User Profile & Logout ───────────────────────────── */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* User Identity Pill */}
        <div className="flex items-center gap-3 pl-3 py-1.5 pr-2 rounded-full bg-slate-800/80 border border-slate-700/60">
          <div className="w-8 h-8 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center font-bold text-xs">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User size={16} />}
          </div>

          <div className="flex flex-col text-left pr-2">
            <span className="text-xs font-semibold text-white leading-tight">
              {user?.name || "User"}
            </span>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                isAdmin ? "text-blue-400" : "text-emerald-400"
              }`}
            >
              {user?.role || "Member"}
            </span>
          </div>

          {/* Role badge */}
          <span
            className={`hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
              isAdmin
                ? "bg-blue-500/10 text-blue-300 border-blue-500/30"
                : "bg-emerald-500/10 text-emerald-300 border-emerald-500/30"
            }`}
          >
            <ShieldCheck size={12} />
            {isAdmin ? "Admin" : "Staff"}
          </span>
        </div>

        {/* Logout Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-rose-400 hover:text-rose-300 border border-red-500/20 text-xs font-semibold transition"
          title="Sign out of StockFlow"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;

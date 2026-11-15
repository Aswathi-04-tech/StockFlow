import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

// ─── DashboardLayout ──────────────────────────────────────────────────────────
// Common container layout for all authenticated pages in StockFlow.
// Provides:
//   • Persistent responsive Sidebar with role-based navigation links.
//   • Top Navbar with user profile details and Logout action.
//   • Responsive mobile drawer toggle state.
//   • Main content viewport for nested children pages.

const DashboardLayout = ({ children }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row">
      {/* ── Sidebar (handles desktop static column & mobile slide-out) ─────── */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        onCloseMobile={() => setIsMobileOpen(false)}
      />

      {/* ── Main Viewport Area ─────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Sticky Top Navbar */}
        <Navbar onToggleMobileSidebar={() => setIsMobileOpen((prev) => !prev)} />

        {/* Page Content Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

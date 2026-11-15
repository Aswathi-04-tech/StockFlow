import DashboardLayout from "../layout/DashboardLayout";
import { Sparkles, Construction } from "lucide-react";

// ─── PlaceholderPage ──────────────────────────────────────────────────────────
// Reusable placeholder page for routes whose feature modules are under construction.
// Renders inside DashboardLayout to keep Navbar and Sidebar visible and interactive.

const PlaceholderPage = ({
  title,
  description,
  icon: Icon = Construction,
  badge = "Module Under Development",
}) => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* ── Page Header Banner ───────────────────────────────────────────── */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 mb-3">
              <Sparkles size={14} />
              {badge}
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {title}
            </h1>
            <p className="text-slate-400 text-sm mt-2 max-w-2xl leading-relaxed">
              {description ||
                "This module is currently under development. Full functionality will be available in an upcoming release."}
            </p>
          </div>
        </div>

        {/* ── Coming Soon Content Card ─────────────────────────────────────── */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 sm:p-14 text-center flex flex-col items-center justify-center min-h-[350px]">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mb-4 shadow-lg shadow-blue-950/40">
            <Icon size={32} />
          </div>

          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <p className="text-slate-400 text-sm mt-2 max-w-md">
            The {title.toLowerCase()} workspace is being prepared. Real-time controls, data tables, and actions are coming soon.
          </p>

          <div className="mt-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-800 text-blue-300 border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            Coming Soon
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlaceholderPage;

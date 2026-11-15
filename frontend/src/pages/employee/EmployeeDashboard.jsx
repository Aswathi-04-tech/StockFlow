import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Sparkles } from "lucide-react";

// ─── EmployeeDashboard ────────────────────────────────────────────────────────
// Employee home dashboard rendered inside the reusable DashboardLayout.

const EmployeeDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-900/40 via-teal-900/30 to-slate-900 border border-emerald-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
              <Sparkles size={14} />
              Staff Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {user?.name || "Team Member"}!
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              This is your operational workspace. You can track catalog products, perform stock checkouts, record inventory receipts, and manage day-to-day item movements.
            </p>
          </div>
        </div>

        {/* Placeholder Workspace Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
            <LayoutDashboard size={28} />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Inventory Operations Workspace
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-md">
            Product catalog lookups and stock movement operations will appear here. Choose a section from the sidebar to continue.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default EmployeeDashboard;

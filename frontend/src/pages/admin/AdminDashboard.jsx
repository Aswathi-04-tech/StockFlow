import DashboardLayout from "../../components/layout/DashboardLayout";
import { useAuth } from "../../context/AuthContext";
import { LayoutDashboard, Sparkles } from "lucide-react";

// ─── AdminDashboard ───────────────────────────────────────────────────────────
// Admin home dashboard rendered inside the reusable DashboardLayout.

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-blue-900/40 via-indigo-900/30 to-slate-900 border border-blue-500/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          <div className="relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-300 border border-blue-500/30 mb-3">
              <Sparkles size={14} />
              Admin Portal
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Welcome back, {user?.name || "Administrator"}!
            </h1>
            <p className="text-slate-300 text-sm mt-2 max-w-2xl leading-relaxed">
              This is the centralized StockFlow operations center. You have complete administrative oversight of products, categories, suppliers, stock movements, team members, and inventory analytics.
            </p>
          </div>
        </div>

        {/* Placeholder Workspace Card */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-8 text-center flex flex-col items-center justify-center min-h-[300px]">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center mb-4">
            <LayoutDashboard size={28} />
          </div>
          <h2 className="text-lg font-semibold text-white">
            Administrative Management Workspace
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-md">
            Management modules and real-time inventory statistics will appear here. Select an option from the sidebar to begin navigation.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;

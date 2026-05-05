import AdminBalanceContent from "@/components/modules/Admin/AdminBalance/AdminBalance";
import { getSystemDashboardStats } from "@/services/stats/stats.api";


const AdminBalanceOverviewPage = async () => {
  const data = await getSystemDashboardStats();
  
 
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Balance Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Total money in the system and per-user/agent breakdown.</p>
      </div>
      <AdminBalanceContent data={data?.data || {}} />
    </div>
  );
};

export default AdminBalanceOverviewPage;
import AgentDashboardContent from "@/components/modules/Agent/AgentDashboardContent";
import { getUserProfile } from "@/services/auth/auth.api";
import { getAgentDashboardStats } from "@/services/stats/stats.api";

const AgentDashboardPage = async () => {
  const [user, stats] = await Promise.all([
    getUserProfile(),
    getAgentDashboardStats(),
  ]);

  return <AgentDashboardContent user={user} stats={stats.data || {}} />;
};

export default AgentDashboardPage;

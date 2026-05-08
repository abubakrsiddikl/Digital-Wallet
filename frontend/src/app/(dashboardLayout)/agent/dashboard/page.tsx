import AgentDashboardContent from "@/components/modules/Agent/AgentDashboardContent";
import { getUserProfile } from "@/services/auth/auth.api";
import { getAgentDashboardStats } from "@/services/stats/stats.api";

const AgentDashboardPage = async () => {
  const [user, stats] = await Promise.all([
    getUserProfile(),
    getAgentDashboardStats(),
  ]);

  console.log(stats)

  return (
    <AgentDashboardContent
      initialUserInfo={user}
      initialStats={stats || {}}
    />
  );
};

export default AgentDashboardPage;

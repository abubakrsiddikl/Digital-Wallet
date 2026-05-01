import AgentDashboardContent from "@/components/modules/Agent/AgentDashboardContent";
import { getUserProfile } from "@/services/auth/auth.api";

const AgentDashboardPage = async () => {
  const [user] = await Promise.all([
    getUserProfile(),
    // getAgentDashboardStats(),
  ]);
  const stats = {
    totalCashIn: 125000,
    totalCashOut: 85000,
    todayCommission: 450.75,
    totalCommission: 12450.5,
    transactionCount: 142,
    recentTransactions: [
      {
        _id: "agt_tx_9901245a1",
        type: "CASH_IN",
        amount: 5000,
        commission: 25.0,
        userPhone: "01700112233",
        createdAt: "2026-05-01T11:45:00Z",
      },
      {
        _id: "agt_tx_9901245b2",
        type: "CASH_OUT",
        amount: 2000,
        commission: 10.0,
        userPhone: "01822334455",
        createdAt: "2026-05-01T10:30:15Z",
      },
      {
        _id: "agt_tx_9901245c3",
        type: "CASH_IN",
        amount: 10000,
        commission: 50.0,
        userPhone: "01933445566",
        createdAt: "2026-05-01T09:15:40Z",
      },
      {
        _id: "agt_tx_9901245d4",
        type: "CASH_OUT",
        amount: 1500,
        commission: 7.5,
        userPhone: "01644556677",
        createdAt: "2026-04-30T21:10:00Z",
      },
      {
        _id: "agt_tx_9901245e5",
        type: "CASH_IN",
        amount: 3000,
        commission: 15.0,
        userPhone: "01555667788",
        createdAt: "2026-04-30T18:20:12Z",
      },
    ],
  };

  return <AgentDashboardContent user={user} stats={stats || {}} />;
};

export default AgentDashboardPage;

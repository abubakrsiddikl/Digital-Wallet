import AgentCommissionView from "@/components/modules/Agent/Commission/AgentCommissionView";

const AgentCommissionPage = async () => {
  // const data = await getAgentCommission();
  const data = {
    todayTotal: 73.0,
    weekTotal: 450.5,
    monthTotal: 1850.0,
    allTimeTotal: 12400.0,
    cashInRate: 0.4,
    cashOutRate: 0.45,
    entries: [
      {
        _id: "com_001",
        type: "CASH_OUT",
        amount: 10000,
        commission: 45.0,
        userPhone: "01711223344",
        createdAt: "2026-05-01T10:15:00Z",
      },
      {
        _id: "com_002",
        type: "CASH_IN",
        amount: 5000,
        commission: 20.0,
        userPhone: "01822334455",
        createdAt: "2026-05-01T11:45:30Z",
      },
      {
        _id: "com_003",
        type: "CASH_IN",
        amount: 2000,
        commission: 8.0,
        userPhone: "01933445566",
        createdAt: "2026-05-01T14:20:10Z",
      },
      {
        _id: "com_004",
        type: "CASH_OUT",
        amount: 15000,
        commission: 67.5,
        userPhone: "01644556677",
        createdAt: "2026-04-30T09:00:00Z",
      },
      {
        _id: "com_005",
        type: "CASH_IN",
        amount: 1000,
        commission: 4.0,
        userPhone: "01555667788",
        createdAt: "2026-04-29T16:30:45Z",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Commission</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Track your earnings from every Cash In and Cash Out transaction.
        </p>
      </div>
      {/* <AgentCommissionView data={data} /> */}
    </div>
  );
};

export default AgentCommissionPage;

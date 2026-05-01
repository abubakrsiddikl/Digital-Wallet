import AgentTransactionList from "@/components/modules/Agent/Transaction/AgentTransactionList";

const AgentTransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; from?: string; to?: string }>;
}) => {
  const params = await searchParams;
  // const transactions = await getAgentTransactions(params);
  const transactions = [
    {
      _id: "ag_tr_77101a2b3c4d5e6f",
      type: "CASH_IN",
      amount: 5000,
      commission: 20,
      userPhone: "01700112233",
      status: "SUCCESS",
      createdAt: "2026-05-01T10:00:00Z",
    },
    {
      _id: "ag_tr_77102b3c4d5e6f7g",
      type: "CASH_OUT",
      amount: 10000,
      commission: 45,
      userPhone: "01811223344",
      status: "SUCCESS",
      createdAt: "2026-05-01T11:30:45Z",
    },
    {
      _id: "ag_tr_77103c4d5e6f7g8h",
      type: "CASH_IN",
      amount: 2000,
      commission: 8,
      userPhone: "01922334455",
      status: "PENDING",
      createdAt: "2026-05-01T14:15:20Z",
    },
    {
      _id: "ag_tr_77104d5e6f7g8h9i",
      type: "CASH_OUT",
      amount: 15000,
      commission: 67.5,
      userPhone: "01333445566",
      status: "FAILED",
      createdAt: "2026-04-30T16:20:00Z",
    },
    {
      _id: "ag_tr_77105e6f7g8h9i0j",
      type: "CASH_IN",
      amount: 500,
      commission: 2,
      userPhone: "01544556677",
      status: "SUCCESS",
      createdAt: "2026-04-30T19:40:10Z",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your complete Cash In / Cash Out history with commission details.
        </p>
      </div>
      {/* <AgentTransactionList transactions={transactions || []} /> */}
    </div>
  );
};

export default AgentTransactionsPage;

import StatementView from "@/components/modules/User/Statement/StatementView";

const UserStatementsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ month?: string; year?: string }>;
}) => {
  const params = await searchParams;
  const now = new Date();
  const month = params.month ?? String(now.getMonth() + 1).padStart(2, "0");
  const year = params.year ?? String(now.getFullYear());

  // const data = await getMyStatements({ month, year });
  const data = {
    totalIn: 15000.0,
    totalOut: 6550.5,
    openingBalance: 2000.0,
    closingBalance: 10449.5,
    transactionCount: 5,
    transactions: [
      {
        _id: "6632a1b2c3d4e5f6g7h8001",
        type: "ADD_MONEY",
        amount: 10000.0,
        createdAt: "2026-05-01T09:30:00Z",
        from: "Bank Account (DBBL)",
        to: "01711223344",
      },
      {
        _id: "6632a1b2c3d4e5f6g7h8002",
        type: "SEND",
        amount: 2500.0,
        createdAt: "2026-05-01T11:15:20Z",
        from: "01711223344",
        to: "01822334455",
      },
      {
        _id: "6632a1b2c3d4e5f6g7h8003",
        type: "RECEIVE",
        amount: 5000.0,
        createdAt: "2026-05-01T14:00:00Z",
        from: "01933445566",
        to: "01711223344",
      },
      {
        _id: "6632a1b2c3d4e5f6g7h8004",
        type: "CASH_OUT",
        amount: 4000.0,
        createdAt: "2026-05-01T17:45:10Z",
        from: "01711223344",
        to: "Agent (Moghbazar)",
      },
      {
        _id: "6632a1b2c3d4e5f6g7h8005",
        type: "RECHARGE",
        amount: 50.5,
        createdAt: "2026-05-01T20:10:00Z",
        from: "01711223344",
        to: "01711223344",
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Statements</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Monthly summary of your transactions and balance.
        </p>
      </div>
      <StatementView data={data} month={month} year={year} />
    </div>
  );
};

export default UserStatementsPage;

import TransactionList from "@/components/modules/User/Transaction/TransactionList";



const UserTransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; from?: string; to?: string; page?: string }>;
}) => {
  const params = await searchParams;
  // const transactions = await getMyTransactions(params);
  const transactions = [
  {
    "_id": "660a1b2c3d4e5f6g7h8i9j01",
    "type": "SEND",
    "amount": 1500,
    "fee": 5,
    "from": "01711223344",
    "to": "01822334455",
    "note": "Dinner bill split",
    "status": "SUCCESS",
    "createdAt": "2026-04-30T10:15:00Z"
  },
  {
    "_id": "660a1b2c3d4e5f6g7h8i9j02",
    "type": "RECEIVE",
    "amount": 2000,
    "from": "01933445566",
    "to": "01711223344",
    "note": "Gift from brother",
    "status": "SUCCESS",
    "createdAt": "2026-04-29T14:20:30Z"
  },
  {
    "_id": "660a1b2c3d4e5f6g7h8i9j03",
    "type": "CASH_OUT",
    "amount": 5000,
    "fee": 92.5,
    "from": "01711223344",
    "to": "01644556677",
    "note": "Agent withdrawal",
    "status": "PENDING",
    "createdAt": "2026-05-01T09:00:00Z"
  },
  {
    "_id": "660a1b2c3d4e5f6g7h8i9j04",
    "type": "ADD_MONEY",
    "amount": 10000,
    "fee": 0,
    "from": "Bank Account (DBBL)",
    "to": "01711223344",
    "note": "Salary add",
    "status": "SUCCESS",
    "createdAt": "2026-05-01T11:30:45Z"
  },
  {
    "_id": "660a1b2c3d4e5f6g7h8i9j05",
    "type": "RECHARGE",
    "amount": 599,
    "fee": 0,
    "from": "01711223344",
    "to": "01711223344",
    "note": "Monthly internet pack",
    "status": "FAILED",
    "createdAt": "2026-04-28T21:10:12Z"
  },
  {
    "_id": "660a1b2c3d4e5f6g7h8i9j06",
    "type": "CASH_IN",
    "amount": 3000,
    "fee": 0,
    "from": "01555667788",
    "to": "01711223344",
    "note": "Cash in from shop",
    "status": "SUCCESS",
    "createdAt": "2026-04-27T16:45:00Z"
  }
];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View and filter your complete transaction history.
        </p>
      </div>
      <TransactionList transactions={transactions ||[]} />
    </div>
  );
};

export default UserTransactionsPage;
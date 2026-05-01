import TransactionList from "@/components/modules/User/Transaction/TransactionList";
import { getMyTransactions } from "@/services/transaction/transaction.api";



const UserTransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; from?: string; to?: string; page?: string }>;
}) => {
  const params = await searchParams;
 
  
  const transactions = await getMyTransactions("type=CASH_OUT&limit=1");
 

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          View and filter your complete transaction history.
        </p>
      </div>
      <TransactionList transactions={transactions.data ||[]} />
    </div>
  );
};

export default UserTransactionsPage;
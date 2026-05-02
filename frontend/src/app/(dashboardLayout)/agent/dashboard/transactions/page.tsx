import AgentTransactionList from "@/components/modules/Agent/Transaction/AgentTransactionList";
import { queryStringFormatter } from "@/lib/formatter";
import { getMyTransactions } from "@/services/transaction/transaction.api";

const AgentTransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; from?: string; to?: string }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const transactions = await getMyTransactions(queryString);
  // console.log(transactions)
  

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Transactions</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Your complete Cash In / Cash Out history with commission details.
        </p>
      </div>
      <AgentTransactionList transactions={transactions.data || []} />
    </div>
  );
};

export default AgentTransactionsPage;

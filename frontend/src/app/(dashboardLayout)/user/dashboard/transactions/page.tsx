import TransactionList from "@/components/modules/User/Transaction/TransactionList";
import { queryStringFormatter } from "@/lib/formatter";
import { getMyTransactions } from "@/services/transaction/transaction.api";



const UserTransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
          View and filter your complete transaction history.
        </p>
      </div>
      <TransactionList transactions={transactions.data ||[]} />
    </div>
  );
};

export default UserTransactionsPage;
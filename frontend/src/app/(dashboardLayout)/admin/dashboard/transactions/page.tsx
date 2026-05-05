import AdminTransactionsContent from "@/components/modules/Admin/AdminTransaction/AdminTransactionContent";
import { queryStringFormatter } from "@/lib/formatter";
import { getAllTransactions } from "@/services/transaction/transaction.api";

const AdminTransactionsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;

  const queryString = queryStringFormatter(searchParamsObj);
  const data = await getAllTransactions(queryString);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          All Transactions
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          System-wide transaction history with full details.
        </p>
      </div>
      <AdminTransactionsContent transactions={data?.data ?? []} />
    </div>
  );
};

export default AdminTransactionsPage;

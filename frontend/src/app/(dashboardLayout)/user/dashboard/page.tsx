import UserDashboardContent from "@/components/modules/User/UserDashboardContent";
import { getUserProfile } from "@/services/auth/auth.api";
import { getMyTransactions } from "@/services/transaction/transaction.api";

const UserDashboardPage = async () => {
  const user = await getUserProfile();
  const transactions = await getMyTransactions("limit=4");

  return (
    <UserDashboardContent user={user} transactions={transactions.data || []} />
  );
};

export default UserDashboardPage;

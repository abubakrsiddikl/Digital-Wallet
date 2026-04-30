import UserDashboardContent from "@/components/modules/User/UserDashboardContent";
import { getUserProfile } from "@/services/auth/auth.api";


const UserDashboardPage = async () => {
  const user = await getUserProfile();

  return <UserDashboardContent user={user} />;
};

export default UserDashboardPage;
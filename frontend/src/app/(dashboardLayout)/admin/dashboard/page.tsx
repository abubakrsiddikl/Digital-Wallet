import AdminDashboardContent from "@/components/modules/Admin/AdminDashboardContent";
import { getUserProfile } from "@/services/auth/auth.api";
import { getAdminDashboardStats } from "@/services/stats/stats.api";

const AdminDashboardPage = async () => {
  const [user, adminStats] = await Promise.all([
    getUserProfile(),
    getAdminDashboardStats(),
  ]);

  return (
    <AdminDashboardContent initialStats={adminStats} initialUserInfo={user} />
  );
};

export default AdminDashboardPage;

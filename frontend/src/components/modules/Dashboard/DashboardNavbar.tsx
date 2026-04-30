

import { getUserProfile } from "@/services/auth/auth.api";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { getNavItemsByRole } from "@/lib/navItem.config";


const DashboardNavbar = async () => {
  const userInfo = await getUserProfile();
  const navItems = getNavItemsByRole(userInfo?.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo?.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;

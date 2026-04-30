
import { NavSection } from "@/types/dashboard.type";
import DashboardSidebarContent from "./DashboardSidebarContent";

import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { getNavItemsByRole } from "@/lib/navItem.config";
import { getUserProfile } from "@/services/auth/auth.api";

const DashboardSidebar = async () => {
  const userInfo = await getUserProfile();

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome as string}
    />
  );
};

export default DashboardSidebar;

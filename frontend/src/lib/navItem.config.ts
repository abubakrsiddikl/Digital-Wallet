import { TRole } from "@/types/auth.type";
import { NavSection } from "@/types/dashboard.type";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";

// ─── Common nav (all roles) ──────────────────────────────────
export const getCommonNavItems = (role: TRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard as string,
          icon: "LayoutDashboard",
          roles: ["ADMIN", "AGENT", "USER"],
        },
        {
          title: "My Profile",
          href: "/my-profile",
          icon: "UserCircle",
          roles: ["ADMIN", "AGENT", "USER"],
        },
        {
          title: "Home",
          href: "/",
          icon: "Home",
          roles: ["ADMIN", "AGENT", "USER"],
        },
      ],
    },
  ];
};

// ─── User nav ────────────────────────────────────────────────
export const userNavItems: NavSection[] = [
  {
    title: "Wallet",
    items: [
      {
        title: "Send Money",
        href: "/user/dashboard/send-money",
        icon: "Send",
        roles: ["USER"],
      },
      {
        title: "Cash Out",
        href: "/user/dashboard/cash-out",
        icon: "ArrowUpFromLine",
        roles: ["USER"],
      },
      {
        title: "Add Money",
        href: "/user/dashboard/add-money",
        icon: "PlusCircle",
        roles: ["USER"],
      },
      {
        title: "Mobile Recharge",
        href: "/user/dashboard/recharge",
        icon: "Smartphone",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "History",
    items: [
      {
        title: "Transactions",
        href: "/user/dashboard/transactions",
        icon: "ListOrdered",
        roles: ["USER"],
      },
      {
        title: "Statements",
        href: "/user/dashboard/statements",
        icon: "FileText",
        roles: ["USER"],
      },
    ],
  },
  {
    title: "Account Action",
    items: [
      {
        title: "Become an Agent",
        href: "/user/dashboard/apply-agent",
        icon: "UserPlus", 
        roles: ["USER"],
      },
    ],
  },
];

// ─── Agent nav ───────────────────────────────────────────────
export const agentNavItems: NavSection[] = [
  {
    title: "Operations",
    items: [
      {
        title: "Cash In",
        href: "/agent/dashboard/cash-in",
        icon: "ArrowDownToLine",
        roles: ["AGENT"],
      },
      {
        title: "Cash Out",
        href: "/agent/dashboard/cash-out",
        icon: "ArrowUpFromLine",
        roles: ["AGENT"],
      },
      {
        title: "Balance Request",
        href: "/agent/dashboard/balance-request",
        icon: "BadgeDollarSign",
        roles: ["AGENT"],
      },
    ],
  },
  {
    title: "Reports",
    items: [
      {
        title: "Transactions",
        href: "/agent/dashboard/transactions",
        icon: "ListOrdered",
        roles: ["AGENT"],
      },
      {
        title: "Commission",
        href: "/agent/dashboard/commission",
        icon: "Percent",
        roles: ["AGENT"],
      },
    ],
  },
];

// ─── Admin nav ───────────────────────────────────────────────
export const adminNavItems: NavSection[] = [
  {
    title: "Management",
    items: [
      {
        title: "All Users",
        href: "/admin/dashboard/users",
        icon: "Users",
        roles: ["ADMIN"],
      },
      {
        title: "All Agents",
        href: "/admin/dashboard/agents",
        icon: "UsersRound",
        roles: ["ADMIN"],
      },
      {
        title: "Agent Requests",
        href: "/admin/dashboard/agent-requests",
        icon: "ClipboardList",
        roles: ["ADMIN"],
        badge: "New",
      },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        title: "All Transactions",
        href: "/admin/dashboard/transactions",
        icon: "ArrowLeftRight",
        roles: ["ADMIN"],
      },
      {
        title: "Balance Overview",
        href: "/admin/dashboard/balance",
        icon: "Wallet",
        roles: ["ADMIN"],
      },
      {
        title: "Commission Settings",
        href: "/admin/dashboard/commission",
        icon: "Percent",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        title: "Settings",
        href: "/admin/dashboard/settings",
        icon: "Settings",
        roles: ["ADMIN"],
      },
      {
        title: "Audit Logs",
        href: "/admin/dashboard/logs",
        icon: "ScrollText",
        roles: ["ADMIN"],
      },
    ],
  },
];

// ─── Role-based nav resolver ─────────────────────────────────
export const getNavItemsByRole = (role: TRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "AGENT":
      return [...commonNavItems, ...agentNavItems];
    case "USER":
      return [...commonNavItems, ...userNavItems];
    default:
      return [];
  }
};
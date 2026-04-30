#!/usr/bin/env node

/**
 * Dashboard page generator script
 * Run: node generate-pages.mjs
 */

import fs from "fs";
import path from "path";

const routes = [
  // ─── User routes ─────────────────────────────────────────
  {
    path: "app/user/dashboard/page.tsx",
    componentName: "UserDashboardPage",
  },
  {
    path: "app/user/dashboard/send-money/page.tsx",
    componentName: "UserSendMoneyPage",
  },
  {
    path: "app/user/dashboard/cash-out/page.tsx",
    componentName: "UserCashOutPage",
  },
  {
    path: "app/user/dashboard/add-money/page.tsx",
    componentName: "UserAddMoneyPage",
  },
  {
    path: "app/user/dashboard/recharge/page.tsx",
    componentName: "UserMobileRechargePage",
  },
  {
    path: "app/user/dashboard/transactions/page.tsx",
    componentName: "UserTransactionsPage",
  },
  {
    path: "app/user/dashboard/statements/page.tsx",
    componentName: "UserStatementsPage",
  },

  // ─── Agent routes ─────────────────────────────────────────
  {
    path: "app/agent/dashboard/page.tsx",
    componentName: "AgentDashboardPage",
  },
  {
    path: "app/agent/dashboard/cash-in/page.tsx",
    componentName: "AgentCashInPage",
  },
  {
    path: "app/agent/dashboard/cash-out/page.tsx",
    componentName: "AgentCashOutPage",
  },
  {
    path: "app/agent/dashboard/balance-request/page.tsx",
    componentName: "AgentBalanceRequestPage",
  },
  {
    path: "app/agent/dashboard/transactions/page.tsx",
    componentName: "AgentTransactionsPage",
  },
  {
    path: "app/agent/dashboard/commission/page.tsx",
    componentName: "AgentCommissionPage",
  },

  // ─── Admin routes ─────────────────────────────────────────
  {
    path: "app/admin/dashboard/page.tsx",
    componentName: "AdminDashboardPage",
  },
  {
    path: "app/admin/dashboard/users/page.tsx",
    componentName: "AdminUsersPage",
  },
  {
    path: "app/admin/dashboard/agents/page.tsx",
    componentName: "AdminAgentsPage",
  },
  {
    path: "app/admin/dashboard/agent-requests/page.tsx",
    componentName: "AdminAgentRequestsPage",
  },
  {
    path: "app/admin/dashboard/transactions/page.tsx",
    componentName: "AdminTransactionsPage",
  },
  {
    path: "app/admin/dashboard/balance/page.tsx",
    componentName: "AdminBalanceOverviewPage",
  },
  {
    path: "app/admin/dashboard/commission/page.tsx",
    componentName: "AdminCommissionSettingsPage",
  },
  {
    path: "app/admin/dashboard/settings/page.tsx",
    componentName: "AdminSettingsPage",
  },
  {
    path: "app/admin/dashboard/logs/page.tsx",
    componentName: "AdminAuditLogsPage",
  },

  // ─── Shared routes ────────────────────────────────────────
  {
    path: "app/my-profile/page.tsx",
    componentName: "MyProfilePage",
  },
];

const generatePageContent = (componentName) => `const ${componentName} = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">${formatTitle(componentName)}</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Manage your ${formatTitle(componentName).toLowerCase()} here.
        </p>
      </div>

      <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground text-sm">
        {/* TODO: Add ${componentName} content */}
        <p>🚧 This page is under construction.</p>
      </div>
    </div>
  );
};

export default ${componentName};
`;

// "AdminCommissionSettingsPage" → "Admin Commission Settings"
function formatTitle(componentName) {
  return componentName
    .replace(/Page$/, "")
    .replace(/([A-Z])/g, " $1")
    .trim();
}

let created = 0;
let skipped = 0;

for (const route of routes) {
  const fullPath = path.resolve(process.cwd(), route.path);
  const dir = path.dirname(fullPath);

  // skip if already exists
  if (fs.existsSync(fullPath)) {
    console.log(`⏭  Skipped  ${route.path}`);
    skipped++;
    continue;
  }

  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, generatePageContent(route.componentName), "utf8");
  console.log(`✅ Created  ${route.path}`);
  created++;
}

console.log(`\n📦 Done — ${created} created, ${skipped} skipped.`);

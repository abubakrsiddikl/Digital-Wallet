# 📋 Development Roadmap — Takaa Digital Wallet

## ✅ Done
- [x] Auth (Login / Register)
- [x] Dashboard Layout (Sidebar, Topbar, Mobile nav)
- [x] Theme toggle (dark/light)
- [x] Role-based nav items
- [x] Public Navbar with balance pill
- [x] Page scaffolding (generate-pages.mjs)

---

## 🔢 Development Order

### PHASE 1 — User Features (সবার আগে)
> Core wallet actions। এগুলো ঠিক হলে বাকি সব test করা যাবে।

| # | Route | Page | কাজ |
|---|-------|------|-----|
| 1 | `/user/dashboard` | UserDashboardPage | Balance card, quick action buttons (Send, Cash Out, Add Money, Recharge) |
| 2 | `/user/dashboard/send-money` | UserSendMoneyPage | Phone number input, amount, PIN confirm — form + server action |
| 3 | `/user/dashboard/cash-out` | UserCashOutPage | Agent phone, amount, PIN — form + server action |
| 4 | `/user/dashboard/add-money` | UserAddMoneyPage | (Admin/Agent থেকে আসে, এই page এ request form রাখো) |
| 5 | `/user/dashboard/recharge` | UserMobileRechargePage | Operator select, number, amount |
| 6 | `/user/dashboard/transactions` | UserTransactionsPage | Transaction list, filter by type/date |
| 7 | `/user/dashboard/statements` | UserStatementsPage | Monthly statement view |

---

### PHASE 2 — Agent Features
> User এর Cash Out এর counterpart। Phase 1 শেষে করো।

| # | Route | Page | কাজ |
|---|-------|------|-----|
| 8 | `/agent/dashboard` | AgentDashboardPage | Balance card, daily transaction summary |
| 9 | `/agent/dashboard/cash-in` | AgentCashInPage | User phone, amount — agent gives cash, user balance বাড়ে |
| 10 | `/agent/dashboard/cash-out` | AgentCashOutPage | User phone, amount — user gives cash, agent balance বাড়ে |
| 11 | `/agent/dashboard/balance-request` | AgentBalanceRequestPage | Admin এর কাছে balance request form |
| 12 | `/agent/dashboard/transactions` | AgentTransactionsPage | Agent এর নিজের transaction history |
| 13 | `/agent/dashboard/commission` | AgentCommissionPage | Commission earned per transaction |

---

### PHASE 3 — Admin Features
> সব control এখানে। Phase 1 & 2 শেষে করো।

| # | Route | Page | কাজ |
|---|-------|------|-----|
| 14 | `/admin/dashboard` | AdminDashboardPage | System overview — total users, agents, transactions, volume |
| 15 | `/admin/dashboard/users` | AdminUsersPage | All users list, search, block/unblock |
| 16 | `/admin/dashboard/agents` | AdminAgentsPage | All agents list, approve/reject/block |
| 17 | `/admin/dashboard/agent-requests` | AdminAgentRequestsPage | ⚡ Balance requests from agents — approve দিলে agent balance বাড়ে |
| 18 | `/admin/dashboard/transactions` | AdminTransactionsPage | System-wide all transactions |
| 19 | `/admin/dashboard/balance` | AdminBalanceOverviewPage | Total money in system, per-user breakdown |
| 20 | `/admin/dashboard/commission` | AdminCommissionSettingsPage | Commission % set করা per transaction type |
| 21 | `/admin/dashboard/settings` | AdminSettingsPage | System settings |
| 22 | `/admin/dashboard/logs` | AdminAuditLogsPage | All system events log |

---

### PHASE 4 — Shared / Cross-cutting
| # | Route | কাজ |
|---|-------|-----|
| 23 | `/my-profile` | Profile view + edit, change PIN, change password |
| 24 | Socket integration | Real-time transaction notifications (topbar bell) |
| 25 | Notification system | Bell dropdown with unread count |

---

## 🧩 Per-page Component Pattern

প্রতিটা page এ এই structure follow করো:

```
app/user/dashboard/send-money/
├── page.tsx                  ← server component, data fetch
└── _components/
    ├── SendMoneyForm.tsx      ← "use client", form logic
    └── SendMoneyConfirm.tsx  ← PIN confirm modal
```

### Form page template (server action pattern):
```tsx
// page.tsx
import SendMoneyForm from "./_components/SendMoneyForm";

const UserSendMoneyPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Send Money</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Transfer money to any bKash user instantly.
        </p>
      </div>
      <SendMoneyForm />
    </div>
  );
};

export default UserSendMoneyPage;
```

```tsx
// _components/SendMoneyForm.tsx
"use client";
import { useActionState } from "react";
import { sendMoney } from "@/services/transaction/transaction.api"; // server action
import InputFieldError from "@/components/shared/InputFieldError";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SendMoneyForm = () => {
  const [state, formAction, isPending] = useActionState(sendMoney, null);

  return (
    <form action={formAction} className="max-w-md space-y-4">
      <Field>
        <FieldLabel>Recipient Phone</FieldLabel>
        <Input name="phone" placeholder="01XXXXXXXXX" />
        <InputFieldError field="phone" state={state} />
      </Field>

      <Field>
        <FieldLabel>Amount (৳)</FieldLabel>
        <Input name="amount" type="number" placeholder="0.00" />
        <InputFieldError field="amount" state={state} />
      </Field>

      <Field>
        <FieldLabel>PIN</FieldLabel>
        <Input name="pin" type="password" maxLength={5} placeholder="•••••" />
        <InputFieldError field="pin" state={state} />
      </Field>

      <Button type="submit" disabled={isPending} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
        {isPending ? "Processing..." : "Send Money"}
      </Button>
    </form>
  );
};

export default SendMoneyForm;
```

---

## 🔁 Transaction Flow (মাথায় রাখো)

```
User Send Money  →  recipient User balance +
                 →  sender User balance -
                 →  transaction record created

User Cash Out    →  User balance -
                 →  Agent balance +
                 →  commission calculated → Agent earns

Agent Cash In    →  User balance +
                 →  Agent balance -

Agent Balance Req→  Admin approves
                 →  Agent balance +
                 →  System total tracked
```

---

## ⚡ Next immediate task
**Start here → `/user/dashboard` page (Phase 1, #1)**
Balance card + 4 quick action buttons (Send, Cash Out, Add Money, Recharge)

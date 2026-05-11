# 🖥️ Takaa Frontend

Next.js 15 (App Router) frontend for the Takaa digital wallet platform.

**Live:** https://digital-wallet-frontend-iwlo.onrender.com

---

## 🏗️ Project Structure

```
frontend/
└── src/
    ├── app/                          # Next.js App Router pages
    │   ├── (public)/                 # Public landing pages
    │   │   ├── page.tsx              # Home /
    │   │   ├── features/page.tsx     # /features
    │   │   ├── about/page.tsx        # /about
    │   │   └── contact/page.tsx      # /contact
    │   ├── (auth)/                   # Auth pages (no layout)
    │   │   ├── login/page.tsx
    │   │   └── register/page.tsx
    │   ├── user/
    │   │   └── dashboard/
    │   │       ├── page.tsx          # Balance card + quick actions
    │   │       ├── send-money/page.tsx
    │   │       ├── cash-out/page.tsx
    │   │       ├── add-money/page.tsx
    │   │       ├── recharge/page.tsx
    │   │       ├── transactions/page.tsx
    │   │       └── statements/page.tsx
    │   ├── agent/
    │   │   └── dashboard/
    │   │       ├── page.tsx          # Agent balance + stats
    │   │       ├── cash-in/page.tsx
    │   │       ├── cash-out/page.tsx
    │   │       ├── balance-request/page.tsx
    │   │       ├── transactions/page.tsx
    │   │       └── commission/page.tsx
    │   ├── admin/
    │   │   └── dashboard/
    │   │       ├── page.tsx          # System overview
    │   │       ├── users/page.tsx
    │   │       ├── agents/page.tsx
    │   │       ├── agent-requests/page.tsx
    │   │       ├── transactions/page.tsx
    │   │       ├── balance/page.tsx
    │   │       ├── commission/page.tsx
    │   │       ├── settings/page.tsx
    │   │       └── logs/page.tsx
    │   └── my-profile/page.tsx
    │
    ├── components/
    │   ├── layout/                   # Navbar, Footer
    │   ├── dashboard/
    │   │   ├── layout/               # DashboardLayout, Sidebar, Topbar
    │   │   │   ├── DashboardLayout.tsx
    │   │   │   ├── Sidebar.tsx           # Desktop sidebar
    │   │   │   ├── Topbar.tsx            # Desktop topbar
    │   │   │   ├── MobileHeader.tsx      # Mobile top header
    │   │   │   ├── MobileBottomNav.tsx   # Mobile bottom nav
    │   │   │   └── MobileSideDrawer.tsx  # Slide-in drawer
    │   │   ├── sidebar/
    │   │   │   ├── SidebarNav.tsx
    │   │   │   ├── SidebarLogo.tsx
    │   │   │   └── SidebarUserCard.tsx
    │   │   └── topbar/
    │   │       ├── TopbarSearch.tsx
    │   │       ├── TopbarActions.tsx
    │   │       ├── UserDropdown.tsx      # Avatar + theme + logout
    │   │       ├── ThemeToggle.tsx       # Dark/light toggle
    │   │       └── SocketStatus.tsx      # Live connection badge
    │   ├── modules/
    │   │   ├── User/
    │   │   │   ├── Dashboard/            # UserDashboardClient
    │   │   │   ├── SendMoney/            # SendMoneyForm
    │   │   │   ├── CashOut/              # CashOutForm
    │   │   │   ├── AddMoney/             # AddMoneyForm
    │   │   │   ├── Recharge/             # MobileRechargeForm
    │   │   │   ├── Transactions/         # TransactionList
    │   │   │   └── Statements/           # StatementView
    │   │   ├── Agent/
    │   │   │   ├── Dashboard/            # AgentDashboardContent
    │   │   │   ├── CashIn/               # AgentCashInForm
    │   │   │   ├── CashOut/              # AgentCashOutForm
    │   │   │   ├── BalanceRequest/       # BalanceRequestForm
    │   │   │   ├── Transactions/         # AgentTransactionList
    │   │   │   ├── Commission/           # AgentCommissionView
    │   │   │   └── AgentApply/           # AgentApplyForm + status
    │   │   └── Admin/
    │   │       ├── Dashboard/            # AdminDashboardContent
    │   │       ├── Users/                # AdminUsersContent
    │   │       ├── Agents/               # AdminAgentsContent
    │   │       ├── AgentRequests/        # AdminApplicationsContent
    │   │       ├── Transactions/         # AdminTransactionsContent
    │   │       ├── Balance/              # AdminBalanceContent
    │   │       ├── Commission/           # AdminCommissionContent
    │   │       ├── Settings/             # AdminSettingsContent
    │   │       └── Logs/                 # AdminLogsContent
    │   ├── shared/
    │   │   ├── InputFieldError.tsx       # Zod field errors
    │   │   └── AppPagination.tsx         # Reusable pagination
    │   └── ui/                           # shadcn/ui components
    │
    ├── services/                         # Server actions + API calls
    │   ├── auth/
    │   │   └── auth.api.ts               # login, logout, getUserProfile
    │   ├── transaction/
    │   │   └── transaction.api.ts        # sendMoney, cashOut, cashIn, getMyTransactions
    │   ├── agentApplication/
    │   │   ├── agentApplication.api.ts   # applyAsAgent, requestBalance, getMyApplicationStatus
    │   │   └── agentApplication.admin.api.ts  # approveApplication, approveBalanceRequest
    │   └── stats/
    │       └── stats.api.ts              # getAdminDashboardStats, getAgentDashboardStats
    │
    ├── hooks/
    │   └── useSocket.ts                  # Socket.io client hook
    │
    ├── lib/
    │   ├── apiRequest.ts                 # Base fetch wrapper
    │   ├── icon-mapper.ts                # Lucide icon by name
    │   └── utils.ts                      # cn() and helpers
    │
    ├── types/
    │   ├── auth.type.ts                  # IUser, TRole, IWallet
    │   ├── transaction.type.ts           # ITransaction, TransactionType
    │   ├── agentApplication.type.ts      # IAgentApplication, IBalanceRequest
    │   ├── stats.type.ts                 # IAdminStats, IAgentStats
    │   ├── dashboard.type.ts             # NavSection, NavItem
    │   └── response.type.ts              # IResponse<T>
    │
    ├── config/
    │   └── navItems.ts                   # Role-based nav config
    │
    └── utils/
        └── auth-utils.ts                 # getDefaultDashboardRoute
```

---

## ⚙️ Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=https://digital-wallet-server-1rrq.onrender.com/api/v1
NEXT_PUBLIC_SOCKET_URL=https://digital-wallet-server-1rrq.onrender.com
```

---

## 🧭 Route Map

### Public
| Route | Page |
|-------|------|
| `/` | Home |
| `/features` | Feature showcase |
| `/about` | About Takaa |
| `/contact` | Contact + message form |
| `/login` | Login |
| `/register` | Register |

### User Dashboard
| Route | Page |
|-------|------|
| `/user/dashboard` | Balance card + quick actions |
| `/user/dashboard/send-money` | Send money form |
| `/user/dashboard/cash-out` | Cash out form |
| `/user/dashboard/add-money` | Add money |
| `/user/dashboard/recharge` | Mobile recharge |
| `/user/dashboard/transactions` | Transaction history |
| `/user/dashboard/statements` | Monthly statements |

### Agent Dashboard
| Route | Page |
|-------|------|
| `/agent/dashboard` | Balance + today's stats |
| `/agent/dashboard/cash-in` | Cash in form |
| `/agent/dashboard/cash-out` | Cash out form |
| `/agent/dashboard/balance-request` | Request balance |
| `/agent/dashboard/transactions` | Transaction history |
| `/agent/dashboard/commission` | Commission history |

### Admin Dashboard
| Route | Page |
|-------|------|
| `/admin/dashboard` | System overview |
| `/admin/dashboard/users` | All users + block/role |
| `/admin/dashboard/agents` | All agents + approve |
| `/admin/dashboard/agent-requests` | Applications + balance requests |
| `/admin/dashboard/transactions` | All transactions |
| `/admin/dashboard/balance` | Wallet breakdown |
| `/admin/dashboard/commission` | Commission settings |
| `/admin/dashboard/settings` | System settings |
| `/admin/dashboard/logs` | Audit logs |

### Shared
| Route | Page |
|-------|------|
| `/my-profile` | Profile view + edit |

---

## 🎨 Tech Stack

| Tool | Purpose |
|------|---------|
| Next.js 15 (App Router) | Framework |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| Lucide React | Icons |
| next-themes | Dark/light mode |
| Sonner | Toast notifications |
| Zod | Form validation |
| Socket.io Client | Real-time events |
| React `useActionState` | Server action forms |

---

## 🔌 Socket.io Integration

```typescript
// hooks/useSocket.ts
import { useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_EVENTS } from "@/lib/socketEvents";

let socket: Socket;

export const useSocket = () => {
  useEffect(() => {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      withCredentials: true,
    });

    socket.on(SOCKET_EVENTS.TRANSACTION_SUCCESS, (data) => {
      // toast notification + balance update
    });

    socket.on(SOCKET_EVENTS.BALANCE_UPDATED, (data) => {
      // refresh balance display
    });

    return () => { socket.disconnect(); };
  }, []);
};
```

---

## 📝 Form Pattern

All forms use `useActionState` with Zod validation:

```tsx
const [state, formAction, isPending] = useActionState(serverAction, null);

useEffect(() => {
  if (!state) return;
  if (!state.success && state.message) toast.error(state.message);
  if (state.success) toast.success(state.message);
}, [state]);

return (
  <form action={formAction}>
    <Input name="phone" />
    <InputFieldError field="phone" state={state} />
    <Button type="submit" disabled={isPending}>Submit</Button>
  </form>
);
```

---

## 🚀 Setup & Run

```bash
cd frontend
npm install
cp .env.example .env.local
# fill in env values
npm run dev
```

---

## 🔮 Upcoming

- [ ] Email verification on register
- [ ] Forgot password flow (email link)
- [ ] Push notifications via Socket
- [ ] My profile — edit + change PIN
- [ ] Docker deployment
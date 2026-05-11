# 🔌 Takaa Backend

Express.js + Prisma + PostgreSQL + Socket.io REST API for the Takaa digital wallet platform.

**Live API:** https://digital-wallet-server-1rrq.onrender.com

---

## 🏗️ Architecture

```
backend/
├── src/
│   ├── app/
│   │   ├── config/               # env config, db config
│   │   ├── middleware/           # checkAuth, validateRequest, globalError
│   │   └── module/               # feature modules (MVC)
│   │       ├── auth/
│   │       │   ├── auth.controller.ts
│   │       │   ├── auth.service.ts
│   │       │   ├── auth.route.ts
│   │       │   └── auth.validation.ts
│   │       ├── user/
│   │       ├── transaction/
│   │       ├── wallet/
│   │       ├── agentApplication/
│   │       └── stats/
│   ├── helpers/                  # paginationHelper, etc.
│   ├── interface/                # shared TypeScript interfaces
│   ├── errors/                   # AppError, custom error classes
│   └── shared/                   # prisma client, catchAsync, sendResponse, pick
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── package.json
└── tsconfig.json
```

### Module structure (MVC)

Every module follows this pattern:

```
module/
└── feature/
    ├── feature.controller.ts   ← req/res, calls service
    ├── feature.service.ts      ← business logic, prisma queries
    ├── feature.route.ts        ← express router + auth guards
    └── feature.validation.ts   ← zod schemas for req.body
```

---

## ⚙️ Environment Variables

```env
# .env
NODE_ENV=development
PORT=5000

DATABASE_URL=postgresql://user:password@localhost:5432/takaa_db

JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:3000
```

---

## 🗃️ Database Schema

### Models

| Model | Description |
|-------|-------------|
| `User` | All users — role: USER / AGENT / ADMIN |
| `Wallet` | One per user — type: USER / AGENT / SYSTEM |
| `Transaction` | Every money movement |
| `AgentApplication` | Become-agent requests |
| `BalanceRequest` | Agent top-up requests to admin |

### Enums

```prisma
enum UserRole     { ADMIN  AGENT  USER }
enum UserStatus   { ACTIVE INACTIVE BLOCKED }
enum WalletType   { USER   AGENT   SYSTEM }
enum TransactionType { SEND_MONEY CASH_IN CASH_OUT PAYMENT ADD_MONEY RECHARGE }
enum TransactionStatus { PENDING SUCCESS FAILED REVERSED }
enum ApplicationStatus { PENDING APPROVED REJECTED }
enum RequestStatus     { PENDING APPROVED REJECTED }
```

---

## 🔌 API Reference

### Auth — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/login` | ❌ | Login, returns JWT cookie |

### Users — `/api/v1/users`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/me` | ✅ Any | Get own profile |
| GET | `/` | ADMIN | Get all users (paginated) |
| PATCH | `/:id/toggle-block` | ADMIN | Block or unblock user |
| PATCH | `/:id/role` | ADMIN | Change user role |

### Transactions — `/api/v1/transaction`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/send-money` | USER | User → User transfer |
| POST | `/cash-in` | AGENT | Agent adds money to user |
| POST | `/cash-out` | USER | User withdraws via agent |
| GET | `/my-transactions` | Any | Own transaction history |
| GET | `/` | ADMIN | All system transactions |

### Wallet — `/api/v1/wallet`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/my-wallet` | Any | Own wallet details |
| GET | `/system-wallet` | ADMIN | System wallet balance |
| GET | `/:userId` | ADMIN | Wallet by user ID |
| PATCH | `/:userId/toggle-block` | ADMIN | Block/unblock wallet |

### Agent — `/api/v1/agent`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/apply` | USER | Apply to become agent |
| GET | `/apply/status` | USER/AGENT | My application status |
| POST | `/balance-request` | AGENT | Request balance top-up |
| GET | `/admin/applications` | ADMIN | All agent applications |
| PATCH | `/admin/applications/:id/approve` | ADMIN | Approve or reject application |
| GET | `/admin/balance-requests` | ADMIN | All balance requests |
| PATCH | `/admin/balance-requests/:id/approve` | ADMIN | Approve or reject request |

### Stats — `/api/v1/stats`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/agent-stats` | AGENT | Agent dashboard stats |
| GET | `/admin` | ADMIN | Admin dashboard overview |
| GET | `/system` | ADMIN | System-wide stats |

---

## ⚡ Socket.io Events

### Connection
```javascript
// Client connects with JWT
const socket = io(SERVER_URL, {
  withCredentials: true, // sends cookie
});
```

### Events emitted by server

| Event | Payload | Who receives |
|-------|---------|-------------|
| `transaction:success` | `ITransactionSuccessPayload` | Sender + Receiver |
| `balance:updated` | `IBalanceUpdatedPayload` | Affected user |
| `application:status_changed` | `IApplicationStatusPayload` | Applicant |
| `balance_request:status` | `IBalanceRequestStatusPayload` | Agent |
| `admin:new_agent_application` | `IAdminNewApplicationPayload` | Admin room |
| `admin:new_balance_request` | `IAdminNewBalanceRequestPayload` | Admin room |
| `admin:new_transaction` | `IAdminNewTransactionPayload` | Admin room |

### Socket rooms
```
user:{userId}       ← personal room
admin               ← all admins
```

---

## 💸 Business Rules

### Fees & Commission

| Transaction | Fee | Agent Commission | System Commission |
|-------------|-----|-----------------|-------------------|
| Send Money | 1.5% | 0% | 1.5% |
| Cash Out | 1.85% | 1.85% | 0% |
| Cash In | 0% | 1% | 0% |

### Transaction Flow

```
Send Money:
  sender.balance -= (amount + fee)
  receiver.balance += amount
  system.balance += fee

Cash Out:
  user.balance -= (amount + fee)
  agent.balance += amount
  agent earns commission from fee

Cash In:
  agent.balance -= amount
  user.balance += amount
  agent earns commission
```

### Agent Onboarding
```
User applies → PENDING
Admin reviews → APPROVE: role = AGENT, isApproved = true, wallet.type = AGENT
             → REJECT: stays USER, can re-apply
```

### Balance Request
```
Agent requests → PENDING
Admin approves → agent.wallet.balance += amount (prisma.$transaction)
              → REJECT: no balance change
```

---

## 🚀 Setup & Run

```bash
# Install
npm install

# Database
cp .env.example .env
npx prisma migrate dev --name init
npx prisma generate

# Development
npm run dev

# Production
npm run build
npm start
```

---

## 🔮 Upcoming

- [ ] Email verification (Nodemailer / Resend)
- [ ] Forgot password + reset link
- [ ] Docker + docker-compose
- [ ] AWS EC2 deployment
- [ ] Rate limiting per user
- [ ] Refresh token rotation
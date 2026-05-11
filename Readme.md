# 💚 Takaa — Digital Wallet Platform

<div align="center">

![Takaa Banner](https://img.shields.io/badge/Takaa-Digital%20Wallet-0F6E56?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+PHJlY3Qgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIiByeD0iMTAiIGZpbGw9IiMwRjZFNTYiLz48cGF0aCBkPSJNOCAxMGgxNk0xNiAxMHYxMk0xMCAyMmgxMiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjIuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9zdmc+)

[![Frontend](https://img.shields.io/badge/Frontend-Next.js%2015-black?style=flat-square&logo=nextdotjs)](https://digital-wallet-frontend-iwlo.onrender.com)
[![Backend](https://img.shields.io/badge/Backend-Express%20%2B%20Prisma-blue?style=flat-square&logo=express)](https://digital-wallet-server-1rrq.onrender.com)
[![Database](https://img.shields.io/badge/Database-PostgreSQL-336791?style=flat-square&logo=postgresql)](https://www.postgresql.org)
[![Socket.io](https://img.shields.io/badge/Realtime-Socket.io-010101?style=flat-square&logo=socketdotio)](https://socket.io)

**A production-grade digital wallet system built for Bangladesh.**
Send money, cash in/out, mobile recharge, agent network — all in one place.

[🌐 Live Frontend](https://digital-wallet-frontend-iwlo.onrender.com) · [🔌 Live API](https://digital-wallet-server-1rrq.onrender.com) · [👨‍💻 Developer Portfolio](https://abubakrsiddik-portfolio.vercel.app)

</div>

---

## 📦 Monorepo Structure

```
takaa/
├── frontend/          # Next.js 15 — App Router
├── backend/           # Express + Prisma + Socket.io
├── README.md          # ← you are here
└── .gitignore
```

---

## ✨ Features

### 👤 User
| Feature | Description |
|---------|-------------|
| Send Money | User → User transfer with 1.5% fee |
| Cash Out | User → Agent withdrawal with 1.85% fee |
| Add Money | Top up wallet via agent |
| Mobile Recharge | GP, Robi, Banglalink, Teletalk, Airtel |
| Transaction History | Filter by type, date range |
| Monthly Statements | PDF export ready |

### 🏪 Agent
| Feature | Description |
|---------|-------------|
| Cash In | Add money to user wallet |
| Cash Out | Withdraw money from user wallet |
| Balance Request | Request top-up from admin |
| Commission Tracking | Per-transaction commission history |

### 🔐 Admin
| Feature | Description |
|---------|-------------|
| User Management | Block / unblock / change role |
| Agent Management | Approve / reject / block agents |
| Agent Applications | Review become-agent requests |
| Balance Requests | Approve / reject agent top-ups |
| System Transactions | Full transaction history |
| Balance Overview | System-wide wallet breakdown |
| Commission Settings | Set % per transaction type |
| Audit Logs | All system events |

### ⚡ Real-time (Socket.io)
| Event | Who receives |
|-------|-------------|
| `transaction:success` | Sender + Receiver |
| `balance:updated` | Affected user/agent |
| `application:status_changed` | Applicant |
| `balance_request:status` | Agent |
| `admin:new_agent_application` | Admin |
| `admin:new_balance_request` | Admin |
| `admin:new_transaction` | Admin |

---

## 🚀 Quick Start

### Prerequisites
- Node.js ≥ 18
- PostgreSQL
- pnpm / npm

### 1. Clone
```bash
git clone https://github.com/your-username/takaa.git
cd takaa
```

### 2. Setup Backend
```bash
cd backend
cp .env.example .env
# Fill in .env values
npm install
npx prisma migrate dev
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
cp .env.example .env.local
# Fill in .env.local values
npm install
npm run dev
```

---

## 🌐 Live Links

| Service | URL |
|---------|-----|
| Frontend | https://digital-wallet-frontend-iwlo.onrender.com |
| Backend API | https://digital-wallet-server-1rrq.onrender.com |
| API Base | `https://digital-wallet-server-1rrq.onrender.com/api/v1` |

---

## 🗺️ API Base Routes

| Prefix | Module |
|--------|--------|
| `/api/v1/auth` | Authentication |
| `/api/v1/users` | User management |
| `/api/v1/transaction` | All transactions |
| `/api/v1/wallet` | Wallet operations |
| `/api/v1/agent` | Agent apply + balance requests |
| `/api/v1/stats` | Dashboard statistics |

---

## 🔮 Upcoming Features

- [ ] Email verification on register
- [ ] Forgot password + reset via email
- [ ] AWS EC2 deployment
- [ ] Docker + docker-compose
- [ ] Push notifications
- [ ] Payment gateway integration

---

## 👨‍💻 Developer

**Abu Bakr Siddik**
- 🌐 Portfolio: [abubakrsiddik-portfolio.vercel.app](https://abubakrsiddik-portfolio.vercel.app)
- 📧 Email: abubakrsiddik.dev@gmail.com
- 💬 WhatsApp: [+8801936582963](https://wa.me/8801936582963)

---

## 📄 License

MIT © 2026 Abu Bakr Siddik
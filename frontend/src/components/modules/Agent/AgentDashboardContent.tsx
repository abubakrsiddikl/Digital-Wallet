"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Eye, EyeOff, ArrowDownToLine, ArrowUpFromLine,
  BadgeDollarSign, TrendingUp, TrendingDown,
  ArrowLeftRight, Clock, Percent,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IUser } from "@/types/auth.type";

interface AgentStats {
  totalCashIn: number;
  totalCashOut: number;
  todayCommission: number;
  totalCommission: number;
  transactionCount: number;
  recentTransactions: {
    _id: string;
    type: "CASH_IN" | "CASH_OUT";
    amount: number;
    commission: number;
    userPhone: string;
    createdAt: string;
  }[];
}

interface AgentDashboardClientProps {
  user: IUser;
  stats: AgentStats;
}

// ─── Quick actions ────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: "Cash In",        href: "/agent/dashboard/cash-in",        icon: ArrowDownToLine, color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400", border: "border-emerald-200 dark:border-emerald-800" },
  { label: "Cash Out",       href: "/agent/dashboard/cash-out",       icon: ArrowUpFromLine, color: "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",   border: "border-orange-200 dark:border-orange-800"   },
  { label: "Balance Req",    href: "/agent/dashboard/balance-request", icon: BadgeDollarSign, color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",           border: "border-blue-200 dark:border-blue-800"       },
  { label: "Commission",     href: "/agent/dashboard/commission",      icon: Percent,         color: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",   border: "border-purple-200 dark:border-purple-800"   },
];

// ─── Balance card ─────────────────────────────────────────────
const AgentBalanceCard = ({ user }: { user: IUser }) => {
  const [show, setShow] = useState(false);
  const balance = user?.wallet?.balance ?? 0;

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-xl shadow-blue-900/20">
      <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-white/5" />

      <CardContent className="relative p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-blue-200 text-xs font-medium uppercase tracking-wider mb-1">Agent Balance</p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold tracking-tight">
                {show ? `৳ ${balance.toLocaleString("en-BD")}` : "৳ ••••••"}
              </span>
              <button
                onClick={() => setShow(!show)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Badge className="bg-white/15 text-white border-0 text-xs hover:bg-white/15">Agent</Badge>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-blue-200 text-xs">{user?.phone ?? user?.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ─── Stats row ────────────────────────────────────────────────
const StatsRow = ({ stats }: { stats: AgentStats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {[
      { label: "Today Cash In",   value: stats.totalCashIn,      icon: ArrowDownToLine, color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", prefix: "৳" },
      { label: "Today Cash Out",  value: stats.totalCashOut,     icon: ArrowUpFromLine, color: "text-orange-500",                         bg: "bg-orange-50 dark:bg-orange-950/30",   prefix: "৳" },
      { label: "Today Commission",value: stats.todayCommission,  icon: TrendingUp,      color: "text-purple-600 dark:text-purple-400",    bg: "bg-purple-50 dark:bg-purple-950/30",   prefix: "৳" },
      { label: "Total Txns",      value: stats.transactionCount, icon: ArrowLeftRight,  color: "text-blue-600 dark:text-blue-400",        bg: "bg-blue-50 dark:bg-blue-950/30",       prefix: ""  },
    ].map((item) => {
      const Icon = item.icon;
      return (
        <Card key={item.label}>
          <CardContent className="p-4">
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-3 ${item.bg}`}>
              <Icon className={`h-4 w-4 ${item.color}`} />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className={`text-xl font-bold tabular-nums ${item.color}`}>
              {item.prefix}{item.value.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

// ─── Recent transactions ──────────────────────────────────────
const RecentTransactions = ({ transactions }: { transactions: AgentStats["recentTransactions"] }) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <Link href="/agent/dashboard/transactions" className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline flex items-center gap-1">
          See all <ArrowLeftRight className="h-3 w-3" />
        </Link>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      <div className="space-y-1">
        {transactions.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">No transactions today</p>
        )}
        {transactions.map((tx, idx) => (
          <div key={tx._id}>
            <div className="flex items-center gap-3 py-2.5">
              <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                tx.type === "CASH_IN"
                  ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-orange-50 dark:bg-orange-950/30 text-orange-500"
              }`}>
                {tx.type === "CASH_IN" ? <ArrowDownToLine className="h-4 w-4" /> : <ArrowUpFromLine className="h-4 w-4" />}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium">{tx.type === "CASH_IN" ? "Cash In" : "Cash Out"}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {tx.userPhone} · {new Date(tx.createdAt).toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className={`text-sm font-semibold tabular-nums ${tx.type === "CASH_IN" ? "text-emerald-600 dark:text-emerald-400" : "text-orange-500"}`}>
                  ৳{tx.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-purple-500 tabular-nums">+৳{tx.commission} comm</p>
              </div>
            </div>
            {idx < transactions.length - 1 && <Separator />}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// ─── Main ─────────────────────────────────────────────────────
const AgentDashboardContent = ({ user, stats }: AgentDashboardClientProps) => (
  <div className="space-y-5 max-w-2xl mx-auto md:max-w-none">
    <AgentBalanceCard user={user} />
    <div className="grid grid-cols-4 gap-3">
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link key={action.href} href={action.href}
            className={`flex flex-col items-center gap-2.5 rounded-2xl border p-3 md:p-4 transition-all hover:scale-105 hover:shadow-md active:scale-95 ${action.border}`}
          >
            <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${action.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-center leading-tight text-foreground">{action.label}</span>
          </Link>
        );
      })}
    </div>
    <StatsRow stats={stats} />
    <RecentTransactions transactions={stats.recentTransactions} />
  </div>
);

export default AgentDashboardContent;
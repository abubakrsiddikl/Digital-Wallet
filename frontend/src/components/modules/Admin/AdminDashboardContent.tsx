"use client";

import Link from "next/link";
import {
  Users, UserCheck, ArrowLeftRight, Wallet,
  TrendingUp, TrendingDown, ClipboardList,
  ScrollText, Settings, ArrowDownToLine,
  ArrowUpFromLine, Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { IUser } from "@/types/auth.type";
import { ITransaction, TransactionType } from "@/types/transaction.type";

interface IAdminStats {
  totalUsers: number;
  totalAgents: number;
  totalTransactions: number;
  totalVolume: number;
  totalSystemCommission: number;
  pendingAgentRequests: number;
  recentTransactions: ITransaction[];
}

interface AdminDashboardContentProps {
  user: IUser;
  stats?: IAdminStats;
}

// ─── Quick links ──────────────────────────────────────────────
const QUICK_LINKS = [
  { label: "Users",          href: "/admin/dashboard/users",           icon: Users,          color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",           border: "border-blue-200 dark:border-blue-800" },
  { label: "Agents",         href: "/admin/dashboard/agents",          icon: UserCheck,      color: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",border: "border-emerald-200 dark:border-emerald-800" },
  { label: "Requests",       href: "/admin/dashboard/agent-requests",  icon: ClipboardList,  color: "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",   border: "border-orange-200 dark:border-orange-800" },
  { label: "Transactions",   href: "/admin/dashboard/transactions",    icon: ArrowLeftRight, color: "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",   border: "border-purple-200 dark:border-purple-800" },
  { label: "Balance",        href: "/admin/dashboard/balance",         icon: Wallet,         color: "bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400",           border: "border-teal-200 dark:border-teal-800" },
  { label: "Commission",     href: "/admin/dashboard/commission",      icon: TrendingUp,     color: "bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400",   border: "border-yellow-200 dark:border-yellow-800" },
  { label: "Settings",       href: "/admin/dashboard/settings",        icon: Settings,       color: "bg-slate-50 dark:bg-slate-950/40 text-slate-600 dark:text-slate-400",       border: "border-slate-200 dark:border-slate-800" },
  { label: "Audit Logs",     href: "/admin/dashboard/logs",            icon: ScrollText,     color: "bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400",           border: "border-rose-200 dark:border-rose-800" },
];

const TX_TYPE_CONFIG: Record<TransactionType, { label: string; color: string }> = {
  SEND_MONEY: { label: "Send Money", color: "text-red-500" },
  CASH_OUT:   { label: "Cash Out",   color: "text-orange-500" },
  CASH_IN:    { label: "Cash In",    color: "text-emerald-600 dark:text-emerald-400" },
  RECHARGE:   { label: "Recharge",   color: "text-purple-500" },
  ADD_MONEY:  { label: "Add Money",  color: "text-blue-500" },
};

// ─── Overview stats ───────────────────────────────────────────
const OverviewStats = ({ stats }: { stats: IAdminStats }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 ">
    {[
      { label: "Total Users",       value: stats.totalUsers,            icon: Users,          color: "text-blue-600 dark:text-blue-400",    bg: "bg-blue-50 dark:bg-blue-950/30",    prefix: "", format: false },
      { label: "Total Agents",      value: stats.totalAgents,           icon: UserCheck,      color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", prefix: "", format: false },
      { label: "Pending Requests",  value: stats.pendingAgentRequests,  icon: ClipboardList,  color: "text-orange-500",                     bg: "bg-orange-50 dark:bg-orange-950/30",  prefix: "", format: false },
      { label: "Total Volume",      value: stats.totalVolume,           icon: ArrowLeftRight, color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-950/30", prefix: "৳", format: true  },
      { label: "System Commission", value: stats.totalSystemCommission, icon: TrendingUp,     color: "text-yellow-600 dark:text-yellow-400", bg: "bg-yellow-50 dark:bg-yellow-950/30", prefix: "৳", format: true  },
      { label: "Total Transactions",value: stats.totalTransactions,     icon: ScrollText,     color: "text-teal-600 dark:text-teal-400",    bg: "bg-teal-50 dark:bg-teal-950/30",    prefix: "", format: false },
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
              {item.prefix}{item.format ? Number(item.value).toLocaleString() : item.value}
            </p>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

// ─── Recent transactions ──────────────────────────────────────
const RecentTransactions = ({ transactions }: { transactions: ITransaction[] }) => (
  <Card>
    <CardHeader className="pb-3">
      <div className="flex items-center justify-between">
        <CardTitle className="text-base font-semibold">Recent Transactions</CardTitle>
        <Link href="/admin/dashboard/transactions" className="text-xs text-purple-600 dark:text-purple-400 font-medium hover:underline flex items-center gap-1">
          See all <ArrowLeftRight className="h-3 w-3" />
        </Link>
      </div>
    </CardHeader>
    <CardContent className="pt-0">
      {transactions.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No transactions yet</p>
      ) : (
        <div className="space-y-1">
          {transactions.map((tx, idx) => {
            const config = TX_TYPE_CONFIG[tx.type] ?? { label: tx.type, color: "text-foreground" };
            const date = new Date(tx.createdAt);
            return (
              <div key={tx.id}>
                <div className="flex items-center gap-3 py-2.5">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium">{config.label}</p>
                    <p className="text-xs text-muted-foreground truncate flex items-center gap-1">
                      <Clock className="h-3 w-3 shrink-0" />
                      {tx.from?.name ?? "—"} → {tx.to?.name ?? "—"} · {date.toLocaleDateString("en-BD", { day: "2-digit", month: "short" })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-semibold tabular-nums ${config.color}`}>৳{Number(tx.amount).toLocaleString()}</p>
                    <p className="text-[10px] text-muted-foreground tabular-nums">fee ৳{Number(tx.fee).toLocaleString()}</p>
                  </div>
                </div>
                {idx < transactions.length - 1 && <Separator />}
              </div>
            );
          })}
        </div>
      )}
    </CardContent>
  </Card>
);

// ─── Main ─────────────────────────────────────────────────────
const AdminDashboardContent = ({ user, stats }: AdminDashboardContentProps) => (
  <div className="space-y-5">
    {/* Welcome header */}
    <div className="rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 dark:from-slate-900 dark:to-black p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Admin Panel</p>
          <h2 className="text-xl font-bold">Welcome, {user?.name}</h2>
          <p className="text-slate-400 text-sm mt-0.5">{user?.email}</p>
        </div>
        <Badge className="bg-white/10 text-white border-0 hover:bg-white/10">Admin</Badge>
      </div>
    </div>

    {/* Quick links grid */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {QUICK_LINKS.map((link) => {
        const Icon = link.icon;
        return (
          <Link key={link.href} href={link.href}
            className={`flex flex-col items-center gap-2 rounded-2xl border p-3 transition-all hover:scale-105 hover:shadow-md active:scale-95 ${link.border}`}
          >
            <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${link.color}`}>
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-medium text-center leading-tight text-foreground">{link.label}</span>
          </Link>
        );
      })}
    </div>

    {stats && (
      <>
        <OverviewStats stats={stats} />
        <RecentTransactions transactions={stats.recentTransactions} />
      </>
    )}
  </div>
);

export default AdminDashboardContent;
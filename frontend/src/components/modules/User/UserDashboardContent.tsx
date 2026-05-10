"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { IUser } from "@/types/auth.type";
import { format } from "date-fns";
import {
  Send,
  ArrowUpFromLine,
  PlusCircle,
  Smartphone,
  Eye,
  EyeOff,
  TrendingUp,
  TrendingDown,
  ArrowLeftRight,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ITransaction } from "@/types/transaction.type";
import { getUserProfile } from "@/services/auth/auth.api";
import { useRealtimeTransactions, useRealtimeWallet } from "@/hooks/useRealtimeData";
import { getMyTransactions } from "@/services/transaction/transaction.api";
import { IResponse } from "@/types";

interface UserDashboardClientProps {
  initialUserInfo: IUser;
  initialTransactions?: IResponse<ITransaction[]>; // Optional, can be fetched separately
}

// ─── Quick action config ──────────────────────────────────────
const QUICK_ACTIONS = [
  {
    label: "Send Money",
    href: "/user/dashboard/send-money",
    icon: Send,
    color:
      "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-200 dark:border-emerald-800",
  },
  {
    label: "Cash Out",
    href: "/user/dashboard/cash-out",
    icon: ArrowUpFromLine,
    color:
      "bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
    border: "border-orange-200 dark:border-orange-800",
  },
  {
    label: "Add Money",
    href: "/user/dashboard/add-money",
    icon: PlusCircle,
    color: "bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400",
    border: "border-blue-200 dark:border-blue-800",
  },
  {
    label: "Recharge",
    href: "/user/dashboard/recharge",
    icon: Smartphone,
    color:
      "bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400",
    border: "border-purple-200 dark:border-purple-800",
  },
];

// ─── Balance Card ─────────────────────────────────────────────
const BalanceCard = ({ user }: { user: IUser }) => {
  const [showBalance, setShowBalance] = useState(false);
  const balance = user?.wallet?.balance ?? 0;

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-800 text-white shadow-xl shadow-emerald-900/20">
      {/* Decorative circles */}
      <div className="absolute -top-8 -right-8 h-40 w-40 rounded-full bg-white/5" />
      <div className="absolute -bottom-10 -left-6 h-32 w-32 rounded-full bg-white/5" />
      <div className="absolute top-1/2 right-12 h-20 w-20 rounded-full bg-white/5" />

      <CardContent className="relative p-6">
        {/* Top row */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-emerald-200 text-xs font-medium uppercase tracking-wider mb-1">
              Available Balance
            </p>
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold tracking-tight">
                {showBalance ? `৳ ${Number(balance).toFixed(2)}` : "৳ ••••••"}
              </span>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                aria-label={showBalance ? "Hide balance" : "Show balance"}
              >
                {showBalance ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
          <Badge className="bg-white/15 text-white border-0 text-xs capitalize hover:bg-white/15">
            {user?.role?.toLowerCase()}
          </Badge>
        </div>

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-emerald-200 text-xs">
              {user?.phone ?? user?.email}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// ─── Quick Actions Grid ───────────────────────────────────────
const QuickActions = () => (
  <div>
    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
      Quick Actions
    </h2>
    <div className="grid grid-cols-4 gap-3">
      {QUICK_ACTIONS.map((action) => {
        const Icon = action.icon;
        return (
          <Link
            key={action.href}
            href={action.href}
            className={`flex flex-col items-center gap-2.5 rounded-2xl border p-3 md:p-4 transition-all hover:scale-105 hover:shadow-md active:scale-95 ${action.border}`}
          >
            <div
              className={`h-11 w-11 rounded-xl flex items-center justify-center ${action.color}`}
            >
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-center leading-tight text-foreground">
              {action.label}
            </span>
          </Link>
        );
      })}
    </div>
  </div>
);

// ─── Recent Transactions ──────────────────────────────────────
const RecentTransactions = ({
  transactions,
}: {
  transactions: ITransaction[];
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">
            Recent Transactions
          </CardTitle>
          <Link
            href="/user/dashboard/transactions"
            className="text-xs text-emerald-600 dark:text-emerald-400 font-medium hover:underline flex items-center gap-1"
          >
            See all
            <ArrowLeftRight className="h-3 w-3" />
          </Link>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-1">
          {transactions.length > 0 ? (
            transactions.map((tx, idx) => {
              // Direction অনুযায়ী আইকন এবং কালার সেট করা
              const isReceived = tx.direction === "received";
              const amountValue = parseFloat(tx.amount); // স্ট্রিংকে নাম্বারে কনভার্ট

              return (
                <div key={tx.id}>
                  <div className="flex items-center gap-3 py-2.5">
                    {/* আইকন সেকশন */}
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${
                        isReceived
                          ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                          : "bg-red-50 dark:bg-red-950/40 text-red-500"
                      }`}
                    >
                      {isReceived ? (
                        <TrendingUp className="h-4 w-4" />
                      ) : (
                        <TrendingDown className="h-4 w-4" />
                      )}
                    </div>

                    {/* বিবরণ সেকশন */}
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium truncate">
                        {/* Direction অনুযায়ী নাম দেখানো */}
                        {isReceived
                          ? `Received from ${tx.from.name}`
                          : `Sent to ${tx.to.name}`}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {/* ISO ডেট স্ট্রিং ফরম্যাট করা */}
                        {format(new Date(tx.createdAt), "dd MMM, hh:mm a")}
                      </p>
                    </div>

                    {/* টাকা এবং ফি সেকশন */}
                    <div className="text-right shrink-0">
                      <p
                        className={`text-sm font-semibold tabular-nums ${
                          isReceived
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-red-500"
                        }`}
                      >
                        {isReceived ? "+" : "-"}৳{amountValue.toLocaleString()}
                      </p>
                      {tx.fee !== "0" && (
                        <p className="text-[10px] text-muted-foreground">
                          Fee: ৳{tx.fee}
                        </p>
                      )}
                    </div>
                  </div>
                  {idx < transactions.length - 1 && <Separator />}
                </div>
              );
            })
          ) : (
            <p className="text-sm text-center py-4 text-muted-foreground">
              No transactions found.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// ─── Main Dashboard ───────────────────────────────────────────
const UserDashboardContent = ({
  initialUserInfo,
  initialTransactions,
}: UserDashboardClientProps) => {
  // fetch user and wallet realtime data 
  const fetchFn = useCallback(
    () => getUserProfile(),
    [], //  queryString change → new fetchFn → refetch
  );


  // user fetch realtime transaction
   const realTimeTransaction = useCallback(
      () => getMyTransactions("limit=4"),
      [], //  queryString change → new fetchFn → refetch
    );
  const {data: transactionsData} = useRealtimeTransactions({
    fetchFn: realTimeTransaction,
    initialData: initialTransactions
  });


  const { data: user } = useRealtimeWallet({
    fetchFn,
    initialData: initialUserInfo,
  });
  const transactions = transactionsData?.data;
  return (
    <div className="space-y-5 max-w-2xl mx-auto md:max-w-none">
      {/* Balance Card */}
      <BalanceCard user={user as IUser} />

      {/* Quick Actions */}
      <QuickActions />

      {/* Recent Transactions */}
      <RecentTransactions transactions={transactions as ITransaction[]} />
    </div>
  );
};

export default UserDashboardContent;

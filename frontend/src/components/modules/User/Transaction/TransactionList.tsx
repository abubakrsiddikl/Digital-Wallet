"use client";


import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  TrendingUp, TrendingDown, ArrowLeftRight,
  Smartphone, Filter, X, Calendar,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { ITransaction, TransactionType } from "@/types/transaction";

// ─── Types ────────────────────────────────────────────────────




interface TransactionListProps {
  transactions: ITransaction[];
}

// ─── Config maps ──────────────────────────────────────────────
const TX_CONFIG: Record<TransactionType, { label: string; icon: React.ElementType; color: string; amountColor: string; sign: "+" | "-" }> = {
  SEND_MONEY: { label: "Sent",       icon: TrendingDown,   color: "bg-red-50 dark:bg-red-950/30 text-red-500",           amountColor: "text-red-500",                                      sign: "-" },
  RECEIVE:    { label: "Received",   icon: TrendingUp,     color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400", amountColor: "text-emerald-600 dark:text-emerald-400", sign: "+" },
  CASH_OUT:   { label: "Cash Out",   icon: ArrowLeftRight, color: "bg-orange-50 dark:bg-orange-950/30 text-orange-500",  amountColor: "text-orange-500",                                   sign: "-" },
  CASH_IN:    { label: "Cash In",    icon: TrendingUp,     color: "bg-blue-50 dark:bg-blue-950/30 text-blue-500",        amountColor: "text-blue-500",                                     sign: "+" },
  RECHARGE:   { label: "Recharge",   icon: Smartphone,     color: "bg-purple-50 dark:bg-purple-950/30 text-purple-500",  amountColor: "text-purple-500",                                   sign: "-" },
  ADD_MONEY:  { label: "Add Money",  icon: TrendingUp,     color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400", amountColor: "text-emerald-600 dark:text-emerald-400", sign: "+" },
};

const STATUS_BADGE: Record<string, string> = {
  SUCCESS: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
  PENDING: "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400",
  FAILED:  "bg-red-100 dark:bg-red-950/40 text-red-600",
};

const TX_TYPES = ["All", "SEND", "RECEIVE", "CASH_OUT", "CASH_IN", "RECHARGE", "ADD_MONEY"];

// ─── Filter bar ───────────────────────────────────────────────
const FilterBar = ({ onFilter }: { onFilter: (key: string, value: string) => void }) => {
  const searchParams = useSearchParams();
  const activeType = searchParams.get("type") ?? "All";

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* Type filter pills */}
      <div className="flex gap-1.5 flex-wrap">
        {TX_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => onFilter("type", type === "All" ? "" : type)}
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-all",
              activeType === type || (type === "All" && !activeType)
                ? "bg-emerald-600 text-white border-emerald-600"
                : "border-border text-muted-foreground hover:bg-muted"
            )}
          >
            {type === "All" ? "All" : TX_CONFIG[type as TransactionType]?.label ?? type}
          </button>
        ))}
      </div>

      {/* Date range */}
      <div className="flex items-center gap-2">
        <div className="relative">
          <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
          <Input
            type="date"
            className="pl-8 h-8 text-xs w-36"
            onChange={(e) => onFilter("from", e.target.value)}
            defaultValue={searchParams.get("from") ?? ""}
          />
        </div>
        <span className="text-xs text-muted-foreground">to</span>
        <Input
          type="date"
          className="h-8 text-xs w-36"
          onChange={(e) => onFilter("to", e.target.value)}
          defaultValue={searchParams.get("to") ?? ""}
        />
      </div>
    </div>
  );
};

// ─── Single transaction row ───────────────────────────────────
const TxRow = ({ tx }: { tx: ITransaction }) => {
  // টাইপ অনুযায়ী কনফিগ সিলেক্ট করা
  const config = TX_CONFIG[tx.type] ?? TX_CONFIG.SEND_MONEY;
  const Icon = config.icon;
  const date = new Date(tx.createdAt);
  
  // Direction অনুযায়ী কার নাম দেখাবে সেটি ঠিক করা
  const isSent = tx.direction === "sent";
  const partnerName = isSent ? tx.to?.name : tx.from?.name;
  const partnerPhone = isSent ? tx.to?.phone : tx.from?.phone;

  // স্ট্রিং অ্যামাউন্টকে নাম্বারে রূপান্তর
  const amountNum = parseFloat(tx.amount);
  const feeNum = parseFloat(tx.fee);

  return (
    <div className="flex items-center gap-3 py-3">
      {/* আইকন বক্স */}
      <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", config.color)}>
        <Icon className="h-4 w-4" />
      </div>

      {/* মাঝের তথ্য */}
      <div className="flex-1 overflow-hidden">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium truncate">{config.label}</p>
          {/* যদি স্ট্যাটাস না থাকে তবে সেফটি চেক */}
          <span className={cn("text-[10px] px-1.5 py-0.5 rounded-full font-medium", STATUS_BADGE["SUCCESS"])}>
            SUCCESS
          </span>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {partnerName || partnerPhone || "System"} · {date.toLocaleDateString("en-BD", { day: "2-digit", month: "short", year: "numeric" })}
        </p>
      </div>

      {/* ডানদিকের টাকা এবং ফি */}
      <div className="text-right shrink-0">
        <p className={cn("text-sm font-semibold tabular-nums", config.amountColor)}>
          {isSent ? "-" : "+"}৳{amountNum.toLocaleString()}
        </p>
        {feeNum > 0 ? (
          <p className="text-[10px] text-muted-foreground tabular-nums">fee ৳{feeNum.toLocaleString()}</p>
        ) : null}
      </div>
    </div>
  );
};

// ─── Empty state ──────────────────────────────────────────────
const EmptyState = () => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
      <ArrowLeftRight className="h-6 w-6 text-muted-foreground" />
    </div>
    <p className="text-sm font-medium text-foreground">No transactions found</p>
    <p className="text-xs text-muted-foreground mt-1">Try adjusting your filters</p>
  </div>
);

// ─── Main list ────────────────────────────────────────────────
const TransactionList = ({ transactions }: TransactionListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4 text-muted-foreground" />
              Filters
            </div>
            {hasFilters && (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 text-xs text-muted-foreground"
                onClick={() => router.push(pathname)}
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
          </div>
          <FilterBar onFilter={handleFilter} />
        </CardContent>
      </Card>

      {/* Transaction list */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium">
              {transactions.length} transaction{transactions.length !== 1 ? "s" : ""}
            </p>
          </div>

          {transactions.length === 0 ? (
            <EmptyState />
          ) : (
            <div>
              {transactions.map((tx, idx) => (
                <div key={tx.id}>
                  <TxRow tx={tx} />
                  {idx < transactions.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionList;
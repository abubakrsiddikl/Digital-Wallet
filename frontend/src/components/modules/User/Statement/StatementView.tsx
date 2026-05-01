"use client";

import { useRouter, usePathname } from "next/navigation";
import {
  TrendingUp, TrendingDown, ArrowLeftRight,
  ChevronLeft, ChevronRight, FileDown,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
interface StatementSummary {
  totalIn: number;
  totalOut: number;
  openingBalance: number;
  closingBalance: number;
  transactionCount: number;
  transactions: {
    _id: string;
    type: string;
    amount: number;
    createdAt: string;
    from?: string;
    to?: string;
  }[];
}

interface StatementViewProps {
  data: StatementSummary;
  month: string;
  year: string;
}

const MONTH_NAMES = [
  "", "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ─── Month navigator ──────────────────────────────────────────
const MonthNav = ({ month, year }: { month: string; year: string }) => {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (direction: "prev" | "next") => {
    let m = parseInt(month);
    let y = parseInt(year);
    if (direction === "prev") {
      m -= 1;
      if (m < 1) { m = 12; y -= 1; }
    } else {
      m += 1;
      if (m > 12) { m = 1; y += 1; }
    }
    const pad = String(m).padStart(2, "0");
    router.push(`${pathname}?month=${pad}&year=${y}`);
  };

  const isCurrentMonth =
    month === String(new Date().getMonth() + 1).padStart(2, "0") &&
    year === String(new Date().getFullYear());

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => navigate("prev")}
        className="h-8 w-8 flex items-center justify-center rounded-lg border hover:bg-muted transition-all"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      <span className="text-sm font-semibold min-w-[130px] text-center">
        {MONTH_NAMES[parseInt(month)]} {year}
      </span>
      <button
        onClick={() => navigate("next")}
        disabled={isCurrentMonth}
        className="h-8 w-8 flex items-center justify-center rounded-lg border hover:bg-muted transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
};

// ─── Summary cards ────────────────────────────────────────────
const SummaryCards = ({ data }: { data: StatementSummary }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
    {[
      { label: "Total In",         value: data.totalIn,         icon: TrendingUp,    color: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-950/30", sign: "+" },
      { label: "Total Out",        value: data.totalOut,        icon: TrendingDown,  color: "text-red-500",                           bg: "bg-red-50 dark:bg-red-950/30",          sign: "-" },
      { label: "Opening Balance",  value: data.openingBalance,  icon: ArrowLeftRight, color: "text-blue-600 dark:text-blue-400",      bg: "bg-blue-50 dark:bg-blue-950/30",        sign: ""  },
      { label: "Closing Balance",  value: data.closingBalance,  icon: ArrowLeftRight, color: "text-purple-600 dark:text-purple-400",  bg: "bg-purple-50 dark:bg-purple-950/30",    sign: ""  },
    ].map((item) => {
      const Icon = item.icon;
      return (
        <Card key={item.label} className="border">
          <CardContent className="p-4">
            <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center mb-3", item.bg)}>
              <Icon className={cn("h-4 w-4", item.color)} />
            </div>
            <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
            <p className={cn("text-lg font-bold tabular-nums", item.color)}>
              {item.sign}৳{item.value.toLocaleString()}
            </p>
          </CardContent>
        </Card>
      );
    })}
  </div>
);

// ─── Statement row ────────────────────────────────────────────
const StatementRow = ({ tx }: { tx: StatementSummary["transactions"][0] }) => {
  const isCredit = ["RECEIVE", "CASH_IN", "ADD_MONEY"].includes(tx.type);
  const date = new Date(tx.createdAt);

  return (
    <div className="flex items-center gap-3 py-2.5 text-sm">
      <div className="w-20 shrink-0 text-xs text-muted-foreground tabular-nums">
        {date.toLocaleDateString("en-BD", { day: "2-digit", month: "short" })}
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="truncate font-medium capitalize">{tx.type.replace("_", " ").toLowerCase()}</p>
        <p className="text-xs text-muted-foreground truncate">{tx.from ?? tx.to ?? "—"}</p>
      </div>
      <span className={cn("font-semibold tabular-nums shrink-0", isCredit ? "text-emerald-600 dark:text-emerald-400" : "text-red-500")}>
        {isCredit ? "+" : "-"}৳{tx.amount.toLocaleString()}
      </span>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────
const StatementView = ({ data, month, year }: StatementViewProps) => {
  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <MonthNav month={month} year={year} />
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {data.transactionCount} transactions
          </Badge>
          <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
            <FileDown className="h-3.5 w-3.5" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <SummaryCards data={data} />

      {/* Transaction table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Transaction Detail</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Table header */}
          <div className="flex items-center gap-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b mb-1">
            <div className="w-20 shrink-0">Date</div>
            <div className="flex-1">Description</div>
            <div className="shrink-0">Amount</div>
          </div>

          {data.transactions.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No transactions this month.
            </div>
          ) : (
            data.transactions.map((tx, idx) => (
              <div key={tx._id}>
                <StatementRow tx={tx} />
                {idx < data.transactions.length - 1 && <Separator />}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatementView;
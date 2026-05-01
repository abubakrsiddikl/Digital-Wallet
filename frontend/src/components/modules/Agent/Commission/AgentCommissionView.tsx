"use client";

import {
  TrendingUp,
  Percent,
  ArrowDownToLine,
  ArrowUpFromLine,
  Calendar,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface CommissionEntry {
  _id: string;
  type: "CASH_IN" | "CASH_OUT";
  amount: number;
  commission: number;
  userPhone: string;
  createdAt: string;
}

interface CommissionData {
  todayTotal: number;
  weekTotal: number;
  monthTotal: number;
  allTimeTotal: number;
  cashInRate: number;
  cashOutRate: number;
  entries: CommissionEntry[];
}

interface AgentCommissionViewProps {
  data: CommissionData;
}

const AgentCommissionView = ({ data }: AgentCommissionViewProps) => {
  return (
    <div className="space-y-4">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Today",
            value: data.todayTotal,
            color: "text-emerald-600 dark:text-emerald-400",
            bg: "bg-emerald-50 dark:bg-emerald-950/30",
          },
          {
            label: "This Week",
            value: data.weekTotal,
            color: "text-blue-600 dark:text-blue-400",
            bg: "bg-blue-50 dark:bg-blue-950/30",
          },
          {
            label: "This Month",
            value: data.monthTotal,
            color: "text-purple-600 dark:text-purple-400",
            bg: "bg-purple-50 dark:bg-purple-950/30",
          },
          {
            label: "All Time",
            value: data.allTimeTotal,
            color: "text-orange-600 dark:text-orange-400",
            bg: "bg-orange-50 dark:bg-orange-950/30",
          },
        ].map((item) => (
          <Card key={item.label}>
            <CardContent className="p-4">
              <div
                className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center mb-3",
                  item.bg,
                )}
              >
                <TrendingUp className={cn("h-4 w-4", item.color)} />
              </div>
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className={cn("text-xl font-bold tabular-nums", item.color)}>
                ৳{item.value.toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Commission rates info */}
      <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Percent className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm font-medium">Your Commission Rates</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border bg-card p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <ArrowDownToLine className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-muted-foreground font-medium">
                  Cash In
                </span>
              </div>
              <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                {data.cashInRate}%
              </p>
            </div>
            <div className="rounded-xl border bg-card p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1">
                <ArrowUpFromLine className="h-3.5 w-3.5 text-orange-500" />
                <span className="text-xs text-muted-foreground font-medium">
                  Cash Out
                </span>
              </div>
              <p className="text-xl font-bold text-orange-500">
                {data.cashOutRate}%
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent commission entries */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Commission History</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Table header */}
          <div className="flex items-center gap-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider border-b mb-1">
            <div className="w-8 shrink-0" />
            <div className="flex-1">Transaction</div>
            <div className="w-24 text-right shrink-0">Amount</div>
            <div className="w-20 text-right shrink-0">Commission</div>
          </div>

          {data.entries.length === 0 ? (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No commission earned yet.
            </div>
          ) : (
            data.entries.map((entry, idx) => {
              const isCashIn = entry.type === "CASH_IN";
              const date = new Date(entry.createdAt);
              return (
                <div key={entry._id}>
                  <div className="flex items-center gap-3 py-2.5">
                    <div
                      className={cn(
                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0",
                        isCashIn
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-orange-50 dark:bg-orange-950/30 text-orange-500",
                      )}
                    >
                      {isCashIn ? (
                        <ArrowDownToLine className="h-3.5 w-3.5" />
                      ) : (
                        <ArrowUpFromLine className="h-3.5 w-3.5" />
                      )}
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="text-sm font-medium">
                        {isCashIn ? "Cash In" : "Cash Out"}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {date.toLocaleDateString("en-BD", {
                          day: "2-digit",
                          month: "short",
                        })}{" "}
                        · {entry.userPhone}
                      </p>
                    </div>
                    <div className="w-24 text-right shrink-0">
                      <p className="text-sm tabular-nums text-foreground">
                        ৳{entry.amount.toLocaleString()}
                      </p>
                    </div>
                    <div className="w-20 text-right shrink-0">
                      <p className="text-sm font-semibold tabular-nums text-purple-600 dark:text-purple-400">
                        +৳{entry.commission.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  {idx < data.entries.length - 1 && <Separator />}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCommissionView;

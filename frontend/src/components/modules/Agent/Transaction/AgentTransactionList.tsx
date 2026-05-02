"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Filter,
  X,
  Calendar,
  ArrowLeftRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { ITransaction } from "@/types/transaction.type";

interface AgentTransactionListProps {
  transactions: ITransaction[];
}

const TYPE_FILTERS = ["All", "CASH_IN", "CASH_OUT"] as const;

const STATUS_BADGE: Record<string, string> = {
  SUCCESS:
    "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400",
  PENDING:
    "bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400",
  FAILED: "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400",
};

const AgentTransactionList = ({ transactions }: AgentTransactionListProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeType = searchParams.get("type") ?? "All";
  const hasFilters = searchParams.toString().length > 0;

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Filter bar */}
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="h-4 w-4" />
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

          {/* Type pills */}
          <div className="flex gap-1.5 flex-wrap">
            {TYPE_FILTERS.map((type) => (
              <button
                key={type}
                onClick={() =>
                  handleFilter("type", type === "All" ? "" : type)
                }
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer",
                  activeType === type ||
                    (type === "All" && !searchParams.get("type"))
                    ? "bg-[#009966] dark:bg-orange-950/30 text-white"
                    : "border-border text-muted-foreground hover:bg-muted"
                )}
              >
                {type === "All"
                  ? "All"
                  : type === "CASH_IN"
                  ? "Cash in"
                  : "Cash out"}
              </button>
            ))}
          </div>

          {/* Date range */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input
                type="date"
                className="pl-8 h-8 text-xs w-36"
                onChange={(e) => handleFilter("from", e.target.value)}
                defaultValue={searchParams.get("from") ?? ""}
              />
            </div>
            <span className="text-xs text-muted-foreground">to</span>
            <Input
              type="date"
              className="h-8 text-xs w-36"
              onChange={(e) => handleFilter("to", e.target.value)}
              defaultValue={searchParams.get("to") ?? ""}
            />
          </div>
        </CardContent>
      </Card>

      {/* Transaction list */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-3">
            {transactions.length} transaction
            {transactions.length !== 1 ? "s" : ""}
          </p>

          {transactions.length === 0 ? (
            <div className="py-14 text-center">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                <ArrowLeftRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">
                No transactions found
              </p>
            </div>
          ) : (
            transactions.map((tx, idx) => {
              const isCashIn = tx.type === "CASH_IN";

              // counterparty: cash in → show sender (from), cash out → show receiver (to)
              const counterparty = isCashIn ? tx.from : tx.to;
              const displayPhone =
                counterparty?.phone ?? counterparty?.email ?? "—";
              const displayName = counterparty?.name ?? "Unknown";

              const date = new Date(tx.createdAt);
              const commission = Number(tx.agentCommission);
              const amount = Number(tx.amount);

              return (
                <div key={tx.id}>
                  <div className="flex items-center gap-3 py-3">
                    {/* Icon */}
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center shrink-0",
                        isCashIn
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400"
                          : "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400"
                      )}
                    >
                      {isCashIn ? (
                        <ArrowDownToLine className="h-4 w-4" />
                      ) : (
                        <ArrowUpFromLine className="h-4 w-4" />
                      )}
                    </div>

                    {/* Meta */}
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-medium">
                          {isCashIn ? "Cash in" : "Cash out"}
                        </p>
                        <span
                          className={cn(
                            "text-[10px] px-1.5 py-0.5 rounded-full font-medium",
                            STATUS_BADGE[tx.status]
                          )}
                        >
                          {tx.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {displayName} · {displayPhone} ·{" "}
                        {date.toLocaleDateString("en-BD", {
                          day: "2-digit",
                          month: "short",
                        })}{" "}
                        {date.toLocaleTimeString("en-BD", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>

                    {/* Amount */}
                    <div className="text-right shrink-0">
                      <p
                        className={cn(
                          "text-sm font-semibold tabular-nums",
                          isCashIn
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-amber-600 dark:text-amber-400"
                        )}
                      >
                        ৳{amount.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-purple-500 tabular-nums">
                        +৳{commission.toLocaleString()} comm
                      </p>
                    </div>
                  </div>

                  {idx < transactions.length - 1 && <Separator />}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentTransactionList;
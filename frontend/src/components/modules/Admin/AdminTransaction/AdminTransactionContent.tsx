"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ArrowLeftRight, Search, Filter, X, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ITransaction, TransactionType } from "@/types/transaction.type";
import { cn } from "@/lib/utils";

interface AdminTransactionsContentProps {
  transactions: ITransaction[];
  meta?: { total: number };
}

const TX_TYPES: (TransactionType | "All")[] = ["All", "SEND_MONEY", "CASH_OUT", "CASH_IN", "RECHARGE", "ADD_MONEY"];

const TX_CONFIG: Record<TransactionType, { label: string; color: string; bg: string }> = {
  SEND_MONEY: { label: "Send Money", color: "text-red-500",                                     bg: "bg-red-50 dark:bg-red-950/30"       },
  CASH_OUT:   { label: "Cash Out",   color: "text-orange-500",                                  bg: "bg-orange-50 dark:bg-orange-950/30" },
  CASH_IN:    { label: "Cash In",    color: "text-emerald-600 dark:text-emerald-400",            bg: "bg-emerald-50 dark:bg-emerald-950/30"},
  RECHARGE:   { label: "Recharge",   color: "text-purple-500",                                  bg: "bg-purple-50 dark:bg-purple-950/30" },
  ADD_MONEY:  { label: "Add Money",  color: "text-blue-500",                                    bg: "bg-blue-50 dark:bg-blue-950/30"     },
};

const STATUS_BADGE: Record<string, string> = {
  SUCCESS: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
  PENDING: "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700",
  FAILED:  "bg-red-100 dark:bg-red-950/40 text-red-600",
};

const AdminTransactionsContent = ({ transactions, meta }: AdminTransactionsContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "");


  const activeType = searchParams.get("type") ?? "All";

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter("searchTerm", search);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-3">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input placeholder="Search by name, phone, transaction ID..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Button type="submit" size="sm" className="h-9">Search</Button>
            {searchParams.toString() && (
              <Button type="button" variant="ghost" size="sm" className="h-9" onClick={() => { setSearch(""); router.push(pathname); }}>
                <X className="h-4 w-4" />
              </Button>
            )}
          </form>

          <div className="flex gap-1.5 flex-wrap">
            {TX_TYPES.map((t) => (
              <button key={t} onClick={() => handleFilter("type", t)}
                className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer",
                  activeType === t ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800 dark:border-slate-200"
                    : "border-border text-muted-foreground hover:bg-muted"
                )}
              >
                {t === "All" ? "All" : TX_CONFIG[t as TransactionType]?.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
              <Input type="date" className="pl-8 h-8 text-xs w-36" onChange={(e) => handleFilter("from", e.target.value)} defaultValue={searchParams.get("from") ?? ""} />
            </div>
            <span className="text-xs text-muted-foreground">to</span>
            <Input type="date" className="h-8 text-xs w-36" onChange={(e) => handleFilter("to", e.target.value)} defaultValue={searchParams.get("to") ?? ""} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-3">{meta?.total ?? transactions.length} transactions</p>
          {transactions.length === 0 ? (
            <div className="py-14 text-center">
              <ArrowLeftRight className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No transactions found</p>
            </div>
          ) : (
            transactions.map((tx, idx) => {
              const config = TX_CONFIG[tx.type] ?? { label: tx.type, color: "text-foreground", bg: "bg-muted" };
              const date = new Date(tx.createdAt);
              return (
                <div key={tx.id}>
                  <div className="flex items-center gap-3 py-3">
                    <div className={cn("h-10 w-10 rounded-full flex items-center justify-center shrink-0", config.bg)}>
                      <ArrowLeftRight className={cn("h-4 w-4", config.color)} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{config.label}</p>
                        <Badge className={cn("text-[10px] px-1.5 py-0 border-0", STATUS_BADGE[tx.status])}>{tx.status}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {tx.from?.name ?? "—"} → {tx.to?.name ?? "—"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {tx.transactionId} · {date.toLocaleDateString("en-BD", { day: "2-digit", month: "short", year: "numeric" })}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={cn("text-sm font-semibold tabular-nums", config.color)}>৳{Number(tx.amount).toLocaleString()}</p>
                      <p className="text-[10px] text-muted-foreground">fee ৳{Number(tx.fee).toLocaleString()}</p>
                      {Number(tx.agentCommission) > 0 && (
                        <p className="text-[10px] text-purple-500">comm ৳{Number(tx.agentCommission).toLocaleString()}</p>
                      )}
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

export default AdminTransactionsContent;
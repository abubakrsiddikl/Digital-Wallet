"use client";

import { useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Wallet, Users, UserCheck, TrendingUp, Search, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { ISystemStats } from "@/types/stats.type";



interface AdminBalanceContentProps {
data?: ISystemStats;
}

const AdminBalanceContent = ({ data }: AdminBalanceContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [filter, setFilter] = useState<"All" | "USER" | "AGENT">("All");

  const wallets = data?.wallets ?? [];
  const filtered = wallets.filter((w) => {
    const matchType = filter === "All" || w.type === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || w.user?.name?.toLowerCase().includes(q) || w.user?.phone?.includes(q) || w.user?.email?.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total in System", value: data?.totalSystemBalance ?? 0,    icon: Wallet,    color: "text-slate-700 dark:text-slate-300",          bg: "bg-slate-100 dark:bg-slate-800/50" },
          { label: "User Balances",   value: data?.totalUserBalance ?? 0,      icon: Users,     color: "text-blue-600 dark:text-blue-400",             bg: "bg-blue-50 dark:bg-blue-950/30"    },
          { label: "Agent Balances",  value: data?.totalAgentBalance ?? 0,     icon: UserCheck, color: "text-emerald-600 dark:text-emerald-400",       bg: "bg-emerald-50 dark:bg-emerald-950/30"},
          { label: "Commission Earned",value: data?.totalCommissionEarned ?? 0,icon: TrendingUp,color: "text-purple-600 dark:text-purple-400",        bg: "bg-purple-50 dark:bg-purple-950/30" },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label}>
              <CardContent className="p-4">
                <div className={`h-8 w-8 rounded-lg flex items-center justify-center mb-3 ${item.bg}`}>
                  <Icon className={`h-4 w-4 ${item.color}`} />
                </div>
                <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                <p className={`text-xl font-bold tabular-nums ${item.color}`}>৳{item.value.toLocaleString()}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Wallet list */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Wallet Breakdown</CardTitle>
          <div className="flex flex-col gap-2 mt-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input placeholder="Search user or agent..." className="pl-9 h-9" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex gap-1.5">
              {(["All", "USER", "AGENT"] as const).map((f) => (
                <button key={f} onClick={() => setFilter(f)}
                  className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer",
                    filter === f ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800" : "border-border text-muted-foreground hover:bg-muted"
                  )}
                >{f}</button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="text-xs text-muted-foreground mb-3">{filtered.length} wallets</p>
          {filtered.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No wallets found</p>
          ) : (
            filtered.map((w, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 py-2.5">
                  <div className={cn("h-9 w-9 rounded-full flex items-center justify-center shrink-0 text-sm font-bold",
                    w.type === "AGENT" ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" : "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400"
                  )}>
                    {w.user?.name?.charAt(0)?.toUpperCase() ?? "?"}
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{w.user?.name}</p>
                      <Badge className={cn("text-[10px] px-1.5 py-0 border-0",
                        w.type === "AGENT" ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400" : "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400"
                      )}>{w.type}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{w.user?.phone} · {w.user?.email}</p>
                  </div>
                  <p className="text-sm font-bold tabular-nums text-foreground shrink-0">৳{w.balance.toLocaleString()}</p>
                </div>
                {idx < filtered.length - 1 && <Separator />}
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminBalanceContent;
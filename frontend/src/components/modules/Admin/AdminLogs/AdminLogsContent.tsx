"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { ScrollText, Clock, User, Calendar, X, Filter } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface AuditLog {
  id: string;
  action: string;
  actor: string;
  actorRole: string;
  target?: string;
  details?: string;
  ip?: string;
  createdAt: string;
}

interface AdminLogsContentProps {
  logs: AuditLog[];
}

const ACTION_TYPES = ["All", "LOGIN", "LOGOUT", "BLOCK_USER", "APPROVE_AGENT", "APPROVE_REQUEST", "UPDATE_SETTINGS", "TRANSACTION"];

const ACTION_COLOR: Record<string, string> = {
  LOGIN:           "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400",
  LOGOUT:          "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  BLOCK_USER:      "bg-red-100 dark:bg-red-950/40 text-red-600",
  APPROVE_AGENT:   "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
  APPROVE_REQUEST: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
  UPDATE_SETTINGS: "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400",
  TRANSACTION:     "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400",
};

const AdminLogsContent = ({ logs }: AdminLogsContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeAction = searchParams.get("action") ?? "All";

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Filter className="h-4 w-4 text-muted-foreground" />
              Filter by action
            </div>
            {searchParams.toString() && (
              <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground" onClick={() => router.push(pathname)}>
                <X className="h-3 w-3 mr-1" /> Clear
              </Button>
            )}
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {ACTION_TYPES.map((a) => (
              <button key={a} onClick={() => handleFilter("action", a)}
                className={cn("rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  activeAction === a ? "bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 border-slate-800"
                    : "border-border text-muted-foreground hover:bg-muted"
                )}
              >{a}</button>
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
          <p className="text-sm font-medium mb-3">{logs.length} events</p>
          {logs.length === 0 ? (
            <div className="py-14 text-center">
              <ScrollText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No logs found</p>
            </div>
          ) : (
            logs.map((log, idx) => {
              const date = new Date(log.createdAt);
              const badgeClass = ACTION_COLOR[log.action] ?? "bg-slate-100 dark:bg-slate-800 text-slate-600";
              return (
                <div key={log.id}>
                  <div className="flex items-start gap-3 py-3">
                    <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <ScrollText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={cn("text-[10px] px-1.5 py-0 border-0", badgeClass)}>{log.action}</Badge>
                        <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {date.toLocaleDateString("en-BD", { day: "2-digit", month: "short", year: "numeric" })} {date.toLocaleTimeString("en-BD", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                      <p className="text-sm font-medium mt-0.5 flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        {log.actor}
                        <span className="text-xs text-muted-foreground capitalize">({log.actorRole.toLowerCase()})</span>
                      </p>
                      {log.target && <p className="text-xs text-muted-foreground truncate">Target: {log.target}</p>}
                      {log.details && <p className="text-xs text-muted-foreground italic truncate">{log.details}</p>}
                      {log.ip && <p className="text-[10px] text-muted-foreground">IP: {log.ip}</p>}
                    </div>
                  </div>
                  {idx < logs.length - 1 && <Separator />}
                </div>
              );
            })
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogsContent;
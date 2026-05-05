"use client";

import { useState, useEffect } from "react";
import { useActionState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import {
  CheckCircle,
  XCircle,
  UserCheck,
  BadgeDollarSign,
  FileText,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AppPagination from "@/components/shared/AppPagination";
import { cn } from "@/lib/utils";
import {
  IAgentApplication,
  IAgentBalanceRequest,
} from "@/types/agentApplication.type";
import {
  approveApplication,
  approveBalanceRequest,
} from "@/services/agentApplication/agentApplication.api";

interface AdminApplicationsContentProps {
  applications: IAgentApplication[];
  balanceRequests: IAgentBalanceRequest[];
  applicationsMeta?: { total: number; page: number; limit: number };
  balanceReqMeta?: { total: number; page: number; limit: number };
}

const STATUS_FILTERS = ["ALL", "PENDING", "APPROVED", "REJECTED"] as const;

const STATUS_CONFIG = {
  PENDING: {
    label: "Pending",
    cls: "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-400",
  },
  APPROVED: {
    label: "Approved",
    cls: "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
  },
  REJECTED: {
    label: "Rejected",
    cls: "bg-red-100 dark:bg-red-950/40 text-red-600",
  },
};

// ─── Review form — receives the correct server action as prop ──
type ServerAction = typeof approveApplication | typeof approveBalanceRequest;

const ReviewForm = ({
  id,
  idField,
  serverAction,
}: {
  id: string;
  idField: "applicationId" | "requestId";
  serverAction: ServerAction;
}) => {
  const [state, formAction, isPending] = useActionState(serverAction, null);
  const [showNote, setShowNote] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      toast.success(state.message ?? "Done!");
      router.refresh();
    } else if (state.message) toast.error(state.message);
  }, [state,router]);

  return (
    <form action={formAction} className="space-y-2 mt-3">
      <input type="hidden" name={idField} value={id} />

      {showNote && (
        <textarea
          name="reviewNote"
          rows={2}
          placeholder="Add a note for the applicant (optional)..."
          className="w-full px-3 py-2 rounded-lg border bg-background text-xs resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
      )}

      <div className="flex items-center gap-2 flex-wrap">
        <button
          name="action"
          value="APPROVE"
          type="submit"
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 text-xs font-medium hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-all disabled:opacity-50 cursor-pointer"
        >
          <CheckCircle className="h-3.5 w-3.5" />
          {isPending ? "Processing..." : "Approve"}
        </button>

        <button
          name="action"
          value="REJECT"
          type="submit"
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-lg bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-200 dark:border-red-800 px-3 py-1.5 text-xs font-medium hover:bg-red-100 dark:hover:bg-red-900/40 transition-all disabled:opacity-50 cursor-pointer"
        >
          <XCircle className="h-3.5 w-3.5" />
          Reject
        </button>

        <button
          type="button"
          onClick={() => setShowNote((p) => !p)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <FileText className="h-3.5 w-3.5" />
          {showNote ? "Hide note" : "Add note"}
          {showNote ? (
            <ChevronUp className="h-3 w-3" />
          ) : (
            <ChevronDown className="h-3 w-3" />
          )}
        </button>
      </div>
    </form>
  );
};

// ─── Application row ──────────────────────────────────────────
const ApplicationRow = ({ app }: { app: IAgentApplication }) => {
  const s = STATUS_CONFIG[app.status];
  return (
    <div className="py-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-950/40 flex items-center justify-center shrink-0 text-sm font-bold text-emerald-700 dark:text-emerald-400">
          {app.user.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium">{app.user.name}</p>
              <Badge className={cn("text-[10px] px-1.5 py-0 border-0", s.cls)}>
                {s.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground shrink-0">
              {new Date(app.createdAt).toLocaleDateString("en-BD", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Contact */}
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {app.user.email} · {app.user.phone}
          </p>

          {/* NID / Business / Address */}
          <div className="mt-2 rounded-xl bg-muted/40 border px-3 py-2 text-xs space-y-1">
            <div className="flex justify-between gap-2 text-muted-foreground">
              <span className="shrink-0">NID</span>
              <span className="font-medium text-foreground tabular-nums">
                {app.nidNumber}
              </span>
            </div>
            {app.businessName && (
              <div className="flex justify-between gap-2 text-muted-foreground">
                <span className="shrink-0">Business</span>
                <span className="font-medium text-foreground text-right">
                  {app.businessName}
                </span>
              </div>
            )}
            {app.address && (
              <div className="flex justify-between gap-2 text-muted-foreground">
                <span className="shrink-0">Address</span>
                <span className="font-medium text-foreground text-right max-w-[60%]">
                  {app.address}
                </span>
              </div>
            )}
          </div>

          {/* Applicant's own note */}
          {app.reviewNote && (
            <p className="text-xs text-muted-foreground italic mt-1.5">
              Applicant note: {app.reviewNote}
            </p>
          )}

          {/* Admin review note (only if reviewed) */}
          {app.reviewNote && (
            <div className="mt-1.5 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-3 py-1.5">
              <p className="text-[10px] font-medium text-red-600">
                Admin note:
              </p>
              <p className="text-xs text-red-500 italic">{app.reviewNote}</p>
            </div>
          )}

          {/* Actions — PENDING only */}
          {app.status === "PENDING" && (
            <ReviewForm
              id={app.id}
              idField="applicationId"
              serverAction={approveApplication}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Balance request row ──────────────────────────────────────
const BalanceRequestRow = ({ req }: { req: IAgentBalanceRequest }) => {
  const s = STATUS_CONFIG[req.status];
  return (
    <div className="py-4">
      <div className="flex items-start gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center shrink-0 text-sm font-bold text-blue-700 dark:text-blue-400">
          {req.agent.name.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 overflow-hidden">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-medium">{req.agent.name}</p>
              <Badge className={cn("text-[10px] px-1.5 py-0 border-0", s.cls)}>
                {s.label}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground shrink-0">
              {new Date(req.createdAt).toLocaleDateString("en-BD", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {req.agent.email} · {req.agent.phone}
          </p>

          {/* Amount + current balance */}
          <div className="mt-2 flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-1.5">
              <BadgeDollarSign className="h-4 w-4 text-blue-500 shrink-0" />
              <span className="text-base font-bold text-blue-600 dark:text-blue-400 tabular-nums">
                ৳ {Number(req.amount).toLocaleString()}
              </span>
            </div>
            {req.agent.wallet?.balance !== undefined && (
              <span className="text-xs text-muted-foreground">
                Current:{" "}
                <span className="font-medium text-foreground tabular-nums">
                  ৳{Number(req.agent.wallet.balance).toLocaleString()}
                </span>
              </span>
            )}
          </div>

          {req.note && (
            <p className="text-xs text-muted-foreground italic mt-1.5">
              Agent note: {req.note}
            </p>
          )}

          {req.reviewNote && (
            <div className="mt-1.5 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20 px-3 py-1.5">
              <p className="text-[10px] font-medium text-red-600">
                Admin note:
              </p>
              <p className="text-xs text-red-500 italic">{req.reviewNote}</p>
            </div>
          )}

          {req.status === "PENDING" && (
            <ReviewForm
              id={req.id}
              idField="requestId"
              serverAction={approveBalanceRequest}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Tab button ───────────────────────────────────────────────
const TabBtn = ({
  active,
  onClick,
  label,
  count,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
}) => (
  <button
    onClick={onClick}
    className={cn(
      "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all",
      active
        ? "bg-foreground text-background"
        : "text-muted-foreground hover:bg-muted",
    )}
  >
    {label}
    {count > 0 && (
      <span
        className={cn(
          "text-xs px-1.5 py-0.5 rounded-full font-semibold min-w-[20px] text-center",
          active
            ? "bg-background/20"
            : "bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400",
        )}
      >
        {count}
      </span>
    )}
  </button>
);

// ─── Filter bar — use explicit classes not dynamic strings ─────
const FilterBar = ({ variant }: { variant: "green" | "blue" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeStatus = searchParams.get("status") ?? "ALL";

  const handleFilter = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") params.set("status", value);
    else params.delete("status");
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeClass =
    variant === "green"
      ? "bg-emerald-600 text-white border-transparent"
      : "bg-blue-600 text-white border-transparent";

  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      <Filter className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
      {STATUS_FILTERS.map((s) => (
        <button
          key={s}
          onClick={() => handleFilter(s)}
          className={cn(
            "rounded-full border px-2.5 py-0.5 text-xs font-medium transition-all",
            activeStatus === s
              ? activeClass
              : "border-border text-muted-foreground hover:bg-muted",
          )}
        >
          {s}
        </button>
      ))}
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────
const AdminApplicationsContent = ({
  applications,
  balanceRequests,
  applicationsMeta,
  balanceReqMeta,
}: AdminApplicationsContentProps) => {
  const [tab, setTab] = useState<"applications" | "balance">("applications");
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? 1);

  const pendingApps = applications.filter((a) => a.status === "PENDING").length;
  const pendingReqs = balanceRequests.filter(
    (r) => r.status === "PENDING",
  ).length;

  return (
    <div className="space-y-4">
      {/* Tab switcher */}
      <div className="flex items-center gap-1 p-1 bg-muted rounded-xl w-fit flex-wrap">
        <TabBtn
          active={tab === "applications"}
          onClick={() => setTab("applications")}
          label="Agent Applications"
          count={pendingApps}
        />
        <TabBtn
          active={tab === "balance"}
          onClick={() => setTab("balance")}
          label="Balance Requests"
          count={pendingReqs}
        />
      </div>

      {/* Applications tab */}
      {tab === "applications" && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <UserCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                <p className="text-sm font-semibold">
                  {applicationsMeta?.total ?? applications.length} application
                  {(applicationsMeta?.total ?? applications.length) !== 1
                    ? "s"
                    : ""}
                </p>
              </div>
              <FilterBar variant="green" />
            </div>

            {applications.length === 0 ? (
              <div className="py-12 text-center">
                <UserCheck className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No applications found
                </p>
              </div>
            ) : (
              <>
                {applications.map((app, idx) => (
                  <div key={app.id}>
                    <ApplicationRow app={app} />
                    {idx < applications.length - 1 && <Separator />}
                  </div>
                ))}
                {applicationsMeta &&
                  applicationsMeta.total > applicationsMeta.limit && (
                    <div className="mt-4 pt-4 border-t">
                      <AppPagination
                        total={applicationsMeta.total}
                        page={currentPage}
                        limit={applicationsMeta.limit}
                      />
                    </div>
                  )}
              </>
            )}
          </CardContent>
        </Card>
      )}

      {/* Balance requests tab */}
      {tab === "balance" && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <BadgeDollarSign className="h-4 w-4 text-blue-500" />
                <p className="text-sm font-semibold">
                  {balanceReqMeta?.total ?? balanceRequests.length} request
                  {(balanceReqMeta?.total ?? balanceRequests.length) !== 1
                    ? "s"
                    : ""}
                </p>
              </div>
              <FilterBar variant="blue" />
            </div>

            {balanceRequests.length === 0 ? (
              <div className="py-12 text-center">
                <BadgeDollarSign className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">
                  No balance requests found
                </p>
              </div>
            ) : (
              <>
                {balanceRequests.map((req, idx) => (
                  <div key={req.id}>
                    <BalanceRequestRow req={req} />
                    {idx < balanceRequests.length - 1 && <Separator />}
                  </div>
                ))}
                {balanceReqMeta &&
                  balanceReqMeta.total > balanceReqMeta.limit && (
                    <div className="mt-4 pt-4 border-t">
                      <AppPagination
                        total={balanceReqMeta.total}
                        page={currentPage}
                        limit={balanceReqMeta.limit}
                      />
                    </div>
                  )}
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminApplicationsContent;

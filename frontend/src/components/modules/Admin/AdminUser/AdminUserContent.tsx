"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Search,
  ShieldBan,
  ShieldCheck,
  User,
  X,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { IUser, TRole } from "@/types/auth.type";

import { cn } from "@/lib/utils";
import AppPagination from "@/components/shared/AppPagination";
import { updateUserRole, updateUserStatus } from "@/services/user/user.api";

interface AdminUsersContentProps {
  users: IUser[];
  meta?: { total: number; page: number; limit: number };
}

const STATUS_FILTERS = ["All", "ACTIVE", "BLOCKED"];

const ROLE_CONFIG: Record<TRole, { label: string; color: string }> = {
  USER: {
    label: "User",
    color: "bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400",
  },
  AGENT: {
    label: "Agent",
    color:
      "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400",
  },
  ADMIN: {
    label: "Admin",
    color:
      "bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400",
  },
};

// ─── Role change dropdown ─────────────────────────────────────
const RoleChangeDropdown = ({ user }: { user: IUser }) => {
  const [state, formAction, isPending] = useActionState(updateUserRole, null);
  const router = useRouter();
  useEffect(() => {
    if (!state) return;
    if (state.success) {
      router.refresh();
      toast.success(state.message ?? "Role updated!");
    } else if (state.message) toast.error(state.message);
  }, [state,router]);

  const currentRole = user.role as TRole;
  const currentConfig = ROLE_CONFIG[currentRole];
  const otherRoles = (Object.keys(ROLE_CONFIG) as TRole[]).filter(
    (r) => r !== currentRole,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={isPending}
          className={cn(
            "flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border-0 transition-all hover:opacity-80 disabled:opacity-50",
            currentConfig.color,
          )}
        >
          {isPending ? "..." : currentConfig.label}
          <ChevronDown className="h-2.5 w-2.5" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Change role to
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {otherRoles.map((role) => {
          const config = ROLE_CONFIG[role];
          return (
            <DropdownMenuItem key={role} asChild>
              {/* form submit via hidden button trick */}
              <form action={formAction} className="w-full">
                <input type="hidden" name="userId" value={user.id} />
                <input type="hidden" name="role" value={role} />
                <button
                  type="submit"
                  className="w-full flex items-center gap-2 text-sm cursor-pointer"
                >
                  <span
                    className={cn(
                      "h-2 w-2 rounded-full",
                      config.color.split(" ")[0],
                    )}
                  />
                  {config.label}
                </button>
              </form>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// ─── Block/Unblock button ─────────────────────────────────────
const BlockToggleButton = ({ user }: { user: IUser }) => {
  const [state, formAction, isPending] = useActionState(updateUserStatus, null);
  const router = useRouter();

  useEffect(() => {
    if (!state) return;
    if (state.success) {
      router.refresh();
      toast.success(state.message ?? "Updated!");
    } else if (state.message) toast.error(state.message);
  }, [state, router]);

  const isBlocked = user.status === "BLOCKED";

  return (
    <form action={formAction}>
      <input type="hidden" name="userId" value={user.id} />
      <input
        type="hidden"
        name="action"
        value={isBlocked ? "ACTIVE" : "BLOCKED"}
      />
      <Button
        type="submit"
        variant="ghost"
        size="sm"
        disabled={isPending}
        className={cn(
          "h-8 px-3 text-xs font-medium gap-1.5 rounded-lg cursor-pointer",
          isBlocked
            ? "text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
            : "text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30",
        )}
      >
        {isBlocked ? (
          <ShieldCheck className="h-3.5 w-3.5" />
        ) : (
          <ShieldBan className="h-3.5 w-3.5" />
        )}
        {isPending ? "..." : isBlocked ? "Unblock" : "Block"}
      </Button>
    </form>
  );
};

// ─── User row ─────────────────────────────────────────────────
const UserRow = ({ user }: { user: IUser }) => (
  <div className="flex items-center gap-3 py-3">
    {/* Avatar */}
    <div className="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-950/40 flex items-center justify-center shrink-0 text-sm font-bold text-blue-600 dark:text-blue-400">
      {user.name.charAt(0).toUpperCase()}
    </div>

    {/* Info */}
    <div className="flex-1 overflow-hidden min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <p className="text-sm font-medium truncate">{user.name}</p>
        {/* Status badge */}
        <Badge
          className={cn(
            "text-[10px] px-1.5 py-0 border-0",
            user.status === "ACTIVE"
              ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400"
              : "bg-red-100 dark:bg-red-950/40 text-red-600",
          )}
        >
          {user.status}
        </Badge>
        {/* Role badge (clickable dropdown) */}
        <RoleChangeDropdown user={user} />
      </div>
      <p className="text-xs text-muted-foreground truncate">{user.email}</p>
      <p className="text-xs text-muted-foreground">
        {user.phone}
        {user.wallet?.balance !== undefined && (
          <>
            {" "}
            ·{" "}
            <span className="font-medium text-foreground">
              ৳{Number(user.wallet.balance).toLocaleString()}
            </span>
          </>
        )}
      </p>
    </div>

    {/* Actions */}
    <div className="shrink-0 text-right flex flex-col items-end gap-1">
      <p className="text-xs text-muted-foreground">
        {new Date(user.createdAt).toLocaleDateString("en-BD", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })}
      </p>
      <BlockToggleButton user={user} />
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────
const AdminUsersContent = ({ users, meta }: AdminUsersContentProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("searchTerm") ?? "");


  const activeStatus = searchParams.get("status") ?? "All";
  const currentPage = Number(searchParams.get("page") ?? 1);

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "All") params.set(key, value);
    else params.delete(key);
    // reset to page 1 on filter change
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilter("searchTerm", search);
  };

  const clearAll = () => {
    setSearch("");
    router.push(pathname);
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    <div className="space-y-4">
      {/* Filter card */}
      <Card>
        <CardContent className="p-4 space-y-3">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                placeholder="Search by name, email or phone..."
                className="pl-9 h-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              type="submit"
              size="sm"
              className="h-9 bg-blue-600 hover:bg-blue-700 text-white shrink-0"
            >
              Search
            </Button>
            {hasFilters && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-9 shrink-0"
                onClick={clearAll}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </form>

          {/* Status filter pills */}
          <div className="flex gap-1.5 flex-wrap">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => handleFilter("status", s)}
                className={cn(
                  "rounded-full border px-3 py-1 text-xs font-medium transition-all",
                  activeStatus === s ||
                    (s === "All" && !searchParams.get("status"))
                    ? "bg-blue-600 text-white border-blue-600"
                    : "border-border text-muted-foreground hover:bg-muted",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Users list */}
      <Card>
        <CardContent className="p-4">
          <p className="text-sm font-medium mb-3">
            {meta?.total ?? users.length} user
            {(meta?.total ?? users.length) !== 1 ? "s" : ""}
          </p>

          {users.length === 0 ? (
            <div className="py-14 text-center">
              <User className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">No users found</p>
            </div>
          ) : (
            <>
              {users.map((user, idx) => (
                <div key={user.id}>
                  <UserRow user={user} />
                  {idx < users.length - 1 && <Separator />}
                </div>
              ))}

              {/* Pagination */}
              {meta && meta.total > meta.limit && (
                <div className="mt-4 pt-4 border-t">
                  <AppPagination
                    total={meta.total}
                    page={currentPage}
                    limit={meta.limit}
                  />
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminUsersContent;

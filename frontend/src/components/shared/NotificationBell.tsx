"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell, CheckCheck, Trash2, ArrowUpRight, ArrowDownLeft, Star, Shield, CreditCard } from "lucide-react";
import { useNotifications, INotification, NotificationType } from "@/context/NotificationContext";
import { cn } from "@/lib/utils";

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

function NotifIcon({ type, direction }: { type: NotificationType; direction?: string }) {
  const base = "w-9 h-9 rounded-full flex items-center justify-center shrink-0";
  if (type === "transaction") {
    if (direction === "sent")
      return <div className={cn(base, "bg-red-50 text-red-500")}><ArrowUpRight className="w-4 h-4" /></div>;
    return <div className={cn(base, "bg-green-50 text-green-600")}><ArrowDownLeft className="w-4 h-4" /></div>;
  }
  if (type === "application")
    return <div className={cn(base, "bg-pink-50 text-pink-600")}><Star className="w-4 h-4" /></div>;
  if (type === "balance_request")
    return <div className={cn(base, "bg-blue-50 text-blue-600")}><CreditCard className="w-4 h-4" /></div>;
  return <div className={cn(base, "bg-orange-50 text-orange-500")}><Shield className="w-4 h-4" /></div>;
}

function NotifItem({ notif, onNavigate }: { notif: INotification; onNavigate: (href?: string) => void }) {
  return (
    <div
      onClick={() => onNavigate(notif.href)}
      className={cn(
        "relative flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors",
        "hover:bg-muted/50 border-b border-border/50 last:border-0",
        !notif.isRead && "bg-muted/30",
        notif.href && "hover:bg-primary/5",
      )}
    >
      {!notif.isRead && (
        <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-r-full bg-primary" />
      )}
      <NotifIcon type={notif.type} direction={notif.direction} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-foreground truncate">{notif.title}</p>
          {notif.amount && (
            <span className={cn(
              "text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0",
              notif.direction === "sent" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700",
            )}>
              ৳{notif.amount.toFixed(2)}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{notif.message}</p>
        {notif.href && <p className="text-[10px] text-primary/60 mt-0.5">Tap to view →</p>}
      </div>
      <span className="text-[10px] text-muted-foreground shrink-0 mt-0.5">{timeAgo(notif.createdAt)}</span>
    </div>
  );
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, markAllRead, clearAll } = useNotifications();
  const panelRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        !bellRef.current?.contains(e.target as Node)
      ) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // ✅ Notification click → mark read + navigate
  const handleNavigate = (href?: string) => {
    markAllRead();
    setOpen(false);
    if (href) router.push(href);
  };

  return (
    <div className="relative">
      <button
        ref={bellRef}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "relative flex items-center justify-center w-9 h-9 rounded-lg border",
          "bg-background hover:bg-muted transition-colors",
          open && "bg-muted",
        )}
        aria-label="Notifications"
      >
        <Bell className="w-4 h-4 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-bold border-2 border-background leading-none">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          className={cn(
            "absolute right-0 top-11 z-50 w-[340px] sm:w-[380px]",
            "bg-background border border-border rounded-xl shadow-xl overflow-hidden",
            "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-150",
          )}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold">Notifications</h3>
              {unreadCount > 0 && (
                <span className="text-[10px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button onClick={markAllRead} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-primary px-2 py-1 rounded-md hover:bg-muted transition-colors">
                  <CheckCheck className="w-3 h-3" /> Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={clearAll} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-destructive px-2 py-1 rounded-md hover:bg-muted transition-colors">
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          <div className="overflow-y-auto max-h-[400px]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">All caught up!</p>
                <p className="text-xs text-muted-foreground mt-1">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => <NotifItem key={n.id} notif={n} onNavigate={handleNavigate} />)
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t border-border px-4 py-2.5 bg-muted/30">
              <p className="text-[11px] text-muted-foreground text-center">
                Showing last {notifications.length} notification{notifications.length > 1 ? "s" : ""}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
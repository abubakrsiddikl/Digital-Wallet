"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { IUser } from "@/types/auth.type";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { logoutUser } from "@/services/auth/auth.api";

// ─── Nav menu config ──────────────────────────────────────────
const PUBLIC_NAV = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/#features" },
  { label: "Pricing", path: "/#pricing" },
  { label: "About", path: "/#about" },
];

// ─── Icons ────────────────────────────────────────────────────
const Icons = {
  Logo: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="10" fill="#0F6E56" />
      <path
        d="M8 10h16M16 10v12M10 22h12"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  ),
  Moon: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  ),
  Sun: () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
    </svg>
  ),
  Menu: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Eye: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  Dashboard: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  ),
  Logout: () => (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
};

// ─── Balance pill — ONLY toggles, never navigates ─────────────
import { Button } from "@/components/ui/button";

const BalancePill = ({ balance }: { balance: number }) => {
  const [show, setShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggle = () => {
    setShow((prev) => {
      const next = !prev;

      if (timerRef.current) clearTimeout(timerRef.current);

      if (next) {
        timerRef.current = setTimeout(() => setShow(false), 5000);
      }

      return next;
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleToggle}
      className="flex items-center gap-2 rounded-xl px-3 h-9 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40"
    >
      <span className="text-xs opacity-70">৳</span>

      {show ? (
        <span className="tabular-nums font-semibold">
          {balance.toLocaleString("bn-BD")}
        </span>
      ) : (
        <span className="tracking-widest text-xs opacity-70">••••••</span>
      )}

      <span className="opacity-60">
        {show ? <Icons.EyeOff /> : <Icons.Eye />}
      </span>
    </Button>
  );
};

// ─── Main Navbar ──────────────────────────────────────────────
export default function NavbarContent({ user }: { user: IUser | null }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const isLoggedIn = !!user?.email;
  const dashboardRoute = isLoggedIn
    ? (getDefaultDashboardRoute(user.role) as string)
    : "/login";

  useEffect(() => {
    const rafId = requestAnimationFrame(() => setMounted(true));
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setMenuOpen(false);
  };
  const balance = user?.wallet?.balance;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <Icons.Logo />
          <span className="text-xl font-bold tracking-tight text-foreground">
            Takaa
          </span>
        </Link>

        {/* Desktop center — public nav always visible */}
        <div className="hidden md:flex items-center gap-1">
          {PUBLIC_NAV.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          {/* Theme toggle */}
          {mounted && (
            <button
              className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          )}

          {isLoggedIn ? (
            <>
              {/* ① Balance pill — toggle only, no link */}
              {/* {typeof user?.wallet?.balance === "number" && (
                <BalancePill balance={user.wallet.balance} />
              )} */}
              <BalancePill balance={parseInt(user?.wallet?.balance as string)} />

              {/* ② Dashboard button — this navigates */}
              <Link
                href={dashboardRoute}
                className="flex items-center gap-2 rounded-xl border px-3 py-1.5 text-sm font-medium hover:bg-accent transition-all"
              >
                <Button
                  variant="outline"
                  className="flex items-center gap-2 rounded-xl h-9 px-3"
                >
                  <span className="h-6 w-6 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center text-xs font-bold text-emerald-700 dark:text-emerald-300">
                    {user.name.charAt(0).toUpperCase()}
                  </span>

                  <span className="max-w-[80px] truncate">{user.name}</span>

                  <Icons.Dashboard />
                </Button>
              </Link>

              {/* ③ Logout */}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 rounded-xl border border-red-200 dark:border-red-900 px-3 py-1.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all cursor-pointer"
              >
                <Icons.Logout />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl border px-4 py-1.5 text-sm font-medium hover:bg-accent transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl px-4 py-1.5 text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile right */}
        <div className="md:hidden flex items-center gap-1 ml-auto">
          {isLoggedIn && typeof user?.wallet?.balance === "number" && (
            <BalancePill balance={parseInt(balance as string)} />
          )}
          {mounted && (
            <button
              className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-all"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
            </button>
          )}
          <button
            className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-md px-4 py-4 flex flex-col gap-1">
          {/* User info */}
          {isLoggedIn && (
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 mb-1">
              <span className="h-9 w-9 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center font-bold text-emerald-700 dark:text-emerald-300 shrink-0">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>
              <span className="text-xs capitalize rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 font-medium shrink-0">
                {user.role.toLowerCase()}
              </span>
            </div>
          )}

          {/* Public nav — always visible */}
          {PUBLIC_NAV.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-all"
            >
              {link.label}
            </Link>
          ))}

          <Separator className="my-2" />

          {isLoggedIn ? (
            <div className="flex flex-col gap-2">
              <Link
                href={dashboardRoute}
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-medium hover:bg-accent transition-all"
              >
                <Icons.Dashboard />
                Go to Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-200 dark:border-red-900 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
              >
                <Icons.Logout />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl border py-2.5 text-sm font-medium text-center hover:bg-accent transition-all"
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl py-2.5 text-sm font-semibold text-center bg-emerald-600 hover:bg-emerald-700 text-white transition-all"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

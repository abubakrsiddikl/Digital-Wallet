"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import { IUser } from "@/types/auth.type";
import { getDefaultDashboardRoute } from "@/utils/auth-utils";
import { logoutUser } from "@/services/auth/auth.api";

// ─── Nav menu config ──────────────────────────────────────────
const PUBLIC_NAV = [
  { label: "Home", path: "/" },
  { label: "Features", path: "/features" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

// ─── Icons ────────────────────────────────────────────────────
const Icons = {
  Logo: () => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
      <rect width="34" height="34" rx="11" fill="url(#logoGrad)" />
      <path
        d="M9 11h16M17 11v12M11 23h12"
        stroke="#fff"
        strokeWidth="2.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#059669" />
          <stop offset="1" stopColor="#047857" />
        </linearGradient>
      </defs>
    </svg>
  ),
  Moon: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  ),
  Sun: () => (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  ),
  Menu: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Eye: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  EyeOff: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  ),
  Dashboard: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  Logout: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  ),
  Wallet: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
      <path d="M16 3.13a4 4 0 010 7.75" />
      <circle cx="17" cy="13" r="1" fill="currentColor" />
    </svg>
  ),
  ChevronRight: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

// ─── Balance Pill ─────────────────────────────────────────────
const BalancePill = ({ balance }: { balance: number }) => {
  const [show, setShow] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const handleToggle = () => {
    setShow((prev) => {
      const next = !prev;
      if (timerRef.current) clearTimeout(timerRef.current);
      if (next) timerRef.current = setTimeout(() => setShow(false), 5000);
      return next;
    });
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <button
      type="button"
      onClick={handleToggle}
      className="
        group flex items-center gap-2 rounded-xl px-3 h-9
        border border-emerald-500/25
        bg-emerald-50 dark:bg-emerald-950/50
        text-emerald-700 dark:text-emerald-400
        hover:bg-emerald-100 dark:hover:bg-emerald-900/50
        hover:border-emerald-500/40
        transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50
      "
    >
      <Icons.Wallet />
      <span className="text-xs font-medium opacity-70">৳</span>
      {show ? (
        <span className="tabular-nums text-sm font-semibold tracking-tight cursor-pointer">
          {Number(balance).toFixed(2)}
        </span>
      ) : (
        <span className="tracking-widest text-xs opacity-50 select-none cursor-pointer">••••••</span>
      )}
      <span className="opacity-50 group-hover:opacity-80 transition-opacity">
        {show ? <Icons.EyeOff /> : <Icons.Eye />}
      </span>
    </button>
  );
};

// ─── NavLink (desktop) with active state ──────────────────────
const NavLink = ({ href, label }: { href: string; label: string }) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      className={`
        relative px-4 py-2 text-base font-medium rounded-lg transition-all duration-200
        ${isActive
          ? "text-black dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/95"
          : "hover:text-foreground hover:bg-accent"
        }
      `}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-emerald-500" />
      )}
    </Link>
  );
};

// ─── Mobile NavLink with active state ────────────────────────
const MobileNavLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick: () => void;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
        ${isActive
          ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20"
          : "text-muted-foreground hover:text-foreground hover:bg-accent"
        }
      `}
    >
      <span>{label}</span>
      {isActive && (
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
      )}
    </Link>
  );
};

// ─── Avatar Chip ──────────────────────────────────────────────
const AvatarChip = ({ name }: { name: string }) => (
  <span className="
    h-7 w-7 rounded-full shrink-0
    bg-gradient-to-br from-emerald-400 to-emerald-600
    dark:from-emerald-500 dark:to-emerald-700
    flex items-center justify-center
    text-xs font-bold text-white
    ring-2 ring-white/30 dark:ring-black/30
  ">
    {name.charAt(0).toUpperCase()}
  </span>
);

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
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Close mobile menu on route change
  const pathname = usePathname();
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLogout = async () => {
    await logoutUser();
    setMenuOpen(false);
  };

  const balance = user?.wallet?.balance;

  return (
    <>
      <nav
        className={`
          sticky top-0 z-50 w-full
          transition-all duration-300
          ${scrolled
            ? "bg-background/85 backdrop-blur-xl border-b border-border/60 shadow-sm shadow-black/5"
            : "bg-transparent"
          }
        `}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center gap-3">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <span className="transition-transform duration-200 group-hover:scale-105">
              <Icons.Logo />
            </span>
            <span className="text-[1.3rem] font-bold tracking-tight text-foreground">
              Takaa
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          
          <div className="max-md:hidden md:flex  items-center gap-0.5 ml-6">
            {PUBLIC_NAV.map((link) => (
              <NavLink key={link.path} href={link.path} label={link.label} />
            ))}
          </div>

          {/* ── Desktop right ── */}
          <div className="max-md:hidden md:flex items-center gap-2 ml-auto">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="
                  h-9 w-9 flex items-center justify-center rounded-lg
                  text-muted-foreground hover:text-foreground
                  hover:bg-accent transition-all duration-200
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50
                "
              >
                {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
              </button>
            )}

            {isLoggedIn ? (
              <>
                {/* Balance pill */}
                <BalancePill balance={parseInt(balance as string) || 0} />

                {/* Dashboard */}
                <Link
                  href={dashboardRoute}
                  className="
                    flex items-center gap-2 rounded-xl border border-border/70
                    bg-background hover:bg-accent
                    px-3 h-9 text-sm font-medium
                    transition-all duration-200
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50
                  "
                >
                  <AvatarChip name={user.name} />
                  <span className="max-w-[84px] truncate">{user.name}</span>
                  <span className="text-muted-foreground">
                    <Icons.Dashboard />
                  </span>
                </Link>

              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="
                    rounded-xl border border-border/70 px-4 h-9 flex items-center
                    text-sm font-medium hover:bg-accent transition-all duration-200
                  "
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="
                    rounded-xl px-4 h-9 flex items-center
                    text-sm font-semibold
                    bg-emerald-600 hover:bg-emerald-700
                    active:bg-emerald-800
                    text-white transition-all duration-200
                    shadow-sm shadow-emerald-900/20
                  "
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile right controls ── */}
          <div className="md:hidden flex items-center gap-1.5 ml-auto">
            {isLoggedIn && (
              <BalancePill balance={parseInt(balance as string) || 0} />
            )}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-all"
              >
                {theme === "dark" ? <Icons.Sun /> : <Icons.Moon />}
              </button>
            )}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              className="h-9 w-9 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-accent transition-all"
            >
              <span
                className="transition-all duration-200"
                style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)" }}
              >
                {menuOpen ? <Icons.X /> : <Icons.Menu />}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile Drawer Overlay ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Drawer ── */}
      <div
        className={`
          fixed top-16 left-0 right-0 z-50 md:hidden
          border-b border-border/50
          bg-background/98 dark:bg-background/98
          backdrop-blur-xl
          transition-all duration-300 ease-in-out
          ${menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
          }
        `}
      >
        <div className="px-4 py-4 flex flex-col gap-2 max-h-[calc(100dvh-4rem)] overflow-y-auto">

          {/* User card */}
          {isLoggedIn && (
            <div className="
              flex items-center gap-3 rounded-2xl
              bg-gradient-to-r from-emerald-50 to-emerald-50/50
              dark:from-emerald-950/60 dark:to-emerald-950/20
              border border-emerald-500/15
              px-4 py-3.5 mb-1
            ">
              <span className="
                h-10 w-10 rounded-full shrink-0
                bg-gradient-to-br from-emerald-400 to-emerald-600
                flex items-center justify-center
                font-bold text-base text-white
                ring-2 ring-white/30 dark:ring-black/30
              ">
                {user.name.charAt(0).toUpperCase()}
              </span>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-semibold truncate text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate mt-0.5">{user.email}</p>
              </div>
              <span className="
                text-xs capitalize rounded-lg
                bg-emerald-100 dark:bg-emerald-900/60
                text-emerald-700 dark:text-emerald-300
                px-2.5 py-1 font-semibold shrink-0
                border border-emerald-200/50 dark:border-emerald-700/30
              ">
                {user.role.toLowerCase()}
              </span>
            </div>
          )}

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {PUBLIC_NAV.map((link) => (
              <MobileNavLink
                key={link.path}
                href={link.path}
                label={link.label}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </div>

          <Separator className="my-1" />

          {/* Auth actions */}
          {isLoggedIn ? (
            <div className="flex flex-col gap-2 pb-2">
              <Link
                href={dashboardRoute}
                onClick={() => setMenuOpen(false)}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl border border-border/70
                  py-3 text-sm font-medium
                  hover:bg-accent transition-all duration-200
                "
              >
                <Icons.Dashboard />
                Go to Dashboard
                <span className="ml-auto text-muted-foreground">
                  <Icons.ChevronRight />
                </span>
              </Link>
            
            </div>
          ) : (
            <div className="flex flex-col gap-2 pb-2">
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="
                  rounded-xl border border-border/70 py-3
                  text-sm font-medium text-center
                  hover:bg-accent transition-all duration-200
                "
              >
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setMenuOpen(false)}
                className="
                  rounded-xl py-3 text-sm font-semibold text-center
                  bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800
                  text-white transition-all duration-200
                  shadow-sm shadow-emerald-900/20
                "
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
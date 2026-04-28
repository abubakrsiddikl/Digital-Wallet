"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";



const Icons = {
  Logo: () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="10" fill="#0F6E56" />
      <path d="M8 10h16M16 10v12M10 22h12" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  ),
  Moon: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
    </svg>
  ),
  Sun: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
    </svg>
  ),
  Send: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  ),
  Shield: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  ),
  Zap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Activity: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
  ),
  ArrowRight: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
    </svg>
  ),
  Check: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  Twitter: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  ),
  Github: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  Linkedin: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 px-4 sm:px-6">
      {/* Subtle background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* Left: text */}
        <div className="flex flex-col gap-6">
          <Badge
            variant="secondary"
            className="w-fit px-3 py-1 text-xs font-medium rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800"
          >
            Trusted by 500K+ users in Bangladesh
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            Send Money{" "}
            <span className="text-emerald-600 dark:text-emerald-500">
              Instantly
            </span>{" "}
            &amp; Securely
          </h1>

          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg">
            Takaa is Bangladesh&apos;s most trusted digital wallet. Send money,
            pay bills, and manage your finances — all in one place, with
            bank-grade security.
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Button
              size="lg"
              className="rounded-xl px-6 bg-emerald-600 hover:bg-emerald-700 text-white border-0 h-12 text-base font-semibold"
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl px-6 h-12 text-base gap-2"
            >
              <Icons.Send />
              Send Money
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-5 pt-2">
            {["No hidden fees", "Instant transfer", "256-bit encryption"].map(
              (item) => (
                <div key={item} className="flex items-center gap-1.5">
                  <span className="flex items-center justify-center w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-400">
                    <Icons.Check />
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Right: wallet UI mockup */}
        <div className="flex justify-center lg:justify-end">
          <WalletMockup />
        </div>
      </div>
    </section>
  );
}

// wallet UI mockup component
function WalletMockup() {
  const txns = [
    { name: "Rahim Uddin", type: "Cash In", amount: "+৳2,500", color: "text-emerald-600" },
    { name: "Nadia Islam", type: "Send Money", amount: "-৳800", color: "text-red-500" },
    { name: "Agent – Gulshan", type: "Cash Out", amount: "-৳5,000", color: "text-red-500" },
    { name: "Karim Ahmed", type: "Cash In", amount: "+৳1,200", color: "text-emerald-600" },
  ];

  return (
    <div className="relative w-full max-w-[320px]">
      {/* Decorative card behind */}
      <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl bg-emerald-100 dark:bg-emerald-900/30 -z-10" />

      <div className="rounded-3xl border border-border bg-card shadow-xl overflow-hidden">
        {/* Wallet header */}
        <div className="bg-emerald-600 p-5 pb-8">
          <div className="flex items-center justify-between mb-6">
            <span className="text-emerald-100 text-sm font-medium">My Wallet</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-300" />
              <div className="w-2 h-2 rounded-full bg-emerald-200" />
            </div>
          </div>
          <p className="text-emerald-100 text-xs mb-1">Total Balance</p>
          <p className="text-white text-3xl font-bold tracking-tight">৳ 24,830.00</p>
          <p className="text-emerald-200 text-xs mt-1">+৳2,500 this week</p>
        </div>

        {/* Quick actions */}
        <div className="px-4 -mt-4">
          <div className="bg-card rounded-2xl border border-border shadow-sm p-3 grid grid-cols-3 gap-2">
            {[
              { label: "Send", icon: "→" },
              { label: "Cash In", icon: "↓" },
              { label: "Cash Out", icon: "↑" },
            ].map((action) => (
              <button
                key={action.label}
                className="flex flex-col items-center gap-1.5 py-2 px-1 rounded-xl hover:bg-accent transition-colors"
              >
                <span className="w-9 h-9 rounded-full bg-emerald-50 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-base font-bold">
                  {action.icon}
                </span>
                <span className="text-xs font-medium text-foreground">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="px-4 pt-4 pb-5">
          <p className="text-xs font-semibold text-muted-foreground mb-3 uppercase tracking-wider">
            Recent Transactions
          </p>
          <div className="flex flex-col gap-3">
            {txns.map((t, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground leading-tight">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.type}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${t.color}`}>{t.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
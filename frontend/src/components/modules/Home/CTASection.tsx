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
 
};

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-foreground dark:bg-card border border-border p-10 sm:p-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-background dark:text-foreground tracking-tight mb-4">
            Start using Takaa today
          </h2>
          <p className="text-background/60 dark:text-muted-foreground mb-8 max-w-md mx-auto">
            Join 500,000+ Bangladeshis who trust Takaa for their daily
            transactions. Free to sign up, instant to use.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              size="lg"
              className="rounded-xl h-12 px-8 text-base bg-emerald-600 hover:bg-emerald-700 text-white border-0 font-semibold"
            >
              Create Free Account
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-xl h-12 px-8 text-base gap-2 border-background/20 dark:border-border text-background dark:text-foreground hover:bg-background/10 dark:hover:bg-accent"
            >
              Learn More <Icons.ArrowRight />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
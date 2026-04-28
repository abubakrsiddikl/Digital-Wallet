import { Badge } from "@/components/ui/badge";



export default function AppPreviewSection() {
  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto text-center">
        <Badge variant="outline" className="mb-4 rounded-full px-3 text-xs">
          App Preview
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
          Designed for simplicity
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-12">
          A clean, intuitive interface so anyone can send money — regardless of tech experience.
        </p>

        {/* Phone mockup */}
        <div className="flex justify-center">
          <div className="w-[280px] rounded-[40px] border-[6px] border-foreground/10 bg-card shadow-2xl overflow-hidden">
            <div className="bg-emerald-600 px-5 pt-8 pb-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-emerald-100 text-xs">Good morning</p>
                  <p className="text-white font-bold text-base">Karim Ahmed</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-emerald-400 flex items-center justify-center text-white text-xs font-bold">
                  KA
                </div>
              </div>
              <div className="bg-emerald-500/50 rounded-2xl p-4">
                <p className="text-emerald-100 text-xs">Wallet Balance</p>
                <p className="text-white text-2xl font-bold">৳ 24,830</p>
                <div className="flex gap-1 mt-2">
                  <div className="h-1 w-8 rounded-full bg-emerald-300" />
                  <div className="h-1 w-4 rounded-full bg-emerald-400" />
                  <div className="h-1 w-6 rounded-full bg-emerald-400" />
                </div>
              </div>
            </div>

            <div className="px-4 -mt-5">
              <div className="bg-card rounded-2xl border border-border shadow-sm p-3 grid grid-cols-3 gap-1 mb-4">
                {["Send", "Cash In", "More"].map((a) => (
                  <div key={a} className="flex flex-col items-center py-2 gap-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/30" />
                    <span className="text-[10px] text-muted-foreground">{a}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs font-semibold text-muted-foreground mb-2">Recent</p>
              {["Rahim — +৳2,500", "Nadia — -৳800"].map((t, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-2 border-b border-border last:border-0"
                >
                  <div className="w-7 h-7 rounded-full bg-muted flex-shrink-0" />
                  <p className="text-xs text-foreground">{t}</p>
                </div>
              ))}
              <div className="h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
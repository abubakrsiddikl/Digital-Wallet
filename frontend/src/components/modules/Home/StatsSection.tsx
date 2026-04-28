

export default function StatsSection() {
  const stats = [
    { value: "500K+", label: "Active Users" },
    { value: "৳2.4B+", label: "Transactions Processed" },
    { value: "99.99%", label: "System Uptime" },
    { value: "500+", label: "Agent Points" },
  ];

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-3xl bg-emerald-600 dark:bg-emerald-700 p-8 sm:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white">{s.value}</p>
                <p className="text-emerald-100 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
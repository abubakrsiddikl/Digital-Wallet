"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  Shield,
  Send,
  ArrowDownLeft,
  ArrowUpRight,
  Smartphone,
  BarChart3,
  Users,
  ShieldCheck,
  Clock,
  RefreshCw,
  Bell,
  ChevronRight,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Send,
    title: "Instant Send Money",
    description:
      "Transfer funds to any user instantly with real-time confirmation. Zero delays, zero hassle.",
    badge: "Real-time",
    color: "from-emerald-500 to-teal-600",
    for: "Users",
  },
  {
    icon: ArrowDownLeft,
    title: "Cash In / Cash Out",
    description:
      "Agents can seamlessly process cash deposits and withdrawals for customers across the network.",
    badge: "Agent Feature",
    color: "from-blue-500 to-indigo-600",
    for: "Agents",
  },
  {
    icon: ArrowUpRight,
    title: "Mobile Recharge",
    description:
      "Recharge any mobile number instantly directly from your wallet balance.",
    badge: "Utility",
    color: "from-violet-500 to-purple-600",
    for: "Users",
  },
  {
    icon: BarChart3,
    title: "Transaction History",
    description:
      "Full statement and transaction logs with filtering, export, and real-time updates.",
    badge: "Analytics",
    color: "from-orange-500 to-amber-600",
    for: "All Roles",
  },
  {
    icon: ShieldCheck,
    title: "Admin Controls",
    description:
      "Complete oversight — manage users, agents, balance, commissions, and audit logs in one panel.",
    badge: "Admin Only",
    color: "from-rose-500 to-pink-600",
    for: "Admin",
  },
  {
    icon: Users,
    title: "Agent Network",
    description:
      "A distributed agent ecosystem with balance requests, commission tracking, and approval flows.",
    badge: "Network",
    color: "from-cyan-500 to-sky-600",
    for: "Agents",
  },
  {
    icon: Bell,
    title: "Real-time Notifications",
    description:
      "Live updates via WebSocket — know the moment any transaction happens.",
    badge: "Live",
    color: "from-lime-500 to-green-600",
    for: "All Roles",
  },
  {
    icon: RefreshCw,
    title: "Balance Management",
    description:
      "Admins maintain full control over system balance and can oversee all financial flows.",
    badge: "Control",
    color: "from-fuchsia-500 to-pink-600",
    for: "Admin",
  },
  {
    icon: Clock,
    title: "Instant Processing",
    description:
      "All operations — from send money to balance requests — process in milliseconds.",
    badge: "Speed",
    color: "from-yellow-500 to-orange-500",
    for: "All Roles",
  },
];

const stats = [
  { value: "3", label: "User Roles", sub: "User • Agent • Admin" },
  { value: "20+", label: "Features", sub: "Across all dashboards" },
  { value: "100%", label: "Real-time", sub: "WebSocket powered" },
  { value: "∞", label: "Scalable", sub: "Production ready" },
];

export default function FeaturesPage() {
  const [activeFilter, setActiveFilter] = useState("All Roles");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

  const filters = ["All Roles", "Users", "Agents", "Admin"];
  const filtered =
    activeFilter === "All Roles"
      ? features
      : features.filter(
          (f) => f.for === activeFilter || f.for === "All Roles"
        );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-blue-500/10 dark:from-emerald-500/5 dark:to-blue-500/5 pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />

        <div
          className={`max-w-4xl mx-auto text-center relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Badge
            variant="outline"
            className="mb-4 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 px-4 py-1"
          >
            <Zap className="w-3 h-3 mr-1 inline" /> Powered by Real-time
            Technology
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            Everything Your
            <span className="block bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              Digital Wallet Needs
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            A complete financial ecosystem for Users, Agents, and Admins — with
            real-time transactions, intelligent dashboards, and enterprise-grade
            security.
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white shadow-lg shadow-emerald-500/25"
          >
            <Wallet className="mr-2 h-4 w-4" />
            Get Started Free
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-y border-border/50 bg-muted/30">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-foreground mb-1">
                {stat.value}
              </div>
              <div className="font-semibold text-sm text-foreground/80">
                {stat.label}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">
                {stat.sub}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Explore by Role
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {filters.map((f) => (
                <Button
                  key={f}
                  variant={activeFilter === f ? "default" : "outline"}
                  size="sm"
                  onClick={() => setActiveFilter(f)}
                  className={
                    activeFilter === f
                      ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0"
                      : ""
                  }
                >
                  {f}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={i}
                  className="group hover:shadow-lg transition-all duration-300 border border-border/60 hover:border-emerald-500/30 bg-card hover:-translate-y-0.5"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className={`p-2.5 rounded-xl bg-gradient-to-br ${feature.color} shadow-lg`}
                      >
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {feature.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-base font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs text-muted-foreground">
                        For: {feature.for}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Security Banner */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/30 mb-6">
            <Shield className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Enterprise-Grade Security
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Every transaction is protected with role-based access control, audit
            logs, and real-time monitoring. Your financial data is always safe.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Role-based Access",
              "Audit Logs",
              "Real-time Monitoring",
              "Secure API",
            ].map((item) => (
              <Badge
                key={item}
                variant="outline"
                className="px-4 py-1.5 border-emerald-500/40 text-emerald-700 dark:text-emerald-300"
              >
                <ShieldCheck className="w-3 h-3 mr-1.5 inline" />
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Wallet,
  Heart,
  Code2,
  Globe,
  Rocket,
  ShieldCheck,
  Users,
  Zap,
  ArrowRight,
  ExternalLink,
  Star,
} from "lucide-react";

import profileImage from '../../../../public/profile.jpg'

const values = [
  {
    icon: ShieldCheck,
    title: "Security First",
    description:
      "Every feature is built with security at its core. Role-based access, audit logs, and real-time monitoring ensure your money is always protected.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Real-time Everything",
    description:
      "Built on WebSocket technology, every transaction, notification, and update happens instantly — no page refresh needed.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "Built for Everyone",
    description:
      "Designed for three distinct roles — Users, Agents, and Admins — each with a tailored experience that fits their needs perfectly.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Globe,
    title: "Accessible Anywhere",
    description:
      "Fully responsive across all devices. Whether on mobile, tablet, or desktop — the experience is consistently excellent.",
    color: "from-orange-500 to-amber-500",
  },
];

const milestones = [
  {
    year: "2024",
    title: "Project Inception",
    description:
      "Started development with a vision to build a production-grade digital wallet for Bangladesh.",
  },
  {
    year: "2024",
    title: "Core Architecture",
    description:
      "Established the three-role system (User, Agent, Admin) with real-time WebSocket infrastructure.",
  },
  {
    year: "2025",
    title: "Feature Complete",
    description:
      "Launched all 20+ features including send money, cash in/out, recharge, and complete admin controls.",
  },
  {
    year: "2025",
    title: "Production Ready",
    description:
      "Achieved production-grade stability with comprehensive audit logs, error handling, and security layers.",
  },
];

const techStack = [
  { name: "TypeScript", category: "Language" },
  { name: "Next.js 15", category: "Framework" },
  { name: "shadcn/ui", category: "UI Library" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Socket.io", category: "Real-time" },
  { name: "PostgresSQL", category: "Database" },
  { name: "JWT Auth", category: "Security" },
  { name: "Render", category: "Deployment" },
];

export default function AboutPage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/8 via-transparent to-violet-500/8 pointer-events-none" />
        <div className="absolute top-10 left-1/3 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

        <div
          className={`max-w-4xl mx-auto text-center relative transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-xl shadow-emerald-500/30 mb-6">
            <Wallet className="h-8 w-8 text-white" />
          </div>
          <Badge
            variant="outline"
            className="mb-4 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 px-4 py-1"
          >
            <Heart className="w-3 h-3 mr-1 inline fill-current" /> Built with
            passion in Bangladesh
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
            About
            <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {" "}
              Takaa
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A production-grade digital wallet platform that empowers
            individuals, agents, and businesses with real-time financial tools —
            built to make money movement simple, safe, and instant.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4 bg-muted/30 border-y border-border/50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <Badge variant="secondary" className="mb-4">
                Our Mission
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                Democratizing Financial Access for Everyone
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                SwiftPay was born from a simple belief: financial services
                should be fast, transparent, and available to everyone —
                regardless of where you are or what device you use.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We built a complete ecosystem where users can transact freely,
                agents can serve their communities profitably, and admins can
                manage everything with confidence and clarity.
              </p>
              <Button
                className="mt-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 hover:opacity-90"
                asChild
              >
                <a
                  href="https://abubakrsiddik-portfolio.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Developer Portfolio
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Users Supported", value: "3 Roles" },
                { label: "Features Built", value: "20+" },
                { label: "Real-time", value: "WebSocket" },
                { label: "Architecture", value: "Full-stack" },
              ].map((item, i) => (
                <Card
                  key={i}
                  className="bg-card border border-border/60 text-center"
                >
                  <CardContent className="pt-5 pb-4">
                    <div className="text-2xl font-black text-foreground mb-1">
                      {item.value}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.label}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Our Core Values</h2>
            <p className="text-muted-foreground mt-2">
              The principles that guide every decision we make
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <Card
                  key={i}
                  className="border border-border/60 bg-card hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                >
                  <CardContent className="pt-6 pb-5 flex gap-4">
                    <div
                      className={`flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-md`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1.5">{value.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold">Our Journey</h2>
            <p className="text-muted-foreground mt-2">
              From idea to production-ready platform
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500 via-teal-500 to-transparent" />
            <div className="space-y-8">
              {milestones.map((milestone, i) => (
                <div key={i} className="flex gap-6 relative">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/25 text-white text-xs font-bold z-10">
                    {milestone.year.slice(2)}
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm">{milestone.title}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {milestone.year}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Code2 className="h-8 w-8 mx-auto mb-3 text-emerald-500" />
            <h2 className="text-2xl md:text-3xl font-bold">Tech Stack</h2>
            <p className="text-muted-foreground mt-2">
              Modern, battle-tested technologies powering the platform
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techStack.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-2 bg-card border border-border/60 rounded-lg px-4 py-2.5 hover:border-emerald-500/40 transition-colors"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-sm font-semibold">{tech.name}</span>
                <Badge variant="secondary" className="text-xs">
                  {tech.category}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Developer CTA */}
      <section className="py-16 px-4 border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <Card className="border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 overflow-hidden">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-16 w-16 border-2 border-emerald-500/50 shadow-lg">
                  <AvatarImage src={profileImage.src} />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-lg">
                    AB
                  </AvatarFallback>
                </Avatar>
              </div>
              <Badge
                variant="outline"
                className="mb-3 border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
              >
                <Star className="w-3 h-3 mr-1 inline fill-current" /> Developer
              </Badge>
              <h3 className="text-xl font-bold mb-2">Abu Bakr Siddik</h3>
              <p className="text-muted-foreground text-sm mb-6 max-w-sm mx-auto">
                Full-stack developer passionate about building real-time
                financial applications with clean, scalable architecture.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Button
                  className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 hover:opacity-90"
                  asChild
                >
                  <a
                    href="https://abubakrsiddik-portfolio.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Rocket className="mr-2 h-4 w-4" />
                    View Portfolio
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a
                    href="https://github.com/abubakrsiddikl"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

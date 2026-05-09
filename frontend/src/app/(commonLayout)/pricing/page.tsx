"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Check,
  X,
  Zap,
  Crown,
  Building2,
  ChevronRight,
  HelpCircle,
  TrendingDown,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    id: "user",
    name: "Standard User",
    icon: Zap,
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for individuals managing personal finances",
    color: "from-blue-500 to-cyan-500",
    borderColor: "border-blue-500/30",
    glowColor: "shadow-blue-500/20",
    badge: null,
    features: [
      { text: "Send & receive money instantly", included: true },
      { text: "Mobile recharge", included: true },
      { text: "Transaction history (30 days)", included: true },
      { text: "Monthly statements", included: true },
      { text: "Real-time notifications", included: true },
      { text: "Cash-out via agents", included: true },
      { text: "Add money from bank", included: true },
      { text: "Agent features", included: false },
      { text: "Admin panel", included: false },
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    id: "agent",
    name: "Agent",
    icon: Crown,
    monthlyPrice: 499,
    yearlyPrice: 399,
    description: "For authorized agents running financial service points",
    color: "from-emerald-500 to-teal-500",
    borderColor: "border-emerald-500/60",
    glowColor: "shadow-emerald-500/30",
    badge: "Most Popular",
    features: [
      { text: "All Standard User features", included: true },
      { text: "Cash In / Cash Out processing", included: true },
      { text: "Balance request system", included: true },
      { text: "Commission tracking dashboard", included: true },
      { text: "Extended transaction history (90 days)", included: true },
      { text: "Agent-specific reports", included: true },
      { text: "Priority support", included: true },
      { text: "Multiple customer transactions/day", included: true },
      { text: "Admin panel", included: false },
    ],
    cta: "Become an Agent",
    popular: true,
  },
  {
    id: "admin",
    name: "Enterprise Admin",
    icon: Building2,
    monthlyPrice: 2999,
    yearlyPrice: 2399,
    description: "Complete control for platform owners and businesses",
    color: "from-violet-500 to-purple-600",
    borderColor: "border-violet-500/30",
    glowColor: "shadow-violet-500/20",
    badge: "Full Access",
    features: [
      { text: "All Agent features", included: true },
      { text: "User & agent management", included: true },
      { text: "Agent approval workflows", included: true },
      { text: "System balance overview", included: true },
      { text: "Commission settings", included: true },
      { text: "Full audit logs", included: true },
      { text: "Platform-wide settings", included: true },
      { text: "Unlimited transaction history", included: true },
      { text: "24/7 dedicated support", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  {
    q: "Is there a free trial for Agent plan?",
    a: "Yes! New agents get a 14-day free trial with full access to all agent features. No credit card required.",
  },
  {
    q: "How does commission work for agents?",
    a: "Agents earn commission on each cash-in and cash-out transaction. Commission rates are set by the admin and are visible in your agent dashboard in real-time.",
  },
  {
    q: "Can I upgrade or downgrade my plan?",
    a: "Absolutely. You can upgrade anytime and the change takes effect immediately. Downgrades apply at the end of your billing cycle.",
  },
  {
    q: "Are transactions free for standard users?",
    a: "Standard users can send and receive money with minimal processing fees. Mobile recharge, cash-out, and add-money operations may have small transaction fees.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major mobile banking (bKash, Nagad, Rocket), bank transfers, and debit/credit cards for plan subscriptions.",
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/8 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-16 right-1/3 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center">
          <Badge
            variant="outline"
            className="mb-4 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 px-4 py-1"
          >
            <TrendingDown className="w-3 h-3 mr-1 inline" /> Simple, Transparent
            Pricing
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            Choose Your
            <span className="block bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            From personal users to enterprise admins — transparent pricing with
            no hidden fees.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 bg-muted/60 rounded-full px-5 py-2.5 border border-border/50">
            <Label
              htmlFor="billing"
              className={`text-sm font-medium cursor-pointer ${!yearly ? "text-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </Label>
            <Switch
              id="billing"
              checked={yearly}
              onCheckedChange={setYearly}
            />
            <Label
              htmlFor="billing"
              className={`text-sm font-medium cursor-pointer flex items-center gap-1.5 ${yearly ? "text-foreground" : "text-muted-foreground"}`}
            >
              Yearly
              <Badge className="bg-emerald-500 text-white text-xs px-2 py-0">
                Save 20%
              </Badge>
            </Label>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div key={plan.id} className="relative">
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg shadow-emerald-500/30 px-4 py-1">
                      ⭐ {plan.badge}
                    </Badge>
                  </div>
                )}
                <Card
                  className={`h-full transition-all duration-300 ${plan.popular ? `border-2 ${plan.borderColor} shadow-xl ${plan.glowColor} scale-[1.02]` : `border ${plan.borderColor} hover:shadow-lg hover:-translate-y-0.5`} bg-card`}
                >
                  <CardHeader className="pb-4">
                    <div
                      className={`inline-flex w-11 h-11 rounded-xl bg-gradient-to-br ${plan.color} items-center justify-center shadow-md mb-3`}
                    >
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    {plan.badge && !plan.popular && (
                      <Badge variant="secondary" className="w-fit text-xs mb-1">
                        {plan.badge}
                      </Badge>
                    )}
                    <CardTitle className="text-xl font-bold">
                      {plan.name}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed">
                      {plan.description}
                    </CardDescription>
                    <div className="mt-3">
                      <div className="flex items-end gap-1">
                        <span className="text-sm text-muted-foreground font-medium">
                          ৳
                        </span>
                        <span className="text-4xl font-black tracking-tight">
                          {price === 0 ? "Free" : price.toLocaleString()}
                        </span>
                        {price > 0 && (
                          <span className="text-muted-foreground text-sm mb-1">
                            /{yearly ? "mo" : "mo"}
                          </span>
                        )}
                      </div>
                      {yearly && price > 0 && (
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
                          Billed ৳{(price * 12).toLocaleString()}/year
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-2.5">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        {feature.included ? (
                          <Check className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground/40 mt-0.5 flex-shrink-0" />
                        )}
                        <span
                          className={`text-sm ${feature.included ? "text-foreground/90" : "text-muted-foreground/50 line-through"}`}
                        >
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter className="pt-4">
                    <Button
                      className={`w-full font-semibold ${plan.popular ? `bg-gradient-to-r ${plan.color} text-white border-0 hover:opacity-90 shadow-lg` : "variant-outline"}`}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                      <ChevronRight className="ml-1.5 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature comparison note */}
      <section className="py-10 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            All plans include SSL encryption, 99.9% uptime SLA, and real-time
            transaction processing.{" "}
            <span className="text-emerald-600 dark:text-emerald-400 font-medium cursor-pointer hover:underline">
              See full comparison →
            </span>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 px-4 bg-muted/30 border-t border-border/50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <HelpCircle className="h-8 w-8 mx-auto mb-3 text-emerald-500" />
            <h2 className="text-2xl md:text-3xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          <Accordion type="single" collapsible className="space-y-2">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-border/60 rounded-xl px-1 bg-card"
              >
                <AccordionTrigger className="px-4 text-sm font-semibold hover:no-underline hover:text-emerald-600 dark:hover:text-emerald-400">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="px-4 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
}
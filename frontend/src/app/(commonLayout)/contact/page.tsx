"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageCircle,
  Mail,
  Send,
  CheckCircle2,
  Phone,
  Globe,
  ExternalLink,
  Loader2,
} from "lucide-react";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+880 1936 582963",
    description: "Quick replies within minutes",
    color: "from-green-500 to-emerald-600",
    href: "https://wa.me/8801936582963",
    cta: "Chat on WhatsApp",
    available: "Usually replies in < 5 min",
  },
  {
    icon: Mail,
    title: "Email",
    value: "abubakrsiddik.dev@gmail.com",
    description: "For detailed inquiries & proposals",
    color: "from-blue-500 to-indigo-600",
    href: "mailto:abubakrsiddik.dev@gmail.com",
    cta: "Send an Email",
    available: "Response within 24 hours",
  },
  {
    icon: Globe,
    title: "Portfolio",
    value: "abubakrsiddik-portfolio.vercel.app",
    description: "View my full work & projects",
    color: "from-violet-500 to-purple-600",
    href: "https://abubakrsiddik-portfolio.vercel.app/",
    cta: "Visit Portfolio",
    available: "Always available",
  },
];

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmitStatus = "idle" | "loading" | "success" | "error";

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setStatus("loading");

    // Simulate sending — replace with your actual API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // You can integrate EmailJS, Resend, or your own API here
    // Example with EmailJS:
    // await emailjs.send(serviceId, templateId, form, publicKey);

    setStatus("success");
    setForm({ name: "", email: "", subject: "", message: "" });

    setTimeout(() => setStatus("idle"), 5000);
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-emerald-500/8 pointer-events-none" />
        <div className="absolute top-20 right-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl mx-auto text-center relative">
          <Badge
            variant="outline"
            className="mb-4 border-emerald-500/50 text-emerald-600 dark:text-emerald-400 px-4 py-1"
          >
            <MessageCircle className="w-3 h-3 mr-1 inline" /> Let's Connect
          </Badge>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-5">
            Get in
            <span className="bg-gradient-to-r from-emerald-500 to-blue-500 bg-clip-text text-transparent">
              {" "}
              Touch
            </span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have a question, proposal, or just want to say hello? Reach out
            through any channel below — I'm always happy to connect.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-8 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {contactMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <Card
                key={i}
                className="group border border-border/60 bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 hover:border-emerald-500/30"
              >
                <CardContent className="pt-6 pb-5">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${method.color} flex items-center justify-center shadow-md mb-4`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="font-bold mb-0.5">{method.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">
                    {method.description}
                  </p>
                  <p className="text-sm font-medium text-foreground/90 mb-1 break-all">
                    {method.value}
                  </p>
                  <div className="flex items-center gap-1.5 mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">
                      {method.available}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    className={`w-full bg-gradient-to-r ${method.color} text-white border-0 hover:opacity-90`}
                    asChild
                  >
                    <a
                      href={method.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                      {method.cta}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Main Content: Form + Info */}
      {/* Main Content: Form + Info */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6 items-stretch">
          {/* Form */}
          <div className="lg:col-span-3 flex">
            <Card className="w-full border border-border/60 bg-card shadow-sm flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Send className="h-5 w-5 text-emerald-500" />
                  Send a Message
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1">
                {/* form content */}
                {isSuccess ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    {" "}
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center mb-4">
                      {" "}
                      <CheckCircle2 className="h-8 w-8 text-emerald-500" />{" "}
                    </div>{" "}
                    <h3 className="text-lg font-bold mb-2">Message Sent!</h3>{" "}
                    <p className="text-sm text-muted-foreground max-w-xs">
                      {" "}
                      Thank you for reaching out. I'll get back to you as soon
                      as possible.{" "}
                    </p>{" "}
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {" "}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {" "}
                      <div className="space-y-1.5">
                        {" "}
                        <Label htmlFor="name" className="text-sm font-medium">
                          {" "}
                          Full Name <span className="text-red-500">*</span>{" "}
                        </Label>{" "}
                        <Input
                          id="name"
                          placeholder="Your name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="bg-background border-border/60 focus:border-emerald-500 transition-colors"
                        />{" "}
                      </div>{" "}
                      <div className="space-y-1.5">
                        {" "}
                        <Label htmlFor="email" className="text-sm font-medium">
                          {" "}
                          Email Address{" "}
                          <span className="text-red-500">*</span>{" "}
                        </Label>{" "}
                        <Input
                          id="email"
                          type="email"
                          placeholder="your@email.com"
                          value={form.email}
                          onChange={handleChange}
                          required
                          disabled={isLoading}
                          className="bg-background border-border/60 focus:border-emerald-500 transition-colors"
                        />{" "}
                      </div>{" "}
                    </div>{" "}
                    <div className="space-y-1.5">
                      {" "}
                      <Label htmlFor="subject" className="text-sm font-medium">
                        {" "}
                        Subject{" "}
                      </Label>{" "}
                      <Input
                        id="subject"
                        placeholder="What's this about?"
                        value={form.subject}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="bg-background border-border/60 focus:border-emerald-500 transition-colors"
                      />{" "}
                    </div>{" "}
                    <div className="space-y-1.5">
                      {" "}
                      <Label htmlFor="message" className="text-sm font-medium">
                        {" "}
                        Message <span className="text-red-500">*</span>{" "}
                      </Label>{" "}
                      <Textarea
                        id="message"
                        placeholder="Write your message here..."
                        value={form.message}
                        onChange={handleChange}
                        required
                        disabled={isLoading}
                        rows={5}
                        className="bg-background border-border/60 focus:border-emerald-500 transition-colors resize-none"
                      />{" "}
                      <p className="text-xs text-muted-foreground text-right">
                        {" "}
                        {form.message.length} characters{" "}
                      </p>{" "}
                    </div>{" "}
                    <Button
                      type="submit"
                      disabled={
                        isLoading || !form.name || !form.email || !form.message
                      }
                      className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 hover:opacity-90 shadow-lg shadow-emerald-500/25 font-semibold"
                      size="lg"
                    >
                      {" "}
                      {isLoading ? (
                        <>
                          {" "}
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                          Sending...{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <Send className="mr-2 h-4 w-4" /> Send Message{" "}
                        </>
                      )}{" "}
                    </Button>{" "}
                  </form>
                )}{" "}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-2 flex">
            <Card className="w-full border border-border/60 bg-card flex flex-col">
              <CardContent className="pt-5 pb-5 flex-1">
                <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
                  <Phone className="h-4 w-4 text-emerald-500" />
                  Direct Contacts
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/15 flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">WhatsApp</p>

                      <a
                        href="https://wa.me/8801936582963"
                        className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        +880 1936 582963
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">Email</p>

                      <a
                        href="mailto:abubakrsiddik.dev@gmail.com"
                        className="text-sm font-medium hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors break-all"
                      >
                        abubakrsiddik.dev@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

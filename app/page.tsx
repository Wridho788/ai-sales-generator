"use client";

import { useRouter } from "next/navigation";
import {
  Zap,
  Globe,
  Download,
  Sparkles,
  Layers,
  Star,
  CheckCircle2,
  Code2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import AuthNav from "@/components/navigation/AuthNav";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description:
      "Leverage advanced AI to craft persuasive, conversion-focused sales copy tailored to your product and audience.",
    color: "violet",
  },
  {
    icon: Layers,
    title: "Dual Template System",
    description:
      "Choose between clean Default or bold Modern styles. Switch templates instantly to match your brand personality.",
    color: "cyan",
  },
  {
    icon: Download,
    title: "One-Click Export",
    description:
      "Download your generated page as a standalone HTML file, ready to deploy anywhere with zero dependencies.",
    color: "emerald",
  },
  {
    icon: Globe,
    title: "Persistent History",
    description:
      "All your generated pages are saved automatically. Search, rename, and revisit any page anytime.",
    color: "amber",
  },
  {
    icon: Zap,
    title: "Section Regeneration",
    description:
      "Not happy with a section? Regenerate just the hero or benefits without rebuilding the entire page.",
    color: "rose",
  },
  {
    icon: Code2,
    title: "Clean, Modern Stack",
    description:
      "Built with Next.js 16, React 19, Tailwind CSS v4, and Zustand — for a fast, scalable, maintainable experience.",
    color: "blue",
  },
];

const steps = [
  {
    number: "01",
    title: "Describe Your Product",
    description:
      "Enter your product name, description, target audience, and choose a tone — formal, casual, or persuasive.",
  },
  {
    number: "02",
    title: "AI Generates Instantly",
    description:
      "Our AI analyzes your input and produces a complete sales page with a compelling hero and benefit-driven content.",
  },
  {
    number: "03",
    title: "Export & Publish",
    description:
      "Preview in real-time, tweak the template, regenerate sections, then export as a clean HTML file to publish anywhere.",
  },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Growth Lead @ StackerHQ",
    content:
      "Generated my entire landing page in under 30 seconds. The copy quality is genuinely impressive — our conversion rate jumped 23%.",
    avatar: "SC",
  },
  {
    name: "Marcus Rivera",
    role: "Founder @ Launchpad",
    content:
      "I've tried every AI page builder out there. SalesForge produces the most natural, persuasive copy by a wide margin.",
    avatar: "MR",
  },
  {
    name: "Priya Sharma",
    role: "CMO @ NexusAI",
    content:
      "The section regeneration feature alone saves me hours. I can iterate on headlines without starting over every time.",
    avatar: "PS",
  },
];

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-x-hidden">
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-40 h-16 flex items-center justify-between px-6 lg:px-10 border-b border-gray-100/80 dark:border-gray-800/80 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-violet-500 flex items-center justify-center shadow-sm shadow-violet-500/30">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">SalesForge AI</span>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            How It Works
          </a>
          <a href="#testimonials" className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            Testimonials
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <AuthNav />
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 px-6 lg:px-10 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-200 dark:bg-violet-500/10 rounded-full blur-3xl opacity-40 dark:opacity-20 animate-float" />
        <div className="absolute bottom-20 right-1/4 w-72 h-72 bg-cyan-200 dark:bg-cyan-500/10 rounded-full blur-3xl opacity-40 dark:opacity-20 animate-float" style={{ animationDelay: "1.5s" }} />

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50/60 dark:bg-violet-500/10 text-xs font-medium text-violet-600 dark:text-violet-400 mb-8 animate-fade-in">
            <Sparkles size={12} />
            Powered by Groq AI · Free & Instant
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 animate-slide-up">
            <span className="bg-linear-to-r from-violet-600 via-violet-500 to-cyan-400 bg-clip-text text-transparent animate-gradient">
              AI-Powered Sales Pages
            </span>
            <br />
            <span className="text-gray-900 dark:text-white">in Seconds, Not Days</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-slide-up stagger-2">
            Stop spending weeks on landing page copy. SalesForge AI generates high-converting sales pages from a simple product description — instantly.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up stagger-3">
            <Button
              size="lg"
              onClick={() => router.push("/dashboard")}
              icon={<Zap size={18} />}
              className="shadow-lg shadow-violet-500/30 px-8"
            >
              Generate Your First Page — Free
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => {
                document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              See how it works
            </Button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400 dark:text-gray-500 animate-fade-in stagger-4">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Export to HTML instantly</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500" />
              <span>Powered by Groq AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 lg:py-28 px-6 lg:px-10 bg-gray-50/50 dark:bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-xs font-medium text-violet-600 dark:text-violet-400 mb-4">
              Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Everything you need to sell
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
              From AI generation to HTML export — a complete toolkit for creating conversion-focused landing pages.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={i}
                  className={cn(
                    "group relative rounded-2xl border p-6 transition-all duration-300",
                    "bg-white dark:bg-white/5 border-gray-100 dark:border-gray-800",
                    "hover:border-violet-200 dark:hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-1",
                    "animate-fade-in"
                  )}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div
                    className={cn(
                      "w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-colors",
                      feature.color === "violet" && "bg-violet-100 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400",
                      feature.color === "cyan" && "bg-cyan-100 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
                      feature.color === "emerald" && "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
                      feature.color === "amber" && "bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400",
                      feature.color === "rose" && "bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400",
                      feature.color === "blue" && "bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400",
                    )}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-xs font-medium text-violet-600 dark:text-violet-400 mb-4">
              Process
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Three steps to your page
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-lg">
              From idea to published page in minutes — no design skills required.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <div
                key={i}
                className={cn(
                  "relative rounded-2xl border p-7 bg-white dark:bg-white/5 border-gray-100 dark:border-gray-800",
                  "animate-fade-in"
                )}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-gray-200 dark:bg-gray-700" />
                )}

                {/* Step number */}
                <div className="w-12 h-12 rounded-2xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center mb-5">
                  <span className="text-lg font-bold text-violet-600 dark:text-violet-400">{step.number}</span>
                </div>

                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              size="lg"
              onClick={() => router.push("/dashboard")}
              icon={<Zap size={16} />}
              className="shadow-lg shadow-violet-500/20"
            >
              Start Creating Now
            </Button>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 lg:py-28 px-6 lg:px-10 bg-gray-50/50 dark:bg-white/2">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-violet-200 dark:border-violet-500/30 bg-violet-50 dark:bg-violet-500/10 text-xs font-medium text-violet-600 dark:text-violet-400 mb-4">
              Testimonials
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Loved by builders & marketers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5 p-6 space-y-4 animate-fade-in"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Stars */}
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                  <Star size={14} className="text-amber-400 fill-amber-400" />
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  &ldquo;{t.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="py-20 lg:py-28 px-6 lg:px-10">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden p-12 lg:p-16 text-center bg-linear-to-br from-violet-600 to-violet-500">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to generate your first page?
              </h2>
              <p className="text-violet-100 text-lg max-w-xl mx-auto mb-8">
                Join hundreds of marketers and founders who create high-converting landing pages in seconds.
              </p>
              <Button
                size="lg"
                onClick={() => router.push("/dashboard")}
                className="bg-white text-violet-600 hover:bg-violet-50 shadow-lg"
                icon={<Zap size={16} />}
              >
                Get Started — It&apos;s Free
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 dark:border-gray-800 py-10 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center">
              <Zap size={13} className="text-white" />
            </div>
            <span className="font-semibold text-sm text-gray-500 dark:text-gray-400">
              SalesForge AI
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm text-gray-400">
            <button onClick={() => router.push("/dashboard")} className="hover:text-violet-500 transition-colors">
              Dashboard
            </button>
            <button onClick={() => router.push("/history")} className="hover:text-violet-500 transition-colors">
              History
            </button>
          </div>

          <p className="text-xs text-gray-400">
            Built with Next.js 16 · Groq AI
          </p>
        </div>
      </footer>
    </div>
  );
}

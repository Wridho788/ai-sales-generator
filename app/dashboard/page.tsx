"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, History, Zap } from "lucide-react";

import SplitLayout from "@/components/layout/SplitLayout";
import ProductForm from "@/components/form/ProductForm";
import Preview from "@/components/preview/Preview";
import { TemplateSwitcher } from "@/components/ui/TemplateSwitcher";
import AuthNav from "@/components/navigation/AuthNav";
import { GeneratorInput, SalesPage } from "@/features/generator/types";
import { savePage, getPage } from "@/lib/storage";
import toast from "react-hot-toast";

type SectionKey = "hero" | "features" | "pricing" | "testimonials" | "faq" | "cta";

const GENERATION_STEPS: { key: SectionKey; label: string; sublabel: string }[] = [
  { key: "hero", label: "Hero", sublabel: "Crafting compelling headline..." },
  { key: "features", label: "Features", sublabel: "Writing feature descriptions..." },
  { key: "pricing", label: "Pricing", sublabel: "Building pricing plans..." },
  { key: "testimonials", label: "Reviews", sublabel: "Gathering testimonials..." },
  { key: "faq", label: "FAQ", sublabel: "Adding FAQ section..." },
  { key: "cta", label: "CTA", sublabel: "Finalizing call-to-action..." },
];

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [data, setData] = useState<SalesPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [generatingStep, setGeneratingStep] = useState<number>(0);
  const [regenerating, setRegenerating] = useState<SectionKey | null>(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isLoadedFromHistory, setIsLoadedFromHistory] = useState(false);

  // Load page from history if pageId param is present
  useEffect(() => {
    const pageId = searchParams.get("pageId");
    if (pageId) {
      getPage(pageId).then((stored) => {
        if (stored) {
          setData(stored.output);
          setIsLoadedFromHistory(true);
          toast.success(`Loaded "${stored.title}" from history`);
        }
      });
    }
  }, [searchParams]);

  const handleGenerate = async (form: GeneratorInput) => {
    try {
      setLoading(true);
      setGeneratingStep(0);

      // Animate through steps
      for (let i = 0; i < GENERATION_STEPS.length; i++) {
        setGeneratingStep(i + 1);
        await new Promise((r) => setTimeout(r, 400));
      }

      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Generation failed");
      }

      const json: SalesPage = await res.json();
      setData(json);

      // Save to Supabase
      try {
        await savePage(form, json);
      } catch {
        toast.error("Failed to save page to history");
      }

      setGeneratingStep(GENERATION_STEPS.length + 1);
      toast.success("Page generated successfully!");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to generate page. Please try again.";
      toast.error(msg);
      setGeneratingStep(0);
    } finally {
      setLoading(false);
      setTimeout(() => setGeneratingStep(0), 1500);
    }
  };

  const handleRegenerate = async (section: SectionKey) => {
    if (!data) return;
    try {
      setRegenerating(section);
      const res = await fetch("/api/generate?action=regenerate", {
        method: "POST",
        body: JSON.stringify({ section, context: data }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Regenerate failed");
      }

      const json = await res.json();
      setData((prev) => prev ? { ...prev, [section]: json[section] } : prev);
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} regenerated!`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setRegenerating(null);
    }
  };

  return (
    <>
      {/* Top navbar */}
      <div className="fixed top-0 left-0 right-0 z-40 h-14 flex items-center justify-between px-4 lg:px-6 border-b border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-black/80 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Home</span>
          </button>

          <div className="h-5 w-px bg-gray-200 dark:bg-gray-800" />

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500 flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 dark:text-white text-sm tracking-tight">
              SalesForge AI
            </span>
          </div>

          {isLoadedFromHistory && (
            <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-xs font-medium text-emerald-700 dark:text-emerald-400">
              Editing
            </div>
          )}
        </div>

        <div className="flex items-center gap-3">
          <TemplateSwitcher />
          <AuthNav />
        </div>
      </div>

      {/* Mobile preview toggle */}
      {data && (
        <button
          onClick={() => setShowMobilePreview(true)}
          className="lg:hidden fixed bottom-6 right-6 z-30 w-12 h-12 rounded-full bg-violet-500 text-white shadow-lg shadow-violet-500/30 flex items-center justify-center active:scale-95 transition-all"
          aria-label="Show preview"
        >
          <Zap size={20} />
        </button>
      )}

      {/* Main layout */}
      <div className="pt-14 h-screen">
        <SplitLayout
          onCloseMobile={() => setShowMobilePreview(false)}
          showMobileRight={showMobilePreview}
          left={
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                  {isLoadedFromHistory ? "Edit Page" : "Create Page"}
                </h1>
                <button
                  onClick={() => router.push("/history")}
                  className="sm:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500"
                  aria-label="View history"
                >
                  <History size={18} />
                </button>
              </div>

              {/* Step indicator */}
              <GenerationProgress currentStep={generatingStep} />

              <ProductForm
                onGenerate={handleGenerate}
                loading={loading}
                generatedData={data}
              />
            </div>
          }
          right={
            <Preview
              data={data}
              loading={loading}
              onRegenerate={handleRegenerate}
              regenerating={regenerating}
            />
          }
        />
      </div>
    </>
  );
}

function GenerationProgress({ currentStep }: { currentStep: number }) {
  if (currentStep === 0) return null;

  const total = GENERATION_STEPS.length + 1;
  const isComplete = currentStep > GENERATION_STEPS.length;

  return (
    <div className="space-y-2 p-4 rounded-2xl border border-violet-100 dark:border-violet-500/20 bg-violet-50/50 dark:bg-violet-500/5 animate-fade-in">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-violet-600 dark:text-violet-400">
          {isComplete ? "Complete!" : "Generating..."}
        </span>
        <span className="text-xs text-gray-400">
          {currentStep}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full bg-linear-to-r from-violet-500 to-cyan-400 transition-all duration-500 ease-out"
          style={{ width: `${(currentStep / total) * 100}%` }}
        />
      </div>

      {/* Steps */}
      <div className="flex flex-wrap gap-1.5">
        {GENERATION_STEPS.map((step, i) => {
          const done = currentStep > i + 1;
          const active = currentStep === i + 1;
          return (
            <div
              key={step.key}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ${
                done
                  ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                  : active
                    ? "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-400 animate-pulse"
                    : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
              }`}
            >
              {done && (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
              {step.label}
            </div>
          );
        })}
      </div>

      {currentStep > 0 && currentStep <= GENERATION_STEPS.length && (
        <p className="text-xs text-violet-500 dark:text-violet-400 animate-pulse">
          {GENERATION_STEPS[currentStep - 1]?.sublabel}
        </p>
      )}
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense>
      <DashboardContent />
    </Suspense>
  );
}
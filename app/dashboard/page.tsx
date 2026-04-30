"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, History, Zap } from "lucide-react";

import SplitLayout from "@/components/layout/SplitLayout";
import ProductForm from "@/components/form/ProductForm";
import Preview from "@/components/preview/Preview";
import { SecondaryButton } from "@/components/ui/SecondaryButton";
import { getSessionId } from "@/lib/session";
import { GeneratorInput, SalesPage } from "@/features/generator/types";
import toast from "react-hot-toast";

export default function Dashboard() {
  const [data, setData] = useState<SalesPage | null>(null);
  const [loading, setLoading] = useState(false);
  const [regenerating, setRegenerating] = useState<"hero" | "benefits" | null>(null);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const router = useRouter();

  const handleGenerate = async (form: GeneratorInput) => {
    try {
      setLoading(true);
      const payload = { ...form, sessionId: getSessionId() };

      const res = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("API error");

      const json = await res.json();
      setData(json);
      toast.success("Page generated successfully!");
    } catch (err) {
      toast.error("Failed to generate page. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async (section: "hero" | "benefits") => {
    if (!data) return;
    try {
      setRegenerating(section);
      const res = await fetch("/api/generate?action=regenerate", {
        method: "POST",
        body: JSON.stringify({ section, context: data }),
      });

      if (!res.ok) throw new Error("Regenerate failed");

      const json = await res.json();
      setData((prev) => prev ? { ...prev, [section]: json[section] } : prev);
      toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} regenerated!`);
    } catch (err) {
      toast.error(`Failed to regenerate ${section}`);
      console.error(err);
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
        </div>

        <div className="flex items-center gap-2">
          <SecondaryButton
            variant="ghost"
            onClick={() => router.push("/history")}
            className="hidden sm:flex"
            icon={<History size={15} />}
          >
            History
          </SecondaryButton>
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
                  Create Page
                </h1>
                <button
                  onClick={() => router.push("/history")}
                  className="sm:hidden p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500"
                  aria-label="View history"
                >
                  <History size={18} />
                </button>
              </div>
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
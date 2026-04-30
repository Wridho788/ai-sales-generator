import { useTemplate } from "@/store/useTemplate";
import { Hero } from "./Hero";
import { Benefits } from "./Benefits";
import { EmptyState } from "./EmptyState";
import { Skeleton } from "./Skeleton";
import { SalesPage } from "@/features/generator/types";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface PreviewProps {
  data?: SalesPage | null;
  loading?: boolean;
  onRegenerate?: (section: "hero" | "benefits") => void;
  regenerating?: "hero" | "benefits" | null;
}

function HeroModern({ data, onRegenerate, regenerating }: {
  data: { headline: string; subheadline: string; cta: string };
  onRegenerate?: () => void;
  regenerating?: boolean;
}) {
  return (
    <section className="relative space-y-6 text-center py-12 rounded-2xl bg-linear-to-br from-violet-50 to-cyan-50 dark:from-violet-950/30 dark:to-cyan-950/30 px-8">
      {onRegenerate && (
        <button
          onClick={onRegenerate}
          disabled={regenerating}
          className="absolute top-4 right-4 p-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/50 hover:bg-white dark:hover:bg-black text-gray-500 hover:text-violet-600 dark:hover:text-violet-400 transition-all duration-200 active:scale-95 disabled:opacity-50"
          title="Regenerate hero"
        >
          <RefreshCw size={14} className={cn(regenerating && "animate-spin")} />
        </button>
      )}
      <h1 className="text-4xl font-bold bg-linear-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
        {data.headline}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed text-lg">
        {data.subheadline}
      </p>
      <button className="px-8 py-3 rounded-2xl bg-linear-to-r from-violet-500 to-cyan-400 text-white hover:shadow-xl active:scale-[0.97] transition-all duration-200 font-semibold text-base shadow-lg shadow-violet-500/20">
        {data.cta}
      </button>
    </section>
  );
}

export default function Preview({ data, loading, onRegenerate, regenerating }: PreviewProps) {
  const { template } = useTemplate();

  if (loading) return <Skeleton />;
  if (!data) return <EmptyState />;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* HERO SECTION */}
      <div className="relative">
        {onRegenerate && (
          <button
            onClick={() => onRegenerate("hero")}
            disabled={regenerating === "hero" || regenerating === "benefits"}
            className="absolute -top-8 right-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors disabled:opacity-50"
            title="Regenerate Hero"
          >
            <RefreshCw size={12} className={cn(regenerating === "hero" && "animate-spin")} />
            Regenerate
          </button>
        )}
        {template === "modern" ? (
          <HeroModern data={data.hero} />
        ) : (
          <Hero data={data.hero} />
        )}
      </div>

      {/* DIVIDER */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Benefits</span>
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* BENEFITS SECTION */}
      <div className="relative">
        {onRegenerate && (
          <button
            onClick={() => onRegenerate("benefits")}
            disabled={regenerating === "hero" || regenerating === "benefits"}
            className="absolute -top-8 right-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors disabled:opacity-50"
            title="Regenerate Benefits"
          >
            <RefreshCw size={12} className={cn(regenerating === "benefits" && "animate-spin")} />
            Regenerate
          </button>
        )}
        <Benefits items={data.benefits} />
      </div>
    </div>
  );
}
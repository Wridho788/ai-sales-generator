import { useTemplate } from "@/store/useTemplate";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Pricing } from "./Pricing";
import { Testimonials } from "./Testimonials";
import { Faq } from "./Faq";
import { CtaBanner } from "./CtaBanner";
import { EmptyState } from "./EmptyState";
import { Skeleton } from "./Skeleton";
import { SalesPage } from "@/features/generator/types";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type SectionKey = "hero" | "features" | "pricing" | "testimonials" | "faq" | "cta";

interface PreviewProps {
  data?: SalesPage | null;
  loading?: boolean;
  onRegenerate?: (section: SectionKey) => void;
  regenerating?: SectionKey | null;
}

function HeroModern({ data }: {
  data?: { headline: string; subheadline: string; cta: string; imageUrl?: string };
}) {
  if (!data) return null;

  return (
    <section className="relative space-y-6 text-center py-14 rounded-2xl bg-linear-to-br from-violet-50 to-cyan-50 dark:from-violet-950/30 dark:to-cyan-950/30 px-8 overflow-hidden">
      {data.imageUrl && (
        <div className="absolute inset-0 opacity-20">
          <img
            src={data.imageUrl}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/80 dark:to-black/80" />
        </div>
      )}
      <div className="relative">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
          {data.headline}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed text-lg">
          {data.subheadline}
        </p>
        <button className="mt-6 px-8 py-3 rounded-2xl bg-violet-500 text-white hover:shadow-xl active:scale-[0.97] transition-all duration-200 font-semibold text-base shadow-lg shadow-violet-500/20">
          {data.cta}
        </button>
      </div>
    </section>
  );
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 py-6">
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</span>
      <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
    </div>
  );
}

export default function Preview({ data, loading, onRegenerate, regenerating }: PreviewProps) {
  const { template } = useTemplate();

  if (loading) return <Skeleton />;
  if (!data) return <EmptyState />;

  const isRegenerating = (key: SectionKey) => regenerating === key;

  return (
    <div className="space-y-2 animate-fade-in">
      {/* HERO */}
      <div className="relative">
        {onRegenerate && (
          <button
            onClick={() => onRegenerate("hero")}
            disabled={!!regenerating}
            className="absolute -top-6 right-0 flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-500 dark:hover:text-violet-400 transition-colors disabled:opacity-50 z-10"
          >
            <RefreshCw size={11} className={cn(isRegenerating("hero") && "animate-spin")} />
            Regenerate
          </button>
        )}
        {template === "modern" ? (
          <HeroModern data={data.hero} />
        ) : (
          <Hero data={data.hero} />
        )}
      </div>

      <SectionDivider label="Features" />
      <Features
        items={data.features}
        onRegenerate={onRegenerate ? () => onRegenerate("features") : undefined}
        regenerating={isRegenerating("features")}
      />

      <SectionDivider label="Pricing" />
      <Pricing
        items={data.pricing}
        onRegenerate={onRegenerate ? () => onRegenerate("pricing") : undefined}
        regenerating={isRegenerating("pricing")}
      />

      <SectionDivider label="Reviews" />
      <Testimonials
        items={data.testimonials}
        onRegenerate={onRegenerate ? () => onRegenerate("testimonials") : undefined}
        regenerating={isRegenerating("testimonials")}
      />

      <SectionDivider label="FAQ" />
      <Faq
        items={data.faq}
        onRegenerate={onRegenerate ? () => onRegenerate("faq") : undefined}
        regenerating={isRegenerating("faq")}
      />

      <SectionDivider label="Get Started" />
      <CtaBanner data={data.cta} />
    </div>
  );
}
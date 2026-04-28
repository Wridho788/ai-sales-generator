import { useTemplate } from "@/store/useTemplate";
import { Hero } from "./Hero";
import { Benefits } from "./Benefits";
import { EmptyState } from "./EmptyState";
import { SalesPage } from "@/features/generator/types";

function HeroModern({ data }: { data: { headline: string; subheadline: string; cta: string } }) {
  return (
    <section className="space-y-6 text-center py-12">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent">
        {data.headline}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">{data.subheadline}</p>
      <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-400 text-white hover:shadow-lg active:scale-[0.98] transition-all duration-150 font-medium">
        {data.cta}
      </button>
    </section>
  );
}

export default function Preview({ data }: { data?: SalesPage | null }) {
  const { template } = useTemplate();
  if (!data) return <EmptyState />;
  return (
    <div className="space-y-10">
      {template === "modern" ? (
        <HeroModern data={data.hero} />
      ) : (
        <Hero data={data.hero} />
      )}
      <Benefits items={data.benefits} />
    </div>
  );
}

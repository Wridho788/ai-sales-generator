interface HeroProps {
  data?: { headline: string; subheadline: string; cta: string };
}

export function Hero({ data }: HeroProps) {
  if (!data) return null;

  return (
    <section className="relative space-y-5 text-center py-10 rounded-2xl bg-gray-50 dark:bg-white/5 px-8">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
        {data.headline}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-base md:text-lg max-w-xl mx-auto">
        {data.subheadline}
      </p>
      <button className="bg-violet-500 text-white px-6 py-2.5 rounded-xl hover:bg-violet-600 active:scale-[0.97] transition-all duration-200 font-semibold shadow-md shadow-violet-500/15">
        {data.cta}
      </button>
    </section>
  );
}
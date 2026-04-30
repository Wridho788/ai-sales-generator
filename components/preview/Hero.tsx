export function Hero({ data }: { data?: { headline: string; subheadline: string; cta: string} }) {
  if (!data) return null;

  return (
    <section className="space-y-4 text-center">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        {data.headline}
      </h1>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
        {data.subheadline}
      </p>
      <button className="bg-violet-500 text-white px-5 py-2 rounded-xl hover:bg-violet-600 active:scale-[0.98] transition-all duration-150 font-medium">
        {data.cta}
      </button>
    </section>
  );
}

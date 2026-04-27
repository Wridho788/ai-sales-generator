export function Hero({ data }: { data?: { headline: string; subheadline: string; cta: string } }) {
  if (!data) return null;

  return (
    <div className="p-6 border rounded-lg bg-white">
      <h1 className="text-2xl font-bold mb-2">
        {data.headline}
      </h1>
      <p className="text-gray-600 mb-4">
        {data.subheadline}
      </p>
      <button className="bg-violet-500 text-white px-4 py-2 rounded-lg hover:bg-violet-600 transition">
        {data.cta}
      </button>
    </div>
  );
}

interface CtaBannerProps {
  data?: {
    headline: string;
    subheadline: string;
    buttonText: string;
  };
}

export function CtaBanner({ data }: CtaBannerProps) {
  if (!data) return null;

  return (
    <section className="rounded-3xl bg-linear-to-br from-violet-600 to-violet-500 p-10 lg:p-14 text-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-48 h-48 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-36 h-36 bg-white rounded-full blur-3xl" />
      </div>

      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
          {data.headline}
        </h2>
        {data.subheadline && (
          <p className="text-violet-100 text-base max-w-lg mx-auto mb-6 leading-relaxed">
            {data.subheadline}
          </p>
        )}
        {data.buttonText && (
          <button className="px-8 py-3 rounded-xl bg-white text-violet-600 font-semibold hover:bg-violet-50 active:scale-[0.97] transition-all duration-200 shadow-lg">
            {data.buttonText}
          </button>
        )}
      </div>
    </section>
  );
}
export function Skeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero skeleton */}
      <div className="space-y-4 text-center py-12 px-8 rounded-2xl bg-gray-100 dark:bg-white/5">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4 mx-auto max-w-sm animate-pulse" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-md mx-auto animate-pulse" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3 mx-auto max-w-xs animate-pulse" />
        <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-xl w-36 mx-auto mt-4 animate-pulse" />
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 py-4">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse" />
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Features skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5 space-y-3">
            <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700" />
            <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-lg w-3/4" />
            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-lg w-full" />
            <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-lg w-5/6" />
          </div>
        ))}
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 py-4">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse" />
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Pricing skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5 space-y-4">
            <div className="h-5 bg-gray-100 dark:bg-gray-700 rounded-lg w-1/2" />
            <div className="h-8 bg-gray-100 dark:bg-gray-700 rounded-lg w-2/3" />
            <div className="space-y-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-full" />
              ))}
            </div>
            <div className="h-10 bg-gray-100 dark:bg-gray-700 rounded-xl" />
          </div>
        ))}
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 py-4">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse" />
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Testimonials skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-5 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5 space-y-3">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((j) => (
                <div key={j} className="w-3 h-3 bg-amber-300 rounded" />
              ))}
            </div>
            <div className="h-12 bg-gray-100 dark:bg-gray-700 rounded" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg" />
              <div className="space-y-1">
                <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded w-20" />
                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded w-24" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Section divider */}
      <div className="flex items-center gap-3 py-4">
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
        <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16 animate-pulse" />
        <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* FAQ skeleton */}
      <div className="max-w-2xl mx-auto space-y-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="p-4 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5">
            <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded w-3/4" />
          </div>
        ))}
      </div>

      {/* CTA skeleton */}
      <div className="rounded-3xl bg-violet-100 dark:bg-violet-900/20 p-10 text-center space-y-3">
        <div className="h-7 bg-violet-200 dark:bg-violet-800/40 rounded-lg w-1/2 mx-auto" />
        <div className="h-4 bg-violet-200 dark:bg-violet-800/40 rounded w-3/4 mx-auto" />
        <div className="h-11 bg-violet-300 dark:bg-violet-700/40 rounded-xl w-40 mx-auto mt-4" />
      </div>
    </div>
  );
}
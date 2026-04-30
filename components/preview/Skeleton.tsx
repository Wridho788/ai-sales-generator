export function Skeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero skeleton */}
      <div className="space-y-4 text-center py-10 px-8 rounded-2xl bg-gray-100 dark:bg-white/5">
        <div className="h-9 bg-gray-200 dark:bg-gray-700 rounded-xl w-3/4 mx-auto max-w-sm animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-full max-w-md mx-auto animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-lg w-2/3 mx-auto max-w-xs animate-pulse" />
        <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-xl w-36 mx-auto mt-4 animate-pulse" />
      </div>

      {/* Benefits skeleton */}
      <div className="space-y-6">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 mx-auto animate-pulse" />
        <div className="grid gap-4 sm:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-white/5 space-y-3 animate-pulse"
            >
              <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-gray-700" />
              <div className="h-4 bg-gray-100 dark:bg-gray-700 rounded-lg w-3/4" />
              <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-lg w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
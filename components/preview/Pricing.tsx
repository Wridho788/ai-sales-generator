import { RefreshCw, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingProps {
  items?: {
    title: string;
    price: string;
    period: string;
    features: string[];
    cta: string;
    recommended?: boolean;
  }[];
  onRegenerate?: () => void;
  regenerating?: boolean;
}

export function Pricing({ items, onRegenerate, regenerating }: PricingProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center w-full">
          Simple, Transparent Pricing
        </h2>
        {onRegenerate && (
          <button
            onClick={onRegenerate}
            disabled={regenerating}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-violet-500 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={12} className={cn(regenerating && "animate-spin")} />
            Regenerate
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {items.slice(0, 3).map((plan, i) => (
          <div
            key={i}
            className={cn(
              "relative rounded-2xl border p-6 flex flex-col transition-all duration-300",
              plan.recommended
                ? "border-violet-500 bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/40 dark:to-gray-900 shadow-lg shadow-violet-500/10 scale-[1.02]"
                : "border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5 hover:border-violet-200 dark:hover:border-violet-500/20"
            )}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-violet-500 text-white text-xs font-semibold">
                Recommended
              </div>
            )}

            <div className="mb-5">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{plan.title}</h3>
              <div className="flex items-baseline gap-1">
                <span className={cn(
                  "text-4xl font-bold",
                  plan.recommended ? "text-violet-600 dark:text-violet-400" : "text-gray-900 dark:text-white"
                )}>
                  {plan.price}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-2.5 mb-6 flex-1">
              {plan.features.slice(0, 5).map((feature, j) => (
                <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Check size={15} className="mt-0.5 text-emerald-500 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={cn(
                "w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-[0.97]",
                plan.recommended
                  ? "bg-violet-500 text-white hover:bg-violet-600 shadow-md shadow-violet-500/20"
                  : "border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
              )}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
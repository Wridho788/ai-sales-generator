import { RefreshCw, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface TestimonialsProps {
  items?: {
    name: string;
    role: string;
    content: string;
    avatar: string;
  }[];
  onRegenerate?: () => void;
  regenerating?: boolean;
}

export function Testimonials({ items, onRegenerate, regenerating }: TestimonialsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center w-full">
          Loved by Teams Worldwide
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
        {items.slice(0, 3).map((t, i) => (
          <div
            key={i}
            className={cn(
              "rounded-2xl border p-6 space-y-4 transition-all duration-300",
              "bg-white dark:bg-white/5 border-gray-100 dark:border-gray-800",
              "hover:border-violet-200 dark:hover:border-violet-500/20"
            )}
          >
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, j) => (
                <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
              ))}
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed italic">
              &ldquo;{t.content}&rdquo;
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 rounded-xl bg-violet-100 dark:bg-violet-500/10 flex items-center justify-center text-xs font-bold text-violet-600 dark:text-violet-400 flex-shrink-0">
                {t.avatar || t.name.split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{t.name}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500">{t.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import { CheckCircle2, Zap, Shield, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BenefitsProps {
  items?: {
    title: string;
    description: string;
  }[];
}

const icons = [Zap, Shield, Star, CheckCircle2];

export function Benefits({ items }: BenefitsProps) {
  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white text-center">
        Why Choose This?
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((b, i) => {
          const Icon = icons[i % icons.length];
          return (
            <div
              key={i}
              className={cn(
                "group relative p-5 rounded-2xl border transition-all duration-200",
                "bg-white dark:bg-white/5 border-gray-100 dark:border-gray-800",
                "hover:border-violet-200 dark:hover:border-violet-500/30 hover:shadow-md hover:shadow-violet-500/5",
                "hover:-translate-y-0.5"
              )}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-500/20 transition-colors">
                  <Icon size={16} className="text-violet-600 dark:text-violet-400" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-sm leading-snug">
                    {b.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">
                    {b.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
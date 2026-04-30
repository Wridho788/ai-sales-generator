"use client";

import { useState } from "react";
import { RefreshCw, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqProps {
  items?: FaqItem[];
  onRegenerate?: () => void;
  regenerating?: boolean;
}

export function Faq({ items, onRegenerate, regenerating }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center w-full">
          Frequently Asked Questions
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

      <div className="max-w-2xl mx-auto space-y-3">
        {items.slice(0, 4).map((item, i) => (
          <div
            key={i}
            className={cn(
              "rounded-2xl border transition-all duration-200",
              openIndex === i
                ? "border-violet-200 dark:border-violet-500/30 bg-white dark:bg-white/5"
                : "border-gray-100 dark:border-gray-800 bg-white dark:bg-white/5 hover:border-gray-200 dark:hover:border-gray-700"
            )}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-gray-900 dark:text-white text-sm leading-snug">
                {item.question}
              </span>
              <ChevronDown
                size={16}
                className={cn(
                  "text-gray-400 flex-shrink-0 transition-transform duration-200",
                  openIndex === i && "rotate-180"
                )}
              />
            </button>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                openIndex === i ? "max-h-48" : "max-h-0"
              )}
            >
              <p className="px-5 pb-4 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
"use client";

import { useTemplate } from "@/store/useTemplate";
import { cn } from "@/lib/utils";
import { Layout, Sparkles } from "lucide-react";

export function TemplateSwitcher() {
  const { template, setTemplate } = useTemplate();

  const templates = [
    {
      id: "default",
      label: "Default",
      icon: Layout,
      description: "Clean & professional",
    },
    {
      id: "modern",
      label: "Modern",
      icon: Sparkles,
      description: "Bold & vibrant",
    },
  ];

  return (
    <div className="flex gap-2">
      {templates.map((t) => {
        const Icon = t.icon;
        const isActive = template === t.id;

        return (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl border font-medium text-sm transition-all duration-200",
              isActive
                ? "border-violet-500 bg-violet-500/10 dark:bg-violet-500/10 text-violet-600 dark:text-violet-400 shadow-sm"
                : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-violet-300 hover:text-gray-900 dark:hover:text-white hover:bg-violet-50/50 dark:hover:bg-white/5"
            )}
          >
            <Icon size={14} />
            {t.label}
          </button>
        );
      })}
    </div>
  );
}
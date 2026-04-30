"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={cn(
        "w-9 h-9 rounded-xl border transition-all duration-200",
        "flex items-center justify-center",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
        "active:scale-95",
        mounted
          ? "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800"
          : "border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800",
        className
      )}
    >
      {mounted ? (
        <div className="relative w-4 h-4">
          <Sun
            size={16}
            className={cn(
              "absolute inset-0 text-amber-500 transition-all duration-300",
              isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
            )}
          />
          <Moon
            size={16}
            className={cn(
              "absolute inset-0 text-violet-400 transition-all duration-300",
              isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
            )}
          />
        </div>
      ) : (
        <div className="w-4 h-4" />
      )}
    </button>
  );
}
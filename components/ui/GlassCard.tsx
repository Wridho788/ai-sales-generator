"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className, hover = true, onClick }: GlassCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10",
        "bg-white/60 dark:bg-white/5 shadow-sm",
        hover && "hover:shadow-lg hover:border-white/30 dark:hover:border-white/20 transition-all duration-200 active:scale-[0.99]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
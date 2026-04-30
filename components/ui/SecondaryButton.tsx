"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "default" | "ghost";
  icon?: React.ReactNode;
}

export function SecondaryButton({
  children,
  className,
  variant = "default",
  icon,
  ...props
}: SecondaryButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200",
        "active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500",
        "flex items-center justify-center gap-2",
        variant === "default"
          ? "border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10",
        className
      )}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
}
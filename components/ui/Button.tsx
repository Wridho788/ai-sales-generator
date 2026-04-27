import { cn } from "@/lib/utils";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full px-4 py-2 rounded-xl bg-violet-500 text-white hover:bg-violet-600 transition",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        "font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

interface SplitLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
  onCloseMobile?: () => void;
  showMobileRight?: boolean;
}

export default function SplitLayout({
  left,
  right,
  onCloseMobile,
  showMobileRight = false,
}: SplitLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 dark:bg-black">
      {/* LEFT PANEL - Form */}
      <div className="w-full lg:w-[480px] xl:w-[520px] h-full overflow-y-auto border-r border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-black/50 backdrop-blur-sm flex flex-col">
        {/* Mobile header */}
        {showMobileRight && onCloseMobile && (
          <div className="lg:hidden flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <span className="text-sm font-medium text-gray-500">Preview</span>
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
          </div>
        )}
        <div className="flex-1 p-6 lg:p-8">
          {left}
        </div>
      </div>

      {/* RIGHT PANEL - Preview */}
      <div
        className={cn(
          "hidden lg:flex flex-col flex-1 h-full overflow-hidden",
          "bg-white dark:bg-gray-950"
        )}
      >
        {/* Preview header bar */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            Live Preview
          </span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400 dark:text-gray-500">Real-time</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-8 xl:p-12">
          {right}
        </div>
      </div>

      {/* Mobile preview overlay */}
      {showMobileRight && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-white dark:bg-gray-950 animate-slide-up">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">Preview</span>
            <button
              onClick={onCloseMobile}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-white/10"
              aria-label="Close preview"
            >
              <X size={18} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            {right}
          </div>
        </div>
      )}
    </div>
  );
}
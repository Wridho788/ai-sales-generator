import { Sparkles, Wand2 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-6 animate-fade-in">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-linear-to-br from-violet-100 to-cyan-100 dark:from-violet-950/40 dark:to-cyan-950/40 flex items-center justify-center">
          <Wand2 size={32} className="text-violet-500 dark:text-violet-400" />
        </div>
        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center">
          <Sparkles size={12} className="text-violet-500 animate-pulse" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Ready to Create?
      </h3>
      <p className="text-sm text-gray-400 dark:text-gray-500 max-w-xs leading-relaxed">
        Fill in the form on the left and click <span className="text-violet-500 font-medium">Generate Page</span> to see your AI-powered sales page come to life.
      </p>
    </div>
  );
}
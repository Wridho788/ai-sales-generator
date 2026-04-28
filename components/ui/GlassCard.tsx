export function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/20 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl transition">
      {children}
    </div>
  );
}

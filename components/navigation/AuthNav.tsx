"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function AuthNav() {
  const router = useRouter();
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user as { email?: string } | null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition"
          >
            <div className="w-6 h-6 rounded-lg bg-violet-100 dark:bg-violet-500/20 flex items-center justify-center">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400">
                {user.email?.[0]?.toUpperCase() ?? "?"}
              </span>
            </div>
            <span className="hidden sm:inline max-w-[140px] truncate">{user.email}</span>
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                  <p className="text-xs text-gray-400 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => { setMenuOpen(false); router.push("/dashboard"); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { setMenuOpen(false); router.push("/history"); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/10 transition"
                >
                  History
                </button>
                <div className="border-t border-gray-100 dark:border-gray-800">
                  <button
                    onClick={() => { setMenuOpen(false); router.push("/logout"); }}
                    className="w-full px-4 py-2.5 text-left text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/login")}
          >
            Sign in
          </Button>
          <Button
            size="sm"
            onClick={() => router.push("/register")}
            icon={<ArrowRight size={15} />}
            className="shadow-sm shadow-violet-500/20"
          >
            Get Started
          </Button>
        </>
      )}
    </div>
  );
}

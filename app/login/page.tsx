"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      toast.success("Welcome back!");
      router.push("/dashboard");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-black">
      {/* Background orbs */}
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-violet-200 dark:bg-violet-500/10 rounded-full blur-3xl opacity-30 dark:opacity-15" />
      <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-cyan-200 dark:bg-cyan-500/10 rounded-full blur-3xl opacity-30 dark:opacity-15" />

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-violet-500 flex items-center justify-center shadow-sm shadow-violet-500/30">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
            SalesForge AI
          </span>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800/80 bg-white/90 dark:bg-black/80 backdrop-blur-xl p-8 shadow-xl shadow-black/5">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Sign in to continue to your dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Email address
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600 dark:text-gray-400">
                Password
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              icon={
                loading ? (
                  <Loader2 size={15} className="animate-spin" />
                ) : (
                  <ArrowRight size={15} />
                )
              }
            >
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Don&apos;t have an account?{" "}
            <button
              onClick={() => router.push("/register")}
              className="text-violet-500 hover:text-violet-600 font-medium transition-colors"
            >
              Create one
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 dark:text-gray-600 mt-4">
          <button
            onClick={() => router.push("/")}
            className="hover:text-violet-500 transition-colors"
          >
            Back to home
          </button>
        </p>
      </div>
    </div>
  );
}

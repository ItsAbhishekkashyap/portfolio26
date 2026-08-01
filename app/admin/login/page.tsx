"use client";

import React, { useState } from "react";
import { loginAdmin } from "@/lib/actions";
import { Shield, User, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const res = await loginAdmin(null, formData);

    setLoading(false);

    if (res.success) {
      router.push("/admin");
      router.refresh();
    } else {
      setError(res.error || "Login failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 flex items-center justify-center p-4 relative transition-colors">
      <div className="relative w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 shadow-xl z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-stone-500 hover:text-amber-600 dark:hover:text-amber-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Live Portfolio</span>
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-bold">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold font-heading">Admin Portal Login</h1>
            <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">Abhishek Gond Protected CMS</p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 mb-5 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-mono">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-stone-500 dark:text-stone-400 mb-1">Username</label>
            <div className="relative">
              <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                name="username"
                required
                placeholder="admin"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-stone-500 dark:text-stone-400 mb-1">Password</label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow-sm transition-opacity disabled:opacity-50 mt-2 font-mono"
          >
            {loading ? "Authenticating Session..." : "Authorize Admin Access"}
          </button>
        </form>
      </div>
    </div>
  );
}

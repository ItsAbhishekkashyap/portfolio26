"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Runtime App Error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 mb-6 shadow-xl">
        <AlertTriangle className="w-12 h-12 text-rose-400 mx-auto mb-2" />
        <h1 className="text-2xl font-bold font-mono text-slate-100">System Runtime Exception</h1>
      </div>

      <p className="text-slate-400 text-xs font-mono max-w-md mb-8">
        {error.message || "An unexpected error occurred during execution."}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-400 font-bold text-xs flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Operation</span>
        </button>

        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs flex items-center gap-2"
        >
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}

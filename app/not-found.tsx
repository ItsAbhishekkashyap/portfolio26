import Link from "next/link";
import { ArrowLeft, Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 text-center">
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 mb-6 shadow-xl">
        <Terminal className="w-12 h-12 text-teal-400 mx-auto mb-2" />
        <h1 className="text-4xl font-extrabold font-mono text-slate-100">404</h1>
        <p className="text-sm font-mono text-teal-400">PAGE_NOT_FOUND</p>
      </div>

      <p className="text-slate-400 text-sm max-w-md mb-8 font-mono">
        The requested system path does not exist or has been relocated in the portfolio architecture.
      </p>

      <Link
        href="/"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-glow hover:opacity-90 transition-opacity"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Portfolio Homepage</span>
      </Link>
    </div>
  );
}

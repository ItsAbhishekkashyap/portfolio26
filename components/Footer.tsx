"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUp, Command, Shield, Github, Linkedin, Code2, Globe, Clock, Download } from "lucide-react";
import { PERSONA } from "@/lib/seed-data";

interface FooterProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export default function Footer({ onOpenCommandPalette, onOpenResume }: FooterProps) {
  const [timeStr, setTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setTimeStr(new Date().toLocaleTimeString("en-US", options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#fbf9f5] dark:bg-[#0c0a09] border-t border-stone-200 dark:border-stone-900 text-stone-600 dark:text-stone-400 text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-stone-200 dark:border-stone-800">
          
          {/* Brand Column (5 Cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-stone-950 font-black text-sm flex items-center justify-center font-heading">
                AG
              </div>
              <span className="font-extrabold text-base text-stone-900 dark:text-stone-100 font-heading">{PERSONA.name}</span>
            </div>

            <p className="text-stone-600 dark:text-stone-400 leading-relaxed text-xs max-w-sm font-sans">
              Full-Stack Software Engineer & High Agency Fellow. Specializing in AI telemetry engines, MERN Stack, production Next.js architectures, & multi-tenant cloud databases.
            </p>

            {/* Live Timezone & Status Bar - Changed Green Dot to Warm Amber Mustard */}
            <div className="flex flex-wrap items-center gap-4 pt-2 font-mono text-[11px]">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-700 dark:text-amber-400 font-bold">
                <Clock className="w-3.5 h-3.5" />
                <span>{timeStr ? `${timeStr} IST` : "Lucknow, IN"}</span>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 font-bold">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                <span>Systems Nominal</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation (4 Cols) */}
          <div className="md:col-span-4 space-y-3 font-mono">
            <h4 className="text-stone-900 dark:text-stone-200 font-bold uppercase tracking-wider text-[11px] mb-2">Navigation Links</h4>
            <ul className="space-y-2 text-stone-600 dark:text-stone-400">
              <li>
                <a href="#experience" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">→ Experience & Highlights</a>
              </li>
              <li>
                <a href="#projects" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">→ Featured SaaS Projects</a>
              </li>
              <li>
                <a href="#skills" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">→ Visual Skill Matrix</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">→ Schedule Call / Inquiry</a>
              </li>
              <li>
                <a href={PERSONA.resumeUrl} download="Abhishek_Gond_Resume.pdf" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  → Download Resume PDF
                </a>
              </li>
            </ul>
          </div>

          {/* Interactive Controls (3 Cols) */}
          <div className="md:col-span-3 space-y-3 font-mono">
            <h4 className="text-stone-900 dark:text-stone-200 font-bold uppercase tracking-wider text-[11px]">Controls</h4>

            <button
              onClick={onOpenCommandPalette}
              className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 text-amber-700 dark:text-amber-400 text-xs font-semibold flex items-center justify-between transition-all shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Command className="w-3.5 h-3.5" />
                <span>Spotlight Search</span>
              </div>
              <span className="text-[10px] text-stone-500 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded border border-stone-200 dark:border-stone-700">⌘K</span>
            </button>

            <Link
              href="/admin/login"
              className="w-full py-2.5 px-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-stone-400 text-stone-600 dark:text-stone-300 text-xs font-semibold flex items-center justify-between transition-all shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5" />
                <span>Protected Admin CMS</span>
              </div>
              <span className="text-[10px] text-stone-500 bg-stone-100 dark:bg-stone-800 px-1.5 py-0.5 rounded border border-stone-200 dark:border-stone-700">Auth</span>
            </Link>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PERSONA.socials.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors shadow-sm"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONA.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONA.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors shadow-sm"
                title="LeetCode"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Back to Top Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} Abhishek Gond. All Right Reserved.</p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-all shadow-sm"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

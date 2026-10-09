"use client";

import React from "react";
import { PERSONA } from "@/lib/seed-data";
import { ArrowUpRight } from "lucide-react";

interface FooterProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export default function Footer({ onOpenCommandPalette, onOpenResume }: FooterProps) {
  return (
    <footer className="w-full bg-background pt-16 pb-8 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto flex flex-col">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 md:gap-0 mb-16">
          <div className="flex flex-col gap-2">
            <span className="font-display text-4xl md:text-6xl font-bold tracking-tighter uppercase">AG</span>
            <span className="font-mono text-xs text-stone-500 uppercase tracking-widest">Abhishek Gond</span>
            <span className="font-mono text-[10px] text-stone-600 uppercase tracking-widest">Full-Stack Software Engineer</span>
          </div>

          <div className="flex flex-wrap md:justify-end gap-x-8 gap-y-4 font-mono text-xs text-stone-400 uppercase tracking-widest">
            <a href={PERSONA.socials.github} target="_blank" className="hover:text-accent flex items-center gap-1 transition-colors">
              GitHub <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href={PERSONA.socials.linkedin} target="_blank" className="hover:text-accent flex items-center gap-1 transition-colors">
              LinkedIn <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href={PERSONA.socials.leetcode} target="_blank" className="hover:text-accent flex items-center gap-1 transition-colors">
              LeetCode <ArrowUpRight className="w-3 h-3" />
            </a>
            <a href={`mailto:${PERSONA.contact.email}`} className="hover:text-accent flex items-center gap-1 transition-colors">
              Email <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 font-mono text-[10px] text-stone-600 uppercase tracking-widest gap-4 md:gap-0">
          <span>&copy; {new Date().getFullYear()} Abhishek Gond</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

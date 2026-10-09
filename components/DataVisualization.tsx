"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PERSONA } from "@/lib/seed-data";
import { ExternalLink } from "lucide-react";

export default function DataVisualization() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = 450;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start > end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-background py-24 md:py-32 px-6 md:px-12 overflow-hidden border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto relative">
        
        {/* Abstract Background Data Field */}
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none flex flex-wrap gap-2 overflow-hidden">
          {Array.from({ length: 200 }).map((_, i) => (
            <div key={i} className="font-mono text-[8px] text-accent whitespace-pre">
              {Math.random().toString(36).substring(2, 10).toUpperCase()}
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <h3 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-12">
            Engineering Telemetry // Algorithmic Mastery
          </h3>
          
          <div className="font-display text-[15vw] md:text-[10vw] font-bold leading-none tracking-tighter text-accent mb-8">
            {count}+
          </div>
          
          <h4 className="text-2xl md:text-4xl font-medium text-stone-200 uppercase tracking-tight mb-16">
            Data Structures & Algorithms <br/> Problems Solved
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 w-full max-w-4xl">
            <div className="flex flex-col items-center border border-white/5 bg-surface/50 backdrop-blur-sm rounded-xl p-6">
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2">Contest Rating</span>
              <span className="font-display text-4xl text-stone-200">{PERSONA.leetcodeStats.rating}</span>
              <span className="font-sans text-xs text-accent mt-1">{PERSONA.leetcodeStats.percentile}</span>
            </div>
            
            <div className="flex flex-col items-center border border-white/5 bg-surface/50 backdrop-blur-sm rounded-xl p-6">
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2">Max Streak</span>
              <span className="font-display text-4xl text-stone-200">{PERSONA.leetcodeStats.streak}</span>
              <span className="font-sans text-xs text-stone-400 mt-1">Consistent Output</span>
            </div>
            
            <div className="flex flex-col items-center border border-white/5 bg-surface/50 backdrop-blur-sm rounded-xl p-6">
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2">Recognition</span>
              <span className="font-display text-2xl text-stone-200 text-center">{PERSONA.leetcodeStats.badge}</span>
              <a href={PERSONA.leetcodeStats.link} target="_blank" className="flex items-center gap-1 font-mono text-[10px] text-accent hover:underline mt-2">
                Verify Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

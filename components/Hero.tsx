"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PERSONA } from "@/lib/seed-data";

interface HeroProps {
  onScheduleCall: () => void;
  onOpenResume: () => void;
}

export default function Hero({ onScheduleCall, onOpenResume }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-screen flex flex-col justify-end pb-12 md:pb-24 px-6 md:px-12 overflow-hidden">
      <motion.div style={{ opacity }} className="z-10 w-full max-w-screen-2xl mx-auto flex flex-col">
        

        {/* Huge Typography */}
        <div className="relative font-display font-bold text-[15vw] leading-[0.85] tracking-tighter uppercase select-none pointer-events-none">
          <motion.div style={{ y: y1 }} className="flex overflow-hidden">
            {"ABHISHEK".split("").map((char, i) => (
              <motion.span
                key={`first-${i}`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: i * 0.05, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <motion.div style={{ y: y2 }} className="flex overflow-hidden pl-[10vw] md:pl-[20vw] text-stone-300">
            {"GOND".split("").map((char, i) => (
              <motion.span
                key={`last-${i}`}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: [0.76, 0, 0.24, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
        </div>

        {/* Positioning Statement */}
        <div className="mt-12 md:mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="max-w-md font-sans text-sm md:text-base text-stone-300 leading-relaxed"
          >
            I BUILD DIGITAL SYSTEMS THAT MOVE. <br/>
            ENGINEERING SYSTEMS. BUILDING EXPERIENCES.
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            onClick={onScheduleCall}
            className="group relative px-6 py-3 overflow-hidden rounded-full font-mono text-xs uppercase tracking-widest bg-white/5 border border-white/10 hover:border-accent hover:bg-accent/10 transition-all duration-300"
          >
            <span className="relative z-10 text-stone-300 group-hover:text-accent transition-colors">Initialize Contact</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-500 font-mono text-[10px] uppercase tracking-widest"
      >
        <span>Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-stone-500 to-transparent" />
      </motion.div>
    </section>
  );
}

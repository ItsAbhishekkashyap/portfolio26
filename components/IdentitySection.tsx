"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function IdentitySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section id="about" ref={containerRef} className="relative w-full py-32 md:py-48 px-6 md:px-12 bg-background overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Photo Container */}
        <motion.div 
          style={{ y }} 
          className="w-full md:w-5/12 aspect-[4/5] relative grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
        >
          <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 hover:opacity-0 transition-opacity duration-700" />
          <Image 
            src="/abhishek.jpg" 
            alt="Abhishek Gond" 
            fill 
            className="object-cover rounded-2xl" 
            sizes="(max-width: 768px) 100vw, 40vw"
          />
          <div className="absolute -bottom-6 -right-6 font-mono text-[10px] uppercase tracking-widest text-accent rotate-90 origin-bottom-left">
            AG // 001 // SYSTEM_ARCHITECT
          </div>
        </motion.div>

        {/* Text Container */}
        <div className="w-full md:w-7/12 flex flex-col gap-8 md:gap-12">
          <h2 className="font-display font-medium text-4xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tighter uppercase text-stone-100">
            Software Engineer <br/>
            <span className="text-stone-500">With an Engineer's mind</span> <br/>
            <span className="text-accent italic">And a creator's instinct.</span>
          </h2>

          <div className="flex flex-col gap-4 font-mono text-xs md:text-sm text-stone-400 uppercase tracking-widest">
            <span className="flex items-center gap-4"><div className="w-8 h-[1px] bg-accent" /> B.Tech ECE, IET Lucknow</span>
            <span className="flex items-center gap-4"><div className="w-8 h-[1px] bg-accent" /> Full-Stack Engineering</span>
            <span className="flex items-center gap-4"><div className="w-8 h-[1px] bg-accent" /> AI Systems</span>
            <span className="flex items-center gap-4"><div className="w-8 h-[1px] bg-accent" /> SaaS Architecture</span>
          </div>
        </div>

      </div>
    </section>
  );
}

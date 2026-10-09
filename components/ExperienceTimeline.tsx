"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES, PERSONA } from "@/lib/seed-data";

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Include TPC from PERSONA
  const allExperiences = [
    ...EXPERIENCES,
    {
      company: PERSONA.leadership[0].organization,
      role: PERSONA.leadership[0].role,
      type: "Leadership",
      period: PERSONA.leadership[0].period,
      highlights: [PERSONA.leadership[0].desc],
      tags: ["Operations", "Leadership", "Data"]
    }
  ];

  return (
    <section id="journey" ref={containerRef} className="w-full bg-background py-32 md:py-48 px-6 md:px-12">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="font-display text-5xl md:text-7xl font-medium tracking-tighter uppercase mb-24 md:mb-32 text-center">
          Engineering <br/> <span className="text-stone-500">Journey</span>
        </h2>

        <div className="relative pl-4 md:pl-0 max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-white/5 md:-translate-x-1/2">
            <motion.div style={{ height: lineHeight }} className="w-full bg-accent" />
          </div>

          <div className="flex flex-col gap-16 md:gap-32">
            {allExperiences.map((exp, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={idx} className={`relative flex flex-col md:flex-row items-start ${isEven ? "md:flex-row-reverse" : ""}`}>
                  {/* Dot */}
                  <div className="absolute left-0 md:left-1/2 w-3 h-3 rounded-full bg-background border-2 border-accent -translate-x-[5px] md:-translate-x-1/2 mt-1.5 z-10" />
                  
                  {/* Content Container */}
                  <div className={`ml-8 md:ml-0 md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20, x: isEven ? 20 : -20 }}
                      whileInView={{ opacity: 1, y: 0, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6 }}
                    >
                      <span className="font-mono text-[10px] text-accent uppercase tracking-widest block mb-2">
                        {exp.period} // {exp.type}
                      </span>
                      <h3 className="font-display text-2xl md:text-3xl font-medium tracking-tight text-stone-200 mb-1">
                        {exp.role}
                      </h3>
                      <h4 className="font-sans text-sm text-stone-500 mb-6">
                        {exp.company}
                      </h4>
                      <ul className={`flex flex-col gap-2 mb-6 ${isEven ? "items-start" : "md:items-end items-start"}`}>
                        {exp.highlights.map((hl, i) => (
                          <li key={i} className="text-sm text-stone-400 leading-relaxed max-w-sm">
                            {hl}
                          </li>
                        ))}
                      </ul>
                      <div className={`flex flex-wrap gap-2 ${isEven ? "justify-start" : "md:justify-end justify-start"}`}>
                        {exp.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded font-mono text-[10px] text-stone-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

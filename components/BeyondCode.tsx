"use client";

import React from "react";
import { motion } from "framer-motion";
import { PERSONA } from "@/lib/seed-data";

export default function BeyondCode() {
  return (
    <section className="w-full bg-background py-24 md:py-48 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto">
        <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter mb-24 md:mb-32 text-center">
          Beyond <span className="text-stone-500">Code</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 border border-white/5 bg-surface rounded-2xl group hover:border-accent/30 transition-colors"
          >
            <h3 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-6">Identity / 01</h3>
            <h4 className="font-display text-4xl font-medium uppercase mb-4 group-hover:text-accent transition-colors">Engineer</h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              I view software as systems. Building robust, scalable architectures and solving complex problems with strict technical discipline.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 border border-white/5 bg-surface rounded-2xl group hover:border-accent/30 transition-colors"
          >
            <h3 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-6">Identity / 02</h3>
            <h4 className="font-display text-4xl font-medium uppercase mb-4 group-hover:text-accent transition-colors">Creator</h4>
            <p className="text-stone-400 text-sm leading-relaxed">
              Code is a medium. I combine interaction design, typography, and motion to craft digital experiences that leave an impression.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 border border-white/5 bg-surface rounded-2xl group hover:border-accent/30 transition-colors"
          >
            <h3 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-6">Identity / 03</h3>
            <h4 className="font-display text-4xl font-medium uppercase mb-4 group-hover:text-accent transition-colors">Fighter</h4>
            <p className="text-stone-400 text-sm leading-relaxed mb-4">
              {PERSONA.athletics.title}. {PERSONA.athletics.belt}.
            </p>
            <p className="font-mono text-[10px] text-stone-500 uppercase">
              Discipline, consistency, and resilience translated from the mat to the codebase.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const EXPERIMENTS = [
  { id: "001", title: "Vector Field Simulation", desc: "Interactive WebGL particle field driven by flow fields and noise.", tags: ["Three.js", "GLSL"] },
  { id: "002", title: "Pathfinding Visualizer", desc: "DOM-based visualization of A* and Dijkstra's algorithms.", tags: ["React", "Algorithms"] },
];

export default function LabSection() {
  return (
    <section id="lab" className="w-full bg-background py-32 md:py-48 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24">
          <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter">
            Digital <br/> <span className="text-stone-500">Lab</span>
          </h2>
          <p className="font-mono text-xs md:text-sm text-stone-400 uppercase tracking-widest mt-8 md:mt-0 max-w-xs text-left md:text-right">
            Creative coding, technical experiments, and interactive prototypes. (Not production software).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {EXPERIMENTS.map((exp, idx) => (
            <motion.div 
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-surface/30 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
              
              {/* Abstract Visual Placeholder for Lab */}
              <div className="absolute inset-0 flex items-center justify-center opacity-30 group-hover:opacity-100 transition-opacity duration-700">
                 {idx === 0 ? (
                   <div className="w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/20 to-transparent" />
                 ) : (
                   <div className="w-full h-full bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.02)_10px,rgba(255,255,255,0.02)_20px)]" />
                 )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col">
                <span className="font-mono text-xs text-accent uppercase tracking-widest mb-3">EXP / {exp.id}</span>
                <h3 className="font-display text-3xl font-medium tracking-tight text-stone-100 mb-2">{exp.title}</h3>
                <p className="font-sans text-sm text-stone-400 mb-6 max-w-md">{exp.desc}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {exp.tags.map(t => (
                      <span key={t} className="px-2 py-1 bg-white/10 rounded font-mono text-[10px] text-stone-300">{t}</span>
                    ))}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-black transition-colors">
                    <Play className="w-4 h-4 ml-0.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

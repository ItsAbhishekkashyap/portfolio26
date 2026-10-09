"use client";

import React from "react";
import { motion } from "framer-motion";

const AREAS = [
  { num: "01", title: "AI SYSTEMS", desc: "RAG pipelines, deterministic risk engines, zero-shot extraction.", tech: "Python, LangGraph, Vector DBs" },
  { num: "02", title: "FULL-STACK PRODUCTS", desc: "Production-grade applications with edge caching and real-time features.", tech: "Next.js, Node.js, React" },
  { num: "03", title: "SAAS ARCHITECTURES", desc: "Multi-tenant systems, Row-Level Security, scalable APIs.", tech: "PostgreSQL, Supabase, Prisma" },
  { num: "04", title: "INTERACTIVE EXPERIENCES", desc: "High-performance WebGL, creative coding, sophisticated DOM choreography.", tech: "Three.js, GSAP, Framer Motion" },
];

export default function WhatIBuild() {
  return (
    <section className="w-full py-24 md:py-48 px-6 md:px-12 bg-background border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto">
        <h3 className="font-mono text-xs md:text-sm text-stone-500 uppercase tracking-widest mb-16 md:mb-32">
          Focus Areas // What I Build
        </h3>

        <div className="flex flex-col">
          {AREAS.map((area, idx) => (
            <motion.div 
              key={area.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="group flex flex-col md:flex-row md:items-center justify-between py-8 md:py-16 border-b border-white/5 hover:border-accent/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-6 md:gap-12 mb-4 md:mb-0">
                <span className="font-mono text-sm md:text-lg text-stone-500 group-hover:text-accent transition-colors">{area.num}</span>
                <h4 className="font-display text-3xl md:text-5xl lg:text-7xl font-medium tracking-tighter uppercase text-stone-200 group-hover:text-white transition-colors">
                  {area.title}
                </h4>
              </div>
              <div className="flex flex-col gap-2 md:max-w-sm md:text-right">
                <p className="font-sans text-sm md:text-base text-stone-400 leading-relaxed">{area.desc}</p>
                <p className="font-mono text-xs text-accent/70 uppercase tracking-widest mt-2">{area.tech}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

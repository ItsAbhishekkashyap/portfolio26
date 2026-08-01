"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Code, Award, ExternalLink, Flame, Shield, CheckCircle2, Trophy, Users, Sparkles } from "lucide-react";
import { EXPERIENCES, PERSONA } from "@/lib/seed-data";

export default function BentoGrid() {
  return (
    <section id="experience" className="py-24 bg-[#fbf9f5] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 border-t border-stone-200 dark:border-stone-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-700 dark:text-amber-400 text-xs font-mono mb-4 shadow-sm">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Track Record & Engineering Leadership</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight font-heading">
            Work Experience &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 dark:from-amber-400 dark:to-yellow-400">
              High Agency Milestones
            </span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm max-w-2xl mt-3 font-sans leading-relaxed">
            Full-stack engineering fellowships, NGO platform modernizations, algorithmic competitive programming, & national athletics leadership.
          </p>
        </div>

        {/* 1. Work Experience Section - Full Width Spacious Cards */}
        <div className="space-y-8">
          <h3 className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Professional Work Experience
          </h3>

          <div className="grid grid-cols-1 gap-8">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-sm hover:border-amber-500/50 hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3">
                      <h4 className="text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors font-heading">
                        {exp.role}
                      </h4>
                      <span className="px-3 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-xs font-mono font-bold uppercase">
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-base text-amber-700 dark:text-amber-400 font-bold mt-1">{exp.company}</p>
                  </div>

                  <span className="px-4 py-1.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono font-bold">
                    {exp.period}
                  </span>
                </div>

                <ul className="space-y-3 mb-6">
                  {exp.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-stone-700 dark:text-stone-300 leading-relaxed font-sans">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100 dark:border-stone-800">
                  {exp.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 text-stone-700 dark:text-stone-300 text-xs font-mono border border-stone-200 dark:border-stone-800 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 2. Distinct Showcase Aura Cards (DSA, Taekwondo, TPC) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">

          {/* DSA & Problem Solving Aura Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg font-heading">DSA Mastery</h4>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">LeetCode & GeeksforGeeks</p>
                  </div>
                </div>
                <a
                  href={PERSONA.leetcodeStats.link}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 text-stone-700 dark:text-stone-300 hover:text-amber-500 border border-stone-200 dark:border-stone-800 transition-colors"
                  title="View LeetCode Profile"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">Total Solved</p>
                    <p className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">{PERSONA.leetcodeStats.solved}</p>
                  </div>
                  <span className="text-xs text-stone-500 dark:text-stone-400 font-mono">LeetCode / GFG</span>
                </div>

                <div className="p-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">Contest Rating</p>
                    <p className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">{PERSONA.leetcodeStats.rating}</p>
                  </div>
                  <span className="text-xs text-amber-600 dark:text-amber-400 font-mono font-bold">{PERSONA.leetcodeStats.percentile}</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500 border border-rose-500/20">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">Max Streak</p>
                    <p className="text-sm font-bold font-mono text-stone-900 dark:text-stone-100">{PERSONA.leetcodeStats.streak}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs font-mono font-bold border border-amber-500/20">
                  {PERSONA.leetcodeStats.badge}
                </span>
              </div>
            </div>
          </motion.div>

          {/* National Taekwondo Silver Medalist Aura Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg font-heading">{PERSONA.athletics.title}</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-mono font-semibold">{PERSONA.athletics.championship}</p>
                </div>
              </div>

              <div className="space-y-4 mb-6 text-sm text-stone-700 dark:text-stone-300">
                <div className="p-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <p className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold mb-1">Rank & Belt</p>
                  <p className="text-sm font-semibold">{PERSONA.athletics.belt}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <p className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold mb-1">Leadership Role</p>
                  <p className="text-xs leading-relaxed">{PERSONA.athletics.leadership}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Training & Placement Cell (TPC) Leadership Aura Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 shadow-sm hover:border-amber-500/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 text-lg font-heading">TPC Core Member</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-mono">IET Lucknow Placement Cell</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <p className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold mb-1">Tenure</p>
                  <p className="text-sm font-semibold font-mono">Sep 2025 – Aug 2026</p>
                </div>

                <div className="p-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <p className="text-xs font-mono text-amber-700 dark:text-amber-400 font-bold mb-1">Key Impact</p>
                  <p className="text-xs leading-relaxed">
                    Digitized placement metrics, streamlined recruitment logistics, and bridged communications between visiting HR teams and engineering candidates.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

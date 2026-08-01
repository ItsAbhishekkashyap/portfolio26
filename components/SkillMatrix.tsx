"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  FileCode,
  Cpu,
  Terminal,
  Layout,
  Layers,
  Atom,
  Server,
  Workflow,
  Palette,
  Sparkles,
  Database,
  Table,
  Cloud,
  Box,
  Zap,
  GitBranch,
  Globe,
  Lock,
  CreditCard,
  CheckCircle2,
  Send,
  ShieldCheck,
  Network,
  CheckSquare,
  Binary,
  HardDrive,
  Wifi,
  FolderTree,
  Bot,
  SlidersHorizontal,
} from "lucide-react";
import { SKILL_CATEGORIES } from "@/lib/seed-data";

const iconMap: Record<string, any> = {
  Code2,
  FileCode,
  Cpu,
  Terminal,
  Layout,
  Layers,
  Atom,
  Server,
  Workflow,
  Palette,
  Sparkles,
  Database,
  Table,
  Cloud,
  Box,
  Zap,
  GitBranch,
  Globe,
  Lock,
  CreditCard,
  CheckCircle2,
  Send,
  ShieldCheck,
  Network,
  CheckSquare,
  Binary,
  HardDrive,
  Wifi,
  FolderTree,
  Bot,
};

export default function SkillMatrix() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredCategories =
    activeCategory === "all"
      ? SKILL_CATEGORIES
      : SKILL_CATEGORIES.filter((c) => c.id === activeCategory);

  return (
    <section id="skills" className="py-24 bg-[#fbf9f5] dark:bg-[#0c0a09] border-t border-stone-200 dark:border-stone-900 text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-700 dark:text-amber-400 text-xs font-mono mb-3 shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Visual Skill Matrix</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Technical Stack &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 dark:from-amber-400 dark:to-yellow-400">
              Proficiency Index
            </span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm max-w-2xl mt-2 font-sans">
            Comprehensive overview of programming languages, frontend/backend frameworks, cloud databases, & core CS topics.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-12 bg-white dark:bg-stone-900 p-2 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-sm max-w-4xl mx-auto">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeCategory === "all"
                ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
            }`}
          >
            All Categories
          </button>
          {SKILL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                  : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Categories & Skill Meters */}
        <div className="space-y-8">
          <AnimatePresence mode="wait">
            {filteredCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm"
              >
                <h3 className="text-xs font-mono uppercase tracking-wider text-amber-700 dark:text-amber-400 mb-4 font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  {category.name}
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.skills.map((skill, sIdx) => {
                    const IconComponent = iconMap[skill.icon] || Code2;
                    return (
                      <div
                        key={sIdx}
                        className="p-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 border border-stone-200 dark:border-stone-800">
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-heading">
                                {skill.name}
                              </p>
                              <span className="text-[10px] text-stone-500 dark:text-stone-400 font-mono">{skill.level}</span>
                            </div>
                          </div>
                          <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400">{skill.percentage}%</span>
                        </div>

                        {/* Visual Progress Bar Meter in Warm Amber Mustard */}
                        <div className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                            className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}

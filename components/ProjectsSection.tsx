"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FolderGit2, ExternalLink, Cpu, Search, Sparkles } from "lucide-react";
import { ProjectData } from "@/lib/seed-data";

interface ProjectsSectionProps {
  projects: ProjectData[];
  onSelectArchitecture: (project: ProjectData) => void;
}

export default function ProjectsSection({ projects, onSelectArchitecture }: ProjectsSectionProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === "All" || project.category === activeCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.techBadges.some((b) => b.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-24 bg-[#fbf9f5] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 relative transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-700 dark:text-amber-400 text-xs font-mono mb-3 shadow-sm">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Featured Software Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight font-heading">
            Production SaaS &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 dark:from-amber-400 dark:to-yellow-400">
              System Engineering
            </span>
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm max-w-2xl mt-2 font-sans">
            Click &quot;View Architecture&quot; to inspect authorization protocols, schema designs, caching tiers, and API pipelines.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2 bg-white dark:bg-stone-900 p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-amber-500 text-stone-950 font-bold shadow-sm"
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search tech, keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-amber-500 font-medium"
            />
          </div>
        </div>

        {/* Project Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 text-[11px] font-mono font-bold uppercase">
                      {project.category}
                    </span>

                    {project.featured && (
                      <span className="flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-mono font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors mb-1 font-heading">
                    {project.title}
                  </h3>
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-mono mb-4">{project.subtitle}</p>

                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed mb-6 font-sans">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techBadges.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2.5 py-1 rounded-md bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 text-xs font-mono"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-3">
                  <button
                    onClick={() => onSelectArchitecture(project)}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-[#fbf9f5] dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-900 dark:text-amber-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-sm border border-stone-200 dark:border-stone-700"
                  >
                    <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>View Architecture</span>
                  </button>

                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-opacity"
                    title="Live Demo Link"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 text-stone-500 text-xs font-mono">
            No projects matched your criteria.
          </div>
        )}

      </div>
    </section>
  );
}

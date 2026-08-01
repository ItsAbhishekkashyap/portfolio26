"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Lock, Database, Zap, Globe, CheckCircle2, ExternalLink, Github } from "lucide-react";
import { ProjectData } from "@/lib/seed-data";

interface ProjectArchDrawerProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectArchDrawer({ project, onClose }: ProjectArchDrawerProps) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/70 backdrop-blur-sm"
        />

        {/* Slide-over Drawer Panel */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="relative w-full max-w-lg bg-white dark:bg-stone-900 border-l border-stone-200 dark:border-stone-800 shadow-2xl p-6 overflow-y-auto z-10 flex flex-col justify-between text-stone-900 dark:text-stone-100 transition-colors"
        >
          <div>
            {/* Header & Close Button */}
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-bold">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 font-heading">{project.title}</h3>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-mono font-semibold">{project.subtitle}</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                title="Close Architecture Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview */}
            <div className="mb-6">
              <h4 className="text-xs uppercase font-mono tracking-wider text-amber-700 dark:text-amber-400 mb-2 font-bold">Project Overview</h4>
              <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed bg-[#fbf9f5] dark:bg-stone-950 p-4 rounded-xl border border-stone-200 dark:border-stone-800 font-sans">
                {project.description}
              </p>
            </div>

            {/* Architecture Highlights Grid */}
            <div className="space-y-4 mb-6">
              <h4 className="text-xs uppercase font-mono tracking-wider text-amber-700 dark:text-amber-400 font-bold">System Architecture Matrix</h4>

              {/* Auth */}
              <div className="p-3.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-heading">Authentication & Security</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-sans">{project.architecture?.auth || "Standard JWT"}</p>
                </div>
              </div>

              {/* Database */}
              <div className="p-3.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0">
                  <Database className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-heading">Database & Schemas</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-sans">{project.architecture?.database || "MongoDB / Mongoose"}</p>
                </div>
              </div>

              {/* Caching */}
              <div className="p-3.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-heading">Caching & Performance</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-sans">{project.architecture?.caching || "Redis & Edge SWR"}</p>
                </div>
              </div>

              {/* APIs */}
              <div className="p-3.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100 font-heading">APIs & Integrations</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5 font-sans">{project.architecture?.apis || "REST & Server Actions"}</p>
                </div>
              </div>
            </div>

            {/* Key System Highlights Bullet Points */}
            {project.architecture?.systemHighlights && project.architecture.systemHighlights.length > 0 && (
              <div className="mb-6">
                <h4 className="text-xs uppercase font-mono tracking-wider text-amber-700 dark:text-amber-400 mb-3 font-bold">Key Technical Achievements</h4>
                <ul className="space-y-2">
                  {project.architecture.systemHighlights.map((hl, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-stone-700 dark:text-stone-300 bg-[#fbf9f5] dark:bg-stone-950 p-3 rounded-xl border border-stone-200 dark:border-stone-800 font-sans">
                      <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Footer Action Buttons */}
          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex items-center gap-3">
            <a
              href={project.liveLink}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-sm font-mono"
            >
              <span>Visit Live Demo</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 px-4 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 font-bold text-xs flex items-center justify-center gap-2 font-mono"
              >
                <Github className="w-4 h-4" />
                <span>Source</span>
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

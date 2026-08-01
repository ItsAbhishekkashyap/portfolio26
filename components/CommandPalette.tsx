"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, Download, Sun, Moon, Briefcase, FolderGit2, SlidersHorizontal, Calendar, Github, Linkedin, ExternalLink, X, FileText } from "lucide-react";
import { PERSONA } from "@/lib/seed-data";
import { useTheme } from "next-themes";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenSchedule: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume, onOpenSchedule }: CommandPaletteProps) {
  const { theme, setTheme } = useTheme();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    {
      id: "projects",
      title: "View Featured Projects",
      subtitle: "AyuNidan AI, Branqly SaaS, MenuLuxe SaaS, Placement Portal",
      icon: FolderGit2,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "experience",
      title: "View Work Experience & Milestones",
      subtitle: "Panscience Innovations & Durga Foundation",
      icon: Briefcase,
      action: () => {
        document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "skills",
      title: "View Visual Skill Matrix",
      subtitle: "Languages, Frameworks, Databases, Tools, Core CS",
      icon: SlidersHorizontal,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "download-resume",
      title: "Download Resume PDF",
      subtitle: "Directly download Abhishek_Gond_Resume.pdf",
      icon: Download,
      action: () => {
        window.open(PERSONA.resumeUrl, "_blank");
        onClose();
      },
    },
    {
      id: "resume-modal",
      title: "Open Interactive Resume Overview",
      subtitle: "Interactive inline resume preview",
      icon: FileText,
      action: () => {
        onClose();
        onOpenResume();
      },
    },
    {
      id: "schedule",
      title: "Schedule 15-Min Discussion / Call",
      subtitle: "Calendar invite request modal",
      icon: Calendar,
      action: () => {
        onClose();
        onOpenSchedule();
      },
    },
    {
      id: "theme",
      title: `Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`,
      subtitle: "Toggle global website color system",
      icon: theme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        onClose();
      },
    },
    {
      id: "leetcode",
      title: "Open LeetCode Profile",
      subtitle: "400+ Solved, 1404 Contest Rating, 60-Day Streak",
      icon: ExternalLink,
      action: () => {
        window.open(PERSONA.socials.leetcode, "_blank");
        onClose();
      },
    },
    {
      id: "github",
      title: "Open GitHub Profile",
      subtitle: "github.com/ItsAbhishekkashyap",
      icon: Github,
      action: () => {
        window.open(PERSONA.socials.github, "_blank");
        onClose();
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-start justify-center pt-20 p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/70 dark:bg-stone-950/85 backdrop-blur-sm"
        />

        {/* Spotlight Command Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -10 }}
          className="relative w-full max-w-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden z-10 text-stone-900 dark:text-stone-100 flex flex-col transition-colors"
        >
          {/* Search Bar Input */}
          <div className="p-4 border-b border-stone-200 dark:border-stone-800 flex items-center gap-3">
            <Search className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, skills, resume, commands... (Esc to close)"
              className="w-full bg-transparent text-sm text-stone-900 dark:text-stone-100 placeholder-stone-400 focus:outline-none font-medium"
            />
            <button onClick={onClose} className="p-1 rounded text-stone-400 hover:text-stone-900 dark:hover:text-stone-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Items List */}
          <div className="max-h-80 overflow-y-auto p-2 space-y-1">
            {filteredItems.map((item) => {
              const IconComp = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className="w-full p-3 rounded-xl hover:bg-amber-50 dark:hover:bg-stone-800 flex items-center justify-between text-left transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-stone-100 dark:bg-stone-950 text-stone-700 dark:text-amber-400 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {item.title}
                      </p>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400">{item.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 group-hover:text-amber-600 dark:group-hover:text-amber-400 font-bold">Select →</span>
                </button>
              );
            })}

            {filteredItems.length === 0 && (
              <div className="p-8 text-center text-xs text-stone-500 font-mono">
                No matching results found for &quot;{query}&quot;.
              </div>
            )}
          </div>

          {/* Footer Shortcuts Hint */}
          <div className="bg-[#fbf9f5] dark:bg-stone-950 px-4 py-2.5 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between text-[10px] font-mono text-stone-500">
            <span>Abhishek Gond Spotlight Search</span>
            <div className="flex items-center gap-2">
              <span className="bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded text-stone-700 dark:text-stone-300">⌘K</span>
              <span>to toggle</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

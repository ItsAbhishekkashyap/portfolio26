"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Folder, User, Terminal, Code2, ArrowRight, Download, Mail, Activity, Github, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PERSONA } from "@/lib/seed-data";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenSchedule: () => void;
}

export default function CommandPalette({ isOpen, onClose, onOpenResume, onOpenSchedule }: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        isOpen ? onClose() : document.dispatchEvent(new CustomEvent("open-command-palette"));
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const COMMANDS = [
    { id: "work", name: "View Selected Works", icon: Folder, action: () => { window.location.hash = "#work"; onClose(); } },
    { id: "journey", name: "View Engineering Journey", icon: Activity, action: () => { window.location.hash = "#journey"; onClose(); } },
    { id: "skills", name: "View Tech Constellation", icon: Code2, action: () => { window.location.hash = "#skills"; onClose(); } },
    { id: "lab", name: "Explore Digital Lab", icon: Terminal, action: () => { window.location.hash = "#lab"; onClose(); } },
    { id: "contact", name: "Contact & Discussion", icon: Mail, action: () => { window.location.hash = "#contact"; onClose(); } },
    { id: "resume", name: "Download PDF Resume", icon: Download, action: () => { onOpenResume(); onClose(); } },
    { id: "schedule", name: "Schedule a Meeting", icon: User, action: () => { onOpenSchedule(); onClose(); } },
    { id: "github", name: "View GitHub Profile", icon: Github, action: () => { window.open(PERSONA.socials.github, "_blank"); onClose(); } },
    { id: "admin", name: "Access Admin CMS", icon: Shield, action: () => { window.location.href = "/admin/login"; onClose(); } },
  ];

  const filteredCommands = COMMANDS.filter(cmd => cmd.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[20vh]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-md"
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-surface border border-white/10 shadow-2xl shadow-black/50 rounded-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-4 border-b border-white/5">
              <Search className="w-5 h-5 text-stone-500" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands or navigate..."
                className="w-full bg-transparent border-none text-stone-200 placeholder:text-stone-600 focus:ring-0 px-4 py-5 font-mono text-sm outline-none"
              />
              <span className="text-[10px] text-stone-600 font-mono border border-white/10 px-2 py-1 rounded bg-white/5">ESC</span>
            </div>

            {/* Command List */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredCommands.length > 0 ? (
                <div className="space-y-1">
                  {filteredCommands.map((cmd) => (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/5 group transition-colors text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-stone-500 group-hover:text-accent transition-colors">
                          <cmd.icon className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-sans text-stone-300 group-hover:text-white transition-colors">{cmd.name}</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-stone-600 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-12 text-center text-sm font-mono text-stone-500">
                  No commands found.
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-3 border-t border-white/5 bg-background flex items-center justify-between">
              <span className="text-[10px] font-mono text-stone-600 uppercase tracking-widest">AG Command Palette</span>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-stone-600">Navigation system</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

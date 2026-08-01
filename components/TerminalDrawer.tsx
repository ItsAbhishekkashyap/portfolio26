"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon, X, CornerDownLeft, Sparkles, Check, ArrowRight } from "lucide-react";
import { PERSONA } from "@/lib/seed-data";
import { useTheme } from "next-themes";

interface TerminalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenSchedule: () => void;
}

interface CommandLog {
  command?: string;
  output: React.ReactNode;
  type?: "input" | "system" | "error";
}

export default function TerminalDrawer({ isOpen, onClose, onOpenResume, onOpenSchedule }: TerminalDrawerProps) {
  const { theme, setTheme } = useTheme();
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      type: "system",
      output: (
        <div>
          <p className="text-teal-400 font-mono font-bold">
            Abhishek Gond Interactive Command Palette CLI [App Router v1.0]
          </p>
          <p className="text-slate-400 text-xs mt-1 font-mono">
            Type or click a command below to control portfolio view in real-time.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

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

  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: CommandLog[] = [...history, { command: cmdStr, output: "", type: "input" }];

    switch (cmd) {
      case "help":
        newLogs.push({
          output: (
            <div className="space-y-2 font-mono text-xs">
              <p className="text-teal-400 font-bold">Available Interactive Commands:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-300">
                <button onClick={() => executeCommand("projects")} className="text-left p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-teal-500 text-teal-300">
                  ⚡ <strong>projects</strong> — Jump to projects
                </button>
                <button onClick={() => executeCommand("skills")} className="text-left p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-teal-500 text-teal-300">
                  ⚡ <strong>skills</strong> — View skill matrix
                </button>
                <button onClick={() => executeCommand("resume")} className="text-left p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-teal-500 text-teal-300">
                  ⚡ <strong>resume</strong> — Open resume modal
                </button>
                <button onClick={() => executeCommand("contact")} className="text-left p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-teal-500 text-teal-300">
                  ⚡ <strong>contact</strong> — Schedule 15-min call
                </button>
                <button onClick={() => executeCommand("theme")} className="text-left p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-teal-500 text-teal-300">
                  ⚡ <strong>theme</strong> — Toggle dark/light mode
                </button>
                <button onClick={() => executeCommand("whoami")} className="text-left p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-teal-500 text-teal-300">
                  ⚡ <strong>whoami</strong> — View recruiter session
                </button>
              </div>
            </div>
          ),
        });
        break;

      case "projects":
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
        newLogs.push({
          output: <p className="text-teal-400 font-mono text-xs">Jumping to Projects Showcase...</p>,
        });
        break;

      case "skills":
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        onClose();
        newLogs.push({
          output: <p className="text-teal-400 font-mono text-xs">Jumping to Skill Matrix...</p>,
        });
        break;

      case "resume":
        onClose();
        onOpenResume();
        newLogs.push({
          output: <p className="text-teal-400 font-mono text-xs">Opening Interactive Resume Overview...</p>,
        });
        break;

      case "contact":
        onClose();
        onOpenSchedule();
        newLogs.push({
          output: <p className="text-teal-400 font-mono text-xs">Opening Schedule Call Modal...</p>,
        });
        break;

      case "theme":
        setTheme(theme === "dark" ? "light" : "dark");
        newLogs.push({
          output: <p className="text-teal-400 font-mono text-xs">Theme mode toggled to {theme === "dark" ? "Light" : "Dark"}.</p>,
        });
        break;

      case "whoami":
        newLogs.push({
          output: (
            <div className="font-mono text-xs text-slate-300">
              <p>Session ID: <span className="text-teal-400">recruiter_guest_2026</span></p>
              <p>Candidate: <span className="text-slate-100 font-bold">{PERSONA.name} ({PERSONA.contact.email})</span></p>
            </div>
          ),
        });
        break;

      case "clear":
        setHistory([]);
        setInputVal("");
        return;

      default:
        newLogs.push({
          type: "error",
          output: (
            <p className="font-mono text-xs text-rose-400">
              Unknown command &apos;{cmdStr}&apos;. Type &apos;help&apos; for available commands.
            </p>
          ),
        });
        break;
    }

    setHistory(newLogs);
    setInputVal("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Command Palette Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-2xl bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col h-[460px] text-slate-100"
        >
          {/* Top Bar */}
          <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-teal-400" />
              <span className="font-mono text-xs font-bold text-slate-200">Interactive Command Palette</span>
            </div>

            <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-100">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Quick Command Buttons Bar */}
          <div className="bg-slate-900/60 p-2.5 border-b border-slate-800 flex flex-wrap gap-2 text-[11px] font-mono">
            {["help", "projects", "skills", "resume", "contact", "theme", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 hover:border-teal-500 text-slate-300 hover:text-teal-400 transition-colors"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* History Output Container */}
          <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-3">
            {history.map((log, index) => (
              <div key={index}>
                {log.command && (
                  <div className="flex items-center gap-2 text-slate-400 mb-1">
                    <span className="text-teal-400 font-bold">guest@abhishek:~$</span>
                    <span className="text-slate-100 font-semibold">{log.command}</span>
                  </div>
                )}
                <div>{log.output}</div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleFormSubmit} className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <span className="text-teal-400 font-mono text-xs font-bold pl-2">~$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="type command (e.g. projects, skills, resume)..."
              className="flex-1 bg-transparent font-mono text-xs text-slate-100 focus:outline-none placeholder-slate-600"
            />
            <button type="submit" className="text-slate-400 hover:text-teal-400 pr-2">
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

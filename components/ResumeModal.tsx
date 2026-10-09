"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, CheckCircle2, Award, Briefcase, GraduationCap } from "lucide-react";
import { PERSONA, EXPERIENCES } from "@/lib/seed-data";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-background/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-surface border border-white/10 rounded-2xl shadow-2xl shadow-black overflow-hidden z-10 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-white/5 px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-accent/10 text-accent border border-accent/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-medium text-lg uppercase tracking-tight">{PERSONA.name}</h3>
                <p className="text-[10px] text-stone-400 font-mono uppercase tracking-widest">Full-Stack Software Engineer</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Resume Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-8 text-sm">
            
            {/* Education */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h4>
              <div className="p-4 rounded-xl border border-white/5 flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h5 className="font-display font-medium text-lg uppercase tracking-tight">{PERSONA.education.degree}</h5>
                  <p className="text-sm text-stone-400 mt-1">{PERSONA.education.institution}</p>
                  <p className="text-[10px] text-accent font-mono uppercase tracking-widest mt-2">CGPA: {PERSONA.education.cgpa}</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 text-stone-300 uppercase tracking-widest">
                  {PERSONA.education.timeline}
                </span>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Work Experience
              </h4>
              <div className="space-y-4">
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/5">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <h5 className="font-display font-medium text-lg uppercase tracking-tight">
                        {exp.role} <span className="text-stone-500">// {exp.company}</span>
                      </h5>
                      <span className="text-[10px] font-mono text-stone-500 uppercase tracking-widest">{exp.period}</span>
                    </div>
                    <ul className="space-y-2 text-sm text-stone-300 leading-relaxed">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-accent mt-1">?</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Achievements */}
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-accent mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Highlights
              </h4>
              <div className="p-4 rounded-xl border border-white/5 text-sm space-y-3 text-stone-300">
                <p><strong>DSA:</strong> Solved {PERSONA.leetcodeStats.solved} problems, Contest Rating {PERSONA.leetcodeStats.rating} ({PERSONA.leetcodeStats.percentile}), {PERSONA.leetcodeStats.streak} Streak.</p>
                <p><strong>Taekwondo:</strong> {PERSONA.athletics.title} ({PERSONA.athletics.belt}).</p>
                <p><strong>Leadership:</strong> {PERSONA.leadership[0].role}, {PERSONA.leadership[0].organization}.</p>
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="bg-white/5 px-6 py-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-stone-500 font-mono uppercase tracking-widest">Email: {PERSONA.contact.email}</span>

            <a
              href={PERSONA.resumeUrl}
              download
              className="px-6 py-3 rounded-full bg-accent hover:bg-white text-black font-mono font-bold text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all duration-300"
            >
              <Download className="w-4 h-4" />
              <span>Download Full PDF Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

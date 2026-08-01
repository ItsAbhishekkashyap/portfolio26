"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, FileText, ExternalLink, CheckCircle2, Award, Briefcase, GraduationCap } from "lucide-react";
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
          className="fixed inset-0 bg-slate-950/80 dark:bg-slate-950/90 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-10 text-slate-900 dark:text-slate-100 flex flex-col max-h-[85vh]"
        >
          {/* Header */}
          <div className="bg-slate-100 dark:bg-slate-950 px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 border border-teal-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight">{PERSONA.name} — Resume Overview</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">Full-Stack Software Engineer & High Agency Fellow</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Resume Content */}
          <div className="flex-1 p-6 overflow-y-auto space-y-6 text-sm">
            
            {/* Education */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100">{PERSONA.education.degree}</h5>
                  <p className="text-xs text-slate-600 dark:text-slate-400">{PERSONA.education.institution}</p>
                  <p className="text-xs text-teal-600 dark:text-teal-400 font-mono font-semibold mt-1">CGPA: {PERSONA.education.cgpa}</p>
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {PERSONA.education.timeline}
                </span>
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold mb-3 flex items-center gap-2">
                <Briefcase className="w-4 h-4" />
                Work Experience
              </h4>
              <div className="space-y-3">
                {EXPERIENCES.map((exp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                    <div className="flex justify-between items-center mb-2">
                      <h5 className="font-bold text-slate-900 dark:text-slate-100">{exp.role} — <span className="text-teal-600 dark:text-teal-400">{exp.company}</span></h5>
                      <span className="text-xs font-mono text-slate-500">{exp.period}</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                      {exp.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 shrink-0 mt-0.5" />
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
              <h4 className="text-xs font-mono uppercase tracking-wider text-teal-600 dark:text-teal-400 font-bold mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" />
                Highlights & Athletics
              </h4>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                <p><strong>LeetCode DSA:</strong> Solved 400+ problems, Contest Rating 1404 (Top 84.15%), 60-Day Streak.</p>
                <p><strong>Taekwondo:</strong> Silver Medalist, Open National Taekwondo Championship (Green 1 Belt).</p>
                <p><strong>TPC Leadership:</strong> Core Member, Training & Placement Cell, IET Lucknow.</p>
              </div>
            </div>

          </div>

          {/* Footer Action */}
          <div className="bg-slate-100 dark:bg-slate-950 px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-mono">Email: {PERSONA.contact.email}</span>

            <a
              href={`mailto:${PERSONA.contact.email}?subject=Request Complete PDF Resume`}
              className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Request Full PDF Resume</span>
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

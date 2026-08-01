"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Phone, MapPin, Award, ArrowRight, Download, Calendar, Copy, Check, FileText } from "lucide-react";
import { PERSONA } from "@/lib/seed-data";

interface HeroProps {
  onScheduleCall: () => void;
  onOpenResume: () => void;
}

export default function Hero({ onScheduleCall, onOpenResume }: HeroProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONA.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section className="relative pt-32 pb-20 bg-[#fbf9f5] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Text (Left 7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Status Pill (No Green Dot) */}
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-amber-700 dark:text-amber-400 text-xs font-mono mb-6 shadow-sm font-semibold">
              <span>{PERSONA.contact.status}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-[1.15] font-heading">
              Architecting High Agency Systems &{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 dark:from-amber-400 dark:via-amber-300 dark:to-yellow-400">
                Production AI Platforms
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-400 mb-6 leading-relaxed max-w-2xl font-sans">
              Hi, I&apos;m <span className="text-stone-900 dark:text-stone-100 font-bold">{PERSONA.name}</span> — {PERSONA.role} & B.Tech ECE candidate at{" "}
              <span className="text-amber-700 dark:text-amber-400 font-semibold">{PERSONA.education.institution}</span> ({PERSONA.education.timeline}). Co-developer of AyuNidan AI & multi-tenant SaaS architectures.
            </p>

            {/* Quick Info Badges */}
            <div className="flex flex-wrap gap-3 text-xs font-mono text-stone-600 dark:text-stone-400 mb-8">
              <button
                onClick={handleCopyEmail}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500 transition-colors shadow-sm"
                title="Click to copy email"
              >
                <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{PERSONA.contact.email}</span>
                {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3 opacity-50" />}
              </button>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{PERSONA.contact.phone}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>{PERSONA.contact.location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <a
                href={PERSONA.resumeUrl}
                download="Abhishek_Gond_Resume.pdf"
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all hover:scale-105"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume PDF</span>
              </a>

              <a
                href="#projects"
                className="px-5 py-3 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-950 font-bold text-xs flex items-center justify-center gap-2 shadow-md hover:opacity-90 transition-all"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onScheduleCall}
                className="px-5 py-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 font-semibold text-xs flex items-center justify-center gap-2 hover:border-amber-500 transition-all shadow-sm"
              >
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Schedule Call</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={PERSONA.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 transition-colors shadow-sm"
                  title="GitHub Profile"
                >
                  <Github className="w-4 h-4" />
                </a>

                <a
                  href={PERSONA.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-500 transition-colors shadow-sm"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Profile Photo Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="w-full max-w-md bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-xl relative">
              <div className="relative w-full h-[410px] rounded-xl overflow-hidden mb-4 border border-stone-200 dark:border-stone-800 shadow-inner group">
                <Image
                  src={PERSONA.avatar}
                  alt={PERSONA.name}
                  fill
                  className="object-cover object-[center_60%] group-hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>

              {/* Education Badge Below Image */}
              <div className="p-3.5 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 mb-4 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">{PERSONA.education.degree}</p>
                  <p className="text-amber-700 dark:text-amber-400 font-mono font-bold mt-0.5">CGPA: {PERSONA.education.cgpa}</p>
                </div>
                <Award className="w-5 h-5 text-amber-500 shrink-0 ml-2" />
              </div>

              {/* High Impact Metrics */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <p className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">400+</p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-semibold">DSA Problems Solved</p>
                </div>
                <div className="p-3 rounded-xl bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800">
                  <p className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">1404</p>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 uppercase font-semibold">LeetCode Rating</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

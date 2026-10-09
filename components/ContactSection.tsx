"use client";

import React from "react";
import { PERSONA } from "@/lib/seed-data";
import { ArrowUpRight } from "lucide-react";

interface ContactSectionProps {
  scheduleOpen: boolean;
  onCloseSchedule: () => void;
  onOpenSchedule: () => void;
}

export default function ContactSection({ onOpenSchedule }: ContactSectionProps) {
  return (
    <section id="contact" className="w-full bg-background py-32 md:py-48 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto flex flex-col items-center text-center">
        <h2 className="font-display text-5xl md:text-8xl lg:text-[10vw] leading-[0.85] font-bold uppercase tracking-tighter mb-12">
          Let's Build <br/>
          <span className="text-stone-500">Something</span> <br/>
          <span className="text-accent italic">Extraordinary.</span>
        </h2>

        <p className="font-sans text-sm md:text-lg text-stone-400 max-w-xl mx-auto leading-relaxed mb-16">
          Available for software engineering roles, high-agency projects, and technical collaboration.
        </p>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 font-mono text-xs md:text-sm uppercase tracking-widest">
          <a href={`mailto:${PERSONA.contact.email}`} className="flex items-center gap-2 hover:text-accent transition-colors">
            {PERSONA.contact.email} <ArrowUpRight className="w-4 h-4" />
          </a>
          <button onClick={onOpenSchedule} className="flex items-center gap-2 hover:text-accent transition-colors">
            Schedule a Meeting <ArrowUpRight className="w-4 h-4" />
          </button>
          <a href={PERSONA.resumeUrl} download className="flex items-center gap-2 hover:text-accent transition-colors">
            Download Resume <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

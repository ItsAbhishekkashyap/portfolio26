"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ProjectData } from "@/lib/seed-data";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface FeaturedWorkProps {
  projects: ProjectData[];
  onSelectArchitecture: (project: ProjectData) => void;
}

export default function FeaturedWork({ projects, onSelectArchitecture }: FeaturedWorkProps) {
  return (
    <section id="work" className="w-full bg-background pt-24 pb-48 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-48">
          <h2 className="font-display text-5xl md:text-8xl font-bold uppercase tracking-tighter">
            Selected <br/> <span className="text-stone-500">Works</span>
          </h2>
          <p className="font-mono text-xs md:text-sm text-stone-400 uppercase tracking-widest mt-8 md:mt-0 max-w-xs text-left md:text-right">
            Production systems, AI pipelines, and SaaS architectures built from the ground up.
          </p>
        </div>

        <div className="flex flex-col gap-32 md:gap-64">
          {projects.filter(p => p.featured).map((project, idx) => (
            <ProjectCaseStudy 
              key={project.id} 
              project={project} 
              index={idx} 
              onSelectArchitecture={onSelectArchitecture} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCaseStudy({ project, index, onSelectArchitecture }: { project: ProjectData, index: number, onSelectArchitecture: (p: ProjectData) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-24 gap-8">
        <div>
          <span className="font-mono text-sm text-accent uppercase tracking-widest mb-4 block">
            PROJECT / 00{index + 1}
          </span>
          <h3 className="font-display text-4xl md:text-6xl lg:text-8xl font-medium tracking-tighter uppercase">
            {project.title}
          </h3>
          <p className="font-mono text-sm md:text-lg text-stone-400 uppercase tracking-widest mt-2 md:mt-4">
            {project.subtitle}
          </p>
        </div>
        
        <div className="flex gap-4">
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" className="w-12 h-12 rounded-full border border-stone-800 flex items-center justify-center hover:bg-accent hover:text-black hover:border-accent transition-all">
              <ArrowUpRight className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      {/* Visual / Abstract Representation */}
      <div className="w-full h-[50vh] md:h-[70vh] bg-surface relative overflow-hidden rounded-xl border border-white/5 group mb-12 md:mb-24">
        {project.imageUrl ? (
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            fill 
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700" 
          />
        ) : (
          <>
            <motion.div style={{ y }} className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity duration-1000">
              <div className="w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] rounded-full border-[1px] border-accent/30 blur-3xl mix-blend-screen" />
            </motion.div>
            <div className="absolute inset-0 flex items-center justify-center text-stone-800 font-mono text-sm uppercase tracking-widest">
              System Visualization [Abstract]
            </div>
          </>
        )}
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
        <div className="col-span-1 md:col-span-4 flex flex-col gap-8">
          <div>
            <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-4">Core Description</h4>
            <p className="text-stone-300 text-sm md:text-base leading-relaxed">{project.description}</p>
          </div>
          <div>
            <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {project.techBadges.map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-stone-300">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-1 md:col-span-1" />

        <div className="col-span-1 md:col-span-7 flex flex-col gap-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-2">Authentication</h4>
              <p className="text-stone-300 text-sm">{project.architecture.auth}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-2">Database</h4>
              <p className="text-stone-300 text-sm">{project.architecture.database}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-2">Caching/Data</h4>
              <p className="text-stone-300 text-sm">{project.architecture.caching}</p>
            </div>
            <div>
              <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-2">APIs/Engine</h4>
              <p className="text-stone-300 text-sm">{project.architecture.apis}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-mono text-xs text-stone-500 uppercase tracking-widest mb-4">System Highlights</h4>
            <ul className="flex flex-col gap-3">
              {project.architecture.systemHighlights.map((highlight, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-stone-300">
                  <span className="text-accent mt-1">?</span> {highlight}
                </li>
              ))}
            </ul>
          </div>

          <button 
            onClick={() => onSelectArchitecture(project)}
            className="self-start mt-8 px-6 py-3 bg-white/5 hover:bg-accent hover:text-black border border-white/10 hover:border-accent transition-all duration-300 rounded-full font-mono text-xs uppercase tracking-widest"
          >
            View Architecture Diagram
          </button>
        </div>
      </div>
    </motion.div>
  );
}

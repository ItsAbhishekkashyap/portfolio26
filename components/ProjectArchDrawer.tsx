"use client";

import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { ProjectData } from "@/lib/seed-data";
import gsap from "gsap";

interface ProjectArchDrawerProps {
  project: ProjectData | null;
  onClose: () => void;
}

export default function ProjectArchDrawer({ project, onClose }: ProjectArchDrawerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (project && containerRef.current) {
      const nodes = containerRef.current.querySelectorAll(".arch-node");
      const lines = containerRef.current.querySelectorAll(".arch-line path");

      gsap.fromTo(nodes, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
      
      gsap.fromTo(lines, 
        { strokeDasharray: 1000, strokeDashoffset: 1000 }, 
        { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", delay: 0.5 }
      );
    }
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-background/90 backdrop-blur-xl flex flex-col justify-center items-center overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-8 right-8 font-display font-medium text-sm tracking-widest uppercase hover:text-accent transition-colors flex items-center gap-2"
        >
          Close <X className="w-5 h-5" />
        </button>

        <div className="w-full max-w-screen-xl mx-auto px-6 py-24 flex flex-col items-center">
          <h3 className="font-display text-3xl md:text-5xl font-medium tracking-tighter uppercase mb-4 text-center">
            {project.title} <br/>
            <span className="text-stone-500">Architecture</span>
          </h3>

          {/* Abstract Architecture Flow */}
          <div ref={containerRef} className="relative w-full max-w-3xl mt-16 flex flex-col items-center gap-12">
            
            {/* Node 1 */}
            <div className="arch-node w-64 p-6 border border-white/10 bg-surface rounded-xl flex flex-col items-center text-center z-10 relative group hover:border-accent transition-colors">
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Frontend / Client</span>
              <span className="font-sans text-sm text-stone-200">Next.js / React / TypeScript</span>
            </div>

            {/* Line down */}
            <svg className="arch-line absolute left-1/2 -translate-x-1/2 w-2 h-16 top-[5.5rem] -z-10" viewBox="0 0 2 64">
              <path d="M1 0V64" fill="none" stroke="rgba(204,255,0,0.3)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>

            {/* Node 2 */}
            <div className="arch-node w-64 p-6 border border-white/10 bg-surface rounded-xl flex flex-col items-center text-center z-10 relative group hover:border-accent transition-colors">
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">API & Compute</span>
              <span className="font-sans text-sm text-stone-200">{project.architecture.apis}</span>
            </div>

            {/* Fork Lines */}
            <svg className="arch-line absolute left-1/2 -translate-x-1/2 w-64 h-16 top-[15rem] -z-10" viewBox="0 0 256 64">
              <path d="M128 0V32H2V64" fill="none" stroke="rgba(204,255,0,0.3)" strokeWidth="2" />
              <path d="M128 0V32H254V64" fill="none" stroke="rgba(204,255,0,0.3)" strokeWidth="2" />
            </svg>

            {/* Node 3 & 4 */}
            <div className="flex gap-16 w-full justify-center mt-4">
              <div className="arch-node w-48 p-6 border border-white/10 bg-surface rounded-xl flex flex-col items-center text-center z-10 relative group hover:border-accent transition-colors">
                <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Auth / Security</span>
                <span className="font-sans text-sm text-stone-200">{project.architecture.auth}</span>
              </div>
              <div className="arch-node w-48 p-6 border border-white/10 bg-surface rounded-xl flex flex-col items-center text-center z-10 relative group hover:border-accent transition-colors">
                <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Caching</span>
                <span className="font-sans text-sm text-stone-200">{project.architecture.caching}</span>
              </div>
            </div>

            {/* Join Lines */}
            <svg className="arch-line absolute left-1/2 -translate-x-1/2 w-64 h-16 top-[26rem] -z-10" viewBox="0 0 256 64">
              <path d="M2 0V32H128V64" fill="none" stroke="rgba(204,255,0,0.3)" strokeWidth="2" />
              <path d="M254 0V32H128V64" fill="none" stroke="rgba(204,255,0,0.3)" strokeWidth="2" />
            </svg>

            {/* Node 5 */}
            <div className="arch-node w-64 p-6 border border-white/10 bg-surface rounded-xl flex flex-col items-center text-center z-10 relative group hover:border-accent transition-colors mt-4">
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest mb-2 block">Database / State</span>
              <span className="font-sans text-sm text-stone-200">{project.architecture.database}</span>
            </div>
            
          </div>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-24 flex items-center gap-4"
          >
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" className="px-6 py-3 bg-white/5 hover:bg-accent hover:text-black border border-white/10 hover:border-accent transition-all duration-300 rounded-full font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span>View Live</span> <ExternalLink className="w-3 h-3" />
              </a>
            )}
            {project.githubLink && (
              <a href={project.githubLink} target="_blank" className="px-6 py-3 bg-white/5 hover:bg-white hover:text-black border border-white/10 hover:border-white transition-all duration-300 rounded-full font-mono text-xs uppercase tracking-widest flex items-center gap-2">
                <span>Source</span> <Github className="w-3 h-3" />
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

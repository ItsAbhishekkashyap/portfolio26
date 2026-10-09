"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

// Pre-defined controlled node positions (relative coordinates 0 to 100)
const NODES = [
  { id: "next", label: "Next.js", x: 50, y: 30, category: "framework", connectsTo: ["react", "ts", "tailwind", "node"] },
  { id: "react", label: "React", x: 35, y: 40, category: "framework", connectsTo: ["ts", "tailwind"] },
  { id: "ts", label: "TypeScript", x: 65, y: 40, category: "language", connectsTo: ["node"] },
  { id: "node", label: "Node.js", x: 50, y: 60, category: "backend", connectsTo: ["express", "mongo", "postgres"] },
  { id: "express", label: "Express", x: 30, y: 70, category: "backend", connectsTo: ["mongo", "postgres"] },
  { id: "python", label: "Python", x: 75, y: 65, category: "language", connectsTo: ["fastapi", "ai", "ml"] },
  { id: "fastapi", label: "FastAPI", x: 85, y: 80, category: "backend", connectsTo: ["ai", "postgres"] },
  { id: "mongo", label: "MongoDB", x: 40, y: 85, category: "database", connectsTo: [] },
  { id: "postgres", label: "PostgreSQL", x: 60, y: 85, category: "database", connectsTo: ["prisma"] },
  { id: "prisma", label: "Prisma", x: 60, y: 70, category: "tool", connectsTo: ["node"] },
  { id: "ai", label: "Gen AI / LLM", x: 80, y: 45, category: "concept", connectsTo: ["python", "ts", "ml"] },
  { id: "ml", label: "Machine Learning", x: 90, y: 55, category: "concept", connectsTo: ["python", "ai"] },
  { id: "tailwind", label: "Tailwind", x: 20, y: 30, category: "tool", connectsTo: [] },
  { id: "dsa", label: "DSA", x: 50, y: 10, category: "concept", connectsTo: ["python", "ts", "c++"] },
  { id: "c++", label: "C++", x: 70, y: 15, category: "language", connectsTo: [] },
];

export default function TechConstellation() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <section id="skills" className="w-full bg-background py-32 md:py-48 px-6 md:px-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        <h2 className="font-display text-4xl md:text-6xl font-medium tracking-tighter uppercase mb-16 text-center">
          Technology <br/> <span className="text-stone-500">Constellation</span>
        </h2>

        <div className="relative w-full max-w-4xl aspect-square md:aspect-[16/10] bg-surface/30 rounded-3xl border border-white/5">
          
          {/* Draw Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {NODES.map(node => 
              node.connectsTo.map(targetId => {
                const target = NODES.find(n => n.id === targetId);
                if (!target) return null;
                
                const isHighlighted = hoveredNode === node.id || hoveredNode === target.id;
                const opacity = hoveredNode ? (isHighlighted ? 0.8 : 0.05) : 0.15;
                const stroke = isHighlighted ? "#F59B0B" : "#ffffff";

                return (
                  <line 
                    key={`${node.id}-${target.id}`}
                    x1={`${node.x}%`} y1={`${node.y}%`}
                    x2={`${target.x}%`} y2={`${target.y}%`}
                    stroke={stroke}
                    strokeWidth={isHighlighted ? 2 : 1}
                    style={{ opacity, transition: "all 0.3s ease" }}
                  />
                );
              })
            )}
          </svg>

          {/* Draw Nodes */}
          {NODES.map(node => {
            const isHovered = hoveredNode === node.id;
            const isConnected = hoveredNode && (
              NODES.find(n => n.id === hoveredNode)?.connectsTo.includes(node.id) || 
              node.connectsTo.includes(hoveredNode)
            );
            const isHighlighted = isHovered || isConnected;
            const opacity = hoveredNode ? (isHighlighted ? 1 : 0.2) : 1;

            return (
              <div 
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-crosshair"
                style={{ left: `${node.x}%`, top: `${node.y}%`, opacity, transition: "opacity 0.3s ease" }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                <div className={`relative flex items-center justify-center ${isHighlighted ? "z-10" : "z-0"}`}>
                  <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 ${isHighlighted ? "bg-accent scale-150" : "bg-stone-600"}`} />
                  <span className={`absolute top-6 font-mono text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap transition-colors duration-300 ${isHighlighted ? "text-accent font-bold" : "text-stone-400"}`}>
                    {node.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

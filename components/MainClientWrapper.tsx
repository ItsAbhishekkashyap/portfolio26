"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BentoGrid from "@/components/BentoGrid";
import ProjectsSection from "@/components/ProjectsSection";
import SkillMatrix from "@/components/SkillMatrix";
import ContactSection from "@/components/ContactSection";
import ProjectArchDrawer from "@/components/ProjectArchDrawer";
import CommandPalette from "@/components/CommandPalette";
import ResumeModal from "@/components/ResumeModal";
import Footer from "@/components/Footer";
import { ProjectData } from "@/lib/seed-data";

interface MainClientWrapperProps {
  projects: ProjectData[];
}

export default function MainClientWrapper({ projects }: MainClientWrapperProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [selectedArchProject, setSelectedArchProject] = useState<ProjectData | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
      {/* Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1">
        <Hero
          onScheduleCall={() => setScheduleOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        <BentoGrid />
        <ProjectsSection
          projects={projects}
          onSelectArchitecture={(project) => setSelectedArchProject(project)}
        />
        <SkillMatrix />
        <ContactSection
          scheduleOpen={scheduleOpen}
          onCloseSchedule={() => setScheduleOpen(false)}
          onOpenSchedule={() => setScheduleOpen(true)}
        />
      </main>

      {/* Executive Footer */}
      <Footer
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Project System Architecture Drawer */}
      <ProjectArchDrawer
        project={selectedArchProject}
        onClose={() => setSelectedArchProject(null)}
      />

      {/* Spotlight Command Palette (Cmd + K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenSchedule={() => setScheduleOpen(true)}
      />

      {/* Interactive Resume View Modal */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />
    </div>
  );
}

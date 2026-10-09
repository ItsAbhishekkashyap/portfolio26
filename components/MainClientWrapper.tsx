"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import IdentitySection from "@/components/IdentitySection";
import WhatIBuild from "@/components/WhatIBuild";
import FeaturedWork from "@/components/FeaturedWork";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import BeyondCode from "@/components/BeyondCode";
import DataVisualization from "@/components/DataVisualization";
import TechConstellation from "@/components/TechConstellation";
import LabSection from "@/components/LabSection";
import ContactSection from "@/components/ContactSection";
import ProjectArchDrawer from "@/components/ProjectArchDrawer";
import CommandPalette from "@/components/CommandPalette";
import ResumeModal from "@/components/ResumeModal";
import Footer from "@/components/Footer";
import { ProjectData } from "@/lib/seed-data";

import GlobalCanvas from "@/components/GlobalCanvas";
import CustomCursor from "@/components/CustomCursor";

interface MainClientWrapperProps {
  projects: ProjectData[];
}

export default function MainClientWrapper({ projects }: MainClientWrapperProps) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [resumeOpen, setResumeOpen] = useState<boolean>(false);
  const [selectedArchProject, setSelectedArchProject] = useState<ProjectData | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState<boolean>(false);

  return (
    <div className="relative min-h-screen bg-transparent text-foreground flex flex-col justify-between transition-colors">
      <CustomCursor />
      <GlobalCanvas>
        {/* We will add 3D elements here later */}
      </GlobalCanvas>
      {/* Navbar */}
      <Navbar
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
      />

      {/* Main Sections */}
      <main className="flex-1 relative z-10">
        <Hero
          onScheduleCall={() => setScheduleOpen(true)}
          onOpenResume={() => setResumeOpen(true)}
        />
        <IdentitySection />
        <WhatIBuild />
        <FeaturedWork
          projects={projects}
          onSelectArchitecture={(project) => setSelectedArchProject(project)}
        />
        <ExperienceTimeline />
        <BeyondCode />
        <DataVisualization />
        <TechConstellation />
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

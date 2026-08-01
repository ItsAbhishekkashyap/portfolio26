"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Command, Sun, Moon, Shield, Menu, X, Download } from "lucide-react";
import { PERSONA } from "@/lib/seed-data";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export default function Navbar({ onOpenCommandPalette, onOpenResume }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#fbf9f5]/90 dark:bg-[#0c0a09]/90 backdrop-blur-md border-b border-stone-200 dark:border-stone-800/80 shadow-sm py-2.5"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="relative flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-amber-500 text-stone-950 font-black text-xs sm:text-sm shadow-md group-hover:scale-105 transition-transform duration-200 font-heading tracking-wider">
            AG
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors font-heading">
              {PERSONA.name}
            </span>
            <span className="text-[10px] sm:text-[11px] block text-stone-500 dark:text-stone-400 font-mono">Full-Stack Engineer</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold text-stone-700 dark:text-stone-300">
          <a href="#experience" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Experience
          </a>
          <a href="#projects" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Projects
          </a>
          <a href="#skills" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Skill Matrix
          </a>
          <a href="#contact" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Contact
          </a>

          {/* Download Resume Link */}
          <a
            href={PERSONA.resumeUrl}
            download="Abhishek_Gond_Resume.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 hover:bg-amber-500 hover:text-stone-950 transition-all font-mono font-bold"
            title="Download PDF Resume"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Resume PDF</span>
          </a>
        </nav>

        {/* Right Action Icons (Clean & Uncluttered on Mobile) */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Spotlight Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 transition-all font-mono text-xs shadow-sm"
            title="Open Spotlight Search (Cmd + K)"
          >
            <Command className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span className="hidden sm:inline font-semibold">Search...</span>
            <span className="hidden sm:inline text-[10px] text-stone-400 bg-stone-200 dark:bg-stone-800 px-1.5 py-0.5 rounded border border-stone-300 dark:border-stone-700">
              ⌘K
            </span>
          </button>

          {/* Working Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              aria-label="Toggle Theme"
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-stone-700" />
              )}
            </button>
          )}

          {/* Admin Login Link (Hidden on small mobile, accessible in mobile drawer) */}
          <Link
            href="/admin/login"
            className="hidden sm:flex p-2 rounded-lg bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            title="Protected Admin CMS"
          >
            <Shield className="w-4 h-4" />
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fbf9f5] dark:bg-[#0c0a09] border-b border-stone-200 dark:border-stone-800 px-6 py-5 space-y-4 font-semibold text-sm shadow-xl">
          <a
            href="#experience"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 dark:text-stone-200 hover:text-amber-500"
          >
            Experience & Milestones
          </a>
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 dark:text-stone-200 hover:text-amber-500"
          >
            Featured SaaS Projects
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 dark:text-stone-200 hover:text-amber-500"
          >
            Skill Matrix
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-stone-800 dark:text-stone-200 hover:text-amber-500"
          >
            Contact & Discussion
          </a>

          <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex flex-col gap-3">
            <a
              href={PERSONA.resumeUrl}
              download="Abhishek_Gond_Resume.pdf"
              className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-mono text-xs font-bold"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>

            <Link
              href="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-stone-600 dark:text-stone-400 font-mono text-xs hover:text-amber-500"
            >
              <Shield className="w-4 h-4" />
              <span>Protected Admin CMS</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

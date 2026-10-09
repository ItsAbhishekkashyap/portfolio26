"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Command, X, Shield, Download } from "lucide-react";
import { PERSONA } from "@/lib/seed-data";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResume: () => void;
}

export default function Navbar({ onOpenCommandPalette, onOpenResume }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  const navLinks = [
    { name: "01 â€” WORK", href: "#work" },
    { name: "02 â€” JOURNEY", href: "#journey" },
    { name: "03 â€” LAB", href: "#lab" },
    { name: "04 â€” ABOUT", href: "#about" },
    { name: "05 â€” CONTACT", href: "#contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "py-4 mix-blend-difference" : "py-8"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="font-display font-bold text-xl md:text-2xl tracking-tight uppercase hover:text-accent transition-colors">
            AG
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-6">
            <button
              onClick={onOpenCommandPalette}
              className="hidden md:flex items-center gap-2 text-xs font-mono text-stone-400 hover:text-accent transition-colors uppercase tracking-widest"
            >
              <Command className="w-4 h-4" />
              <span>Menu</span>
            </button>

            <button
              onClick={() => setMenuOpen(true)}
              className="font-display font-medium text-sm md:text-base tracking-widest uppercase hover:text-accent transition-colors"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-background flex flex-col"
          >
            <div className="max-w-screen-2xl w-full mx-auto px-6 md:px-12 py-8 flex justify-between items-center">
              <span className="font-display font-bold text-xl md:text-2xl tracking-tight text-accent uppercase">
                AG
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="font-display font-medium text-sm md:text-base tracking-widest uppercase hover:text-accent transition-colors flex items-center gap-2"
              >
                Close <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center max-w-screen-2xl w-full mx-auto px-6 md:px-12">
              <nav className="flex flex-col gap-4 md:gap-8">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  >
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="font-display text-4xl md:text-7xl lg:text-8xl font-medium tracking-tighter hover:text-accent hover:italic transition-all duration-300"
                    >
                      {link.name}
                    </a>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mt-16 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between gap-8 text-sm font-mono text-stone-400"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-stone-600 uppercase tracking-widest text-xs">Socials</span>
                  <a href={PERSONA.socials.linkedin} target="_blank" className="hover:text-accent transition-colors">LinkedIn</a>
                  <a href={PERSONA.socials.github} target="_blank" className="hover:text-accent transition-colors">GitHub</a>
                </div>
                
                <div className="flex flex-col gap-2">
                  <span className="text-stone-600 uppercase tracking-widest text-xs">Actions</span>
                  <a href={PERSONA.resumeUrl} download className="hover:text-accent transition-colors flex items-center gap-2">
                    <Download className="w-3 h-3" /> Download Resume
                  </a>
                  <Link href="/admin/login" onClick={() => setMenuOpen(false)} className="hover:text-accent transition-colors flex items-center gap-2">
                    <Shield className="w-3 h-3" /> Admin Access
                  </Link>
                </div>

                <div className="flex flex-col gap-2 md:text-right">
                  <span className="text-stone-600 uppercase tracking-widest text-xs">Contact</span>
                  <a href={`mailto:${PERSONA.contact.email}`} className="hover:text-accent transition-colors">{PERSONA.contact.email}</a>
                  <span>{PERSONA.contact.phone}</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

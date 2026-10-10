"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion, isPhone } from "@/lib/motion";

type Drawer = { type: "project"; id: string } | { type: "contact" } | null;

interface SiteCtx {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  drawer: Drawer;
  openProject: (id: string) => void;
  openContact: () => void;
  closeDrawer: () => void;
  askOpen: boolean;
  setAskOpen: (open: boolean) => void;
  introReady: boolean;
  setIntroReady: (ready: boolean) => void;
  lock: (key: string) => void;
  unlock: (key: string) => void;
  scrollTo: (hash: string) => void;
}

const Ctx = createContext<SiteCtx | null>(null);

export const useSite = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSite must be used inside <SiteProvider>");
  return ctx;
};

export default function SiteProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const locks = useRef(new Set<string>());
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [askOpen, setAskOpenState] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  // Scroll lock. With Lenis running, it stops/starts Lenis; before Lenis exists (child effects such as the
  // preloader run first) or with reduced motion, it falls back to overflow on <html>. The fallback must be
  // cleared once Lenis takes over: phones scroll natively, and a leftover overflow:hidden freezes touch scrolling.
  const applyLocks = useCallback(() => {
    const locked = locks.current.size > 0;
    const lenis = lenisRef.current;
    if (lenis) {
      document.documentElement.style.overflow = "";
      locked ? lenis.stop() : lenis.start();
    } else {
      document.documentElement.style.overflow = locked ? "hidden" : "";
    }
  }, []);

  // Smooth scrolling, driven by the GSAP ticker so ScrollTrigger stays in sync.
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);
    applyLocks(); // hand any lock taken before Lenis existed over to Lenis
    // Trigger positions are measured once, so re-measure after late fonts and images settle the page height.
    // (Not a ResizeObserver: the footer curve changes the height while scrolling.)
    let timer = 0;
    const refresh = () => { window.clearTimeout(timer); timer = window.setTimeout(() => { lenis.resize(); ScrollTrigger.refresh(); }, 150); };
    if (document.readyState === "complete") refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);
    const late = window.setTimeout(refresh, 2000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(late);
      window.removeEventListener("load", refresh);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [applyLocks]);

  const lock = useCallback((key: string) => { locks.current.add(key); applyLocks(); }, [applyLocks]);
  const unlock = useCallback((key: string) => { locks.current.delete(key); applyLocks(); }, [applyLocks]);

  const scrollTo = useCallback((hash: string) => {
    const target = hash === "#top" ? 0 : document.querySelector<HTMLElement>(hash);
    if (target === null) return;
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(target, { duration: 1.6, easing: (t: number) => 1 - Math.pow(1 - t, 4) });
    else if (target === 0) window.scrollTo({ top: 0, behavior: "smooth" });
    else target.scrollIntoView({ behavior: "smooth" });
  }, []);

  const setAskOpen = useCallback((open: boolean) => {
    setAskOpenState(open);
    if (open) { setMenuOpen(false); setDrawer(null); }
  }, []);
  const openProject = useCallback((id: string) => { setAskOpenState(false); setMenuOpen(false); setDrawer({ type: "project", id }); }, []);
  const openContact = useCallback(() => { setAskOpenState(false); setMenuOpen(false); setDrawer({ type: "contact" }); }, []);
  const closeDrawer = useCallback(() => setDrawer(null), []);

  useEffect(() => { menuOpen ? lock("menu") : unlock("menu"); }, [menuOpen, lock, unlock]);
  useEffect(() => { drawer ? lock("drawer") : unlock("drawer"); }, [drawer, lock, unlock]);
  useEffect(() => { askOpen && isPhone() ? lock("ask") : unlock("ask"); }, [askOpen, lock, unlock]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false); setDrawer(null); setAskOpenState(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const value = useMemo<SiteCtx>(() => ({
    menuOpen, setMenuOpen, drawer, openProject, openContact, closeDrawer, askOpen, setAskOpen,
    introReady, setIntroReady, lock, unlock, scrollTo,
  }), [menuOpen, drawer, openProject, openContact, closeDrawer, askOpen, setAskOpen, introReady, lock, unlock, scrollTo]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Click handler for in-page links: closes the menu first, then glides to the section. */
export function useSectionLink() {
  const { menuOpen, setMenuOpen, scrollTo } = useSite();
  return useCallback((e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const fromMenu = menuOpen;
    setMenuOpen(false);
    window.setTimeout(() => scrollTo(href), fromMenu ? 400 : 0);
  }, [menuOpen, setMenuOpen, scrollTo]);
}

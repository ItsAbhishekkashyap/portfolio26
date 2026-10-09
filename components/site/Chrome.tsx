"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion, isSmall } from "@/lib/motion";
import { NAV, PROFILE } from "@/lib/content";
import { useSite, useSectionLink } from "./SiteProvider";

const GREETINGS = ["Hello", "नमस्ते", "Bonjour", "Hola", "Ciao", "こんにちは", "Hallo", "Olá", "Hello"];

export function Preloader() {
  const { setIntroReady, lock, unlock } = useSite();
  const [gone, setGone] = useState(false);
  const [word, setWord] = useState(GREETINGS[0]);
  const root = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const path = useRef<SVGPathElement>(null);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("ag-pre") === "1"; } catch {}
    if (prefersReducedMotion() || seen) { setGone(true); setIntroReady(true); return; }

    lock("preloader");
    const timers: number[] = [];
    let i = 0;
    gsap.from(wordRef.current, { opacity: 0, y: 12, duration: 0.8, ease: "power2.out" });
    const exit = () => {
      gsap.timeline({
        onComplete() {
          setGone(true);
          unlock("preloader");
          try { sessionStorage.setItem("ag-pre", "1"); } catch {}
        },
      })
        .to(wordRef.current, { opacity: 0, duration: 0.35 })
        .to(root.current, { yPercent: -100, duration: 0.9, ease: "power3.inOut" }, "<.1")
        .to(path.current, { attr: { d: "M0 0 L1000 0 L1000 0 Q500 0 0 0 Z" }, duration: 0.9, ease: "power3.inOut" }, "<");
      timers.push(window.setTimeout(() => setIntroReady(true), 550));
    };
    const step = () => {
      i++;
      if (i < GREETINGS.length) {
        setWord(GREETINGS[i]);
        timers.push(window.setTimeout(step, i === 1 ? 600 : 150));
      } else exit();
    };
    timers.push(window.setTimeout(step, 900));
    return () => { timers.forEach(clearTimeout); unlock("preloader"); };
  }, [lock, unlock, setIntroReady]);

  if (gone) return null;
  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <p ref={wordRef}>{word}</p>
      <svg preserveAspectRatio="none" viewBox="0 0 1000 300"><path ref={path} d="M0 0 L1000 0 L1000 0 Q500 300 0 0 Z" /></svg>
    </div>
  );
}

export function Header() {
  const go = useSectionLink();
  const names = useRef<HTMLSpanElement>(null);
  const a = useRef<HTMLSpanElement>(null), b = useRef<HTMLSpanElement>(null), c = useRef<HTMLSpanElement>(null);

  // The logo rolls from "Code by Abhishek" to "Abhishek Gond"; widths are measured once fonts load.
  useEffect(() => {
    const size = () => {
      const n = names.current; if (!n || !a.current || !b.current || !c.current) return;
      const gap = parseFloat(getComputedStyle(n.firstElementChild as Element).columnGap) || 4;
      n.style.setProperty("--w", `${a.current.offsetWidth + gap + b.current.offsetWidth}px`);
      n.style.setProperty("--w2", `${b.current.offsetWidth + gap + c.current.offsetWidth}px`);
      n.style.setProperty("--shift", `${a.current.offsetWidth + gap}px`);
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(size);
    window.addEventListener("resize", size);
    return () => window.removeEventListener("resize", size);
  }, []);

  return (
    <header className="header">
      <a className="logo" href="#top" onClick={(e) => go(e, "#top")} aria-label="Abhishek Gond, home">
        <span className="copy">©</span>
        <span className="names" ref={names}>
          <span className="track"><span ref={a}>Code by</span><span ref={b}>Abhishek</span><span ref={c}>Gond</span></span>
        </span>
      </a>
      <nav className="nav" aria-label="Primary">
        {NAV.map((n) => (
          <a key={n.href} className="magnetic" href={n.href} onClick={(e) => go(e, n.href)}>{n.label}<span className="dot" /></a>
        ))}
        <a className="magnetic resume" href={PROFILE.resumeUrl} target="_blank" rel="noopener">Resume</a>
      </nav>
    </header>
  );
}

const CURVED = "M100 0 L100 1000 Q-100 500 100 0";
const FLAT = "M100 0 L100 1000 Q100 500 100 0";
const MENU_LINKS = [{ label: "Home", href: "#top" }, ...NAV];

export function MenuNav() {
  const { menuOpen, setMenuOpen } = useSite();
  const go = useSectionLink();
  const wrap = useRef<HTMLDivElement>(null);
  const curve = useRef<SVGPathElement>(null);
  const first = useRef(true);
  const [current, setCurrent] = useState("#top");

  // Burger appears once the hero scrolls away (always visible on small screens).
  useEffect(() => {
    const el = wrap.current; if (!el) return;
    if (isSmall()) gsap.set(el, { scale: 1 });
    const reveal = ScrollTrigger.create({
      trigger: "#hero", start: "bottom 85%",
      onEnter: () => gsap.to(el, { scale: 1, duration: 0.3, ease: "power1.out" }),
      onLeaveBack: () => { if (!isSmall()) { gsap.to(el, { scale: 0, duration: 0.3, ease: "power1.out" }); setMenuOpen(false); } },
    });
    let last = "#top";
    const track = ScrollTrigger.create({
      start: 0, end: "max",
      onUpdate: () => {
        let cur = "#top";
        for (const id of ["contact", "journey", "work", "about"]) {
          const s = document.getElementById(id);
          if (s && s.getBoundingClientRect().top < window.innerHeight * 0.5) { cur = "#" + id; break; }
        }
        if (cur !== last) { last = cur; setCurrent(cur); }
      },
    });
    return () => { reveal.kill(); track.kill(); };
  }, [setMenuOpen]);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    gsap.fromTo(curve.current, { attr: { d: menuOpen ? CURVED : FLAT } }, { attr: { d: menuOpen ? FLAT : CURVED }, duration: 1, ease: "power3.inOut" });
  }, [menuOpen]);

  return (
    <>
      <div className="burger-wrap" ref={wrap}>
        <button
          className={`burger fill-btn magnetic${menuOpen ? " active" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="fill" />
          <span className="blabel"><span><span>Menu</span><span>Close</span></span></span>
          <span className="icon"><i /><i /></span>
        </button>
      </div>
      <div className={`menu-veil${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)} />
      <aside className={`menu${menuOpen ? " open" : ""}`} id="menu" aria-label="Site menu" aria-hidden={!menuOpen} data-lenis-prevent>
        <svg className="menu-curve" viewBox="0 0 100 1000" preserveAspectRatio="none"><path ref={curve} d={CURVED} /></svg>
        <div className="menu-body">
          <div>
            <div className="menu-label">Navigation</div>
            <nav className="menu-links">
              {MENU_LINKS.map((l, i) => (
                <a key={l.href} href={l.href} className={current === l.href ? "current" : ""} style={{ transitionDelay: `${0.05 * (i + 1)}s` }}
                  onClick={(e) => go(e, l.href)} tabIndex={menuOpen ? 0 : -1}>
                  <span className="ind" />{l.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="menu-foot">
            <div className="menu-label">Socials</div>
            <a className="u-link" href={PROFILE.socials.github} target="_blank" rel="noopener" tabIndex={menuOpen ? 0 : -1}>GitHub</a>
            <a className="u-link" href={PROFILE.socials.linkedin} target="_blank" rel="noopener" tabIndex={menuOpen ? 0 : -1}>LinkedIn</a>
            <a className="u-link" href={PROFILE.socials.leetcode} target="_blank" rel="noopener" tabIndex={menuOpen ? 0 : -1}>LeetCode</a>
            <a className="u-link" href={PROFILE.resumeUrl} target="_blank" rel="noopener" tabIndex={menuOpen ? 0 : -1}>Resume</a>
            <a className="u-link menu-admin" href="/admin/login" tabIndex={menuOpen ? 0 : -1}>Admin</a>
          </div>
        </div>
      </aside>
    </>
  );
}

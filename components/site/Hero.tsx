"use client";

import React, { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { PROFILE } from "@/lib/content";
import { useSite } from "./SiteProvider";

export default function Hero() {
  const { introReady } = useSite();
  const root = useRef<HTMLElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  // Name marquee: speed and direction follow the scroll; the portrait drifts slower than the page.
  useEffect(() => {
    if (prefersReducedMotion() || !slider.current) return;
    const copies = slider.current.querySelectorAll("p");
    let xP = 0, dir = -1;
    const tick = () => {
      if (xP < -100) xP = 0; else if (xP > 0) xP = -100;
      gsap.set(copies, { xPercent: xP });
      xP += 0.045 * dir;
    };
    gsap.ticker.add(tick);
    const ctx = gsap.context(() => {
      gsap.to(slider.current, {
        x: "-=300px", ease: "none",
        scrollTrigger: { trigger: document.documentElement, start: 0, end: () => window.innerHeight, scrub: 0.25, onUpdate: (e) => { dir = e.direction * -1; } },
      });
      gsap.to(photo.current, { yPercent: 10, ease: "none", scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true } });
    });
    return () => { gsap.ticker.remove(tick); ctx.revert(); };
  }, []);

  useEffect(() => {
    if (!introReady || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(".slider p", { yPercent: 110, duration: 1.2, ease: "power4.out" });
      gsap.from(photo.current, { scale: 1.08, duration: 1.6, ease: "power3.out" });
      gsap.from(".hero-loc", { xPercent: -100, duration: 1.1, ease: "power4.out", delay: 0.15 });
      gsap.from([".hero-role", ".hero-status", ".header > *"], { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 0.25, stagger: 0.06 });
    });
    return () => ctx.revert();
  }, [introReady]);

  return (
    <section className="hero" id="hero" ref={root}>
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-photo" ref={photo} role="img" aria-label="Portrait of Abhishek Gond" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-loc">
        <span>{PROFILE.location[0]}<br />{PROFILE.location[1]}<br />{PROFILE.location[2]}</span>
        <span className="globe">
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.2"><circle cx="12" cy="12" r="10" /><ellipse cx="12" cy="12" rx="4.2" ry="10" /><path d="M2 12h20M4 6.5h16M4 17.5h16" /></svg>
        </span>
      </div>
      {/* Role and status pill share one stacked block so they can't collide at any screen height. */}
      <div className="hero-role">
        <svg className="arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M1 1l12 12M13 3v10H3" /></svg>
        <span>{PROFILE.role}<br />{PROFILE.roleLine2}</span>
        <div className="hero-status"><i />{PROFILE.status}</div>
      </div>
      <div className="hero-marquee" aria-hidden="true">
        <div className="slider" ref={slider}>
          <p>Abhishek Gond —</p>
          <p>Abhishek Gond —</p>
        </div>
      </div>
      <h1 className="sr">Abhishek Gond, software engineer, AI and GenAI engineer, full-stack developer</h1>
    </section>
  );
}

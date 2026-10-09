"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { PROFILE } from "@/lib/content";
import { useSite } from "./SiteProvider";

export function Curve() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { height: () => Math.min(Math.max(window.innerWidth * 0.12, 80), 200) }, {
        height: 0, ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true, invalidateOnRefresh: true },
      });
    });
    return () => ctx.revert();
  }, []);
  return <div className="curve-wrap" ref={ref} aria-hidden="true"><div className="curve-disc" /></div>;
}

const istTime = () => {
  try {
    return new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", hour12: true, timeZone: "Asia/Kolkata" }).format(new Date()).toUpperCase() + " IST";
  } catch { return ""; }
};

export default function Footer() {
  const { openContact, setAskOpen } = useSite();
  const root = useRef<HTMLElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const sign = useRef<HTMLSpanElement>(null);
  const [time, setTime] = useState("--:-- IST");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    setTime(istTime());
    const id = window.setInterval(() => setTime(istTime()), 15000);
    return () => clearInterval(id);
  }, []);

  // The signature is sized so "Abhishek Gond" spans the content width exactly.
  useEffect(() => {
    const el = sign.current; if (!el) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = (el.parentElement as HTMLElement).clientWidth, tw = el.scrollWidth;
      if (tw) el.style.fontSize = `${(100 * w) / tw * 0.995}px`;
    };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(fit);
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true };
      gsap.from(inner.current, { y: -140, ease: "none", scrollTrigger: st });
      gsap.from(".f-cta", { rotate: -25, ease: "none", scrollTrigger: { ...st } });
      // Scrubbed (not a one-shot reveal) so the name is always fully visible once you reach the bottom.
      gsap.fromTo(sign.current, { yPercent: 35 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom bottom", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const copyEmail = () => {
    const fail = () => setCopied("Select to copy");
    try {
      navigator.clipboard.writeText(PROFILE.email).then(() => { setCopied("Copied"); window.setTimeout(() => setCopied(""), 1800); }, fail);
    } catch { fail(); }
  };

  return (
    <footer className="footer wrap" id="contact" ref={root}>
      <div className="footer-inner" ref={inner}>
        <div style={{ position: "relative" }}>
          <h2 className="f-title"><span className="ava" role="img" aria-label="Abhishek Gond" /><span>Let&apos;s work</span></h2>
          <h2 className="f-title-2">together</h2>
          <svg className="f-arrow" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M13 1L1 13M1 3v10h10" /></svg>
        </div>
        <div className="f-line">
          <div className="f-cta">
            <button className="magnetic" onClick={openContact}>
              <span className="circle-btn fill-btn"><span className="fill" /><span className="lbl">Get in touch</span></span>
            </button>
          </div>
        </div>
        <div className="f-pills">
          <button className="pill on-night fill-btn magnetic" onClick={copyEmail}>
            <span className="fill" /><span className="lbl">{PROFILE.email}{copied && <span className="copied">{"  " + copied}</span>}</span>
          </button>
          <a className="pill on-night fill-btn magnetic" href={`tel:${PROFILE.phone}`}><span className="fill" /><span className="lbl">{PROFILE.phoneDisplay}</span></a>
          <button className="pill on-night fill-btn magnetic" onClick={() => setAskOpen(true)}>
            <span className="fill" /><span className="lbl">Ask the portfolio a question</span>
          </button>
        </div>
        <div className="f-bottom">
          <div className="f-meta">
            <div><h5>Version</h5><span>{new Date().getFullYear()} © Edition</span></div>
            <div><h5>Local time</h5><span>{time}</span></div>
          </div>
          <div className="f-meta">
            <div>
              <h5>Socials</h5>
              <div className="f-socials">
                <a className="u-link" href={PROFILE.socials.github} target="_blank" rel="noopener">GitHub</a>
                <a className="u-link" href={PROFILE.socials.linkedin} target="_blank" rel="noopener">LinkedIn</a>
                <a className="u-link" href={PROFILE.socials.leetcode} target="_blank" rel="noopener">LeetCode</a>
                <a className="u-link" href={PROFILE.resumeUrl} target="_blank" rel="noopener">Resume</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="f-sign" aria-hidden="true"><span ref={sign}>Abhishek Gond</span></div>
    </footer>
  );
}

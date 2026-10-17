"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { CERTIFICATES } from "@/lib/content";
import { Split } from "./Sections";
import { useSite } from "./SiteProvider";

type Cert = (typeof CERTIFICATES)[number];

export default function Certificates() {
  const { lock, unlock } = useSite();
  const [open, setOpen] = useState<Cert | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Cards rise in once as the grid reaches the viewport.
  useEffect(() => {
    if (prefersReducedMotion() || !grid.current) return;
    const ctx = gsap.context(() => {
      gsap.from(grid.current!.children, {
        y: 48, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08,
        scrollTrigger: { trigger: grid.current, start: "top 88%", once: true },
      });
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!open) return;
    lock("certificate");
    const t = window.setTimeout(() => closeBtn.current?.focus({ preventScroll: true }), 300);
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    window.addEventListener("keydown", onKey);
    return () => { unlock("certificate"); clearTimeout(t); window.removeEventListener("keydown", onKey); };
  }, [open, lock, unlock]);

  return (
    <section className="certs wrap" id="certificates">
      <div className="certs-inner">
        <div className="recog-head">
          <Split as="h2" className="big-title" text="Certified" />
          <p>HackerRank skill certifications. Open one to see it full size, or verify it on HackerRank.</p>
        </div>

        <div className="cert-grid" ref={grid}>
          {CERTIFICATES.map((c) => (
            <figure className={`cert${c.featured ? " featured" : ""}`} key={c.id}>
              <button className="cert-shot" onClick={() => setOpen(c)} aria-label={`View the ${c.skill} (${c.level}) certificate`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/certificates/${c.image}.webp`} alt={`HackerRank ${c.skill} (${c.level}) certificate`} loading="lazy" decoding="async" />
                <span className="cert-zoom" aria-hidden="true">View</span>
              </button>
              <figcaption>
                <div className="cert-row">
                  <span className={`cert-level ${c.level.toLowerCase()}`}>{c.level}</span>
                  <span className="cert-date">{c.issued}</span>
                </div>
                <h3>{c.skill}</h3>
                <div className="cert-row">
                  <span className="cert-id">ID {c.id}</span>
                  <a className="u-link cert-verify" href={c.href} target="_blank" rel="noopener">Verify on HackerRank ↗</a>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Portalled to <body>: inside the section it would sit under the sections that follow. */}
      {mounted && createPortal(
      <div className={`cert-view${open ? " open" : ""}`} onClick={() => setOpen(null)} aria-hidden={!open}>
        {open && (
          <div className="cert-view-inner" role="dialog" aria-modal="true" aria-label={`${open.skill} (${open.level}) certificate`} onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/certificates/${open.image}.webp`} alt={`HackerRank ${open.skill} (${open.level}) certificate`} />
            <div className="cert-view-bar">
              <div>
                <b>{open.skill} ({open.level})</b>
                <span>HackerRank · Issued {open.issued} · ID {open.id}</span>
              </div>
              <div className="cert-view-actions">
                <a className="pill on-night fill-btn" href={open.href} target="_blank" rel="noopener"><span className="fill" /><span className="lbl">Verify on HackerRank</span></a>
                <button className="close-btn on-night" ref={closeBtn} onClick={() => setOpen(null)} aria-label="Close certificate">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l12 12M14 2L2 14" /></svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>,
      document.body)}
    </section>
  );
}

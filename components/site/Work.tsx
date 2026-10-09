"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, canHover, isSmall } from "@/lib/motion";
import { PROFILE, type Project } from "@/lib/content";
import { useSite } from "./SiteProvider";

/** Project art: a real screenshot in a browser frame when we have one, otherwise a code window. */
export function Preview({ p, eager = false }: { p: Project; eager?: boolean }) {
  const sh = p.shots;
  const loading = eager ? undefined : ("lazy" as const);
  return (
    <div className="pv" style={{ background: p.color }}>
      <span className="chip">{p.chip}</span>
      {sh ? (
        <>
          <div className="win shot">
            <div className="win-bar"><i /><i /><i /><em>{sh.url}</em></div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`/shots/${sh.cover}.jpg`} alt={`${p.title} screenshot`} loading={loading} decoding="async" />
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {sh.float && <img className="float" src={`/shots/${sh.float}.jpg`} alt="" loading={loading} />}
        </>
      ) : (
        <div className="win">
          <div className="win-bar"><i /><i /><i /><em>{p.file}</em></div>
          <div className="win-body" dangerouslySetInnerHTML={{ __html: p.code }} />
        </div>
      )}
      <span className="tag">{p.title}</span>
    </div>
  );
}

const SLIDE_H = 340;

export default function Work({ projects, also }: { projects: Project[]; also: Project[] }) {
  const { openProject } = useSite();
  const [grid, setGrid] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const modal = useRef<HTMLDivElement>(null);
  const slider = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLDivElement>(null);
  const gridRef = useRef(grid);
  gridRef.current = grid;

  useEffect(() => { ScrollTrigger.refresh(); }, [grid]);

  // The preview card and "View" bubble trail the cursor at different speeds while hovering the list.
  useEffect(() => {
    if (!canHover() || !modal.current || !dot.current || !label.current || !listRef.current) return;
    const q = (el: HTMLElement, d: number) => [gsap.quickTo(el, "left", { duration: d, ease: "power3" }), gsap.quickTo(el, "top", { duration: d, ease: "power3" })];
    const [mx, my] = q(modal.current, 0.8), [dx, dy] = q(dot.current, 0.45), [lx, ly] = q(label.current, 0.35);
    const move = (e: MouseEvent) => { mx(e.clientX); my(e.clientY); dx(e.clientX); dy(e.clientY); lx(e.clientX); ly(e.clientY); };
    const els = [modal.current, dot.current, label.current];
    const show = (on: boolean) => gsap.to(els, { scale: on ? 1 : 0, duration: 0.4, ease: on ? "power3.out" : "power3.in", overwrite: "auto" });
    const list = listRef.current;
    const over = (e: MouseEvent) => {
      if (gridRef.current || isSmall()) return;
      const b = (e.target as HTMLElement).closest<HTMLElement>("button[data-i]");
      if (!b || !slider.current) return;
      slider.current.style.transform = `translateY(${-Number(b.dataset.i) * SLIDE_H}px)`;
      show(true);
    };
    const leave = () => show(false);
    window.addEventListener("mousemove", move);
    list.addEventListener("mouseover", over);
    list.addEventListener("mouseleave", leave);
    list.addEventListener("click", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      list.removeEventListener("mouseover", over);
      list.removeEventListener("mouseleave", leave);
      list.removeEventListener("click", leave);
    };
  }, []);

  useEffect(() => {
    if (grid && modal.current) gsap.to([modal.current, dot.current, label.current], { scale: 0, duration: 0.3 });
  }, [grid]);

  return (
    <>
      <section className={`work wrap${grid ? " grid-mode" : ""}`} id="work">
        <div className="work-inner">
          <div className="section-tag">
            <span>Selected work</span>
            <div className="view-toggle" role="group" aria-label="Layout">
              <button aria-pressed={!grid} aria-label="List view" onClick={() => setGrid(false)}>
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M2 4h14M2 9h14M2 14h14" /></svg>
              </button>
              <button aria-pressed={grid} aria-label="Grid view" onClick={() => setGrid(true)}>
                <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="2" y="2" width="5.5" height="5.5" /><rect x="10.5" y="2" width="5.5" height="5.5" /><rect x="2" y="10.5" width="5.5" height="5.5" /><rect x="10.5" y="10.5" width="5.5" height="5.5" /></svg>
              </button>
            </div>
          </div>
          <div className="work-head"><span>Project</span><span>Type</span><span>Built with</span></div>
          <ul className="work-list" ref={listRef}>
            {projects.map((p, i) => (
              <li className="work-row" key={p.id}>
                <button data-i={i} aria-label={`Open ${p.title} details`} onClick={() => openProject(p.id)}>
                  <div className="thumb"><Preview p={p} /></div>
                  <h3>{p.title}<small>{p.subtitle}</small></h3>
                  <span className="meta"><span className="cat">{p.cat}</span><span className="stack">{p.tech.slice(0, 2).join(", ")}</span></span>
                </button>
              </li>
            ))}
          </ul>
          {also.length > 0 && (
            <div className="also">
              <h3>Also built<span>Full-stack SaaS and campus work</span></h3>
              <ul>
                {also.map((p) => (
                  <li key={p.id}><button onClick={() => openProject(p.id)}><b>{p.title}</b><span>{p.subtitle}</span></button></li>
                ))}
              </ul>
            </div>
          )}
          <div className="work-more">
            <a className="pill fill-btn magnetic" href={PROFILE.socials.github} target="_blank" rel="noopener"><span className="fill" /><span className="lbl">More on GitHub</span></a>
          </div>
        </div>
      </section>
      <div className="modal-container" ref={modal} aria-hidden="true">
        <div className="modal-slider" ref={slider}>
          {projects.map((p) => <div className="modal-slide" key={p.id}><Preview p={p} eager /></div>)}
        </div>
      </div>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-label" ref={label} aria-hidden="true">View</div>
    </>
  );
}

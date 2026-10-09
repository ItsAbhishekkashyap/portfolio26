"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { FOCUS, INTRO, JOURNEY, PROOF_ROWS, RECOGNITION, TOOLKIT } from "@/lib/content";
import { useSectionLink } from "./SiteProvider";

/** Text whose words rise out of a mask when they scroll into view. */
export function Split({ as: Tag = "p", className, text, id }: { as?: React.ElementType; className?: string; text: string; id?: string }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!.querySelectorAll(".mask > span"), {
        yPercent: 110, duration: 0.9, ease: "power3.out", stagger: 0.012,
        scrollTrigger: { trigger: ref.current, start: "top 88%" },
      });
    });
    return () => ctx.revert();
  }, []);
  const words = text.split(/\s+/);
  return (
    <Tag ref={ref} className={className} id={id}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="mask"><span>{w}</span></span>{i < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
}

export function Intro() {
  const go = useSectionLink();
  return (
    <section className="intro wrap" id="about">
      <div className="intro-grid">
        <Split className="intro-lead" text={INTRO.lead} />
        <div className="intro-side">
          <p>{INTRO.side}</p>
          <a className="circle-wrap magnetic" href="#journey" onClick={(e) => go(e, "#journey")}>
            <span className="circle-btn fill-btn"><span className="fill" /><span className="lbl">About me</span></span>
          </a>
        </div>
      </div>
      <div className="focus">
        {FOCUS.map((f) => (
          <div key={f.title}><h3>{f.title}</h3><p>{f.body}</p><span className="tech">{f.tech}</span></div>
        ))}
      </div>
    </section>
  );
}

export function Proof() {
  const root = useRef<HTMLElement>(null);
  const r1 = useRef<HTMLDivElement>(null), r2 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.to(r1.current, { x: "12vw", ease: "none", scrollTrigger: st });
      gsap.to(r2.current, { x: "-12vw", ease: "none", scrollTrigger: { ...st } });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className="proof" aria-label="Numbers from the work" ref={root}>
      {PROOF_ROWS.map((row, ri) => (
        <div key={ri} className={`proof-row r${ri + 1}`} ref={ri === 0 ? r1 : r2}>
          {row.map((t) => (
            <div key={t.fig + t.src} className={`tile${t.tone ? " " + t.tone : ""}`}>
              <span className="fig">{t.fig}</span>
              <div><p className="what">{t.what}</p><p className="src">{t.src}</p></div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

export function Journey() {
  const progress = useRef<HTMLSpanElement>(null);
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    if (prefersReducedMotion()) { if (progress.current) progress.current.style.transform = "scaleY(1)"; return; }
    const ctx = gsap.context(() => {
      gsap.to(progress.current, { scaleY: 1, ease: "none", scrollTrigger: { trigger: list.current, start: "top 70%", end: "bottom 60%", scrub: true } });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section className="journey wrap" id="journey">
      <div className="journey-inner">
        <div className="journey-title">
          <Split as="h2" className="big-title" text="Journey" />
          <p>Fellowship, internship and campus leadership, most recent first.</p>
        </div>
        <ol className="timeline" ref={list}>
          <span className="progress" ref={progress} />
          {JOURNEY.map((j) => (
            <li className="t-item" key={j.role + j.when}>
              <div className="t-when"><span>{j.when}</span><b>{j.kind}</b></div>
              <h3>{j.role}</h3>
              <p className="t-org">{j.org}</p>
              {j.points.length > 0 && <ul>{j.points.map((p) => <li key={p}>{p}</li>)}</ul>}
              {j.tags.length > 0 && <div className="tags">{j.tags.map((t) => <span key={t}>{t}</span>)}</div>}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function CountUp({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(label);
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return;
    const o = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: ref.current, start: "top 90%", once: true,
      onEnter: () => gsap.to(o, { v: to, duration: 1.8, ease: "power2.out", onUpdate: () => setValue(`${Math.round(o.v)}+`) }),
    });
    return () => st.kill();
  }, [to]);
  return <span className="big" ref={ref}>{value}</span>;
}

export function Recognition() {
  return (
    <section className="recog wrap" id="recognition">
      <div className="recog-inner">
        <div className="recog-head">
          <Split as="h2" className="big-title" text="Recognition" />
          <p>Hackathons, problem solving and a few things off the keyboard.</p>
        </div>
        <ul className="rec-list">
          {RECOGNITION.map((r) => (
            <li className="rec" key={r.title}>
              {r.count ? <CountUp to={r.count} label={r.big} /> : <span className="big">{r.big}</span>}
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <span className="when">{r.href ? <a className="u-link" href={r.href} target="_blank" rel="noopener">{r.when}</a> : r.when}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Toolkit() {
  return (
    <section className="toolkit wrap" id="skills">
      <div className="toolkit-inner">
        <div className="toolkit-head"><Split as="h2" text="Toolkit" /><p>What I reach for, grouped by layer</p></div>
        {TOOLKIT.map((g) => (
          <div className="tk" key={g.group}><h3>{g.group}</h3><ul>{g.items.map((i) => <li key={i}>{i}</li>)}</ul></div>
        ))}
      </div>
    </section>
  );
}

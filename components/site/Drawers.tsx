"use client";

import React, { useEffect, useRef, useState } from "react";
import { submitContactForm } from "@/lib/actions";
import { PROFILE, type Project } from "@/lib/content";
import { Preview } from "./Work";
import { useSite } from "./SiteProvider";

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 2l12 12M14 2L2 14" /></svg>
);

function Veil() {
  const { drawer, closeDrawer } = useSite();
  return <div className={`drawer-veil${drawer ? " open" : ""}`} onClick={closeDrawer} />;
}

function ProjectDrawer({ all }: { all: Project[] }) {
  const { drawer, closeDrawer, openProject } = useSite();
  const open = drawer?.type === "project";
  const [shownId, setShownId] = useState<string | null>(null);
  const body = useRef<HTMLDivElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  // Keep the last project rendered while the panel slides out.
  useEffect(() => { if (drawer?.type === "project") setShownId(drawer.id); }, [drawer]);
  useEffect(() => { if (body.current) body.current.scrollTop = 0; }, [shownId]);
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => close.current?.focus({ preventScroll: true }), 400);
    return () => clearTimeout(t);
  }, [open]);

  const idx = all.findIndex((p) => p.id === shownId);
  const p = idx >= 0 ? all[idx] : null;
  const prev = p ? all[(idx - 1 + all.length) % all.length] : null;
  const next = p ? all[(idx + 1) % all.length] : null;

  return (
    <aside className={`drawer${open ? " open" : ""}`} aria-label="Project details" aria-hidden={!open}>
      <div className="drawer-top">
        <span>{p ? `${p.cat}  ·  ${idx + 1} of ${all.length}` : "Project"}</span>
        <button className="close-btn" ref={close} onClick={closeDrawer} aria-label="Close project"><CloseIcon /></button>
      </div>
      <div className="drawer-body" ref={body} data-lenis-prevent>
        {p && (
          <>
            <Preview p={p} eager={open} />
            <div><h2 className="d-title">{p.title}</h2><p className="d-sub">{p.subtitle}</p></div>
            <p className="d-desc">{p.desc}</p>
            {p.shots && p.shots.gallery.length > 1 && (
              <div>
                <div className="d-h">Screens</div>
                <div className="gallery">
                  {p.shots.gallery.slice(1).map(([file, caption]) => (
                    <figure key={file}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/shots/${file}.jpg`} alt={caption} loading="lazy" />
                      <figcaption>{caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
            )}
            <div className="tags" style={{ margin: 0 }}>{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
            {p.specs.length > 0 && (
              <div>
                <div className="d-h">How it&apos;s built</div>
                <div className="d-specs">{p.specs.map(([k, v]) => <div key={k}><h4>{k}</h4><p>{v}</p></div>)}</div>
              </div>
            )}
            {p.hl.length > 0 && (
              <div>
                <div className="d-h">Highlights</div>
                <ol className="d-list">{p.hl.map((h, i) => <li key={h}><span>{String(i + 1).padStart(2, "0")}</span>{h}</li>)}</ol>
              </div>
            )}
            <div className="d-actions">
              {p.live && <a className="pill dark fill-btn" href={p.live} target="_blank" rel="noopener"><span className="fill" /><span className="lbl">Open live demo</span></a>}
              <a className="pill fill-btn" href={p.gh} target="_blank" rel="noopener"><span className="fill" /><span className="lbl">View on GitHub</span></a>
            </div>
            {prev && next && all.length > 1 && (
              <div className="d-nav">
                <button onClick={() => openProject(prev.id)}>Previous<b>{prev.title}</b></button>
                <button onClick={() => openProject(next.id)}>Next<b>{next.title}</b></button>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}

type Status = { kind: "idle" | "sending" | "sent" | "error"; text: string };
const IDLE: Status = { kind: "idle", text: "Prefer a call? Ask for a 15-minute slot in your message and I'll send times." };

function ContactDrawer() {
  const { drawer, closeDrawer } = useSite();
  const open = drawer?.type === "contact";
  const [status, setStatus] = useState<Status>(IDLE);
  const form = useRef<HTMLFormElement>(null);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => close.current?.focus({ preventScroll: true }), 400);
    return () => clearTimeout(t);
  }, [open]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const message = String(fd.get("message") || "").trim();
    if (message.length < 10) { setStatus({ kind: "error", text: "Your message needs at least 10 characters so Abhishek has some context." }); return; }
    const org = String(fd.get("org") || "").trim();
    fd.set("subject", org ? `Portfolio inquiry from ${org}` : "Portfolio inquiry");
    setStatus({ kind: "sending", text: "Sending your message…" });
    try {
      const res = await submitContactForm(null, fd);
      if (res.success) {
        setStatus({ kind: "sent", text: `Sent. Abhishek will reply to ${fd.get("email")} soon.` });
        form.current?.reset();
      } else setStatus({ kind: "error", text: res.error || "That didn't send. Check the fields and try again." });
    } catch {
      setStatus({ kind: "error", text: `That didn't send because of a network problem. Try again, or email ${PROFILE.email}.` });
    }
  };

  const noteColor = status.kind === "error" ? "#d93a3a" : status.kind === "sent" ? "var(--accent)" : undefined;

  return (
    <aside className={`drawer${open ? " open" : ""}`} aria-label="Contact form" aria-hidden={!open}>
      <div className="drawer-top">
        <span>Start a conversation</span>
        <button className="close-btn" ref={close} onClick={closeDrawer} aria-label="Close contact form"><CloseIcon /></button>
      </div>
      <div className="drawer-body" data-lenis-prevent>
        <h2 className="d-title">Hi Abhishek,</h2>
        <form className="form" ref={form} onSubmit={submit} onChange={() => status.kind === "error" && setStatus(IDLE)}>
          <div className="field"><span className="q">01</span><div><label htmlFor="cf-name">What&apos;s your name?</label><input id="cf-name" name="name" required minLength={2} placeholder="Priya Sharma" autoComplete="name" /></div></div>
          <div className="field"><span className="q">02</span><div><label htmlFor="cf-email">What&apos;s your email?</label><input id="cf-email" name="email" type="email" required placeholder="priya@company.com" autoComplete="email" /></div></div>
          <div className="field"><span className="q">03</span><div><label htmlFor="cf-org">Company or team</label><input id="cf-org" name="org" placeholder="Acme Labs" autoComplete="organization" /></div></div>
          <div className="field"><span className="q">04</span><div><label htmlFor="cf-msg">Your message</label><textarea id="cf-msg" name="message" rows={3} required placeholder="We're hiring for an AI engineering role and..." /></div></div>
          <div className="form-foot">
            <p className="form-note" role="status" style={{ color: noteColor }}>{status.text}</p>
            <button type="submit" className="magnetic" disabled={status.kind === "sending"}>
              <span className="circle-btn fill-btn"><span className="fill" /><span className="lbl">{status.kind === "sending" ? "Sending…" : "Send it"}</span></span>
            </button>
          </div>
        </form>
        <div className="contact-side">
          <div><h4>Email</h4><p>{PROFILE.email}</p></div>
          <div><h4>Phone</h4><p>{PROFILE.phoneDisplay}</p></div>
        </div>
      </div>
    </aside>
  );
}

export default function Drawers({ all }: { all: Project[] }) {
  return (
    <>
      <Veil />
      <ProjectDrawer all={all} />
      <ContactDrawer />
    </>
  );
}

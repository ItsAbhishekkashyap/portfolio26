"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { SUGGESTED_QUESTIONS, type Source } from "@/lib/knowledge";
import { PROFILE } from "@/lib/content";
import { prefersReducedMotion, isPhone } from "@/lib/motion";
import { useSite } from "./SiteProvider";

interface Msg { id: number; role: "user" | "assistant"; paragraphs: string[]; sources: Source[] }

const WELCOME = "Hi, I answer questions about Abhishek using only his resume and project notes. Every answer links to its source on this page. Try a question below or type your own.";

/** Assistant bubble whose words fade in a few at a time, then shows its sources. */
function BotMessage({ msg, onProgress, onSource }: { msg: Msg; onProgress: () => void; onSource: (s: Source) => void }) {
  const words = msg.paragraphs.map((p) => p.split(" "));
  const total = words.reduce((n, w) => n + w.length, 0);
  const [shown, setShown] = useState(() => (prefersReducedMotion() ? total : 0));

  useEffect(() => {
    if (shown >= total) return;
    const t = window.setTimeout(() => setShown((s) => Math.min(s + 3, total)), 28);
    return () => clearTimeout(t);
  }, [shown, total]);
  useEffect(() => { onProgress(); }, [shown, onProgress]);

  let k = 0;
  return (
    <div className="msg bot">
      {words.map((ws, pi) => (
        <p key={pi}>
          {ws.map((w, wi) => {
            const on = k++ < shown;
            return <React.Fragment key={wi}><span className={`w${on ? " on" : ""}`}>{w}</span>{wi < ws.length - 1 ? " " : ""}</React.Fragment>;
          })}
        </p>
      ))}
      {msg.sources.length > 0 && (
        <div className={`cites${shown >= total ? " on" : ""}`}>
          <span className="cites-label">Sources</span>
          {msg.sources.map((s) => <button type="button" className="cite" key={s.id} onClick={() => onSource(s)}>{s.label}</button>)}
        </div>
      )}
    </div>
  );
}

export default function AskChat() {
  const { askOpen, setAskOpen, openProject, scrollTo } = useSite();
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [busy, setBusy] = useState(false);
  const [input, setInput] = useState("");
  const [asked, setAsked] = useState<string[]>([]);
  const list = useRef<HTMLDivElement>(null);
  const field = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);

  const scrollDown = useCallback(() => { const el = list.current; if (el) el.scrollTop = el.scrollHeight; }, []);

  useEffect(() => {
    if (!askOpen) return;
    setMsgs((m) => (m.length ? m : [{ id: 0, role: "assistant", paragraphs: [WELCOME], sources: [] }]));
    const t = window.setTimeout(() => { if (!isPhone()) field.current?.focus({ preventScroll: true }); }, 450);
    return () => clearTimeout(t);
  }, [askOpen]);

  useEffect(scrollDown, [msgs, busy, scrollDown]);

  const ask = async (raw: string) => {
    const question = raw.trim().slice(0, 400);
    if (!question || busy) return;
    setAsked((a) => [...a, question]);
    const history = msgs.filter((m) => m.id !== 0).slice(-6).map((m) => ({ role: m.role, text: m.paragraphs.join(" ").slice(0, 1500) }));
    setMsgs((m) => [...m, { id: nextId.current++, role: "user", paragraphs: [question], sources: [] }]);
    setBusy(true);
    let reply: Pick<Msg, "paragraphs" | "sources">;
    try {
      const res = await fetch("/api/ask", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question, history }) });
      const data = await res.json();
      reply = res.ok ? { paragraphs: data.paragraphs, sources: data.sources } : { paragraphs: [data.error || "That question couldn't be answered. Try rephrasing it."], sources: [] };
    } catch {
      reply = { paragraphs: [`I couldn't reach the server just now. Try again in a moment, or email Abhishek at ${PROFILE.email}.`], sources: [] };
    }
    setBusy(false);
    setMsgs((m) => [...m, { id: nextId.current++, role: "assistant", ...reply }]);
  };

  const goToSource = (s: Source) => {
    setAskOpen(false);
    window.setTimeout(() => {
      if (s.target.type === "project") openProject(s.target.id);
      else scrollTo(`#${s.target.id}`);
    }, 250);
  };

  const chips = SUGGESTED_QUESTIONS.filter((q) => !asked.includes(q));

  return (
    <>
      <button className={`ask-launch fill-btn${askOpen ? " away" : ""}`} aria-controls="ask" aria-expanded={askOpen} onClick={() => setAskOpen(true)}>
        <span className="fill" /><span className="av" aria-hidden="true" />
        <span className="lbl"><span className="full">Ask about Abhishek</span><span className="short">Ask me</span></span>
      </button>
      <section className={`ask${askOpen ? " open" : ""}`} id="ask" role="dialog" aria-label="Ask about Abhishek" aria-hidden={!askOpen}>
        <div className="ask-head">
          <span className="av" aria-hidden="true" />
          <div className="t"><h2>Ask about Abhishek</h2><p>Answers come only from his resume and project notes, with sources.</p></div>
          <button className="ask-close" aria-label="Close chat" onClick={() => setAskOpen(false)}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M2 2l12 12M14 2L2 14" /></svg>
          </button>
        </div>
        <div className="ask-msgs" ref={list} data-lenis-prevent aria-live="polite">
          {msgs.map((m) => m.role === "user"
            ? <div className="msg me" key={m.id}>{m.paragraphs[0]}</div>
            : <BotMessage key={m.id} msg={m} onProgress={scrollDown} onSource={goToSource} />)}
          {busy && <div className="typing" aria-label="Thinking"><i /><i /><i /></div>}
        </div>
        <div className="ask-chips" data-lenis-prevent>
          {chips.map((q) => <button type="button" className="chip-q" key={q} onClick={() => ask(q)} disabled={busy}>{q}</button>)}
        </div>
        <form className="ask-form" onSubmit={(e) => { e.preventDefault(); const q = input; setInput(""); ask(q); }}>
          <input ref={field} id="ask-input" value={input} onChange={(e) => setInput(e.target.value)} maxLength={400}
            autoComplete="off" placeholder="Ask about projects, skills, availability…" aria-label="Your question" />
          <button className="ask-send" type="submit" aria-label="Send question" disabled={busy || !input.trim()}>
            <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 15V3M3.5 8.5L9 3l5.5 5.5" /></svg>
          </button>
        </form>
        <p className="ask-foot">If it isn&apos;t in his resume, it says so instead of guessing.</p>
      </section>
    </>
  );
}

"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Edit3, LogOut, Trash2, Plus } from "lucide-react";
import { ProjectData } from "@/lib/seed-data";
import { createProjectAction, updateProjectAction, deleteProjectAction, logoutAdmin } from "@/lib/actions";

interface AdminDashboardProps {
  initialProjects: ProjectData[];
  contacts: any[];
}

const CATEGORIES = ["AI & Full-Stack", "SaaS & Web3/SaaS", "SaaS & Mobile Web", "Full-Stack Web"];

const EMPTY: Partial<ProjectData> = {
  id: "",
  title: "",
  subtitle: "",
  description: "",
  techBadges: [],
  liveLink: "",
  githubLink: "",
  category: "Full-Stack Web",
  featured: true,
  architecture: { auth: "JWT", database: "MongoDB", caching: "Redis", apis: "REST API", systemHighlights: [] },
};

type Toast = { text: string; kind: "ok" | "error" } | null;

const formatDate = (d: any) => {
  const date = d ? new Date(d) : null;
  if (!date || isNaN(date.getTime())) return "Date unknown";
  return date.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" });
};

export default function AdminDashboard({ initialProjects, contacts }: AdminDashboardProps) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [activeTab, setActiveTab] = useState<"projects" | "contacts">("projects");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<ProjectData>>(EMPTY);
  const [techBadgeInput, setTechBadgeInput] = useState("");
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [toast, setToast] = useState<Toast>(null);
  const toastTimer = useRef<number>();
  const formRef = useRef<HTMLDivElement>(null);

  const notify = (text: string, kind: "ok" | "error" = "ok") => {
    setToast({ text, kind });
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), 3200);
  };
  useEffect(() => () => window.clearTimeout(toastTimer.current), []);

  const unread = contacts.filter((c) => !c.status || c.status === "unread").length;
  const latest = contacts.length ? formatDate(contacts[0].createdAt).split(",")[0] : "None yet";
  const categories = useMemo(() => {
    const list = [...CATEGORIES];
    if (formData.category && !list.includes(formData.category)) list.unshift(formData.category);
    return list;
  }, [formData.category]);

  const resetForm = () => {
    setFormData(EMPTY);
    setTechBadgeInput("");
    setIsEditing(false);
  };

  const handleEdit = (project: ProjectData) => {
    setFormData(project);
    setIsEditing(true);
    setConfirmId(null);
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    const res = await deleteProjectAction(id);
    setLoading(false);
    setConfirmId(null);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (isEditing && formData.id === id) resetForm();
      notify("Project deleted.");
    } else {
      notify(res.error || "The project couldn't be deleted. Try again.", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const projectToSave = {
      ...formData,
      id: formData.id || formData.title?.toLowerCase().replace(/\s+/g, "-") || Date.now().toString(),
    } as ProjectData;

    const res = isEditing
      ? await updateProjectAction(projectToSave.id, projectToSave)
      : await createProjectAction(projectToSave);

    setLoading(false);

    if (res.success) {
      if (isEditing) setProjects((prev) => prev.map((p) => (p.id === projectToSave.id ? projectToSave : p)));
      else setProjects((prev) => [projectToSave, ...prev]);
      notify(isEditing ? "Project updated." : "Project created.");
      resetForm();
    } else {
      notify(res.error || "The project couldn't be saved. Check the fields and try again.", "error");
    }
  };

  const handleAddTechBadge = () => {
    if (!techBadgeInput.trim()) return;
    setFormData((prev) => ({ ...prev, techBadges: [...(prev.techBadges || []), techBadgeInput.trim()] }));
    setTechBadgeInput("");
  };

  const handleRemoveTechBadge = (index: number) => {
    setFormData((prev) => ({ ...prev, techBadges: (prev.techBadges || []).filter((_, i) => i !== index) }));
  };

  return (
    <div className="adm">
      <header className="adm-top">
        <Link href="/" className="adm-logo"><span className="c">©</span> Code by Abhishek<b>Studio</b></Link>
        <div className="adm-top-actions">
          <Link href="/" className="adm-pill night"><ArrowUpRight aria-hidden="true" /> View site</Link>
          <button onClick={() => logoutAdmin()} className="adm-pill night danger"><LogOut aria-hidden="true" /> Log out</button>
        </div>
      </header>

      <div className="adm-wrap">
        <div className="adm-head">
          <h1>Studio</h1>
          <p>Projects you add here appear on the portfolio under “Also built”. Messages from the contact form land in the inbox.</p>
        </div>

        <div className="adm-stats">
          <div className="adm-stat"><span className="fig">{projects.length}</span><div><p className="lbl">Projects in the CMS</p><p className="src">Create, edit or remove below</p></div></div>
          <div className="adm-stat dark"><span className="fig">{contacts.length}</span><div><p className="lbl">Messages received</p><p className="src">From the contact form</p></div></div>
          <div className="adm-stat blue"><span className="fig">{unread}</span><div><p className="lbl">Unread messages</p><p className="src">Newest first in the inbox</p></div></div>
          <div className="adm-stat"><span className="fig" style={{ fontSize: "clamp(26px,2.6vw,38px)" }}>{latest}</span><div><p className="lbl">Latest message</p><p className="src">Local date</p></div></div>
        </div>

        <div className="adm-tabs" role="tablist" aria-label="Studio sections">
          <button role="tab" aria-selected={activeTab === "projects"} onClick={() => setActiveTab("projects")}>Projects<span>{projects.length}</span></button>
          <button role="tab" aria-selected={activeTab === "contacts"} onClick={() => setActiveTab("contacts")}>Inbox<span>{contacts.length}</span></button>
        </div>

        {activeTab === "projects" ? (
          <div className="adm-grid">
            <div className="adm-card adm-form-card" ref={formRef}>
              <div className="adm-card-head">
                <h2>{isEditing ? `Edit ${formData.title || "project"}` : "New project"}</h2>
                <span className={`adm-badge${isEditing ? " edit" : ""}`}>{isEditing ? "Editing" : "Draft"}</span>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="adm-field"><span className="q">01</span><div>
                  <label htmlFor="pf-title">Project title</label>
                  <input id="pf-title" type="text" required placeholder="GridSense" value={formData.title || ""} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                </div></div>
                <div className="adm-field"><span className="q">02</span><div>
                  <label htmlFor="pf-sub">Subtitle</label>
                  <input id="pf-sub" type="text" required placeholder="AI IoT telemetry gateway" value={formData.subtitle || ""} onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })} />
                </div></div>
                <div className="adm-field"><span className="q">03</span><div>
                  <label htmlFor="pf-cat">Category</label>
                  <select id="pf-cat" value={formData.category || "Full-Stack Web"} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
                    {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div></div>
                <div className="adm-field"><span className="q">04</span><div>
                  <label htmlFor="pf-desc">Description</label>
                  <textarea id="pf-desc" rows={3} required placeholder="What it does and how it's built" value={formData.description || ""} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
                </div></div>
                <div className="adm-field"><span className="q">05</span><div>
                  <label htmlFor="pf-live">Live link</label>
                  <input id="pf-live" type="url" required placeholder="https://project.vercel.app" value={formData.liveLink || ""} onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })} />
                </div></div>
                <div className="adm-field"><span className="q">06</span><div>
                  <label htmlFor="pf-tag">Tech tags</label>
                  <div className="adm-tag-input">
                    <input id="pf-tag" type="text" placeholder="Next.js" value={techBadgeInput} onChange={(e) => setTechBadgeInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTechBadge(); } }} />
                    <button type="button" className="adm-pill" onClick={handleAddTechBadge}><Plus aria-hidden="true" /> Add</button>
                  </div>
                  {formData.techBadges && formData.techBadges.length > 0 ? (
                    <div className="adm-tags">
                      {formData.techBadges.map((b, i) => (
                        <span key={`${b}-${i}`} className="adm-tag">{b}
                          <button type="button" onClick={() => handleRemoveTechBadge(i)} aria-label={`Remove ${b}`}>×</button>
                        </span>
                      ))}
                    </div>
                  ) : <p className="hint">Press Enter or Add after each tag.</p>}
                </div></div>

                <div className="adm-form-actions">
                  <button type="submit" disabled={loading} className="adm-pill dark">
                    {loading ? "Saving…" : isEditing ? "Update project" : "Create project"}
                  </button>
                  {isEditing && <button type="button" onClick={resetForm} className="adm-pill">Cancel</button>}
                </div>
              </form>
            </div>

            <div>
              <div className="adm-list-head"><span>Projects in the CMS</span><span>{projects.length} total</span></div>
              {projects.length === 0 ? (
                <div className="adm-empty" style={{ marginTop: 24 }}><h3>No projects yet</h3><p>Fill in the form to add your first one.</p></div>
              ) : (
                <ul className="adm-rows">
                  {projects.map((p) => (
                    <li key={p.id} className={`adm-row${isEditing && formData.id === p.id ? " editing" : ""}`}>
                      <div>
                        <span className="cat">{p.category}</span>
                        <h3>{p.title}</h3>
                        <p className="desc">{p.description}</p>
                        {p.techBadges.length > 0 && <div className="adm-tags">{p.techBadges.map((b, i) => <span key={`${b}-${i}`} className="adm-tag static">{b}</span>)}</div>}
                      </div>
                      <div className="adm-row-actions">
                        {confirmId === p.id ? (
                          <div className="adm-confirm">
                            Delete?
                            <button className="adm-pill danger" onClick={() => handleDelete(p.id)} disabled={loading}>Yes, delete</button>
                            <button className="adm-pill" onClick={() => setConfirmId(null)}>Cancel</button>
                          </div>
                        ) : (
                          <>
                            {p.liveLink && <a className="adm-icon-btn" href={p.liveLink} target="_blank" rel="noopener" title="Open live link" aria-label={`Open ${p.title}`}><ArrowUpRight /></a>}
                            <button className="adm-icon-btn" onClick={() => handleEdit(p)} title="Edit project" aria-label={`Edit ${p.title}`}><Edit3 /></button>
                            <button className="adm-icon-btn danger" onClick={() => setConfirmId(p.id)} title="Delete project" aria-label={`Delete ${p.title}`}><Trash2 /></button>
                          </>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="adm-list-head"><span>Messages from the contact form</span><span>{unread} unread</span></div>
            {contacts.length === 0 ? (
              <div className="adm-empty" style={{ marginTop: 24 }}>
                <h3>No messages yet</h3>
                <p>When someone uses “Get in touch” on the portfolio, their message appears here.</p>
              </div>
            ) : (
              contacts.map((c, i) => (
                <article key={c._id ? String(c._id) : i} className="adm-mail">
                  <div className="who">
                    <b>{c.name}</b>
                    <a href={`mailto:${c.email}`}>{c.email}</a>
                    <time>{formatDate(c.createdAt)}</time>
                  </div>
                  <div>
                    <h3>{c.subject}</h3>
                    <p>{c.message}</p>
                    <span className={`adm-status${!c.status || c.status === "unread" ? " unread" : ""}`}>{c.status || "unread"}</span>
                  </div>
                  <div><a className="adm-pill" href={`mailto:${c.email}?subject=${encodeURIComponent("Re: " + (c.subject || "your message"))}`}>Reply</a></div>
                </article>
              ))
            )}
          </div>
        )}
      </div>

      <div className={`adm-toast${toast ? " show" : ""}${toast?.kind === "error" ? " error" : ""}`} role="status" aria-live="polite">
        <i />{toast?.text}
      </div>
    </div>
  );
}

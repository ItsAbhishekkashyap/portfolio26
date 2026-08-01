"use client";

import React, { useState } from "react";
import { ProjectData } from "@/lib/seed-data";
import { createProjectAction, updateProjectAction, deleteProjectAction, logoutAdmin } from "@/lib/actions";
import { Shield, Plus, Trash2, Edit3, LogOut, CheckCircle2, MessageSquare, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";

interface AdminDashboardProps {
  initialProjects: ProjectData[];
  contacts: any[];
}

export default function AdminDashboard({ initialProjects, contacts }: AdminDashboardProps) {
  const [projects, setProjects] = useState<ProjectData[]>(initialProjects);
  const [activeTab, setActiveTab] = useState<"projects" | "contacts">("projects");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<ProjectData>>({
    id: "",
    title: "",
    subtitle: "",
    description: "",
    techBadges: [],
    liveLink: "",
    githubLink: "",
    category: "Full-Stack Web",
    featured: true,
    architecture: {
      auth: "JWT",
      database: "MongoDB",
      caching: "Redis",
      apis: "REST API",
      systemHighlights: [],
    },
  });

  const [techBadgeInput, setTechBadgeInput] = useState("");

  const resetForm = () => {
    setFormData({
      id: "",
      title: "",
      subtitle: "",
      description: "",
      techBadges: [],
      liveLink: "",
      githubLink: "",
      category: "Full-Stack Web",
      featured: true,
      architecture: {
        auth: "JWT",
        database: "MongoDB",
        caching: "Redis",
        apis: "REST API",
        systemHighlights: [],
      },
    });
    setTechBadgeInput("");
    setIsEditing(false);
  };

  const handleEdit = (project: ProjectData) => {
    setFormData(project);
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setLoading(true);
    const res = await deleteProjectAction(id);
    setLoading(false);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setFeedback("Project deleted successfully.");
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);

    const projectToSave = {
      ...formData,
      id: formData.id || formData.title?.toLowerCase().replace(/\s+/g, "-") || Date.now().toString(),
    } as ProjectData;

    let res;
    if (isEditing) {
      res = await updateProjectAction(projectToSave.id, projectToSave);
    } else {
      res = await createProjectAction(projectToSave);
    }

    setLoading(false);

    if (res.success) {
      if (isEditing) {
        setProjects((prev) => prev.map((p) => (p.id === projectToSave.id ? projectToSave : p)));
      } else {
        setProjects((prev) => [projectToSave, ...prev]);
      }
      setFeedback(res.message || "Project saved successfully.");
      resetForm();
      setTimeout(() => setFeedback(null), 3000);
    } else {
      alert(res.error);
    }
  };

  const handleAddTechBadge = () => {
    if (!techBadgeInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      techBadges: [...(prev.techBadges || []), techBadgeInput.trim()],
    }));
    setTechBadgeInput("");
  };

  const handleRemoveTechBadge = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      techBadges: (prev.techBadges || []).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 p-4 sm:p-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 rounded-2xl shadow-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-heading">Protected Admin CMS Dashboard</h1>
              <p className="text-xs text-amber-700 dark:text-amber-400 font-mono">Abhishek Gond Portfolio Management System</p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono">
            <Link
              href="/"
              className="px-4 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Portfolio</span>
            </Link>

            <button
              onClick={() => logoutAdmin()}
              className="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 dark:text-rose-400 border border-rose-500/20 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {feedback && (
          <div className="p-4 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono">
            {feedback}
          </div>
        )}

        {/* Tab Buttons */}
        <div className="flex gap-3 border-b border-stone-200 dark:border-stone-800 pb-2 font-mono">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "projects"
                ? "bg-amber-500 text-stone-950 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
          >
            Project Manager ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("contacts")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "contacts"
                ? "bg-amber-500 text-stone-950 shadow-sm"
                : "text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
            }`}
          >
            Contact Submissions Inbox ({contacts.length})
          </button>
        </div>

        {activeTab === "projects" ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Project Form (5 Cols) */}
            <div className="lg:col-span-5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 mb-4 flex items-center gap-2 font-heading">
                <Plus className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <span>{isEditing ? "Edit Existing Project" : "Create New Project"}</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-stone-500 dark:text-stone-400 block mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title || ""}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-stone-500 dark:text-stone-400 block mb-1">Subtitle / Short Tagline</label>
                  <input
                    type="text"
                    required
                    value={formData.subtitle || ""}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-stone-500 dark:text-stone-400 block mb-1">Category</label>
                  <select
                    value={formData.category || "Full-Stack Web"}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  >
                    <option value="AI & Full-Stack">AI & Full-Stack</option>
                    <option value="SaaS & Web3/SaaS">SaaS & Web3/SaaS</option>
                    <option value="SaaS & Mobile Web">SaaS & Mobile Web</option>
                    <option value="Full-Stack Web">Full-Stack Web</option>
                  </select>
                </div>

                <div>
                  <label className="text-stone-500 dark:text-stone-400 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    required
                    value={formData.description || ""}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-stone-500 dark:text-stone-400 block mb-1">Live Link URL</label>
                  <input
                    type="url"
                    required
                    value={formData.liveLink || ""}
                    onChange={(e) => setFormData({ ...formData, liveLink: e.target.value })}
                    className="w-full p-2.5 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Tech Badges */}
                <div>
                  <label className="text-stone-500 dark:text-stone-400 block mb-1">Tech Badges</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Add badge (e.g. Next.js)..."
                      value={techBadgeInput}
                      onChange={(e) => setTechBadgeInput(e.target.value)}
                      className="flex-1 p-2 rounded-lg bg-[#fbf9f5] dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleAddTechBadge}
                      className="px-3 py-1 bg-stone-200 dark:bg-stone-800 text-amber-700 dark:text-amber-400 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-700 font-bold"
                    >
                      + Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {formData.techBadges?.map((b, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-[#fbf9f5] dark:bg-stone-950 text-amber-700 dark:text-amber-400 border border-stone-200 dark:border-stone-800 text-[10px] flex items-center gap-1">
                        {b}
                        <button type="button" onClick={() => handleRemoveTechBadge(i)} className="text-rose-500 font-bold ml-1">✕</button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition-all shadow-sm"
                  >
                    {loading ? "Saving..." : isEditing ? "Update Project" : "Create Project"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-4 py-2.5 rounded-xl bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300 dark:hover:bg-stone-700"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Right Column: Existing Projects List (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-heading">Existing CMS Projects</h2>

              {projects.map((p) => (
                <div
                  key={p.id}
                  className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between gap-4 hover:border-amber-500/50 transition-colors shadow-sm"
                >
                  <div>
                    <span className="text-[10px] text-amber-700 dark:text-amber-400 font-mono uppercase font-bold">{p.category}</span>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg font-heading">{p.title}</h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400 font-mono line-clamp-1">{p.description}</p>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {p.techBadges.map((b, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-[#fbf9f5] dark:bg-stone-950 text-stone-700 dark:text-stone-300 text-[10px] border border-stone-200 dark:border-stone-800 font-mono">
                          {b}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="p-2 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-amber-700 dark:text-amber-400"
                      title="Edit Project"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500 hover:text-white text-rose-600 dark:text-rose-400"
                      title="Delete Project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Contacts Inbox Tab */
          <div className="space-y-4 font-mono">
            <h2 className="text-lg font-bold text-stone-900 dark:text-stone-100 font-heading">Received Contact Inquiries</h2>

            {contacts.length === 0 ? (
              <div className="p-8 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl text-stone-500 text-xs">
                No contact form submissions recorded yet.
              </div>
            ) : (
              contacts.map((c, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-amber-700 dark:text-amber-400 font-bold">{c.name} ({c.email})</span>
                    <span className="text-stone-500">{new Date(c.createdAt).toLocaleString()}</span>
                  </div>
                  <h4 className="font-bold text-stone-900 dark:text-stone-200 text-sm font-heading">{c.subject}</h4>
                  <p className="text-xs text-stone-700 dark:text-stone-300 bg-[#fbf9f5] dark:bg-stone-950 p-3 rounded-xl border border-stone-200 dark:border-stone-800">{c.message}</p>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}

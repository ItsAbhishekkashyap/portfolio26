import "./site.css";
import { getProjects } from "@/lib/actions";
import { PROJECTS, ALSO_BUILT, PROFILE, type Project } from "@/lib/content";
import type { ProjectData } from "@/lib/seed-data";
import Portfolio from "@/components/site/Portfolio";

export const revalidate = 60; // Incremental Static Regeneration every 60s

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

// Projects created in the admin CMS that aren't part of the curated set appear under "Also built".
function fromCms(p: ProjectData): Project {
  const a = p.architecture;
  const specs: [string, string][] = a
    ? ([["Authentication", a.auth], ["Database", a.database], ["Caching", a.caching], ["APIs", a.apis]] as [string, string][]).filter(([, v]) => v && v !== "None")
    : [];
  return {
    id: p.id, title: p.title, subtitle: p.subtitle, cat: p.category, color: "#3f434c", chip: p.category, file: "README.md",
    desc: p.description, tech: p.techBadges || [], live: p.liveLink, gh: p.githubLink || PROFILE.socials.github,
    specs, hl: a?.systemHighlights || [],
    code: `<span class="c">// ${escapeHtml(p.title)}</span>\n<span class="k">stack</span> = [\n${(p.techBadges || []).slice(0, 5).map((t) => `  <span class="s">"${escapeHtml(t)}"</span>`).join(",\n")}\n];`,
  };
}

export default async function HomePage() {
  const curated = new Set([...PROJECTS, ...ALSO_BUILT].map((p) => p.id));
  let extras: Project[] = [];
  try {
    const cms = await getProjects();
    extras = cms.filter((p) => p.featured !== false && !curated.has(p.id)).map(fromCms);
  } catch {
    extras = [];
  }
  return <Portfolio projects={PROJECTS} also={[...ALSO_BUILT, ...extras]} />;
}

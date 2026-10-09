// Single source of truth for everything the public site shows.
// Copy here follows the 2026 AI/GenAI resume (public/Abhishek_Gond_Resume.pdf).

export const PROFILE = {
  name: "Abhishek Gond",
  role: "AI & GenAI engineer",
  roleLine2: "& full-stack developer",
  status: "Open to 2027 SDE and AI engineering roles",
  email: "abhi47025@gmail.com",
  phone: "+919335848661",
  phoneDisplay: "+91 93358 48661",
  location: ["Based in", "Lucknow,", "India"],
  resumeUrl: "/Abhishek_Gond_Resume.pdf",
  photo: "/abhishek.jpg",
  socials: {
    github: "https://github.com/ItsAbhishekkashyap",
    linkedin: "https://www.linkedin.com/in/abhishek-gond-054884256",
    leetcode: "https://leetcode.com/u/Its_Abhishek_Kashyap/",
  },
};

export const INTRO = {
  lead:
    "I build AI that answers with evidence and full-stack products that stay fast when real users arrive. Final-year engineer at IET Lucknow, shipping RAG systems, tool-calling agents and real-time apps, and ready for my next team.",
  side:
    "From a clinical RAG backend at Panscience Innovations to a top-30 finish among 4,200+ hackers, my favourite problems sit where LLMs meet messy real-world data. I care just as much about the auth, caching and tests that make them safe to ship.",
};

export const FOCUS = [
  { title: "AI & GenAI systems", body: "RAG with citation checks, LangGraph tool-calling agents, map-reduce summarization.", tech: "LangChain, LangGraph, LLMs, vector search" },
  { title: "Full-stack products", body: "Next.js frontends on Node, Express and FastAPI backends, with real-time streams.", tech: "Next.js, Node.js, FastAPI, Socket.IO" },
  { title: "Data & retrieval", body: "Relational and vector stores, embeddings, and schemas that keep tenants apart.", tech: "PostgreSQL, pgvector, Pinecone, ChromaDB, Prisma" },
  { title: "Reliability", body: "Fallbacks, circuit breakers, schema-validated LLM output and real test suites.", tech: "Zod, Pydantic, pytest, Docker, CI/CD" },
];

export interface ProjectShots {
  url: string;
  cover: string;
  float?: string;
  gallery: [file: string, caption: string][];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  cat: string;
  color: string;
  chip: string;
  file: string;
  desc: string;
  tech: string[];
  live: string;
  gh: string;
  specs: [label: string, value: string][];
  hl: string[];
  /** Trusted, hand-written HTML (syntax-colour spans) for the code-window preview. */
  code: string;
  shots?: ProjectShots;
}

const GH = PROFILE.socials.github;

export const PROJECTS: Project[] = [
  {
    id: "ayunidan", title: "AyuNidan", subtitle: "Clinical RAG and PDF extraction, Panscience Innovations", cat: "AI & full-stack", color: "#0f3d3a", chip: "270 backend tests", file: "extract.ts",
    desc: "An Express 5 and TypeScript backend that extracts values from multimodal clinical PDFs, checks each one against the source text, and answers from guideline knowledge bases with validated citations.",
    tech: ["Express 5", "TypeScript", "Next.js", "MongoDB", "Pinecone", "RAG"], live: "https://ayunidan.vercel.app/", gh: GH,
    specs: [["Extraction", "Multimodal clinical PDFs, every value verified against source text"], ["Reliability", "LLM fallback and circuit breaker"], ["Retrieval", "Pinecone with local BGE-small embeddings"], ["Knowledge", "MedlinePlus/MeSH, ACC/AHA and WHO guidelines"], ["Auth", "JWT tenant isolation"], ["Testing", "270 backend and 10 frontend tests"]],
    hl: ["Citation validation in code blocks hallucinated references", "Insufficient-evidence handling instead of guessing", "Values verified against the source PDF before they are stored"],
    code: '<span class="c">// answer only when evidence exists</span>\n<span class="k">if</span> (!citations.every(inSource))\n  <span class="k">return</span> { status: <span class="s">"insufficient_evidence"</span> };\n\nbreaker.<span class="k">fire</span>(primaryLLM)\n  .fallback(secondaryLLM);',
    shots: { url: "ayunidan.vercel.app", cover: "ayunidan-hero", gallery: [["ayunidan-hero", "Landing page"], ["ayunidan-dashboard", "Clinical overview with risk tiers and the live RAG index"], ["ayunidan-intake", "Patient intake from a PDF, an image or a voice note"], ["ayunidan-architecture", "Platform architecture"]] },
  },
  {
    id: "gridsense", title: "GridSense", subtitle: "AI IoT telemetry gateway", cat: "AI & IoT", color: "#0b2545", chip: "Readings every 2 s", file: "agent.ts",
    desc: "A real-time gateway that streams solar panel telemetry over Socket.IO and lets users query it through a LangGraph agent that calls typed Prisma tools instead of writing SQL.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Socket.IO", "Prisma", "pgvector"], live: "https://gridsense.vercel.app", gh: GH,
    specs: [["Streaming", "Socket.IO, simulated readings every 2 s to per-user rooms"], ["Writes", "30 readings per panel batched into one Prisma write a minute"], ["Agent", "LangGraph tool-calling loop on Groq Llama 3.1 8B"], ["Retrieval", "pgvector over 384-d MiniLM embeddings"], ["Auth", "Rotating httpOnly refresh tokens, 15-min JWTs"], ["Payments", "Razorpay HMAC-SHA256 with an atomic Prisma transaction"]],
    hl: ["The model picks Zod-validated Prisma tools, so it never generates SQL", "Payment, subscription and user records update in one transaction", "Batched writes keep database load flat as panels scale"],
    code: '<span class="c">// LLM picks a typed tool, never raw SQL</span>\n<span class="k">const</span> tools = [\n  getPanelStats,   <span class="c">// z.object({ panelId })</span>\n  getDailyYield,\n];\nllm.bindTools(tools)  <span class="c">// llama-3.1-8b</span>',
    shots: { url: "gridsense.vercel.app", cover: "gridsense-hero", float: "gridsense-panel", gallery: [["gridsense-hero", "Landing page"], ["gridsense-panel", "Live panel card flagging a critical efficiency drop"]] },
  },
  {
    id: "algorithmic-rag", title: "Algorithmic RAG", subtitle: "Framework-free retrieval engine", cat: "AI & microservices", color: "#2b2d42", chip: "No LangChain", file: "retrieve.py",
    desc: "A RAG pipeline written from first principles in Python: its own chunker, local CPU embeddings and exact NumPy retrieval, with FastAPI endpoints that keep retrieval and generation separate.",
    tech: ["Python", "NumPy", "FastAPI", "Streamlit", "Gemini"], live: "https://algorithmic-rag-engine.streamlit.app/", gh: GH,
    specs: [["Chunking", "O(N) sliding window, 200 words with 50 overlap"], ["Embeddings", "Local CPU MiniLM, pre-warmed at startup"], ["Retrieval", "Exact top-k cosine over an M×384 float32 matrix"], ["API", "FastAPI ingest and query endpoints"], ["Generation", "Gemini with a strict grounding prompt"], ["Observability", "Model fallback and per-stage latency"]],
    hl: ["No LangChain or LlamaIndex", "Vectorized NumPy similarity, no vector database", "Model loaded once at FastAPI startup"],
    code: '<span class="k">def</span> top_k(q, M, k=<span class="n">5</span>):\n    q = q / np.linalg.norm(q)\n    sims = M @ q   <span class="c"># (M,384) float32</span>\n    <span class="k">return</span> np.argsort(-sims)[:k]',
    shots: { url: "algorithmic-rag-engine.streamlit.app", cover: "algorag-app", gallery: [["algorag-app", "Engine controls, live NumPy matrix shape and the query box"]] },
  },
  {
    id: "meeting-intelligence", title: "Meeting Intelligence", subtitle: "Meeting and video summarization pipeline", cat: "GenAI pipeline", color: "#3a2a1f", chip: "Whisper + Sarvam AI", file: "pipeline.py",
    desc: "Turns meeting recordings and videos into action items, decisions and a chat you can question, routing audio between local Whisper and Sarvam AI by language.",
    tech: ["Python", "Streamlit", "LangChain", "Whisper", "Mistral", "ChromaDB"], live: "https://videomeetai.streamlit.app/", gh: GH,
    specs: [["Audio", "yt-dlp and ffmpeg, 16 kHz mono in 10-min chunks"], ["Transcription", "Local Whisper or Sarvam AI (25 s pieces) by language"], ["Summaries", "Mistral 8B map-reduce over 3 LCEL chains"], ["Chunks", "3,000 characters with 200 overlap"], ["Chat", "MiniLM and ChromaDB retrieval, top 4"], ["Safety", "Hallucination fallbacks"]],
    hl: ["Separate chains for summary, actions and decisions", "Language-aware routing between two speech models", "Chunk sizes tuned to API limits"],
    code: '<span class="c"># route by language</span>\n<span class="k">if</span> lang <span class="k">in</span> INDIC:\n    text = sarvam(chunks_25s)\n<span class="k">else</span>:\n    text = whisper.transcribe(wav)\n\nsummary = map_reduce(text, llm=<span class="s">"mistral-8b"</span>)',
  },
  {
    id: "coderag", title: "CodeRAG Vector", subtitle: "Hack Devengers 1.0, top 30 of 4.2K+", cat: "AI DevSecOps", color: "#1e1b4b", chip: "Top 30 / 4.2K+", file: "audit.json",
    desc: "A FastAPI pipeline that audits a codebase from a local path or GitHub zipball, grounding every finding in a security knowledge base and returning validated JSON.",
    tech: ["FastAPI", "ChromaDB", "Gemini", "Pydantic", "pytest"], live: "https://coderagvector.vercel.app/", gh: GH,
    specs: [["Ingest", "Local paths or GitHub zipballs"], ["Limits", "Directory pruning, extension whitelist, 15 files and 300 lines"], ["Knowledge", "17-rule CS and security base in ChromaDB"], ["Retrieval", "all-MiniLM-L6-v2, top 5 rules per file"], ["Output", "Gemini JSON mode validated by Pydantic"], ["Testing", "Heuristic fallbacks and pytest coverage"]],
    hl: ["Token usage bounded by file and line caps", "Every finding cites the rule it came from", "Hack Devengers 1.0, top 30 of 4,200+ participants"],
    code: '{\n  <span class="k">"file"</span>: <span class="s">"api/user.py"</span>,\n  <span class="k">"rule"</span>: <span class="s">"SEC-04 SQL injection"</span>,\n  <span class="k">"line"</span>: <span class="n">42</span>,\n  <span class="k">"severity"</span>: <span class="s">"high"</span>\n}',
    shots: { url: "coderagvector.vercel.app", cover: "coderag-hero", gallery: [["coderag-hero", "Landing page with the four audit modules"], ["coderag-stats", "Quality index, audited files and flagged violations"], ["coderag-results", "Per-file audit results"]] },
  },
  {
    id: "agni-ai", title: "AGNI.AI", subtitle: "Smart India Hackathon internal round, 3rd rank", cat: "AI & geospatial", color: "#5a1e14", chip: "SIH internal, 3rd", file: "alerts.sql",
    desc: "A disaster response system that fuses NASA FIRMS satellite telemetry with PostGIS mapping and multimodal AI to classify industrial thermal anomalies and trigger alerts.",
    tech: ["NASA FIRMS", "PostGIS", "VLM", "XGBoost"], live: "", gh: GH,
    specs: [["Data", "NASA FIRMS satellite telemetry"], ["Mapping", "PostGIS"], ["Models", "Vision-language model with XGBoost"], ["Output", "Thermal anomaly classification and alerts"]],
    hl: ["Ranked 3rd in the SIH internal round", "Satellite and map data in one pipeline"],
    code: '<span class="k">SELECT</span> id, frp, confidence\n<span class="k">FROM</span> firms_hotspots h\n<span class="k">WHERE</span> ST_DWithin(\n  h.geom, plant.geom, <span class="n">2000</span>)\n<span class="k">AND</span> frp &gt; <span class="n">35</span>;',
  },
];

export const ALSO_BUILT: Project[] = [
  {
    id: "menuluxe", title: "MenuLuxe", subtitle: "Digital QR menu SaaS", cat: "SaaS", color: "#6d2a1c", chip: "Row-level security", file: "policy.sql",
    desc: "A multi-tenant restaurant menu SaaS with row-level security and GSAP-animated menus built on strict Supabase joins.",
    tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"], live: "https://menuluxe.vercel.app/", gh: GH,
    specs: [["Auth", "Supabase Auth and RLS"], ["Database", "Supabase PostgreSQL"]], hl: ["Multi-tenant architecture with row-level security", "GSAP-animated menus"],
    code: '<span class="k">create policy</span> <span class="s">"tenant_read"</span>\n  <span class="k">on</span> menu_items <span class="k">for select</span>\n  <span class="k">using</span> (restaurant_id =\n    auth.jwt()->><span class="s">\'tenant\'</span>);',
  },
  {
    id: "branqly", title: "Branqly", subtitle: "URL shortener SaaS", cat: "SaaS", color: "#3355ff", chip: "Custom domains", file: "verify.ts",
    desc: "A URL shortener SaaS with custom domain mapping, DNS CNAME verification and Razorpay subscription billing.",
    tech: ["Next.js", "TypeScript", "MongoDB", "Razorpay"], live: "https://branqly.xyz/", gh: GH,
    specs: [["Domains", "DNS CNAME verification"], ["Billing", "Razorpay subscriptions"]], hl: ["Custom domain mapping", "Automated subscription billing"],
    code: '<span class="k">const</span> rec = <span class="k">await</span> dns.resolveCname(d);\n<span class="k">if</span> (rec.includes(<span class="s">"cname.branqly.xyz"</span>))\n  domain.verified = <span class="k">true</span>;',
  },
  {
    id: "placement-portal", title: "Placement Portal", subtitle: "IET Lucknow placement cell", cat: "Campus", color: "#3f434c", chip: "In production", file: "drives.js",
    desc: "The official placement portal for IET Lucknow. I set up the core frontend that runs campus drive workflows.",
    tech: ["HTML5", "Tailwind CSS", "JavaScript", "Node.js"], live: "https://placementietlucknow.vercel.app/", gh: GH,
    specs: [], hl: ["Core frontend architecture in production", "Powers campus drive workflows"],
    code: '<span class="c">// drive schedule</span>\nrender(drives.filter(d =&gt;\n  d.branch.includes(<span class="s">"ECE"</span>)\n));',
  },
];

export interface ProofTile { fig: string; what: string; src: string; tone?: "dark" | "blue" | "photo" }
export const PROOF_ROWS: ProofTile[][] = [
  [
    { fig: "2 s", what: "Panel readings streamed to per-user Socket.IO rooms", src: "GridSense" },
    { fig: "270", what: "Backend tests, plus 10 frontend, behind the clinical RAG system", src: "Panscience Innovations", tone: "dark" },
    { fig: "IET", what: "B.Tech ECE, 2023 to 2027, CGPA 7.85", src: "Lucknow", tone: "photo" },
    { fig: "Top 30", what: "Out of 4,200+ participants with CodeRAG Vector", src: "Hack Devengers 1.0", tone: "blue" },
    { fig: "11", what: "Prisma clients in one multi-schema setup", src: "Durga Foundation" },
    { fig: "17", what: "CS and security rules grounding every code audit", src: "CodeRAG Vector", tone: "dark" },
  ],
  [
    { fig: "30 → 1", what: "Readings batched into one Prisma write per panel per minute", src: "GridSense", tone: "dark" },
    { fig: "3rd", what: "Rank in the Smart India Hackathon internal round with AGNI.AI", src: "SIH 2026" },
    { fig: "450+", what: "DSA problems on LeetCode and GFG over 100+ active days", src: "Problem solving", tone: "blue" },
    { fig: "M×384", what: "float32 matrix searched with exact top-k NumPy cosine similarity", src: "Algorithmic RAG Engine" },
    { fig: "16 kHz", what: "Mono audio routed between local Whisper and Sarvam AI by language", src: "Meeting Intelligence", tone: "dark" },
    { fig: "15 min", what: "JWT lifetime with rotating httpOnly refresh tokens", src: "GridSense" },
  ],
];

export interface JourneyItem { when: string; kind: string; role: string; org: string; points: string[]; tags: string[] }
export const JOURNEY: JourneyItem[] = [
  {
    when: "Jul 2026", kind: "Fellowship", role: "Software Engineer Fellow", org: "Panscience Innovations",
    points: [
      "Built an Express 5 and TypeScript backend for multimodal clinical PDF extraction that verifies each value against the source text and handles LLM failures with a fallback and circuit breaker.",
      "Designed a Pinecone RAG system with local BGE-small embeddings, JWT tenant isolation, and MedlinePlus/MeSH, ACC/AHA and WHO guideline knowledge bases.",
      "Enforced citation validation and insufficient-evidence handling in code to block hallucinated references, validated by 270 backend and 10 frontend tests.",
    ],
    tags: ["Node.js", "Express 5", "TypeScript", "Next.js", "MongoDB", "Pinecone", "RAG", "LLM"],
  },
  {
    when: "Feb 2026 – Apr 2026", kind: "Internship", role: "Full-Stack Developer Intern", org: "Durga Foundation",
    points: [
      "Migrated the NGO portal to Next.js and built the full-stack Youth Corner platform with Node.js, Express and MySQL.",
      "Architected an 11-client multi-schema Prisma setup and integrated Redis caching and Razorpay donation processing.",
    ],
    tags: ["Next.js", "Node.js", "Prisma", "Redis", "MySQL", "Razorpay"],
  },
  {
    when: "Sep 2025 – Present", kind: "Volunteer", role: "Core Member", org: "Training & Placement Cell, IET Lucknow",
    points: ["Student liaison between hiring teams and candidates; guides peers through the campus recruitment process."],
    tags: [],
  },
  {
    when: "2023 – 2027 (expected)", kind: "Education", role: "B.Tech, Electronics & Communication", org: "Institute of Engineering and Technology, Lucknow. CGPA 7.85 / 10",
    points: [], tags: [],
  },
];

export interface RecognitionItem { big: string; count?: number; title: string; body: string; when: string; href?: string }
export const RECOGNITION: RecognitionItem[] = [
  { big: "Top 30", title: "Hack Devengers 1.0", body: "CodeRAG Vector, a RAG-grounded repository audit pipeline, out of 4,200+ participants.", when: "Aug 2026" },
  { big: "3rd", title: "Smart India Hackathon, internal round", body: "AGNI.AI, a disaster response system built on NASA FIRMS satellite data.", when: "Sep 2026" },
  { big: "450+", count: 450, title: "LeetCode & GeeksforGeeks", body: "DSA problems over 100+ active days, focused on time and space complexity.", when: "Profile", href: PROFILE.socials.leetcode },
  { big: "Silver", title: "Open National Taekwondo Championship", body: "Green 1 belt with 3+ years of training; senior member and mentor at the college club.", when: "Athletics" },
];

export const TOOLKIT: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "C++", "JavaScript", "TypeScript", "SQL"] },
  { group: "AI/ML & GenAI", items: ["LLMs", "RAG", "LangChain", "LangGraph", "AI agents", "Vector search", "Machine learning"] },
  { group: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "HTML/CSS", "Streamlit"] },
  { group: "Backend", items: ["Node.js", "Express.js", "FastAPI", "REST APIs", "Socket.IO"] },
  { group: "Databases", items: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Prisma", "pgvector", "ChromaDB", "Pinecone"] },
  { group: "Tools & core CS", items: ["Git", "Docker", "CI/CD", "OOP", "DBMS", "Operating systems", "Computer networks"] },
];

export const NAV = [
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// Grounding notes for the "Ask about Abhishek" chat, plus the keyword retriever
// that picks which notes the model may see. Used by app/api/ask/route.ts.

export type SourceTarget = { type: "section"; id: string } | { type: "project"; id: string };
export interface Source { id: string; label: string; target: SourceTarget }

export const SOURCES: Record<string, Source> = {
  availability: { id: "availability", label: "Availability", target: { type: "section", id: "top" } },
  education: { id: "education", label: "Education", target: { type: "section", id: "journey" } },
  journey: { id: "journey", label: "Journey", target: { type: "section", id: "journey" } },
  contact: { id: "contact", label: "Contact", target: { type: "section", id: "contact" } },
  recognition: { id: "recognition", label: "Recognition", target: { type: "section", id: "recognition" } },
  toolkit: { id: "toolkit", label: "Toolkit", target: { type: "section", id: "skills" } },
  about: { id: "about", label: "About", target: { type: "section", id: "about" } },
  ayunidan: { id: "ayunidan", label: "AyuNidan", target: { type: "project", id: "ayunidan" } },
  gridsense: { id: "gridsense", label: "GridSense", target: { type: "project", id: "gridsense" } },
  "algorithmic-rag": { id: "algorithmic-rag", label: "Algorithmic RAG", target: { type: "project", id: "algorithmic-rag" } },
  "meeting-intelligence": { id: "meeting-intelligence", label: "Meeting Intelligence", target: { type: "project", id: "meeting-intelligence" } },
  coderag: { id: "coderag", label: "CodeRAG Vector", target: { type: "project", id: "coderag" } },
  "agni-ai": { id: "agni-ai", label: "AGNI.AI", target: { type: "project", id: "agni-ai" } },
  menuluxe: { id: "menuluxe", label: "MenuLuxe", target: { type: "project", id: "menuluxe" } },
  branqly: { id: "branqly", label: "Branqly", target: { type: "project", id: "branqly" } },
  "placement-portal": { id: "placement-portal", label: "Placement Portal", target: { type: "project", id: "placement-portal" } },
};

export interface Note { id: string; kw: string; text: string; src: string[] }

export const NOTES: Note[] = [
  { id: "availability", src: ["availability", "education"],
    kw: "available availability open hire hiring hired role roles job jobs looking opportunity opportunities join start fulltime graduate graduating graduation batch 2027 notice location where based lucknow india sde",
    text: "Abhishek is open to 2027 SDE and AI engineering roles. He is a final-year B.Tech ECE student at IET Lucknow, graduating in 2027, and is based in Lucknow, India." },
  { id: "contact", src: ["contact"],
    kw: "contact email mail phone call number reach talk message linkedin github resume cv connect",
    text: "You can email him at abhi47025@gmail.com or call +91 93358 48661. He is also on LinkedIn and on GitHub as ItsAbhishekkashyap, and his resume is linked in the menu and the footer." },
  { id: "panscience", src: ["journey", "ayunidan"],
    kw: "panscience fellowship fellow ayunidan clinical medical health healthcare hospital pdf pdfs extraction extract pinecone express typescript tests testing test citation citations hallucination hallucinations guideline guidelines medlineplus experience work",
    text: "At Panscience Innovations (Software Engineer Fellow, Jul 2026) he built the Express 5 and TypeScript backend for AyuNidan. It extracts values from multimodal clinical PDFs, checks each one against the source text, and falls back safely through a circuit breaker when an LLM fails. Answers come from MedlinePlus/MeSH, ACC/AHA and WHO guideline knowledge bases through Pinecone RAG with local BGE-small embeddings, and citation validation blocks hallucinated references. The system is covered by 270 backend and 10 frontend tests." },
  { id: "durga", src: ["journey"],
    kw: "durga foundation ngo intern internship youth corner prisma redis razorpay mysql donation donations experience work migrated",
    text: "From Feb to Apr 2026 he was a Full-Stack Developer Intern at Durga Foundation. He migrated the NGO portal to Next.js, built the Youth Corner platform on Node.js, Express and MySQL, set up an 11-client multi-schema Prisma configuration, and added Redis caching and Razorpay donation processing." },
  { id: "tpc", src: ["journey", "placement-portal"],
    kw: "tpc placement cell leadership leader volunteer volunteering recruitment campus liaison",
    text: "Since Sep 2025 he has been a Core Member of the Training & Placement Cell at IET Lucknow, acting as the student liaison between hiring teams and candidates. He also built the core frontend of the college placement portal." },
  { id: "education", src: ["education"],
    kw: "education college university degree cgpa gpa grades marks iet btech b.tech ece electronics communication study studying student",
    text: "He is doing a B.Tech in Electronics and Communication Engineering at the Institute of Engineering and Technology, Lucknow (2023 to 2027) with a CGPA of 7.85 out of 10." },
  { id: "gridsense", src: ["gridsense"],
    kw: "gridsense iot solar panel panels telemetry socket socket.io realtime real-time streaming stream groq llama pgvector razorpay payment payments jwt refresh token auth authentication",
    text: "GridSense is an AI IoT telemetry gateway for solar panels. Socket.IO streams readings every 2 seconds to per-user rooms, and 30 readings per panel are batched into one Prisma write a minute. A LangGraph loop on Groq Llama 3.1 8B picks Zod-validated Prisma tools instead of writing SQL, with pgvector retrieval over 384-dimension MiniLM embeddings. Auth uses rotating httpOnly refresh tokens with 15-minute JWTs, and Razorpay payments are verified with HMAC-SHA256 inside one atomic transaction. Live demo: gridsense.vercel.app." },
  { id: "algorithmic-rag", src: ["algorithmic-rag"],
    kw: "algorithmic framework framework-free numpy cosine similarity chunking chunker chunk embeddings minilm fastapi streamlit gemini scratch principles",
    text: "The Algorithmic RAG Engine is RAG built from scratch in Python, without LangChain or LlamaIndex. It uses an O(N) sliding-window chunker (200 words, 50 overlap), local CPU MiniLM embeddings, and exact top-k NumPy cosine search over an M×384 float32 matrix. FastAPI keeps retrieval and generation separate, and Gemini answers under a strict grounding prompt with a model fallback and per-stage latency reporting." },
  { id: "meeting-intelligence", src: ["meeting-intelligence"],
    kw: "meeting meetings video videos whisper sarvam mistral summarization summarize summary transcript transcription audio speech yt-dlp ffmpeg lcel",
    text: "The Meeting & Video Intelligence Pipeline turns recordings into summaries, action items and decisions. Audio is converted with yt-dlp and ffmpeg to 16 kHz mono in 10-minute chunks and routed by language between local Whisper and Sarvam AI. Mistral 8B summarizes through three LCEL map-reduce chains over 3,000-character chunks, and a MiniLM and ChromaDB chat layer (top 4) answers questions with hallucination fallbacks." },
  { id: "coderag", src: ["coderag", "recognition"],
    kw: "coderag code audit auditing security owasp static analysis devengers vulnerability vulnerabilities pydantic repository repo",
    text: "CodeRAG Vector audits a codebase from a local path or a GitHub zipball. It prunes directories, whitelists extensions and caps input at 15 files and 300 lines to bound token use, grounds every finding in a 17-rule CS and security knowledge base (all-MiniLM-L6-v2 in ChromaDB, top 5 rules per file), and returns Gemini JSON validated by Pydantic with heuristic fallbacks and pytest coverage. It placed in the top 30 of 4,200+ participants at Hack Devengers 1.0 in Aug 2026." },
  { id: "agni-ai", src: ["agni-ai", "recognition"],
    kw: "agni agni.ai sih smart india disaster satellite nasa firms postgis xgboost vlm thermal fire geospatial",
    text: "AGNI.AI is a disaster response system that combines NASA FIRMS satellite telemetry, PostGIS mapping and multimodal AI (a vision-language model with XGBoost) to classify industrial thermal anomalies and trigger alerts. It ranked 3rd in the Smart India Hackathon internal round in Sep 2026." },
  { id: "rag-overview", src: ["ayunidan", "algorithmic-rag", "coderag", "gridsense", "meeting-intelligence"],
    kw: "rag retrieval retrieval-augmented vector vectors embedding embeddings grounding grounded semantic",
    text: "RAG runs through most of his work. AyuNidan uses Pinecone with citation validation, the Algorithmic RAG Engine does exact NumPy retrieval with no framework, CodeRAG Vector grounds audits in a ChromaDB rule base, GridSense uses pgvector, and Meeting Intelligence answers questions over ChromaDB." },
  { id: "agents", src: ["gridsense", "meeting-intelligence"],
    kw: "agent agents agentic langgraph tool tools calling tool-calling langchain chains chain multi-agent autonomous",
    text: "In GridSense he built a LangGraph tool-calling loop where Llama 3.1 8B chooses Zod-validated Prisma tools rather than generating SQL. In Meeting Intelligence he combined three LCEL map-reduce chains for summaries, actions and decisions." },
  { id: "hackathons", src: ["recognition", "coderag", "agni-ai"],
    kw: "hackathon hackathons competition competitions award awards achievement achievements won win rank ranked recognition prize results",
    text: "He placed in the top 30 of 4,200+ participants at Hack Devengers 1.0 (Aug 2026) with CodeRAG Vector, and ranked 3rd in the Smart India Hackathon internal round (Sep 2026) with AGNI.AI." },
  { id: "dsa", src: ["recognition"],
    kw: "dsa leetcode gfg geeksforgeeks algorithms data structures problems competitive coding solving",
    text: "He has solved 450+ data structures and algorithms problems on LeetCode and GeeksforGeeks over 100+ active days, with a focus on time and space complexity." },
  { id: "skills", src: ["toolkit"],
    kw: "skills skill stack tech technologies technology languages language tools know knows frameworks framework python javascript typescript c++ sql proficient",
    text: "Languages: Python, C++, JavaScript, TypeScript and SQL. Frontend: React, Next.js, Tailwind CSS and Streamlit. Backend: Node.js, Express, FastAPI and REST APIs. AI: LLMs, RAG, LangChain, LangGraph, AI agents, vector search and machine learning. Tools and core CS: Git, Docker, CI/CD, OOP, DBMS, operating systems and computer networks." },
  { id: "databases", src: ["toolkit"],
    kw: "database databases sql postgres postgresql mysql mongodb mongo redis prisma pgvector chromadb pinecone orm storage",
    text: "He works with PostgreSQL, MySQL, MongoDB and Redis, uses Prisma as an ORM, and uses pgvector, ChromaDB and Pinecone for vector search." },
  { id: "fullstack", src: ["menuluxe", "branqly", "placement-portal", "toolkit"],
    kw: "fullstack full-stack frontend backend web website websites react nextjs next.js next node nodejs express saas menuluxe branqly placement portal products",
    text: "On the full-stack side he builds with Next.js, React, Node.js, Express and FastAPI. Besides the AI projects he built MenuLuxe (a multi-tenant QR menu SaaS with row-level security), Branqly (a URL shortener with custom domains and Razorpay billing) and the IET Lucknow placement portal frontend." },
  { id: "taekwondo", src: ["recognition"],
    kw: "taekwondo sport sports hobby hobbies athletics athlete medal silver outside fun interests interest personal",
    text: "Outside code he is a national taekwondo silver medalist from the Open National Taekwondo Championship, with a green 1 belt after 3+ years of training. He mentors juniors at the college club." },
  { id: "profile", src: ["about", "availability"],
    kw: "abhishek yourself himself introduce introduction overview summary person",
    text: "Abhishek Gond is a final-year engineer at IET Lucknow who builds AI systems and full-stack products: RAG pipelines, tool-calling agents and real-time apps. He was a Software Engineer Fellow at Panscience Innovations and is open to 2027 SDE and AI engineering roles." },
];

export const SUGGESTED_QUESTIONS = [
  "Is he open to roles?",
  "Where has he used RAG?",
  "What did he build at Panscience?",
  "Tell me about GridSense",
  "Hackathon results?",
  "What is his tech stack?",
  "How do I contact him?",
];

const STOP = new Set(
  "a an the is are was were be been do does did has have had of in on at to for from with by and or not what which who whom how why when where can could would should will his him he her she it its this that these those me my i you your about tell give show any some much many there their them they us we our please into than then also just".split(" ")
);

export const tokenize = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9+.#\- ]/g, " ").split(/\s+/).map((t) => t.replace(/^[.\-]+|[.\-]+$/g, "")).filter(Boolean);

const INDEX = NOTES.map((n) => ({ note: n, kws: new Set(tokenize(n.kw)), txt: new Set(tokenize(n.text)) }));

export type Retrieval = { kind: "greet" } | { kind: "notes"; hits: { note: Note; score: number }[] };

/** Scores every note against the question; keywords count 3, body words 1, shared 5-letter stems 1.5. */
export function retrieve(question: string): Retrieval {
  const raw = tokenize(question);
  if (/^(hi+|hey|hello|namaste|yo)$/.test(raw.join(" "))) return { kind: "greet" };
  const q = question.trim().toLowerCase();
  if (/^(who is (he|abhishek)|tell me about (him|abhishek)|about (him|abhishek)|who are you)\??$/.test(q)) {
    return { kind: "notes", hits: [{ note: NOTES[NOTES.length - 1], score: 10 }] };
  }
  const terms = raw.filter((t) => !STOP.has(t));
  const hits = INDEX.map(({ note, kws, txt }) => {
    let score = 0;
    for (const t of terms) {
      if (kws.has(t)) score += 3;
      else if (txt.has(t)) score += 1;
      else if (t.length > 4 && Array.from(kws).some((w) => w.length > 4 && w.slice(0, 5) === t.slice(0, 5))) score += 1.5;
    }
    return { note, score };
  })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score);
  return { kind: "notes", hits };
}

export const NOT_FOUND_TEXT =
  "I couldn't find that in Abhishek's resume or project notes, so I won't guess. You can ask him directly at abhi47025@gmail.com.";
export const GREETING_TEXT =
  "Hi! Ask me anything about Abhishek's projects, experience, skills or availability. I'll point you to where each answer comes from.";

/** Deterministic answer straight from the notes: used when no API key is set or the model fails validation. */
export function answerFromNotes(question: string): { paragraphs: string[]; sources: string[] } {
  const r = retrieve(question);
  if (r.kind === "greet") return { paragraphs: [GREETING_TEXT], sources: [] };
  const top = r.hits[0];
  if (!top || top.score < 3) return { paragraphs: [NOT_FOUND_TEXT], sources: ["contact"] };
  const picked = [top];
  const second = r.hits[1];
  if (second && second.score >= 3 && second.score >= top.score * 0.8) picked.push(second);
  const sources: string[] = [];
  picked.forEach((h) => h.note.src.forEach((s) => { if (!sources.includes(s)) sources.push(s); }));
  return { paragraphs: picked.map((h) => h.note.text), sources: sources.slice(0, 5) };
}

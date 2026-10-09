export interface ProjectData {
  _id?: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techBadges: string[];
  liveLink: string;
  githubLink?: string; imageUrl?: string;
  featured: boolean;
  category: string;
  architecture: {
    auth: string;
    database: string;
    caching: string;
    apis: string;
    systemHighlights: string[];
  };
}

export interface ExperienceData {
  company: string;
  role: string;
  type: string;
  period: string;
  highlights: string[];
  tags: string[];
}

export const PERSONA = {
  name: "Abhishek Gond",
  role: "Full-Stack Software Engineer & High Agency Fellow",
  education: {
    degree: "B.Tech in Electronics and Communication Engineering",
    institution: "Institute of Engineering and Technology (IET) Lucknow",
    timeline: "2023 – 2027",
    cgpa: "7.85 / 10",
  },
  contact: {
    email: "abhi47025@gmail.com",
    phone: "+91-9335848661",
    location: "Lucknow, India",
    status: "Available for Software Engineering Roles",
  },
  avatar: "/abhishek.jpg",
  resumeUrl: "/Abhishek_Gond_Resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/abhishek-gond-054884256",
    github: "https://github.com/ItsAbhishekkashyap",
    portfolio: "https://abhishekgond.vercel.app/",
    leetcode: "https://leetcode.com/u/Its_Abhishek_Kashyap/",
  },
  leetcodeStats: {
    solved: "450+",
    rating: 1440,
    percentile: "Top 84.15%",
    streak: "10 Days Badge",
    badge: "100 Days Badge 2026",
    link: "https://leetcode.com/u/Its_Abhishek_Kashyap/",
  },
  athletics: {
    title: "National Taekwondo Silver Medalist",
    championship: "Open National Taekwondo Championship",
    belt: "Green 1 Belt (3+ years active training)",
    leadership: "Taekwondo Club Senior Member & Mentor | Co-organized 2013+ Alumni Meet",
  },
  leadership: [
    {
      organization: "Training & Placement Cell (TPC), IET Lucknow",
      role: "Core Member",
      period: "Sep 2025 – Aug 2026",
      desc: "Streamlined campus recruitment logistics, bridging communication between visiting HR teams and candidates while digitizing placement data.",
    },
  ],
};

export const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: "ayunidan",
    title: "AyuNidan",
    subtitle: "AI Narrative Engine & Telemetry Extraction",
    description:
      "Node.js backend utilizing temperature-locked zero-shot LLM extraction and Pinecone RAG to ingest raw clinical PDFs into strictly typed JSON for triage.",
    techBadges: ["Next.js", "Node.js", "MongoDB", "Pinecone", "LLM"],
    liveLink: "https://ayunidan.vercel.app/",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true, imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "AI & Full-Stack",
    architecture: {
      auth: "Stateless JWTs",
      database: "MongoDB with compound indexes",
      caching: "Vector embeddings via Pinecone",
      apis: "Zero-shot LLM extraction pipeline",
      systemHighlights: [
        "3-tier constrained risk engine",
        "Multi-tenant isolation via MongoDB compound indexes",
        "Temperature-locked zero-shot LLM extraction",
        "RAG ingestion of clinical PDFs into typed JSON"
      ],
    },
  },
  {
    id: "algorithmic-rag",
    title: "Algorithmic RAG Engine",
    subtitle: "Framework-Free Microservice",
    description:
      "Engineered a framework-free RAG microservice, achieving < 500ms cold starts with O(N) sliding-window chunking and pure NumPy Cosine Similarity.",
    techBadges: ["Python", "NumPy", "FastAPI", "Streamlit", "Docker"],
    liveLink: "https://github.com/ItsAbhishekkashyap",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true, imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "AI & Microservices",
    architecture: {
      auth: "None",
      database: "In-memory NumPy arrays",
      caching: "None",
      apis: "FastAPI microservice",
      systemHighlights: [
        "Framework-free RAG microservice",
        "< 500ms cold starts",
        "O(N) sliding-window chunking",
        "~120MB memory footprint without commercial vector DBs"
      ],
    },
  },
  {
    id: "gridsense",
    title: "GridSense",
    subtitle: "AI IoT Telemetry Gateway",
    description: "Architected an AI telemetry gateway achieving < 400ms Next.js hydration. Engineered a LangGraph Multi-Agent Copilot with pgvector RAG.",
    techBadges: ["Next.js", "LangGraph", "pgvector", "Node.js", "PostgreSQL"],
    liveLink: "https://github.com/ItsAbhishekkashyap",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true, imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "AI & IoT",
    architecture: {
      auth: "Standard Auth",
      database: "PostgreSQL & pgvector",
      caching: "In-memory Socket.IO streaming",
      apis: "LangGraph Multi-Agent Coordination",
      systemHighlights: [
        "< 400ms Next.js hydration",
        "LangGraph Multi-Agent Copilot with pgvector RAG",
        "Reduced database query volume by 99.5% via Socket.IO streaming"
      ],
    },
  },
  {
    id: "menuluxe",
    title: "MenuLuxe",
    subtitle: "Digital QR Menu SaaS",
    description: "Architected a multi-tenant SaaS platform with Row-Level Security (RLS); engineered GSAP-animated menus utilizing strict Supabase joins.",
    techBadges: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS"],
    liveLink: "https://menuluxe.vercel.app/",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true, imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "SaaS",
    architecture: {
      auth: "Supabase Auth & RLS",
      database: "Supabase PostgreSQL",
      caching: "Edge Caching",
      apis: "Supabase Data APIs",
      systemHighlights: [
        "Multi-tenant architecture with Row-Level Security",
        "GSAP-animated menus",
        "Strict Supabase relational joins"
      ],
    },
  },
  {
    id: "coderag",
    title: "CodeRAG Vector",
    subtitle: "Hack Devengers 1.0 (Top 30 / 4.2K+)",
    description: "Architected a RAG-powered static code analysis engine paired with a Next.js DevSecOps command center leveraging Gemini 1.5 Flash.",
    techBadges: ["FastAPI", "LangChain", "ChromaDB", "Next.js", "Gemini 1.5 Flash"],
    liveLink: "https://github.com/ItsAbhishekkashyap",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true, imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    category: "AI DevSecOps",
    architecture: {
      auth: "None",
      database: "ChromaDB",
      caching: "None",
      apis: "FastAPI Engine",
      systemHighlights: [
        "RAG-powered static code analysis",
        "Leveraged Gemini 1.5 Flash to audit repositories",
        "Real-time codebase health and OWASP vulnerability surfacing"
      ],
    },
  }
];

export const EXPERIENCES: ExperienceData[] = [
  {
    company: "Panscience Innovations (High Agency)",
    role: "Software Engineering Fellow",
    type: "Fellowship",
    period: "July 2026",
    highlights: [
      "Architected AyuNidan: Node.js backend utilizing temperature-locked zero-shot LLM extraction and Pinecone RAG to ingest raw clinical PDFs into strictly typed JSON for triage.",
      "Engineered a 3-tier constrained risk engine, enforcing multi-tenant isolation via MongoDB compound indexes and stateless JWTs to secure workflows."
    ],
    tags: ["Node.js", "MongoDB", "Pinecone RAG", "LLM", "JWT"],
  },
  {
    company: "Durga Foundation",
    role: "Full-Stack Development Intern",
    type: "Internship",
    period: "Feb 2026 – Apr 2026",
    highlights: [
      "Migrated the NGO portal to Next.js and engineered the full-stack 'Youth Corner' platform using Node.js, Express, and MySQL.",
      "Architected an 11-client multi-schema Prisma ORM setup; integrated Redis caching and Razorpay for efficient donation processing."
    ],
    tags: ["Next.js", "Node.js", "Express", "MySQL", "Prisma ORM", "Redis", "Razorpay"],
  },
];

export const SKILL_CATEGORIES = [
  {
    id: "languages",
    name: "Languages & UI",
    skills: [
      { name: "Python", level: "Expert", percentage: 95, icon: "Terminal" },
      { name: "JavaScript/TypeScript", level: "Expert", percentage: 95, icon: "Code2" },
      { name: "C++", level: "Advanced", percentage: 90, icon: "Cpu" },
      { name: "React.js / Next.js", level: "Expert", percentage: 95, icon: "Layers" },
      { name: "Express.js", level: "Expert", percentage: 90, icon: "Workflow" },
      { name: "Tailwind CSS", level: "Expert", percentage: 95, icon: "Palette" }
    ],
  },
  {
    id: "ai",
    name: "AI & LLM",
    skills: [
      { name: "RAG Pipelines", level: "Expert", percentage: 95, icon: "BrainCircuit" },
      { name: "Prompt / Context Engineering", level: "Expert", percentage: 95, icon: "Sparkles" },
      { name: "LangChain / LangGraph", level: "Expert", percentage: 90, icon: "Network" },
      { name: "Embeddings", level: "Expert", percentage: 95, icon: "Database" }
    ],
  },
  {
    id: "cloud",
    name: "Cloud & DevOps",
    skills: [
      { name: "REST APIs", level: "Expert", percentage: 95, icon: "Globe" },
      { name: "Git / CI/CD", level: "Expert", percentage: 90, icon: "GitBranch" },
      { name: "Docker Containers", level: "Advanced", percentage: 85, icon: "Box" },
      { name: "FastAPI", level: "Expert", percentage: 90, icon: "Zap" },
      { name: "Node.js", level: "Expert", percentage: 90, icon: "Server" }
    ],
  },
  {
    id: "aiops",
    name: "AI Ops & Data",
    skills: [
      { name: "Vector DB (pgvector, ChromaDB)", level: "Expert", percentage: 95, icon: "Database" },
      { name: "Multi-Agent Coordination", level: "Advanced", percentage: 85, icon: "Users" },
      { name: "PostgreSQL / MySQL / MongoDB", level: "Expert", percentage: 95, icon: "Table" },
      { name: "Prisma ORM", level: "Expert", percentage: 90, icon: "FileCode" }
    ],
  },
  {
    id: "core-cs",
    name: "Core Subjects",
    skills: [
      { name: "Data Structures & Algorithms", level: "Expert (400+)", percentage: 95, icon: "Binary" },
      { name: "Operating Systems", level: "Advanced", percentage: 88, icon: "HardDrive" },
      { name: "Computer Networks", level: "Advanced", percentage: 88, icon: "Wifi" },
      { name: "DBMS", level: "Expert", percentage: 92, icon: "FolderTree" }
    ],
  },
];


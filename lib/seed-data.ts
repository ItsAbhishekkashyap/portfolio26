export interface ProjectData {
  _id?: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techBadges: string[];
  liveLink: string;
  githubLink?: string;
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
    solved: "400+",
    rating: 1404,
    percentile: "Top 84.15%",
    streak: "60 Days",
    badge: "50 Days Badge 2026",
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
      desc: "Digitized placement data, engineered internal portals, and bridged recruiter communications.",
    },
  ],
};

export const INITIAL_PROJECTS: ProjectData[] = [
  {
    id: "ayunidan",
    title: "AyuNidan",
    subtitle: "AI Narrative Engine & Telemetry Extraction",
    description:
      "AI platform converting clinical narratives to structured JSON telemetry via zero-shot extraction & Zod validation. Engineered RAG-based clinical index pipeline & 3-tier deterministic risk-scoring engine.",
    techBadges: ["Next.js", "TypeScript", "AI", "Zod", "RAG", "Tailwind CSS"],
    liveLink: "https://ayunidan.vercel.app/",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true,
    category: "AI & Full-Stack",
    architecture: {
      auth: "JWT-based multi-tenant authorization with strict data isolation",
      database: "Vector Database + MongoDB for telemetry JSON persistence",
      caching: "Redis LRU cache for indexed clinical embeddings",
      apis: "Zero-shot LLM inference pipeline with deterministic Zod schema validation",
      systemHighlights: [
        "Zero-shot clinical narrative extraction into strict JSON telemetry",
        "RAG-based clinical indexing engine for fast semantic retrieval",
        "3-tier deterministic patient risk-scoring algorithm",
        "Multi-tenant tenant isolation for hospital and clinic workflows",
      ],
    },
  },
  {
    id: "menuluxe",
    title: "MenuLuxe Digital QR Menu SaaS",
    subtitle: "Multi-Tenant Restaurant Suite",
    description:
      "Architected a multi-tenant SaaS platform featuring Row-Level Security (RLS) and optimized dynamic data fetching using Next.js Server Actions, reducing latency by 40%.",
    techBadges: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Server Actions"],
    liveLink: "https://menuluxe.vercel.app/",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true,
    category: "SaaS & Mobile Web",
    architecture: {
      auth: "Supabase Auth with Row-Level Security (RLS) policy enforcement",
      database: "PostgreSQL multi-tenant schema with JSON menu structures",
      caching: "Next.js Stale-While-Revalidate & Server Component caching",
      apis: "Next.js Server Actions for instant optimistic menu ordering",
      systemHighlights: [
        "Dynamic QR menu generation per table/restaurant",
        "Instant realtime order notification via WebSockets/Supabase Realtime",
        "Sub-second menu load times optimized for mobile browsers",
      ],
    },
  },
  {
    id: "branqly",
    title: "Branqly URL Shortener SaaS",
    subtitle: "Enterprise SaaS & Analytics Engine",
    description:
      "Full-stack URL Shortener SaaS with custom domain mapping, DNS CNAME verification, and automated subscription billing via Razorpay integration.",
    techBadges: ["Next.js", "TypeScript", "MongoDB", "Razorpay", "Node.js"],
    liveLink: "https://branqly.xyz/",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true,
    category: "SaaS & Web3/SaaS",
    architecture: {
      auth: "HTTP-Only Secured JWT & NextAuth OAuth integration",
      database: "MongoDB with indexed link hashing & custom domain mappings",
      caching: "Edge-cached redirect lookups with sub-10ms response latency",
      apis: "Razorpay Webhook listener & automated DNS CNAME resolution checker",
      systemHighlights: [
        "Custom domain support with real-time CNAME DNS record verification",
        "Razorpay subscription lifecycle & tier limits enforcement",
        "Real-time click telemetry, country distribution, and referrer analytics",
      ],
    },
  },
  {
    id: "placement-portal",
    title: "Official Placement Cell Portal",
    subtitle: "IET Lucknow Campus Platform",
    description:
      "Official placement portal for IET Lucknow, establishing the core frontend architecture currently powering campus drive workflows in production.",
    techBadges: ["HTML5", "Tailwind CSS", "JavaScript", "Node.js"],
    liveLink: "https://placementietlucknow.vercel.app/",
    githubLink: "https://github.com/ItsAbhishekkashyap",
    featured: true,
    category: "Full-Stack Web",
    architecture: {
      auth: "Role-based access control (Student, TPC Core Member, Recruiter)",
      database: "MongoDB for digitized student profiles & drive applications",
      caching: "Static generation with incremental revalidation for drive announcements",
      apis: "REST APIs for resume processing, company portal routing, & analytics",
      systemHighlights: [
        "Digitized placement metrics & automated application verification",
        "Role-based dashboard for recruiters & core placement officers",
        "Handled thousands of concurrent student applications seamlessly",
      ],
    },
  },
];

export const EXPERIENCES: ExperienceData[] = [
  {
    company: "Panscience Innovations (High Agency)",
    role: "Software Engineering Fellow",
    type: "Fellowship",
    period: "July 2026",
    highlights: [
      "Co-developed AyuNidan, an AI platform converting clinical narratives to structured JSON telemetry via zero-shot extraction & Zod validation.",
      "Engineered RAG-based clinical index pipeline & 3-tier deterministic risk-scoring engine, accelerating real-time triage decisions.",
      "Implemented JWT authentication and strict data isolation for multi-tenant workflows to safeguard healthcare data.",
    ],
    tags: ["Next.js", "TypeScript", "AI", "RAG", "Zod", "Multi-Tenant JWT"],
  },
  {
    company: "Durga Foundation",
    role: "Full-Stack Development Intern",
    type: "Internship",
    period: "Feb 2026 – Apr 2026",
    highlights: [
      "Migrated NGO portal to Next.js; engineered full-stack 'Youth Corner' platform using Node.js, Express, and MySQL.",
      "Architected 11-client multi-schema Prisma ORM setup; integrated Redis caching and Razorpay for efficient donation processing.",
      "Developed CBT exam system with automated proctoring & JWT-secured, OTP-based student enrollment flow.",
    ],
    tags: ["Next.js", "Node.js", "Express", "MySQL", "Prisma ORM", "Redis", "Razorpay"],
  },
];

export const SKILL_CATEGORIES = [
  {
    id: "languages",
    name: "Languages",
    skills: [
      { name: "TypeScript", level: "Expert", percentage: 95, icon: "Code2" },
      { name: "JavaScript (ES6+)", level: "Expert", percentage: 95, icon: "FileCode" },
      { name: "C++", level: "Advanced", percentage: 90, icon: "Cpu" },
      { name: "Python", level: "Advanced", percentage: 85, icon: "Terminal" },
      { name: "HTML5 & CSS3", level: "Expert", percentage: 98, icon: "Layout" },
    ],
  },
  {
    id: "frameworks",
    name: "Frameworks & Libraries",
    skills: [
      { name: "Next.js (App Router)", level: "Expert", percentage: 95, icon: "Layers" },
      { name: "React.js", level: "Expert", percentage: 95, icon: "Atom" },
      { name: "Node.js", level: "Expert", percentage: 92, icon: "Server" },
      { name: "Express.js", level: "Expert", percentage: 90, icon: "Workflow" },
      { name: "Tailwind CSS", level: "Expert", percentage: 98, icon: "Palette" },
      { name: "Framer Motion", level: "Advanced", percentage: 88, icon: "Sparkles" },
    ],
  },
  {
    id: "databases",
    name: "Databases & Caching",
    skills: [
      { name: "MongoDB", level: "Expert", percentage: 92, icon: "Database" },
      { name: "MySQL", level: "Advanced", percentage: 88, icon: "Table" },
      { name: "Supabase", level: "Advanced", percentage: 85, icon: "Cloud" },
      { name: "Prisma ORM", level: "Expert", percentage: 90, icon: "Box" },
      { name: "Redis", level: "Advanced", percentage: 85, icon: "Zap" },
    ],
  },
  {
    id: "tools",
    name: "Tools & DevOps",
    skills: [
      { name: "Git & GitHub", level: "Expert", percentage: 95, icon: "GitBranch" },
      { name: "REST APIs & Webhooks", level: "Expert", percentage: 95, icon: "Globe" },
      { name: "JWT & Google OAuth", level: "Expert", percentage: 92, icon: "Lock" },
      { name: "Razorpay Gateway", level: "Advanced", percentage: 88, icon: "CreditCard" },
      { name: "Zod Schema Validation", level: "Expert", percentage: 95, icon: "CheckCircle2" },
      { name: "Vercel & Postman", level: "Expert", percentage: 95, icon: "Send" },
    ],
  },
  {
    id: "testing",
    name: "Testing & Quality",
    skills: [
      { name: "Unit Testing", level: "Advanced", percentage: 85, icon: "ShieldCheck" },
      { name: "Integration Testing", level: "Advanced", percentage: 85, icon: "Network" },
      { name: "E2E Testing", level: "Intermediate", percentage: 80, icon: "CheckSquare" },
    ],
  },
  {
    id: "core-cs",
    name: "Core Computer Science",
    skills: [
      { name: "Data Structures & Algorithms", level: "Expert (400+)", percentage: 95, icon: "Binary" },
      { name: "Operating Systems", level: "Advanced", percentage: 88, icon: "HardDrive" },
      { name: "Computer Networks", level: "Advanced", percentage: 88, icon: "Wifi" },
      { name: "DBMS & SQL", level: "Expert", percentage: 92, icon: "FolderTree" },
      { name: "AI & Machine Learning", level: "Intermediate", percentage: 82, icon: "Bot" },
    ],
  },
];

import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://abhishekgond.vercel.app";
const DESCRIPTION =
  "Abhishek Gond builds AI that answers with evidence and full-stack products that stay fast in production: RAG systems, tool-calling agents and real-time apps. Final-year B.Tech ECE at IET Lucknow, open to 2027 SDE and AI engineering roles.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "Abhishek Gond | Software Engineer, AI & GenAI Engineer",
  description: DESCRIPTION,
  keywords: [
    "Abhishek Gond", "Abhishek Gond portfolio", "AI engineer", "GenAI engineer", "Full-stack developer",
    "RAG", "LangGraph", "Next.js", "IET Lucknow", "Software engineer 2027",
  ],
  authors: [{ name: "Abhishek Gond", url: SITE }],
  creator: "Abhishek Gond",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  // Google Search Console "HTML tag" verification: paste only the content="..." value into GOOGLE_SITE_VERIFICATION.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
  openGraph: {
    title: "Abhishek Gond | AI & GenAI Engineer, Full-Stack Developer",
    description: "RAG systems, tool-calling agents and real-time apps. Open to 2027 SDE and AI engineering roles.",
    url: SITE,
    siteName: "Abhishek Gond",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Gond | AI & GenAI Engineer, Full-Stack Developer",
    description: "RAG systems, tool-calling agents and real-time apps. Open to 2027 SDE and AI engineering roles.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1b1c20",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abhishek Gond",
    url: SITE,
    image: `${SITE}/abhishek.jpg`,
    jobTitle: "Software Engineer, AI & GenAI Engineer",
    email: "mailto:abhi47025@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Lucknow", addressCountry: "IN" },
    alumniOf: { "@type": "EducationalOrganization", name: "Institute of Engineering and Technology Lucknow" },
    knowsAbout: ["Retrieval-augmented generation", "LangGraph", "Next.js", "Node.js", "FastAPI", "PostgreSQL"],
    sameAs: [
      "https://www.linkedin.com/in/abhishek-gond-054884256",
      "https://github.com/ItsAbhishekkashyap",
      "https://leetcode.com/u/Its_Abhishek_Kashyap/",
    ],
  };

  return (
    // "dark" keeps the admin's dark: variants working; the public page sets its own palette.
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Host+Grotesk:ital,wght@0,300..800;1,300..800&family=JetBrains+Mono:wght@400;500&display=swap" />
        <link rel="preload" as="image" href="/abhishek.jpg" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

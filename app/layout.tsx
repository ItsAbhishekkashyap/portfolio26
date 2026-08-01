import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://abhishekgond.vercel.app"),
  title: "Abhishek Gond | Aspiring Software Engineer",
  description:
    "Personal Portfolio of Abhishek Gond — Aspiring Software Engineer | B.Tech ECE candidate at IET Lucknow (7.85 CGPA). Solved 400+ DSA problems.",
  keywords: [
    "Abhishek Gond",
    "Abhishek Gond Portfolio",
    "Full Stack Software Engineer",
    "Panscience Innovations",
    "IET Lucknow",
    "Next.js App Router",
    "TypeScript",
    "AyuNidan",
    "High Agency Fellow",
  ],
  authors: [{ name: "Abhishek Gond", url: "https://abhishekgond.vercel.app/" }],
  creator: "Abhishek Gond",
  openGraph: {
    title: "Abhishek Gond | Full-Stack Software Engineer",
    description: "High Agency Fellow & Software Engineering Candidate at IET Lucknow.",
    url: "https://abhishekgond.vercel.app/",
    siteName: "Abhishek Gond Portfolio",
    images: [
      {
        url: "/abhishek.jpg",
        width: 800,
        height: 800,
        alt: "Abhishek Gond Profile Photo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abhishek Gond | Full-Stack Software Engineer",
    description: "High Agency Fellow & Software Engineering Candidate at IET Lucknow.",
    images: ["/abhishek.jpg"],
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Abhishek Gond",
    url: "https://abhishekgond.vercel.app/",
    image: "https://abhishekgond.vercel.app/abhishek.jpg",
    jobTitle: "Full-Stack Software Engineer & High Agency Fellow",
    worksFor: {
      "@type": "Organization",
      name: "Panscience Innovations",
    },
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Institute of Engineering and Technology Lucknow",
    },
    sameAs: [
      "https://www.linkedin.com/in/abhishek-gond-054884256",
      "https://github.com/ItsAbhishekkashyap",
      "https://leetcode.com/u/Its_Abhishek_Kashyap/",
    ],
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-[#fbf9f5] dark:bg-[#0c0a09] text-stone-900 dark:text-stone-100 antialiased min-h-screen transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

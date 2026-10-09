import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a", // Charcoal/near-black base
        foreground: "#f5f5f5", // Off-white
        accent: {
          DEFAULT: "#F59B0B", // Electric accent
          glow: "rgba(245, 155, 11, 0.3)",
        },
        surface: {
          light: "#1a1a1a",
          DEFAULT: "#121212",
          dark: "#080808",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 20px -5px rgba(245, 155, 11, 0.3)",
        "glow-lg": "0 0 35px -5px rgba(245, 155, 11, 0.4)",
      },
    },
  },
  plugins: [],
};
export default config;

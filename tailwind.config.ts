import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        xl: "2.5rem",
        "2xl": "4rem",
      },
    },
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        primaryDark: "rgb(var(--primary-dark) / <alpha-value>)",
        "primary-dark": "rgb(var(--primary-dark) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        accentSoft: "rgb(var(--accent-soft) / <alpha-value>)",
        "accent-soft": "rgb(var(--accent-soft) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(15, 23, 42, 0.35)",
        card: "0 16px 30px -16px rgba(15, 23, 42, 0.28)",
        glow: "0 0 45px rgba(99, 102, 241, 0.35)",
      },
      borderRadius: {
        xl: "1.5rem",
        "3xl": "2rem",
      },
      spacing: {
        15: "3.75rem",
        18: "4.5rem",
        22: "5.5rem",
      },
      backgroundImage: {
        "subtle-radial": "radial-gradient(circle at top left, rgba(99,102,241,0.18), transparent 55%), radial-gradient(circle at bottom right, rgba(14,165,233,0.25), transparent 60%)",
        "card-gradient": "linear-gradient(145deg, rgba(255,255,255,0.95), rgba(248,250,255,0.9))",
        "card-gradient-dark": "linear-gradient(145deg, rgba(30,41,59,0.95), rgba(15,23,42,0.92))",
      },
      animation: {
        fadeIn: "fade-in 0.7s ease-out forwards",
        slideUp: "slide-up 0.7s ease-out forwards",
        pulseGlow: "pulse-glow 2.4s ease-in-out infinite",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(99, 102, 241, 0.45)" },
          "50%": { boxShadow: "0 0 0 15px rgba(99, 102, 241, 0)" },
        },
      },
    },
  },
  plugins: [forms],
};

export default config;

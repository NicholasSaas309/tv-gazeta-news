import type { Config } from "tailwindcss";

/**
 * O tema é dirigido por CSS variables injetadas em runtime a partir de
 * `site_settings` (ver lib/theme). As fontes vêm do next/font (ver app/layout).
 */
const config: Config = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "var(--brand-primary)",
          primary: "var(--brand-primary)",
          secondary: "var(--brand-secondary)",
          accent: "var(--brand-accent)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          muted: "var(--surface-muted)",
        },
        content: {
          DEFAULT: "var(--content)",
          muted: "var(--content-muted)",
          inverted: "var(--content-inverted)",
        },
        line: "var(--line)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-sans)", "sans-serif"],
      },
      maxWidth: {
        site: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "live-pulse": {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.45", transform: "scale(0.82)" },
        },
        "ring-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(225,29,42,0.55)" },
          "70%": { boxShadow: "0 0 0 10px rgba(225,29,42,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(225,29,42,0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease both",
        "fade-in": "fade-in 0.8s ease both",
        marquee: "marquee 32s linear infinite",
        "live-pulse": "live-pulse 1.4s ease-in-out infinite",
        "ring-pulse": "ring-pulse 1.8s ease-out infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;

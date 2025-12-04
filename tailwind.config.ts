import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        float: "float 6s ease-in-out infinite",
        scroll: "scroll 30s linear infinite",
        "scroll-slow": "scroll 60s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      
      // === 1. GLOBAL SHARED COLORS ===
      colors: {
        border: "var(--border-color)",
        input: "var(--input-bg-color)",
        card: "var(--card-bg-color)",
        muted: "var(--text-muted-color)", // Shared muted text color
        accent: {
          start: "var(--accent-start)",
          end: "var(--accent-end)",
        },
      },

      // === 2. BACKGROUND SPECIFIC MAPPING ===
      // When you use bg-primary, it uses the background variable
      backgroundColor: {
        primary: "var(--primary-color)", 
        secondary: "var(--secondary-color)",
      },

      // === 3. TEXT SPECIFIC MAPPING (THE FIX) ===
      // When you use text-primary, it uses the TEXT variable
      textColor: {
        primary: "var(--text-color)", 
        secondary: "var(--text-color)",
      },
    },
  },
  plugins: [],
};

export default config;
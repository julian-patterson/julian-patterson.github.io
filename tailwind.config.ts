import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#f7f5f0",
        "bg-surface": "#edeae3",
        "bg-accent-soft": "#ebf2f7",
        "text-primary": "#1c1c1a",
        "text-secondary": "#5a5855",
        "text-tertiary": "#9a9793",
        "accent-navy": "#1b3a5c",
        "accent-brass": "#c17d3c",
      },
      fontFamily: {
        display: ["DM Serif Display", "serif"],
        body: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;

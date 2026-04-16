import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface Hierarchy
        "surface-lowest": "var(--surface-lowest)",
        "surface-low": "var(--surface-low)",
        surface: "var(--surface)",
        "surface-high": "var(--surface-high)",
        "surface-highest": "var(--surface-highest)",
        "surface-variant": "var(--surface-variant)",
        "outline-variant": "var(--outline-variant)",

        // Primary - Cyan
        primary: "var(--primary)",
        "primary-container": "var(--primary-container)",
        "primary-dim": "var(--primary-dim)",
        "primary-fixed": "var(--primary-fixed)",
        "primary-fixed-dim": "var(--primary-fixed-dim)",

        // Secondary - Blue
        "secondary-container": "var(--secondary-container)",
        "secondary-container-dim": "var(--secondary-container-dim)",
        "on-secondary-container": "var(--on-secondary-container)",

        // Text
        "on-surface": "var(--on-surface)",
        "on-surface-dim": "var(--on-surface-dim)",
        "on-surface-muted": "var(--on-surface-muted)",
        "on-primary": "var(--on-primary)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
        sans: "var(--font-body)",
      },
      fontSize: {
        // Display
        "display-lg": "3.5rem",
        "display-md": "2.875rem",
        "display-sm": "2.25rem",

        // Headline
        "headline-lg": "2rem",
        "headline-md": "1.875rem",
        "headline-sm": "1.5rem",

        // Body
        "body-lg": "1.125rem",
        "body-md": "1rem",
        "body-sm": "0.875rem",

        // Label
        "label-lg": "0.875rem",
        "label-md": "0.75rem",
        "label-sm": "0.6875rem",
      },
      lineHeight: {
        display: "1.2",
        headline: "1.3",
        body: "1.5",
        tight: "1.2",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        full: "var(--radius-full)",
      },
      boxShadow: {
        "glow-cyan": "var(--shadow-glow-cyan)",
        "glow-cyan-lg": "var(--shadow-glow-cyan-lg)",
      },
      backdropFilter: {
        glass: "var(--blur-glass)",
      },
      spacing: {
        xs: "0.5rem",
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "3rem",
        "2xl": "4rem",
        "3xl": "6rem",
      },
      opacity: {
        8: "0.08",
        12: "0.12",
        15: "0.15",
        20: "0.2",
        40: "0.4",
        60: "0.6",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, var(--primary) 0%, var(--primary-container) 100%)",
        "gradient-primary-dark": "linear-gradient(135deg, var(--primary-fixed) 0%, var(--primary-container) 100%)",
      },
      transitionTimingFunction: {
        orbital: "cubic-bezier(0.4, 0.0, 0.2, 1)",
      },
      transitionDuration: {
        fast: "150ms",
      },
    },
  },
  plugins: [],
};

export default config;

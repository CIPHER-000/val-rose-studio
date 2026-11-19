import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7E9E5",
        shell: "#FBF2EF",
        panel: "#F0D8D4",
        deep: "#E7C6C1",
        white: "#FDF8F6",
        ink: "#241614",
        muted: "#7D6660",
        line: "#E5CCC7",
        accent: "#AE5A66",
        blush: "#EFDCD9",
        rose: "#C87F89",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.22em",
      },
      maxWidth: {
        editorial: "1440px",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;

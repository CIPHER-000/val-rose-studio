import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F8EEEB",
        white: "#FDF7F5",
        ink: "#231614",
        muted: "#7E6763",
        line: "#E9D5D1",
        accent: "#A6646D",
        blush: "#EFDCD9",
        rose: "#C98B93",
        shell: "#FCF4F2",
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
    },
  },
  plugins: [],
};

export default config;

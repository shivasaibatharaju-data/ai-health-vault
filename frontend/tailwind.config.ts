import type {Config} from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: "#f7faf9",
          100: "#edf4f2",
          200: "#d8e7e3",
          300: "#b5d0c9",
          400: "#86afa5",
          500: "#668f85",
          600: "#50736a",
          700: "#405c55",
          800: "#354b46",
          900: "#2e403c",
          950: "#172421",
        },
        brand: {
          50: "#effcf8",
          100: "#d8f7ee",
          200: "#b4eddd",
          300: "#7edfc7",
          400: "#46c8ac",
          500: "#24ad91",
          600: "#198b76",
          700: "#186f60",
          800: "#18594e",
          900: "#174a42",
          950: "#082c27",
        },
        navy: {
          50: "#f2f7fa",
          100: "#e6eef3",
          200: "#c8dce5",
          300: "#9bc0d0",
          400: "#679fb4",
          500: "#478198",
          600: "#3b697e",
          700: "#345668",
          800: "#304957",
          900: "#2b3f4b",
          950: "#172833",
        },
      },
      boxShadow: {
        soft: "0 20px 60px -28px rgba(17, 70, 60, 0.28)",
        card: "0 12px 34px -22px rgba(17, 70, 60, 0.3)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(36,173,145,.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(36,173,145,.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;

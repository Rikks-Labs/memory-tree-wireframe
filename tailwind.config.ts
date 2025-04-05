import { type Config } from "tailwindcss";

const conf = {
  darkMode: "class",
  content: ["./**/*.tsx"],
  theme: {
    extend: {
      colors: {
        gray: {
          100: "#f1f1f2",
          200: "#d5d6d8",
          300: "#bdbec1",
          400: "#a4a5a8",
          500: "#7c7d81",
          600: "#545559",
          700: "#3b3c40",
          800: "#232428",
          900: "#111214",
          950: "#0f1012",
        },
      },
    },
  },
} satisfies Config;

export default conf;

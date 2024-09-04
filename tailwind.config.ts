import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        highland: {
          "50": "#f4f7f2",
          "100": "#e5ebe0",
          "200": "#cad8c2",
          "300": "#a4bc99",
          "400": "#749567",
          "500": "#587c4d",
          "600": "#436239",
          "700": "#344e2e",
          "800": "#2b3f26",
          "900": "#233420",
          "950": "#131d11",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};

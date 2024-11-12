import palette from "./src/utils/themes/palette";
import formTheme from "./src/utils/themes/form";

/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./components/**/*.{vue,js,ts}",
    "./src/views/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/sh3-components/dist/**/*.js",
    "./vueform.config.js",
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.vue",
    "./node_modules/@vueform/vueform/themes/tailwind/**/*.js",
  ],
  theme: {
    fontFamily: {
      sans: ["Lato", "sans-serif"],
    },
    extend: {
      gridTemplateColumns: {
        // Simple 16 column grid
        20: "repeat(20, minmax(0, 1fr))",
        22: "repeat(22, minmax(0, 1fr))",
        24: "repeat(24, minmax(0, 1fr))",
      },
      gridColumn: {
        "span-20": "span 20 / span 20",
        "span-22": "span 22 / span 22",
        "span-24": "span 24 / span 24",
      },
      colors: {
        ...palette,
      },
      form: (theme) => formTheme(theme),
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("@vueform/vueform/tailwind")],
};

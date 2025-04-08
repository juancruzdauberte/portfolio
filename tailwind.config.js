/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customWhite: "#f1f0fd",
        customDark: "#030712",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

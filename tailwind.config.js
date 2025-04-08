/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#e5e5e5",
        customDark: "#1C1C1C",
        customMenu: "#D1E6E8",
      },
    },
  },
  plugins: ["lineClamp"],
  darkMode: "class",
};

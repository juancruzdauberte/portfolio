/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customWhite: "#f1f0fd",
        customDark: "#030712",
        tailwind: "#00ACC1",
        typescript: "#0D61A9",
        react: "#53C1DE",
        supabase: "#71C674",
      },
      keyframes: {
        shine: {
          "0%": { backgroundPosition: "-200% center" },
          "60%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        shine: "shine 3s linear infinite",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};

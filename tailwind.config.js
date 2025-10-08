/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // Usar clase para control explícito + soporte prefers-color-scheme
  theme: {
    extend: {
      // Sistema de colores totalmente basado en variables CSS
      colors: {
        // Colores legacy (mantener para compatibilidad si es necesario)
        customWhite: "#f1f0fd",
        customDark: "#030712",
        tailwind: "#00ACC1",
        typescript: "#0D61A9",
        react: "#53C1DE",
        supabase: "#71C674",
        
        // Sistema de colores con variables CSS - OPTIMIZADO
        theme: {
          bg: {
            primary: "rgb(var(--bg-primary) / <alpha-value>)",
            secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
            tertiary: "rgb(var(--bg-tertiary) / <alpha-value>)",
            overlay: "rgb(var(--bg-overlay) / <alpha-value>)",
          },
          text: {
            primary: "rgb(var(--text-primary) / <alpha-value>)",
            secondary: "rgb(var(--text-secondary) / <alpha-value>)",
            tertiary: "rgb(var(--text-tertiary) / <alpha-value>)",
            muted: "rgb(var(--text-muted) / <alpha-value>)",
          },
          border: {
            primary: "rgb(var(--border-primary) / <alpha-value>)",
            secondary: "rgb(var(--border-secondary) / <alpha-value>)",
            focus: "rgb(var(--border-focus) / <alpha-value>)",
          },
          accent: {
            blue: "rgb(var(--accent-blue) / <alpha-value>)",
            'blue-light': "rgb(var(--accent-blue-light) / <alpha-value>)",
            'blue-dark': "rgb(var(--accent-blue-dark) / <alpha-value>)",
            purple: "rgb(var(--accent-purple) / <alpha-value>)",
            'purple-light': "rgb(var(--accent-purple-light) / <alpha-value>)",
            'purple-dark': "rgb(var(--accent-purple-dark) / <alpha-value>)",
            pink: "rgb(var(--accent-pink) / <alpha-value>)",
            'pink-light': "rgb(var(--accent-pink-light) / <alpha-value>)",
            cyan: "rgb(var(--accent-cyan) / <alpha-value>)",
            green: "rgb(var(--accent-green) / <alpha-value>)",
          },
          status: {
            success: "rgb(var(--status-success) / <alpha-value>)",
            warning: "rgb(var(--status-warning) / <alpha-value>)",
            error: "rgb(var(--status-error) / <alpha-value>)",
            info: "rgb(var(--status-info) / <alpha-value>)",
          },
        },
      },
      
      // Spacing optimizado
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      
      // Animaciones mejoradas
      keyframes: {
        shine: {
          "0%, 60%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px) translateZ(0)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) translateZ(0)",
          },
        },
        fadeInDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-30px) translateZ(0)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) translateZ(0)",
          },
        },
        scaleIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9) translateZ(0)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateZ(0)",
          },
        },
        shimmer: {
          "0%": {
            backgroundPosition: "-1000px 0",
          },
          "100%": {
            backgroundPosition: "1000px 0",
          },
        },
        gradientShift: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
      },
      animation: {
        shine: "shine 3s linear infinite",
        fadeInUp: "fadeInUp 0.6s ease-out forwards",
        fadeInDown: "fadeInDown 0.6s ease-out forwards",
        scaleIn: "scaleIn 0.5s ease-out forwards",
        shimmer: "shimmer 2s infinite",
        gradientShift: "gradientShift 5s ease infinite",
      },
      
      // Sombras adaptables al tema usando variables CSS
      boxShadow: {
        "theme-sm": "0 1px 2px 0 rgb(var(--shadow-color) / var(--shadow-opacity))",
        "theme": "0 1px 3px 0 rgb(var(--shadow-color) / var(--shadow-opacity)), 0 1px 2px -1px rgb(var(--shadow-color) / var(--shadow-opacity))",
        "theme-md": "0 4px 6px -1px rgb(var(--shadow-color) / var(--shadow-opacity-md)), 0 2px 4px -2px rgb(var(--shadow-color) / var(--shadow-opacity))",
        "theme-lg": "0 10px 15px -3px rgb(var(--shadow-color) / var(--shadow-opacity-lg)), 0 4px 6px -4px rgb(var(--shadow-color) / var(--shadow-opacity-md))",
        "theme-xl": "0 20px 25px -5px rgb(var(--shadow-color) / var(--shadow-opacity-lg)), 0 8px 10px -6px rgb(var(--shadow-color) / var(--shadow-opacity-lg))",
        "theme-2xl": "0 25px 50px -12px rgb(var(--shadow-color) / var(--shadow-opacity-lg))",
        "neon": "0 0 10px rgb(var(--accent-blue) / 0.5), 0 0 20px rgb(var(--accent-blue) / 0.3), 0 0 30px rgb(var(--accent-blue) / 0.2)",
        "neon-hover": "0 0 15px rgb(var(--accent-blue) / 0.7), 0 0 30px rgb(var(--accent-blue) / 0.5), 0 0 45px rgb(var(--accent-blue) / 0.3)",
      },
      
      // Blur values
      backdropBlur: {
        xs: "2px",
      },
      
      // Transiciones optimizadas
      transitionDuration: {
        fast: "var(--animation-duration-fast)",
        normal: "var(--animation-duration-normal)",
        slow: "var(--animation-duration-slow)",
      },
      
      transitionTimingFunction: {
        smooth: "var(--animation-timing)",
      },
      
      // Gradientes usando variables
      backgroundImage: {
        "gradient-primary": "var(--gradient-primary)",
        "gradient-secondary": "var(--gradient-secondary)",
        "gradient-hover": "var(--gradient-hover)",
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
      // Typography scale mejorado
      fontSize: {
        "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
      },
      
      // Z-index scale
      zIndex: {
        60: "60",
        70: "70",
        80: "80",
        90: "90",
        100: "100",
      },
      
      // Border radius mejorado
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

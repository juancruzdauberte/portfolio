import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { type ContextType } from "../types/type";

export const ThemeContext = createContext<ContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Inicializar con preferencia del sistema o localStorage
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Primero verificar localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme !== null) {
      return savedTheme === "dark";
    }
    // Si no hay preferencia guardada, usar preferencia del sistema
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const toggleDarkMode = (): void => {
    setDarkMode((prev) => {
      const newMode = !prev;
      // Guardar preferencia en localStorage
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
    }
  }, [darkMode]);

  // Escuchar cambios en la preferencia del sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Solo aplicar si no hay preferencia guardada por el usuario
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === null) {
        setDarkMode(e.matches);
      }
    };

    // Soporte para navegadores modernos y antiguos
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      // Fallback para navegadores antiguos
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  const value = { darkMode, toggleDarkMode };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) throw new Error("Error al utilizar el contexto");

  return themeContext;
};

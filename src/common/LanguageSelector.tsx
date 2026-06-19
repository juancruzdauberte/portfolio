import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ES, US } from "country-flag-icons/react/3x2";

interface Language {
  code: string;
  label: string;
  Flag: React.ComponentType<{ title: string; className?: string }>;
  title: string;
}

const LANGUAGES: Language[] = [
  { code: "es", label: "ES", Flag: ES, title: "Español" },
  { code: "en", label: "EN", Flag: US, title: "English" },
];

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div
      role="group"
      aria-label="Select language"
      className="flex items-center gap-0.5 rounded-full border border-theme-border-primary/40 bg-theme-bg-secondary/60 backdrop-blur-sm p-0.5"
    >
      {LANGUAGES.map(({ code, label, Flag, title }) => {
        const isActive = language === code;

        return (
          <button
            key={code}
            type="button"
            onClick={() => changeLanguage(code)}
            aria-pressed={isActive}
            aria-label={title}
            className={`
              relative flex items-center gap-1.5 px-3 py-2 rounded-full
              text-xs font-semibold transition-colors duration-200 cursor-pointer
              focus-visible:outline-none focus-visible:ring-2
              focus-visible:ring-theme-accent-blue focus-visible:ring-offset-1
              ${
                isActive
                  ? "text-white"
                  : "text-theme-text-secondary hover:text-theme-text-primary"
              }
            `}
          >
            {/* Sliding background pill */}
            {isActive && (
              <motion.span
                layoutId="lang-active-bg"
                className="absolute inset-0 rounded-full bg-theme-accent-blue shadow-sm"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}

            {/* Flag */}
            <Flag
              title={title}
              className="relative z-10 w-5 h-auto rounded-[2px] flex-shrink-0"
            />

            {/* Language code — hidden on mobile, visible on sm+ */}
            <span className="relative z-10 inline leading-none select-none">
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

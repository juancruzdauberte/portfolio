import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setIsOpen(false);
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const languages = [
    {
      code: "es",
      name: "Español",
      flag: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1746396192/es_y6p5ic.png",
    },
    {
      code: "en",
      name: "English",
      flag: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1746396192/en_fw4lay.png",
    },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Botón principal */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-theme-bg-tertiary/50 transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Cambiar idioma"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={language}
            src={currentLanguage?.flag}
            alt={currentLanguage?.name}
            className="h-6 w-6 sm:h-7 sm:w-7 object-contain rounded"
            initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
            transition={{ duration: 0.3 }}
          />
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full right-0 mt-2 bg-theme-bg-secondary border border-theme-border-primary rounded-lg shadow-theme-xl overflow-hidden z-50 min-w-[120px]"
          >
            {languages.map((lang, index) => (
              <motion.button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center gap-2 px-3 py-2.5 w-full text-sm transition-colors ${
                  language === lang.code
                    ? "bg-theme-accent-blue/10 text-theme-accent-blue"
                    : "text-theme-text-primary hover:bg-theme-bg-tertiary"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ x: 4 }}
              >
                <img
                  src={lang.flag}
                  alt={lang.name}
                  className="h-5 w-5 object-contain rounded"
                />
                <span className="font-medium">{lang.code.toUpperCase()}</span>
                {language === lang.code && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto text-theme-accent-blue"
                  >
                    ✓
                  </motion.span>
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

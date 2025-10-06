import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <AnimatePresence mode="wait">
      <div className="relative flex">
        <button onClick={() => setIsOpen(!isOpen)}>
          <motion.img
            key={language}
            src={
              language === "es"
                ? "https://res.cloudinary.com/dttpgbmdx/image/upload/v1746396192/es_y6p5ic.png"
                : "https://res.cloudinary.com/dttpgbmdx/image/upload/v1746396192/en_fw4lay.png"
            }
            alt={language === "es" ? "Español" : "English"}
            className="h-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          />
        </button>

        {isOpen && (
          <div className="flex flex-col gap-2 absolute top-10 right-2 bg-white shadow-md z-10 dark:bg-zinc-800">
            <button
              onClick={() => {
                changeLanguage("es");
                setIsOpen(!isOpen);
              }}
              title="Español"
              className={`flex justify-center items-center gap-1 p-1 text-sm w-full ${
                language === "es" && "bg-slate-100 dark:bg-gray-600"
              }`}
            >
              <img
                src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1746396192/es_y6p5ic.png"
                alt="Español"
                className="h-7"
              />
              es
            </button>
            <button
              onClick={() => {
                changeLanguage("en");
                setIsOpen(!isOpen);
              }}
              title="English"
              className={`flex justify-center items-center gap-1 p-1 text-sm w-full ${
                language === "en" && "bg-slate-100 dark:bg-gray-600"
              }`}
            >
              <img
                src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1746396192/en_fw4lay.png"
                alt="English"
                className="h-7"
              />
              en
            </button>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};

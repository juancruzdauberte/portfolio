import { useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [isOpen, setIsOpen] = useState(false);
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  return (
    <div className="relative inline-block">
      <button onClick={() => setIsOpen(!isOpen)}>
        <img
          src={
            language === "es"
              ? "https://res.cloudinary.com/dttpgbmdx/image/upload/v1746396192/es_y6p5ic.png"
              : "https://res.cloudinary.com/dttpgbmdx/image/upload/v1746396192/en_fw4lay.png"
          }
          alt={language === "es" ? "Español" : "English"}
          className="h-8"
        />
      </button>

      {isOpen && (
        <div className="flex flex-col gap-2 absolute top-10 right-1 bg-white shadow-md rounded w-20 p-2 z-10 dark:bg-zinc-700">
          <button
            onClick={() => {
              changeLanguage("es");
              setIsOpen(!isOpen);
            }}
            title="Español"
            className="flex items-center gap-1 text-sm"
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
            className="flex items-center gap-1 text-sm"
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
  );
};

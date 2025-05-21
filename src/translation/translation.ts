import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import navbarEn from "./en/navbar.json";
import navbarEs from "./es/navbar.json";
import homeEn from "./en/home.json";
import homeEs from "./es/home.json";
import experienceEs from "./es/experience.json";
import experienceEn from "./en/experience.json";
import projectCardEn from "./en/projectCard.json";
import projectCardEs from "./es/projectCard.json";
import aboutMeEn from "./en/about.json";
import aboutMeEs from "./es/about.json";
import studiesEs from "./es/studiesCard.json";
import studiesEn from "./en/studiesCard.json";
import techEs from "./es/tech.json";
import techEn from "./en/tech.json";
import skillsEs from "./es/skills.json";
import skillsEn from "./en/skills.json";

const resources = {
  es: {
    translation: {
      ...navbarEs,
      ...homeEs,
      ...experienceEs,
      ...projectCardEs,
      ...aboutMeEs,
      ...studiesEs,
      ...techEs,
      ...skillsEs,
    },
  },
  en: {
    translation: {
      ...navbarEn,
      ...homeEn,
      ...experienceEn,
      ...projectCardEn,
      ...aboutMeEn,
      ...studiesEn,
      ...techEn,
      ...skillsEn,
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "es",
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

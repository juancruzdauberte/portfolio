import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "@fontsource/sora/400.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";
import i18n from "./translation/translation.ts";

// Set html[lang] synchronously before React mounts — ensures screen readers
// see the correct language on first paint (A-1, WCAG 3.1.1)
const initialLang: string = i18n.language?.split("-")[0] || "es";
document.documentElement.lang = initialLang;

i18n.on("languageChanged", (lng: string) => {
  document.documentElement.lang = lng.split("-")[0];
});

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);

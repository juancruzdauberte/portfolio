# SDD Spec: perf-a11y-remediation
**Date:** 2026-06-19 | **Change:** perf-a11y-remediation | ~320 lines, 22 files

---

## FILE: index.html

### Change 1: Remove render-blocking Google Fonts + unused families (P-1, P-12)
**Current:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link
  href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Quicksand:wght@300..700&family=Raleway:ital,wght@0,100..900;1,100..900&family=Red+Hat+Display:ital,wght@0,300..900;1,300..900&family=Sora:wght@100..800&display=swap"
  rel="stylesheet"
/>
```
**Replace with:** *(delete all three lines — @fontsource/sora installed via npm handles the font)*
```html
```
**Notes:** Run `npm install @fontsource/sora` first, then import in main.tsx.

### Change 2: Add hero image preload for LCP (P-13)
**Current:** *(nothing — no preload exists)*
**Add after `<meta name="viewport">`:
```html
<link
  rel="preload"
  as="image"
  href="https://res.cloudinary.com/dttpgbmdx/image/upload/f_auto,q_auto:good/v1772760104/juan-link_kfglqp.jpg"
  fetchpriority="high"
/>
```

### Change 3: Fix favicon MIME type (P-6)
**Current:**
```html
<link
  rel="icon"
  type="ico"
  href="https://res.cloudinary.com/dttpgbmdx/image/upload/v1753756146/portfolio-icon_e1c2j0.png"
/>
```
**Replace with:**
```html
<link
  rel="icon"
  type="image/png"
  href="https://res.cloudinary.com/dttpgbmdx/image/upload/v1753756146/portfolio-icon_e1c2j0.png"
/>
```

---

## FILE: vercel.json

### Change 1: Add Cache-Control headers (Best Practices, P-12 mitigation)
**Current:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```
**Replace with:**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)\\.(?:woff2?|ttf|otf|eot)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*)\\.(?:png|jpg|jpeg|gif|webp|svg|ico|avif)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, must-revalidate" }
      ]
    },
    {
      "source": "/",
      "headers": [
        { "key": "Cache-Control", "value": "no-cache, must-revalidate" }
      ]
    }
  ]
}
```

---

## FILE: src/utils/cloudinary.ts *(NEW FILE)*

```ts
/**
 * Inserts Cloudinary auto-format and auto-quality transforms into an
 * existing upload URL, after /upload/ and before the optional version string.
 *
 * Input:  .../upload/v1772760104/juan-link_kfglqp.jpg
 * Output: .../upload/f_auto,q_auto/v1772760104/juan-link_kfglqp.jpg
 */
export function cloudinaryOptimize(
  url: string,
  options?: { quality?: "auto" | "good" }
): string {
  const q = options?.quality === "good" ? "q_auto:good" : "q_auto";
  const transform = `f_auto,${q}`;
  return url.replace(
    /\/upload\/((?:v\d+\/)?)/,
    `/upload/${transform}/$1`
  );
}
```

---

## FILE: src/translation/en/a11y.json *(NEW FILE)*

```json
{
  "skipToContent": "Skip to main content"
}
```

## FILE: src/translation/es/a11y.json *(NEW FILE)*

```json
{
  "skipToContent": "Ir al contenido principal"
}
```

---

## FILE: src/translation/translation.ts

### Change 1: Import a11y namespace + export default i18n (A-1, A-7)
**Current:**
```ts
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
```
**Replace with:**
```ts
import skillsEs from "./es/skills.json";
import skillsEn from "./en/skills.json";
import a11yEs from "./es/a11y.json";
import a11yEn from "./en/a11y.json";

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
      ...a11yEs,
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
      ...a11yEn,
    },
  },
};
```

---

## FILE: src/main.tsx

### Change 1: Import i18n, set html[lang] synchronously before createRoot (A-1, FR-20, FR-21)
**Current:**
```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./translation/translation.ts";

createRoot(document.getElementById("root")!).render(
  <>
    <App />
  </>
);
```
**Replace with:**
```tsx
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
```
**Notes:** `@fontsource/sora` must be installed: `npm install @fontsource/sora`. Import specific weights only (400, 600, 700, 800) to minimize bundle size.

---

## FILE: src/hooks/usePerformance.ts

### Change 1: Add motionSafe helper (P-7, A-9, FR-8)
**Add after the existing `useReducedMotion` export:**
```ts
/**
 * Returns framer-motion animate/transition props safe for reduced-motion users.
 * framer-motion v12 does NOT auto-pause animations — explicit gating is required.
 *
 * Usage:
 *   <motion.div {...motionSafe({ rotate: 360 }, { duration: 8, repeat: Infinity }, prefersReducedMotion)} />
 */
export const motionSafe = <A extends object>(
  animate: A,
  transition: object,
  prefersReducedMotion: boolean
): { animate: A | object; transition: object } => {
  if (prefersReducedMotion) {
    return { animate: {}, transition: { duration: 0 } };
  }
  return { animate, transition };
};
```

---

## FILE: src/App.tsx

### Change 1: Skip-to-content link (A-7, FR-22, FR-23, FR-24)
**Current:**
```tsx
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
```
**Replace with:**
```tsx
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useReducedMotion, motionSafe } from "./hooks/usePerformance";
```

**Current:**
```tsx
function App() {
  const { scrollYProgress } = useScroll();
```
**Replace with:**
```tsx
function App() {
  const { scrollYProgress } = useScroll();
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
```

**Current:**
```tsx
    <ThemeProvider>
      <div className="min-h-screen flex flex-col text-sm sm:text-base md:text-lg lg:text-xl text-theme-text-primary bg-theme-bg-primary transition-colors duration-300 relative overflow-x-hidden">
```
**Replace with:**
```tsx
    <ThemeProvider>
      <div className="min-h-screen flex flex-col text-sm sm:text-base md:text-lg lg:text-xl text-theme-text-primary bg-theme-bg-primary transition-colors duration-300 relative overflow-x-hidden">
        {/* Skip to content — visually hidden, revealed on keyboard focus (A-7, WCAG 2.4.1) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[200] focus:px-5 focus:py-2.5 focus:rounded-lg focus:bg-theme-bg-secondary focus:text-theme-text-primary focus:text-sm focus:font-semibold focus:ring-2 focus:ring-theme-border-focus focus:outline-none focus:shadow-theme-md"
        >
          {t("skipToContent")}
        </a>
```

### Change 2: SectionLoader motionSafe + main id (P-7, A-7, FR-24)
**Current:**
```tsx
const SectionLoader = () => (
  <div className="w-full max-w-4xl h-96 flex items-center justify-center">
    <motion.div
      className="w-12 h-12 border-4 border-theme-accent-blue border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </div>
);
```
**Replace with:**
```tsx
const SectionLoader = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="w-full max-w-4xl h-96 flex items-center justify-center">
      <motion.div
        className="w-12 h-12 border-4 border-theme-accent-blue border-t-transparent rounded-full"
        {...motionSafe({ rotate: 360 }, { duration: 1, repeat: Infinity, ease: "linear" }, prefersReducedMotion)}
      />
    </div>
  );
};
```

**Current:**
```tsx
        <main className="flex-1 flex flex-col w-full items-center gap-20 sm:gap-28 md:gap-40 px-4 sm:px-6 md:px-8 mb-12 relative">
```
**Replace with:**
```tsx
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 flex flex-col w-full items-center gap-20 sm:gap-28 md:gap-40 px-4 sm:px-6 md:px-8 mb-12 relative outline-none"
        >
```

---

## FILE: src/sections/Hero.tsx

### Change 1: Import cloudinaryOptimize + useReducedMotion (P-4, P-7, A-9)
**Current:**
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
```
**Replace with:**
```tsx
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion, motionSafe } from "../hooks/usePerformance";
import { cloudinaryOptimize } from "../utils/cloudinary";
```

### Change 2: Add useReducedMotion inside component
**Current:**
```tsx
export const Hero = () => {
  const { t, i18n } = useTranslation();
```
**Replace with:**
```tsx
export const Hero = () => {
  const { t, i18n } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
```

### Change 3: Decorative ring 1 — aria-hidden + motionSafe (A-3, P-7, FR-29, FR-9)
**Current:**
```tsx
          {/* Anillo animado con colores de tema */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 border-2 border-transparent border-t-theme-accent-blue border-r-theme-accent-purple rounded-full"
          />
```
**Replace with:**
```tsx
          {/* Anillo animado con colores de tema */}
          <motion.div
            aria-hidden="true"
            {...motionSafe(
              { rotate: 360 },
              { duration: 8, repeat: Infinity, ease: "linear" },
              prefersReducedMotion
            )}
            className="absolute inset-0 border-2 border-transparent border-t-theme-accent-blue border-r-theme-accent-purple rounded-full"
          />
```

### Change 4: Decorative ring 2 — aria-hidden + motionSafe (A-3, P-7)
**Current:**
```tsx
          {/* Segundo anillo */}
          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 border-2 border-transparent border-b-theme-accent-cyan border-l-theme-accent-pink rounded-full"
          />
```
**Replace with:**
```tsx
          {/* Segundo anillo */}
          <motion.div
            aria-hidden="true"
            {...motionSafe(
              { rotate: -360 },
              { duration: 10, repeat: Infinity, ease: "linear" },
              prefersReducedMotion
            )}
            className="absolute inset-0 border-2 border-transparent border-b-theme-accent-cyan border-l-theme-accent-pink rounded-full"
          />
```

### Change 5: Glow effect — aria-hidden + motionSafe (A-3, P-7)
**Current:**
```tsx
          {/* Glow effect con color de tema */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.4, 0.6, 0.4],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-theme-accent-blue/30 rounded-full blur-2xl"
          />
```
**Replace with:**
```tsx
          {/* Glow effect con color de tema */}
          <motion.div
            aria-hidden="true"
            {...motionSafe(
              { scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] },
              { duration: 3, repeat: Infinity, ease: "easeInOut" },
              prefersReducedMotion
            )}
            className="absolute inset-0 bg-theme-accent-blue/30 rounded-full blur-2xl"
          />
```

### Change 6: Hero image — fetchpriority + Cloudinary optimization (P-4, P-5)
**Current:**
```tsx
            <img
              src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1772760104/juan-link_kfglqp.jpg"
              alt="Foto de perfil de Juan Cruz"
              className="object-cover w-full h-full"
            />
```
**Replace with:**
```tsx
            <img
              src={cloudinaryOptimize(
                "https://res.cloudinary.com/dttpgbmdx/image/upload/v1772760104/juan-link_kfglqp.jpg",
                { quality: "good" }
              )}
              alt="Foto de perfil de Juan Cruz"
              className="object-cover w-full h-full"
              fetchpriority="high"
              loading="eager"
              decoding="sync"
            />
```

---

## FILE: src/common/InfiniteCarousel.tsx

### Change 1: Full rewrite — useMotionValue + AnimationPlaybackControls + pause (P-7, P-8, P-10, A-6, A-9)
**Current:** *(entire file)*
```tsx
import { motion } from "framer-motion";
import { TechIcon } from "./TechIcon";
// ... (declarative animate with repeat:Infinity, willChange:transform)
```
**Replace with:**
```tsx
import { motion, useMotionValue, animate } from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/usePerformance";
import { TechIcon } from "./TechIcon";

interface Technology {
  src: string;
  alt: string;
  h?: string;
}

interface InfiniteCarouselProps {
  technologies: Technology[];
  duration?: number;
  direction?: "left" | "right";
  label?: string;
}

export const InfiniteCarousel = ({
  technologies,
  duration = 20,
  direction = "left",
  label,
}: InfiniteCarouselProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  const x = useMotionValue(direction === "left" ? "0%" : "-50%");
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  // Start animation on mount; skip entirely when reducedMotion is on
  useEffect(() => {
    if (prefersReducedMotion) return;

    animRef.current?.stop();
    animRef.current = animate(
      x,
      direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      { duration, repeat: Infinity, ease: "linear", repeatType: "loop" }
    );

    return () => { animRef.current?.stop(); };
  }, [direction, duration, prefersReducedMotion]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pause / resume without restart — no visual jump
  useEffect(() => {
    if (!animRef.current) return;
    paused ? animRef.current.pause() : animRef.current.play();
  }, [paused]);

  return (
    <div
      className="relative w-full overflow-hidden py-4 md:py-7"
      role="region"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-r from-customWhite dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-l from-customWhite dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="flex">
        <motion.div
          className="flex gap-5 sm:gap-6 md:gap-8 items-center"
          style={{ x }}
        >
          {technologies.map((tech, index) => (
            <div key={`tech-1-${index}`} className="flex-shrink-0">
              <TechIcon src={tech.src} alt={tech.alt} h={tech.h} />
            </div>
          ))}
          {technologies.map((tech, index) => (
            <div key={`tech-2-${index}`} className="flex-shrink-0">
              <TechIcon src={tech.src} alt={tech.alt} h={tech.h} />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
```
**Notes:** `willChange: "transform"` removed (P-10). `label` prop required by callers in Technologies.tsx.

---

## FILE: src/common/TechIcon.tsx

### Change 1: Full rewrite — div→button, aria-label, isActive, focus ring (A-5, FR-27, FR-28)
**Current:** *(entire file — div with onClick, no role, no keyboard)*
**Replace with:**
```tsx
import { motion, AnimatePresence } from "framer-motion";
import { useState, useId } from "react";

export const TechIcon = ({
  src,
  alt,
  h,
}: {
  src: string;
  alt: string;
  h?: string;
}) => {
  const [isActive, setIsActive] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const tooltipId = useId();

  return (
    <button
      type="button"
      aria-label={alt}
      aria-describedby={isActive ? tooltipId : undefined}
      className="relative flex items-center justify-center group cursor-pointer rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-theme-border-focus focus-visible:ring-offset-1 focus-visible:ring-offset-theme-bg-primary"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      <div className={`relative ${h || "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12"}`}>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        )}
        {!imageError && (
          <motion.img
            src={src}
            alt=""
            aria-hidden="true"
            className={`${h || "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12"} object-contain transition-opacity duration-300 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => { setImageError(true); setImageLoaded(true); }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          />
        )}
        {imageError && (
          <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-300">
            {alt.substring(0, 2)}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isActive && imageLoaded && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.2 }}
            animate={{ opacity: 1, y: -25, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute top-0 z-20 pointer-events-none"
          >
            <div className="relative">
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 text-white text-xs font-medium px-3 py-1 rounded-lg shadow-lg whitespace-nowrap">
                {alt}
              </div>
              <div className="absolute left-1/2 -translate-x-1/2 top-full">
                <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-blue-800 dark:border-t-blue-700" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isActive && imageLoaded && (
          <motion.div
            aria-hidden="true"
            className="absolute inset-0 rounded-full blur-xl -z-10 bg-blue-500/20"
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 0.3, scale: 1.5 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>
    </button>
  );
};
```

---

## FILE: src/common/Technologies.tsx

### Change 1: `<p>` → `<h3>` for carousel labels + add label prop to InfiniteCarousel (A-11, FR-32)
**Current:**
```tsx
      {/* Front-End Carousel */}
      <section className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <p className="font-semibold text-lg px-7 sm:px-10 md:px-6">Front-End</p>
        <InfiniteCarousel technologies={frontEndTechnologies} duration={25} direction="left" />
      </section>

      {/* Back-End Carousel */}
      <section className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <p className="font-semibold text-lg px-7 sm:px-10 md:px-6">Back-End - BaaS</p>
        <InfiniteCarousel technologies={backEndTechnologies} duration={30} direction="right" />
      </section>

      <section className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <p className="font-semibold text-lg px-7 sm:px-10 md:px-6">{t("dataAnalytics")}</p>
        <InfiniteCarousel technologies={dataAnalyticsTechnologies} duration={30} direction="right" />
      </section>

      {/* Version Control Carousel */}
      <section className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <p className="font-semibold text-lg px-7 sm:px-10 md:px-6">{t("others")}</p>
        <InfiniteCarousel technologies={othersTechnologies} duration={15} direction="left" />
      </section>
```
**Replace with:**
```tsx
      {/* Front-End Carousel */}
      <div className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <h3 className="font-semibold text-lg px-7 sm:px-10 md:px-6">Front-End</h3>
        <InfiniteCarousel technologies={frontEndTechnologies} duration={25} direction="left" label="Front-End technologies" />
      </div>

      {/* Back-End Carousel */}
      <div className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <h3 className="font-semibold text-lg px-7 sm:px-10 md:px-6">Back-End - BaaS</h3>
        <InfiniteCarousel technologies={backEndTechnologies} duration={30} direction="right" label="Back-End and BaaS technologies" />
      </div>

      <div className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <h3 className="font-semibold text-lg px-7 sm:px-10 md:px-6">{t("dataAnalytics")}</h3>
        <InfiniteCarousel technologies={dataAnalyticsTechnologies} duration={30} direction="right" label="Data analytics technologies" />
      </div>

      {/* Others Carousel */}
      <div className="flex flex-col gap-3 -mx-4 sm:-mx-6 md:mx-0">
        <h3 className="font-semibold text-lg px-7 sm:px-10 md:px-6">{t("others")}</h3>
        <InfiniteCarousel technologies={othersTechnologies} duration={15} direction="left" label="Other tools and technologies" />
      </div>
```
**Notes:** Outer `<section className="flex flex-col gap-10">` should get `aria-label="Technologies"`. Inner `<section>` → `<div>` (not landmark, just layout).

### Change 2: Outer section aria-label (A-12)
**Current:**
```tsx
    <section className="flex flex-col gap-10">
```
**Replace with:**
```tsx
    <section className="flex flex-col gap-10" aria-label="Technologies">
```

---

## FILE: src/layout/Navbar.tsx

### Change 1: rAF throttle on handleScroll (P-9, FR-15)
**Current:**
```tsx
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "sobre-mi",
        "experiencia",
        "proyectos",
        "habilidades",
      ];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
```
**Replace with:**
```tsx
  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return; // already scheduled
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const sections = [
          "hero",
          "sobre-mi",
          "experiencia",
          "proyectos",
          "habilidades",
        ];
        const scrollPosition = window.scrollY + 200;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);
```

### Change 2: Hamburger button — aria-expanded + aria-controls (A-8, FR-25)
**Current:**
```tsx
          <motion.button
            key="menu-button"
            onClick={openModal}
            className="md:hidden absolute left-2 z-50 p-2 rounded-lg hover:bg-theme-bg-tertiary/50 text-theme-text-primary transition-colors"
            aria-label="Abrir menú"
```
**Replace with:**
```tsx
          <motion.button
            key="menu-button"
            onClick={openModal}
            className="md:hidden absolute left-2 z-50 p-2 rounded-lg hover:bg-theme-bg-tertiary/50 text-theme-text-primary transition-colors"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
```

### Change 3: Modal panel — id="mobile-menu" (A-8, FR-26)
**Current:**
```tsx
      <Modal
        isOpen={menuOpen}
        onRequestClose={closeModal}
        contentLabel="Menú móvil"
        className="fixed left-0 top-0 h-full w-[280px] sm:w-[320px] bg-theme-bg-overlay/98 backdrop-blur-xl shadow-theme-2xl border-r border-theme-border-primary/30 transition-colors z-[100] outline-none overflow-y-auto"
```
**Replace with:**
```tsx
      <Modal
        isOpen={menuOpen}
        onRequestClose={closeModal}
        contentLabel="Menú móvil"
        id="mobile-menu"
        className="fixed left-0 top-0 h-full w-[280px] sm:w-[320px] bg-theme-bg-overlay/98 backdrop-blur-xl shadow-theme-2xl border-r border-theme-border-primary/30 transition-colors z-[100] outline-none overflow-y-auto"
```
**Notes:** `react-modal` passes extra props to the content div. Verify `id` prop is forwarded by checking the rendered DOM.

### Change 4: Theme toggle — dynamic aria-label (A-10, FR-30)
**Current:**
```tsx
          aria-label="Cambiar tema"
```
**Replace with:**
```tsx
          aria-label={darkMode ? t("navbar.switchToLight") : t("navbar.switchToDark")}
```
**Notes:** Add translation keys `"switchToLight"` and `"switchToDark"` to `en/navbar.json` and `es/navbar.json`. Example values: EN: `"Switch to light mode"` / `"Switch to dark mode"`. ES: `"Activar modo claro"` / `"Activar modo oscuro"`.

### Change 5: Mobile menu particle — motionSafe (P-7, A-9)
**Current:**
```tsx
          <motion.div
            className="absolute top-20 right-6 w-20 h-20 bg-theme-accent-blue/10 rounded-full blur-2xl pointer-events-none"
            animate={{
              y: [0, -20, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
```
**Replace with:** *(import useReducedMotion + motionSafe at top of file)*
```tsx
          <motion.div
            aria-hidden="true"
            className="absolute top-20 right-6 w-20 h-20 bg-theme-accent-blue/10 rounded-full blur-2xl pointer-events-none"
            {...motionSafe(
              { y: [0, -20, 0], scale: [1, 1.2, 1] },
              { duration: 3, repeat: Infinity, ease: "easeInOut" },
              prefersReducedMotion
            )}
          />
```
**Add to Navbar component:**
```tsx
  const prefersReducedMotion = useReducedMotion();
```
**Add to imports:**
```tsx
import { useReducedMotion, motionSafe } from "../hooks/usePerformance";
```

---

## FILE: src/layout/Footer.tsx

### Change 1: motionSafe on Infinity animations (P-7, A-9)
**Add imports:**
```tsx
import { useReducedMotion, motionSafe } from "../hooks/usePerformance";
```
**Add inside Footer:**
```tsx
  const prefersReducedMotion = useReducedMotion();
```
**Current (gradient span):**
```tsx
          <motion.span
            className="font-bold text-lg sm:text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-primary"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
```
**Replace with:**
```tsx
          <motion.span
            className="font-bold text-lg sm:text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-primary"
            {...motionSafe(
              { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] },
              { duration: 5, repeat: Infinity, ease: "linear" },
              prefersReducedMotion
            )}
            style={{ backgroundSize: "200% 200%" }}
          >
```
**Current (particles — two motion.div at bottom of Footer):**
```tsx
      <motion.div
        className="absolute bottom-4 left-6 md:left-10 w-2 h-2 bg-theme-accent-blue rounded-full"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-8 right-6 md:right-10 w-2 h-2 bg-theme-accent-purple rounded-full"
        animate={{ y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
```
**Replace with:**
```tsx
      <motion.div
        aria-hidden="true"
        className="absolute bottom-4 left-6 md:left-10 w-2 h-2 bg-theme-accent-blue rounded-full"
        {...motionSafe(
          { y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] },
          { duration: 3, repeat: Infinity, ease: "easeInOut" },
          prefersReducedMotion
        )}
      />
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 right-6 md:right-10 w-2 h-2 bg-theme-accent-purple rounded-full"
        {...motionSafe(
          { y: [0, -10, 0], opacity: [0.3, 0.8, 0.3] },
          { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
          prefersReducedMotion
        )}
      />
```

---

## FILE: src/sections/Skills.tsx

### Change 1: h5 → h2 for section title (A-11, FR-32)
**Current:**
```tsx
        <h5 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark relative">
          {t("skills.title")}
```
**Replace with:**
```tsx
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark relative">
          {t("skills.title")}
```
*(close tag h5 → h2 as well)*

### Change 2: h6 → h3 for "Soft Skills" subsection (A-11, FR-33)
**Current:**
```tsx
          <motion.h6
            className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue mb-1 relative inline-block"
```
**Replace with:**
```tsx
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue mb-1 relative inline-block"
```
*(close tag h6 → h3)*

### Change 3: motion.p → motion.h3 for "Tech Skills" title (A-11, FR-33)
**Current:**
```tsx
          <motion.p
            className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue mb-1 relative inline-block"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("skills.techSkills.title")}
```
**Replace with:**
```tsx
          <motion.h3
            className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue mb-1 relative inline-block"
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            {t("skills.techSkills.title")}
```
*(close tag p → h3)*

### Change 4: motion.section wrappers → motion.div (A-12, FR-34)
The three nested `<motion.section>` within Skills (title area, soft skills, tech skills) are layout containers, not page landmarks. Change them to `<motion.div>`:
- `<motion.section variants={titleVariants} ...>` → `<motion.div variants={titleVariants} ...>`
- `<motion.section variants={containerVariants} ...>` → `<motion.div variants={containerVariants} ...>`  
- Two `<motion.section variants={itemVariants} ...>` → `<motion.div variants={itemVariants} ...>`

The **outer** `<section>` (root element) keeps its tag and gets `aria-label`:
**Current:**
```tsx
    <section className="w-full max-w-5xl flex flex-col">
```
**Replace with:**
```tsx
    <section className="w-full max-w-5xl flex flex-col" aria-label="Skills">
```

---

## FILE: src/sections/Experience.tsx

### Change 1: h3 → h2 for section title (A-11, FR-32)
**Current:**
```tsx
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark">
          {t("experience.title")}
        </h3>
```
**Replace with:**
```tsx
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark">
          {t("experience.title")}
        </h2>
```

### Change 2: h4 → h3 for company names (A-11, FR-33)
**Current:**
```tsx
                <motion.h4
                  className="text-lg sm:text-xl md:text-2xl font-semibold relative inline-block text-theme-text-primary"
```
**Replace with:**
```tsx
                <motion.h3
                  className="text-lg sm:text-xl md:text-2xl font-semibold relative inline-block text-theme-text-primary"
```
*(close tag h4 → h3)*

### Change 3: motion.section wrappers → motion.div + outer section aria-label (A-12)
The `<motion.section variants={titleVariants}>`, `<motion.section variants={containerVariants}>`, and `<motion.section key={exp.company} variants={itemVariants}>` are layout containers. Change to `<motion.div>`.

Outer `<section>` gets `aria-label`:
**Current:**
```tsx
    <section className="w-full max-w-5xl flex flex-col px-4 sm:px-6">
```
**Replace with:**
```tsx
    <section className="w-full max-w-5xl flex flex-col px-4 sm:px-6" aria-label="Experience">
```

---

## FILE: src/sections/AboutMe.tsx

### Change 1: h3 → h2 for section title (A-11, FR-32)
**Current:**
```tsx
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark">
          {t("about.title")}
        </h3>
```
**Replace with:**
```tsx
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark">
          {t("about.title")}
        </h2>
```

### Change 2: h5 → h3 for Studies subsection (A-11, FR-33)
**Current:**
```tsx
            <h5 className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue relative inline-block">
              {t("about.titleStudies")}
```
**Replace with:**
```tsx
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-theme-accent-blue relative inline-block">
              {t("about.titleStudies")}
```
*(close tag h5 → h3)*

### Change 3: motion.section wrappers → motion.div + outer section aria-label (A-12)
Outer `<section>`:
**Current:**
```tsx
    <section className="w-full max-w-6xl flex flex-col">
```
**Replace with:**
```tsx
    <section className="w-full max-w-6xl flex flex-col" aria-label="About me">
```
Inner `<motion.section>` elements (3 of them) → `<motion.div>`.

---

## FILE: src/sections/Projects.tsx

### Change 1: h3 → h2 for section title (A-11, FR-32)
**Current:**
```tsx
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark relative">
          {t("projectCard.title")}
```
**Replace with:**
```tsx
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-theme-accent-blue-dark relative">
          {t("projectCard.title")}
```
*(close tag h3 → h2)*

### Change 2: motion.section wrappers → motion.div + outer section aria-label (A-12)
**Current:**
```tsx
    <section className="w-full max-w-5xl flex flex-col gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6">
```
**Replace with:**
```tsx
    <section className="w-full max-w-5xl flex flex-col gap-6 sm:gap-8 md:gap-10 px-4 sm:px-6" aria-label="Projects">
```
Inner `<motion.section>` wrappers → `<motion.div>`.

---

## FILE: src/common/ProjectCard.tsx

### Change 1: h4 → h3 for card title (A-11, FR-33)
**Current:**
```tsx
        <motion.h4
          className="..."
```
**Replace with:**
```tsx
        <motion.h3
          className="..."
```
*(close tag)*

### Change 2: h6 → h4 for Technologies label inside card (A-11)
**Current:**
```tsx
          <h6 className="text-xs sm:text-sm font-semibold text-theme-text-primary">
```
**Replace with:**
```tsx
          <h4 className="text-xs sm:text-sm font-semibold text-theme-text-primary">
```

### Change 3: Add aria-label wrapper to react-icons tech icons (A-4, FR-38)
In Projects.tsx, the react-icons are passed as JSX children `technologies={[<SiNodedotjs />, ...]}`. The ProjectCard renders them as:
```tsx
{technologies.map((TechIcon, index) => (
  <motion.span key={index} ...>{TechIcon}</motion.span>
))}
```
Each react-icons SVG should have `aria-label` and `focusable="false"`. Update the icons in Projects.tsx to include `aria-label` and `aria-hidden` on the SVG + wrapper span approach. Alternatively, update the technologies prop type to include an `ariaLabel` string and render it in ProjectCard.

**Pragmatic approach** — update each icon in Projects.tsx:
```tsx
// Before:
<SiNodedotjs className="text-green-500" />

// After:
<span aria-label="Node.js"><SiNodedotjs className="text-green-500" aria-hidden="true" focusable="false" /></span>
```
Apply to all 18 react-icons instances across the 4 `<ProjectCard>` components.

---

## FILE: src/index.css

### Change 1: Remove @media (prefers-color-scheme: dark) duplicate block (P-14, FR-18)
**Current:** Find and delete the entire block:
```css
@media (prefers-color-scheme: dark) {
  :root:not(.light) {
    /* ... ~50 CSS custom property declarations ... */
  }
}
```
**Replace with:** *(delete — the `.dark` class block is the authoritative source)*

### Change 2: Fix --text-tertiary contrast in light mode (A-2, FR-31)
**Current (inside `:root` block):**
```css
  --text-tertiary: 74 127 167;
```
**Replace with:**
```css
  --text-tertiary: 61 110 147; /* #3D6E93 — 5.2:1 contrast on #F6FAFD (AA ✓) */
```

### Change 3: Fix --text-tertiary contrast in dark mode (A-2)
**Current (inside `.dark` block):**
```css
  --text-tertiary: 74 127 167;
```
**Replace with:**
```css
  --text-tertiary: 100 154 196; /* #649AC4 — 6.2:1 contrast on #0A1931 (AA ✓) */
```

---

## NEW FILES SUMMARY

| File | Purpose |
|------|---------|
| `src/utils/cloudinary.ts` | `cloudinaryOptimize()` URL transform utility |
| `src/translation/en/a11y.json` | English skip-link translation |
| `src/translation/es/a11y.json` | Spanish skip-link translation |

## npm install required

```bash
npm install @fontsource/sora
```

## Navbar translation keys to add

In `src/translation/en/navbar.json`, add:
```json
"switchToLight": "Switch to light mode",
"switchToDark": "Switch to dark mode"
```
In `src/translation/es/navbar.json`, add:
```json
"switchToLight": "Activar modo claro",
"switchToDark": "Activar modo oscuro"
```

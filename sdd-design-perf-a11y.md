# SDD Design: perf-a11y-remediation

**Phase:** Design  
**Stack:** Vite 6 + React 19 + TypeScript + Tailwind CSS 3 + framer-motion v12.9.2 + i18next  
**Date:** 2026-06-19

---

## Design Area 1 — useReducedMotion Integration Pattern

### Decision
Use the existing `useReducedMotion` hook from `usePerformance.ts` directly inside each affected component, augmented by a single exported helper `motionSafe()` that collapses the conditional logic into one call site.

### Design

**Step 1 — Add `motionSafe` helper to `src/hooks/usePerformance.ts`:**

```ts
/**
 * Returns framer-motion animate/transition props that are safe for
 * users with prefers-reduced-motion. When reduced motion is active,
 * returns an empty object for animate and a zero-duration transition
 * so the element snaps to its final state without looping.
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

**Step 2 — `Hero.tsx` — three Infinity loops:**

```tsx
// Inside Hero component, before return:
const prefersReducedMotion = useReducedMotion();

// 1. First ring (rotate: 360)
<motion.div
  {...motionSafe(
    { rotate: 360 },
    { duration: 8, repeat: Infinity, ease: "linear" },
    prefersReducedMotion
  )}
  className="absolute inset-0 border-2 border-transparent border-t-theme-accent-blue border-r-theme-accent-purple rounded-full"
/>

// 2. Second ring (rotate: -360)
<motion.div
  {...motionSafe(
    { rotate: -360 },
    { duration: 10, repeat: Infinity, ease: "linear" },
    prefersReducedMotion
  )}
  className="absolute inset-0 border-2 border-transparent border-b-theme-accent-cyan border-l-theme-accent-pink rounded-full"
/>

// 3. Glow pulse (scale + opacity loop)
<motion.div
  {...motionSafe(
    { scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] },
    { duration: 3, repeat: Infinity, ease: "easeInOut" },
    prefersReducedMotion
  )}
  className="absolute inset-0 bg-theme-accent-blue/30 rounded-full blur-2xl"
/>

// 4. Scroll arrow bounce — keep opacity intro, disable y loop
<motion.div
  initial={{ opacity: 0 }}
  animate={prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, y: [0, 15, 0] }
  }
  transition={prefersReducedMotion
    ? { opacity: { delay: 1, duration: 0.5 } }
    : {
        opacity: { delay: 1, duration: 0.5 },
        y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
      }
  }
  className="cursor-pointer absolute bottom-14 lg:bottom-12 z-10 mt-2 sm:mt-0"
>
```

**Step 3 — `App.tsx` — SectionLoader spinner:**

```tsx
// SectionLoader:
const SectionLoader = () => {
  const prefersReducedMotion = useReducedMotion();
  return (
    <div className="w-full max-w-4xl h-96 flex items-center justify-center">
      <motion.div
        className="w-12 h-12 border-4 border-theme-accent-blue border-t-transparent rounded-full"
        {...motionSafe(
          { rotate: 360 },
          { duration: 1, repeat: Infinity, ease: "linear" },
          prefersReducedMotion
        )}
      />
    </div>
  );
};
```

> **Note on framer-motion v12 specifics:** v12 removed the internal `useReducedMotion` hook that automatically respected system preferences on `motion.*` components (it was v10 behaviour). In v12 you must explicitly gate `animate`/`transition` props yourself — the library no longer auto-pauses. `motionSafe()` fulfils exactly this role.

### Tradeoffs
- **Rejected — framer-motion's own `useReducedMotion`:** In v12.9.2 the hook still exists as `import { useReducedMotion } from "framer-motion"`, but it returns `null | boolean` and its integration with `motion.*` props is not automatic. Our custom hook already matches the interface and exists in the codebase — no reason to add a second source of truth.
- **Rejected — CSS `@media (prefers-reduced-motion: reduce)` only:** index.css already handles this at a coarse level (`animation-duration: 0.01ms !important`), but it cannot cleanly handle JS-driven framer-motion animations. The JS-level gate is required for correct semantics.

### Dependencies
None. `useReducedMotion` is already exported from `src/hooks/usePerformance.ts`.

---

## Design Area 2 — InfiniteCarousel Pause State

### Decision
Replace `motion.div`'s declarative `animate` prop with a `useMotionValue` + `animate()` imperative animation (framer-motion v12), storing the returned `AnimationPlaybackControls` ref to call `.pause()` / `.play()` without a visual jump.

### Design

**State shape:**
```ts
const [paused, setPaused] = useState(false);
```

**Animation setup — use `animate()` from framer-motion which returns `AnimationPlaybackControls`:**

```tsx
import { motion, useMotionValue, animate } from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/usePerformance";

export const InfiniteCarousel = ({
  technologies,
  duration = 20,
  direction = "left",
}: InfiniteCarouselProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);

  // MotionValue stores the current translateX percentage as a string
  const x = useMotionValue(direction === "left" ? "0%" : "-50%");
  const animRef = useRef<AnimationPlaybackControls | null>(null);

  // Start / restart animation on mount or direction change
  useEffect(() => {
    if (prefersReducedMotion) return; // static position, no animation

    animRef.current?.stop();
    animRef.current = animate(
      x,
      direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
      {
        duration,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      }
    );

    return () => {
      animRef.current?.stop();
    };
  }, [direction, duration, prefersReducedMotion]); // x is stable, not a dep

  // Pause / resume without restart (no visual jump)
  useEffect(() => {
    if (!animRef.current) return;
    if (paused) {
      animRef.current.pause();
    } else {
      animRef.current.play();
    }
  }, [paused]);

  const handlePause = () => setPaused(true);
  const handleResume = () => setPaused(false);

  return (
    <div
      className="relative w-full overflow-hidden py-4 md:py-7"
      onMouseEnter={handlePause}
      onMouseLeave={handleResume}
      onFocus={handlePause}       // keyboard: focus enters the carousel region
      onBlur={handleResume}       // keyboard: focus leaves
    >
      {/* Fade gradients — unchanged */}
      <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-r from-customWhite dark:from-gray-900 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-24 bg-gradient-to-l from-customWhite dark:from-gray-900 to-transparent z-10 pointer-events-none" />

      <div className="flex">
        {/* style={{ x }} passes the MotionValue directly; framer-motion maps it to translateX */}
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

**Why no visual jump:** `animRef.current.pause()` freezes the WAAPI animation at its current position. `animRef.current.play()` resumes from that exact position. This is guaranteed by the `AnimationPlaybackControls` interface in framer-motion v12 — unlike `useAnimationControls.stop()` + `start()` which resets to the keyframe origin.

**`prefersReducedMotion` interaction:** When true, `useEffect` returns early without calling `animate()`. `x` stays at its initial value and the `motion.div` is stationary.

**Accessibility note:** Add `aria-label` to the container so screen readers can identify the carousel region:
```tsx
<div
  ...
  role="region"
  aria-label={/* prop: e.g. "Technology carousel" or from i18n */}
>
```

### Tradeoffs
- **Rejected — `duration: 9999` trick:** Setting a very long duration as "pause" causes a position jump when the duration resets. Not viable.
- **Rejected — `useAnimationControls` (high-level):** `controls.stop()` + `controls.start(...)` resets to keyframe origin — visible flash on resume.
- **Rejected — CSS `animation-play-state: paused`:** The carousel uses framer-motion's JS animation engine (WAAPI), not a CSS `@keyframes` block. The `animation-play-state` style has no effect on framer-motion-driven transforms.

### Dependencies
None. `animate`, `useMotionValue`, `AnimationPlaybackControls` are all in framer-motion v12.9.2.

---

## Design Area 3 — `html[lang]` Update Pattern

### Decision
Change the side-effect import of `translation.ts` in `main.tsx` to a default import, set `document.documentElement.lang` synchronously before `createRoot`, and register a `languageChanged` listener for runtime switches.

### Design

**`src/main.tsx` — full replacement:**

```tsx
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import i18n from "./translation/translation.ts"; // named import, not side-effect

// translation.ts calls i18n.init() synchronously (LanguageDetector runs from
// localStorage / navigator.language before the promise resolves).
// i18n.language is reliably populated at this point.
const initialLang: string = i18n.language?.split("-")[0] || "es";
document.documentElement.lang = initialLang;

// Keep the attribute in sync when the user switches language at runtime.
// The handler fires from LanguageSelector → i18n.changeLanguage().
i18n.on("languageChanged", (lng: string) => {
  document.documentElement.lang = lng.split("-")[0]; // "en-US" → "en"
});

createRoot(document.getElementById("root")!).render(<App />);
```

**Why before `createRoot`:** `document.documentElement.lang` is a synchronous DOM attribute. Setting it before React mounts means the first render and any SSR hydration (future) sees the correct lang. There is no async dependency — i18next initialised via `i18n.init({...})` in translation.ts is called synchronously and LanguageDetector reads from `localStorage` synchronously.

**TypeScript:** `i18n.language` is `string` (i18next types). The `.split("-")[0]` call normalises `"en-US"` → `"en"` to satisfy BCP-47 `lang` attribute expectations. No extra type assertions needed.

### Tradeoffs
- **Rejected — Setting lang inside a React `useEffect`:** Creates a FOUC window where the lang attribute is wrong for the first paint, which affects TTS / screen readers that read the attribute on document load.
- **Rejected — Hardcoding `lang="es"` in `index.html`:** Correct for default but does not update on language switch.

### Dependencies
None. Only changes the import style in `main.tsx`.

---

## Design Area 4 — Skip-to-Content Link

### Decision
Insert a visually-hidden skip link as the first child of the root wrapper `<div>` in `App.tsx`, targeting `id="main-content"` on the existing `<main>` element, using Tailwind's `sr-only` / `focus:not-sr-only` pattern with the project's existing `--border-focus` ring colour.

### Design

**`App.tsx` — changes:**

```tsx
// 1. Add skip link as first child of the root div:
<div className="min-h-screen flex flex-col ...">

  {/* Skip to content — visually hidden until focused */}
  <a
    href="#main-content"
    className={[
      // Visually hidden by default
      "sr-only",
      // Reveal on keyboard focus
      "focus:not-sr-only",
      "focus:absolute",
      "focus:top-4",
      "focus:left-1/2",
      "focus:-translate-x-1/2",
      "focus:z-[200]",
      "focus:px-5",
      "focus:py-2.5",
      "focus:rounded-lg",
      "focus:bg-theme-bg-secondary",
      "focus:text-theme-text-primary",
      "focus:text-sm",
      "focus:font-semibold",
      // Match project's existing focus ring via --border-focus var
      "focus:ring-2",
      "focus:ring-theme-border-focus",
      "focus:outline-none",
      "focus:shadow-theme-md",
    ].join(" ")}
  >
    {t("a11y.skipToContent")} {/* "Ir al contenido principal" / "Skip to main content" */}
  </a>

  {/* ... header ... */}

  {/* 2. Add id and tabIndex to main: */}
  <main
    id="main-content"
    tabIndex={-1}          // allows programmatic focus from skip link
    className="flex-1 flex flex-col w-full items-center gap-20 sm:gap-28 md:gap-40 px-4 sm:px-6 md:px-8 mb-12 relative outline-none"
    // outline-none suppresses the browser's default focus ring on the <main>
    // element itself — the skip link is the visible focus indicator
  >
```

**Translation keys to add (both locales):**

```json
// es/a11y.json  (new file)
{ "skipToContent": "Ir al contenido principal" }

// en/a11y.json  (new file)
{ "skipToContent": "Skip to main content" }
```

Import and merge them in `translation.ts` the same way all other namespace files are merged.

**:focus-visible note:** `index.css` has no explicit `:focus-visible` rule for links — only `--border-focus` is defined. `ring-theme-border-focus` maps to `rgb(74 127 167 / <alpha>)` in light mode and `rgb(179 207 229 / <alpha>)` in dark mode. This matches the visual language of the navbar focus targets, which use the same `--accent-blue` colour.

### Tradeoffs
- **Rejected — `position: absolute` always, opacity: 0/1:** Less robust; screen readers can still read zero-opacity text in some configurations. `sr-only` / `not-sr-only` is the WCAG-recommended technique.
- **Rejected — Placing skip link inside `<header>`:** The link must be the very first focusable element in the DOM, before the header, for it to be reachable as the first Tab stop.

### Dependencies
None for styling. Add two translation JSON files (`es/a11y.json`, `en/a11y.json`) and import them in `translation.ts`.

---

## Design Area 5 — StudiesCard Keyboard Navigation

### Decision
Replace the `onBlur + setTimeout` pattern with a `relatedTarget` container-blur check, add roving-tabindex keyboard navigation inside the dropdown, and manage focus return to the trigger button via a `useRef`.

### Design

**State and refs:**
```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false);
const [focusedIndex, setFocusedIndex] = useState<number>(-1);
const triggerRef = useRef<HTMLButtonElement>(null);
const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
const containerRef = useRef<HTMLDivElement>(null);
```

**Container blur handler (replaces `onBlur + setTimeout`):**
```tsx
const handleContainerBlur = (e: React.FocusEvent<HTMLDivElement>) => {
  // relatedTarget is the element receiving focus next.
  // If it's outside our container, close the menu.
  if (!containerRef.current?.contains(e.relatedTarget as Node)) {
    setIsMenuOpen(false);
    setFocusedIndex(-1);
  }
};
```

**Trigger button key handler:**
```tsx
const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    setIsMenuOpen(true);
    setFocusedIndex(0); // first item
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    setIsMenuOpen(true);
    setFocusedIndex(0);
  } else if (e.key === "Escape") {
    setIsMenuOpen(false);
    setFocusedIndex(-1);
  }
};
```

**Item key handler (attach to each `<a>`):**
```tsx
const handleItemKeyDown = (
  e: React.KeyboardEvent<HTMLAnchorElement>,
  index: number
) => {
  if (e.key === "ArrowDown") {
    e.preventDefault();
    const next = Math.min(index + 1, allCredentials.length - 1);
    setFocusedIndex(next);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (index === 0) {
      // Wrap back to trigger
      setIsMenuOpen(false);
      setFocusedIndex(-1);
      triggerRef.current?.focus();
    } else {
      setFocusedIndex(index - 1);
    }
  } else if (e.key === "Escape") {
    e.preventDefault();
    setIsMenuOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus(); // return focus to trigger
  } else if (e.key === "Tab") {
    // Natural tab closes the menu without stealing focus
    setIsMenuOpen(false);
    setFocusedIndex(-1);
  }
};
```

**Focus effect when `focusedIndex` changes:**
```tsx
useEffect(() => {
  if (isMenuOpen && focusedIndex >= 0) {
    itemRefs.current[focusedIndex]?.focus();
  }
}, [focusedIndex, isMenuOpen]);
```

**JSX structure — dropdown section:**
```tsx
<div
  ref={containerRef}
  className="relative"
  onBlur={handleContainerBlur}
>
  <button
    ref={triggerRef}
    onClick={() => {
      setIsMenuOpen(!isMenuOpen);
      if (!isMenuOpen) setFocusedIndex(0);
    }}
    onKeyDown={handleTriggerKeyDown}
    aria-haspopup="listbox"
    aria-expanded={isMenuOpen}
    className="group/btn inline-flex items-center gap-2 text-sm font-medium text-theme-text-primary transition-colors hover:text-theme-accent-blue outline-none focus-visible:ring-2 focus-visible:ring-theme-border-focus rounded"
  >
    <span>{t("studies.certificate")}s</span>
    <FiChevronDown className={`h-4 w-4 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`} />
  </button>

  <AnimatePresence>
    {isMenuOpen && (
      <motion.ul
        role="listbox"
        aria-label={t("studies.certificate")}
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="absolute bottom-full left-0 mb-2 w-48 rounded-lg border border-white/10 bg-theme-bg-secondary/95 backdrop-blur-xl shadow-xl p-1 flex flex-col gap-1 overflow-hidden z-50"
      >
        {allCredentials.map((cred, idx) => (
          <li key={idx} role="option" aria-selected={false}>
            <a
              ref={(el) => { itemRefs.current[idx] = el; }}
              href={cred.url}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={isMenuOpen ? 0 : -1}
              onKeyDown={(e) => handleItemKeyDown(e, idx)}
              className="flex items-center justify-between rounded-md px-3 py-3 text-sm text-theme-text-secondary hover:bg-white/5 hover:text-theme-text-primary transition-colors active:bg-white/10 outline-none focus-visible:ring-1 focus-visible:ring-theme-border-focus"
            >
              <span className="truncate">{cred.label || `${t("studies.certificate")} ${idx + 1}`}</span>
              <GoArrowUpRight className="h-3 w-3 opacity-50" />
            </a>
          </li>
        ))}
      </motion.ul>
    )}
  </AnimatePresence>
</div>
```

### Tradeoffs
- **Rejected — `onBlur + setTimeout(200)`:** Fragile; fails when focus moves to a non-focusable area (like the card backdrop), causing the menu to close unexpectedly on fast focus changes. `relatedTarget` is the ARIA-spec-correct approach.
- **Rejected — Full focus trap (e.g. `focus-trap-react`):** Overkill for a small dropdown. The roving-tabindex pattern with ArrowKey navigation is the correct composite widget pattern (ARIA Listbox). A full trap would prevent Tab from escaping the card, which is wrong UX for a non-modal dropdown.
- **Rejected — `aria-activedescendant` pattern:** Requires `role="combobox"` and more complex ARIA wiring. The `role="listbox"` + direct focus management is simpler and equally compliant for a static list of links.

### Dependencies
None.

---

## Design Area 6 — TechIcon Button Conversion

### Decision
Convert the outer `<div>` to a `<button type="button">`, merge mouse-hover and keyboard-focus into a single `isActive` state, set `aria-label={alt}` as the accessible name, and add `aria-describedby` pointing to the tooltip element.

### Design

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
  const [isActive, setIsActive] = useState(false); // covers hover + focus
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const tooltipId = useId(); // stable ID for aria-describedby

  return (
    <button
      type="button"
      aria-label={alt}                    // accessible name = tech name
      aria-describedby={isActive ? tooltipId : undefined}
      className="relative flex items-center justify-center group cursor-pointer
                 rounded-lg outline-none
                 focus-visible:ring-2 focus-visible:ring-theme-border-focus
                 focus-visible:ring-offset-1 focus-visible:ring-offset-theme-bg-primary"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
    >
      {/* Fixed-size container */}
      <div className={`relative ${h || "h-10 w-10 sm:h-11 sm:w-11 md:h-12 md:w-12"}`}>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        )}

        {!imageError && (
          <motion.img
            src={src}
            alt=""               // empty alt — button's aria-label is the accessible name
            aria-hidden="true"   // purely decorative within the labelled button
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
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-lg text-xs text-gray-600 dark:text-gray-300"
          >
            {alt.substring(0, 2)}
          </div>
        )}
      </div>

      {/* Tooltip — role="tooltip" wired via aria-describedby */}
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

      {/* Glow effect */}
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

**Key decisions:**
- `aria-label={alt}` on the button = the tech name (e.g. "TypeScript"). No `title` attribute needed.
- `alt=""` + `aria-hidden="true"` on the `<img>` avoids double-announcement (button label already describes it).
- `useId()` generates a stable unique ID for the tooltip's `aria-describedby` linkage — safe for concurrent React 19 mode.
- `focus-visible:ring-*` classes use `--border-focus` variable via `ring-theme-border-focus`, matching the design system.
- Remove `onClick` toggling `isHovered` — irrelevant now that the button semantics handle interaction. Mouse click on a button fires `focus` first anyway.

### Tradeoffs
- **Rejected — `role="button"` on `<div>`:** Valid but requires manual `tabIndex={0}`, manual `onKeyDown` for Enter/Space, and more effort to pass accessibility linting. Native `<button>` is always preferable.
- **Rejected — `title` attribute for accessible name:** Screen readers inconsistently expose `title` and it shows a browser-native tooltip that conflicts with the custom tooltip. `aria-label` is deterministic.
- **Rejected — Separate `isFocused` + `isHovered` state:** Creates four possible states (hover-only, focus-only, both, neither) with identical visual output. A single `isActive` boolean is semantically sufficient and avoids the race condition on `onBlur` → `onMouseLeave` ordering.

### Dependencies
`useId` is available in React 19 (also React 18+). No new packages.

---

## Design Area 7 — Cloudinary URL Transform Strategy

### Decision
Create `src/utils/cloudinary.ts` with a `cloudinaryOptimize()` function that uses a single regex to insert `f_auto,q_auto` (or `f_auto,q_auto:good`) between `/upload/` and the version segment, covering both versioned and non-versioned URL shapes.

### Design

**`src/utils/cloudinary.ts`:**

```ts
/**
 * Inserts Cloudinary auto-format and auto-quality transforms into an
 * existing upload URL, placing them after /upload/ and before the
 * optional version string (v{timestamp}).
 *
 * Input:  https://res.cloudinary.com/dttpgbmdx/image/upload/v1772760104/juan-link_kfglqp.jpg
 * Output: https://res.cloudinary.com/dttpgbmdx/image/upload/f_auto,q_auto/v1772760104/juan-link_kfglqp.jpg
 */
export function cloudinaryOptimize(
  url: string,
  options?: { quality?: "auto" | "good" }
): string {
  const q = options?.quality === "good" ? "q_auto:good" : "q_auto";
  const transform = `f_auto,${q}`;

  // Regex explanation:
  //   \/upload\/       — literal /upload/
  //   ((?:v\d+\/)?)   — capture group: optional version string "v123456789/"
  //
  // Replace with /upload/{transform}/{captured-version-or-empty}
  return url.replace(
    /\/upload\/((?:v\d+\/)?)/,
    `/upload/${transform}/$1`
  );
}
```

**Verification with actual project URL:**
```
Input:  .../upload/v1772760104/juan-link_kfglqp.jpg
Regex matches: /upload/ + capture "v1772760104/"
Output: .../upload/f_auto,q_auto/v1772760104/juan-link_kfglqp.jpg  ✓

Input (no version): .../upload/juan-link_kfglqp.jpg
Regex matches: /upload/ + capture ""
Output: .../upload/f_auto,q_auto/juan-link_kfglqp.jpg  ✓
```

**Call sites — `Hero.tsx`:**
```tsx
import { cloudinaryOptimize } from "../utils/cloudinary";

// Before:
src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1772760104/juan-link_kfglqp.jpg"

// After:
src={cloudinaryOptimize(
  "https://res.cloudinary.com/dttpgbmdx/image/upload/v1772760104/juan-link_kfglqp.jpg"
)}
```

**Call sites — any other component using Cloudinary URLs (Projects, etc.):**  
Same pattern. Pass the raw URL constant and wrap with `cloudinaryOptimize()`.  
For images where file size matters more than speed (thumbnails): use `{ quality: "good" }`.

**TypeScript:** All parameters are typed. Return type is `string`. No assertions needed.

### Tradeoffs
- **Rejected — String split approach (`url.split("/upload/")[0] + ...`):** Fails if `/upload/` appears elsewhere in the public_id path. The regex is more specific because it anchors to the structure.
- **Rejected — Cloudinary SDK:** Overkill for a static portfolio with two image URLs. A pure-function regex utility has zero runtime cost.

### Dependencies
None.

---

## Design Area 8 — CSS `--text-tertiary` Contrast Fix

### Decision
Change `--text-tertiary` in `:root` (light mode) from `74 127 167` to `61 110 147`, achieving a 5.2:1 contrast ratio against `--bg-primary: 246 250 253`, safely above the WCAG AA 4.5:1 threshold for normal text.

### Design

**Contrast calculation:**

Background `246 250 253` (#F6FAFD):
```
R_lin = ((246/255 + 0.055) / 1.055)^2.4 = 0.9217
G_lin = ((250/255 + 0.055) / 1.055)^2.4 = 0.9559
B_lin = ((253/255 + 0.055) / 1.055)^2.4 = 0.9823
L_bg  = 0.2126 × 0.9217 + 0.7152 × 0.9559 + 0.0722 × 0.9823 = 0.9505
```

Current text `74 127 167` (#4A7FA7):
```
R_lin = ((74/255  + 0.055) / 1.055)^2.4 = 0.06855
G_lin = ((127/255 + 0.055) / 1.055)^2.4 = 0.21220
B_lin = ((167/255 + 0.055) / 1.055)^2.4 = 0.38670
L_text = 0.2126 × 0.06855 + 0.7152 × 0.2122 + 0.0722 × 0.3867 = 0.1943
Contrast = (0.9505 + 0.05) / (0.1943 + 0.05) = 1.0005 / 0.2443 = 4.10:1  ✗ (below 4.5)
```

Fixed text `61 110 147` (#3D6E93):
```
R_lin = ((61/255  + 0.055) / 1.055)^2.4 = 0.04659
G_lin = ((110/255 + 0.055) / 1.055)^2.4 = 0.15570
B_lin = ((147/255 + 0.055) / 1.055)^2.4 = 0.29090
L_text = 0.2126 × 0.04659 + 0.7152 × 0.1557 + 0.0722 × 0.2909 = 0.1422
Contrast = (0.9505 + 0.05) / (0.1422 + 0.05) = 1.0005 / 0.1922 = 5.21:1  ✓
```

**CSS change in `src/index.css` — `:root` block only:**

```css
:root {
  /* ... existing vars ... */

  /* BEFORE: --text-tertiary: 74 127 167;  (4.1:1 against --bg-primary → fails AA) */
  /* AFTER:                                (5.2:1 → passes AA for normal text)     */
  --text-tertiary: 61 110 147; /* #3D6E93 */
}
```

**Dark mode:** The dark mode value for `--text-tertiary` is also `74 127 167` but the dark background is `10 25 49` (#0A1931). Contrast there:
```
L_bg_dark = 0.2126×(10/255 linearised) + ... ≈ 0.0065
Contrast = (0.1943 + 0.05) / (0.0065 + 0.05) = 0.2443 / 0.0565 = 4.32:1  ✗ (marginal)
```
Dark mode also fails. However, `--text-tertiary` in dark mode maps to `#4A7FA7` — the same value. Fix for dark mode:

```css
.dark {
  /* BEFORE: --text-tertiary: 74 127 167;  (4.3:1 against dark bg → marginal fail) */
  /* AFTER:                                                                         */
  --text-tertiary: 100 154 196; /* #649AC4 — 5.1:1 against #0A1931 */
}
```

Verification for `100 154 196` on `10 25 49`:
```
R_lin = ((100/255 + 0.055) / 1.055)^2.4 = 0.1329
G_lin = ((154/255 + 0.055) / 1.055)^2.4 = 0.3239
B_lin = ((196/255 + 0.055) / 1.055)^2.4 = 0.5775
L = 0.2126×0.1329 + 0.7152×0.3239 + 0.0722×0.5775 = 0.02824 + 0.23166 + 0.04170 = 0.3016
L_dark_bg ≈ 0.0065
Contrast = (0.3016 + 0.05) / (0.0065 + 0.05) = 0.3516 / 0.0565 = 6.22:1  ✓
```

Also update the `@media (prefers-color-scheme: dark)` block to match `.dark` values.

### Tradeoffs
- **Rejected — keeping `#4A7FA7` and adjusting backgrounds:** The background values are used across many elements; changing them creates cascading visual regressions. A targeted text colour change is surgical.
- **Rejected — bumping to navy `#1A3D63`:** Would pass contrast but loses the mid-tone role that `--text-tertiary` plays in the design (timestamps, labels). The `#3D6E93` fix preserves the visual character while meeting the standard.

### Dependencies
None. CSS-only change.

---

## Design Area 9 — Vercel Headers Config

### Decision
Extend the existing `vercel.json` with a `headers` array, preserving the existing `rewrites` block, targeting JS/CSS chunks, fonts, and images with immutable long cache and HTML with `no-cache`.

### Design

**Complete `vercel.json`:**

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
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.(?:woff2?|ttf|otf|eot)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)\\.(?:png|jpg|jpeg|gif|webp|svg|ico|avif)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/index.html",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, must-revalidate"
        }
      ]
    },
    {
      "source": "/",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "no-cache, must-revalidate"
        }
      ]
    }
  ]
}
```

**Rationale by route:**

| Pattern | Target | Cache policy | Why |
|---|---|---|---|
| `/assets/(.*)` | Vite's chunked JS/CSS output (Vite puts all chunks in `/assets/`) | `max-age=31536000, immutable` | Vite generates content-hash filenames; file never changes once deployed |
| `*.woff2?/ttf/...` | Font files (loaded via CSS `@font-face`) | `max-age=31536000, immutable` | Same hash guarantee; fonts never update in-place |
| `*.png/jpg/...` | Static images in `public/` | `max-age=31536000, immutable` | Same; Cloudinary images are external, not affected |
| `/index.html` + `/` | App shell | `no-cache, must-revalidate` | Must always re-validate so the browser fetches new chunk hashes on each deploy |

**Note on Vercel's default caching:** Vercel already sets aggressive caching on `/assets/` for the majority of cases, but making it explicit in `vercel.json` gives predictable behaviour across all deployment environments and prevents regressions if the Vercel platform default changes.

**`/download/` PDF files:** Not addressed here because PDFs update independently (e.g., new CV version) and should use a shorter TTL. Recommend a separate rule:
```json
{
  "source": "/download/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=86400" }
  ]
}
```
Add this as a follow-up task.

### Tradeoffs
- **Rejected — Setting headers in `vite.config.ts` preview mode only:** Preview headers don't affect the deployed Vercel build.
- **Rejected — Vercel dashboard UI:** Config-as-code in `vercel.json` is auditable, reproducible, and survives team member access changes.

### Dependencies
None. `vercel.json` is already present in the project root with the `rewrites` block.

---

## Implementation Order (Recommended)

1. **Area 3** (html[lang]) — 1-file change, zero risk, unblocks SEO/a11y audit immediately.
2. **Area 8** (contrast) — 2 CSS variable values, can be visually verified in seconds.
3. **Area 9** (Vercel headers) — `vercel.json` edit, deploy to see effect.
4. **Area 7** (Cloudinary util) — new utility file + call site in Hero.tsx.
5. **Area 4** (skip link) — App.tsx change + 2 translation files.
6. **Area 1** (useReducedMotion) — requires reading `usePerformance.ts` and touching Hero, App.
7. **Area 2** (carousel pause) — most complex animation change; depends on Area 1 being done first.
8. **Area 6** (TechIcon button) — component conversion with clear acceptance criteria.
9. **Area 5** (StudiesCard keyboard) — most complex state management change; validate last.

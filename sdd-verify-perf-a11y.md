# Verify Report: perf-a11y-remediation

**Project:** `/mnt/c/Users/juanc/Desktop/portfolio`  
**Stack:** Vite 6 + React 19 + TypeScript + Tailwind CSS 3 + framer-motion v12  
**Date:** 2026-06-19  
**Reviewer:** SDD verify subagent (fresh context)

---

## Summary

| Status  | Count |
|---------|-------|
| PASS    | 19    |
| PARTIAL | 2     |
| FAIL    | 0     |

All hard-requirement items either pass or have a clearly bounded partial gap. Two items require targeted fixes before this change can be considered fully closed.

---

## Results

---

### AC-4 — Google Fonts removed

**Status: PASS**

Evidence (`index.html`): No `fonts.googleapis.com` link present anywhere in `<head>`. Fonts are loaded via npm package in `main.tsx`:
```ts
import "@fontsource/sora/400.css";
import "@fontsource/sora/600.css";
import "@fontsource/sora/700.css";
import "@fontsource/sora/800.css";
```
No network request to Google Fonts will be made at runtime.

---

### AC-5 — Hero `<img>` fetchpriority + loading

**Status: PASS**

Evidence (`src/sections/Hero.tsx`):
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
Both `fetchpriority="high"` and `loading="eager"` are present. `decoding="sync"` is a bonus for first paint. TypeScript augmentation for `fetchpriority` is in `src/vite-env.d.ts`.

---

### AC-6 — Cloudinary URLs go through cloudinaryOptimize() or contain f_auto,q_auto

**Status: PARTIAL**

**What passes:**  
Hero.tsx hero image goes through `cloudinaryOptimize(..., { quality: "good" })`, producing `f_auto,q_auto:good` in the URL.

The preload link in `index.html` also already contains the transforms:
```html
href="https://res.cloudinary.com/.../upload/f_auto,q_auto:good/v1772760104/juan-link_kfglqp.jpg"
```

**What fails:**  
`src/common/Technologies.tsx` contains raw Cloudinary URLs passed directly as `src` props to `TechIcon` (which renders them as `<motion.img>`). None have `f_auto,q_auto`. Examples:

```ts
// Technologies.tsx — raw URLs, no optimization
src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1758482854/nextjs-icon-svgrepo-com_pkvcfh.png"  // Next.js
src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1745432721/react-query-seeklogo_axk8ly.png"    // TanStack
src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1745926364/nodejsicon_dioqsc.png"               // Node.js
// ...and ~20 more
```

`src/sections/Projects.tsx` also passes raw Cloudinary URLs as project card thumbnail `img` src:
```tsx
// Projects.tsx — raw thumbnail URLs, no cloudinaryOptimize()
img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1754500072/Screenshot_3_xi7may.png"
img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1758483307/Screenshot_1_hg1irr.png"
img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1764358463/dh-back-office_exhfx6.png"
// ...and more
```

These reach `ProjectCard.tsx` which renders them as `<motion.img src={img} ...>` with no transformation.

**Fix needed:** See "Issues requiring fix" section below.

---

### AC-7 — `<link rel="preload" as="image">` in `<head>`

**Status: PASS**

Evidence (`index.html`):
```html
<link
  rel="preload"
  as="image"
  href="https://res.cloudinary.com/dttpgbmdx/image/upload/f_auto,q_auto:good/v1772760104/juan-link_kfglqp.jpg"
  fetchpriority="high"
/>
```
Preload hint is present, URL already contains the Cloudinary transforms, and `fetchpriority="high"` reinforces priority. Matches the Hero img src post-optimization.

---

### AC-8 — No persistent `willChange: "transform"` on InfiniteCarousel motion container

**Status: PASS**

Evidence (`src/common/InfiniteCarousel.tsx`): The animated `motion.div` uses a `MotionValue` via `style={{ x }}` — no `willChange` property anywhere:
```tsx
<motion.div
  className="flex gap-5 sm:gap-6 md:gap-8 items-center"
  style={{ x }}
>
```

Note: `App.tsx` has `style={{ scaleX, willChange: "transform" }}` on the scroll-progress bar (`<motion.div className="absolute bottom-0 left-0 right-0 h-[2px]...">`). That element is **not** InfiniteCarousel; it is a persistent composite layer for the progress bar, which is an acceptable use. AC-8 scopes only to InfiniteCarousel.

---

### AC-9 — Reduced motion gate on all `repeat: Infinity` animations

**Status: PARTIAL**

**What passes:**

| Location | Animation | Gated with |
|---|---|---|
| Hero.tsx — ring 1 | `rotate: 360, repeat: Infinity` | `motionSafe(...)` ✓ |
| Hero.tsx — ring 2 | `rotate: -360, repeat: Infinity` | `motionSafe(...)` ✓ |
| Hero.tsx — glow | `scale/opacity loop, repeat: Infinity` | `motionSafe(...)` ✓ |
| InfiniteCarousel.tsx | imperative `animate(x, ..., { repeat: Infinity })` | `if (prefersReducedMotion) return;` ✓ |
| App.tsx SectionLoader | `rotate: 360, repeat: Infinity` | `motionSafe(...)` ✓ |
| Navbar.tsx — particle | `y/scale loop, repeat: Infinity` | `motionSafe(...)` ✓ |
| Footer.tsx — gradient span | `backgroundPosition, repeat: Infinity` | `motionSafe(...)` ✓ |
| Footer.tsx — particle 1 | `y/opacity loop, repeat: Infinity` | `motionSafe(...)` ✓ |
| Footer.tsx — particle 2 | `y/opacity loop, repeat: Infinity` | `motionSafe(...)` ✓ |

**What fails:**

`Hero.tsx` — bounce arrow wrapper `motion.div` has `repeat: Infinity` with **no** `motionSafe` gate and **no** `prefersReducedMotion` check:

```tsx
// Hero.tsx — ungated repeat: Infinity on scroll arrow
<motion.div
  initial={{ opacity: 0 }}
  animate={{
    opacity: 1,
    y: [0, 15, 0],       // <-- repeat: Infinity, NOT gated
  }}
  transition={{
    opacity: { delay: 1, duration: 0.5 },
    y: {
      repeat: Infinity,  // <-- plays regardless of prefers-reduced-motion
      duration: 2,
      ease: "easeInOut",
    },
  }}
  className="cursor-pointer absolute bottom-14 lg:bottom-12 z-10 mt-2 sm:mt-0"
>
```

**Additional observations (outside AC-9 scope, reported as notes):**

`Skills.tsx`, `Experience.tsx`, and `AboutMe.tsx` each have a section-icon animation with `repeat: Infinity` that is not gated by `motionSafe`. These are not in the AC-9 explicit check list, but they represent the same class of problem:

```tsx
// Skills.tsx — GiSkills icon, ungated
animate={{ rotate: [0, 15, -15, 15, 0], scale: [1, 1.1, 1, 1.1, 1] }}
transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}

// Experience.tsx — LiaSuitcaseSolid icon, ungated
animate={{ rotate: [0, -10, 10, -10, 0] }}
transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}

// AboutMe.tsx — FiUser icon, ungated
animate={{ rotate: [0, 10, -10, 10, 0] }}
transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}

// Projects.tsx — FiFolder icon, ungated
animate={{ rotate: [0, 10, -10, 10, 0] }}
transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
```

---

### AC-12 — `html[lang]` updated dynamically

**Status: PASS**

Evidence (`src/main.tsx`):
```ts
// Synchronous set before React mounts
const initialLang: string = i18n.language?.split("-")[0] || "es";
document.documentElement.lang = initialLang;

// Live update on language change
i18n.on("languageChanged", (lng: string) => {
  document.documentElement.lang = lng.split("-")[0];
});
```
Both the synchronous initial set and the event-driven update are present. Screen readers will see the correct `lang` on first paint and after language toggle.

---

### AC-13 / AC-14 — InfiniteCarousel pauses on hover and focus

**Status: PASS**

Evidence (`src/common/InfiniteCarousel.tsx`):
```tsx
<div
  className="relative w-full overflow-hidden py-4 md:py-7"
  role="region"
  aria-label={label}
  onMouseEnter={() => setPaused(true)}
  onMouseLeave={() => setPaused(false)}
  onFocus={() => setPaused(true)}
  onBlur={() => setPaused(false)}
>
```
Pause/resume is wired to both pointer and keyboard focus events. The `paused` state controls `animRef.current.pause()` / `.play()` without restarting the animation (no visual jump).

---

### AC-15 — Skip link + `<main id="main-content" tabIndex={-1}>`

**Status: PASS**

Evidence (`src/App.tsx`):
```tsx
{/* Skip link — first focusable child */}
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[200] ..."
>
  {t("skipToContent")}
</a>
```
```tsx
<main
  id="main-content"
  tabIndex={-1}
  className="flex-1 flex flex-col w-full items-center gap-20 ... outline-none"
>
```
Skip link is the first child in the DOM flow (before header/Navbar). `tabIndex={-1}` allows programmatic focus without appearing in tab order. `outline-none` on main suppresses the focus ring after programmatic skip. Translation keys confirmed in both `en/a11y.json` and `es/a11y.json`.

---

### AC-16 — Hamburger `aria-expanded` + `aria-controls="mobile-menu"`, Modal `id="mobile-menu"`

**Status: PASS**

Evidence (`src/layout/Navbar.tsx`):
```tsx
<motion.button
  key="menu-button"
  onClick={openModal}
  aria-label="Abrir menú"
  aria-expanded={menuOpen}
  aria-controls="mobile-menu"
  ...
>
```
```tsx
<Modal
  isOpen={menuOpen}
  onRequestClose={closeModal}
  contentLabel="Menú móvil"
  id="mobile-menu"
  ...
>
```
`aria-expanded` receives the live `menuOpen` boolean. `aria-controls` matches the Modal's `id`. `Modal.setAppElement("#root")` is set for react-modal.

---

### AC-17 — TechIcon is `<button type="button">` with `aria-label`, tooltip has `role="tooltip"`

**Status: PASS**

Evidence (`src/common/TechIcon.tsx`):
```tsx
<button
  type="button"
  aria-label={alt}
  aria-describedby={isActive ? tooltipId : undefined}
  className="relative flex items-center justify-center group cursor-pointer rounded-lg outline-none focus-visible:ring-2 ..."
  ...
>
```
```tsx
<motion.div
  id={tooltipId}
  role="tooltip"
  ...
>
```
`aria-describedby` is conditionally set to the tooltip's `id` only when visible, and unset when hidden — correct ARIA pattern. `useId()` generates a stable unique id per instance.

---

### AC-18 — `--text-tertiary` contrast values

**Status: PASS**

Evidence (`src/index.css`):

`:root` (light mode):
```css
--text-tertiary: 61 110 147; /* #3D6E93 — 5.2:1 contrast on #F6FAFD (AA ✓) */
```

`.dark` (dark mode):
```css
--text-tertiary: 100 154 196; /* #649AC4 — 6.2:1 contrast on #0A1931 (AA ✓) */
```
Both values match the spec exactly. Inline comments document the WCAG contrast ratios.

---

### AC-19 — Theme toggle has dynamic `aria-label`

**Status: PASS**

Evidence (`src/layout/Navbar.tsx`):
```tsx
<motion.button
  onClick={toggleDarkMode}
  ...
  aria-label={darkMode ? t("navbar.switchToLight") : t("navbar.switchToDark")}
>
```
The label is ternary-computed from `darkMode` state and i18n translation keys — not a static string. Both translation keys must exist in the `navbar` namespace (outside this AC's file-level verification but a risk to note).

---

### AC-20 — No heading levels skipped

**Status: PASS**

Verified heading hierarchy across all sections:

| Component | Heading | Level |
|---|---|---|
| Hero.tsx | "Juan Cruz Dauberte" | `h1` |
| Hero.tsx | `{t("home.titles")}` subtitle | `h2` |
| Experience.tsx | `{t("experience.title")}` | `h2` |
| Experience.tsx | Company names (e.g., "Dreamhouse Baradero") | `h3` |
| Projects.tsx | `{t("projectCard.title")}` | `h2` |
| ProjectCard.tsx | Project title | `h3` |
| ProjectCard.tsx | `{t("projectCard.technologies")}` | `h4` |
| AboutMe.tsx | `{t("about.title")}` | `h2` |
| AboutMe.tsx | `{t("about.titleStudies")}` | `h3` |
| Skills.tsx | `{t("skills.title")}` | `h2` |
| Skills.tsx | `{t("skills.softSkills.title")}` | `h3` |
| Skills.tsx | `{t("skills.techSkills.title")}` | `h3` |
| Technologies.tsx | "Front-End", "Back-End - BaaS", etc. | `h3` |

No levels are skipped. h1 → h2 → h3 → h4 chain is intact.

---

### AC-21 — All `<section>` elements have `aria-label`

**Status: PASS**

Evidence:

```tsx
// Skills.tsx
<section className="w-full max-w-5xl flex flex-col" aria-label="Skills">

// Experience.tsx
<section className="w-full max-w-5xl flex flex-col px-4 sm:px-6" aria-label="Experience">

// AboutMe.tsx
<section className="w-full max-w-6xl flex flex-col" aria-label="About me">

// Projects.tsx
<section className="w-full max-w-5xl flex flex-col gap-6 ..." aria-label="Projects">

// Technologies.tsx
<section className="flex flex-col gap-10" aria-label="Technologies">
```

All five specified sections carry `aria-label`. 

Note: `Hero.tsx`'s outer `<section>` does not have an `aria-label`, and the `<motion.section>` elements in `Footer.tsx` also lack labels — neither is in the AC-21 scope, but both warrant follow-up for full WCAG 2.4.6 compliance.

---

### AC-22 — Favicon `type="image/png"`

**Status: PASS**

Evidence (`index.html`):
```html
<link
  rel="icon"
  type="image/png"
  href="https://res.cloudinary.com/dttpgbmdx/image/upload/v1753756146/portfolio-icon_e1c2j0.png"
/>
```
`type="image/png"` is set. No `type="image/x-icon"` present.

---

### AC-EXTRA-1 — `motionSafe` exported from `usePerformance.ts`

**Status: PASS**

Evidence (`src/hooks/usePerformance.ts`):
```ts
export const motionSafe = <A extends object>(
  animate: A,
  transition: object,
  prefersReducedMotion: boolean
): { animate: any; transition: any } => {
  if (prefersReducedMotion) {
    return { animate: {}, transition: { duration: 0 } };
  }
  return { animate, transition };
};
```
Exported, typed, and correctly returns empty animate + zero-duration transition when motion is reduced.

---

### AC-EXTRA-2 — InfiniteCarousel uses `useMotionValue` + `AnimationPlaybackControls`

**Status: PASS**

Evidence (`src/common/InfiniteCarousel.tsx`):
```tsx
import { motion, useMotionValue, animate } from "framer-motion";
import type { AnimationPlaybackControls } from "framer-motion";

const x = useMotionValue(direction === "left" ? "0%" : "-50%");
const animRef = useRef<AnimationPlaybackControls | null>(null);

useEffect(() => {
  if (prefersReducedMotion) return;
  animRef.current = animate(
    x,
    direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
    { duration, repeat: Infinity, ease: "linear", repeatType: "loop" }
  );
  return () => { animRef.current?.stop(); };
}, [...]);
```
Full imperative pattern. No declarative `animate` prop on the motion container. `AnimationPlaybackControls` is properly typed and the ref holds pause/play/stop control.

---

### AC-EXTRA-3 — `@media (prefers-color-scheme: dark)` duplicate block removed

**Status: PASS**

Evidence (`src/index.css`): A full grep of the file reveals no `@media (prefers-color-scheme: dark)` block anywhere. Theme switching is done exclusively via the `.dark` class on `<html>`, which is the correct approach for a manual dark-mode toggle (class strategy). The `.dark {}` block is present and complete.

---

### AC-EXTRA-4 — StudiesCard dropdown accessibility

**Status: PASS**

Evidence (`src/common/StudiesCard.tsx`):

Trigger button:
```tsx
<button
  ref={triggerRef}
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  onKeyDown={handleTriggerKeyDown}
  aria-haspopup="listbox"
  aria-expanded={isMenuOpen}
  className="... focus-visible:ring-2 focus-visible:ring-theme-border-focus rounded"
>
```

Dropdown list:
```tsx
<motion.ul
  role="listbox"
  ...
>
  {allCredentials.map((cred, idx) => (
    <li key={idx} role="option" aria-selected={false}>
```

Keyboard handlers cover: `ArrowDown` (open + move down), `ArrowUp` (move up / return to trigger at top), `Enter`/`Space` (open), `Escape` (close + return focus), `Tab` (close). Focus is managed imperatively via `itemRefs` + `useEffect` responding to `focusedIndex` changes.

---

### AC-EXTRA-5 — TechIcon `<img>` has `alt=""` and `aria-hidden="true"`

**Status: PASS**

Evidence (`src/common/TechIcon.tsx`):
```tsx
<motion.img
  src={src}
  alt=""
  aria-hidden="true"
  className="..."
  loading="lazy"
  decoding="async"
  ...
/>
```
Decorative image is correctly hidden from the accessibility tree. The accessible name comes exclusively from the wrapping `<button aria-label={alt}>`.

---

## Issues Requiring Fix

### Issue 1 — AC-6 (PARTIAL): Raw Cloudinary URLs in Technologies.tsx and Projects.tsx

**Severity:** Medium (performance regression — no `f_auto,q_auto` means no WebP/AVIF conversion, no quality compression on ~30+ icons and 6 project thumbnails)

**File 1:** `src/common/Technologies.tsx`  
All `src:` values in `frontEndTechnologies`, `backEndTechnologies`, `dataAnalyticsTechnologies`, and `othersTechnologies` that point to `res.cloudinary.com` are raw URLs without transforms. They are passed to `TechIcon` → `<motion.img src={src}>`.

**Fix:** Wrap every Cloudinary URL in `cloudinaryOptimize()` at the point of definition, or call `cloudinaryOptimize` inside `TechIcon.tsx` when the src contains `res.cloudinary.com`. The inline approach is simpler:

```ts
// Before (Technologies.tsx)
src: "https://res.cloudinary.com/dttpgbmdx/image/upload/v1758482854/nextjs-icon-svgrepo-com_pkvcfh.png"

// After
import { cloudinaryOptimize } from "../utils/cloudinary";
src: cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1758482854/nextjs-icon-svgrepo-com_pkvcfh.png")
```

**File 2:** `src/sections/Projects.tsx`  
All `img="https://res.cloudinary.com/..."` props on `<ProjectCard>` are raw. Fix by wrapping each with `cloudinaryOptimize()`:

```tsx
// Before
img="https://res.cloudinary.com/dttpgbmdx/image/upload/v1754500072/Screenshot_3_xi7may.png"

// After
img={cloudinaryOptimize("https://res.cloudinary.com/dttpgbmdx/image/upload/v1754500072/Screenshot_3_xi7may.png")}
```

---

### Issue 2 — AC-9 (PARTIAL): Bounce arrow in Hero.tsx not gated by `prefersReducedMotion`

**Severity:** Medium (WCAG 2.3.3 — animated UI visible for more than 5 seconds without user control)

**File:** `src/sections/Hero.tsx`  
The parent `motion.div` of the scroll-down arrow uses `repeat: Infinity` with no `motionSafe` wrapper and no conditional check:

```tsx
// Current — ungated
<motion.div
  initial={{ opacity: 0 }}
  animate={{
    opacity: 1,
    y: [0, 15, 0],
  }}
  transition={{
    opacity: { delay: 1, duration: 0.5 },
    y: {
      repeat: Infinity,   // plays regardless of prefers-reduced-motion
      duration: 2,
      ease: "easeInOut",
    },
  }}
  ...
>
```

**Fix:** Add `prefersReducedMotion` guard. The `y` animation must only run when motion is safe; `opacity` can still animate once:

```tsx
// Fixed — gate the y bounce
const prefersReducedMotion = useReducedMotion(); // already declared in component

<motion.div
  initial={{ opacity: 0 }}
  animate={{
    opacity: 1,
    ...(prefersReducedMotion ? {} : { y: [0, 15, 0] }),
  }}
  transition={{
    opacity: { delay: 1, duration: 0.5 },
    ...(prefersReducedMotion
      ? {}
      : { y: { repeat: Infinity, duration: 2, ease: "easeInOut" } }),
  }}
  ...
>
```

---

## Additional Notes (not blocking ACs, but worth tracking)

1. **Section icon animations not gated** (`Skills.tsx`, `Experience.tsx`, `AboutMe.tsx`, `Projects.tsx`): Each section header icon has `animate={{ rotate/scale }}` with `repeat: Infinity, repeatDelay: 5` not wrapped with `motionSafe`. These are outside AC-9's explicit scope but represent the same WCAG 2.3.3 exposure. `repeatDelay: 5` keeps them off-screen most of the time, reducing severity, but they should be gated for full compliance.

2. **`Hero.tsx` outer `<section>` missing `aria-label`**: The outermost `<section className="w-full min-h-dvh...">` has no `aria-label` attribute. AC-21 only checks 5 specific sections, but the Hero section is a landmark that screen readers will encounter.

3. **`Footer.tsx` `<motion.section>` elements missing `aria-label`**: Three `<motion.section>` elements in Footer have no labels. They are functional sub-sections but would be announced by screen readers as unlabeled regions.

4. **`ProjectCard.tsx` `willChange: isHovered ? "transform" : "auto"`**: This is a smart conditional `willChange` applied to promote the card only during hover. It is not persistent and does not violate AC-8. Acceptable pattern.

5. **`vercel.json` caching headers**: Cloudinary CDN images are served from `res.cloudinary.com`, not `/assets/`, so the Vercel cache headers won't apply to them. This is expected behavior — Cloudinary's own CDN handles caching for those assets. No action needed.

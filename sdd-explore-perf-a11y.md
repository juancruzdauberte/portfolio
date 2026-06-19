# SDD Explore: Performance & Accessibility Audit
**Project:** Juan Cruz Dauberte – Portfolio  
**Stack:** Vite 6 + React 19 + TypeScript + Tailwind CSS 3  
**Date:** 2026-06-19  
**Auditor:** Research subagent (el Gentleman harness)

---

## PERFORMANCE FINDINGS

### Bundle Size

---

**[P-1] 5 Google Fonts families loaded — only 1 is used** — severity: **high**

- **File:** `index.html`
- **Evidence:**
  ```html
  href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@...
  &family=Quicksand:wght@...
  &family=Raleway:ital,wght@...
  &family=Red+Hat+Display:ital,wght@...
  &family=Sora:wght@100..800&display=swap"
  ```
  `index.css` defines: `font-family: "Sora", system-ui, -apple-system, sans-serif;`  
  Only **Sora** is ever declared as a font-family in the stylesheet. The other 4 families are downloaded but never applied.
- **Estimated impact:** Each variable font family can be 50–120 KB compressed. 4 unused families ≈ **200–450 KB** of wasted font bytes. Also delays FCP via blocked render path.

---

**[P-2] `chunkSizeWarningLimit` set to 1000 KB — masks oversized chunks** — severity: **medium**

- **File:** `vite.config.ts`
- **Evidence:**
  ```ts
  chunkSizeWarningLimit: 1000,
  ```
  The default Vite warning threshold is 500 KB. Raising it to 1000 KB silences warnings that would otherwise flag the `icons` chunk (which bundles `react-icons` sub-packages).
- **Estimated impact:** No direct runtime cost, but hides bundle budget violations that affect TBT and TTI.

---

**[P-3] `react-icons` chunk contains multiple sub-package imports** — severity: **medium**

- **Files:** `src/sections/Projects.tsx`, `src/layout/Navbar.tsx`, `src/layout/Footer.tsx`, `src/sections/Hero.tsx`, `src/sections/Experience.tsx`, `src/common/StudiesCard.tsx`
- **Evidence:**
  ```ts
  // Projects.tsx — imports from 5 different react-icons sub-packages
  import { RiTailwindCssFill, RiNextjsFill } from "react-icons/ri";
  import { SiReactquery, SiTypescript, SiExpress, ... } from "react-icons/si";
  import { TbBrandOauth } from "react-icons/tb";
  import { FaReact } from "react-icons/fa";
  ```
  `vite.config.ts` places all react-icons in a single `icons` chunk. Tree-shaking works per sub-package, but each sub-package (si, ri, fa, tb, etc.) has its own module overhead.
- **Estimated impact:** Moderate TBT/TTI cost from parsing the aggregated icons chunk.

---

### Image Optimization

---

**[P-4] LCP image has no `fetchpriority`, no Cloudinary transformations, and missing width/height** — severity: **critical**

- **File:** `src/sections/Hero.tsx`
- **Evidence:**
  ```tsx
  <img
    src="https://res.cloudinary.com/dttpgbmdx/image/upload/v1772760104/juan-link_kfglqp.jpg"
    alt="Foto de perfil de Juan Cruz"
    className="object-cover w-full h-full"
  />
  ```
  - No `fetchpriority="high"` — browser deprioritizes this image during discovery.
  - No Cloudinary transformation parameters: the URL lacks `/f_auto,q_auto,w_224/` or similar. The original JPG is served at full resolution/quality.
  - No `width`/`height` attributes — CLS potential before image loads, though the outer div has fixed CSS sizing which partially mitigates it.
  - No `<picture>` with AVIF/WebP sources.
- **Estimated impact:** This is almost certainly the **LCP element**. Lack of `fetchpriority="high"` and full-resolution JPG delivery directly harm LCP. CLS risk if the fixed-div approach fails at unusual viewport sizes.

---

**[P-5] All Cloudinary images served without format/quality transformations** — severity: **high**

- **Files:** `src/common/Technologies.tsx`, `src/common/ProjectCard.tsx`, `src/sections/AboutMe.tsx`
- **Evidence (examples):**
  ```ts
  // Technologies.tsx — 40+ Cloudinary URLs, none with f_auto or q_auto
  "https://res.cloudinary.com/dttpgbmdx/image/upload/v1758482854/nextjs-icon-svgrepo-com_pkvcfh.png"
  "https://res.cloudinary.com/dttpgbmdx/image/upload/v1745432721/react-query-seeklogo_axk8ly.png"
  
  // ProjectCard images in Projects.tsx
  "https://res.cloudinary.com/dttpgbmdx/image/upload/v1754500072/Screenshot_3_xi7may.png"
  ```
  Cloudinary supports automatic format selection (`f_auto`) and quality compression (`q_auto`) via URL parameters. Zero URLs use them.
- **Estimated impact:** PNG screenshots can easily be 500 KB–2 MB unoptimized. WebP/AVIF would save 30–80%. Directly affects LCP for project section and carousel load times.

---

**[P-6] Favicon loaded from remote Cloudinary CDN with wrong MIME type** — severity: **low**

- **File:** `index.html`
- **Evidence:**
  ```html
  <link rel="icon" type="ico"
    href="https://res.cloudinary.com/dttpgbmdx/image/upload/v1753756146/portfolio-icon_e1c2j0.png"
  />
  ```
  - `type="ico"` is not a valid MIME type; correct is `type="image/x-icon"` for ICO or `type="image/png"` for PNG.
  - Remote favicon adds a cross-origin DNS lookup to `res.cloudinary.com` on every first load.
- **Estimated impact:** Extra DNS lookup. Incorrect MIME type may cause some browsers to ignore it.

---

### Runtime Performance

---

**[P-7] `useReducedMotion` hook defined but never consumed — framer-motion animations always run** — severity: **high**

- **Files:** `src/hooks/usePerformance.ts`, `src/sections/Hero.tsx`, `src/common/InfiniteCarousel.tsx`, `src/sections/Experience.tsx`, `src/layout/Footer.tsx`
- **Evidence:**
  `usePerformance.ts` exports `useReducedMotion()`, but searching all component files reveals **zero imports** of this hook.
  
  Hero.tsx runs these unconditionally:
  ```tsx
  // Two permanently rotating rings
  animate={{ rotate: 360 }}
  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
  
  animate={{ rotate: -360 }}
  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
  
  // Permanently pulsing glow
  animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
  transition={{ duration: 3, repeat: Infinity }}
  
  // Bouncing arrow
  animate={{ opacity: 1, y: [0, 15, 0] }}
  transition={{ y: { repeat: Infinity, duration: 2 } }}
  ```
  
  InfiniteCarousel.tsx:
  ```tsx
  animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
  transition={{ duration: duration, repeat: Infinity, ease: "linear" }}
  ```
  
  The `index.css` `prefers-reduced-motion` block correctly overrides CSS `animation-duration`, but **framer-motion `animate` props bypass CSS animations entirely** — they run via JS/WAAPI and are unaffected by the CSS media query rule.

- **Estimated impact:** On reduced-motion devices, all animations still fire. This is an accessibility violation (see A-12) and a performance issue: persistent `repeat: Infinity` animations keep the compositor busy.

---

**[P-8] 4 InfiniteCarousel instances each double-render all icons** — severity: **medium**

- **File:** `src/common/InfiniteCarousel.tsx`, `src/common/TechIcon.tsx`
- **Evidence:**
  ```tsx
  {/* Primera copia de las tecnologías */}
  {technologies.map((tech, index) => (
    <div key={`tech-1-${index}`}><TechIcon .../></div>
  ))}
  {/* Segunda copia para el loop infinito */}
  {technologies.map((tech, index) => (
    <div key={`tech-2-${index}`}><TechIcon .../></div>
  ))}
  ```
  `backEndTechnologies` has **15 entries** × 2 copies = **30 TechIcon instances** in that carousel alone.  
  Each `TechIcon` mounts 3 `useState` hooks + `AnimatePresence` + 2 framer-motion components.  
  4 carousels total: 9+9 + 15+15 + 9+9 + 7+7 = **110 TechIcon instances** simultaneously mounted.
- **Estimated impact:** 110 React component instances with persistent framer-motion subscriptions. Increases memory usage and JS heap. Contributes to TBT during initial mount.

---

**[P-9] Unthrottled `scroll` event listeners in Navbar and SmoothScrollLink** — severity: **medium**

- **Files:** `src/layout/Navbar.tsx`, `src/common/SmoothScrollLink.tsx`
- **Evidence:**
  ```ts
  // Navbar.tsx — fires on every scroll event
  window.addEventListener("scroll", handleScroll);
  
  // SmoothScrollLink.tsx — fires on every scroll event
  window.addEventListener("scroll", handleScroll);
  ```
  Neither listener uses debounce, throttle, or `requestAnimationFrame`. `handleScroll` in Navbar iterates through 5 DOM queries (`document.getElementById`) on every scroll frame.
- **Estimated impact:** Scroll-jank risk. On 60fps scroll, 60 DOM queries/second × 5 `getElementById` calls each = 300 DOM reads/second. INP/TBT sensitive.

---

**[P-10] Multiple persistent `will-change` declarations on simultaneously active elements** — severity: **medium**

- **File:** `src/index.css`
- **Evidence:**
  ```css
  .animate-shine        { will-change: background-position; }
  .animate-pulse-soft   { will-change: opacity; }
  .animate-float        { will-change: transform; }
  .animate-rotate-slow  { will-change: transform; }
  .animate-scale-pulse  { will-change: transform; }
  .animate-gradient-shift { will-change: background-position; }
  .animate-glow         { will-change: box-shadow; }
  ```
  Additionally, `InfiniteCarousel` inline style sets `willChange: "transform"` permanently on the motion div (not conditionally on hover).  
  `will-change` forces GPU layer promotion. Promoting many layers simultaneously consumes VRAM and can cause composite/paint storms.
- **Estimated impact:** Elevated GPU memory usage, potential jank on low-end mobile.

---

**[P-11] `console.log` calls left in production utility** — severity: **low**

- **File:** `src/utils/scrollUtils.ts`
- **Evidence:**
  ```ts
  console.log(`[scrollToSection] Attempting to scroll to: ${sectionId}`);
  console.log(`[scrollToSection] Attempt ${retries + 1}/${maxRetries}, element:`, element);
  console.log(`[scrollToSection] Element found! Attempting scroll...`);
  console.error(`[scrollToSection] Could not find element...`);
  console.log("[scrollToSection] Available IDs:", Array.from(...));
  ```
  `vite.config.ts` has `drop_console: true` ✓ for production builds, so these are stripped in prod. However they clutter development, and the `Array.from(document.querySelectorAll("[id]"))` call on error is a full DOM scan.
- **Estimated impact:** No production cost. Noise in dev, potential confusion about missing elements.

---

### Loading Strategy

---

**[P-12] Google Fonts loaded as render-blocking stylesheet** — severity: **high**

- **File:** `index.html`
- **Evidence:**
  ```html
  <link href="https://fonts.googleapis.com/css2?family=Nunito:...&display=swap" rel="stylesheet" />
  ```
  The standard `rel="stylesheet"` link is parser-blocking. The browser must wait for the CSS response before continuing to parse HTML and render content. The `display=swap` only prevents FOIT after the font loads; it does not prevent the request from blocking the render path.
- **Estimated impact:** Delays FCP. The `preconnect` hints to `fonts.googleapis.com` and `fonts.gstatic.com` partially mitigate but don't eliminate the render-block.

---

**[P-13] No `<link rel="preload">` for the LCP hero image** — severity: **high**

- **File:** `index.html`, `src/sections/Hero.tsx`
- **Evidence:**
  The `<head>` of `index.html` contains no preload hints for images. The hero profile image is a cross-origin Cloudinary resource that the browser won't discover until React has executed and rendered `Hero.tsx`.
- **Estimated impact:** Browser discovers the LCP image late in the waterfall (after JS parse → React render → DOM insertion). This directly increases LCP by hundreds of milliseconds.

---

### CSS / Render Blocking

---

**[P-14] Dark mode CSS variables triple-defined — significant CSS bloat** — severity: **medium**

- **File:** `src/index.css`
- **Evidence:**
  The dark mode color variables are defined in **three separate blocks**:
  1. `.dark { ... }` — explicit class override (~50 custom property declarations)
  2. `@media (prefers-color-scheme: dark) { :root:not(.light) { ... } }` — system preference override (same ~50 declarations duplicated verbatim)
  3. `tailwind.config.js` uses `darkMode: "class"` — meaning the system-preference media query block is technically redundant since the class already handles it, and `ThemeContext.tsx` correctly syncs the class to system preference.
  
  Result: the identical 50 CSS custom property declarations appear **twice** in the compiled CSS.
- **Estimated impact:** ~3–5 KB of redundant CSS. Minor render-blocking contribution.

---

## ACCESSIBILITY FINDINGS

### Perceivable (WCAG Principle 1)

---

**[A-1] `html[lang]` attribute never updated when language changes** — WCAG 3.1.1 (Language of Page) — severity: **critical**

- **Files:** `index.html`, `src/common/LanguageSelector.tsx`, `src/context/ThemeContext.tsx`
- **Evidence:**
  ```html
  <!-- index.html — hardcoded, never changed -->
  <html lang="en">
  ```
  ```tsx
  // LanguageSelector.tsx — only updates i18n, not the DOM lang attribute
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    // ← no: document.documentElement.lang = lng;
  };
  ```
  When the user switches to Spanish, all content is rendered in Spanish but `<html lang="en">` persists. Screen readers use `lang` to select the correct pronunciation engine. Spanish content read with English phonetics is severely distorted.
- **WCAG level:** A (must-fix).

---

**[A-2] Color contrast failure: `--text-tertiary` in light mode** — WCAG 1.4.3 (Contrast Minimum) — severity: **serious**

- **File:** `src/index.css`
- **Evidence:**
  ```css
  /* Light mode */
  --text-tertiary: 74 127 167;  /* #4A7FA7 */
  --bg-primary:   246 250 253;  /* #F6FAFD */
  ```
  Calculated contrast ratio: **~3.85:1** (below the AA threshold of 4.5:1 for normal text ≤18px / ≤14px bold).  
  This color is applied via `text-theme-text-tertiary` / `text-theme-accent-blue` throughout the app — including decorative date badges in `StudiesCard.tsx` and muted descriptions.
  
  Additional failure: `--text-muted: 179 207 229` (#B3CFE5) in light mode against `--bg-primary: 246 250 253` (#F6FAFD) yields a contrast of approximately **1.53:1** — critically insufficient, though this token is primarily used for decorative purposes.
- **WCAG level:** AA (serious).

---

**[A-3] Decorative animated rings in Hero missing `aria-hidden`** — WCAG 1.1.1 (Non-text Content) — severity: **minor**

- **File:** `src/sections/Hero.tsx`
- **Evidence:**
  ```tsx
  {/* Anillo animado con colores de tema */}
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    className="absolute inset-0 border-2 border-transparent border-t-theme-accent-blue ..."
  />
  <motion.div ... className="absolute inset-0 border-2 border-transparent ..." />
  <motion.div ... className="absolute inset-0 bg-theme-accent-blue/30 rounded-full blur-2xl" />
  ```
  Three purely decorative `div` elements lack `aria-hidden="true"`. While `div` elements don't have an implicit ARIA role, some AT implementations traverse all elements. `aria-hidden` explicitly removes them from the accessibility tree.
- **WCAG level:** A (minor in practice, but clean to fix).

---

**[A-4] Tech icons in ProjectCard have no accessible names** — WCAG 1.1.1 (Non-text Content) — severity: **moderate**

- **Files:** `src/sections/Projects.tsx`, `src/common/ProjectCard.tsx`
- **Evidence:**
  ```tsx
  // Projects.tsx — icons passed as raw JSX, no accessible label
  technologies={[
    <SiNodedotjs className="text-green-500" />,
    <SiMysql />,
    <SiTypescript className="text-typescript" />,
    // ...
  ]}
  
  // ProjectCard.tsx — rendered inside a motion.span with no aria-label
  {technologies.map((TechIcon, index) => (
    <motion.span key={index} ...>
      {TechIcon}  // ← no aria-label, no title, no visually-hidden text
    </motion.span>
  ))}
  ```
  A screen reader user sees "Technologies:" followed by a list of unlabeled interactive-looking elements. The icon SVGs from `react-icons` don't have accessible names by default.
- **WCAG level:** A (moderate — technology names are meaningful content).

---

### Operable (WCAG Principle 2)

---

**[A-5] `TechIcon` is a non-interactive div with click/hover but no keyboard support** — WCAG 2.1.1 (Keyboard) — severity: **serious**

- **File:** `src/common/TechIcon.tsx`
- **Evidence:**
  ```tsx
  <div
    className="relative flex items-center justify-center cursor-pointer group"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onClick={() => setIsHovered(!isHovered)}  // ← no onKeyDown
    // ← no role="button", no tabIndex
  >
  ```
  The tooltip (which shows the technology name) is the only place where icon names are revealed. Keyboard users cannot focus the element, cannot trigger it with Enter/Space, and therefore cannot discover the technology names via the tooltip.
- **WCAG level:** A (serious).

---

**[A-6] InfiniteCarousel has no pause mechanism — auto-playing indefinitely** — WCAG 2.2.2 (Pause, Stop, Hide) — severity: **serious**

- **File:** `src/common/InfiniteCarousel.tsx`
- **Evidence:**
  ```tsx
  <motion.div
    animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
    transition={{
      duration: duration,  // 15–30 seconds
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    }}
  >
  ```
  Four carousels auto-scroll indefinitely. WCAG 2.2.2 (Level A) requires that any moving content that (a) starts automatically, (b) lasts more than 5 seconds, and (c) is presented in parallel with other content must have a mechanism to pause, stop, or hide it.
- **WCAG level:** A (serious).

---

**[A-7] No skip-to-content link** — WCAG 2.4.1 (Bypass Blocks) — severity: **serious**

- **File:** `index.html`, `src/App.tsx`
- **Evidence:**
  Neither `index.html` nor `App.tsx` renders a skip link. Keyboard users must tab through the entire Navbar (4 nav buttons + theme toggle + 2 language buttons = 7+ focusable items) before reaching the Hero section on every load.
- **WCAG level:** A (serious).

---

**[A-8] Mobile menu button missing `aria-expanded` state** — WCAG 4.1.2 (Name, Role, Value) — severity: **serious**

- **File:** `src/layout/Navbar.tsx`
- **Evidence:**
  ```tsx
  <motion.button
    key="menu-button"
    onClick={openModal}
    className="md:hidden absolute left-2 z-50 ..."
    aria-label="Abrir menú"
    // ← missing: aria-expanded={menuOpen}
    // ← missing: aria-controls="mobile-menu"
  >
    <HiMiniBars3 className="text-2xl" />
  </motion.button>
  ```
  Screen readers cannot announce that the button controls a menu or whether it is currently expanded. When the modal opens, there is no programmatic association between the trigger button and the modal content.
- **WCAG level:** A (serious).

---

**[A-9] framer-motion `Infinity` animations not gated by `prefers-reduced-motion`** — WCAG 2.3.3 / 2.2.2 — severity: **serious**

- **Files:** `src/sections/Hero.tsx`, `src/common/InfiniteCarousel.tsx`, `src/sections/Experience.tsx`, `src/layout/Footer.tsx`
- **Evidence:**
  `src/hooks/usePerformance.ts` exports:
  ```ts
  export const useReducedMotion = () => { ... };
  ```
  No component file imports `useReducedMotion`. The `index.css` block:
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      /* ... */
    }
  }
  ```
  This block correctly overrides CSS `animation` and `transition` properties. **However, framer-motion animations use the Web Animations API / JS-driven rAF loop — they are not CSS animations.** The media query rule has zero effect on framer-motion `animate` props. Users with vestibular disorders who have `prefers-reduced-motion: reduce` enabled will still see all spinning rings, scrolling carousels, and pulsing glow effects.
- **WCAG level:** AAA for 2.3.3; A for 2.2.2 (pause/stop).

---

**[A-10] Theme toggle `aria-label` is static — doesn't describe action or state** — WCAG 4.1.2 — severity: **minor**

- **File:** `src/layout/Navbar.tsx`
- **Evidence:**
  ```tsx
  <motion.button
    onClick={toggleDarkMode}
    aria-label="Cambiar tema"  // ← static, never updates
  >
    {darkMode ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
  </motion.button>
  ```
  The label "Cambiar tema" (Change theme) doesn't communicate the current state or what the action will do. Best practice: `aria-label={darkMode ? "Activar modo claro" : "Activar modo oscuro"}` (or `aria-pressed` with a consistent label).
- **WCAG level:** AA (minor).

---

### Understandable (WCAG Principle 3)

---

**[A-11] Heading hierarchy has gaps and misuses `<p>` as headings** — WCAG 1.3.1 (Info and Relationships) — severity: **moderate**

- **Files:** `src/sections/Skills.tsx`, `src/sections/AboutMe.tsx`, `src/common/Technologies.tsx`
- **Evidence:**
  ```tsx
  // Skills.tsx — main section title uses h5 (should be h3 or h2)
  <h5 className="text-xl sm:text-2xl md:text-3xl font-bold ...">
    {t("skills.title")}
  </h5>
  
  // AboutMe.tsx — jumps h3 → h5, skipping h4
  <h3>About Me</h3>        // section title
  <h5>Studies</h5>         // subsection title — skips h4
  
  // Technologies.tsx — uses <p> for carousel section labels (not a heading)
  <p className="font-semibold text-lg ...">Front-End</p>
  <p className="font-semibold text-lg ...">Back-End - BaaS</p>
  
  // Skills.tsx — uses <motion.p> styled as heading for "Tech Skills" title
  <motion.p className="text-lg sm:text-xl md:text-2xl font-semibold ...">
    {t("skills.techSkills.title")}
  </motion.p>
  ```
  Screen reader users navigating by headings will find an inconsistent hierarchy and miss "Front-End", "Back-End - BaaS", and "Tech Skills" as navigable landmarks.
- **WCAG level:** A (moderate).

---

**[A-12] `<section>` elements used as generic layout containers without accessible names** — WCAG 1.3.1, 2.4.6 — severity: **moderate**

- **Files:** `src/sections/Skills.tsx`, `src/sections/Experience.tsx`, `src/sections/AboutMe.tsx`, `src/sections/Hero.tsx`
- **Evidence:**
  ```tsx
  // Skills.tsx — three nested <motion.section> without aria-label
  <motion.section variants={titleVariants} ...>  // title area
  <motion.section variants={containerVariants} ...>  // container
    <motion.section variants={itemVariants} ...>  // soft skills
    <motion.section variants={itemVariants} ...>  // tech skills
  
  // Hero.tsx — outer <section> + inner <motion.section>
  <section className="w-full min-h-dvh ...">
    <motion.section ...>
  ```
  `<section>` is a landmark element. Screen readers list landmarks for navigation. Multiple unlabeled `<section>` elements produce duplicate, unnamed "region" landmarks that confuse AT users. Layout containers should be `<div>`.
- **WCAG level:** A/AA (moderate).

---

### Robust (WCAG Principle 4)

---

**[A-13] StudiesCard credential dropdown lacks ARIA roles and keyboard navigation** — WCAG 4.1.2 — severity: **moderate**

- **File:** `src/common/StudiesCard.tsx`
- **Evidence:**
  ```tsx
  <button
    onClick={() => setIsMenuOpen(!isMenuOpen)}
    onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}  // unreliable
    className="... outline-none"  // ← removes focus ring
  >
    <span>{t("studies.certificate")}s</span>
    <FiChevronDown />
  </button>
  
  {isMenuOpen && (
    <motion.div
      // ← no role="menu", no aria-orientation, no id for aria-controls
      className="absolute bottom-full ..."
    >
      {allCredentials.map((cred, idx) => (
        <a
          // ← no role="menuitem", no onKeyDown for arrow navigation
          href={cred.url} ...
        >
  ```
  Issues: (1) `outline-none` removes focus indicator; (2) no `role="menu"` on dropdown container; (3) no `role="menuitem"` on links; (4) no keyboard navigation (Arrow keys, Escape to close); (5) `onBlur + setTimeout` is an unreliable focus-trap pattern that can fail on keyboard Tab events.
- **WCAG level:** A/AA (moderate).

---

**[A-14] `<html lang>` fixed at "en" conflicts with multi-language app** — WCAG 3.1.1 — severity: **critical** *(see A-1 — listed here again under Robust for cross-reference)*

---

## FILE MAP

| File | Relevant to | Issues found (IDs) |
|------|-------------|-------------------|
| `index.html` | Loading strategy, fonts, meta | P-1, P-3 (fonts), P-6 (favicon), P-12, P-13, A-1 |
| `vite.config.ts` | Bundle size | P-2, P-3 |
| `src/index.css` | CSS perf, will-change, contrast | P-10, P-14, A-2 |
| `tailwind.config.js` | Bundle size, config | P-14 |
| `src/main.tsx` | App entry | — |
| `src/App.tsx` | Loading strategy, landmarks | A-7, A-12 |
| `src/sections/Hero.tsx` | LCP image, animations, headings | P-4, P-7, P-13, A-3, A-9 |
| `src/sections/Skills.tsx` | Headings, landmarks | A-11, A-12 |
| `src/sections/AboutMe.tsx` | Headings, landmarks | A-11, A-12 |
| `src/sections/Projects.tsx` | Image optimization, icon labels | P-5, A-4 |
| `src/sections/Experience.tsx` | Animations, landmarks | P-7, A-9, A-12 |
| `src/common/InfiniteCarousel.tsx` | Runtime perf, pause, reduced motion | P-7, P-8, P-10, A-6, A-9 |
| `src/common/TechIcon.tsx` | Runtime perf, keyboard | P-8, A-5 |
| `src/common/Technologies.tsx` | Images, headings, carousel width | P-5, P-8, A-11 |
| `src/common/ProjectCard.tsx` | Images, icon labels | P-5, A-4 |
| `src/common/StudiesCard.tsx` | Dropdown ARIA, focus ring | A-13 |
| `src/common/SmoothScrollLink.tsx` | Scroll perf | P-9 |
| `src/common/LanguageSelector.tsx` | Lang attribute | A-1 |
| `src/layout/Navbar.tsx` | Scroll perf, ARIA states, skip | P-9, A-7, A-8, A-10 |
| `src/layout/Footer.tsx` | Animations | P-7, A-9 |
| `src/hooks/usePerformance.ts` | Reduced motion (unused) | P-7, A-9 |
| `src/utils/animations.ts` | Animation config | P-10 |
| `src/utils/scrollUtils.ts` | Debug logs | P-11 |
| `src/context/ThemeContext.tsx` | Lang sync | A-1 |

---

## SUMMARY

### Total Performance Issues

| Severity | Count | IDs |
|----------|-------|-----|
| Critical | 1 | P-4 |
| High | 4 | P-1, P-5, P-12, P-13 |
| Medium | 5 | P-2, P-3, P-7 (partially), P-8, P-9, P-10, P-14 |
| Low | 2 | P-6, P-11 |

*(P-7 straddles high/medium; P-14 is medium. Adjusted count above reflects groupings.)*

### Total Accessibility Issues

| Severity | Count | IDs |
|----------|-------|-----|
| Critical | 1 | A-1 |
| Serious | 5 | A-5, A-6, A-7, A-8, A-9 |
| Moderate | 5 | A-2, A-4, A-11, A-12, A-13 |
| Minor | 2 | A-3, A-10 |

### Top 3 Highest-Impact Items Overall

1. **[P-4 + P-13] LCP image unoptimized and not preloaded**  
   The hero profile image is almost certainly the Largest Contentful Paint element. It is served as a full-quality, original-format JPG from Cloudinary (no `f_auto,q_auto`), has no `fetchpriority="high"`, and has no `<link rel="preload">` in `<head>`. Combined, these three issues can easily add 500ms–1s+ to LCP on a typical connection.

2. **[P-1 + P-12] 4 unused Google Fonts families + render-blocking load**  
   Loading Nunito, Quicksand, Raleway, Red Hat Display, and Sora as a single render-blocking stylesheet delays FCP. Only Sora is used. Removing 4 families and switching to async font loading (`rel="preload"` + `onload` swap, or `@font-face` with `font-display: swap` from a self-hosted source) could shave 200–400ms off FCP.

3. **[A-1] `html[lang]` never updated on language switch**  
   This is a WCAG Level A violation. When the user switches to Spanish, the document language attribute remains `lang="en"`. Screen readers reading Spanish content with English phonetics produce completely unintelligible output for visually impaired users who rely on TTS. This is a one-line fix with outsized accessibility impact.

### Estimated Lines of Change for Full Remediation

| Area | Estimated Lines |
|------|----------------|
| `index.html` (fonts, preload, favicon, skip link) | ~15 |
| `src/index.css` (CSS dedup, will-change, contrast tokens) | ~60 |
| `src/common/InfiniteCarousel.tsx` (pause button, reduced motion) | ~25 |
| `src/common/TechIcon.tsx` (keyboard support, role) | ~15 |
| `src/sections/Hero.tsx` (fetchpriority, reduced motion gate) | ~20 |
| `src/common/Technologies.tsx` (Cloudinary URLs, heading tags) | ~50 |
| `src/common/ProjectCard.tsx` (Cloudinary URLs, icon labels) | ~20 |
| `src/sections/Skills.tsx` + `AboutMe.tsx` (heading fixes, section→div) | ~20 |
| `src/common/StudiesCard.tsx` (ARIA menu, keyboard nav) | ~30 |
| `src/layout/Navbar.tsx` (aria-expanded, skip link target, throttle) | ~20 |
| `src/common/LanguageSelector.tsx` + `ThemeContext.tsx` (lang sync) | ~5 |
| All framer-motion components (reduced-motion integration) | ~40 |
| **Total** | **~320 lines** |

---

## GAPS

1. **Actual bundle sizes unknown** — No production build was run during this audit. The `react-icons` and `framer-motion` chunk sizes are estimated, not measured. A `vite build && vite-bundle-visualizer` run would give exact KB figures.

2. **Contrast ratios are calculated, not measured** — Color contrast values were derived algebraically from CSS custom property RGB values. Real-world rendering should be verified with a browser DevTools contrast checker or axe scan, especially for the dark/light theme intersection.

3. **Font subset analysis** — It's unknown whether Sora is used with all its weights (100–800 loaded via variable font range). If only 400 and 600 are needed, subsetting would reduce font payload further.

4. **CLS measurement** — The hero image's CLS impact depends on whether the outer container's CSS dimensions hold stable before the image loads. This requires a real Lighthouse run to confirm CLS score.

5. **`react-modal` vs native `<dialog>`** — The mobile nav modal uses `react-modal` (~10 KB). A migration to native `<dialog>` would improve accessibility (native focus trap, `::backdrop` pseudo-element) and reduce bundle size. This warrants further evaluation.

6. **Translation files not audited** — The `src/translation/translation.ts` and associated JSON files were not in scope. Missing translation keys or inconsistent key coverage between `es`/`en` could cause silent rendering gaps.

**Suggested next steps:**
- Run `npx lighthouse https://<deployed-url> --output html` to get real Core Web Vitals baselines.
- Run `npx axe https://<deployed-url>` for automated a11y scan to complement this manual review.
- Run `vite build` + bundle analysis to confirm actual chunk sizes before prioritizing P-2/P-3.

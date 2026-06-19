# SDD Tasks: perf-a11y-remediation
**Change:** perf-a11y-remediation | **Date:** 2026-06-19
**Spec:** sdd-spec-perf-a11y.md | **Design:** sdd-design-perf-a11y (Engram obs-c06c7f1ffe12a3fb)
**Budget:** 600 lines | **PR strategy:** single PR

---

## Prerequisites

- [ ] T-0: `npm install @fontsource/sora` in `/mnt/c/Users/juanc/Desktop/portfolio`

---

## Group A — Quick wins (zero risk, immediate score gains)

- [ ] T-1: **index.html — Fix favicon MIME type** (P-6, FR-19)
  - Change `type="ico"` → `type="image/png"` on the `<link rel="icon">` tag
  - File: `index.html`

- [ ] T-2: **vercel.json — Add Cache-Control headers** (Best Practices)
  - Add `headers` array with: `/assets/(.*)` → immutable, fonts → immutable, images → immutable, `/` + `/index.html` → no-cache
  - File: `vercel.json`
  - Full replacement in spec file (vercel.json section)

---

## Group B — Performance critical path (LCP + FCP)

- [ ] T-3: **src/utils/cloudinary.ts — Create Cloudinary optimize utility** (P-4, P-5, FR-7)
  - Create new file with `cloudinaryOptimize(url, options?)` function using regex `/\/upload\/((?:v\d+\/)?)/`
  - Full code in spec file (cloudinary.ts section)

- [ ] T-4: **index.html — Remove Google Fonts, add hero preload** (P-1, P-12, P-13, FR-1, FR-2, FR-3, FR-5)
  - Remove: `<link rel="preconnect" href="https://fonts.googleapis.com" />`
  - Remove: `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />`
  - Remove: entire `<link href="https://fonts.googleapis.com/css2?...">` stylesheet
  - Add after `<meta name="viewport">`: `<link rel="preload" as="image" href="https://res.cloudinary.com/dttpgbmdx/image/upload/f_auto,q_auto:good/v1772760104/juan-link_kfglqp.jpg" fetchpriority="high" />`
  - File: `index.html`

- [ ] T-5: **src/main.tsx — @fontsource/sora imports + html[lang]** (P-1, A-1, FR-2, FR-3, FR-20, FR-21)
  - Replace side-effect import `"./translation/translation.ts"` with default import `i18n from "./translation/translation.ts"`
  - Add @fontsource/sora weight imports: `@fontsource/sora/400.css`, `600.css`, `700.css`, `800.css`
  - Add synchronous `document.documentElement.lang = i18n.language?.split("-")[0] || "es"` before createRoot
  - Add `i18n.on("languageChanged", (lng) => { document.documentElement.lang = lng.split("-")[0]; })`
  - File: `src/main.tsx`
  - Full replacement in spec file (main.tsx section)

- [ ] T-6: **src/sections/Hero.tsx — fetchpriority + Cloudinary + motionSafe + aria-hidden** (P-4, P-7, A-3, A-9, FR-4, FR-6, FR-8, FR-9, FR-29)
  - Add imports: `useReducedMotion, motionSafe` from `../hooks/usePerformance`; `cloudinaryOptimize` from `../utils/cloudinary`
  - Add `const prefersReducedMotion = useReducedMotion();` inside component
  - Ring 1: add `aria-hidden="true"` + wrap animate/transition with `motionSafe(..., prefersReducedMotion)`
  - Ring 2: add `aria-hidden="true"` + `motionSafe`
  - Glow: add `aria-hidden="true"` + `motionSafe`
  - Hero `<img>`: wrap src with `cloudinaryOptimize(..., { quality: "good" })`, add `fetchpriority="high"` `loading="eager"` `decoding="sync"`
  - File: `src/sections/Hero.tsx`

---

## Group C — CSS cleanup

- [ ] T-7: **src/index.css — Remove @media dark duplicate block** (P-14, FR-18)
  - Find and delete the entire `@media (prefers-color-scheme: dark) { :root:not(.light) { ... } }` block (~50 lines)
  - File: `src/index.css`

- [ ] T-8: **src/index.css — Fix --text-tertiary contrast** (A-2, FR-31)
  - In `:root` block: `--text-tertiary: 74 127 167` → `--text-tertiary: 61 110 147; /* #3D6E93 — 5.2:1 */`
  - In `.dark` block: `--text-tertiary: 74 127 167` → `--text-tertiary: 100 154 196; /* #649AC4 — 6.2:1 */`
  - File: `src/index.css`

---

## Group D — Reduced motion + carousel (complex, do together)

- [ ] T-9: **src/hooks/usePerformance.ts — Add motionSafe helper** (P-7, A-9, FR-8)
  - Add exported `motionSafe<A>(animate, transition, prefersReducedMotion)` function after existing `useReducedMotion` export
  - Full code in spec file (usePerformance.ts section)
  - File: `src/hooks/usePerformance.ts`

- [ ] T-10: **src/App.tsx — motionSafe on SectionLoader spinner** (P-7, FR-9)
  - Add imports: `useReducedMotion, motionSafe` from `./hooks/usePerformance`; `useTranslation` from `react-i18next`
  - Convert `SectionLoader` from arrow function expression to block body so it can call hooks
  - Replace `animate={{ rotate: 360 }} transition={{ ... }}` with `{...motionSafe({ rotate: 360 }, { ... }, prefersReducedMotion)}`
  - File: `src/App.tsx`

- [ ] T-11: **src/common/InfiniteCarousel.tsx — Full rewrite with pause** (P-7, P-8, P-10, A-6, A-9, FR-11–14, FR-17)
  - Replace entire file with imperative `useMotionValue` + `animate()` → `AnimationPlaybackControls` pattern
  - Add `paused` state, `onMouseEnter/Leave` + `onFocus/Blur` toggle
  - Remove `willChange: "transform"` (P-10)
  - Add `label?: string` prop → `role="region" aria-label={label}` on wrapper
  - When `prefersReducedMotion`: skip `animate()` call, static position
  - Full replacement in spec file (InfiniteCarousel.tsx section)
  - File: `src/common/InfiniteCarousel.tsx`

- [ ] T-12: **src/common/Technologies.tsx — Pass label prop to carousels** (A-6, A-11, A-12, FR-34)
  - Add `label` prop to each `<InfiniteCarousel>` call: `"Front-End technologies"`, `"Back-End and BaaS technologies"`, `"Data analytics technologies"`, `"Other tools and technologies"`
  - Change carousel `<p>` labels → `<h3>` (same className)
  - Change inner `<section>` wrappers → `<div>`
  - Add `aria-label="Technologies"` to outer `<section>`
  - File: `src/common/Technologies.tsx`

- [ ] T-13: **src/layout/Navbar.tsx — rAF throttle + ARIA + motionSafe** (P-9, A-8, A-9, A-10, FR-15, FR-25, FR-26, FR-30)
  - Add imports: `useReducedMotion, motionSafe` from `../hooks/usePerformance`
  - Add `const prefersReducedMotion = useReducedMotion()` inside component
  - Wrap `handleScroll` body in rAF guard (see spec — `rafId` pattern with `{ passive: true }`)
  - Add `aria-expanded={menuOpen}` and `aria-controls="mobile-menu"` to hamburger button
  - Add `id="mobile-menu"` prop to `<Modal>`
  - Update theme toggle `aria-label="Cambiar tema"` → `aria-label={darkMode ? t("navbar.switchToLight") : t("navbar.switchToDark")}`
  - Mobile menu particle: add `aria-hidden="true"` + `{...motionSafe(..., prefersReducedMotion)}`
  - File: `src/layout/Navbar.tsx`

- [ ] T-14: **src/layout/Footer.tsx — motionSafe on Infinity animations** (P-7, A-9, FR-9)
  - Add imports + `const prefersReducedMotion = useReducedMotion()`
  - Gradient span: replace `animate/transition` props with `{...motionSafe(...)}`
  - Two particle divs: add `aria-hidden="true"` + `{...motionSafe(...)}`
  - File: `src/layout/Footer.tsx`

---

## Group E — Accessibility (ARIA, keyboard, structure)

- [ ] T-15: **src/App.tsx — Skip link + main#id** (A-7, FR-22, FR-23, FR-24)
  - Add skip link `<a>` as first child inside root `<div>` in App, before `<motion.header>`
  - Classes: `"sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-1/2 focus:-translate-x-1/2 focus:z-[200] focus:px-5 focus:py-2.5 focus:rounded-lg focus:bg-theme-bg-secondary focus:text-theme-text-primary focus:text-sm focus:font-semibold focus:ring-2 focus:ring-theme-border-focus focus:outline-none"`
  - Content: `{t("skipToContent")}`
  - Add `id="main-content"` `tabIndex={-1}` `className="... outline-none"` to `<main>`
  - File: `src/App.tsx`

- [ ] T-16: **src/translation/* — Add a11y namespace + navbar keys** (A-7, A-10)
  - Create `src/translation/en/a11y.json`: `{ "skipToContent": "Skip to main content" }`
  - Create `src/translation/es/a11y.json`: `{ "skipToContent": "Ir al contenido principal" }`
  - In `src/translation/en/navbar.json`, add: `"switchToLight": "Switch to light mode"`, `"switchToDark": "Switch to dark mode"`
  - In `src/translation/es/navbar.json`, add: `"switchToLight": "Activar modo claro"`, `"switchToDark": "Activar modo oscuro"`
  - In `translation.ts`: import a11y files, spread into both `es.translation` and `en.translation`
  - Files: `translation.ts`, 2 new JSON files, 2 existing navbar JSON files

- [ ] T-17: **src/common/TechIcon.tsx — Full rewrite: div→button** (A-5, FR-27, FR-28)
  - Replace `<div>` root with `<button type="button">`
  - Add `aria-label={alt}`, `aria-describedby={isActive ? tooltipId : undefined}`
  - Add `focus-visible:ring-2 focus-visible:ring-theme-border-focus focus-visible:ring-offset-1` to button className
  - Rename `isHovered` → `isActive`, add `onFocus={() => setIsActive(true)}` + `onBlur={() => setIsActive(false)}`
  - Remove `onClick={() => setIsHovered(!isHovered)}` (native button handles this)
  - Add `useId()` for `tooltipId`
  - Tooltip div: add `id={tooltipId}` `role="tooltip"`
  - Image: `alt={alt}` → `alt=""` `aria-hidden="true"` (button label is the accessible name)
  - Full code in spec file (TechIcon.tsx section)
  - File: `src/common/TechIcon.tsx`

---

## Group F — Heading hierarchy + landmarks

- [ ] T-18: **src/sections/Skills.tsx — Heading hierarchy + landmarks** (A-11, A-12, FR-32, FR-33, FR-34)
  - Outer `<section>`: add `aria-label="Skills"`
  - `<h5>` section title → `<h2>` (same className)
  - `<motion.h6>` soft skills → `<motion.h3>`
  - `<motion.p>` tech skills title → `<motion.h3>`
  - All inner `<motion.section>` → `<motion.div>`
  - File: `src/sections/Skills.tsx`

- [ ] T-19: **src/sections/Experience.tsx — Heading hierarchy + landmarks** (A-11, A-12)
  - Outer `<section>`: add `aria-label="Experience"`
  - `<h3>` section title → `<h2>`
  - `<motion.h4>` company name → `<motion.h3>`
  - All inner `<motion.section>` → `<motion.div>`
  - File: `src/sections/Experience.tsx`

- [ ] T-20: **src/sections/AboutMe.tsx — Heading hierarchy + landmarks** (A-11, A-12)
  - Outer `<section>`: add `aria-label="About me"`
  - `<h3>` section title → `<h2>`
  - `<h5>` studies subsection → `<h3>`
  - All inner `<motion.section>` → `<motion.div>`
  - File: `src/sections/AboutMe.tsx`

- [ ] T-21: **src/sections/Projects.tsx — Heading hierarchy + landmarks** (A-11, A-12)
  - Outer `<section>`: add `aria-label="Projects"`
  - `<h3>` section title → `<h2>`
  - Inner `<motion.section>` wrappers → `<motion.div>`
  - File: `src/sections/Projects.tsx`

- [ ] T-22: **src/common/ProjectCard.tsx — Heading hierarchy + tech icon labels** (A-4, A-11, FR-33, FR-38)
  - `<motion.h4>` project title → `<motion.h3>`
  - `<h6>` Technologies label → `<h4>`
  - Wrap each react-icons SVG in Projects.tsx with `<span aria-label="[tech name]"><Icon aria-hidden="true" focusable="false" /></span>`
    - All 18 icon instances across: ComoEnCasa, DreamhouseBaradero, DreamhouseBO, TheBlackSheep
  - Files: `src/common/ProjectCard.tsx`, `src/sections/Projects.tsx`

---

## Group G — StudiesCard keyboard navigation (most complex)

- [ ] T-23: **src/common/StudiesCard.tsx — ARIA menu + keyboard nav** (A-13, FR-35, FR-36, FR-37)
  - Add state: `focusedIndex: number` (init -1), `triggerRef`, `itemRefs`, `containerRef`
  - Replace `onBlur + setTimeout` with `handleContainerBlur` using `relatedTarget` check
  - Add `handleTriggerKeyDown`: ArrowDown/Enter/Space open menu + focus first item; Escape closes
  - Add `handleItemKeyDown`: ArrowDown/ArrowUp navigate; Escape closes + returns to trigger; Tab closes
  - Add `useEffect` to imperatively focus `itemRefs.current[focusedIndex]` when index changes
  - Dropdown container: add `role="listbox"`, trigger: `aria-haspopup="listbox"` `aria-expanded={isMenuOpen}`
  - Each `<a>`: `role="option"`, `tabIndex={isMenuOpen ? 0 : -1}`, `onKeyDown`
  - Remove `outline-none` from trigger button; add `focus-visible:ring-2 focus-visible:ring-theme-border-focus`
  - Full pattern in design file (Design Area 5)
  - File: `src/common/StudiesCard.tsx`

---

## Verification checklist

After all tasks complete, run:

```bash
# Build check (no TypeScript errors)
cd /mnt/c/Users/juanc/Desktop/portfolio && npm run build

# Visual smoke test
npm run preview
```

Then against the preview URL:
- [ ] AC-4: No `fonts.googleapis.com` in Network tab
- [ ] AC-5: `document.querySelector('img[fetchpriority]')` returns hero img
- [ ] AC-6: All `<img src="...cloudinary...">` URLs contain `f_auto,q_auto`
- [ ] AC-9: Enable OS reduced motion → rings/carousel/particles static
- [ ] AC-12: Switch to ES → `document.documentElement.lang === "es"` ✓
- [ ] AC-13/14: Hover/Tab into carousel → freezes
- [ ] AC-15: Tab from address bar → skip link visible → Enter → focus on `#main-content`
- [ ] AC-16: DevTools → hamburger button has `aria-expanded` toggling
- [ ] AC-17: Tab to TechIcon → tooltip shows, Enter activates
- [ ] AC-18: `--text-tertiary` contrast ≥ 4.5:1 (light) ≥ 4.5:1 (dark)
- [ ] AC-20: No skipped heading levels (h1→h2→h3→h4)
- [ ] AC-22: `<link rel="icon" type="image/png">` ✓

---

## Task count summary

| Group | Tasks | Estimated lines |
|-------|-------|----------------|
| A — Quick wins | T-1, T-2 | ~15 |
| B — Perf critical | T-3, T-4, T-5, T-6 | ~50 |
| C — CSS cleanup | T-7, T-8 | ~55 (deletions) |
| D — Reduced motion + carousel | T-9, T-10, T-11, T-12, T-13, T-14 | ~120 |
| E — ARIA/keyboard | T-15, T-16, T-17 | ~60 |
| F — Headings + landmarks | T-18, T-19, T-20, T-21, T-22 | ~45 |
| G — StudiesCard | T-23 | ~50 |
| **Total** | **24 tasks** | **~395 lines** |

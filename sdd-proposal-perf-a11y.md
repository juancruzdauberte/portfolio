# SDD Proposal — Performance & Accessibility Remediation
**Change:** `perf-a11y-remediation`
**Date:** 2026-06-19
**Author:** SDD Proposal Phase (subagent)
**Status:** Draft — awaiting stakeholder review

---

## 1. PROBLEM STATEMENT

The portfolio site currently fails to meet professional-grade quality bars on performance and accessibility. A Lighthouse audit reveals blocking font requests, unoptimised Cloudinary images, unthrottled scroll listeners, and 110 simultaneously-mounted animated icons — collectively degrading FCP and LCP on mobile and mid-range devices.

On the accessibility front, several Level-A WCAG 2.1 violations exist: `html[lang]` never updates when the user switches language, carousels animate indefinitely with no pause mechanism, the mobile-menu button lacks `aria-expanded`/`aria-controls`, and interactive icons are non-focusable `<div>` elements. These barriers prevent screen-reader users and keyboard-only navigators from using the site and expose it to WCAG compliance risk.

The site's primary audience — recruiters and senior developers evaluating Juan Cruz as a candidate — judge professional polish in part by Core Web Vitals and perceivable accessibility. A site with LCP > 2.5 s or WCAG Level-A failures silently damages that evaluation.

---

## 2. GOALS

| # | Measurable Goal | Target | Verification |
|---|----------------|--------|-------------|
| G-1 | Lighthouse Performance score | ≥ 95 | Lighthouse CLI `--preset=desktop` and `--emulated-form-factor=mobile` |
| G-2 | Lighthouse Accessibility score | ≥ 95 | Lighthouse CLI + axe-core CLI |
| G-3 | Lighthouse Best Practices score | ≥ 95 | Lighthouse CLI |
| G-4 | Lighthouse SEO score | ≥ 95 | Lighthouse CLI |
| G-5 | LCP (mobile, 4G throttle) | < 2.5 s | Chrome DevTools / Lighthouse field metric |
| G-6 | FCP (mobile, 4G throttle) | < 1.8 s | Chrome DevTools |
| G-7 | Zero WCAG Level-A axe violations | 0 critical/serious | `axe --exit` in CI |
| G-8 | `prefers-reduced-motion` respected for ALL framer-motion animations | 100% compliance | Manual + axe WCAG 2.3.3 rule |
| G-9 | Carousel auto-play pauses on hover and keyboard focus | verified | Manual keyboard test + screen reader |

---

## 3. NON-GOALS

- **No redesign** — zero changes to visual design, colour palette, spacing, or layout.
- **No new features** — no new sections, pages, or UI components beyond what the findings require.
- **No i18n expansion** — the `lang` fix covers the existing `en`/`es` toggle only; no new languages are added.
- **No backend or API changes** — all Cloudinary transforms are URL-parameter-only changes; no Cloudinary config panel work.
- **No SEO content changes** — meta tags and copy are out of scope unless a Lighthouse SEO finding demands a structural fix.
- **No React architecture refactor** — lazy-loading carousels (P-8) is a targeted optimisation, not a full virtualisation or code-splitting rewrite.
- **No test suite setup** — no Vitest, Playwright, or CI pipeline is introduced in this change. All acceptance criteria are verified manually or via CLI tools run locally.
- **P-2, P-3, P-11** — cosmetic/tooling findings (chunk warning limit, react-icons bundling, stripped console.log) are out of scope for this PR; they do not affect Lighthouse scores.

---

## 4. BACKGROUND & CONTEXT

### Stack
- **Framework:** React 18 + TypeScript, bundled with Vite.
- **Styling:** Tailwind CSS v3 with custom CSS variables for theming; dark mode toggled via `.dark` class on `<html>`.
- **Animation:** framer-motion throughout — entry animations, hover effects, infinite carousel loops, decorative rings.
- **Internationalisation:** react-i18next with `en`/`es` locales; language is toggled at runtime but `html[lang]` is never updated.
- **Images:** All served via Cloudinary. No `f_auto,q_auto` transforms are applied — images are served at full size/quality.
- **Fonts:** Five Google Fonts families (`Nunito`, `Quicksand`, `Raleway`, `Red Hat Display`, `Sora`) loaded as a render-blocking `<link rel="stylesheet">` in `<head>`. Only `Sora` is used in `src/index.css`. The other four families waste 200–450 KB and block FCP.
- **Deploy target:** Vercel static hosting. `vercel.json` supports custom HTTP response headers, enabling `Cache-Control` and security headers.

### Existing patterns relevant to implementation
- `useReducedMotion` hook already exists in `src/hooks/usePerformance.ts` and is fully functional — it is simply **never imported anywhere**. The fix is to wire it, not to build it.
- Dark mode CSS variables are defined both in `.dark {}` class selector and in `@media (prefers-color-scheme: dark)` — approximately 50 duplicate declarations. The class-based system is the authoritative path (ThemeContext manages it); the `@media` block is dead weight.
- `InfiniteCarousel` uses framer-motion `repeat: Infinity` with no pause state. Both copies of each technology list are always mounted (110 `TechIcon` instances total), each carrying 3 `useState` hooks and two `AnimatePresence` portals.
- Scroll listeners in `Navbar.tsx` fire on every scroll event with no throttling or `requestAnimationFrame` gate.
- The `html[lang]` attribute is hardcoded `"en"` in `index.html` and is never updated by the i18n runtime.

---

## 5. USER STORIES

**US-1 — Recruiter on mobile**
As a recruiter reviewing the portfolio on a mid-range Android device on LTE, I want the page to load its hero content within 2.5 seconds, so that I can evaluate the candidate without waiting for a slow page.

**US-2 — Developer on desktop**
As a senior developer auditing the site with Lighthouse, I want all four categories to score ≥ 95, so that the candidate demonstrates professional-grade quality standards in their own portfolio.

**US-3 — Screen reader user**
As a user navigating with a screen reader, I want all interactive elements (menu button, tech icons, theme toggle) to have correct ARIA roles and labels, so that I can operate the site without a mouse.

**US-4 — Keyboard-only user**
As a user who navigates exclusively by keyboard, I want a skip-to-content link to appear on first Tab keypress, so that I can bypass the repeated navigation menu on every page load.

**US-5 — User with vestibular / motion sensitivity**
As a user who has enabled `prefers-reduced-motion` at the OS level, I want all carousel animations, decorative rings, and entry animations to stop or use fade-only transitions, so that I am not exposed to seizure-risk or nausea-inducing motion (WCAG 2.3.3 / 2.2.2).

**US-6 — User interacting with the Skills carousel**
As a visitor exploring the technology carousel, I want the animation to pause automatically when I hover over it or tab into it, so that I can read individual icon labels without them scrolling past.

**US-7 — Non-English-speaking visitor**
As a Spanish-speaking user who switches the language selector to `es`, I want the `html[lang]` attribute to update to `"es"`, so that screen readers announce content in the correct language and browser translation tools do not re-translate already-Spanish content.

**US-8 — User with low vision (colour contrast)**
As a user with moderately reduced contrast sensitivity, I want all body text and secondary labels to meet WCAG AA 4.5:1 contrast ratio, so that I can read the site without visual strain.

---

## 6. FUNCTIONAL REQUIREMENTS

### Font Loading (P-1, P-12)
**FR-1** — The Google Fonts `<link rel="stylesheet">` for `Nunito`, `Quicksand`, `Raleway`, and `Red Hat Display` must be removed from `index.html`.
**FR-2** — The `Sora` font must be self-hosted via `@fontsource/sora` (npm package) and imported in `src/main.tsx` or `src/index.css`, replacing the Google Fonts network request entirely.
**FR-3** — No render-blocking font stylesheet may remain in `<head>`. Sora must load via the CSS `@font-face` injected by `@fontsource`, which is bundled by Vite and therefore non-blocking.

### LCP Image Optimisation (P-4, P-5, P-13)
**FR-4** — The hero profile image (`<img>` in `Hero.tsx`) must carry `fetchpriority="high"` and `loading="eager"`.
**FR-5** — A `<link rel="preload" as="image">` pointing to the hero image URL must be present in `<head>` of `index.html`.
**FR-6** — The hero image Cloudinary URL must include the `f_auto,q_auto` transformation parameters.
**FR-7** — All other Cloudinary image URLs in the project (ProjectCard, AboutMe, etc.) must include `f_auto,q_auto` transformation parameters.

### Reduced Motion (P-7, A-9)
**FR-8** — `useReducedMotion` from `src/hooks/usePerformance.ts` must be imported and consumed in every component that uses framer-motion `animate` with `repeat: Infinity`: `Hero.tsx` (decorative rings, bounce arrow, glow pulse), `InfiniteCarousel.tsx`, and `Navbar.tsx` (mobile menu decorative particle).
**FR-9** — When `prefersReducedMotion === true`, all `repeat: Infinity` animations must either be disabled (static state) or replaced with a one-time, short fade transition (opacity 0 → 1, ≤ 300 ms, no looping).
**FR-10** — The existing `@media (prefers-reduced-motion: reduce)` rules in `src/index.css` must remain intact for CSS-only animations. The JS hook (FR-8/FR-9) handles framer-motion exclusively.

### Carousel Performance & Pause (P-8, A-6, A-9)
**FR-11** — `InfiniteCarousel` must maintain a `paused` boolean state, defaulting to `false`.
**FR-12** — `paused` must be set to `true` on `onMouseEnter` and `onFocus` (and any focusable descendant's `onFocus`), and back to `false` on `onMouseLeave` and `onBlur` of the carousel container.
**FR-13** — When `paused === true` or `prefersReducedMotion === true`, the framer-motion `animate` transition must set `duration` to a value high enough to effectively stop visible movement (e.g. `9999`) or the animation must be explicitly halted. No visible pause button or indicator is required.
**FR-14** — When `prefersReducedMotion === true`, `InfiniteCarousel` must render the technology list as a static, non-animated flex row (no scrolling motion at all).

### Scroll Listener Throttling (P-9)
**FR-15** — The `handleScroll` function in `Navbar.tsx` must be wrapped in `requestAnimationFrame` (rAF) throttling so that at most one DOM read occurs per animation frame (~60/sec), instead of firing on every scroll event (~300/sec).
**FR-16** — If `SmoothScrollLink` or `scrollUtils.ts` also registers unthrottled scroll listeners, those must receive the same rAF treatment.

### `will-change` Cleanup (P-10)
**FR-17** — Persistent `style={{ willChange: "transform" }}` in `InfiniteCarousel.tsx` must be removed from the outer motion container. `will-change` may only be applied on hover/focus via CSS class, and must be removed when the interaction ends.

### CSS Deduplication (P-14)
**FR-18** — The `@media (prefers-color-scheme: dark)` block in `src/index.css` that duplicates the `.dark {}` variable declarations must be removed. The class-based `.dark {}` block is the single source of truth for dark mode variables, as `ThemeContext` manages the class toggle.

### Favicon (P-6)
**FR-19** — The `<link rel="icon">` in `index.html` must use `type="image/png"` instead of `type="ico"`.

### `html[lang]` (A-1)
**FR-20** — A `useEffect` must be added to `src/i18n.ts` or to the root `App.tsx`/`main.tsx` that listens to the i18next `languageChanged` event and updates `document.documentElement.lang` to the new language code (`"en"` or `"es"`).
**FR-21** — On initial mount, `document.documentElement.lang` must be set to the active i18next language, not left as the hardcoded `"en"` from `index.html`.

### Skip-to-Content Link (A-7)
**FR-22** — A visually hidden skip link (`<a href="#main-content">Skip to main content</a>`) must be the first focusable element in the DOM, rendered in `App.tsx` or at the root layout level.
**FR-23** — The skip link must become visible (absolute position, styled) on `:focus`, matching the site's existing focus-ring style.
**FR-24** — The main content container (the `<main>` wrapper or the first `<section>`) must carry `id="main-content"` and `tabIndex={-1}`.

### Mobile Menu ARIA (A-8)
**FR-25** — The hamburger `<button>` in `Navbar.tsx` must have `aria-expanded={menuOpen}` and `aria-controls="mobile-menu"`.
**FR-26** — The `<Modal>` / navigation panel must carry `id="mobile-menu"`.

### TechIcon Keyboard Accessibility (A-5)
**FR-27** — `TechIcon`'s root element must be changed from a plain `<div>` to a `<button>` (or have `role="button"`, `tabIndex={0}`, and `onKeyDown` with Enter/Space handler), so it is reachable and operable by keyboard.
**FR-28** — The tooltip shown on hover must also be shown on focus, using the same existing `isHovered` state driven by `onFocus`/`onBlur` in addition to the existing `onMouseEnter`/`onMouseLeave`.

### Decorative Rings `aria-hidden` (A-3)
**FR-29** — The two animated ring `<motion.div>` elements and the glow `<motion.div>` in `Hero.tsx` must each carry `aria-hidden="true"`.

### Theme Toggle Accessible Label (A-10)
**FR-30** — The theme-toggle `<button>` in `Navbar.tsx` must have a dynamic `aria-label` that reflects the current state: `"Switch to dark mode"` when light, `"Switch to light mode"` when dark (or equivalent Spanish strings depending on active language).

### Contrast (A-2)
**FR-31** — The `--text-tertiary` CSS variable (`#4A7FA7`, ~3.85:1 contrast on the light background `#F6FAFD`) must be darkened to meet WCAG AA 4.5:1 for normal text. The replacement value must be verified with a contrast checker before commit. Candidate: `#3A6A8F` (~4.6:1).

### Heading Hierarchy (A-11)
**FR-32** — All instances of `<h5>` used where a `<h3>` is semantically correct must be corrected. All `<p>` elements used as section headings must be replaced with the appropriate heading level.
**FR-33** — The heading hierarchy across the page must be: `h1` (name in Hero) → `h2` (section titles) → `h3` (subsection / card titles). No heading levels may be skipped.

### Landmark Regions (A-12)
**FR-34** — Every `<section>` that does not already have a visible heading associated via `aria-labelledby` must receive an `aria-label` describing its purpose (e.g. `aria-label="Skills"`).

### StudiesCard Dropdown Keyboard Nav (A-13)
**FR-35** — The StudiesCard dropdown must add `role="menu"` to the list container and `role="menuitem"` to each entry.
**FR-36** — The dropdown must handle `ArrowDown`, `ArrowUp`, and `Escape` keyboard events for navigation and closure.
**FR-37** — `outline-none` on the dropdown trigger must be replaced with a visible custom focus ring matching the site's existing focus style.

### ProjectCard Tech Icon Labels (A-4)
**FR-38** — Tech icon SVGs rendered by `react-icons` inside `ProjectCard` must carry `aria-label="[technology name]"` and `aria-hidden` must not be set on them, OR they must be wrapped in a `<span>` with `aria-label` and the SVG itself set to `aria-hidden="true"` + `focusable="false"`.

---

## 7. TECHNICAL APPROACH

### Font Loading Strategy — Self-Hosted via @fontsource (P-1, P-12)
Remove the Google Fonts multi-family `<link>` from `index.html` entirely. Install `@fontsource/sora` (or the variable-font variant `@fontsource-variable/sora`) as a prod dependency. Import it once in `src/main.tsx`. Vite will bundle the font into the build output, Vercel will serve it with long-lived cache headers, and no network round-trip to `fonts.googleapis.com` will block the render path. This eliminates the render-blocking stylesheet and the ~200–450 KB dead weight of unused families in a single diff.

Why not async preload instead of self-hosting: Google Fonts async loading (`rel="preload"` + `media="print"` trick) still incurs a cross-origin connection to `fonts.gstatic.com` and introduces FOUT. `@fontsource` avoids both; the font is served from the same origin as the app and controlled by Vercel's edge cache.

### Image Optimisation Strategy — Cloudinary URL Transforms (P-4, P-5, P-13)
Append `/f_auto,q_auto/` into all existing Cloudinary delivery URLs. No Cloudinary account config is required — these are client-side URL parameters that Cloudinary's CDN processes automatically. The hero image additionally receives `fetchpriority="high"` on its `<img>` tag and a `<link rel="preload" as="image">` in `index.html`. No CDN-side setup is needed.

### Reduced Motion Strategy — Wire Existing Hook (P-7, A-9)
`useReducedMotion` is already fully implemented in `src/hooks/usePerformance.ts`. The approach is to import it into the three components that have `repeat: Infinity` animations (`Hero.tsx`, `InfiniteCarousel.tsx`, `Navbar.tsx` mobile panel). Each component will derive a `shouldAnimate = !prefersReducedMotion` boolean and use it to conditionally set framer-motion `transition` and `animate` props. For `repeat: Infinity` cases, when `shouldAnimate === false` the motion value is set to a static/initial state.

### Carousel Pause Strategy — Invisible Hover/Focus Mechanism (A-6, P-8)
`InfiniteCarousel` will hold a `paused` boolean state. The wrapper `<div>` receives `onMouseEnter`, `onMouseLeave`, `onFocus`, and `onBlur` handlers that toggle `paused`. The framer-motion `transition.duration` is conditionally set to `9999` when `paused === true`, effectively freezing the animation at its current position without any visible UI change. On mouse leave or blur, duration resets to the prop value and animation resumes. No visible pause button is added. This satisfies WCAG 2.2.2 (pause, stop, hide) without altering the visual design.

### Accessibility Fixes Approach — Targeted ARIA + Structural Corrections
- **`html[lang]`**: Add an i18next `languageChanged` listener in the app bootstrap, updating `document.documentElement.lang`. One-liner, zero component tree changes.
- **Skip link**: Inject a single `<a>` as the first DOM child of `<body>` inside `App.tsx`, visually hidden via `sr-only` Tailwind class, revealed on `:focus` via `focus:not-sr-only` + absolute positioning.
- **Mobile menu ARIA**: Add `aria-expanded` and `aria-controls` props to the existing hamburger button; add `id` to the Modal content.
- **TechIcon**: Convert root `<div>` to `<button type="button">` and extend existing mouse handlers with focus/blur equivalents.
- **Headings**: Audit and correct heading levels in `Skills.tsx`, `Experience.tsx`, and `Projects.tsx` — no structural layout change, only tag replacements.
- **Landmark `aria-label`**: Add `aria-label` attributes to unnamed `<section>` containers.
- **StudiesCard**: Add `role="menu"`, keyboard event handlers, and restore focus ring.

### CSS Deduplication Approach (P-14)
Delete the `@media (prefers-color-scheme: dark)` block from `src/index.css`. `ThemeContext` already applies the `.dark` class to `<html>` based on both user preference and `localStorage`. The media query block is a residual artefact from an earlier implementation and has been superseded. Removing it reduces CSS payload and eliminates any risk of the two blocks conflicting in edge cases (e.g. user has OS dark mode but manually toggled to light via the site's toggle).

---

## 8. ACCEPTANCE CRITERIA

### Performance
**AC-1** — `lighthouse --preset=desktop` against the Vercel preview URL reports Performance ≥ 95.
*(Verification: CLI output JSON, `categories.performance.score ≥ 0.95`)*

**AC-2** — `lighthouse --emulated-form-factor=mobile` reports Performance ≥ 90 and LCP < 2.5 s.
*(Verification: CLI output, `audits.largest-contentful-paint.numericValue < 2500`)*

**AC-3** — `lighthouse` reports FCP < 1.8 s on desktop simulation.
*(Verification: `audits.first-contentful-paint.numericValue < 1800`)*

**AC-4** — Lighthouse "Eliminate render-blocking resources" audit shows 0 blocking font URLs. (P-1, P-12)
*(Verification: `audits.render-blocking-resources.details.items` must not contain `fonts.googleapis.com`)*

**AC-5** — Hero `<img>` has `fetchpriority="high"` and `loading="eager"` in the DOM. (P-4, P-13)
*(Verification: DevTools Elements panel or `document.querySelector('img[fetchpriority]')`)*

**AC-6** — All Cloudinary `<img>` src URLs contain `/f_auto,q_auto/`. (P-5)
*(Verification: `document.querySelectorAll('img')` — all `.src` values matching `cloudinary.com` include `f_auto,q_auto`)*

**AC-7** — `<link rel="preload" as="image">` for the hero image is present in `<head>`. (P-13)
*(Verification: DevTools Network panel shows the image with `initiatorType: link` and `rel: preload`)*

**AC-8** — No `style={{ willChange: "transform" }}` exists on persistently mounted elements not currently being animated. (P-10)
*(Verification: React DevTools props panel on `InfiniteCarousel` motion container)*

**AC-9** — With OS `prefers-reduced-motion: reduce` active, all `repeat: Infinity` framer-motion animations are static. (P-7, A-9)
*(Verification: Enable reduced motion in OS/DevTools; confirm rings, carousel, and bounce arrow are not moving)*

### Accessibility
**AC-10** — `axe --exit` against the Vercel preview URL reports 0 critical or serious violations.
*(Verification: CLI exit code 0)*

**AC-11** — Lighthouse Accessibility score ≥ 95.
*(Verification: `categories.accessibility.score ≥ 0.95`)*

**AC-12** — Switching language to `es` causes `document.documentElement.lang` to equal `"es"`. (A-1)
*(Verification: `document.documentElement.lang` in browser console after language switch)*

**AC-13** — Carousel animation stops when the mouse is over the carousel container. (A-6)
*(Verification: Mouse over carousel → icons visually freeze)*

**AC-14** — Carousel animation stops when keyboard focus enters any icon inside the carousel. (A-6)
*(Verification: Tab key into carousel → icons visually freeze)*

**AC-15** — Tab-pressing from browser address bar on the live page shows a visible skip-to-content link as the first interactive element. (A-7)
*(Verification: Manual keyboard test — skip link appears, Enter activates it, focus moves to `#main-content`)*

**AC-16** — Hamburger button has `aria-expanded` attribute reflecting `menuOpen` state, and `aria-controls` pointing to the modal panel `id`. (A-8)
*(Verification: DOM inspection — `button[aria-expanded]` value toggles on menu open/close)*

**AC-17** — Each `TechIcon` can be reached with Tab key, activates its tooltip on Enter/Space, and is announced by screen reader with its technology name. (A-5)
*(Verification: Keyboard navigation; NVDA/VoiceOver announces button label)*

**AC-18** — `--text-tertiary` colour achieves ≥ 4.5:1 contrast ratio on `--bg-primary` in light mode. (A-2)
*(Verification: WebAIM Contrast Checker with the updated hex values)*

**AC-19** — Theme toggle `aria-label` updates dynamically based on current theme state. (A-10)
*(Verification: DOM inspection — `aria-label` changes on toggle)*

**AC-20** — No heading levels are skipped (e.g. `h5` after `h2`, or `<p>` acting as heading). (A-11)
*(Verification: Lighthouse "Heading elements are not in a sequentially-descending order" audit passes)*

**AC-21** — All `<section>` elements have an accessible name via `aria-label` or `aria-labelledby`. (A-12)
*(Verification: axe `region` rule passes)*

**AC-22** — Favicon `<link>` has `type="image/png"`. (P-6)
*(Verification: DOM inspection — `link[rel="icon"][type="image/png"]`)*

---

## 9. RISKS & MITIGATIONS

### Risk 1 — `@fontsource/sora` variable font subset mismatch
**Probability:** Medium. **Impact:** High (FOUT, wrong weights render).
The `@fontsource-variable/sora` package includes a full variable-font range but may default to latin subset only. If Sora glyphs for special characters are missing, the site could fall back to `system-ui` for those characters.
**Mitigation:** Use `@fontsource/sora` (static, not variable) and import the specific weight files used by the site (`400`, `600`, `700`, `800`) explicitly. Run a visual smoke test in Spanish locale (special chars: `ó`, `é`, `ñ`) before merge.

### Risk 2 — Cloudinary `f_auto,q_auto` changes perceived image quality
**Probability:** Low. **Impact:** Medium (visual regression on hero photo).
`q_auto` applies Cloudinary's quality algorithm which may visibly reduce quality for the hero profile photo, which is a focal point of the portfolio.
**Mitigation:** Use `f_auto,q_auto:good` (Cloudinary's "good" quality tier instead of "eco") for the hero image specifically. Apply `q_auto` (default eco) only to background/decorative images. Review hero rendering in the Vercel preview before merge.

### Risk 3 — Carousel pause via `duration: 9999` causes visible stutter on resume
**Probability:** Medium. **Impact:** Low (cosmetic regression).
Setting `duration: 9999` freezes the carousel at an arbitrary `x` offset. When the user stops hovering, framer-motion resumes from that offset, which may cause a brief visual jump if the `repeatType: "loop"` boundary is handled differently.
**Mitigation:** Test resume behaviour across Chrome/Safari/Firefox. If stutter occurs, switch to toggling `animationPlayState: "paused"` on the CSS animation level instead of mutating framer-motion's duration — or set `transition.paused: true` if using framer-motion v10+ which supports `useAnimationControls().pause()` directly.

### Risk 4 — `html[lang]` listener fires after render, causing a brief mismatch
**Probability:** Low. **Impact:** Low (screen-reader edge case only).
If `document.documentElement.lang` is set synchronously from i18next's detected language in `main.tsx` before React hydration, there is no mismatch. If it only fires on the `languageChanged` event, the initial render may have the wrong `lang` for 100–200 ms.
**Mitigation:** Set `document.documentElement.lang = i18n.language` synchronously in the i18n initialisation block in `main.tsx` (before `ReactDOM.createRoot`), not only as an event listener. The event listener handles subsequent runtime switches.

### Risk 5 — Heading hierarchy corrections break CSS selector specificity
**Probability:** Low. **Impact:** Medium (visual regression on styled headings).
Several heading elements are likely styled via tag selectors (e.g. `h5 { }` in Tailwind layer or component CSS). Changing `<h5>` to `<h3>` may inherit different Tailwind prose or global styles.
**Mitigation:** All heading replacements must be accompanied by explicit Tailwind utility classes (e.g. `className="text-sm font-semibold"`) that preserve the existing visual appearance. The semantic tag changes the DOM role only; the visual output must remain identical. Include a visual diff screenshot comparison in the PR description.

---

## 10. DELIVERY

### Estimated Lines of Change by Area

| Area | Files | Est. Lines Changed |
|------|-------|--------------------|
| Font loading — remove Google Fonts, add @fontsource import | `index.html`, `src/main.tsx` (or `src/index.css`) | ~15 |
| Image optimisation — Cloudinary transforms + preload + fetchpriority | `index.html`, `src/sections/Hero.tsx`, `src/common/ProjectCard.tsx`, other image sites | ~25 |
| Reduced motion — wire `useReducedMotion` | `src/sections/Hero.tsx`, `src/common/InfiniteCarousel.tsx`, `src/layout/Navbar.tsx` | ~40 |
| Carousel pause — hover/focus mechanism | `src/common/InfiniteCarousel.tsx` | ~20 |
| Scroll throttling — rAF wrap | `src/layout/Navbar.tsx`, `src/utils/scrollUtils.ts` | ~15 |
| CSS deduplication — remove @media dark block | `src/index.css` | ~55 (deletions) |
| `will-change` cleanup | `src/common/InfiniteCarousel.tsx` | ~5 |
| Favicon MIME type | `index.html` | ~1 |
| `html[lang]` dynamic update | `src/main.tsx` or `src/i18n.ts` | ~10 |
| Skip-to-content link | `src/App.tsx` | ~15 |
| Mobile menu ARIA | `src/layout/Navbar.tsx` | ~5 |
| TechIcon keyboard + focus | `src/common/TechIcon.tsx` | ~20 |
| Theme toggle dynamic aria-label | `src/layout/Navbar.tsx` | ~5 |
| `--text-tertiary` contrast fix | `src/index.css` | ~3 |
| Heading hierarchy corrections | `src/sections/Skills.tsx`, `Experience.tsx`, `Projects.tsx` | ~25 |
| Landmark aria-labels | Multiple section files | ~10 |
| StudiesCard keyboard nav | `src/common/StudiesCard.tsx` | ~30 |
| ProjectCard icon labels | `src/common/ProjectCard.tsx` | ~15 |
| Decorative aria-hidden | `src/sections/Hero.tsx` | ~5 |
| **Total** | **~18 files** | **~320 lines** |

> Within the 600-line single-PR budget. ✅

### PR Strategy
**Single PR.** At ~320 estimated changed lines across ~18 files, this change is well within the 600-line review budget. All changes are strictly corrective (no new components, no architectural changes). The diff will be reviewable in a single pass.

### Suggested Implementation Order (Quickest Wins First)

1. **Favicon type fix** (P-6) — 1 line, zero risk, immediate Best Practices score gain.
2. **Remove unused Google Fonts families / add @fontsource/sora** (P-1, P-12) — highest single impact on Performance score; eliminates render-blocking CSS and ~400 KB transfer.
3. **Cloudinary `f_auto,q_auto` transforms + hero preload + fetchpriority** (P-4, P-5, P-13) — direct LCP improvement; do hero image first, then batch remaining images.
4. **CSS deduplication — remove `@media prefers-color-scheme:dark` block** (P-14) — pure deletion, zero risk, reduces CSS parse overhead.
5. **Wire `useReducedMotion`** (P-7, A-9) — existing hook, low-touch wiring across 3 files. Unlocks WCAG 2.3.3 compliance.
6. **Carousel pause on hover/focus** (A-6) — builds on step 5; both changes touch `InfiniteCarousel.tsx` together in one pass.
7. **`will-change` cleanup** (P-10) — remove one `style` prop from the carousel; do in the same commit as step 6.
8. **Scroll listener rAF throttling** (P-9) — low risk, measurable scroll performance gain.
9. **`html[lang]` dynamic update** (A-1) — critical Level-A fix, one-liner in bootstrap.
10. **Skip-to-content link** (A-7) — WCAG Level-A, isolated to `App.tsx`.
11. **Mobile menu ARIA** (A-8) — prop additions only, no structural change.
12. **TechIcon keyboard accessibility** (A-5) — convert div to button + focus handlers.
13. **Theme toggle dynamic `aria-label`** (A-10) — one prop change.
14. **`--text-tertiary` contrast** (A-2) — one CSS variable value change, verify with contrast checker.
15. **Decorative `aria-hidden`** (A-3) — add props to Hero rings.
16. **Heading hierarchy corrections** (A-11) — audit and fix across section files.
17. **Landmark `aria-label`** (A-12) — add attributes to unnamed sections.
18. **StudiesCard keyboard nav** (A-13) — most complex accessibility task; isolate last to keep diff reviewable.
19. **ProjectCard icon labels** (A-4) — batch react-icons aria-label pass.

---

*End of Proposal — `perf-a11y-remediation`*

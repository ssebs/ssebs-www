# Phase 2 Report — Layout Shell & Head

## Files created

- `src/components/Analytics.astro` — GA gtag + MS Clarity snippets, ported verbatim from `head.html` lines 40-48 (GA) and 32-38 (Clarity), each `<script>` marked `is:inline`.
- `src/components/Head.astro` — `<head>` block per plan's exact code (Task 2.2); consumes `site` config + `Analytics`. Intentional translation: Hugo `<base href>` block dropped per spec; favicon path changed to `/favicon.ico` (served from `public/`).
- `src/components/Socials.astro` — ported `socials.html` recolor logic (`replaceAll('2rem', iconsize)`, `replaceAll('#33ffe7', color)`) exactly per the plan's given code (Task 2.3).
- `src/components/Header.astro` — ported `header.html` markup verbatim (logo link, hamburger SVG with `<animate>` elements, `#collapseMenu`, mobile socials `<ul>`). Translations: Hugo `range site.Menus.main` → `nav.map(...)` with active-state computed by comparing `Astro.url.pathname` to `item.href` (`text-quaternary`/`active` vs `text-gray-200`); logo `<img>` → `astro:assets` `<Image>` at width 56. Toggle `<script>` (lines 72-89) copied verbatim, marked `is:inline` (needed to keep `astro check` clean — plain DOM script, no processing required).
- `src/components/Footer.astro` — ported `footer.html` markup verbatim (footer title, divider, "Why ssebs?" story block, footer-copyright span). Translations: logo `<img>` → `<Image>` (width 128); `range site.Menus.main` → `nav.map(...)` using `item.shortDesc`/`item.href`; social `<ul>` → `<Socials color="#33ffe7" iconsize="2rem" />`. Copyright `<script>` (lines 61-113) ported verbatim with Hugo template vars replaced via `define:vars={{ fromYear: site.copyrightStartYear, authorLink, author: site.author }}` (`authorLink` = `socials.find(s=>s.name==='linkedin')!.link`); IntersectionObserver + card-reveal logic kept intact; script marked `is:inline` (required once `define:vars` is used with a non-module script to avoid an astro-check hint/behavior change).
- `src/components/Breadcrumbs.astro` — ported `breadcrumbs.html` classes (`breadcrumb-item`, `breadcrumb-link`, `breadcrumb-separator`, `text-quaternary`) with iteration over the `crumbs` prop (`{href,label}[]`) instead of Hugo `.Ancestors`, rendering `current` as the final item, per plan's Task 2.6 Step 2 instructions.
- `src/layouts/BaseLayout.astro` — exact code from plan (Task 2.6 Step 1): imports global.css, Head/Header/Footer, home vs. standard `<slot/>` branch mirroring `baseof.html`.
- `src/layouts/PageLayout.astro` — exact code from plan (Task 2.6 Step 3): Breadcrumbs + sticky Sidebar (col 4) + slot (cols 1-3) inside BaseLayout.
- `src/components/Sidebar.astro` — **minimal placeholder** per instructions: accepts `current` prop, renders `<div data-current={current}></div>`, with a `// TODO: Phase 3 replaces this with the full sidebar port (sidebar.html).` comment. Not a real port; Phase 3 (Task 3.4) will overwrite it fully and wire it into PageLayout (already imported there).
- `src/assets/RocketOnly.png` — copied from `../static/img/RocketOnly.png` (used by both Header and Footer via `astro:assets` `<Image>`).

## Verbatim-port confirmation

- Analytics: GA + Clarity scripts copied verbatim, only wrapped as separate Astro `<script is:inline>` blocks (source has GA scripts outside `</head>` in Hugo due to templating order; content itself untouched).
- Socials: recolor logic and per-item markup match `socials.html` exactly (per plan's given code).
- Header: hamburger SVG, `<animate>` elements, and toggle script (lines 72-89) copied character-for-character; only the menu-item loop and logo `<img>`→`<Image>` were translated, as instructed.
- Footer: all markup (title, divider, story block, footer-copyright span, class names) copied verbatim; only the menu loop, logo, and Hugo template variables in the copyright script were translated per plan instructions (`define:vars`).
- Breadcrumbs: classes preserved (`breadcrumb-item`, `breadcrumb-link`, `breadcrumb-separator`); iteration source translated from `.Ancestors` to the `crumbs` prop as directed.
- BaseLayout: home vs. standard `<slot/>` branching mirrors `baseof.html`'s `.IsHome` conditional; code matches the plan's given snippet exactly.

## Build / typecheck results

- `npm run build` — passes, 0 errors (verified both with only the stub `index.astro` present, and with a temporary smoke-test page (`phase2test.astro`, since removed) wired through `PageLayout` → `BaseLayout` → `Head`/`Header`/`Footer`/`Breadcrumbs`/`Sidebar` placeholder/`Socials`. The smoke test confirmed GA (`G-TZW95SH05P`), Clarity, `nav-link-animated`, `social-icon-hover`, `footer-copyright`, and `breadcrumb-item` all appear in the rendered HTML, and the `RocketOnly.png` logo was optimized into `.webp` variants by `astro:assets`.
- `npx astro check` — 0 errors, 0 warnings, 12 hints (pre-existing `z` deprecation hints from Phase 1's `content.config.ts`, out of scope for Phase 2). Two errors initially surfaced from the Header toggle script (`possibly null`, implicit `any`) and were resolved by adding `is:inline` to that script (matches the treatment already used for Analytics — a plain DOM script needing no bundler processing).

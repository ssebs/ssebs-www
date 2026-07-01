# Astro Rewrite of ssebs.com — Design

**Date:** 2026-06-30
**Status:** Approved
**Target dir:** `astro-ssebs/`

## Goal

Replace the Hugo site + custom `ssebs` theme with an Astro (TypeScript) project
that reproduces the current visual design and content, follows Astro best
practices, and uses Astro's built-in image optimization to serve scaled/responsive
images instead of the current static full-size images.

## Decisions (locked)

- **Content scope:** Migrate everything — all projects, all blog posts, about,
  contact, section landing intros. Full visual parity.
- **Images:** Co-locate per content entry. Each project/blog post is a folder
  `src/content/<section>/<slug>/index.mdx` with its images in a sibling `img/`
  folder, referenced relatively so Astro's asset pipeline optimizes them
  (responsive `srcset`, modern formats).
- **Integrations kept:** Google Analytics (gtag `G-TZW95SH05P`), MS Clarity
  (`xffw65bvgl`), Cusdis comments, formsubmit.co contact form.
- **Installs:** Use `astro add mdx` and `astro add tailwind` (Tailwind v4,
  CSS-first). Also `astro add sitemap`.
- **Code highlighting:** Shiki `one-dark-pro` (closest equivalent to the current
  Chroma `onedark` preset). Only affects fenced code-block colors.

## Deltas from Hugo (intentional, not regressions)

- Hugo's `useBaseURL` / `<base href>` trickery is dropped. Astro handles base
  paths natively; deploy at site root.
- Hugo's menu-from-frontmatter (`menus: main`) is replaced by an explicit typed
  nav array in `src/config.ts`. Same rendered output, simpler.
- Chroma → Shiki for syntax highlighting. Same visual family, not pixel-identical.

## Tooling & Config

- `astro.config.mjs`:
  - `site: 'https://ssebs.com'`
  - Integrations: `mdx()`, `sitemap()`
  - `markdown.shikiConfig.theme: 'one-dark-pro'`
  - Default Sharp image service (built in).
- Node ≥ 22.12 (already pinned in scaffold `package.json`).

## Styling

- Single `src/styles/global.css`:
  - `@import "tailwindcss";`
  - `@theme` block porting the color palettes (`primary`, `secondary`,
    `tertiary`, `quaternary`, `quinary` with their numbered shades), `white`,
    `white-dim`, and the Ubuntu font family from `themes/ssebs/tailwind.config.js`.
  - `@tailwindcss/forms` via the v4 plugin mechanism.
  - All custom CSS from `themes/ssebs/assets/css/tailwind-input.css` ported
    verbatim: `.post-content` typography, hero background SVG, `.showit/.hideit`
    menu states, `.bigImg`, `.videoWrapper`, all keyframes/animation utilities,
    card-reveal, footer animations, breadcrumb animations, reduced-motion rules.
- Ubuntu font: keep the Google Fonts `<link>` preconnect+stylesheet in `Head`.

## Site Data — `src/config.ts`

Typed exports replacing Hugo `site.Params` + `site.Menus.main`:

- `socials`: array of `{ name, link, weight, icon (SVG string) }` (LinkedIn,
  GitHub, Instagram) — ported from `hugo.yaml`.
- `site`: `{ title, description, author, copyrightStartYear: 2015 }`.
- `nav`: ordered array `[{ label, href, weight, shortDesc }]` for projects, blog,
  about, contact.

## Content Collections — `src/content.config.ts`

- Collections: `projects`, `blog` — glob loaders over
  `src/content/<section>/*/index.mdx`.
- Shared Zod schema (via `image()` helper for optimization):
  - `title: string`
  - `slug: string`
  - `shortdesc: string`
  - `feature: image().optional()` (relative path → optimized)
  - `date: coerce.date()`
  - `weight: number`
  - `tags: array(string).default([])`
  - Optional section/landing fields: `sectionbg?`, `c2aText?`, `noC2A?`.
- `about`, `contact`, and the projects/blog landing intros: authored as MDX in
  `src/content/pages/` (or rendered directly by their `.astro` route). Section
  intro (the homepage `Section` summary) = the content before the `<!--more-->`
  marker; full body used on the section's own list/landing page.

## Layouts & Components

`src/layouts/`:
- `BaseLayout.astro` — `<html>`, `Head`, `Header`, `<slot/>`, `Footer`. Handles
  the home-vs-standard branch (home = full-width; standard = wrapper).
- `PageLayout.astro` — standard 2-column shell: breadcrumbs + sticky sidebar
  (col 4) + content (cols 1–3), matching `baseof.html`.

`src/components/`:
- `Head.astro` — title, meta description, favicon, Ubuntu font links, theme-color,
  `Analytics`.
- `Header.astro` — logo (optimized `RocketOnly.png`), nav from `config.nav` with
  active-state highlight, mobile toggle button + socials; menu-toggle `<script>`.
- `Footer.astro` — footer sections, socials, copyright `<script>` (year +
  author link), IntersectionObserver reveal `<script>`.
- `Sidebar.astro` — profile image (optimized `me_wedding.jpg`), bio, quick links
  (conditional on current path), tag chips, socials.
- `Hero.astro` — homepage hero (optimized `me_wedding.jpg`, CTAs).
- `Card.astro` — project/blog card; blog variant shows date + hides tags,
  project variant shows tags; optimized feature image.
- `Section.astro` — homepage section wrapper (title from `shortDesc`, summary,
  optional feature, top-3 subpage cards, C2A).
- `Breadcrumbs.astro` — ancestor trail.
- `Socials.astro` — sorted socials, color/size params (ports `socials.html`
  `replaceRE` color/size substitution).
- `ProjectShowcase.astro` — "more about the <first project>" block on home.
- `Analytics.astro` — GA gtag + MS Clarity snippets.
- `Comments.astro` — Cusdis thread + conditional-load `<script>`, shown on
  blog/project single pages.

Theme-owned images (`RocketOnly.png`, `me_wedding.jpg`, `me_vacay.jpg`) live in
`src/assets/` and are imported into components via `<Image>`.

## Shortcodes → MDX Components — `src/components/mdx/`

Map each Hugo shortcode to an Astro component used inside `.mdx`:

| Hugo shortcode | Astro component | Notes |
|---|---|---|
| `img-full` | `ImgFull` | `<Image>`, full width |
| `img-float-right` | `ImgFloatRight` | float-right class, width prop |
| `img-block` | `ImgBlock` | class/width/title props |
| `image` | `Img` | generic |
| `img-gallery` | `ImgGallery` | reads co-located folder via `import.meta.glob`; keeps lightbox JS |
| `game-embed` | `GameEmbed` | click-to-load iframe placeholder |
| `contactform` | `ContactForm` | formsubmit.co action + redirect-message JS |
| `columns` | `Columns` | `<--COLSPLIT-->` → slots/children |
| `blueSection` | `BlueSection` | wrapper |
| `rawhtml` | (native) | MDX passes raw HTML/JSX directly |

Content authoring changes from `{{< img-full src="..." >}}` to `<ImgFull src={...} />`
with images imported/co-located. Gallery images resolved from the entry's `img/`
folder so they are optimized.

## Routing — `src/pages/`

- `index.astro` — Hero + `config.nav` → `Section` loop + `ProjectShowcase`.
- `projects/index.astro` — landing intro + full card grid.
- `projects/[...slug].astro` — single project (PageLayout + rendered MDX +
  Comments).
- `blog/index.astro`, `blog/[...slug].astro` — same pattern (blog cards show date).
- `about.astro`, `contact.astro` — PageLayout + MDX.
- `tags/[tag].astro` — `getStaticPaths` gathering unique tags across both
  collections; renders a card grid. Replicates Hugo's `/tags/<tag>/` taxonomy.
- `404.astro`.

## Dynamic JS

Ported into Astro `<script>` tags (bundled, not inline-scattered):
mobile menu toggle, image click-zoom (`.bigImg`), copyright year + author,
IntersectionObserver footer + card reveal, gallery lightbox (prev/next/close),
contact-form `_next` redirect + `?msg=` display, Cusdis conditional load.

## `public/`

`favicon.ico`, `media/Sebastian-Safari-Resume.pdf`, and any residual images
referenced by absolute `/img/...` paths not co-located. Goal: keep `public/img`
minimal since content images are co-located and optimized.

## Verification

- `npm run build` completes clean; Zod schema validates all migrated frontmatter.
- Inspect built HTML: feature/gallery/theme images emit responsive `<img srcset>`
  / `<picture>` with scaled variants (confirms the performance goal).
- Visual parity pass: home, a project single, a blog single, projects list, blog
  list, about, contact, a tag page, 404.
- All four integrations present and firing (GA, Clarity, Cusdis, contact form).

## Out of Scope

- Deployment/CI changes (Dockerfile, GitHub Actions, nginx) — the current Hugo
  pipeline stays until the Astro site is validated. A follow-up can swap it.
- Git operations (per user instruction, none for now).
- Exact pixel-match of code-block token colors (Shiki vs Chroma).

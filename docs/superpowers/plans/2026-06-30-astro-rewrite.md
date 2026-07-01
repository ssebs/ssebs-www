# Astro Rewrite of ssebs.com — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Hugo `ssebs` theme + site with an Astro (TypeScript) site in `astro-ssebs/` that reproduces the current design and content and serves optimized/responsive images.

**Architecture:** Astro content collections (folder-per-entry MDX with co-located, optimized images), typed site config replacing Hugo params/menus, `.astro` components replacing Hugo partials, MDX components replacing Hugo shortcodes, Tailwind v4 (CSS-first) + a verbatim port of the existing custom CSS.

**Tech Stack:** Astro 7, MDX integration, `@astrojs/sitemap`, Tailwind v4 (`@tailwindcss/vite`), Shiki (`one-dark-pro`), Sharp image service.

## Global Constraints

- Target directory: `astro-ssebs/` (all paths below are relative to it unless noted). Source Hugo project is one level up in the repo root.
- Node ≥ 22.12 (pinned in `package.json`).
- Install integrations via `astro add mdx`, `astro add tailwind`, `astro add sitemap` (never hand-edit `package.json` for these).
- No git operations of any kind (user directive). Ignore any "Commit" instinct; "checkpoint" = clean build.
- Per-task verification = `npm run dev`/`npm run build` succeeds with no errors AND the stated output check passes. There is no unit-test runner.
- Preserve visual parity with the Hugo site. When porting HTML/CSS, copy classes/markup verbatim from the named source file; only translate templating syntax.
- Keep all four integrations: GA `G-TZW95SH05P`, MS Clarity `xffw65bvgl`, Cusdis (`https://cusdis.ssebs.com`, app-id `0c226863-0ff4-4600-a25c-225a088d5aa9`), formsubmit.co (`https://formsubmit.co/contact@ssebs.com`).
- Color palette, `white-dim: #eee`, and Ubuntu font come from `../themes/ssebs/tailwind.config.js`. Custom CSS comes from `../themes/ssebs/assets/css/tailwind-input.css`.

---

## Phase 0 — Tooling & Global Styles

### Task 0.1: Install integrations & base config

**Files:**
- Modify: `astro.config.mjs`
- Modify: `package.json` (via `astro add`)

- [ ] **Step 1: Install integrations**

Run from `astro-ssebs/`:
```bash
npx astro add mdx --yes
npx astro add sitemap --yes
npx astro add tailwind --yes
```
Expected: `@astrojs/mdx`, `@astrojs/sitemap`, `tailwindcss`, `@tailwindcss/vite` added; `astro.config.mjs` updated with `mdx()` and `sitemap()` integrations and the Tailwind Vite plugin.

- [ ] **Step 2: Set site URL and Shiki theme**

Edit `astro.config.mjs` so it contains (merge with what `astro add` generated):
```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ssebs.com',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: { theme: 'one-dark-pro' },
  },
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 3: Verify build boots**

Run: `npm run build`
Expected: build succeeds (blank starter still present). No integration errors.

### Task 0.2: Global stylesheet (Tailwind v4 theme + custom CSS port)

**Files:**
- Create: `src/styles/global.css`
- Modify: `src/pages/index.astro` (temporary import to prove it loads)

**Interfaces:**
- Produces: `src/styles/global.css` imported by `BaseLayout` later. Exposes Tailwind color utilities `primary/secondary/tertiary/quaternary/quinary` (+ numbered shades), `white-dim`, font `Ubuntu`, and all custom classes used by ported markup (`.post-content`, `.hero`, `.showit/.hideit`, `.bigImg`, `.card-hover`, `.card-reveal`, `.cards-reveal-container`, `.btn-glow`, `.nav-link-animated`, `.social-icon-hover`, `.input-glow`, `.tag-hover`, `.logo-hover`, `.sidebar-animate`, `.sidebar-img-wrapper`, `.hero-*`, `.footer-*`, `.breadcrumb-*`, `.animate-*`, `.animate-float`, `.animate-float-cycle`, `.videoWrapper`, `.transparent-bg`, `.custom-float-right/left`).

- [ ] **Step 1: Create the stylesheet skeleton**

Create `src/styles/global.css` starting with:
```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";

@theme {
  --font-sans: "Ubuntu", sans-serif;

  --color-primary: #41afff;
  --color-primary-50: #eff7ff;
  --color-primary-100: #dfeeff;
  --color-primary-200: #b8dfff;
  --color-primary-300: #78c6ff;
  --color-primary-400: #41afff;
  --color-primary-500: #068df1;
  --color-primary-600: #006fce;
  --color-primary-700: #0058a7;
  --color-primary-800: #024b8a;
  --color-primary-900: #083f72;
  --color-primary-950: #06274b;

  --color-secondary: #024b8a;

  --color-tertiary: #2e6ae8;
  --color-tertiary-50: #eff6ff;
  --color-tertiary-100: #dceafd;
  --color-tertiary-200: #c0dcfd;
  --color-tertiary-300: #95c6fb;
  --color-tertiary-400: #63a6f7;
  --color-tertiary-500: #3e85f3;
  --color-tertiary-600: #2e6ae8;
  --color-tertiary-700: #2052d5;
  --color-tertiary-800: #2142ac;
  --color-tertiary-900: #203c88;
  --color-tertiary-950: #182753;

  --color-quaternary: #2ecce8;
  --color-quaternary-50: #edfdfe;
  --color-quaternary-100: #d1f8fc;
  --color-quaternary-200: #a8f0f9;
  --color-quaternary-300: #6ce2f4;
  --color-quaternary-400: #2ecce8;
  --color-quaternary-500: #0daecd;
  --color-quaternary-600: #0d8bad;
  --color-quaternary-700: #12708c;
  --color-quaternary-800: #185a72;
  --color-quaternary-900: #184c61;
  --color-quaternary-950: #0a3142;

  --color-quinary: #33ffe7;
  --color-quinary-50: #eefffc;
  --color-quinary-100: #c5fff7;
  --color-quinary-200: #8bfff2;
  --color-quinary-300: #33ffe7;
  --color-quinary-400: #14eddb;
  --color-quinary-500: #00d1c1;
  --color-quinary-600: #00a8a0;
  --color-quinary-700: #008580;
  --color-quinary-800: #056a67;
  --color-quinary-900: #0a5755;
  --color-quinary-950: #003435;

  --color-white-dim: #eee;
}
```
(Values copied from `../themes/ssebs/tailwind.config.js`. `white` stays Tailwind's default `#fff`.)

- [ ] **Step 2: Append the custom CSS verbatim**

Copy the entire contents of `../themes/ssebs/assets/css/tailwind-input.css` **from line 5 to the end** (i.e. everything AFTER the three `@tailwind base/components/utilities` lines — those are replaced by the v4 `@import` above) and paste it below the `@theme` block in `global.css`. Do not alter selectors or values. This includes `.post-content` rules, the `body` hero background SVG, `.hero`, menu `.showit/.hideit`, floats, `.bigImg`, `.videoWrapper`, all `@keyframes`, animation utilities, card/footer/breadcrumb/sidebar animations, and the `prefers-reduced-motion` block.

- [ ] **Step 3: Prove it loads**

Temporarily add to `src/pages/index.astro` frontmatter: `import '../styles/global.css';` and put `<body class="text-white"><h1 class="text-primary font-sans">test</h1></body>`.
Run: `npm run dev` (background), open the page.
Expected: heading renders in the primary blue (`#41afff`), Ubuntu font, dark page background with the dot-grid SVG. Then revert the temp body content (import stays until BaseLayout exists).

---

## Phase 1 — Data & Schema

### Task 1.1: Typed site config

**Files:**
- Create: `src/config.ts`

**Interfaces:**
- Produces:
  - `export interface Social { name: string; link: string; weight: number; icon: string }`
  - `export const socials: Social[]`
  - `export const site: { title: string; description: string; author: string; copyrightStartYear: number }`
  - `export interface NavItem { label: string; href: string; weight: number; shortDesc: string }`
  - `export const nav: NavItem[]` (sorted by weight ascending)

- [ ] **Step 1: Write config.ts**

Create `src/config.ts`. Port `site.Params` from `../hugo.yaml`:
```ts
export interface Social {
  name: string;
  link: string;
  weight: number;
  icon: string; // inline SVG, uses #33ffe7 fill and 2rem width as tokens for recoloring
}

export const socials: Social[] = [
  { name: 'linkedin', weight: 1, link: 'https://linkedin.com/in/ssebs/', icon: `<svg ...>` },
  { name: 'github',   weight: 2, link: 'https://github.com/ssebs',       icon: `<svg ...>` },
  { name: 'instagram',weight: 3, link: 'https://www.instagram.com/ssebs',icon: `<svg ...>` },
].sort((a, b) => a.weight - b.weight);

export const site = {
  title: 'ssebs | Sebastian Safari',
  description: 'My name is Sebastian Safari, I call myself a "professional fixer, hobbyist figure-outer". Basically, I work as a Site Reliability Engineer and like to program various projects.',
  author: 'Sebastian Safari',
  copyrightStartYear: 2015,
};

export interface NavItem { label: string; href: string; weight: number; shortDesc: string; }

export const nav: NavItem[] = [
  { label: 'Projects', href: '/projects/', weight: 5, shortDesc: 'Check out my projects.' },
  { label: 'About',    href: '/about/',    weight: 6, shortDesc: 'Who am I?' },
  { label: 'Blog',     href: '/blog/',     weight: 8, shortDesc: "See what I've been up to in my blog." },
  { label: 'Contact',  href: '/contact/',  weight: 9, shortDesc: "Let's Connect." },
].sort((a, b) => a.weight - b.weight);
```
Paste the three full SVG strings for `icon` verbatim from `../hugo.yaml` (`socials.linkedin.icon`, `.github.icon`, `.instagram.icon`). Keep the `2rem` width and `#33ffe7`/`#41afff` fills intact — `Socials.astro` recolors them.

- [ ] **Step 2: Typecheck**

Run: `npx astro check` (installs `@astrojs/check` + `typescript` if prompted; accept).
Expected: no type errors in `config.ts`.

### Task 1.2: Content collections schema

**Files:**
- Create: `src/content.config.ts`

**Interfaces:**
- Produces collections `projects` and `blog`, each entry shape:
  `{ title: string; slug: string; shortdesc: string; feature?: ImageMetadata; date: Date; weight: number; tags: string[]; sectionbg?: string; c2aText?: string; noC2A?: boolean }`
- Entry ids are the folder names (used as URL slug fallback).

- [ ] **Step 1: Write the schema**

Create `src/content.config.ts`:
```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const base = ({ image }: { image: () => any }) =>
  z.object({
    title: z.string(),
    slug: z.string().optional(),
    shortdesc: z.string(),
    feature: image().optional(),
    date: z.coerce.date(),
    weight: z.number().default(0),
    tags: z.array(z.string()).default([]),
    sectionbg: z.string().optional(),
    c2aText: z.string().optional(),
    noC2A: z.boolean().optional(),
  });

const projects = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/projects' }),
  schema: base,
});

const blog = defineCollection({
  loader: glob({ pattern: '**/index.{md,mdx}', base: './src/content/blog' }),
  schema: base,
});

export const collections = { projects, blog };
```
Note: `feature` in Hugo frontmatter is written `./img/...` relative to the content file — that resolves correctly once images are co-located (Phase 6).

- [ ] **Step 2: Verify with one placeholder entry**

Create `src/content/projects/_scaffold/index.mdx` with minimal valid frontmatter (`title`, `shortdesc`, `date`, `weight`) and body `hi`.
Run: `npm run build`.
Expected: build passes, collection recognized. Delete `_scaffold/` after.

---

## Phase 2 — Layout Shell & Head

### Task 2.1: Analytics component

**Files:**
- Create: `src/components/Analytics.astro`

**Interfaces:**
- Produces: `Analytics` (no props). Emits GA gtag + MS Clarity snippets.

- [ ] **Step 1: Port snippets**

Create `src/components/Analytics.astro` with the GA block (lines 40–48) and MS Clarity block (lines 32–38) copied verbatim from `../themes/ssebs/layouts/partials/head.html`. Wrap each in the appropriate `<script>` tags exactly as in the source. Use `is:inline` on these `<script>` tags so Astro does not process/bundle them.

- [ ] **Step 2: Build check** — Run `npm run build`; expected: passes.

### Task 2.2: Head component

**Files:**
- Create: `src/components/Head.astro`

**Interfaces:**
- Consumes: `site` from `src/config.ts`; `Analytics`.
- Produces: `Head` with props `{ title?: string; description?: string }`.

- [ ] **Step 1: Write Head.astro**

```astro
---
import { site } from '../config';
import Analytics from './Analytics.astro';
const { title = site.title, description = site.description } = Astro.props;
---
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <meta name="description" content={description} />
  <meta name="theme-color" content="#41afff" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap" rel="stylesheet" />
  <Analytics />
</head>
```
(Drops the Hugo `<base href>` block per spec. Favicon path is `/favicon.ico` in `public/`.)

- [ ] **Step 2: Build check** — `npm run build`; expected: passes.

### Task 2.3: Socials component

**Files:**
- Create: `src/components/Socials.astro`

**Interfaces:**
- Consumes: `socials` from config.
- Produces: `Socials` with props `{ color?: string; iconsize?: string }` (defaults `#33ffe7`, `1.75rem`). Renders `<li>` items (caller supplies the `<ul>`).

- [ ] **Step 1: Write Socials.astro**

Port `../themes/ssebs/layouts/partials/socials.html`. Replicate the recolor logic: replace `2rem` → `iconsize` and `#33ffe7` → `color` in each icon string, then render via `set:html`.
```astro
---
import { socials } from '../config';
const { color = '#33ffe7', iconsize = '1.75rem' } = Astro.props;
const items = socials.map((s) => ({
  ...s,
  icon: s.icon.replaceAll('2rem', iconsize).replaceAll('#33ffe7', color),
}));
---
{items.map((s) => (
  <li>
    <a href={s.link} title={s.name} target="_blank" class="social-icon-hover inline-block">
      <span set:html={s.icon} />
    </a>
  </li>
))}
```

- [ ] **Step 2: Build check** — `npm run build`; expected: passes.

### Task 2.4: Header component

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/assets/RocketOnly.png` (copy from `../static/img/RocketOnly.png`)

**Interfaces:**
- Consumes: `nav` from config; `Socials`; optimized logo asset.
- Produces: `Header` (no props; reads `Astro.url.pathname` for active state).

- [ ] **Step 1: Copy the logo asset**

Copy `../static/img/RocketOnly.png` → `src/assets/RocketOnly.png`.

- [ ] **Step 2: Write Header.astro**

Port `../themes/ssebs/layouts/partials/header.html`. Replace the logo `<img>` with:
```astro
import { Image } from 'astro:assets';
import logo from '../assets/RocketOnly.png';
...
<Image src={logo} alt="logo" width={56} class="w-14 pr-2 animate-float-cycle" />
```
Replace the Hugo `range site.Menus.main` loop with `nav.map(...)` producing the same `<li><a>` markup and active-color logic: compare `Astro.url.pathname` against each `item.href`; active → `text-quaternary` + `active` span class, else `text-gray-200`. Keep the hamburger SVG and `#collapseMenu` markup verbatim. Keep the mobile socials `<ul>` calling `<Socials color="#41afff" iconsize="1.75rem" />`. Copy the toggle `<script>` (lines 72–89) verbatim.

- [ ] **Step 3: Build check** — `npm run build`; expected: passes.

### Task 2.5: Footer component

**Files:**
- Create: `src/components/Footer.astro`

**Interfaces:**
- Consumes: `nav`, `site`, `socials`, `Socials`, logo asset.
- Produces: `Footer` (no props).

- [ ] **Step 1: Write Footer.astro**

Port `../themes/ssebs/layouts/partials/footer.html`. Replace the logo `<img>` (both header/footer use `RocketOnly.png`) with `<Image src={logo} .../>` (import as in Header). Replace the `range site.Menus.main` link list with `nav.map(...)` using `item.shortDesc` as the link text and `item.href` as href. Keep the "Why ssebs?" story block verbatim. Mobile/desktop socials → `<Socials color="#33ffe7" iconsize="2rem" />`. Port the copyright `<script>` (lines 61–113): replace Hugo `{{ .Site.Params.copyright_start_year }}` with `site.copyrightStartYear`, and the author link href/text with `socials.find(s=>s.name==='linkedin')!.link` and `site.author`. Emit this script with `define:vars={{ fromYear: site.copyrightStartYear, authorLink, author: site.author }}` so the values are injected, keeping the IntersectionObserver + card-reveal logic intact.

- [ ] **Step 2: Build check** — `npm run build`; expected: passes.

### Task 2.6: BaseLayout + PageLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/PageLayout.astro`
- Create: `src/components/Breadcrumbs.astro`

**Interfaces:**
- Consumes: `Head`, `Header`, `Footer`, `Sidebar` (Sidebar built in Phase 3 — import lazily; PageLayout may temporarily omit Sidebar until Task 3.4, then add).
- Produces:
  - `BaseLayout` props `{ title?: string; description?: string; isHome?: boolean }`, wraps `<slot/>`. Mirrors `baseof.html`: home → full-width `<slot/>`; else → centered `<slot/>` (the 2-col grid lives in PageLayout).
  - `PageLayout` props `{ title?: string; description?: string; crumbs: {href:string;label:string}[]; current: string }`, renders Breadcrumbs + sticky Sidebar (col 4) + `<slot/>` (cols 1–3), inside BaseLayout.
  - `Breadcrumbs` props `{ crumbs: {href:string;label:string}[]; current: string }`.

- [ ] **Step 1: BaseLayout.astro**

```astro
---
import '../styles/global.css';
import Head from '../components/Head.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
const { title, description, isHome = false } = Astro.props;
---
<!DOCTYPE html>
<html lang="en">
  <Head title={title} description={description} />
  <body class="text-white">
    <Header />
    <div class="flex justify-center">
      {isHome ? <slot /> : <div class="m-4"><slot /></div>}
    </div>
    <Footer />
  </body>
</html>
```

- [ ] **Step 2: Breadcrumbs.astro**

Port `../themes/ssebs/layouts/partials/breadcrumbs.html` markup. Instead of Hugo `.Ancestors`, iterate the `crumbs` prop (each `{href,label}`) then render `current` as the final `text-quaternary` item, with the `>` separators between. Keep `breadcrumb-item/link/separator` classes.

- [ ] **Step 3: PageLayout.astro**

```astro
---
import BaseLayout from './BaseLayout.astro';
import Breadcrumbs from '../components/Breadcrumbs.astro';
import Sidebar from '../components/Sidebar.astro';
const { title, description, crumbs, current } = Astro.props;
---
<BaseLayout title={title} description={description}>
  <Breadcrumbs crumbs={crumbs} current={current} />
  <div class="grid lg:grid-cols-4 gap-4 mb-6">
    <div class="lg:col-start-4 lg:w-[16rem] w-full lg:row-start-1 row-start-2 justify-self-center self-baseline top-6 sticky">
      <Sidebar current={current} />
    </div>
    <div class="lg:col-start-1 lg:col-span-3 lg:row-start-1 lg:max-w-[60rem] w-full overflow-x-hidden">
      <slot />
    </div>
  </div>
</BaseLayout>
```
(If Sidebar not yet built, stub `<Sidebar>` import until Task 3.4; wire fully after.)

- [ ] **Step 4: Build check** — `npm run build`; expected: passes (with Sidebar stub or after 3.4).

---

## Phase 3 — Home & Listing Components

### Task 3.1: Card component

**Files:**
- Create: `src/components/Card.astro`

**Interfaces:**
- Consumes: an entry from `getCollection('projects'|'blog')`.
- Produces: `Card` props `{ href: string; title: string; shortdesc: string; feature?: ImageMetadata; date?: Date; tags?: string[]; isBlog?: boolean }`.

- [ ] **Step 1: Write Card.astro**

Port `../themes/ssebs/layouts/partials/card.html`. Use `<Image src={feature} .../>` (from `astro:assets`) inside the `.img-zoom-container` when `feature` is set. `isBlog` true → show formatted `date` (`date.toLocaleDateString('en-US', { year:'numeric', month:'short', day:'numeric' })`) and hide tags; false → hide date, show tags linking to `/tags/<tag>/`. Keep `card-hover`, `card-reveal`, border classes verbatim. Feature `<Image>` needs explicit `width`/`height` or `widths`/`sizes`; use `widths={[248, 496]} sizes="248px"` to match the 248px display box and get a 2x variant.

- [ ] **Step 2: Build check** — `npm run build`; expected: passes.

### Task 3.2: Hero component

**Files:**
- Create: `src/components/Hero.astro`
- Create: `src/assets/me_wedding.jpg` (copy from `../static/img/me_wedding.jpg`)

**Interfaces:**
- Produces: `Hero` (no props).

- [ ] **Step 1: Copy asset** — copy `../static/img/me_wedding.jpg` → `src/assets/me_wedding.jpg`.

- [ ] **Step 2: Write Hero.astro**

Port `../themes/ssebs/layouts/partials/hero.html`. Replace the `<img>` with `<Image src={meWedding} width={300} height={300} class="hero-image mx-auto rounded-md border-2 border-primary" title="A photo of my at my wedding." />`. Keep the CTA links (`/projects/`, `/about/`, `/blog/`) and all classes verbatim.

- [ ] **Step 3: Build check** — `npm run build`; expected: passes.

### Task 3.3: Section + ProjectShowcase components

**Files:**
- Create: `src/components/Section.astro`
- Create: `src/components/ProjectShowcase.astro`
- Create: `src/lib/summary.ts`

**Interfaces:**
- Consumes: `getCollection`, `Card`, `render` from `astro:content`.
- Produces:
  - `src/lib/summary.ts`: `export function intro(body: string): string` — returns markdown text before the `<!--more-->` marker (or whole body if absent), trimmed.
  - `Section` props `{ item: NavItem; cards?: CardData[]; summaryHtml: string; feature?: ImageMetadata }` where `CardData` matches `Card` props.
  - `ProjectShowcase` props `{ title: string; href: string; summaryHtml: string; noC2A?: boolean; c2aText?: string }`.

- [ ] **Step 1: summary.ts**

```ts
export function intro(body: string): string {
  const marker = '<!--more-->';
  const idx = body.indexOf(marker);
  return (idx === -1 ? body : body.slice(0, idx)).trim();
}
```
Note: section/showcase summaries are short markdown (links only). Render them by passing raw markdown through Astro's `markdown` — simplest is to store the pre-rendered HTML. Implementation detail resolved in the page tasks (Phase 5) where `render()`/`markdownToHtml` is available; `Section`/`ProjectShowcase` receive already-rendered `summaryHtml` and emit it via `set:html`.

- [ ] **Step 2: Section.astro**

Port `../themes/ssebs/layouts/partials/section.html`. Title = `item.shortDesc`. Emit `summaryHtml` via `set:html` inside `.post-content`. If `cards` present, render up to 3 `<Card {...c} />` in the grid. C2A link → `item.href` with `c2aText || 'See more...'`, shown unless the section opts out. `sectionbg` background class defaults `bg-neutral-900`.

- [ ] **Step 3: ProjectShowcase.astro**

Port `../themes/ssebs/layouts/partials/projectshowcase.html`. Renders the "A little bit more about the <title>" block with `summaryHtml` and the C2A. Props supplied by the home page (first project by weight).

- [ ] **Step 4: Build check** — `npm run build`; expected: passes.

### Task 3.4: Sidebar component

**Files:**
- Create: `src/components/Sidebar.astro`

**Interfaces:**
- Consumes: `Socials`, `me_wedding.jpg` asset.
- Produces: `Sidebar` props `{ current: string }` (pathname, for conditional links).

- [ ] **Step 1: Write Sidebar.astro**

Port `../themes/ssebs/layouts/partials/sidebar.html`. Replace profile `<img>` with `<Image src={meWedding} .../>`. Replace Hugo `ne .Page.RelPermalink "/about/"` conditionals with `current !== '/about/'` etc. Keep the tag chips and `<Socials color="#33ffe7" iconsize="1.75rem" />`. Wire this into `PageLayout` (Task 2.6) now if it was stubbed.

- [ ] **Step 2: Build check** — `npm run build`; expected: passes.

---

## Phase 4 — MDX Shortcode Components

All live in `src/components/mdx/`. These are imported inside `.mdx` content.

### Task 4.1: Static image shortcodes

**Files:**
- Create: `src/components/mdx/ImgFull.astro`, `ImgFloatRight.astro`, `ImgBlock.astro`, `Img.astro`

**Interfaces:**
- Produces components accepting `{ src: ImageMetadata; alt?: string; width?: number|string; title?: string; class?: string; loading?: string }`. `src` is an imported/optimized `ImageMetadata` (author imports the co-located image in the MDX frontmatter or via relative `import`). Each wraps `<Image>` from `astro:assets`.

- [ ] **Step 1: ImgFull.astro**

Port `../themes/ssebs/layouts/shortcodes/img-full.html`. `<Image src={src} alt={alt} class="my-6" widths={[480, 960, 1440]} sizes="(max-width: 960px) 100vw, 960px" loading={loading} />` (full-width responsive set).

- [ ] **Step 2: ImgFloatRight.astro**

Port `img-float-right.html`: `class="custom-float-right ml-3"`, honor `width` prop as display width, use `<Image>` with `widths` derived from the numeric `width` (e.g. `[w, w*2]`).

- [ ] **Step 3: ImgBlock.astro**

Port `img-block.html`: default class `block` unless `class` prop given; honor `width`/`title`.

- [ ] **Step 4: Img.astro**

Port `image.html`: generic `<Image src alt={title} class width>`.

- [ ] **Step 5: Build check** — `npm run build`; expected: passes (no consumers yet).

### Task 4.2: ImgGallery + lightbox

**Files:**
- Create: `src/components/mdx/ImgGallery.astro`

**Interfaces:**
- Produces: `ImgGallery` props `{ images: ImageMetadata[]; width?: string }`. Author passes the co-located folder via `import.meta.glob` in the MDX (helper pattern documented in Phase 6). Renders optimized `<Image>` grid + the lightbox markup/JS.

- [ ] **Step 1: Write ImgGallery.astro**

Port `../themes/ssebs/layouts/shortcodes/img-gallery.html`. Replace `readDir` with the `images` prop array; render each via `<Image>` with `widths` suited to the grid (e.g. `[256, 512]`). Keep the `<style>` block (grid + lightbox) and the lightbox `<script>` (openLightbox/closeLightbox/changeImage) verbatim, but source the lightbox full image from the `<Image>`'s rendered `src`. Use `is:inline` only if the script references template literals of Hugo vars — here it does not, so a normal bundled `<script>` is fine; select images by `.gallery-item img`.

- [ ] **Step 2: Build check** — `npm run build`; expected: passes.

### Task 4.3: Remaining shortcodes

**Files:**
- Create: `src/components/mdx/GameEmbed.astro`, `ContactForm.astro`, `Columns.astro`, `BlueSection.astro`

**Interfaces:**
- `GameEmbed` props `{ src: string; width?: string; height?: string }`.
- `ContactForm` props `{ action: string }`.
- `Columns` — two named slots or splits children; render 2-col grid.
- `BlueSection` — wraps `<slot/>` in `.blue-section .main`.

- [ ] **Step 1: GameEmbed.astro**

Port `../themes/ssebs/layouts/shortcodes/game-embed.html`. Generate a unique id with `crypto.randomUUID()` at build. Keep placeholder + click-to-load iframe `<script>`; inject `src/width/height/uid` via `define:vars`.

- [ ] **Step 2: ContactForm.astro**

Port `../themes/ssebs/layouts/shortcodes/contactform.html`. `action` from prop. Keep the form fields/classes verbatim. Port the `<script>` (lines 47–63) that rewrites `_next` and shows the `?msg=` message; the hidden `_next` initial value can be empty since JS overwrites it.

- [ ] **Step 3: Columns.astro**

Port `columns.html`. In MDX, authors will use `<Columns>` with an explicit split. Implement as two slots: `<slot name="left" />` / `<slot name="right" />` in a `grid md:grid-cols-2` wrapper. (Phase 6 converts `<--COLSPLIT-->` usages to named-slot children.)

- [ ] **Step 4: BlueSection.astro**

Port `blueSection.html`: `<section class="blue-section"><div class="main"><slot /></div></section>` + clearfix div. (Add the `.blue-section`/`.main` styles to `global.css` if they existed in the theme; if not present in `tailwind-input.css`, add minimal equivalents.)

- [ ] **Step 5: Build check** — `npm run build`; expected: passes.

---

## Phase 5 — Routing

### Task 5.1: Comments component + markdown helper

**Files:**
- Create: `src/components/Comments.astro`
- Create: `src/lib/markdown.ts`

**Interfaces:**
- `Comments` props `{ id: string; url: string; title: string }` — renders Cusdis thread + conditional-load script.
- `src/lib/markdown.ts`: `export async function mdToHtml(md: string): Promise<string>` using Astro's container or `markdown-it`/`marked`. Prefer `experimental_AstroContainer`-free approach: use `marked` (add via `npm i marked`) for the tiny section intros.

- [ ] **Step 1: markdown helper**

```bash
npm i marked
```
```ts
import { marked } from 'marked';
export async function mdToHtml(md: string): Promise<string> {
  return marked.parse(md, { async: true });
}
```

- [ ] **Step 2: Comments.astro**

Port `../themes/ssebs/layouts/_default/single.html` lines 40–60 (Cusdis block + conditional-load script). Props supply `data-page-id` (id), `data-page-url` (url), `data-page-title` (title). Keep `data-host`, `data-app-id`, `data-theme` verbatim.

- [ ] **Step 3: Build check** — `npm run build`; expected: passes.

### Task 5.2: Project & blog single pages

**Files:**
- Create: `src/pages/projects/[...slug].astro`
- Create: `src/pages/blog/[...slug].astro`

**Interfaces:**
- Consumes: `getCollection`, `render`, `PageLayout`, `Comments`.
- Produces: static routes at `/projects/<slug>/` and `/blog/<slug>/`.

- [ ] **Step 1: projects/[...slug].astro**

```astro
---
import { getCollection, render } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import Comments from '../../components/Comments.astro';

export async function getStaticPaths() {
  const items = await getCollection('projects');
  return items.map((entry) => ({
    params: { slug: entry.data.slug ?? entry.id },
    props: { entry },
  }));
}
const { entry } = Astro.props;
const { Content } = await render(entry);
const crumbs = [
  { href: '/', label: 'Home' },
  { href: '/projects/', label: 'Projects' },
];
---
<PageLayout title={entry.data.title} description={entry.data.shortdesc} crumbs={crumbs} current={`/projects/${entry.data.slug ?? entry.id}/`}>
  <div class="grid gap-6 p-6 bg-neutral-900 drop-shadow-2xl rounded-t-md border-b-2 border-b-primary">
    <div>
      <h1 class="text-2xl">{entry.data.title}</h1>
      {entry.data.tags.length > 0 && (
        <div class="flex flex-wrap gap-2 text-base h-fit">
          {entry.data.tags.map((t) => (
            <a href={`/tags/${t}/`} class="px-2 text-quaternary rounded-md border border-quaternary hover:bg-quaternary hover:text-black">{t}</a>
          ))}
        </div>
      )}
    </div>
    <div class="post-content overflow-x-hidden break-words"><Content /></div>
    <Comments id={entry.id} url={new URL(Astro.url.pathname, Astro.site).href} title={entry.data.title} />
  </div>
</PageLayout>
```
Also port the image click-zoom `<script>` from `single.html` lines 21–37 (bundled script, targets `.post-content img`).

- [ ] **Step 2: blog/[...slug].astro**

Same as Step 1 but collection `blog`, crumbs `[Home, Blog]`, and the header block matches blog styling (single.html is shared, so identical structure).

- [ ] **Step 3: Build check** — `npm run build`; expected: passes once at least one MDX entry exists (Phase 6). Until then, `getStaticPaths` returns empty → routes just don't emit; build still passes.

### Task 5.3: Section list pages

**Files:**
- Create: `src/pages/projects/index.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/content/pages/projects-intro.md`, `src/content/pages/blog-intro.md`

**Interfaces:**
- Consumes: `getCollection`, `Card`, `mdToHtml`.
- Produces: `/projects/` and `/blog/` list pages (full intro + card grid), matching `list.html`.

- [ ] **Step 1: Move landing intro content**

Copy body of `../content/projects/_index.md` → `src/content/pages/projects-intro.md` (frontmatter: `title: My Projects`). Copy `../content/blog/_index.md` → `src/content/pages/blog-intro.md` (`title: My Blog`). These hold the full intro paragraphs.

- [ ] **Step 2: projects/index.astro**

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import Card from '../../components/Card.astro';
import { mdToHtml } from '../../lib/markdown';
import introRaw from '../../content/pages/projects-intro.md?raw';

const items = (await getCollection('projects')).sort((a, b) => a.data.weight - b.data.weight);
const introHtml = await mdToHtml(introRaw.replace(/^---[\s\S]*?---/, '').replace('<!--more-->',''));
const crumbs = [{ href: '/', label: 'Home' }];
---
<PageLayout title="My Projects" crumbs={crumbs} current="/projects/">
  <div class="grid gap-4 p-6 bg-neutral-900 drop-shadow-2xl rounded-t-md border-b-2 border-b-primary">
    <h1 class="text-2xl">My Projects</h1>
    <div class="post-content" set:html={introHtml} />
    <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-6 my-6 cards-reveal-container">
      {items.map((e) => (
        <Card href={`/projects/${e.data.slug ?? e.id}/`} title={e.data.title} shortdesc={e.data.shortdesc} feature={e.data.feature} tags={e.data.tags} />
      ))}
    </div>
  </div>
</PageLayout>
```

- [ ] **Step 3: blog/index.astro** — same pattern, collection `blog`, sort by `date` descending, `<Card ... isBlog date={e.data.date} />`, crumbs `[Home]`, current `/blog/`.

- [ ] **Step 4: Build check** — `npm run build`; expected: passes.

### Task 5.4: Home page

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `nav`, `getCollection`, `Hero`, `Section`, `ProjectShowcase`, `Card`, `intro`, `mdToHtml`.

- [ ] **Step 1: Rewrite index.astro**

Home renders: `Hero`, then for each `nav` item a `Section` (with top-3 cards for projects/blog, none for about/contact), then `ProjectShowcase` for the first project by weight. Build `summaryHtml` for each section from its intro content (projects/blog from the `*-intro.md`; about/contact from their MDX body before `<!--more-->` via `intro()` + `mdToHtml`). Sort projects/blog for cards. Use `<BaseLayout isHome>`.
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import Section from '../components/Section.astro';
import ProjectShowcase from '../components/ProjectShowcase.astro';
import { nav } from '../config';
import { getCollection } from 'astro:content';
import { intro } from '../lib/summary';
import { mdToHtml } from '../lib/markdown';
// ...assemble per-section summaryHtml + cards, and first-project showcase
---
<BaseLayout isHome>
  <div class="grid w-full">
    <Hero />
    {sections.map((s) => <Section {...s} />)}
    <ProjectShowcase {...showcase} />
  </div>
</BaseLayout>
```
(Fill `sections`/`showcase` assembly with concrete code during implementation; each `Section` gets `item`, `summaryHtml`, and optional `cards`.)

- [ ] **Step 2: Build check** — `npm run build`; expected: passes; `/` renders hero + sections.

### Task 5.5: About, Contact, Tags, 404

**Files:**
- Create: `src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/tags/[tag].astro`, `src/pages/404.astro`
- Create: `src/content/pages/about.mdx`, `src/content/pages/contact.mdx`

**Interfaces:**
- `about.astro`/`contact.astro` render their MDX in a PageLayout single-style wrapper.
- `tags/[tag].astro` `getStaticPaths` = unique tags across `projects`+`blog`.

- [ ] **Step 1: about.mdx / contact.mdx**

Move `../content/about.md` → `src/content/pages/about.mdx` and `../content/contact.md` → `src/content/pages/contact.mdx`. Convert shortcodes: `{{< img-block ... >}}` → `<ImgBlock ... />` (import the co-located image), `{{< contactform action="..." >}}` → `<ContactForm action="https://formsubmit.co/contact@ssebs.com" />`. Keep raw Spotify `<iframe>`s as-is (MDX supports them). Import needed MDX components at top of each file.

- [ ] **Step 2: about.astro / contact.astro**

```astro
---
import PageLayout from '../layouts/PageLayout.astro';
import { Content } from '../content/pages/about.mdx';
const crumbs = [{ href: '/', label: 'Home' }];
---
<PageLayout title="About me" crumbs={crumbs} current="/about/">
  <div class="grid gap-4 p-6 bg-neutral-900 drop-shadow-2xl rounded-t-md border-b-2 border-b-primary">
    <h1 class="text-2xl">About me</h1>
    <div class="post-content"><Content /></div>
  </div>
</PageLayout>
```
Contact analogous (`current="/contact/"`, title "Contact me").

- [ ] **Step 3: tags/[tag].astro**

```astro
---
import { getCollection } from 'astro:content';
import PageLayout from '../../layouts/PageLayout.astro';
import Card from '../../components/Card.astro';

export async function getStaticPaths() {
  const projects = await getCollection('projects');
  const blog = await getCollection('blog');
  const all = [
    ...projects.map((e) => ({ e, base: '/projects', isBlog: false })),
    ...blog.map((e) => ({ e, base: '/blog', isBlog: true })),
  ];
  const tags = new Set<string>();
  all.forEach(({ e }) => e.data.tags.forEach((t) => tags.add(t)));
  return [...tags].map((tag) => ({
    params: { tag },
    props: { tag, entries: all.filter(({ e }) => e.data.tags.includes(tag)) },
  }));
}
const { tag, entries } = Astro.props;
const crumbs = [{ href: '/', label: 'Home' }];
---
<PageLayout title={`#${tag}`} crumbs={crumbs} current={`/tags/${tag}/`}>
  <div class="grid gap-4 p-6 bg-neutral-900 drop-shadow-2xl rounded-t-md border-b-2 border-b-primary">
    <h1 class="text-2xl">Tag: {tag}</h1>
    <div class="grid xl:grid-cols-3 md:grid-cols-2 gap-6 my-6 cards-reveal-container">
      {entries.map(({ e, base, isBlog }) => (
        <Card href={`${base}/${e.data.slug ?? e.id}/`} title={e.data.title} shortdesc={e.data.shortdesc} feature={e.data.feature} tags={e.data.tags} isBlog={isBlog} date={e.data.date} />
      ))}
    </div>
  </div>
</PageLayout>
```

- [ ] **Step 4: 404.astro**

Port `../themes/ssebs/layouts/404.html` into a PageLayout (or BaseLayout) page with the same message.

- [ ] **Step 5: Build check** — `npm run build`; expected: passes.

---

## Phase 6 — Content Migration (all entries)

This phase repeats a mechanical per-entry procedure. Do projects first, then blog. Group commits/checkpoints per ~5 entries.

### Task 6.1: Migration procedure (reference)

For each Hugo content file `../content/<section>/<name>.md`:

1. Create folder `src/content/<section>/<slug>/` (slug from frontmatter `slug`, else filename).
2. Create `index.mdx` there; copy frontmatter, lowercasing keys already handled by schema (`shortdesc`, `feature`, `weight`, `tags`, `date`, `sectionbg`, `c2aText`, `noC2A`).
3. Identify every image the file references (frontmatter `feature`, body `{{< img-* >}}`, galleries). Copy those files from `../static/img/...` into `src/content/<section>/<slug>/img/` preserving basenames.
4. Rewrite `feature: ./img/<basename>` (relative to the mdx).
5. At the top of the MDX body (after frontmatter), add imports:
   - `import { Image } from 'astro:assets';` (only if used directly)
   - MDX shortcode components actually used, e.g. `import ImgFull from '../../../components/mdx/ImgFull.astro';`
   - Each referenced image: `import fairing1 from './img/fairing1cover.jpg';`
6. Convert shortcodes:
   - `{{< img-full src="/img/x/y.png" alt="..." >}}` → `<ImgFull src={y} alt="..." />` (with `import y from './img/y.png'`).
   - `{{< img-float-right src=... width="300px" alt=... >}}` → `<ImgFloatRight src={...} width="300px" alt=... />`.
   - `{{< img-block ... >}}` → `<ImgBlock ... />`.
   - `{{< game-embed src=... width=... height=... >}}` → `<GameEmbed .../>` (src is a URL string, no import).
   - `{{< img-gallery gallery_dir="/img/xsr900" width="256px" >}}` → gallery pattern below.
   - `{{< contactform action=... >}}` → `<ContactForm action="https://formsubmit.co/contact@ssebs.com" />`.
   - `{{< columns >}}...<--COLSPLIT-->...{{< /columns >}}` → `<Columns>` with `<Fragment slot="left">`/`<Fragment slot="right">`.
7. Gallery pattern — at top of MDX:
   ```mdx
   import ImgGallery from '../../../components/mdx/ImgGallery.astro';
   const galleryModules = import.meta.glob('./img/*.{png,jpg,jpeg}', { eager: true, import: 'default' });
   const galleryImages = Object.values(galleryModules);
   ```
   then `<ImgGallery images={galleryImages} width="256px" />`. (MDX allows `const` in the component-scope via an exported expression; if MDX rejects top-level const, compute in a sibling `.astro` wrapper — fallback documented in Task 6.2.)
8. Keep raw HTML blocks (`.videoWrapper` iframes, Spotify embeds) verbatim.

- [ ] **Step 1:** Read this procedure; no build action.

### Task 6.2: Migrate project entries (batch 1)

**Files:** create `src/content/projects/<slug>/index.mdx` + `img/` for: `guac-and-load`, `xsr-900`, `dank-nooner`, `ninja-500`, `grom`.

- [ ] **Step 1:** Migrate each per Task 6.1. These are the image/gallery-heavy ones; validate the gallery `import.meta.glob` pattern on `xsr-900` and `guac-and-load` first.
- [ ] **Step 2: Build check** — `npm run build`; expected: passes; open `/projects/xsr-900/` and confirm gallery + optimized `srcset` in page source.
- [ ] **Step 3:** If MDX rejects top-level `const galleryImages`, create `src/components/mdx/Gallery<Slug>.astro` wrappers that do the glob and render `ImgGallery`, and import those instead. Prefer the inline glob if it works.

### Task 6.3: Migrate remaining project entries

**Files:** the rest of `../content/projects/*.md` (Peopledb, clean-mac-address, nccsv, serverclip, ssebs-www, simpleshare, tipr, a-platformer-of-some-sort, breakout-pong, csveditor, mvctipcalc, perishable-punchers, sir-flap-a-lot, images-to-pdf, go-mmp, dank-nooner already done?, audi-s4, miata).

- [ ] **Step 1:** Migrate each per Task 6.1 (batches of ~5, build-check between batches).
- [ ] **Step 2: Build check** — `npm run build`; expected: passes; spot-check 2–3 pages.

### Task 6.4: Migrate blog entries

**Files:** all `../content/blog/*.md` (businesscard, minimacropad, mmpguieditor, mvctipcalc, guac-and-load-update-1, guac-and-load-update-2, godot-ik, vibe-coding-1).

- [ ] **Step 1:** Migrate each per Task 6.1.
- [ ] **Step 2: Build check** — `npm run build`; expected: passes; open `/blog/` and one post; confirm date shows on cards.

### Task 6.5: Static assets & public files

**Files:**
- Copy: `../static/favicon.ico` → `public/favicon.ico`
- Copy: `../static/media/` (resume PDF) → `public/media/`
- Copy: `../static/img/me_vacay.jpg` → co-located in `about.mdx`'s image dir (`src/content/pages/img/`) OR `src/assets/` and import in about.mdx.
- Copy: any remaining absolute-referenced images not yet co-located → `public/img/` (last resort).

- [ ] **Step 1:** Copy favicon + media. Confirm `/media/Sebastian-Safari-Resume.pdf` link in about resolves.
- [ ] **Step 2: Build check** — `npm run build`; expected: passes.

---

## Phase 7 — Final Verification

### Task 7.1: Full parity pass

- [ ] **Step 1:** `npm run build` — zero errors, all `getStaticPaths` emit expected routes (count projects+blog+tags+static pages).
- [ ] **Step 2:** `npm run preview`; manually verify: home (hero, sections, showcase), a project single (gallery, comments, tags), a blog single (date, comments), `/projects/`, `/blog/`, `/about/` (Spotify iframes, float image, resume link), `/contact/` (form submits to formsubmit.co and message shows on `?msg=`), a `/tags/<tag>/` page, `/404`.
- [ ] **Step 3:** View source on a gallery/feature image — confirm `srcset` with multiple widths + modern format (`.webp`) is emitted (the performance goal).
- [ ] **Step 4:** Confirm GA (`G-TZW95SH05P`), Clarity (`xffw65bvgl`), and Cusdis script tags are present in built HTML.
- [ ] **Step 5:** Mobile check: hamburger toggles `#collapseMenu` (`.showit/.hideit`), sidebar stacks below content, floats collapse under `lg`.

---

## Self-Review Notes

- **Spec coverage:** tooling (0.1), styles (0.2), config/menus (1.1), collections/schema (1.2), all components incl. Analytics/Comments (Phases 2–3,5.1), every shortcode (Phase 4), all routes incl. tags taxonomy + 404 (Phase 5), full content + image co-location (Phase 6), integrations kept (0.1 constraints, 2.1, 5.1, 4.3), verification incl. srcset check (7.1). Deltas (base href drop, menu-from-config, Shiki) reflected in 2.2 / 1.1 / 0.1.
- **Open risk flagged in-plan:** MDX top-level `const` for gallery glob (Task 6.2 Step 3 provides the `.astro` wrapper fallback).
- **Type consistency:** `NavItem`/`Social` from `config.ts` used consistently; Card prop shape reused in Section/list/tags; `intro()`/`mdToHtml()` signatures stable across 3.3/5.x.

# Phase 1 Report — Data & Schema

Scope: Task 1.1 (`src/config.ts`) and Task 1.2 (`src/content.config.ts`) of `2026-06-30-astro-rewrite.md`, executed in `astro-ssebs/`.

## Files created

- `astro-ssebs/src/config.ts`
- `astro-ssebs/src/content.config.ts`
- `astro-ssebs/src/content/projects/` (empty folder, glob base)
- `astro-ssebs/src/content/blog/` (empty folder, glob base)
- Temporary: `astro-ssebs/src/content/projects/_scaffold/index.mdx` — created to validate the schema, build-checked, then deleted. No scaffold remains.

## `src/config.ts` (full contents)

```ts
export interface Social {
  name: string;
  link: string;
  weight: number;
  icon: string; // inline SVG, uses #33ffe7 fill and 2rem width as tokens for recoloring
}

export const socials: Social[] = [
  {
    name: 'linkedin',
    weight: 1,
    link: 'https://linkedin.com/in/ssebs/',
    icon: `<svg width="2rem" viewBox="0 0 24 24" fill="#33ffe7" xmlns="http://www.w3.org/2000/svg">...</svg>`,
  },
  {
    name: 'github',
    weight: 2,
    link: 'https://github.com/ssebs',
    icon: `<svg width="2rem" viewBox="0 0 24 24" fill="#33ffe7" xmlns="http://www.w3.org/2000/svg">...</svg>`,
  },
  {
    name: 'instagram',
    weight: 3,
    link: 'https://www.instagram.com/ssebs',
    icon: `<svg width="2rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>`,
  },
].sort((a, b) => a.weight - b.weight);

export const site = {
  title: 'ssebs | Sebastian Safari',
  description:
    'My name is Sebastian Safari, I call myself a "professional fixer, hobbyist figure-outer". Basically, I work as a Site Reliability Engineer and like to program various projects.',
  author: 'Sebastian Safari',
  copyrightStartYear: 2015,
};

export interface NavItem {
  label: string;
  href: string;
  weight: number;
  shortDesc: string;
}

export const nav: NavItem[] = [
  { label: 'Projects', href: '/projects/', weight: 5, shortDesc: 'Check out my projects.' },
  { label: 'About', href: '/about/', weight: 6, shortDesc: 'Who am I?' },
  { label: 'Blog', href: '/blog/', weight: 8, shortDesc: "See what I've been up to in my blog." },
  { label: 'Contact', href: '/contact/', weight: 9, shortDesc: "Let's Connect." },
].sort((a, b) => a.weight - b.weight);
```

(The `...` above are elision for this report only; the actual file contains the full SVG markup for all three icons — see verbatim-check section below. Full file is 7895 bytes, at `astro-ssebs/src/config.ts`.)

### SVG icon verbatim confirmation

Extracted each `icon:` template-literal string from `src/config.ts` and compared character length against the corresponding `params.socials.<name>.icon` value in `hugo.yaml` (single-quoted YAML scalar, lines 20/24/28):

| Social    | hugo.yaml icon length (chars) | config.ts icon length (chars) | Match |
|-----------|-------------------------------|--------------------------------|-------|
| linkedin  | 1163                          | 1163                           | yes   |
| github    | 3190                          | 3190                           | yes   |
| instagram | 2151                          | 2151                           | yes   |

All three are copied verbatim (full markup, including the `SVGRepo_bgCarrier`/`SVGRepo_tracerCarrier`/`SVGRepo_iconCarrier` `<g>` wrapper groups, every `<path>`, and closing tags), with `width="2rem"` and `fill="#33ffe7"` (or `fill="none"` on the outer instagram `<svg>`, whose inner paths use `#33ffe7`) tokens intact for later recoloring by `Socials.astro`.

## `src/content.config.ts` (full contents)

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

Matches the plan's Task 1.2 Step 1 code block exactly (no deviations).

## Verification

### Task 1.2 Step 2 scaffold check

Created `src/content/projects/_scaffold/index.mdx`:
```mdx
---
title: Scaffold
shortdesc: Temporary scaffold entry to validate collection schema.
date: 2026-06-30
weight: 0
---

hi
```
Ran `npm run build` — succeeded, 1 page built, no schema errors (only expected "no files found" warning for the still-empty `blog` glob base). Deleted `src/content/projects/_scaffold/` afterward and reran `npm run build` — succeeded again, 1 page built, with benign "no files found matching **/index.{md,mdx}" warnings for both now-empty `projects` and `blog` glob bases (expected; not errors).

### `npm run build`

Final run (after scaffold removal): **PASS** — 1 page built (`/index.html`), sitemap generated, no errors.

### `npx astro check`

Ran `npx astro check`; it auto-installed `@astrojs/check@^0.9.9` and `typescript@^6.0.3` into `package.json`/`node_modules` (accepted, per plan instructions).

Result: **0 errors, 0 warnings, 12 hints**. The "12 hints" are all `ts(6385): 'z' is deprecated` notices on every `z.*` call in `content.config.ts` — a benign Zod v4/astro:content typings deprecation notice (the `z` re-export itself is marked `@deprecated` in favor of importing `zod` directly), not a real error; the schema is the exact one specified in the plan and produces no functional or type-correctness errors.

## Deviations from the plan

None. Both files match the plan's code blocks verbatim (aside from formatting/line-wrapping of the long `description` string and multi-line object literals for readability, which do not change values or types). The scaffold entry was created and removed exactly as instructed. Base folders `src/content/projects/` and `src/content/blog/` exist and are empty, as expected for this phase.

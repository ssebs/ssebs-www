# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based personal portfolio website (https://ssebs.com) styled with TailwindCSS v4. The site showcases projects, blog posts, and provides an about/contact section. It was migrated from Hugo — see `docs/superpowers/specs/2026-06-30-astro-rewrite-design.md`.

## Architecture

### Content
Content lives in `src/content/`, loaded as Astro content collections (`src/content.config.ts`):
- `src/content/blog/<slug>/index.{md,mdx}` — blog posts
- `src/content/projects/<slug>/index.{md,mdx}` — project showcases
- `src/content/pages/` — standalone page copy pulled into `.astro` pages

Both collections share a schema: `title`, optional `slug`, `shortdesc`, optional `feature` (image), `date`, `weight`, `tags`, plus optional `sectionbg`, `c2aText`, `noC2A`. Images are colocated in the entry folder and referenced relatively so Astro's image pipeline optimizes them.

### Routes
`src/pages/`:
- `index.astro`, `about.astro`, `contact.astro`, `404.astro`
- `blog/index.astro` + `blog/[...slug].astro`
- `projects/index.astro` + `projects/[...slug].astro`
- `tags/index.astro` + `tags/[tag].astro`

### Layouts & Components
- `src/layouts/BaseLayout.astro` — html shell, head, header/footer
- `src/layouts/PageLayout.astro` — 2-column layout with sticky sidebar
- `src/components/` — Header, Footer, Sidebar, Hero, Card, Section, Socials, Breadcrumbs, Comments, Analytics, ProjectShowcase
- `src/components/mdx/` — components used inside MDX content (replacing the old Hugo shortcodes): `Img`, `ImgBlock`, `ImgFloatRight`, `ImgFull`, `ImgGallery`, `Columns`, `BlueSection`, `ContactForm`, `GameEmbed`

### Site Config
`src/config.ts` holds site metadata (`site`), nav items (`nav`), and social links (`socials`, with inline SVG icons using `#33ffe7` fill and `2rem` width as recoloring tokens). Update nav/socials here, not in components.

### Styling
TailwindCSS v4 via `@tailwindcss/vite` — configured in `src/styles/global.css` (`@theme`), not a `tailwind.config.js`.

### Static Assets
`public/` is copied verbatim: `favicon.*`, `media/` (e.g. resume PDF), `dank-nooner-v1/` (Godot web export).

## Common Commands

```bash
make install   # npm ci
make dev       # astro dev server on 0.0.0.0
make build     # production build to dist/
make preview   # serve the production build
make check     # astro check (type check)
make docker    # docker build -t ssebs/ssebs-www:astro .
```

## Deployment

- **Docker**: multi-stage `Dockerfile` — `node:22-alpine` runs `npm ci && npm run build`, then nginx serves `dist/` on port 8080 using `nginx.conf`.
- **CI/CD**: `.github/workflows/docker-image.yml` runs `npm ci && npm run build`, then builds and pushes `ssebs/ssebs-www:astro` to Docker Hub on push to `master` or `astro-rewrite`. PRs build without pushing.

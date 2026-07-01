# Phase 5 Report — Routing

## Files created

- `src/lib/markdown.ts` — `mdToHtml()` via `marked` (added `marked` dependency, `npm i marked`).
- `src/components/Comments.astro` — Cusdis thread + conditional-load script, ported verbatim from `themes/ssebs/layouts/_default/single.html` lines 40-60. Props: `{ id, url, title }`.
- `src/pages/projects/[...slug].astro` and `src/pages/blog/[...slug].astro` — single-entry pages using `getCollection`/`render`, tag chips, `post-content` block, `<Comments>`, and the image click-zoom `<script>` ported from `single.html` lines 21-37 (adapted `event.target` cast to `Node` for TS).
- `src/pages/projects/index.astro` and `src/pages/blog/index.astro` — list pages matching `list.html` structure; blog sorted by date desc, projects by weight asc.
- `src/content/pages/projects-intro.md`, `src/content/pages/blog-intro.md` — landing intros copied verbatim from `content/projects/_index.md` / `content/blog/_index.md` (frontmatter reduced to `title` only; body/`<!--more-->` kept intact).
- `src/pages/index.astro` — rewritten home page: Hero + one `Section` per `nav` item (Projects/About/Blog/Contact) + guarded `ProjectShowcase`.
- `src/pages/about.astro`, `src/pages/contact.astro`, `src/pages/tags/[tag].astro`, `src/pages/404.astro`.
- `src/content/pages/about.mdx`, `src/content/pages/contact.mdx` — converted from `content/about.md` / `content/contact.md`.
- `src/content/pages/img/me_vacay.jpg` — copied from `static/img/me_vacay.jpg`, imported relatively in `about.mdx`.

## Empty-collection guards

- Home page (`index.astro`): `projects`/`blogPosts` are fetched via `getCollection` (returns `[]` when the folder is empty/missing — confirmed by the "collection does not exist or is empty" log lines during build, which are informational, not errors). `firstProject = projects[0]` is `undefined` when empty; `showcase` stays `undefined` and `<ProjectShowcase>` is only rendered via `{showcase && <ProjectShowcase {...showcase} />}`. `projectCards`/`blogCards` are simply empty arrays, and `Section.astro` already treats `cards` as optional (`topCards.length > 0 ? … : <div></div>`).
- `src/pages/projects/[...slug].astro`, `blog/[...slug].astro`, `tags/[tag].astro`: `getStaticPaths` naturally returns `[]` for empty collections — no singles/tags are emitted, no crash.
- Removed a stale `_scaffold` content-layer cache entry (Phase 1 test scaffold) by clearing `.astro`/`dist`/`node_modules/.vite` — the scaffold file itself was already gone from disk but a cached data store still referenced it, which broke the build with `UnknownContentCollectionError` until the cache was cleared.

## MDX conversion details

- `about.mdx`: `{{< img-block src="./img/me_vacay.jpg" ... width="360px" ... >}}` → `<ImgBlock src={meVacay} title="..." width="360px" class="..." alt="..." />`, image imported as `import meVacay from './img/me_vacay.jpg'`. All 12 Spotify `<iframe>` embeds kept byte-for-byte. Resume link `/media/Sebastian-Safari-Resume.pdf` left as-is per instructions.
- `contact.mdx`: `{{< contactform action="..." >}}` → `<ContactForm action="https://formsubmit.co/contact@ssebs.com" />`.
- MDX does not support HTML comments (`<!--more-->` triggered a hard MDX-JSX parse error: "Unexpected character `!`... to create a comment in MDX, use `{/* text */}`"). Fixed by using `{/* more */}` as the marker inside `about.mdx`/`contact.mdx` only; the plain-markdown `projects-intro.md`/`blog-intro.md` keep `<!--more-->` since those are parsed as raw markdown, not compiled MDX. `src/pages/index.astro` has two small local marker-split helpers (`intro()` from `lib/summary.ts` for the `.md` files, an inline `introMdx()` using `{/* more */}` for the two `.mdx` files) to build each section's `summaryHtml`.
- Both `.mdx` files import their MDX shortcode components at the top (`ImgBlock`, `ContactForm`).

## Build result

`npm run build` — **passes, exit code 0**. 6 pages emitted: `/index.html`, `/about/index.html`, `/blog/index.html`, `/contact/index.html`, `/projects/index.html`, `/404.html`, plus `sitemap-index.xml`/`sitemap-0.xml`. No project/blog singles or `/tags/*` pages emitted (expected — those collections are empty until Phase 6). `npx astro check` → 0 errors, 0 warnings, 18 hints (all pre-existing from Phases 0-4: deprecated `z` API hints in `content.config.ts`, `onclick`/`event` hints in `ImgGallery.astro`, and one new but harmless `is:inline` hint on the Cusdis `<script>` tag in `Comments.astro`).

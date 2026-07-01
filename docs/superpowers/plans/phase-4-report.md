# Phase 4 Report — MDX Shortcode Components

## Files created

- `astro-ssebs/src/components/mdx/ImgFull.astro`
- `astro-ssebs/src/components/mdx/ImgFloatRight.astro`
- `astro-ssebs/src/components/mdx/ImgBlock.astro`
- `astro-ssebs/src/components/mdx/Img.astro`
- `astro-ssebs/src/components/mdx/ImgGallery.astro`
- `astro-ssebs/src/components/mdx/GameEmbed.astro`
- `astro-ssebs/src/components/mdx/ContactForm.astro`
- `astro-ssebs/src/components/mdx/Columns.astro`
- `astro-ssebs/src/components/mdx/BlueSection.astro`

## Files modified

- `astro-ssebs/src/styles/global.css` — appended `.blue-section` / `.blue-section .main` rules (see below).

## Props signatures

- `ImgFull`: `{ src: ImageMetadata; alt?: string; loading?: 'eager' | 'lazy' }`
- `ImgFloatRight`: `{ src: ImageMetadata; alt?: string; width?: number | string; loading?: 'eager' | 'lazy' }`
- `ImgBlock`: `{ src: ImageMetadata; alt?: string; width?: number | string; title?: string; class?: string }`
- `Img`: `{ src: ImageMetadata; title?: string; class?: string; width?: number | string }`
- `ImgGallery`: `{ images: ImageMetadata[]; width?: string }`
- `GameEmbed`: `{ src: string; width?: string; height?: string }`
- `ContactForm`: `{ action: string }`
- `Columns`: `{}` (two named slots: `left`, `right`)
- `BlueSection`: `{}` (default slot)

## Per-component notes

**ImgFull** (source: `img-full.html`) — `<Image>` with `class="my-6"`, `widths={[480, 960, 1440]}`, `sizes="(max-width: 960px) 100vw, 960px"`, `loading` passthrough, per plan guidance. Translation only (Hugo `.Get` → props).

**ImgFloatRight** (source: `img-float-right.html`) — `class="custom-float-right ml-3"` verbatim. `width` prop is parsed to a number and used to derive `widths=[w, w*2]`; the `Image` `width` attribute is set from `widths[0]` (astro:assets' `width` prop only accepts `number | \`${number}\``, so a raw `"300px"` string can't be passed directly — this is a necessary translation, not a markup change).

**ImgBlock** (source: `img-block.html`) — default class `block` unless `class` prop supplied, matching Hugo's `{{ with .Get "class" }}...{{ else }}block{{ end }}`. `width` normalized to a number for the same `astro:assets` typing reason as above.

**Img** (source: `image.html`) — generic `<Image src alt={title} class width>`, same numeric-width normalization.

**ImgGallery** (source: `img-gallery.html`) — grid markup, lightbox markup, `<style>` block, and `<script>` (openLightbox/closeLightbox/changeImage) are byte-for-byte verbatim from the Hugo shortcode except: (1) the `<script>` is marked `is:inline` because the markup uses inline `onclick="fn(event)"` handlers that require the functions to exist as real globals — Astro's default script processing scopes/bundles scripts as modules and those functions would not be reachable from inline handler attributes otherwise; (2) the `<style>` uses `define:vars={{ imgWidth: width }}` + `var(--imgWidth)` in place of Hugo's `{{ $imgWidth }}` template interpolation (same visual result, since Astro scoped `<style>` blocks can't take runtime template literals the way Hugo's could) — no selectors or property values were altered. Images are sourced from the `images` prop (array of imported `ImageMetadata`) instead of Hugo `readDir`, rendered via `<Image widths={[256, 512]} width={parseInt(width) || 256} ...>` per the plan's `[256, 512]` guidance. Verified via a temporary smoke-test page that `.gallery-item`, `#lightbox`, and the script functions all appear correctly in the built HTML.

**GameEmbed** (source: `game-embed.html`) — placeholder markup, SVG, and click-to-load logic copied verbatim. `uid` generated with `crypto.randomUUID()` at build time (replacing Hugo's `printf "%x" now.UnixNano`). `src`/`width`/`height`/`uid` injected via `define:vars`; script marked `is:inline` (it manipulates the DOM by id lookups built from `uid`, same pattern as the Hugo original, and needs to run unmodified/unbundled).

**ContactForm** (source: `contactform.html`) — all form fields/classes/SVG copied verbatim. `action` comes from the prop. The `_next` hidden input's initial `value` is left as `""` (per plan) since the inline script always overwrites it with `encodeURI(...)?msg=...`. The `<script>` (rewriting `_next`, reading `?msg=` and displaying/alerting it) is verbatim and marked `is:inline` since it does plain DOM manipulation with no Astro/Hugo templating inside it.

**Columns** (source: `columns.html`) — implemented as two named slots (`left`/`right`) inside `class="grid md:grid-cols-2 justify-items-center gap-6"`, per the plan (Hugo's `<--COLSPLIT-->` string-split approach doesn't translate to MDX; content authors will use `<Fragment slot="left">`/`<Fragment slot="right">` in Phase 6).

**BlueSection** (source: `blueSection.html`) — `<section class="blue-section"><div class="main"><slot /></div></section>` + trailing `<div style="clear: both;"></div>`, verbatim structure.

## `.blue-section` / `.main` styles — ADDED (flagged per instructions)

`tailwind-input.css` / the current `global.css` had **no** `.blue-section` or `.main` rules (confirmed via grep — zero matches before this change). Added a minimal new block to `global.css`:

```css
.blue-section {
  overflow: auto;
}

.blue-section .main {
  background-color: var(--color-primary-950);
  border: 1px solid var(--color-primary-700);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin: 1.5rem 0;
}
```

This gives a mild blue panel (dark primary-950 background, primary-700 accent border, rounded corners, padding) consistent with the site's neutral-900 card aesthetic elsewhere, and `overflow: auto` on the outer `<section>` acts as the clearfix companion to the shortcode's own trailing `clear: both` div (mirroring the float-clearing purpose the original Hugo shortcode implies). **This is new styling, not a port** — flagged as requested since no equivalent existed to copy verbatim.

## Verification performed

- `npm run build` — passes (1 page, `dist/index.html`, no errors) both before and after adding components (no consumers exist yet per Phase 6 scope).
- `npx astro check` — 0 errors, 0 warnings (17 pre-existing "hints" about deprecated `z`/`event` global typings, unrelated to Phase 4 files and present in `content.config.ts` before this work).
- Smoke test: created a temporary `src/pages/smoketest-phase4.mdx` importing and exercising all 9 components with real images (`src/assets/me_wedding.jpg`, `src/assets/RocketOnly.png`). `npm run build` succeeded, generated 12 optimized `.webp` variants (srcset widths confirmed), and the built HTML contained the gallery markup/lightbox script, game-embed container, contact form `msg-container`, blue-section markup, and the columns grid wrapper. The temp file was deleted afterward and a final `npm run build` was re-run to confirm the project returns to its clean 1-page state with no leftover artifacts.

## Final build result

`npm run build` — **PASS** (1 page built, no errors, no leftover temp files).

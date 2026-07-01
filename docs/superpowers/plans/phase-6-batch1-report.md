# Phase 6, Task 6.2 — Batch 1 Project Migration Report

## Entries migrated

Created `src/content/projects/<slug>/index.mdx` + co-located `img/` for:

1. `guac-and-load` — feature `./img/guac-and-load-0.png`, uses `ImgFloatRight`, `ImgFull` (x3), `GameEmbed`, raw `.videoWrapper` YouTube iframe, and `ImgGallery` (14 images copied — the entire `guac-and-load-gal` folder, including auto-named `Guac_and_Load_*.png` files not directly referenced in the body, per the "copy entire gallery folder" rule).
2. `xsr-900` — feature `./img/fairing1cover.jpg`, body is gallery-only (`ImgGallery`, 4 images from `projects/xsr900/`).
3. `dank-nooner` — feature `./img/DankNoonerIcon.jpg`, uses `ImgFloatRight` (x2), `ImgFull` (x6), `GameEmbed`. Images pulled from both `dank-nooner-v2/` and `projects/dank-nooner/` source folders (flattened into one `img/`) plus the standalone `dank-nooner-bike-skin.png`.
4. `ninja-500` — feature `./img/1.jpg`, gallery-only (6 images from `projects/ninja-500/`).
5. `grom` — feature `./img/wheelie.jpg`, gallery-only (3 images from `projects/grom/`).

All frontmatter keys copied as-is (`title`, `slug`, `shortdesc`, `feature`, `date`, `weight`, `tags`); none of these five used `sectionbg`/`c2aText`/`noC2A`.

## Gallery glob approach

The **inline MDX approach worked** — no `.astro` wrapper fallback was needed:

```mdx
import ImgGallery from '../../../components/mdx/ImgGallery.astro';

export const galleryImages = Object.values(import.meta.glob('./img/*.{png,jpg,jpeg,PNG,JPG}', { eager: true, import: 'default' }));
```

`export const` at MDX top level compiled and built cleanly for all 3 gallery entries (guac-and-load, xsr-900, ninja-500, grom). Validated first on `xsr-900` and `guac-and-load` as instructed, then reused unchanged for `ninja-500`/`grom`.

One deviation: the source Hugo shortcodes for xsr-900/ninja-500/grom used `width="full"` (`{{< img-gallery ... width="full" >}}`), which is invalid as a CSS `minmax()`/`width` value and would break the grid CSS custom property in `ImgGallery.astro`. Used `width="256px"` instead (matching `guac-and-load`'s original width) for a working grid on all four gallery entries.

## index.astro showcase fix

`src/pages/index.astro` line ~82 changed from:
```ts
const showcaseHtml = await mdToHtml(intro(firstProject.body ?? ''));
```
to:
```ts
const showcaseHtml = await mdToHtml(firstProject.data.shortdesc);
```
`intro`/`mdToHtml` imports are still used elsewhere in the file (projects/blog/about/contact section intros), so nothing else changed. Verified in built `dist/index.html`: the showcase section now renders `dank-nooner`'s shortdesc text ("An open-world motorcycle stunt game. Do all the stupid stuff on a bike from the safety of your home.") — `dank-nooner` is the current lowest-weight (21) project, so it's the showcased entry. No raw MDX/import garbage present.

## `<!--more-->` marker

None of the 5 source `.md` files contained a `<!--more-->` marker — no removals needed for this batch.

Two other HTML comments in `guac-and-load.md` (a commented-out `img-float-right` shortcode line, and a build-note comment about the web export folder) were dropped entirely rather than ported, since they were dead/informational content with no functional purpose in the MDX body.

## Build result

`npm run build` in `astro-ssebs/`: **passed**, 17 pages built, no errors. One benign warning: `dank-nooner-v66.webp` (source is already `.webp`) could not be further re-encoded by Sharp ("Sharp doesn't support this format") and was used unoptimized — expected, not a regression, since it's already a compressed web format.

## Verification performed

- Opened `dist/projects/xsr-900/index.html` and `dist/projects/guac-and-load/index.html`.
- Confirmed multi-width, `.webp` `srcset` output, e.g.:
  - xsr-900: `srcset="/_astro/fairing1cover....webp 256w, /_astro/fairing1cover....webp 512w"`
  - guac-and-load: `srcset="/_astro/shift....webp 480w, /_astro/shift....webp 960w, /_astro/shift....webp 1440w"`
- Confirmed `.gallery-item` markup present and non-empty on both pages (gallery rendered).
- Confirmed home page showcase renders shortdesc text (see above), not raw MDX source.

## Concerns / follow-ups for later batches

- None blocking. The `width="full"` → `256px` substitution should be applied consistently to any other remaining project entries that used `width="full"` in their gallery shortcode (relevant for Task 6.3).

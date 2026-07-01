# Phase 6, Task 6.3 — Batch 2a Project Migration Report

## Entries migrated

Created `src/content/projects/<slug>/index.mdx` (+ co-located `img/` where images exist) for:

1. `Peopledb` — feature was an **external raw.githubusercontent.com URL** (not in `static/`). Downloaded all 3 referenced images (`ppldb-home-search.png`, `ppldb-detail-info.png`, `ppldb-create-person.png`) via `curl` into `img/`; feature rewritten to `./img/ppldb-detail-info.png`. Body `![]()` markdown images converted to `<ImgFull>`.
2. `clean-mac-address` — text-only, no images. No `img/` folder needed (removed the pre-created empty one).
3. `nccsv` — feature `./img/nccsv.png` (copied from `static/img/nccsv.png`). Used `{{< rawhtml >}}` wrapping an asciinema `<script>` tag — unwrapped to a bare `<script>` tag verbatim (MDX supports raw HTML/script tags directly, so the `rawhtml` shortcode itself was dropped, only its inner content kept).
4. `serverclip` — text-only, no images.
5. `ssebs-www` — feature `./img/ssebs-www-current.png`; body had 5 markdown images from `static/img/projects/ssebs-www-*.png`, all copied into a flattened `img/` folder and converted to `<ImgFull>`.
6. `simpleshare` — feature was an **external raw.githubusercontent.com URL** (`upload.png`). Downloaded all 3 referenced images (`home.png`, `upload.png`, `download.png`) via `curl` into `img/`; feature rewritten to `./img/upload.png`. Body images converted to `<ImgFull>`.
7. `tipr` — feature `./img/tipr.png` (copied from `static/img/tipr.png`); single body image converted to `<ImgFull>`.
8. `images-to-pdf` (frontmatter `slug: img-2-pdf`, so folder is `img-2-pdf` per the "slug from frontmatter" rule) — feature was an **external raw.githubusercontent.com animated `.gif`** (`image-to-pdf.gif`, ~3.1MB). Downloaded via `curl` into `img/`; feature rewritten to `./img/image-to-pdf.gif`. Body gif converted to `<ImgFull>`.
9. `go-mmp` — feature `./img/MMPGUIScreenshot.png`; 6 images copied from `static/img/*.png|.jpg` (flattened, no subfolder in source) into `img/`; all `{{< img-block ... >}}` uses converted to `<ImgBlock>` (including `width` props like `"400px"`, `"360px"`, `"256px"`). Raw `display:grid` `<div>` layouts and the `.videoWrapper` YouTube iframe kept verbatim.

No galleries in this batch (none of the 9 entries used `img-gallery`).

## External/remote image handling (new pattern this batch)

Three entries (`Peopledb`, `simpleshare`, `images-to-pdf`) had `feature:` and body images pointing at `raw.githubusercontent.com` URLs rather than `../static/img/...` — the content schema's `image()` helper requires a locally resolvable file, so these could not be left as remote URLs. Downloaded each with `curl -sSL -o <name> <url>` directly into the entry's `img/` folder, then treated exactly like a locally-sourced image (import + `<ImgFull>` + `feature: ./img/<name>`). This is a new sub-case of the Task 6.1 procedure worth flagging for any later batches that still reference external image URLs.

## `<!--more-->` marker removals

Only `go-mmp` contained a `<!--more-->` marker (between the two-column intro grid and the "Getting started" section, right before a `{{< spacer 2rem >}}`). Removed per the marker rule; the following `spacer` shortcode content was kept.

## `{{< spacer Xrem >}}` shortcode (new, not covered by existing mdx components)

`go-mmp` used `{{< spacer 1rem >}}` / `{{< spacer 2rem >}}` (Hugo shortcode source: just `<div style="min-height: {{.Get 0}};"></div>`). There's no dedicated MDX component for this, so converted inline to `<div style="min-height: 1rem;"></div>` / `<div style="min-height: 2rem;"></div>` directly in the MDX body — no import needed, consistent with how raw HTML blocks are otherwise kept verbatim.

## Tricky conversions

- `nccsv`'s `{{< rawhtml >}}...{{< /rawhtml >}}` shortcode — the wrapper itself has no MDX equivalent/component; just kept the inner raw `<script>` tag since MDX passes through raw HTML natively.
- `images-to-pdf`'s feature is an animated GIF; Sharp/Astro's image pipeline re-encoded it to `.webp` per responsive width variant during build (e.g. `image-to-pdf.BfB5wR8Q_*.webp`, up to ~1MB for the largest variant) — this necessarily produces a **static (non-animated)** image, since Sharp only processes it as a still frame. Flagged as a concern below.
- `Peopledb`/`simpleshare` external images: verified downloads are real images (not HTML error pages) via `file` — all valid PNGs at their expected dimensions.

## Build result

`npm run build` in `astro-ssebs/`: **passed**, **36 pages built**, no errors. The only console output besides normal asset processing was the pre-existing, expected warning that the `blog` collection is empty (`No files found matching "**/index.{md,mdx}" in directory "src\content\blog"` — blog entries are out of this batch's scope, Task 6.4 migrates them).

## Concerns / follow-ups for later batches

- **Animated GIF feature image (`images-to-pdf`)**: the site now shows a static frame instead of the animated demo GIF wherever the optimized `<Image>`/`<ImgFull>` is rendered. If preserving the animation is desired, consider serving the original `.gif` unoptimized (e.g. via a `public/` copy + plain `<img>` tag) instead of routing it through Astro's image pipeline. Not fixed in this batch since it wasn't flagged as a requirement, and the build succeeds either way.
- **External image URL pattern**: 3 of 9 entries needed a `curl` download step not explicitly listed in Task 6.1 — worth confirming remaining un-migrated project/blog entries (per the plan's Task 6.3/6.4 lists) for other `raw.githubusercontent.com` or similar remote image references before assuming all remaining sources are purely local.
- Removed the two placeholder empty `img/` dirs (`clean-mac-address`, `serverclip`) that were pre-created before confirming those entries had no images.

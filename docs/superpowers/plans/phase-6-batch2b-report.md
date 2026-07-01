# Phase 6, Task 6.3 — Batch 2b Project Migration Report

## Entries migrated

Created `src/content/projects/<slug>/index.mdx` + co-located `img/` for:

1. `a-platformer-of-some-sort` — feature `./img/Platformer.jpg` (copied from `static/img/projects/Platformer.jpg`). Single body screenshot converted from `![]()` to `<ImgFull>`.
2. `breakout-pong` — feature `./img/BreakoutPong.png` (copied from `static/img/projects/BreakoutPong.png`). Single body screenshot converted to `<ImgFull>`.
3. `csveditor` — feature was an **external raw.githubusercontent.com URL** (`CSV_Editor.PNG?raw=true`). Downloaded via `curl` into `img/CSV_Editor.PNG`; verified valid PNG (582x167) before use. Feature rewritten to `./img/CSV_Editor.PNG`; body image converted to `<ImgFull>`. Kept the relative link `[nccsv](./projects/nccsv)` verbatim (pre-existing relative link style, unrelated to the image-migration task).
4. `mvctipcalc` — frontmatter `slug: MVCTipCalc` kept as-is (folder is `mvctipcalc`, per "slug from frontmatter overrides URL" rule — matches the established pattern from `images-to-pdf`/`img-2-pdf` in batch 2a, but here folder name and id differ from `slug` intentionally per source). Feature `./img/MVCTipCalc.png` (copied from `static/img/MVCTipCalc.png`); single body screenshot converted to `<ImgFull>`.
5. `perishable-punchers` — feature `./img/PerishablePunchers.jpg` (copied from `static/img/projects/PerishablePunchers.jpg`). Single body screenshot converted to `<ImgFull>`. Long ASCII-art-style tilde-underline block at the end kept verbatim as plain text.
6. `sir-flap-a-lot` — feature `./img/SFA.png` (copied from `static/img/projects/SFA.png`). Single body screenshot converted to `<ImgFull>`.
7. `audi-s4` — feature `./img/s4.jpg` (copied from `static/img/s4.jpg`). Body `![]()` main photo converted to `<Img>` (generic `image` shortcode equivalent, matching the source's `{{< image ... >}}` usage for the second image). Second image used the Hugo `{{< image src="./img/s4_turkey.jpg" title="..." class="w-[300px]" >}}` shortcode — converted to `<Img src={s4TurkeyImg} title="..." class="w-[300px]" />` (copied `static/img/s4_turkey.jpg` into `img/`).
8. `miata` — feature `./img/miata.jpg` (copied from `static/img/miata.jpg`). Body main photo converted from `![]()` to `<Img>`; the `{{< image src="./img/phone_adapter.jpg" title="phone adapter" class="w-[256px]" >}}` shortcode converted to `<Img src={phoneAdapterImg} title="phone adapter" class="w-[256px]" />` (copied `static/img/phone_adapter.jpg` into `img/`).

All frontmatter keys copied as-is (`title`, `slug` where present, `shortdesc`, `feature`, `date`, `weight`, `tags`); none of these 8 used `sectionbg`/`c2aText`/`noC2A`.

## Galleries

None — no entries in this batch used `img-gallery`.

## External-URL downloads

Only `csveditor`: feature pointed at `https://raw.githubusercontent.com/ssebs/csveditor/master/CSV_Editor.PNG?raw=true`. Downloaded with `curl -sSL -o CSV_Editor.PNG <url>` into the entry's `img/` folder; confirmed via file signature it's a real PNG (582x167), not an HTML error page. Same pattern as batch 2a's `Peopledb`/`simpleshare`/`images-to-pdf`.

## Unknown-shortcode conversions

`{{< image src=... title=... class=... >}}` (Hugo `image.html` shortcode) appeared in `audi-s4` and `miata`, both used for secondary inline images with a `title` and a Tailwind `class` (`w-[300px]`, `w-[256px]`). This maps directly to the existing `Img.astro` MDX component (`src/components/mdx/Img.astro`, props `{ src, title, class, width }` — ports the same Hugo `image.html` shortcode per the Phase 4 plan), so no new inline-HTML conversion was needed; used `<Img src={...} title="..." class="w-[...]" />` directly.

## `<!--more-->` removals

None of the 8 source `.md` files contained a `<!--more-->` marker.

## Build result

`npm run build` in `astro-ssebs/`: **passed**, **46 pages built**, no errors. Only console output was the pre-existing expected warning that the `blog` collection is empty (`No files found matching "**/index.{md,mdx}" in directory "src\content\blog"`) — out of scope for this batch (Task 6.4 migrates blog).

## Concerns / follow-ups

- None blocking. `mvctipcalc`'s `slug: MVCTipCalc` differing in case from its folder name `mvctipcalc` is intentional (mirrors Hugo's original behavior where `slug` sets the URL segment independent of the source filename) — confirmed the schema's `entry.data.slug ?? entry.id` pattern in the routing pages handles this correctly.

# Phase 6, Task 6.4 — Blog Migration Report

## Posts migrated

Created `src/content/blog/<slug>/index.mdx` + co-located `img/` for all 8 blog entries:

1. `businesscard` (frontmatter `slug: bizcard`) — feature `./img/bizcardboth.jpg`. Images: `bambu-carbon-fx-plate.jpg` (ImgFloatRight), `bizcardcad.png` + `bizcardsteps.jpg` (ImgFull), `bizcardfront.jpg` + `bizcardback.jpg` (ImgBlock, inside a 2-col grid div kept verbatim).
2. `minimacropad` — feature `./img/MMPPrinted.jpg`. Images: `MMPPrinted.jpg` (ImgFloatRight, reused from feature), `PythonMMPScreenshot.png` / `MMPGUIScreenshot.png` (ImgFloatRight), `MMPWiring.jpg` (ImgBlock).
3. `mmpguieditor` — feature `./img/ConfigEditor.png`. Images: `MMPPrinted.jpg`, `GUIEditorDiagram.png`, `mmpnewwindows.png`, `fyne-draggable-api.png`, `whowrotethiscode.jpg`, `ConfigEditor.png`, `MacroEditor.png` — all via `ImgBlock` (matches source's `img-block` usage throughout, including two `class="w-96 mx-auto my-4"` cases).
4. `mvctipcalc` (blog collection; distinct from `projects/mvctipcalc`) — feature `./img/MVCTipCalc.png`. Images: `MVCTipCalc.png` (ImgFloatRight, used twice — top and near the end) and `mvc.webp` (ImgFloatRight).
5. `guac-and-load-update-1` — feature `./img/guac-and-load.png` (source had already-relative `./img/guac-and-load-gal/guac-and-load.png`; flattened into the post's own `img/`). Uses `ImgFloatRight` for the feature image plus a full-folder **gallery** (see below).
6. `guac-and-load-update-2` — feature `./img/outside.png` (source: `./img/guac-blog-2/outside.png`, flattened). Images: `outside.png`, `go_deaf.png`, `wash_hands.png`, `zombie_hallway.png`, `taking_order.png` (all `ImgFloatRight`), `meme.jpg` (`ImgBlock`).
7. `godot-ik` — feature `./img/moto-player-controller-wheelie-anim.png` (source `./img/dank-nooner-v2/...`, flattened). Images: `screenshot03.png` (copied from the *project's* `static/img/projects/dank-nooner/screenshot03.png`, flattened path), `moto-player-controller-leaning-anim.png`, `moto-player-controller-wheelie-anim.png` — all `ImgFloatRight`. Plus a raw local **video** (see below).
8. `vibe-coding-1` — feature `./img/vibe-coding-1.png`. Images: `vibe-coding-1.png` (ImgFloatRight, top), `todo-sidebar-md.png` / `dank-nooner-skeleton-gen.png` (ImgFull), `dank-nooner-settings-menu.png` / `dank-nooner-bike-skin.png` (ImgFloatRight).

All frontmatter keys copied as-is (`title`, `slug`, `shortdesc`, `feature`, `date`, `weight`, `tags`); none used `sectionbg`/`c2aText`/`noC2A`.

## Galleries

- `guac-and-load-update-1`: source used `{{< img-gallery gallery_dir="/img/guac-and-load-gal" width="256px" >}}` referencing a 13-image folder. Copied the **entire** `static/img/guac-and-load-gal/*.png` folder into the post's `img/` (13 files), then used the standard inline glob pattern:
  ```mdx
  export const galleryImages = Object.values(import.meta.glob('./img/*.{png,jpg,jpeg,PNG,JPG}', { eager: true, import: 'default' }));
  ```
  `<ImgGallery images={galleryImages} width="256px" />`. Verified in the built HTML: `class="gallery"` grid renders.

## External-URL downloads

None — all blog images were already local files under `static/img/` (no `https://` image URLs in any of the 8 sources).

## Unknown-shortcode conversions

- `{{< spacer 1rem >}}` (appeared in `minimacropad` x3, `mmpguieditor` x2, `mvctipcalc` x1) → inlined per the Hugo source (`themes/ssebs/layouts/shortcodes/spacer.html`) as `<div style="min-height: 1rem;"></div>`.
- `{{< clearfix >}}` (appeared in `godot-ik` x1, `vibe-coding-1` x2) → inlined per the Hugo source (`clearfix.html`) as `<div style="clear:both;"></div>` (equivalent to the `<div style="clear: both;">` blocks already used verbatim elsewhere).

## Non-image asset (video)

- `godot-ik` embeds a local `.mp4` (`godot-inverse-kinematics.mp4`, source was `<video><source src="./img/dank-nooner-v2/godot-inverse-kinematics.mp4"></video>`). Copied it into the post's `img/` folder and imported it as a plain ESM asset (`import ikVideo from './img/godot-inverse-kinematics.mp4'`), then used `<source src={ikVideo} type="video/mp4" />`. Vite's default asset handling resolved this to a hashed, built `/_astro/godot-inverse-kinematics.<hash>.mp4` URL — confirmed present in `dist/blog/godot-ik/index.html`.

## `<!--more-->` removals

None of the 8 source `.md` files contained a `<!--more-->` marker (blog posts don't use the home-page teaser mechanism the way project pages might). `mvctipcalc.md` had one HTML **comment** (`<!-- > If you'd like to learn more... -->`) which was dropped since it was already Hugo-side-inactive commented-out text, not a shortcode/marker requiring conversion.

## Build result

`npm run build` in `astro-ssebs/`: **passed**, **55 pages built** (up from the prior 46 project-only pages: 46 + 8 blog posts + 1 `/blog/` index = 55), no errors, no warnings (the previous "blog collection is empty" warning is gone).

## Verification performed

- `dist/blog/index.html`: all 8 posts listed as cards with dates rendered and sorted descending (`Feb 24 2026` → `Dec 10 2024`), `card-hover`/`card-reveal` classes present.
- `dist/blog/<slug>/index.html` exists for all 8 slugs (folder names: `bizcard`, `minimacropad`, `mmpguieditor`, `mvctipcalc`, `guac-and-load-update-1`, `guac-and-load-update-2`, `godot-ik`, `vibe-coding-1` — note `businesscard`'s folder routes as `/blog/bizcard/` per its `slug:` frontmatter, consistent with `entry.data.slug ?? entry.id` routing).
- Confirmed `<img>` tags with responsive `srcset`/`.webp` output on `mvctipcalc`, `godot-ik`, `vibe-coding-1`, `guac-and-load-update-1` pages.
- Confirmed the `guac-and-load-update-1` gallery grid (`class="gallery"`) and the `godot-ik` video `<source>` tag point to real built asset URLs.

## Concerns / follow-ups

None blocking. Minor note: `businesscard`'s content-collection folder name (`businesscard`, per the task's naming list) differs from its frontmatter `slug: bizcard` and thus its live URL (`/blog/bizcard/`) — this mirrors the same pre-existing pattern already established for `projects/mvctipcalc` (`slug: MVCTipCalc`) in earlier batches, and the routing logic already handles it correctly.

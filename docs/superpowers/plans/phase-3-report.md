# Phase 3 Report — Home & Listing Components

## Files created
- `src/components/Card.astro`
- `src/components/Hero.astro`
- `src/components/Section.astro`
- `src/components/ProjectShowcase.astro`
- `src/lib/summary.ts`
- `src/assets/me_wedding.jpg` (copied from `../static/img/me_wedding.jpg`; `src/assets/RocketOnly.png` already existed from Phase 2)

## Files overwritten
- `src/components/Sidebar.astro` — the Phase 2 placeholder (`<div data-current={current}></div>`) was fully replaced with the real port of `themes/ssebs/layouts/partials/sidebar.html`. Confirmed: no `TODO: Phase 3` comment remains, full markup/classes present, wired to `PageLayout.astro` (already imported `Sidebar` and passes `current`; no change needed there).

## Per-component notes

**Card.astro** (port of `card.html`): markup/classes copied verbatim (`card-hover`, `card-reveal`, `img-zoom-container`, `tag-hover`, etc.). Templating translated: `.RelPermalink` → `href` prop, `.Title` → `title`, `in .RelPermalink "blog"` → `isBlog` prop, `.Params.ShortDesc` → `shortdesc`, `range .Params.tags` → `tags.map`. Feature image swapped from raw `<img>` to `<Image src={feature} widths={[248,496]} sizes="248px" .../>` per plan. Date formatting done via `date.toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})`. `interface Props` added with exact shape requested.

**Hero.astro** (port of `hero.html`): markup/classes/CTA links copied verbatim. Only the `<img>` was replaced with `<Image src={meWedding} width={300} height={300} .../>` (imported from `src/assets/me_wedding.jpg`); had to add an explicit `alt` attribute (astro:assets requires it) — used the same text as the `title` attribute since Hugo source had no alt.

**Section.astro** (port of `section.html`): title = `item.shortDesc`. `summaryHtml` rendered via `set:html` inside `.post-content`. Up to 3 `<Card {...c} />` rendered when `cards` prop present (`.slice(0,3)`), matching Hugo's `lt $idx 3` loop. C2A renders `item.href` with `c2aText || 'See more...'`, suppressible via `noC2A`. `sectionbg` defaults to `bg-neutral-900` exactly as Hugo's `$bg` default. Added `feature?: ImageMetadata` rendered via `<Image>` (mirrors the `md:grid-cols-2` conditional column layout). `CardData` interface locally declared to match Card's props for typed `cards` prop.

**ProjectShowcase.astro** (port of `projectshowcase.html`): "A little bit more about the `<title>`" heading, `summaryHtml` rendered via `set:html` inside `.post-content`, C2A block (`href`, `c2aText || 'See more...'`) suppressible via `noC2A`. Classes copied verbatim; the outer `{{ with .Site.GetPage "projects" }}`/`{{ with index .Pages 0 }}` Hugo lookups are handled by the caller (Phase 5 home page) which will pass `title`/`href`/`summaryHtml` directly as props.

**Sidebar.astro** (port of `sidebar.html`, overwriting placeholder): profile `<img>` replaced with `<Image src={meWedding} alt=... title="A photo of my at my wedding." .../>`. Hugo `ne .Page.RelPermalink "/about/"` / `/contact/` / `/blog/` conditionals translated to `current !== '/about/'` etc. using the `current` prop. Tag chips and `More projects` link classes copied verbatim. Socials rendered via `<Socials color="#33ffe7" iconsize="1.75rem" />` exactly as spec'd.

**src/lib/summary.ts**: `intro(body)` implemented exactly as given in the plan (splits on `<!--more-->`, trims).

## Build/typecheck result
- `npm run build` — **passes**, 1 page built (blank starter `index.html`), no errors. Content collections show expected "no files found" warnings only (projects/blog collections still empty — populated in Phase 6).
- `npx astro check` — **0 errors, 0 warnings (component-related)**, 12 hints. The only warnings shown are pre-existing `ts(6385): 'z' is deprecated` notices in `src/content.config.ts` from Phase 1 (Zod v4 deprecation of the `z` export alias), unrelated to Phase 3 work. Fixed two real type errors during this phase: missing `alt` prop on the `<Image>` in `Hero.astro` and in `Sidebar.astro` (astro:assets requires `alt`); both resolved by adding explicit `alt` text.

No temporary smoke-test pages were created; `src/pages/index.astro` was left untouched (still the blank Astro starter, to be rewritten in Phase 5).

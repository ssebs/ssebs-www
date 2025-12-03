# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Hugo-based personal portfolio website (https://ssebs.com) built with a custom theme using TailwindCSS. The site showcases projects, blog posts, and provides an about/contact section.

## Architecture

### Hugo Structure
- **Content Organization**: Content is in `/content/` with three main sections:
  - `/content/blog/` - Blog posts about projects and development updates
  - `/content/projects/` - Project showcases with descriptions and images
  - `/content/about.md` - Personal information
  - `/content/contact.md` - Contact form page

- **Custom Theme**: The `ssebs` theme is located in `/themes/ssebs/`
  - Uses TailwindCSS for styling (not Go templates for CSS)
  - Responsive layout with a sticky sidebar on desktop
  - Homepage uses a different layout (no sidebar) vs other pages (2-column with sidebar)

### Layout System
- **Base Template**: `/themes/ssebs/layouts/_default/baseof.html`
  - Conditionally renders homepage vs. standard 2-column layout based on `.IsHome`
  - Standard pages use 4-column grid with sidebar in column 4, content spans columns 1-3

- **Partials**: Located in `/themes/ssebs/layouts/partials/`
  - `header.html` - Navigation menu
  - `sidebar.html` - Sticky sidebar with TOC/navigation
  - `footer.html` - Site footer with socials
  - `hero.html` - Homepage hero section
  - `card.html` - Reusable card component for project/blog listings
  - `section.html` - Reusable section wrapper

- **Shortcodes**: Located in `/themes/ssebs/layouts/shortcodes/`
  - `img-block.html` - Block-level image display
  - `img-float-right.html` - Floating right image
  - `img-full.html` - Full-width image
  - `img-gallery.html` - Image gallery grid
  - `contactform.html` - Contact form component
  - `columns.html` - Multi-column layout
  - `blueSection.html` - Styled section wrapper
  - `rawhtml.html` - Raw HTML passthrough

### TailwindCSS Setup
- **Theme Config**: `/themes/ssebs/tailwind.config.js`
  - Custom color palette: primary (blue), secondary, tertiary, quaternary, quinary (cyan/teal)
  - Uses Ubuntu font family
  - Includes `@tailwindcss/forms` plugin
  - Content scanning: `./**/*.{js,html,css,md}`

- **Input/Output**:
  - Input: `/themes/ssebs/assets/css/tailwind-input.css`
  - Output: `/themes/ssebs/assets/css/style.css`

### Configuration
- **Main Config**: `hugo.yaml` (symlinked as `config.yaml`)
  - baseURL: https://ssebs.com/
  - Theme: ssebs
  - Key params: `useBaseURL` flag for deployment flexibility
  - Social links configured with custom SVG icons (LinkedIn, GitHub, Instagram)
  - Syntax highlighting: onedark style with line numbers

## Common Commands

### Development
```bash
# Initial setup
cd themes/ssebs/
npm install

# Start Tailwind CSS watch mode (in themes/ssebs/)
npm run start

# Start Hugo development server (in project root)
hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0

# Dev with custom baseURL (e.g., behind load balancer)
hugo serve --noHTTPCache --disableFastRender --baseURL "https://your-url.com/" --bind 0.0.0.0
```

### Building
```bash
# Build TailwindCSS for production (in themes/ssebs/)
npm run build

# Build Hugo site for production
HUGO_ENV=production HUGO_PARAMS_USEBASEURL=true hugo --baseURL "https://your-url.com/" --minify
```

### Docker
```bash
# Build Docker image
docker build -t ssebs/ssebs-www .

# Run Docker container
docker run -p 8080:8080 ssebs/ssebs-www
```

## Development Workflow

1. When making theme changes, ensure Tailwind watch mode is running (`npm run start` in `themes/ssebs/`)
2. Hugo's live reload works with `--disableFastRender` and `--noHTTPCache` flags for reliable hot reloading
3. Content markdown files support Hugo shortcodes for images and custom layouts
4. Front matter in content files includes: title, slug, shortdesc, feature (image), date, weight, tags

## Deployment

- **Docker**: Multi-stage Dockerfile builds theme CSS, then Hugo site, then serves with nginx on port 8080
- **CI/CD**: GitHub Actions workflow (`.github/workflows/docker-image.yml`) builds and pushes Docker image to Docker Hub on push to master
- **nginx config**: Custom config in `nginx.conf` for static site serving

## Key Implementation Details

- **Responsive Design**: Uses Tailwind's responsive prefixes (lg:, md:, etc.). Sidebar stacks below content on mobile.
- **Sticky Sidebar**: Uses `sticky` positioning with `top-6` offset on desktop (lg: breakpoint)
- **Unsafe HTML**: `goldmark.renderer.unsafe: true` allows raw HTML in markdown content
- **No Fast Render**: Required for proper CSS reloading during development

## Content Guidelines

- Blog posts use shortcodes extensively for image placement (img-float-right, img-block, img-full)
- Project pages showcase work with images, descriptions, and tags
- Feature images specified in front matter as relative paths
- Tags are used for filtering/categorization (e.g., programming, gamedev, web)

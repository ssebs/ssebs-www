# ssebs-www
[![Docker Image CI](https://github.com/ssebs/ssebs-www/actions/workflows/docker-image.yml/badge.svg)](https://github.com/ssebs/ssebs-www/actions/workflows/docker-image.yml)

ssebs.com website code. 

## TODO:
- MVP website:
  - [ ] Add anchor to post-content titles
  - [ ] Add socials list under C2A hero
- After MVP:
  - [ ] Sort tags on projects
  - [ ] Move all images to projects folder
  - [ ] Contact form - Supabase backend
  - [ ] Add another section to home page? Or add more stuff
  - [ ] Add tags to each project and allow search by tags (show tags on page + clickable)
    - [ ] Tag search + Search Results page
  - [ ] Add blog
    - [ ] e.g. things I learned or tech stuff I can share that's not a project (e.g. Hugo quick start + explain theme)
- Finishing touches:
  - [ ] Dark/light mode https://tailwindcss.com/docs/dark-mode
  - [x] CI/CD Github Actions to build
    - Also do ssebs.github.io?
  - [ ] Animations
    - [ ] animations on hover (menu, logo, header)
  - [ ] scroll animation on mobile
    - text/content covers up sidebar, sidebar covers up img. (parallax)
- [ ] REPLACE Current (2024) img for ssebs-www project page
- [ ] mini game Easter egg like Chrome dino

## Design
![home](.excalidraw.png)

## Dev setup
- git clone https://github.com/ssebs/ssebs-www
- Install [hugo](https://gohugo.io/)
  - Either manually, or use the `setup_env.sh` script
- For ssebs Hugo theme, you need [Node.js](https://nodejs.org/en/download/package-manager) and the [Tailwind CLI](https://tailwindcss.com/docs/installation)
  - `cd themes/ssebs/`
  - `npm i`
  - Run dev
    - `npm run start`
  - Build prod
    - `npm run build`
- Local dev deployment:
  - `hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0`
- To deploy to another baseURL for testing (behind LB)
  - `hugo serve --noHTTPCache --disableFastRender --baseURL "https://your-url.com/" --bind 0.0.0.0`

### Build
- `HUGO_ENV=production HUGO_PARAMS_USEBASEURL=true hugo --baseURL "https://your-url.com/" --minify`

### Docker
- `docker build -t ssebs/ssebs-www .`
- `docker run -p 8080:8080 ssebs/ssebs-www`

## License
[MIT](./LICENSE)

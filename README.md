# ssebs-www
[![Docker Image CI](https://github.com/ssebs/ssebs-www/actions/workflows/docker-image.yml/badge.svg)](https://github.com/ssebs/ssebs-www/actions/workflows/docker-image.yml)

https://ssebs.com website code. 

## TODO:
- [ ] CDN Assets (resume, images) for faster loading
- [ ] Soon™️:
  - [ ] Sort tags on projects
  - [ ] Move all images to projects folder
  - [ ] Contact form - REST/go backend
  - [ ] Tag search + Search Results page
- Finishing touches:
  - [ ] Dark/light mode https://tailwindcss.com/docs/dark-mode
  - [ ] Animations
    - [ ] animations on hover (menu, logo, header)
  - [ ] scroll animation on mobile
    - text/content covers up sidebar, sidebar covers up img. (parallax)
- [ ] mini game Easter egg like Chrome dino


## Dev setup
- `git clone https://github.com/ssebs/ssebs-www`
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

## Wireframe
![home](.excalidraw.png)

## License
[MIT](./LICENSE)

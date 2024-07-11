# ssebs-www

ssebs.com website code. 

## TODO:
- MVP website:
  - [ ] Home page - social icons in bottom right of hero / footer
  - [ ] Add blog
    - [ ] e.g. things I learned or tech stuff I can share that's not a project (e.g. Hugo quick start + explain theme)
  - [ ] Content:
    - [ ] About:
      - [ ] resume type (work)
      - [ ] my story
      - [ ] my hobbies (guitar, car, gaming, 3d printing)
    - [ ] tag + categories for hobby stuff, like working on cars or guitar stuff
- After MVP:
  - [ ] Add tags to each project and allow search by tags (show tags on page + clickable)
    - [ ] Tag search + Search Results page
- Finishing touches:
  - [ ] Install tailwind properly https://tailwindcss.com/blog/standalone-cli
  - [ ] Dark/light mode https://tailwindcss.com/docs/dark-mode
  - [x] CI/CD Github Actions to build
    - Also do ssebs.github.io?
  - [ ] Animations
    - [ ] animations on hover (menu, logo, header)
  - [ ] scroll animation on mobile
    - text/content covers up sidebar, sidebar covers up img. (parallax)
  - [ ] floating header styled like apple? Light with drop shadow, rounded
- [ ] REPLACE Current (2024) img for ssebs-www
- [ ] mini game Easter egg like Chrome dino

## Design
![home](.excalidraw.png)

## Usage
- Clone this repo
- Install [hugo](https://gohugo.io/)
  - Either manually, or use the `setup_env.sh` script
- Local dev deployment:
  - `hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0`
- To deploy to another baseURL for testing
  - `hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0`

### Build
- `HUGO_ENV=production HUGO_PARAMS_USEBASEURL=true hugo --baseURL "https://your-url.com/" --minify`

## License
[MIT](./LICENSE)

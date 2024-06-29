# ssebs-www

ssebs.com website code. 

## TODO:
- [x] MVP website:
  - [ ] Home page
    - [ ] Hero
      - [ ] Call to Action
      - [ ] mouse animated bg like inspiration site, repeating pattern. 
        - [ ] dark gray bg, repeating thin pattern in lighter grey, on hover turn the lines in a radius and blue based on where the mouse cursor is
      - [ ] Also an image of me on the right 
      - [ ] Social icons in bottom right of hero / footer
    - [ ] Sections
      - [ ] Make sections on home page like mini summary of page + C2A link for each page in menu
      - [ ] Short about
      - [ ] Short projects with btn for "more"
  - [ ] List pages
      - [ ] Breadcrumbs 
  - [ ] Contact form in footer, and contact page should have my socials
  - [ ] Add blog
    - [ ] e.g. things I learned or tech stuff I can share that's not a project (e.g. Hugo quick start + explain theme)
  - [ ] Content:
    - [ ] About:
      - [ ] resume type (work)
      - [ ] my story
      - [ ] my hobbies (guitar, car, gaming, 3d printing)
    - [ ] update archetype, make yaml and add better defaults (menu)
    - [ ] add games with download links
    - [ ] tag + categories for hobby stuff, like working on cars or guitar stuff
- [ ] After MVP:
  - [ ] Add tags to each project and allow search by tags (show tags on page + clickable)
    - [ ] Tag search + Search Results page
- [ ] Finishing touches:
  - [ ] Install tailwind properly https://tailwindcss.com/blog/standalone-cli
  - [ ] Dark/light mode https://tailwindcss.com/docs/dark-mode
  - [ ] CI/CD Github Actions to build
    - Also do ssebs.github.io?
  - [ ] Animations
    - [ ] animations on hover (menu, logo, header)
  - [ ] scroll animation on mobile
    - text/content covers up sidebar, sidebar covers up img. (parallax)
  - [ ] floating header styled like apple? Light with drop shadow, rounded


## Components
- Components lib: https://readymadeui.com/tailwind-components/cards
- Required components:
  - Navbar
  - Collapse
  - Card w/ hover animation
  - Bubbles (tags?)
  - Buttons 
  - Typography

## Design
![home](.excalidraw.png)


## Usage
- Clone this repo
- Install [hugo](https://gohugo.io/)
  - Either manually, or use the `setup_env.sh` script
- `hugo serve --noHTTPCache --bind 0.0.0.0`

### Build
- `HUGO_ENV=production hugo`

## License
[MIT](./LICENSE)

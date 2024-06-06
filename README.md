# ssebs-www

ssebs.com website code. 
 
## TODO:
- [WIP] Design Layout
  - [x] Basic layout
  - [ ] Call to Action
  - [ ] Home contents
- [WIP] Make ssebs hugo theme instead of using prebuilt
  - So I learn how to use hugo instead of fighting it
- [ ] tailwind-css + prebuilt components!
  - Responsive!
  - IDK how to make a good navbar or sidebar, no need to make it more difficult for myself
  - something like bootstrap? there's gotta be something more modern tho
  - Components lib: https://readymadeui.com/tailwind-components/cards
    - (Cards page)
  - Required components:
    - Navbar
    - Collapse
    - Card w/ hover animation
    - Bubbles (tags?)
    - Buttons 
    - Typography
- [ ] Animations
- [ ] Install tailwind properly https://tailwindcss.com/blog/standalone-cli
- [ ] hugo stuff:
  - [ ] index.md should have home content
  - [ ] pic of me / skills / quick links is a sidebar
  - [ ] header
  - [ ] footer
  - [ ] projectItem
  - [ ] projects page
- [ ] CI/CD Github Actions to build
  - Also do ssebs.github.io?

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

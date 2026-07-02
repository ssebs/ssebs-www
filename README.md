# ssebs-www


## Astro Migration

I told claude to migrate hugo to astro, it completed this [spec](docs/superpowers/specs/2026-06-30-astro-rewrite-design.md)

```
cd astro-ssebs
npm run dev
```

## TODO
- swap deployment (Dockerfile, GitHub Actions, nginx) from Hugo to Astro
- remove the Hugo site (`content/`, `themes/`, `hugo.yaml`) once Astro is validated in prod

## License

[MIT](./LICENSE)

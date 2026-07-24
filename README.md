# ssebs-www

Source for [ssebs.com](https://ssebs.com), built with [Astro](https://astro.build) and TailwindCSS.

Migrated from Hugo — Claude did the lifting against this [spec](docs/superpowers/specs/2026-06-30-astro-rewrite-design.md).

## Development

```sh
make install   # npm ci
make dev       # dev server
make build     # production build -> dist/
make preview   # serve the production build
```

## Deployment

CI builds the site and pushes a Docker image (nginx serving `dist/` on port 8080) to `ssebs/ssebs-www:astro`.

```sh
make docker
docker run -p 8080:8080 ssebs/ssebs-www:astro
```

## License

[MIT](./LICENSE)

.PHONY: help install dev build preview check docker

# Default target
help:
	@echo "Available targets:"
	@echo "  install    - Install dependencies (npm ci)"
	@echo "  dev        - Run Astro dev server"
	@echo "  build      - Build for production (outputs to dist/)"
	@echo "  preview    - Preview the production build"
	@echo "  check      - Type check the site (astro check)"
	@echo "  docker     - Build Docker image"

# Install dependencies
install:
	npm ci

# Run Astro dev server
dev:
	npm run dev -- --host 0.0.0.0

# Build for production
build:
	npm run build

# Preview the production build
preview:
	npm run preview -- --host 0.0.0.0

# Type check
check:
	npx astro check

# Build Docker image
docker:
	docker build -t ssebs/ssebs-www:astro .

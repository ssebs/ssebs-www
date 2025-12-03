.PHONY: help install dev dev-full build docker

# Default target
help:
	@echo "Available targets:"
	@echo "  install    - Install theme dependencies (npm install)"
	@echo "  dev        - Run Hugo dev server only"
	@echo "  dev-full   - Run npm start + Hugo dev server (requires 2 terminals)"
	@echo "  build      - Build for production (npm build + hugo build)"
	@echo "  docker     - Build Docker image"

# Install theme dependencies
install:
	cd themes/ssebs && npm i

# Run Hugo dev server only
dev:
	hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0

# Run npm start + Hugo dev server
# Note: This requires running in 2 terminals
# Terminal 1: make dev-full
# Terminal 2: cd themes/ssebs && npm run start
dev-full:
	@echo "Starting Hugo dev server..."
	@echo "Note: Run 'cd themes/ssebs && npm run start' in another terminal"
	hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0

# Build for production
build:
	cd themes/ssebs && npm run build
	hugo --minify

# Build Docker image
docker:
	docker build -t ssebs/ssebs-www .

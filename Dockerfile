FROM node:22-alpine AS builder

WORKDIR /src

# Install deps first so they cache independently of source changes
COPY package.json package-lock.json ./
RUN npm ci

# Build site
COPY . .
RUN npm run build

# Serve static site
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/dist /usr/share/nginx/html
EXPOSE 8080

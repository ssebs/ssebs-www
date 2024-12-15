FROM hugomods/hugo:node AS builder

COPY . /src

# Build theme
WORKDIR /src/themes/ssebs/
RUN ls
RUN npm install
RUN npm run build

# Build site
WORKDIR /src/
ENV HUGO_ENV=production
ENV HUGO_PARAMS_USEBASEURL=false

RUN hugo --baseURL https://ssebs.com --minify

# Serve static site
FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder ./src/public /usr/share/nginx/html
EXPOSE 8080

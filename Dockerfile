FROM hugomods/hugo:node

COPY . /src

# Build theme
WORKDIR /src/themes/ssebs/
RUN ls
RUN npm install
RUN npm run build

# Build site
WORKDIR /src/
ENV HUGO_ENV=production
ENV HUGO_PARAMS_USEBASEURL=true 

# Run server
EXPOSE 8080
ENTRYPOINT [ "hugo", "server", "--bind", "0.0.0.0" ,"-p", "8080", "--baseURL", "https://ssebs.com"]

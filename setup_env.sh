#!/bin/bash
# This script is used to setup your dev environment. Basically just installs required pkgs, currently using this in code-server docker container.
set -e

# Hugo version to install
HUGO_VERSION="0.148.2"
HUGO_FILENAME="hugo_extended_withdeploy_${HUGO_VERSION}_linux-amd64.tar.gz"
HUGO_URL="https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_FILENAME}"

# Install deps
if command -v apt >/dev/null 2>&1; then
    sudo apt update
    sudo apt upgrade -y
    sudo apt install golang -y
elif command -v dnf >/dev/null 2>&1; then
    sudo dnf upgrade -y
    sudo dnf install -y golang
fi

mkdir tmp
cd tmp

# HACK - gotta use the latest release.
if [ ! -f "./${HUGO_FILENAME}" ]; then
    echo "Downloading Hugo v${HUGO_VERSION}..."
    curl -LJO "${HUGO_URL}"
    tar xf "./${HUGO_FILENAME}"
fi

# npm
curl -fsSL https://fnm.vercel.app/install | bash

if [ -f ~/.zshrc ]; then
    source ~/.zshrc
else
    source ~/.bashrc
fi

fnm use --install-if-missing 22
cd ../themes/ssebs/
npm install
npm run build

echo "To build tailwind:"
echo "cd themes/ssebs; npm run build; cd ../../"
echo
echo "To run server:"
echo "./tmp/hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0"
echo


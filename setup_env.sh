#!/bin/bash
# This script is used to setup your dev environment. Basically just installs required pkgs, currently using this in code-server docker container.
sudo apt update
sudo apt upgrade -y
sudo apt install golang -y

mkdir tmp
cd tmp
# HACK - gotta use the latest release. 
curl -LJO https://github.com/gohugoio/hugo/releases/download/v0.128.2/hugo_extended_0.128.2_linux-amd64.tar.gz
tar xf ./hugo_extended_0.128.2_linux-amd64.tar.gz

echo "To run server:"
echo "./tmp/hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0"
echo


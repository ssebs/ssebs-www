#!/bin/bash
# This script is used to setup your dev environment. Basically just installs required pkgs, currently using this in code-server docker container.
sudo apt update
sudo apt upgrade -y
sudo apt install hugo golang -y

echo 
echo "Install php twig and configure the template files in VSCode to use twig lang for formatting!"
echo "https://stackoverflow.com/a/60644216"
echo 
echo "To run server:"
echo "    hugo serve --noHTTPCache --disableFastRender --bind 0.0.0.0"
echo

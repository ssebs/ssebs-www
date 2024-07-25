---
title: 'Images to PDF'
slug: img-2-pdf
shortdesc: Convert a selection of images files into a single PDF
feature: https://raw.githubusercontent.com/ssebs/images-to-pdf/main/image-to-pdf.gif
date: 2024-07-24T21:53:52-07:00
weight: 22
tags: [golang, programming, gui]
---
[Github Repo](https://github.com/ssebs/images-to-pdf)

![gif of using the app](https://raw.githubusercontent.com/ssebs/images-to-pdf/main/image-to-pdf.gif)

Convert a selection of images files into a single PDF.

## Building
- git clone https://github.com/ssebs/images-to-pdf
  - You'll need to install a C compiler. See https://developer.fyne.io/started/
- `go build -o img2pdf.exe .\cmd\main.go`
- Once the GUI is working...
  - Make sure `fyne` CLI is installed
    - `go install fyne.io/fyne/v2/cmd/fyne@latest`
  - Windows:
    - `PS go-mmp> fyne package -os windows`
  - Mac:
    - `$ fyne package -os darwin`
  - Linux:
    - `$ fyne package -os linux`

## CLI Usage
```
PS F:\LocalProgramming\images-to-pdf> .\img2pdf.exe -h
Images to PDF
Usage of F:\LocalProgramming\images-to-pdf\img2pdf.exe:
  -a=<val>    Whether or not to archive images (default to yes)
  -d string
        Folder where images are stored (default ".")
  -o string
        Filename of PDF file (default "out.pdf")
PS F:\LocalProgramming\images-to-pdf> 
```

## How to run CLI
- Download [img2pdf.exe from the releases page](https://github.com/ssebs/images-to-pdf/releases/)
- Move the `img2pdf.exe` file to the folder you want to convert images
- EZPZ:
  - Double click the `img2pdf.exe` file
- CLI:
  - SHIFT + RIGHT CLICK the folder > Open in Powershell window here
    - Or command window
  - Type this command:
    - `.\img2pdf.exe -a`




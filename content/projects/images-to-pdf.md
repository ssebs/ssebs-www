---
title: 'Images to PDF'
slug: img-2-pdf
shortdesc: Convert a selection of images files into a single PDF
feature: https://raw.githubusercontent.com/ssebs/images-to-pdf/main/image-to-pdf.gif
date: 2024-07-24T21:53:52-07:00
weight: 23
tags: [golang, programming]
---
[Github Repo](https://github.com/ssebs/images-to-pdf)

![Usage Example](https://raw.githubusercontent.com/ssebs/images-to-pdf/main/image-to-pdf.gif)

Convert a selection of images files into a single PDF.

I made a tool to convert multiple image files into a single PDF, addressing the limitation of
my wife's scanner by efficiently merging individual images into a single cohesive document.

> Written in go, there are no dependencies to worry about when sharing the tool!

## Building
- From source:
  - `git clone https://github.com/ssebs/images-to-pdf`
    - You'll need to install a C compiler. See https://developer.fyne.io/started/
  - `go build -o img2pdf.exe .\cmd\main.go`
- From go pkg
  - `go install github.com/ssebs/images-to-pdf@latest`

## CLI Usage
```powershell
PS F:\LocalProgramming\images-to-pdf> .\img2pdf.exe -h
Images to PDF
Usage of F:\LocalProgramming\images-to-pdf\img2pdf.exe:
  -a    Whether or not to archive images (use a=false if needed) (default true)
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
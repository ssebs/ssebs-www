---
title: 'Simpleshare'
shortdesc: A local file sharing utility written in Python
feature: https://raw.githubusercontent.com/ssebs/simpleshare/master/img/upload.png
date: 2024-07-23T09:25:19-07:00
weight: 23
tags: [programming, python, gui]
---
[Github Repo](https://github.com/ssebs/simpleshare)

A local file sharing utility written in Python. Utilized multicast UDP to create an easy to use local network file sharing application. There's a simple GUI to enable ease of use for non-technical users.

### Home
![home](https://raw.githubusercontent.com/ssebs/simpleshare/master/img/home.png)

### Upload
![upload](https://raw.githubusercontent.com/ssebs/simpleshare/master/img/upload.png)

### Download
![download](https://raw.githubusercontent.com/ssebs/simpleshare/master/img/download.png)

## Installation:
- Source:
  - Install Python 3
  - ```
    $ git clone https://github.com/ssebs/simpleshare
    $ cd simpleshare/
    $ python -m venv venv
    ```
  - Linux: 
    - `$ source ./venv/bin/activate`
  - Windows: 
    - `> .\venv\Scripts\activate`
  - ```
    (venv) $ pip install -r requirements.txt
    ```
- Binary:
  - Download a binary for your platform in the [releases page](https://github.com/ssebs/simpleshare/releases).

- PyPI:
  - `$ pip install simpleshare`
  - `$ simpleshare`

## Usage:
- CLI
  ```
  usage: simpleshare.py [-h] [--type {client,server}] [--ip IP] [FILENAME]

  Local file sharing utility. Can be used as server and as a client. Run this
  without any arguments to run GUI.

  positional arguments:
    FILENAME              Name of the file you want to share, if running as the
                          server.

  optional arguments:
    -h, --help            show this help message and exit
    --type {client,server}
                          Type, how do you want to use this tool
    --ip IP               IP address, only used if you're the server
  ```
- GUI
  - Double click the exe / binary.

## Building
- Linux:
  - `$ make`
- Windows:
  - `> .\Makefile.bat`
- `(venv) $ pyinstaller simpleshare/__main__.py --clean -F -n simpleshare`


## TODO:
- [x] Structure program
  - [x] 3 connections
    - [x] Server: Share filename (Multicast)
    - [x] Client: Reply to server saying that you want the file (UDP)
    - [x] Server: Send file to client (TCP)
  - [x] CLI
  - [x] GUI
- Server
  - [x] "Broadcast" (multicast) that you're sharing "x" file
  - [x] Have server send files if requested to IP found.
  - [x] CLI
  - [x] GUI
    - [ ] DnD
    - [x] Custom timout
- Client
  - [x] Listen to see if anyone is sharing files
  - [x] List available files
  - [x] Download files to specified file name/path
  - [x] CLI
  - [x] GUI
- [x] Make this work with 1 file, 1 client
- [ ] Make this work with 1 file, 2 clients
- [ ] Make this work with 2 files (2 servers), 1 client
- [ ] Make this work with 2 files (2 servers), 2 client
- [x] Binary output (.exe, .app, etc.)
  - [ ] Icon support
- [ ] Refactor + document
- [ ] Unit Tests

## Bugs:
- [ ] Threads won't stop properly
- [ ] Can't have 2 clients
- [ ] Can't have 2 servers
- GUI 
  - [ ] Styling
  - [x] Only Choose IP if more than 1 available
  - [ ] Share Thread issues


---
title: 'nccsv'
shortdesc: Ncurses CSV Editor written in Python
feature: ./img/nccsv.png
date: 2024-07-24T22:03:27-07:00
weight: 25
tags: [python, tui, programming]
---
[Github Repo](https://github.com/ssebs/nccsv)

Ncurses CSV Editor written in Python

{{< rawhtml >}}
<script src="https://asciinema.org/a/6gHETuFhyD4R9nAwtUGet5P9i.js" id="asciicast-6gHETuFhyD4R9nAwtUGet5P9i" async="true"></script>
{{< /rawhtml >}}

## TODO:
- [ ] Architecture
  - [x] Wireframes
    - [x] Home / Menu
    - [ ] File selector
      - [ ] Open
      - [ ] Close
    - [ ] Editor
      - [ ] Layout Grid
      - [ ] Entry
- [ ] Multiple views
  - [ ] Home / Menu
  - [ ] File selector
  - [ ] Editor
- [ ] Custom widgets
  - [ ] Layout Grid
  - [x] Entry (text editor with box)
- [ ] Scroll down / right
- [.] Delete contents of cell when you hit "DEL"
- [ ] Row / Col bars (A,B,C, 1,2,3)
- [.] Actually handle CSVs
- [ ] Color
- [ ] Documentation
- [ ] Publish to pip
- [ ] Tests

> Misc folder is for miscellaneous test files to add features (pad scrolling, etc)

## Notes

How the Textbox should work:
- Is an Object
- Constr:
  - Has x, y coord on the master screen?
    - Do we want this?
    - Can we make it have it's own coordinates, so we don't have to worry about the master screen?
  - Has size definition
  - Custom callback if wanted
  - Default text (to load in)
- Props:
  - Text to display
  - Is it highlighted
- Input:
  - When calling edit_text(), it will edit the text and return it back on Enter
  - When calling clear_text(), it will remove the text that is rendered + saved
- Features:
  - Editable text field
  - Box surrounding text field so we can see it
  - Highlight-able (on hover)
  - Easy to get the text programmatically

How the grid should work:
- Is an Object
- Constr:
  - Has x, y coord on the master screen
  - Has rows / cols
- Props:
  - 2D Matrix of Textboxes
  - Add rows and columns if user scrolls past what currently exists



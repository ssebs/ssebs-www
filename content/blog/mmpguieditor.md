---
title: From YAML to WYSIWYG - How I Improved My Macro Pad with MVC and Drag-and-Drop
slug: mmpguieditor
shortdesc: Learn how I upgraded my Macro Pad with a WYSIWYG config editor, drag-and-drop functionality, and MVC to improve code structure and state management.
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png
date: 2024-11-27T22:02:05-08:00
weight: 24
tags: [golang, programming, 3d-printing, arduino, gui]
draft: false
---
## Before you read...
This is part 2 of my [Mini Macro Pad](/projects/go-mmp/) project. I recommend reading my [last blog post](/blog/minimacropad/) to read about how I 3D printed and coded it.

<img class="custom-float-right" src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpbuilt.png" alt="macro pad" width="256px">

## What's wrong with v1? Why make a v2?
I was happy to have a working Macro Pad, and I used it for about a year or so with only a few tweaks to the code, but there was a problem.

If you wanted to change any of the Macros, you had to open up a code editor and edit a `.yaml` file. While this worked, it was a bit of a pain to use, and changing anything on the fly was simply not possible.

I was talking to my friends about it, and they suggested making a <span class="font-semibold" title="What you see is what you get">WYSIWYG</span> config editor. I had always planned on doing that eventually, but that was the push I needed to get started.

So it was decided - I had to make a GUI config editor. I wanted to make an interface similar to what you'd find in a Logitech or Razor keyboard driver. Obviously not as complex, but enough to make changes on the fly.

## Getting started
I started by designing a quick UI in Excalidraw, and thinking about what features I wanted to add.

<div class="flex">
<div>Config editor view where you can drag and drop your Macros.</div>
<div>Macro editor where you can drag and drop Actions to make your shortcuts.</div>
</div>

<img class="w-full" src="/img/GUIEditorDiagram.png" alt="GUI Editor Diagram" >

## Features I wanted
The main things I wanted to make easier were:
- Changing what the Macros did (updating the Actions) 
- Moving the position of Macros on the device using Drag and Drop
- Changing Metadata (like # of columns, and serial connection info)

<div style="clear: both;"></div>

**Thanks for reading!**
---
title: How I Improved my Macro Pad with a Drag-and-Drop Config Editor
slug: mmpguieditor
shortdesc: Read how I upgraded my Macro Pad with a WYSIWYG config editor, drag-and-drop functionality, and MVC to improve code structure and state management.
feature: ./img/ConfigEditor.png
date: 2024-12-27T14:00:00-08:00
weight: 25
tags: [golang, programming, 3d-printing, arduino, gui]
---
## Before you read...

This is part 2 of my [Mini Macro Pad](/projects/go-mmp/) project. I recommend reading my [last blog post](/blog/minimacropad/) to read about how I 3D printed and programmed that.

## What's wrong with it? Why fix something that isn't broken?
<img class="custom-float-right" src="./img/MMPPrinted.jpg" alt="macro pad" width="300px">

I was happy to have a working Macro Pad, and I used it for about a year or so with only a few tweaks to the code, but there was a **problem**.

If you wanted to change any of the Macros, you had to open up a code editor and edit a `.yaml` file. While this worked, it was a bit of a pain to use, and changing anything on the fly was simply not possible.

I was talking to my friends about it, and they suggested making a <span class="font-semibold" title="What you see is what you get">WYSIWYG</span> config editor. I had always planned on doing that eventually, but this was the push I needed to get started.

So it was decided - I had to make a GUI config editor. I wanted to make an interface similar to what you'd find in a Logitech or Razor keyboard driver. 

*Obviously not as complex*, but enough to make changes on the fly.

<div style="clear: both;"></div>

## Features I wanted
The main things I wanted to make easier were:
- Changing what the Macros did when you pressed a button (updating the Actions for a Macro)
- Moving the position of Macros on the device using Drag-and-Drop (to place the buttons properly)
- Changing Metadata (like # of columns, and serial connection info)

## Getting started
I started by designing a quick UI in Excalidraw so I could plan the layout.

<div class="flex">
<div>Config editor view where you can drag and drop your Macros.</div>
<div>Macro editor where you can drag and drop Actions to make your shortcuts.</div>
</div>

<img class="w-full" src="./img/GUIEditorDiagram.png" alt="GUI Editor Diagram" >

<div style="clear: both;"></div>

## Expanding GUI in fyne
My existing `v1` code was pretty messy, my `gui.go` file was massive, it was getting hard to read, and I knew I needed to refactor it soon. I figured this could wait, at least until I had a basic config editor working.

So, I created a new `test.go` file, and got to work building my GUI to match my diagrams. I was able to get a Grid of Macros like before, with a Delete and Edit button at the bottom. 

To start, I just created a new window each time I needed to edit a particular part of the Config.

You'd start with a normal running Mini Macro Pad window, then click **Edit** => **Edit Config**. 

From there, you could Drag-and-Drop the Macros around, and click **Edit** to open another window to edit that specific Macro.

<img class="w-full" src="./img/mmpnewwindows.png" >

## Fun with Drag-and-Drop
One thing that took me more time than I expected was getting the Drag-and-Drop to work properly. It turns out, a [fyne widget](https://docs.fyne.io/explore/widgets) can implement the [Draggable interface](https://docs.fyne.io/api/v2.1/draggable.html). However, the documentation for this was auto-generated from the source code, and did not have any working examples that I could use to learn from.

Here's a screenshot of the doc:
<img class="w-full" src="./img/fyne-draggable-api.png" >

Luckily, I could use VSCode's **Go to Definition (F12)** function to see what a `*DragEvent` even is, and what kind of data it will give me. After playing with the code for a bit, I found out that it gave both the actual and delta position of the mouse in (X,Y) coordinates.

The `Dragged()` method gets called every time your mouse moves while holding down LMB, and `DragEnd()` gets called once you let go.

Once I had the position of the mouse, I could calculate which Macro GUI component I was clicking over. I'd check the (X,Y) coordinates of each Macro + the width/height and see if your mouse was inside. If it was, I'd save which Macro that was in a `draggedIdx` variable, and move the Macro to where the mouse is positioned every frame.

> This calculation is "expensive", so I only run it the first time you start dragging something.

Then, when you let go, another calculation is made to see if you let go over another Macro in the grid. 
- If so, the positions of the two Macros would swap
- If not, it would reset back to where it came from

> Interested in the implementation? Check out the [widget\'s code](https://github.com/ssebs/go-mmp/blob/main/views/drag_and_drop_view.go)!

## Having issues with state / GUI not syncing
I was able to get everything *visibly* working, but when you'd save your changes only the `.yaml` file itself would update. None of the other components would update. 

For example, when I'd update the name of a `Macro` in a new editor window, it wouldn't sync to the regular window. One window would show the old value, and the other the new.



### Realize I need to organize / structure my code better
Once I was at this point, it was getting hard to follow what was going on in my own code I just wrote. 

<img src="./img/whowrotethiscode.jpg" width="256px" alt="Obi Wan meme">

### I find it best to learn by doing, so to learn MVC I need to implement it myself.
- Link to MVC Tip Calc



## Using what I learned from my tip calc to implement MVC for my MMP

## v2 released / what's new with the release

## What's next for v3?
- See github issues

**Thanks for reading!**

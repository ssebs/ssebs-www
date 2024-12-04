---
title: Building a GUI in Golang to speed up my Mini Macro Pad
slug: mmpguieditor
shortdesc: 
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png
date: 2024-11-27T22:02:05-08:00
weight: 24
tags: [golang, programming, 3d-printing, arduino, gui]
---
> Read the technical details on the [project page](/projects/go-mmp)

This is a follow up to the [Mini Macro Pad](/blog/minimacropad/) project, so I'd suggest reading that if you haven't already.

## Creating a basic GUI in fyne
replace_me

## Problems with being basic
I was happy with what I had written, for a while at least. 

I was talking about my project with some coworkers, and they mentioned that it wasn't super user friendly to update the Macros. I agreed, as YAML was a decent file format for a developer, but not everyone wants to be slinging YAML whenever they need to create a new shortcut.

So it was decided - I had to make a GUI Config Editor. I wanted to make an interface similar to what you'd find in a Logitech or Razor keyboard driver. Obviously not as complex, but enough to meet the need.

I started designing a quick UI in Excalidraw, and got to work on my `v2` release.

## Features
The main things I wanted to make easier were:
- Changing what the Macros did (updating the Actions) 
- Moving the position of macros on the device using Drag and Drop
- Changing Metadata (like # of columns, and serial connection info) via the GUI

I was able to get these implemented relatively quickly, by creating a new window for the editor, then opening another new window for the macro when you clicked on it, then creating another window for editing the actions. 

Aside from the annoyance of opening too many windows, it worked, at least the UI looked like it worked, but when I hit save nothing was updated. When I looked at the config file, it was updated but the UI and the actual running Macros weren't.

After banging my head against the wall for a bit, I decided I needed to learn how to manage state. I was familar with React, but fyne doesn't have `useState` or `useEffect`, so I was kinda on my own.

## Learning MVC with a tip calculator
At this point, I felt I needed to learn how this was usually done. It turns out, that you should structure your code in some way to keep it organized. 

I chose the Model-View-Controller architecture, as it was the most simple to get started. If you'd like to read more about that, check out the [blog entry](/blog/mvctipcalc/). Since that blog has that journey covered, I won't repeat it. 

## Applying MVC to my Mini Macro Pad
replace_me

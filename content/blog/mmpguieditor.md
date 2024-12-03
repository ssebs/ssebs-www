---
title: Building a GUI in Golang to speed up my Mini Macro Pad
slug: mmpguieditor
shortdesc: sdf
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png
date: 2024-11-27T22:02:05-08:00
weight: 24
tags: [golang, programming, 3d-printing, arduino, gui]
---
> Read the technical details on the [project page](/projects/go-mmp)

This is a follow up to the [Mini Macro Pad](/blog/minimacropad/) project, so I'd suggest reading that if you haven't already.

## Learning Golang

## Writing a GUI
I ended up choosing [fyne.io](https://fyne.io/), as it was the most supported library I found. I got the basics down, and finished recreating the old functionality of my Mini Macro Pad app.

It took me a bit of time to learn how fyne works under the hood, it was quite different from what I was used to. The HTML DOM + JS route way of building applications made so much sense, mostly because I've spent lots of time working with it. 

Once everything was working though, I was amazed at how much snappier my macro pad felt!

A few bugs were fixed over time, but in the end I had released `v1.2.3`.

![screenshot](https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png)


## Making changes to your Macros, made easy.
I was content with what I had written, for a while at least. I was talking about my project with some coworkers, and they mentioned that it wasn't super user friendly to update the Macros. I agreed, as YAML was a decent file format for a developer, but not everyone wants to be slinging YAML whenever they need to create a new shortcut.

So it was decided - I had to make a GUI Config Editor. I wanted to make an interface similar to what you'd find in a Logitech or Razor keyboard driver. Obviously not as complex, but enough to meet the need.

I started designing a quick UI, and got to work on my `v2` release.

### Drag and Drop

### Learning MVC with a tip calculator
At this point, I felt I needed to learn MVC. 
If you'd like to read more about that, check out the [blog entry](/blog/mvctipcalc/)

REPLACE_ME_WITH_COMMENTS_SECTION
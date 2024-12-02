---
title: Building a GUI in Golang to speed up my Mini Macro Pad
slug: minimacropad
shortdesc: The story of how my Mini Macro Pad was created and how far it's come.
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png
date: 2024-11-27T22:02:05-08:00
weight: 20
tags: [golang, programming, 3d-printing, arduino, gui]
---

> Read the technical details on the [project page](https://ssebs.com/projects/go-mmp)

## The story
I was playing video games and was getting tired of typing "gg" manually. I knew it could be automated in some way, and I had a 3D printer and an Arduino laying around, so I got to work.

I watched [Zack Freedman's](https://www.youtube.com/@ZackFreedman) video on [How to build Mechanical Keyboards](https://www.youtube.com/watch?v=yYcNi9hKxDk), and got to work.

Once I had the hardware all ready, I got to work writing my Macros in C.

{{< image src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpbuilt.png" title="the hardware" width="256px" >}}

## Writing Macros in C
I started off in the Arduino IDE using my Teensy LC as a human interface device (HID), and emulated pressing: enter, gg, enter. It was working and I was excited! Naturally, I wanted to add more Macros, but I was getting annoyed at writing scripts in C. 

## Migration to Serial
I figured it would be easy if I just sent a single number over serial to a server that was listening for it, then if a button was pressed, I could compare the button number against a config file to run my macros for me.

And voila, [my deprecated code was created](https://github.com/ssebs/MiniMacroPad/). I was also starting to forget where the macros were, and made a simple GUI in Tkinter, and had python listening for button presses.

This worked, but the user interface was ugly, and it was kinda slow. That's due to PyInstaller's exe files including a python vm.

In the end, I learned a lot about python and refactoring my old spaghetti code. But it was time to learn something new.

## Switching to Go
I wanted to learn golang for one main reason: it compiles cross platform to a single binary file. Having my code compile to 1 exe file was a great benefit of learning go, the other was to become a bit more marketable, and most importantly to improve as a programmer.

I found the [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests) free online course, and got to work learning about pointers, interfaces, pointer receivers (basically methods), and how amazing writing code in Go was.

Once I got a grasp of writing in Go, I stared looking for a GUI library to recreate my python code in a cleaner way.

I learned about channels, composition, and a lot about reading the docs.

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


REPLACE_ME_WITH_COMMENTS_SECTION
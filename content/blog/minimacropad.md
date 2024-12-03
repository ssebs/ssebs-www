---
title: 3D printing and coding my Mini Macro Pad
slug: minimacropad
shortdesc: The story of how my Mini Macro Pad was created and the challenges I faced along the way.
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpbuilt.png
date: "2023-08-10"
weight: 24
tags: [golang, programming, 3d-printing, arduino, gui]
---

> Read the technical details on the [project page](/projects/go-mmp)

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

If you'd like to learn more about writing a GUI in go, check out my [blog entry](/blog/mmpguieditor/)

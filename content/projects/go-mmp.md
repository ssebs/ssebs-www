---
title: Mini Macro Pad
shortdesc: Run shortcuts and automate tasks with a press of a button!
weight: 20
date: "2024-05-18T14:08:45-07:00"
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png
tags: [golang, programming, 3d-printing, arduino, gui]
---
> go-mmp

[Github Repo](https://github.com/ssebs/go-mmp)

Simplify task automation with an arduino and some 3D printing. This lets you create shortcuts and run them at the press of a button, customizable through a YAML config file.

> No device? No problem! You can still click on the buttons to run the macros.

Here's what the GUI looks like, you can click the buttons to run the macro, or use the arduino to press them.
![screenshot of gui](https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png)

Most of my keybinds are for an FPS shooter, for example typing "gg" in the chat. 

## What kind of macros can you make?
- Shortcuts:
  - CTRL + C, CTRL + V, etc.
- Press whatever key you want, as long as it's [in the list](https://github.com/go-vgo/robotgo/blob/master/docs/keys.md#keys).
  - Skip song, type "enter", etc.
- Repeat keypresses (or mouse button presses)
  - Playing cookie clicker? Press your macro to repeatedly press your mouse button down until you click the macro again
- Whatever you can think of, feel free to submit PRs!


## Hardware
You'll need an arduino with some buttons. I'm using a Teensy LC, but you could use an Arduino Micro or ESP32.

Pic of mine below:
![Macro Pad](https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpbuilt.png)

Wiring under the hood
![Wiring](https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpwiring.png)

## 3D Printed housing
There are many available, but if you like the one I designed, check out my [thangs.com](https://than.gs/m/710028) profile.


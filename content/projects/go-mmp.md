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

Automate computer tasks or add new shortcuts with an arduino and 3D printing. This lets you create shortcuts and run them at the press of a button, customizable through a YAML config file. 

> No device? No problem! You can use the GUI to run the macros too!

Here's what the GUI looks like, you can click the buttons to run the macro, or use the arduino to press them.

![screenshot of gui](https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png)

Most of my keybinds are for an FPS shooter, for example typing "gg" in the chat. I also have a "skip song" button which is nice to have.

## What kind of macros can you make?
- Shortcuts:
  - CTRL + C, CTRL + V, etc.
- Press whatever key you want, as long as it's [in the list](https://github.com/go-vgo/robotgo/blob/master/docs/keys.md#keys).
  - Skip song, type "enter", etc.
- Repeat keypresses (or mouse button presses)
  - Playing cookie clicker? Press your macro to repeatedly press your mouse button down until you click the macro again
- Whatever you can think of, feel free to submit Pull Requests!

{{< spacer 1rem >}}

## Hardware
You'll need an arduino with some buttons. I'm using a Teensy LC, but you could use an Arduino Pro Micro or ESP32.

{{< spacer 1rem >}}

## 3D Printed housing
There are many available, but if you like the one I designed, check out my [thangs.com](https://than.gs/m/710028) profile.

{{< spacer 1rem >}}

{{< columns >}}

Here's what the one I 3D printed looks like:

{{< image src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpbuilt.png" title="physical macro pad" width="256px" >}}

<--COLSPLIT-->

Arduino wiring under the hood.

{{< image src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpwiring.png" title="wiring for macro pad" width="256px" >}}

{{< spacer 1rem >}}

> Please forgive the soldering job!

{{< /columns >}}


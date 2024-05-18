+++
title = 'Go Mmp'
date = 2024-05-18T14:08:45-07:00
+++

# Mini Macro Pad
> go-mmp

Macro Pad driver software, written in Golang. If you have an arduino powered device, you could use this to run various keyboard shortcuts and other macros. No device? No problem! You can still click on the buttons to run the macros.

Here's what the GUI looks like, you can click the buttons to run the macro, or use the arduino to press them.

![screenshot of gui](https://github.com/ssebs/go-mmp/blob/main/res/GUIScreenshot.png)

## What kind of macros can you make?
- Shortcuts:
  - CTRL + C, CTRL + V, etc.
- Press whatever key you want, as long as it's [in the list](https://github.com/go-vgo/robotgo/blob/master/docs/keys.md#keys).
  - Skip song, type "enter", etc.
- Repeat keypresses (or mouse button presses)
  - Playing cookie clicker? Press your macro to repeatedly press your mouse button down until you click the macro again
- More? 


## Hardware
You'll need an arduino with some buttons. I'm using a Teensy LC, but you could use an Arduino Micro or ESP32.

Pic of mine below:
![Macro Pad](https://github.com/ssebs/go-mmp/blob/main/res/mmpbuilt.png)

Wiring under the hood
![Wiring](https://github.com/ssebs/go-mmp/blob/main/res/mmpwiring.png)

## 3D Printed housing
There are many available, but if you like the one I designed, check out my [thangs.com](https://than.gs/m/710028) profile.


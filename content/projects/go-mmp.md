---
title: Mini Macro Pad
shortdesc: Run shortcuts and automate tasks with a press of a button!
weight: 20
date: "2024-05-18T14:08:45-07:00"
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png
tags: [golang, programming, 3d-printing, arduino, gui]
---
[Github Repo](https://github.com/ssebs/go-mmp)

<div style="display: grid; grid-template-columns: 60% 40%; gap: 1rem;">
<div>

**Mini Macro Pad (go-mmp)** is a tool for creating and running macros, shortcuts, and other automated actions at the press of a button. 

It works with hardware like Arduino-based macro pads or directly through a desktop GUI, making it versatile for various workflows.

{{< spacer 1rem >}}

### What kind of macros can you make?
- Shortcuts:
  - CTRL+C, CTRL+V, CTRL+SHIFT+ESC, etc.
- Adding Media keys to skip songs, change the volume, or even add back the HOME and DELETE keys to a TKL keyboard.
  - You can press whatever key you want, as long as it's [in the list](https://github.com/go-vgo/robotgo/blob/master/docs/keys.md#keys).
- Macros:
  - Type "gg" in game, rage quit a game, or do something more useful in Excel!
- Repeat keypresses (or mouse button presses)
  - Playing cookie clicker? Press your macro to repeatedly press your mouse button down until you click the macro again
- Whatever you can think of, feel free to submit PRs!

</div>
<div>
  Screenshot of the GUI:
  <img src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png">
</div>
</div>

{{< spacer 2rem >}}

## Getting started
If you have a arduino/serial macro pad ready, great! You get to use the full functionality of go-mmp! 

See the the [3D Printing \& Hardware](#3d-printing--hardware) section to get started with the physical device.

Don't have an Arduino but still want to run macros? You can use the GUI-only mode, which is the default, so you're all set!

Just click on the buttons to run Macros.

{{< spacer 2rem >}}

## Getting set up
- [Download the latest exe](https://github.com/ssebs/go-mmp/releases/)
- Double click the **Mini Macro Pad.exe** file
- It will generate a configuration file in your home folder.
    - e.g. `C:\Users\ssebs\mmpConfig.yml` or `/home/ssebs/mmpConfig.yml`
- When you press a button on the Arduino based MacroPad, it will run a Macro that's set in your config.

{{< spacer 2rem >}}

## Change your Macros on the fly
New in `v2`, you can now update your Macros in the UI instead of from the config file.

<div style="display: grid; grid-template-columns: 50% 50%; gap: 1rem;">
<div>

Just go to **Edit** > **Edit Config**, and drag-and-drop your macros into the correct positions

<img src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/ConfigEditor.png" width="400px" alt="Config Editor Screenshot">

</div>
<div>
Click on the name to change what they do.

Here's the "**gg**" Macro for example:

<img src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/MacroEditor.png" width="360px" alt="Macro Editor Screenshot">

</div>
</div>

{{< spacer 2rem >}}

## 3D Printing & Hardware
You'll need a microcontroller, some key switches, and a 3D Printer. I'm using a Teensy LC, but you could use an Arduino Micro or ESP32.

<div style="display: grid; grid-template-columns: 50% 50%; gap: 1rem;">
<div>

My 3D Printed housing is available on [thangs.com](https://than.gs/m/710028).

<img src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpbuilt.png" width="256px" alt="physical macro pad">
</div>
<div>

Wiring under the hood (please forgive the newbie soldering)

<img src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpwiring.png" width="256px" alt="macro pad wiring">
</div>
</div>

{{< spacer 2rem >}}

### Got an arduino all hooked up?
- You'll need an arduino/serial based device that sends [0-9] numbers over a serial connection.
  - See the [arduino-mmp.ino](./arduino-mmp.ino) source code.
  - > Connecting and understanding baudrate, etc. is out of the scope of this guide.
- Just edit your config, edit metadata, and set the Serial Port Name, Baud rate, and change `GUIMode` to `NORMAL`.
  - If your device sends 1 for the first button instead of 0, you can set the Indexing setting to 1
  - Medatata Editor:
  - <img src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/MetadataEditor.png" width="400px" alt="MetadataEditor screenshot">


> If you're curious, check out the older python code at https://github.com/ssebs/MiniMacroPad/



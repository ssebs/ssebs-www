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
I was playing video games and was getting tired of typing "gg" manually. I was also really into [CSGO Surfing](https://www.youtube.com/watch?v=qDvQNStNUiw) for a while, and needed to "reset".

The way to reset yourself is:
- Pressing enter
- typing "/r"
- Pressing enter again

Now, this doesn't sound like a lot to do, but if you're really focusing on getting that flick right, you don't really want to keep moving your hands to type "/r" again and again. 

I knew it could be automated in some way, and I had a 3D printer and an Arduino laying around, so I got to work.

## The Macro Pad
I watched [Zack Freedman's](https://www.youtube.com/@ZackFreedman) video on [How to build Mechanical Keyboards](https://www.youtube.com/watch?v=yYcNi9hKxDk), and was inspired.

In my head, I was thinking of a number pad, but each key runs a Macro that I can choose instead of just typing the number.

I learned a lot about how arduinos work, and got myself a Teensy LC. 

Without going into *too* much detail, basically what I needed was a few mechanical keyboard switches, some red and black wire, my arduino, and a 3D printer.

To make a working switch, I'd connect a wire from one of the serial pins on the arduino to one side of the switch, and another from the other side of the switch to the ground pin. 

This ground pin is shared with the other button pins, so those can be connected together.

Once I got my supplies, I printed out some 3D models I found on https://thangs.com, and got to soldering.

<div style="display: grid; grid-template-columns: 50% 50%; gap: 1rem;">
<div>

I did eventually make my own [3D Printed housing](https://than.gs/m/710028).

<img src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpbuilt.png" width="256px" alt="physical macro pad">
</div>
<div>

Wiring under the hood (please forgive the newbie soldering).

<img src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpwiring.png" width="256px" alt="macro pad wiring">
</div>
</div>

## Making the buttons do something
Once everything was wired up, I opened up the Arduino IDE and looked up some tutorials.

I chose the Teensy LC since it can be used as a Human-Interface-Device (HID), and is able to emulate keypresses.

My plan was when you pressed a button, it would:
- Check which button was pressed, and compare that to a list of "Macros".
- These Macros would have a list of "Actions" that can be run.

The "type gg" Macro would look something like this:
- `Press("enter")`
- `Type("gg")`
- `Press("enter")`

I got this working after adding some delays between each step. 

Once I had my prototype up and running, I was excited!

There was one problem though, it was really annoying to write C everytime I wanted to change a macro.

I decided to change the architecture of the app a bit: instead of the arduino typing the keys, have it just send the button number over a serial connection, have a server listening for button presses, and have that run the macros instead.

That way, I can update python code, or even better a config file, to make my changes.

## Migration to Serial
I decided to go with Python, and also make a small GUI so you can see what/where the macros are on your device.

Here's a link to the [Github Repo](https://github.com/ssebs/MiniMacroPad), however this version has been deprecated for the Golang variant.

I used TKinter to get a grid of buttons showing, and setup a basic server to listen for button numbers.

Once the server received a button press, it would compare the number to the config file, and run the Actions for that Macro.

This worked, but the user interface was ugly, and it was kinda slow (mostly to startup). That's due to PyInstaller's exe files including a Python virtual machine.




## Switching to Go
I wanted to learn golang for one main reason: it compiles cross platform to a single binary file. Having my code compile to 1 exe file was a great benefit of learning go, the other was to become a bit more marketable, and most importantly to improve as a programmer.

I found the [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests) free online course, and got to work learning about pointers, interfaces, pointer receivers (basically methods), and how amazing writing code in Go was.

Once I got a grasp of writing in Go, I stared looking for a GUI library to recreate my python code in a cleaner way.

I learned about channels, composition, and a lot about reading the docs.

If you'd like to learn more about writing a GUI in go, check out my [blog entry](/blog/mmpguieditor/)

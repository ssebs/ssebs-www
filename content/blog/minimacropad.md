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
I was playing video games and was getting tired of typing "gg" manually. I was also really into [CSGO Surfing](https://www.youtube.com/watch?v=qDvQNStNUiw) for a while, and needed to "reset" my times pretty often.

The way to "reset" yourself is by:
- Pressing enter
- Typing "/r"
- Pressing enter again

Now, this doesn't sound like a lot, but if you're really focused on getting that *flick* right, you don't want to keep moving your hands to type "/r" over and over. 

I knew it could be automated in some way, and I had a 3D printer and an Arduino laying around, so I got to work.

## The Macro Pad
I watched [Zack Freedman's](https://www.youtube.com/@ZackFreedman) video on [How to build Mechanical Keyboards](https://www.youtube.com/watch?v=yYcNi9hKxDk), and was inspired.

Basically, (without going into too much detail) what I needed was a few mechanical keyboard switches, some red and black wire, my arduino, and a 3D printer.

In my head, I was thinking of a number pad, but instead of sending numbers with a key press, each key would run a Macro. 

To make a working button, I'd connect a wire from one of the serial pins on the arduino to one side of the switch, and another from the other side of the switch to the ground pin. 

This ground pin is shared with the other button pins, so those can be connected together.

Once I had my design ready, I printed out some 3D models I found on https://thangs.com, and got to soldering.

I chose the Teensy LC as my Serial device, since it can be used as a Human-Interface-Device (HID). That means I can emulate pressing buttons on a keyboard.

{{< spacer 1rem >}}

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

## Making the buttons do stuff
Once everything was wired up, I looked up some tutorials, and opened up the Arduino IDE.

My plan was when you pressed a button, it would:
- Check which button was pressed, and compare that to a list of "Macros".
- These Macros would have a list of "Actions" that can be run.

The "type gg" Macro would look something like this:
- `Press("enter")`
- `Type("gg")`
- `Press("enter")`

I copied some C code, and was able to get it working (after adding some delays between each step). Once I had my prototype up and running, I was feeling pretty excited! There was one problem though, it was really annoying to write C every time I wanted to change a macro.

I decided to change the architecture of the app a bit: instead of the Arduino typing the keys, I'd have it just send the button number over a serial connection. There would be an app listening for button presses, and that would run the macros on your computer instead.

That way, I can update Python code, or even better a config file, to make my changes.

## Migration to Serial
<img style="float: right;" src="https://raw.githubusercontent.com/ssebs/MiniMacroPad/refs/heads/master/img/mmpscreenshot.png" alt="python gui screenshot">

I decided to go with Python, and also make a small GUI so you can see what/where the macros are on your device.

> Here's a link to the [Github Repo](https://github.com/ssebs/MiniMacroPad), however this version has been *deprecated*.

I used TKinter to get a grid of buttons showing, and setup a basic server to listen for button numbers. Once the server received a button press, it compared the number to the config file, and run the Actions for that Macro. This worked, but the user interface was ugly, and it was kinda slow. That's due to PyInstaller's `.exe` files including a Python virtual machine.

I continued working on this version for a while, but after a couple refactors (and learning some OOP-sies), I decided I wanted to rewrite my code in Golang.

<div style="clear:both;"></div>

## Learning Go
Golang is a compiled programming language, whereas Python is interpreted. This essentially means that Go is much faster, but is a bit more work to write. There's another bonus to using Go: it compiles to a single binary file. This means I no longer had to use Pyinstaller! (No more startup time lag)

> I also wanted to learn Go to become a better programmer, and thought this was a very practical way to do so.

I found the [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests) free online book, and got to work learning about pointers, interfaces, channels, and more. 

One thing I particularly like about Go is the error handling. In Python, if you were to save text to a file you'd want to use a `try/catch` block to check for any errors. You can always leave it out, but Python won't warn you that using the `open()` function may create an error.

```python
try:
    with open("example.txt","r") as f:
        f.write("this will fail since we're only supposed to read the file")
except Exception as e:
    print(e)
```

{{< spacer 1rem >}}

In Go, the function that opens, writes, or does anything to a file will return an error; you are supposed to check if there is an error right after. You can also ignore the error, but it's more *in your face* in Go.

```golang
fileContents := []byte("this won't fail but if it did it would be checked.")

err := os.WriteFile("example.txt", fileContents, 0644)
if err != nil {
    fmt.Println("failed to write file", err)
}
```

## Rewriting in Go
<img style="float:right;" src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png" width="400px" alt="Mini Macro Pad Screenshot">

Since I was basically just copying my Python project into Go, I did that. I learned a lot about structuring my code, since Go doesn't have inheritance, I learned to use [composition](https://go.dev/doc/effective_go#composite_literals) to fit my needs. There was also a lot of reading the docs/code for my GUI library. 

I ended up choosing [fyne.io](https://fyne.io/) for my GUI library, as it was the most supported library I found. I got the basics down, and finished recreating the old functionality of my Mini Macro Pad app.

It took me a bit of time to learn how fyne works under the hood, it was quite different from what I was used to. 

I'm pretty used to how websites work, which follows a strict Document-Object-Model. The HTML/CSS + JavaScript way of building applications made so much sense, mostly because I've spent lots of time working with it. 

However, since I know enough to be dangerous with Tkinter, I was able to hack my way through using Fyne. Once everything was working, I was amazed at how much snappier my macro pad felt!

The startup time went from ~3 seconds, to less than half of a second. Running the macros felt the same, but the UI looked nicer too so I was happy.

A few bugs were fixed over time, but in the end I had released `v1.2.3` before I was ready for my next big change. 

Read more about how I [improved my GUI to add more features to my Macro Pad](/blog/mmpguieditor/)!

<div style="clear: both;"></div>

Thanks for reading!

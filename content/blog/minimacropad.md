---
title: 3D printing and coding my Mini Macro Pad
slug: minimacropad
shortdesc: The journey of making my Mini Macro Pad was created and the challenges I faced along the way.
feature: /img/MMPPrinted.jpg
date: 2024-12-10T18:45:41-08:00
weight: 25
tags: [golang, programming, 3d-printing, arduino, gui, python]
---
> Read the technical details on the [project page](/projects/go-mmp)

## What's a Macro Pad?
{{< img-float-right src="/img/MMPPrinted.jpg" width="256px" alt="physical macro pad" >}}

Have you ever wanted to run a shortcut on your computer at the press of a button? Maybe you have a repetitive Excel task that you keep doing, or you want to add a "skip song" button on your keyboard.

A Macro Pad can help solve these problems, you can think of it as a companion keyboard that adds buttons to run shortcuts. 

I made my own [3D Printed Macro Pad](https://than.gs/m/710028), and call it a **Mini Macro Pad**.

> I'm planning on redesigning and printing a new one, with a tutorial! 

> Stay tuned for that...

<div style="clear: both;"></div>

## Why I wanted a Macro Pad
One day I was playing VALORANT, and I was getting tired of typing "gg" after each game. I was also really into [CSGO Surfing](https://www.youtube.com/watch?v=qDvQNStNUiw) for a while, and needed to "reset" whenever I messed up.

The way to "reset" yourself is by:
- Pressing enter
- Typing "/r"
- Pressing enter again

Now, this doesn't sound like a lot, but if you're really focused on getting that *flick* right, you don't want to keep moving your hands to type "/r" over and over. 

I knew it could be automated in some way, and I had a 3D printer and programming know-how, so I got to work.

## The Mini Macro Pad's hardware
I watched [Zack Freedman\'s](https://www.youtube.com/@ZackFreedman) video on [How to build Mechanical Keyboards](https://www.youtube.com/watch?v=yYcNi9hKxDk), and was inspired.

Basically, (without going into too much detail) what I needed was a few mechanical keyboard switches, some wire, an arduino, and a 3D printer. What I was making was essentially a number pad, but instead of sending numbers with a key press, each press would run a Macro.

To make a working button, I'd connect a wire from one of the serial pins on the arduino to one side of the switch, and another from the other side of the switch to the ground pin. This ground pin is shared with the other button pins, so those could all be connected together.

Once I had my plan ready, I printed out some 3D models I found on https://thangs.com, and got to soldering. 

> I eventually made my own design, but I want to try again.

I chose the Teensy LC as my Serial device, since it can be used as a Human-Interface-Device (HID). That means I can emulate pressing buttons on a keyboard.

{{< spacer 1rem >}}

Here's what the wiring looks like (*please forgive the newbie soldering*).

{{< img-block src="/img/MMPWiring.jpg" width="400px" alt="macro pad wiring" >}}

## Making the buttons do stuff
Once everything was wired up, I looked up some tutorials, and opened up the Arduino IDE. 

My plan was to:
- Check which button number was pressed
- Compare that to a list of "Macros"
- Run a list of "Actions" that were set in the Macro to actually do stuff

For example, the "type gg" Macro would look something like this:
- `Press("enter")`
- `Type("gg")`
- `Press("enter")`

## Writing C
I'm familiar with the C programming language, but haven't really used it for any of my projects. I followed some Arduino tutorials and got my code to recognize when a button was pressed. Once that was done, I made a list of Macros that you could run, and hard coded what they did in an array.

I was able to get it working after I added some delays between each key press. This was needed since most games don't expect you to type in less than a millisecond. 

Once I had my prototype up and running, I was feeling pretty excited! There was one problem though, it was really annoying to write C every time I wanted to change what a Macro did.

I decided to change the architecture of my app a bit: instead of the Arduino itself typing the keys, it would just send the button number over a serial connection. There would be a separate app listening for button presses, and that would run the macros on your computer instead.

That way, I can update a config file to make my changes. Easy-peazy.

## Switching to Serial + Python
{{< img-float-right src="/img/PythonMMPScreenshot.png" alt="python gui screenshot" >}}

I decided to use Python for the new server code, as I was writing it at work and was pretty familiar with it. I also decided make a small GUI so you can see what/where the Macros are on your device.

> Here's a link to the [Github Repo](https://github.com/ssebs/MiniMacroPad), however this version has been *deprecated*.

I used [TKinter](https://docs.python.org/3/library/tkinter.html) to get a grid of buttons showing, and set up a basic server to listen for button presses. Once the server received a button press, it compared the number to the Macro in the config file, and ran the Actions in order for that Macro. 

This worked! ...but the user interface was ugly ...and it was kinda slow. This is because of PyInstaller's `.exe` files including a Python virtual machine, and meant that it would take a bit of time to start up.

I continued working on this version for a while, but after a couple refactors (and learning some `OOP`-sies), I decided I wanted to rewrite my code *yet again*.

<div style="clear:both;"></div>

## Rewriting in Go
This time, I decided to write my code in Golang. This is a modern programming language, and is a middle ground between C and Python. 

Go's a compiled programming language, whereas Python is interpreted. This essentially means that Go is much faster, but is a bit more work to write. There's another bonus to using Go: it compiles to a single binary file. This means I no longer had to use Pyinstaller, which meant no more startup time lag!

I also wanted to learn Go to become a better programmer, and thought this was a very practical way to do so.

I found the [Learn Go with Tests](https://quii.gitbook.io/learn-go-with-tests) free online book, and got to work learning about pointers, interfaces, channels, unit testing, and a bunch more. 

## Quick sidebar about Go\'s error handling
One thing I particularly like about Go is the error handling. If you wanted to save text to a file in Python, you should use a `try/except` block to check for any errors. 

You could always leave that out, but Python won't really warn you that using the `open()` function may fail.

```python
try:
    with open("example.txt", "r") as f:
        f.write("this will fail since we're only supposed to read the file")
except Exception as e:
    print(e)
```

{{< spacer 1rem >}}

In Go, the function that opens, writes, or does anything to a file will return an error; you are supposed to check if there is an error right after. 

You could ignore the error, but it's more *in your face* in Go since it's returned by value in the `WriteFile()` function.

```golang
fileContents := []byte("this won't fail but if it did it would be checked.")

err := os.WriteFile("example.txt", fileContents, 0644)
if err != nil {
    fmt.Println("failed to write file", err)
}
```
{{< spacer 1rem >}}

## Sidebar over, back to writing a GUI in Go
{{< img-float-right src="/img/MMPGUIScreenshot.png" width="400px" alt="Mini Macro Pad Screenshot" >}}

Since I had a working app written in Python, I started off by porting over my code to Go. I learned a lot about structuring my code, since Go [doesn\'t have inheritance](https://stackoverflow.com/a/34152076), I learned to use [composition](https://go.dev/doc/effective_go#composite_literals) to fit my needs. 

One important lesson I learned in doing this was to [RTFM](https://en.wikipedia.org/wiki/RTFM). The GUI library documentation *exists*, but it can be difficult to build everything you need from what you see on the getting started page. 

I found that I needed to use VSCode's autocompletion to explore what methods were available, and use the "go to definition" button to read the source code to see how it should be used.

I ended up choosing [fyne.io](https://fyne.io/) for my GUI library, as it was the most supported library I found. I got the basics down, and finished recreating the old functionality of my Mini Macro Pad app.


I used a `GridWithColumns` container along with some `Buttons`. I used the same config file as before, parsed it, went through the list of Macros and made a `Button` for each one.

Here's a snippet of the code, but check out the [full file](https://github.com/ssebs/go-mmp/blob/main/views/macro_runner_view.go) to read more.

<div style="clear: both;"></div>

```golang
for _, macro := range config.Macros {
    macroBtn := widget.NewButton(macro.Name, func() {
        macroRunner.Run(macro)
    })
    v.macrosContainer.Add(macroBtn)
}
```

{{< spacer 1rem >}}

It took me a bit of time to learn how fyne works under the hood, it was quite different from what I was used to. I've been spoiled by the Document-Object-Model, which websites use. The HTML/CSS + JavaScript way of building applications made so much sense, mostly because I've spent lots of time working with it. 

However, since I know enough (to be dangerous) with Tkinter, I was able to hack my way through using Fyne. 

## Conclusion, and what's next
Once everything was working, I was amazed at how much snappier my macro pad felt! I improved the startup time from ~3 seconds, to less than half of a second. Running the macros felt the same, but the UI looked nicer too so I was happy.

I was pretty happy with how fyne worked once I got the hang of it, and I'll gladly use it in for future Go/GUI projects.

By the end of this project, I rewrote my code about ~4 times, learning a lot with each rewrite. I fixed a few bugs, added a couple small features, and had released `v1.2.3` before I was ready to make another big change.

...that big change was release `v2` on [Github](https://github.com/ssebs/go-mmp/releases/tag/v2.0.0).

Read about how I improved my GUI to add a config editor to my Macro Pad [in part 2](/blog/mmpguieditor/)!

**Thanks for reading!** 

---
title: Improving my GUI to add more features to my Macro Pad
slug: mmpguieditor
shortdesc: 
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png
date: 2024-11-27T22:02:05-08:00
weight: 24
tags: [golang, programming, 3d-printing, arduino, gui]
---
> Read the technical details on the [project page](/projects/go-mmp)

## Creating a basic GUI in fyne
This is a follow up to the [Mini Macro Pad](/blog/minimacropad/) blog post, so I'd suggest reading that if you haven't already.

A few people have questioned my use of Golang to write a GUI, since Go is most well-known for writing backend web server code. 

At first, I didn't agree with them, but now that I've spent enough time with it, I sorta do. It's not that you *can't* write a GUI in Go, it's that it's not really *made* for it. There's no standard library that I can use, nor a plethora of examples I can refer to, but it is possible.

The main problem I ran into when working with [fyne.io](https://fyne.io/) was that the documentation *existed*, but was a bit hard to follow. The other was how the widgets were rendered. 

Using HTML + CSS + JS, there's a standard [Document-Object-Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), which has standard ways that things are drawn.

For example, a button looks like this:

```html
<button 
    style="background-color: #222; border: 1px solid #fff;"
    onclick="myFunctionName()"
    > Click me, I'm a button </button>
```

You can change the way the button looks using [CSS](https://www.w3schools.com/css/css3_buttons.asp) (which I've added inline for the example), but I won't get into that here.

Essentially, you can set the background color, text color, height, width, layout, etc. all in a way that "makes sense". (At least to me.)

In fyne, you can make a [button](https://docs.fyne.io/widget/button.html) with the following code:

```golang
myButton := widget.NewButton("Click me, I'm a button", myFunctionName())
myButton.Importance = widget.HighImportance
```

The problem is that you can't change the color, other than by setting the importance level. I can set it to blue, red, or gray depending on the importance setting. 

Laying out widgets is a whole other can of worms. Basically, you add [widgets](https://docs.fyne.io/explore/widgets) to a [container](https://docs.fyne.io/explore/container) with a [layout](https://docs.fyne.io/explore/layouts).

Only the widget can control the size and position of a widget, you can't set the width or height manually.

This would prove to be an issue once I started implementing my drag-and-drop feature.

## Problems with being basic
I was happy with what I had written, for a while at least. 

I was talking about my project with some coworkers, and they mentioned that it wasn't super user friendly to update the Macros. I agreed, as YAML was a decent file format for a developer, but not everyone wants to be slinging YAML whenever they need to create a new shortcut.

So it was decided - I had to make a GUI Config Editor. I wanted to make an interface similar to what you'd find in a Logitech or Razor keyboard driver. Obviously not as complex, but enough to meet the need.

I started designing a quick UI in Excalidraw, and got to work on my `v2` release.

## Features
The main things I wanted to make easier were:
- Changing what the Macros did (updating the Actions) 
- Moving the position of macros on the device using Drag and Drop
- Changing Metadata (like # of columns, and serial connection info) via the GUI

I was able to get these implemented relatively quickly, by creating a new window for the editor, then opening another new window for the macro when you clicked on it, then creating another window for editing the actions. 

Aside from the annoyance of opening too many windows, it worked, at least the UI looked like it worked, but when I hit save nothing was updated. When I looked at the config file, it was updated but the UI and the actual running Macros weren't.

After banging my head against the wall for a bit, I decided I needed to learn how to manage state. I was familar with React, but fyne doesn't have `useState` or `useEffect`, so I was kinda on my own.

## Learning MVC with a tip calculator
At this point, I felt I needed to learn how this was usually done. It turns out, that you should structure your code in some way to keep it organized. 

I chose the Model-View-Controller architecture, as it was the most simple to get started. If you'd like to read more about that, check out the [blog entry](/blog/mvctipcalc/). Since that blog has that journey covered, I won't repeat it. 

## Applying MVC to my Mini Macro Pad
replace_me

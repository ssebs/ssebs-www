---
title: newtitle Improving my GUI to add more features to my Macro Pad
slug: mmpguieditor
shortdesc: The story of the journey I took making a GUI in Go.
feature: https://raw.githubusercontent.com/ssebs/go-mmp/main/res/GUIScreenshot.png
date: 2024-11-27T22:02:05-08:00
weight: 24
tags: [golang, programming, 3d-printing, arduino, gui]
draft: true
---

## Before you read...
<img style="float:right;" src="https://raw.githubusercontent.com/ssebs/go-mmp/main/res/mmpbuilt.png" alt="macro pad" width="256px">

This is part 2 of my [Mini Macro Pad](/projects/go-mmp/) project. I recommend reading my [last blog post](/blog/minimacropad/) to read about how I 3D printed and coded it.

## What's wrong with v1? Why make a v2?
I was happy to have a working Macro Pad, and I used it for about a year or so with only a few tweaks to the code, but there was a problem.

If you wanted to change any of the Macros, you had to open up a code editor and edit a `.yaml` file. While this worked, it was a bit of a pain to use, and changing anything on the fly was simply not possible.

I was talking to my friends about it, and they suggested making a <span class="font-semibold" title="What you see is what you get">WYSIWYG</span> config editor. I had always planned on doing that eventually, but that was the push I needed to get started.

So it was decided - I had to make a GUI config editor. I wanted to make an interface similar to what you'd find in a Logitech or Razor keyboard driver. Obviously not as complex, but enough to make changes on the fly.

## Getting started
I started by designing a quick UI in Excalidraw, and thinking about what features I wanted to add.

<div class="flex">
<div>Config editor view where you can drag and drop your Macros.</div>
<div>Macro editor where you can drag and drop Actions to make your shortcuts.</div>
</div>

<img src="/img/GUIEditorDiagram.png" alt="GUI Editor Diagram" width="100%" >

## Features I wanted
The main things I wanted to make easier were:
- Changing what the Macros did (updating the Actions) 
- Moving the position of Macros on the device using Drag and Drop
- Changing Metadata (like # of columns, and serial connection info)

<div style="clear: both;"></div>



**CONTINUE EDITING FROM HERE**

## Expanding GUI in fyne

A few people have questioned my use of Golang to write a GUI, since Go is most well-known for writing backend web server code. 

At first, I didn't agree with them, but now that I've spent enough time with it, I sorta do. It's not that you *can't* write a GUI in Go, but that's not really what it's *made* for. There's no standard library that I can use, nor a plethora of examples I can refer to, but it is possible.

The main problem I ran into when working with [fyne.io](https://fyne.io/) was that the documentation *existed*, but was a bit hard to follow. The other was how the widgets were rendered. 

Using HTML + CSS + JS, there's a standard [Document-Object-Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction), which has standard ways that things are drawn.

For example, a button looks like this:

<div class="flex flex-wrap gap-6">
<div>

```html
<button
    style="background-color: #222; border: 1px solid #fff; color: red;"
    onclick="funcName()"> Click me, I'm a button </button>
```
</div>

<img src="/img/html-button.png" alt="html button" width="256px"/>
</div>


{{< spacer 1rem >}}

You can change the way the button looks using [CSS](https://www.w3schools.com/css/css3_buttons.asp) (which I've added inline for the example), but I won't get into that here. More importantly, you can set the background color, text color, height, width, layout, etc. all in a way that "makes sense". (At least to me.)

<hr>

{{< spacer 1rem >}}

<img style="float:right;" src="/img/fyne-button.png" alt="fyne button" width="300px" />


In fyne, you can make a [button](https://docs.fyne.io/widget/button.html) with the following code:

```golang
myButton := widget.NewButton("Click me, I'm a button", funcName())
myButton.Importance = widget.HighImportance
```

{{< spacer 1rem >}}


The Button is a [widget](https://docs.fyne.io/explore/widgets). A fyne widget can be added to a [container](https://docs.fyne.io/explore/container), like a `VBox`. This Vertical Box will stack whatever widgets you add in a vertical list, and will resize to make it fit the window. It does this by setting the minimum size of the child widgets. 

{{< spacer 1rem >}}

<img style="float: right;" src="/img/flexbox.svg" width="300px" alt="flexbox diagram" />

Compare this to the CSS [grid](https://css-tricks.com/snippets/css/complete-guide-grid/), or [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/). These are very customizable and quite powerful by [comparison](https://docs.fyne.io/explore/layouts).


One last thing before I move on, changing colors in fyne is done by setting the theme, and using them is done by setting the importance level. It can be set to blue, red, or gray depending on the importance setting. 

> In the example above, I'm setting it to Blue by setting HighImportance.

To be clear, I have no hate for fyne at all. I feel like I've learned a ton about different ways to manage user interfaces, and I'm glad that the project exists. I do think the documentation can be improved, but I could be the one contributing that `;)`

<div style="clear: both;"></div>


## Having issues with state / GUI not syncing
I was able to get these implemented relatively quickly, by creating a new window for the editor, then opening another new window for the macro when you clicked on it, then creating another window for editing the actions. 

Aside from the annoyance of opening too many windows, it worked, at least the UI looked like it worked, but when I hit save, nothing was updated. When I looked at the config file, it was updated but the UI and the Macros themselves weren't.

After banging my head against the wall for a bit, I decided I needed to learn how to manage state. I was familar with React, but fyne doesn't have `useState` or `useEffect`, so I was kinda on my own.

For example, when I'd update the name of a `Macro` in a new editor window, it wouldn't sync to the regular window. One window would show the old value, and the other the new.

I've been using React for a little while, which has [opinionated ways on how to manage state](https://react.dev/learn/managing-state), but this didn't translate to how the Golang GUI library I was using works.

The GUI library I'm using, [fyne.io](https://fyne.io), is structure / pattern agnostic, meaning it doesn't care if you choose *MVC*, *MVP*, *MVVM*, or just using a single file to manage it all (the way I was doing it before).


  ## Realize I need to organize / structure my code better
  ## I find it best to learn by doing, so to learn MVC I need to implement it myself.
  ## Link to MVC Tip Calc


## Fun with Drag and Drop
One cool thing I added was the ability to drag and drop the Macros (and the Actions within a Macro) around to swap positions of them. I wanted to be able to move the order of some Actions in a Macro

The way I achieved this was by implementing the `Draggable` interface in my **Views**. To do that, you need to create 2 functions: `Dragged(e *fyne.DragEvent)` and `DragEnd()`.

I used the `fyne.DragEvent` to get the position of the mouse, and compared that to the position of each Macro button. With that information, I can track which Macro was being dragged, and which other Macro it's hovering over.

The `DragEnd()` function just lets me know when the drag is over, so I can run `SwapMacros()` to actually do the swap on the **Model**.

I'm glossing over a lot of details here, but [check out the code](https://github.com/ssebs/go-mmp/blob/v2.0.0/views/drag_and_drop_view.go) for more about that.

I'm also glossing over the refactoring that I did, since that's pretty boring. tl;dr - I reorganized my code and cleaned it all up.

## Using what I learned from my tip calc to implement MVC for my MMP
## v2 released / what's new with the release
## What's next for v3?
  ## See github issues

--------------------------------------------------------------------------------------------------------------------


## Running Macros when you press a button
I could bore you with the implementation details of how I set up a couple goroutines, some channels to send buttonID's between them, and how that number is used to actually run the Macros, but instead I'll leave that up for [you to explore](https://github.com/ssebs/go-mmp). 

The tl;dr is this:
- The Config file is loaded
- A new thread is created to listen for serial data (button presses)
- A GUI window is made and displays the buttons from the Config.
- When a button is pressed, it will check for the matching Macro, and run the Actions in that Macro in order, using the parameters set in the config file.
  - e.g. `PressRelease("ENTER")` will press and release the enter button.


## Learning MVC with a tip calculator
At this point, I felt I needed to learn how this was usually done. 

> It turns out, that you should structure your code in some way to keep it organized. 

I chose the Model-View-Controller architecture, as it was the most simple to get started. If you'd like to read more about that, check out the [blog post](/blog/mvctipcalc/). 

## Applying MVC to my Mini Macro Pad
Once I learned about MVC, I split up my widgets into 3 files starting with the smallest piece of the UI, the Action editor, and got to work.

I thought I'd finish up in a few weeks or so, but I kept finding more work to do.

> You know how it goes.

Here's a (relatively) tiny snippet of the [larger code base](https://github.com/ssebs/go-mmp):

```golang
// model
type Action struct {
	FuncName  string `yaml:"FuncName"`
	FuncParam string `yaml:"FuncParam"`
}

// view
type ActionItemEditorView struct {
	widget.BaseWidget
	funcSelect     *widget.Select
	funcParamEntry *widget.Entry
}
. . .
func (v *ActionItemEditorView) SetAction(a *models.Action) {
	v.funcParamEntry.SetText(a.FuncParam)
	v.funcParamEntry.Refresh()

	v.funcSelect.SetSelected(a.FuncName)
	v.funcSelect.Refresh()
}
func (v *ActionItemEditorView) SetOnFuncNameChanged(f func(string)) {
	v.funcSelect.OnChanged = f
}

// controler
ac := &ActionController{
    Action:               a,
    ActionItemEditorView: v,
}

ac.ActionItemEditorView.SetOnFuncNameChanged(func(s string) {
    ac.Action.FuncName = s
})

ac.ActionItemEditorView.SetAction(ac.Action)
```

{{< spacer 1rem >}}

Same MVC concept as my [tip calculator](/projects/mvctipcalc/), but with one MVC per widget.

I kept adding features, getting closer and closer to a finished product, all while struggling to get my layout how I wanted.

## The finished Config Editor

<div style="display: grid; grid-template-columns: 50% 50%; gap: 1rem;">
<div>

Just go to **Edit** > **Edit Config**, and drag-and-drop your macros into the correct positions

<img src="/img/ConfigEditor.png" width="400px" alt="Config Editor Screenshot">

</div>
<div>
Click on the name to change what they do.

Here's the "**gg**" Macro for example:

<img src="/img/MacroEditor.png" width="360px" alt="Macro Editor Screenshot">

</div>
</div>


Here's the before:

<video width="100%" controls>
  <source src="https://github.com/user-attachments/assets/10a220b7-b671-441f-8091-367c88647971" type="video/mp4">
    Your browser does not support the video tag.
</video> 

...and after:

<video width="100%" controls>
  <source src="https://github.com/user-attachments/assets/93dba44d-0294-4836-9b47-f18b098d896a" type="video/mp4">
    Your browser does not support the video tag.
</video> 

{{< spacer 1rem >}}

**Thanks for reading!**
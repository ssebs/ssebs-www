---
title: How I Improved my Macro Pad with a Drag-and-Drop Config Editor
slug: mmpguieditor
shortdesc: I upgraded my Macro Pad with a WYSIWYG editor, drag-and-drop functionality, and MVC.
feature: ./img/ConfigEditor.png
date: 2024-12-27T14:00:00-08:00
weight: 25
tags: [golang, programming, 3d-printing, arduino, gui]
---
## Before you read...

This is part 2 of my [Mini Macro Pad](/projects/go-mmp/) project. I recommend reading my [last blog post](/blog/minimacropad/) to read about how I 3D printed and programmed that.

## What's wrong with it? Why fix something that isn't broken?
<img class="custom-float-right" src="./img/MMPPrinted.jpg" alt="macro pad" width="300px">

I was happy to have a working Macro Pad, and I used it for about a year or so with only a few tweaks to the code, but there was a **problem**.

If you wanted to change any of the Macros, you had to open up a code editor and edit a `.yaml` file. While this worked, it was a bit of a pain to use, and changing anything on the fly was simply not possible.

I was talking to my friends about it, and they suggested making a <span class="font-semibold" title="What you see is what you get">WYSIWYG</span> config editor. I had always planned on doing that eventually, but this was the push I needed to get started.

So it was decided - I had to make a GUI config editor. I wanted to make an interface similar to what you'd find in a Logitech or Razor keyboard driver. 

*Obviously not as complex*, but enough to make changes on the fly.

<div style="clear: both;"></div>

## Features I wanted
The main things I wanted to make easier were:
- Changing what the Macros did when you pressed a button (updating the Actions for a Macro)
- Moving the position of Macros on the device using Drag-and-Drop (to place the buttons properly)
- Changing Metadata (like # of columns, and serial connection info)

## Getting started
I started by designing a quick UI in Excalidraw so I could plan the layout.

<div class="flex">
<div>Config editor view where you can drag and drop your Macros.</div>
<div>Macro editor where you can drag and drop Actions to make your shortcuts.</div>
</div>

<img class="w-full" src="./img/GUIEditorDiagram.png" alt="GUI Editor Diagram" >

<div style="clear: both;"></div>

## Expanding GUI in fyne
My existing `v1` code was pretty messy, my `gui.go` file was massive, it was getting hard to read, and I knew I needed to refactor it soon. I figured this could wait, at least until I had a basic config editor working.

So, I created a new `test.go` file, and got to work building my GUI to match my diagrams. I was able to get a Grid of Macros like before, with a Delete and Edit button at the bottom. 

To start, I just created a new window each time I needed to edit a particular part of the Config.

You'd start with a normal running Mini Macro Pad window, then click **Edit** => **Edit Config**. 

From there, you could Drag-and-Drop the Macros around, and click **Edit** to open another window to edit that specific Macro.

<img class="w-full" src="./img/mmpnewwindows.png" >

## Fun with Drag-and-Drop
One thing that took me more time than I expected was getting the Drag-and-Drop to work properly. It turns out, a [fyne widget](https://docs.fyne.io/explore/widgets) can implement the [Draggable interface](https://docs.fyne.io/api/v2.1/draggable.html). However, the documentation for this was auto-generated from the source code, and did not have any working examples that I could use to learn from.

Here's a screenshot of the doc:
<img class="w-full" src="./img/fyne-draggable-api.png" >

Luckily, I could use VSCode's **Go to Definition (F12)** function to see what a `*DragEvent` even is, and what kind of data it will give me. After playing with the code for a bit, I found out that it gave both the actual and delta position of the mouse in (X,Y) coordinates.

The `Dragged()` method gets called every time your mouse moves while holding down LMB, and `DragEnd()` gets called once you let go.

Once I had the position of the mouse, I could calculate which Macro GUI component I was clicking over. I'd check the (X,Y) coordinates of each Macro + the width/height and see if your mouse was inside. If it was, I'd save which Macro that was in a `draggedIdx` variable, and move the Macro to where the mouse is positioned every frame.

> This calculation is "expensive", so I only run it the first time you start dragging something.

Then, when you let go, another calculation is made to see if you let go over another Macro in the grid. 
- If so, the positions of the two Macros would swap
- If not, it would reset back to where it came from

> Interested in the implementation? Check out the [widget\'s code](https://github.com/ssebs/go-mmp/blob/main/views/drag_and_drop_view.go)!

## Having issues with data not syncing
Aside from the annoyance of opening too many windows, I was able to get everything *visibly* working. The problem was when I hit save, nothing was updated. When I looked at the `.yaml` config file, it was updated, but none of the other UI components were.

For example, when I'd update the name of a `Macro` in a new editor window, it wouldn't sync to the regular window. One window would show the old value, and the other the new.

The GUI library I'm using ([fyne.io](https://fyne.io)) is "pattern agnostic", meaning it doesn't care if you choose *MVC*, *MVP*, *MVVM*, or just using a single file to manage it all (the way I was doing it before).

## Realizing that it's time for a refactor
<img class="custom-float-right" src="./img/whowrotethiscode.jpg" width="400px" alt="Obi Wan meme">

I knew that technical debt from `gui.go` was going to catch up to me, and at this point, it was getting hard to follow what was going on in the code I just wrote. 

> So much spaghetti, so little time.

I realized that I needed to really think about how I want to structure my code before I start writing it. Not only did I want to get the data sync working, but I wanted to know the "best practice" way of writing it. 

From what I've found, the easiest to use is Model-View-Controller. Model-View-Controller is a software architecture pattern that creates a separation of concerns, so each file in my codebase has a single purpose and a structure to follow. 

You can compare this to having a single file that manages what the GUI looks like, what happens when you press a button, and also saving your changes. (aka what I was doing now.)

So, I had to learn MVC.

<div style="clear: both"></div>

## Learning MVC
I find it best to learn by doing, so to learn MVC I need to implement it myself. Just reading some docs or watching a Youtube video is great to get the gist of a concept, but I won't truly **grok** it until I've used it.

I've written a [blog post](./blog/mvctipcalc) about my journey in learning MVC by creating a tip calculator! Please check it out to read more, but to summarize:
- The **Model** is where the data lives. 
  - e.g. The bill amount and the percent you'd like to tip.
- The **View** is what the user will see (the actual form). 
  - The **View** should not actually update the **Model** when changes happen. Instead, it will have get/set functions that are managed by the **Controller**.
- The **Controller** is the bridge between the **Model** and the **View**. 
  - It will listen for events from the **View**, and will update the **Model**.

## Applying MVC to my Mini Macro Pad
Once I learned about MVC, I split up my widgets into 3 files starting with the smallest piece of the UI, the Action editor, and got to work.

I thought I'd finish up in a few weeks or so, but I kept finding more work to do. (You know how it goes.)

Here's a (relatively) tiny snippet of the [larger code base](https://github.com/ssebs/go-mmp):

```golang
// Model
type Action struct {
	FuncName  string `yaml:"FuncName"`
	FuncParam string `yaml:"FuncParam"`
}

// View
type ActionItemEditorView struct {
	widget.BaseWidget
	funcSelect     *widget.Select
	funcParamEntry *widget.Entry
}
func (v *ActionItemEditorView) SetAction(a *models.Action) {
	v.funcParamEntry.SetText(a.FuncParam)
	v.funcParamEntry.Refresh()

	v.funcSelect.SetSelected(a.FuncName)
	v.funcSelect.Refresh()
}
func (v *ActionItemEditorView) SetOnFuncNameChanged(f func(string)) {
	v.funcSelect.OnChanged = f
}

// Controller
func NewActionController(a *models.Action, v *views.ActionItemEditorView) *ActionController {
	ac := &ActionController{
		Action:               a,
		ActionItemEditorView: v,
	}
	ac.ActionItemEditorView.SetOnFuncNameChanged(func(s string) {
		ac.Action.FuncName = s
	})
  ac.ActionItemEditorView.SetOnFuncParamChanged(func(s string) {
		ac.Action.FuncParam = s
	})
  ac.UpdateActionView()
  return ac
}
func (ac *ActionController) UpdateActionView() {
	ac.ActionItemEditorView.SetAction(ac.Action)
}
```

{{< spacer 1rem >}}

Same MVC concept as my [tip calculator](/projects/mvctipcalc/), but with one MVC per widget. 

## The finished Config Editor (v2 released)
I continued working on the project it was fully functional, overall it took about 2 months to complete the `v2` release.

### Here's what the new GUI Config Editor looks like:

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

### Before / After
Here's what it took before to make changes to the config:

<div class="videoWrapper">
<iframe src="https://www.youtube-nocookie.com/embed/yw_C6MvAJ_s?si=ePGe-XeHRZP5ERPA" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

{{< spacer 1rem >}}

...and after:

<div class="videoWrapper">
<iframe src="https://www.youtube-nocookie.com/embed/il5q0rUNj14?si=QCEOcXhOhrB_0ZgT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div> 

{{< spacer 1rem >}}

Hopefully, you can see that it's much easier to make changes, and I'm happy with all that I've learned in doing this.

## Final tweak
One last thing - After using my new editor, I noticed that the Drag-and-Drop functionality was annoying to use. 

Specifically, when adding a new Action, it gets added to the bottom of the list. If you wanted to move this to the 2nd position, you can't just insert it in position 2. Instead, you had to swap each item below pos 2 and make your way up. 

This has been resolved in [v2.0.1](https://github.com/ssebs/go-mmp/releases/tag/v2.0.1), and the before & after can be found there.

## What's next for v3?
I've made lots of progress in `v2`, so what's left for `v3`? There couldn't be more stuff, right? It's done, *right*? *Right*?

Well, I'd want at least these features:
- Support using a Mouse + position in a Macro. (So you can click somewhere specific)
- Make it possible to Record a Macro, rather than just use the editor to make one.
- Make it possible to run a program / script from a keypress.
- Make a first time setup window

...there's more, but you can see the rest on the [Github Issues page](https://github.com/ssebs/go-mmp/issues).

**Thanks for reading!**

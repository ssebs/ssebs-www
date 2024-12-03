---
title: 'Learning the MVC pattern by making a Tip Calculator'
slug: MVCTipCalc
shortdesc: Learning the MVC pattern for my MiniMacroPad by making a Tip Calculator in Go with fyne.
feature: https://github.com/ssebs/MVCTipCalc/blob/main/Screenshot.png?raw=true
date: 2024-11-17T17:30:27-08:00
weight: 24
tags: [golang, programming, gui]
---
> Also see the [project page](/projects/mvctipcalc/)

<div class="grid grid-cols-2 justify-between">
<div>
I made a basic tip calculator to learn the software development pattern. 

This is a simple form that shows the tip amount and the total amount when you enter in a bill amount, and a tip percentage.

But *why*? And *how*? And what's *MVC*?

</div>
<img src="https://github.com/ssebs/MVCTipCalc/blob/main/Screenshot.png?raw=true" width="320px" alt="MVC Diagram" class="justify-self-end">
</div>

### MVC, or Model View Controller
<img style="float:right" src="./img/mvc.webp" width="320px" alt="MVC Diagram">
If you aren't already familiar with MVC, the main thing to know is that it creates a separation of concerns, so each file in my codebase has a single purpose and a structure to follow.

> If you'd like to learn more about implementing it, check out [Derek Banas' tutorial](https://www.youtube.com/watch?v=dTVVa2gfht8).

Basically, the **Model** is what the data looks like. My config is a collection of metadata, a list of `Macros` and their respective `Actions`, in a human and machine readable `.yaml` file.

The View is what the user will see, so the actual form and drag and drop editors. The View should not actually update the model when changes happen. Instead, it will have get/set functions that are managed by the Controller.

The Controller is the bridge between the Model and the View. It will listen for events from the View, and if one happens then it will update the model.

For example, a "Save Config" button will be displayed in the View that a user can click. The Controller will add a "OnTapped" function, which will call the Model's `config.Save()` function. See [this code reference](https://github.com/ssebs/MVCTipCalc/blob/main/internal/controller.go) for more details.

<div style="clear: both;"></div>

## Why?
While working on the `v2` release of my [Mini Macro Pad](/projects/go-mmp/), which was primarily implementing a GUI Config Editor, I was having trouble managing state changes. 

For example, when I'd update the name of a Macro in a new editor window, it wouldn't sync to the regular window. 

I've been using React for a little while, which has [opinionated ways on how to manage state](https://react.dev/learn/managing-state), but this didn't translate to how the Golang GUI library I was using (fyne.io) works.

fyne.io is structure / pattern agnostic, meaning it doesn't care if you choose MVC, MVP, MVVM, or just using a single file to manage it all (the way I was doing it before).


## How?
Okay so I had the reason why I needed to organize my code, but not the how. I had created a bunch of separate widget files for each part of my app. (e.g. macro editor, metadata editor, etc.)

These would become Views, and I'd move the config update functions to a Controller.

Before I got started with my Mini Macro pad, I wanted to make a real MVC project to make sure I understood the concept.

So, I made a basic MVC Tip Calculator using Golang + Fyne to get hands-on with the MVC architecture. I had already created a [tip calculator](https://github.com/ssebs/tipr) or [two](https://github.com/ssebs/tipr-mobile), so I had a starting place.

I followed Derek's advice, and separated my files, and was able to implement it!

Here's a screenshot of the completed project, and the [Github Repo](https://github.com/ssebs/MVCTipCalc)

![screenshot](https://github.com/ssebs/MVCTipCalc/blob/main/Screenshot.png?raw=true)


Now that the MVC Tip Calculator was done, I felt confident enough to get started on my `v2` release.

If you'd like to read more about that, check out the [blog entry](/blog/minimacropad/).

Thanks for reading!

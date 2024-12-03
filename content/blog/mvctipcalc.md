---
title: 'Learning the MVC pattern by making a Tip Calculator'
slug: MVCTipCalc
shortdesc: Learning the MVC pattern for my MiniMacroPad by making a Tip Calculator in Go with fyne.
feature: https://github.com/ssebs/MVCTipCalc/blob/main/Screenshot.png?raw=true
date: 2024-11-17T17:30:27-08:00
weight: 24
tags: [golang, programming, gui]
---
> Also see the [project page](/projects/mvctipcalc/) and the [Github Repo](https://github.com/ssebs/MVCTipCalc)

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

- The **Model** is what the data looks like. My `config` is a collection of `Metadata`, a list of `Macros` and their respective `Actions`, in a human and machine readable `.yaml` file.
- The **View** is what the user will see, so the actual form and drag and drop editors. The **View** should not actually update the **Model** when changes happen. Instead, it will have get/set functions that are managed by the **Controller**.
- The **Controller** is the bridge between the Model and the **View**. It will listen for events from the **View**, and if one happens then it will update the model.

For example, a "Save Config" button will be displayed in the **View** that a user can click. The **Controller** will add a `OnTapped` function, which will call the Model's `config.Save()` function. See [this code reference](https://github.com/ssebs/MVCTipCalc/blob/main/internal/controller.go) for more details.

<div style="clear: both;"></div>

## Why?
While working on the `v2` release of my [Mini Macro Pad](/projects/go-mmp/), which was [primarily implementing a GUI Config Editor](https://github.com/ssebs/go-mmp/pull/19), I was having trouble managing state changes. 

For example, when I'd update the name of a `Macro` in a new editor window, it wouldn't sync to the regular window. One window would show the old value, and the other the new.

I've been using React for a little while, which has [opinionated ways on how to manage state](https://react.dev/learn/managing-state), but this didn't translate to how the Golang GUI library I was using works.

The GUI library I'm using, [fyne.io](https://fyne.io), is structure / pattern agnostic, meaning it doesn't care if you choose *MVC*, *MVP*, *MVVM*, or just using a single file to manage it all (the way I was doing it before).

## How?
Okay so I had the reason why I needed to organize my code, but not the how. I had created a bunch of separate widget files for each part of my Mini Macro Pad. (e.g. macro editor, metadata editor, etc.). These would become **Views**, and I'd move the config update functions to a **Controller**.

Before I got started with my Mini Macro Pad, I wanted to make a real MVC project to make sure I understood the concept. I felt that I'd learned a lot from Derek's video, and wanted to try for myself.

## Learning MVC with a tip calculator
That simple MVC project is a tip calculator. I'll keep writing it in Golang + Fyne, and since I had already created a [tip calculator](https://github.com/ssebs/tipr) or [two](https://github.com/ssebs/tipr-mobile), I had a starting place.

The main difference I learned about how I was writing my widgets before, and using MVC, is that I'd need 3 files for each component that manages data, or state, in some way.

### The Model
For my tip calculator, I had two inputs:
1) The bill amount
2) The tip percentage

With those, I can (very easily) calculate both the tip amount, and the total amount (bill + tip).

I needed to keep track of at least the first two numbers, and update the tip and total amount once one of those numbers changes.

What this looked like in code was pretty simple:
```golang
type TipModel struct {
	billAmount float32
	tipPercent float32
}

func (tm *TipModel) GetBillAmount() float32 {
	return tm.billAmount
}

func (tm *TipModel) GetTipPercent() float32 {
	return tm.tipPercent
}

func (tm *TipModel) SetBillAmount(amount float32) {
	tm.billAmount = amount
}

func (tm *TipModel) SetTipPercent(amount float32) {
	tm.tipPercent = amount
}
. . .
```


### The View
My **View** is essentially a fyne widget with a few text boxes and some labels (you've seen the screenshot). 

I also had a few important methods (functions) that the **Controller** would use. 
- `SetOnSelectTip()`
- `SetBillAmountEntryOnChanged()`
- `SetFinalTipAmount()`
- `SetFinalTotalAmount()`

The code is a bit too long to show it all, but here's a couple highlights:
```golang
. . . 

func (tv *TipView) GetBillAmount() (float32, error) {
	value, err := strconv.ParseFloat(tv.billAmountEntry.Text, 32)
	return float32(value), err
}

func (tv *TipView) SetFinalTotalAmount(amount float32) {
	tv.finalTotalAmount.SetText(fmt.Sprintf("%s%.2f", CURRENCY, amount))
	tv.finalTotalAmount.Refresh()
}
. . .
```


### The Controller
The **Controller** is what connects the **Model** and **View** together. It will tell the **View** what to do when a user selects a new tip percentage. 

When that happens it will:
- Get the bill amount the tip percentage
- Calculate both the tip amount and the total amount (bill + tip)
- Update the **View** with the new calculated values, and have it `Refresh()`.

Here's another little snippet:
```golang
. . .
tc.TipView.SetBillAmountEntryOnChanged(func(s string) {
    tc.UpdateModelFromView()
    tc.CalcTipAndUpdate()
})

. . . 


func (tc *TipController) UpdateModelFromView() {
	// update model to current values
	billAmount, err := tc.TipView.GetBillAmount()
	if err != nil {
		tc.TipView.SetErrorMsg("Bill amount must be a number.")
		return
	}
	tipPercent, err := tc.TipView.GetTipPercent()
	if err != nil {
		tc.TipView.SetErrorMsg("Tip % must be a number.")
		return
	}
	tc.TipModel.SetBillAmount(billAmount)
	tc.TipModel.SetTipPercent(tipPercent)
}

func (tc *TipController) CalcTipAndUpdate() {
	// calculate tip and total
	finalTip := tc.TipModel.GetBillAmount() * (tc.TipModel.GetTipPercent() / 100)
	finalTotal := tc.TipModel.GetBillAmount() + finalTip

	// update view
	tc.TipView.SetFinalTipAmount(finalTip)
	tc.TipView.SetFinalTotalAmount(finalTotal)
}

```

## What's next?
If you want to read more of the code, check out the [Github Repo](https://github.com/ssebs/MVCTipCalc).

Now that the MVC Tip Calculator was done, I felt confident enough to get started on my `v2` release! 

If you'd like to read more about that, check out the [blog entry](/blog/minimacropad/).

Thanks for reading!

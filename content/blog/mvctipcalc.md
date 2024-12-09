---
title: 'Learning the MVC pattern by making a Tip Calculator'
slug: mvctipcalc
shortdesc: Learning the MVC pattern for my MiniMacroPad by making a Tip Calculator in Go.
feature: https://github.com/ssebs/MVCTipCalc/blob/main/Screenshot.png?raw=true
date: 2024-11-17T17:30:27-08:00
weight: 24
tags: [golang, programming, gui]
---
> Also see the [project page](/projects/mvctipcalc/) and the [Github Repo](https://github.com/ssebs/MVCTipCalc)

<img style="float:right;" src="https://github.com/ssebs/MVCTipCalc/blob/main/Screenshot.png?raw=true" width="320px" alt="MVC Diagram">

## Why did I make a tip calculator? 
I was working on the `v2` release of my [Mini Macro Pad](/projects/go-mmp/), which was mostly just implementing a drag and drop config editor, and I was having trouble managing state. 

> If you'd like to learn more about that, see the [blog post](/blog/mmpguieditor/).

I find the best way to learn is by doing, so I decided to learn the MVC pattern by creating a tip calculator. I had already created a [tip calculator](https://github.com/ssebs/tipr) or [two](https://github.com/ssebs/tipr-mobile), so I had a starting place.

The tip calculator a simple form that shows the `tip amount` and the `total amount` when you enter in a `bill amount`, and a `tip percentage`. 

Since the Mini Macro pad is written in Go + [fyne.io](https://fyne.io/), I stuck with that.

<div style="clear: both;"></div>

### MVC, or Model View Controller
<img style="float:right" src="./img/mvc.webp" width="320px" alt="MVC Diagram">

Model-View-Controller is a software development pattern that creates a separation of concerns, so each file in my codebase has a single purpose and a structure to follow. 

Contrast this to having a single file that manages what the GUI looks like, what happens when you press a button, and saving your changes to a file.

> If you'd like to learn more about MVC, check out [Derek Banas' tutorial](https://www.youtube.com/watch?v=dTVVa2gfht8).

- The **Model** is what the data looks like. The `tip percent` and `bill amount` will be in our **Model**.
- The **View** is what the user will see, so the actual form. The **View** should not actually update the **Model** when changes happen. Instead, it will have get/set functions that are managed by the **Controller**.
- The **Controller** is the bridge between the **Model** and the **View**. It will listen for events from the **View**, and if one happens then it will update the **Model**.

<div style="clear: both;"></div>

### The Model
For my tip calculator, I had two inputs:
1) The `bill amount`
2) The `tip percentage`

With those, I can (very easily) calculate both the `tip amount`, and the `total amount` (bill + tip).

I needed to keep track of at least the first two numbers, and update the tip and `total amount` once one of those numbers changes.

The **Model** code:
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
My **View** is essentially a [fyne.io](https://fyne.io/) widget with a few text boxes and some labels (you've seen the screenshot). 

I also had a few important methods (functions) that the **Controller** would use. 
- `SetOnSelectTip()`
- `SetBillAmountEntryOnChanged()`
- `SetFinalTipAmount()`
- `SetFinalTotalAmount()`

Some of the **View** code:
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
- Get the bill amount and the tip percentage from the **View** using the `GetBillAmount()` and `GetTipPercent()` functions.
- Calculate both the tip amount and the total amount (bill + tip)
- Update the **View** with the new calculated values, and have it `Refresh()`.

Snippet of the **Controller** code:
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

## Solution idea (for tip calc)
## Implementing / screenshots
## Bringing it all together / what I learned
## See how this helped with my GUI Editor (link again)


## What's next?
If you want to read more of the code, check out the [Github Repo](https://github.com/ssebs/MVCTipCalc).

Now that the MVC Tip Calculator was done, I felt confident enough to get started on my `v2` release! 

If you'd like to read more about that, check out the [blog entry](/blog/minimacropad/).

**Thanks for reading!**
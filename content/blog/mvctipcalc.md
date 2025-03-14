---
title: 'Learning the MVC pattern by making a Tip Calculator'
slug: mvctipcalc
shortdesc: Learning the MVC pattern for my MiniMacroPad by making a Tip Calculator in Go.
feature: /img/MVCTipCalc.png
date: 2024-12-11T20:45:41-08:00
weight: 25
tags: [golang, programming, gui]
---
> Also see the [project page](/projects/mvctipcalc/) and the [Github Repo](https://github.com/ssebs/MVCTipCalc)

<img class="custom-float-right" src="/img/MVCTipCalc.png" width="320px" alt="MVC Screenshot">

## Why did I make a tip calculator? 
While working on the `v2` release of my [Mini Macro Pad](/projects/go-mmp/), I was having trouble managing state between different parts of the GUI. 

After a bit of research, it seemed like the best path forward was to use the MVC, or Model-View-Controller, software architecture pattern to manage my app. 

<!-- > If you'd like to learn more about that, see the [blog post](/blog/mmpguieditor/). -->

Before I could implement MVC for my Mini Macro Pad, I wanted to really [grok](https://www.merriam-webster.com/dictionary/grok) MVC itself. I find that the best way to learn is by doing, so I decided to learn MVC by creating a tip calculator. 

> I had already created a [tip calculator](https://github.com/ssebs/tipr) or [two](https://github.com/ssebs/tipr-mobile), so I had a starting place.

The tip calculator a basic form that calculates both the `tip amount` and `total bill amount` from the `bill` and `tip %`

Since my Mini Macro Pad is written in Go + [fyne.io](https://fyne.io/), I stuck with that.

<div style="clear: both;"></div>

## What is MVC?
<img class="custom-float-right" src="/img/mvc.webp" width="320px" alt="MVC Diagram">

Model-View-Controller is a software architecture pattern that creates a separation of concerns, so each file in my codebase has a single purpose and a structure to follow. 

You can compare this to having a single file that manages what the GUI looks like, what happens when you press a button, and also saving your changes.

- The **Model** is what the data looks like. 
  - The `tip percent` and `bill amount` will be in our **Model**.
- The **View** is what the user will see (the actual form). 
  - The **View** should not actually update the **Model** when changes happen. Instead, it will have get/set functions that are managed by the **Controller**.
- The **Controller** is the bridge between the **Model** and the **View**. 
  - It will listen for events from the **View**, and will update the **Model**.

If you'd like to learn more about MVC, check out [Derek Banas\' tutorial](https://www.youtube.com/watch?v=dTVVa2gfht8). This was the video that really helped me understand what was happening.

<div style="clear: both;"></div>

## Implementing MVC
Now that I had learned about MVC, I put it to use making the tip calculator. Note that the code snippets that you'll see below aren't full examples, if you want to see more details please check out the [Github Repo](https://github.com/ssebs/MVCTipCalc).

### The Model
For my tip calculator, I had two inputs:
1) The `bill amount` (how much your food costs)
2) The `tip percentage` (how much you want to tip)

With those, I could calculate both the `tip amount` ($ to add), and the `total amount` ($ of bill + tip).

I needed to keep track of at least the first two numbers, and update the `tip` and `total amount` once one of those numbers changed.

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
```


### The View
My Tip Calculator **View** is a [fyne.io](https://fyne.io/) widget with a few text boxes and some labels.

It also had a few important functions that the **Controller** used to control the view.
- `SetOnSelectTip()`
- `SetBillAmountEntryOnChanged()`
- `SetFinalTipAmount()`
- `SetFinalTotalAmount()`

Snippet from the **View** code: (you should really see the [src](https://github.com/ssebs/MVCTipCalc) if you want to understand the fyne widget)

```golang
func (tv *TipView) GetBillAmount() (float32, error) {
	value, err := strconv.ParseFloat(
		tv.billAmountEntry.Text, 32
	)
	return float32(value), err
}

func (tv *TipView) SetFinalTotalAmount(amount float32) {
	tv.finalTotalAmount.SetText(
		fmt.Sprintf("%s%.2f", CURRENCY, amount)
	)
	tv.finalTotalAmount.Refresh()
}
```

### The Controller
The **Controller** is what connects the **Model** and **View** together. It tells the **View** what to do when a user selects a new `tip percentage` or enters a `bill amount`.

When that happens:
- The `bill amount` and the `tip percentage` numbers are obtained from the **View** using the `GetBillAmount()` and `GetTipPercent()` functions.
- Both the `tip amount` and the `total amount` (bill + tip) values are calculated
- The **View** is updated with the new calculated values, and will `Refresh()` to redraw the UI.

Some of the **Controller** code:

```golang
tc.TipView.SetBillAmountEntryOnChanged(func(s string) {
    tc.UpdateModelFromView()
    tc.CalcTipAndUpdate()
})

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

## Bringing it all together
The last step to get the tip calculator working was to connect all the pieces together. 

In my `main.go` file, I:
- Created an instance of the **Model**
- Created a fyne window
- Created a new **View**
- Used both of those references in my **Controller** to update everything


```golang
func main() {
	myApp := app.New()
	win := myApp.NewWindow("MVC Tip Calc")

	tipModel := internal.NewTipModel()
	tipView := internal.NewTipView()
	tipController := internal.NewTipController(tipModel, tipView)

	win.SetContent(tipController.TipView)
	win.Show()
	myApp.Run()
}
```

{{< spacer 1rem >}}

<img class="custom-float-right" src="/img/MVCTipCalc.png" width="320px" alt="MVC Screenshot">

...and with that, the tip calculator was completed! 

With all this done, I had learned:
- How to separate my widgets into 3 parts
- How nice it was to have a pattern to follow when writing my code
- How to create a widget in fyne


## See how this helped with my GUI Editor
Now that I learned a bit about MVC and was able to implement it myself, I felt confident enough to get started on my `v2` release. 

Read more about how that went in the [blog post](/blog/mmpguieditor)!

Check out the `v2` release on [Github](https://github.com/ssebs/go-mmp/releases/tag/v2.0.0)!

If you want to read more of the code for this project, check out the [Github Repo](https://github.com/ssebs/MVCTipCalc).

<div style="clear: both;"></div>

**Thanks for reading!**

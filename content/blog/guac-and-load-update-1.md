---
title: 'Guac and Load Dev Update #1: Cooking Up Gameplay and Spicy Bugs'
slug: guac-and-load-update-1
shortdesc: A look at the early days of Guac and Load—game loops, Godot struggles, and enough programmer art to make your eyes water.
feature: ./img/guac-and-load-gal/guac-and-load.png
date: 2025-03-13T20:54:26-07:00
weight: 25
tags: [programming, gamedev]
---
Check out the [Steam store page](https://store.steampowered.com/app/3800880/Guac__Load/) and the [project page](/projects/guac-and-load/)

## What's Guac and Load?
<img class="custom-float-right ml-3" src="/img/guac-and-load-gal/guac-and-load.png" width="512px" alt="Game screenshot">

**Guac and Load** is what I'm calling my first 3D video game. It's a fast-paced restaurant sim where chaos in the kitchen leads to a fight for survival. 

> Okay... what does that mean?

It's a restaurant simulator, like Fast Food Simulator or Supermarket Simulator, but with a twist:

Once you start missing orders, some of the customers are a **lot** more... "impatient" than others. Some are even willing to fight for their food! You need to *Guac and Load* to fight them off and survive.

Basically, it's a half work-simulator, half zombies game.

## What do I have so far?
I started this project in early February 2025 after my best friend suggested making a Chipotle Simulator. 

After a few weeks of ~~strugging with~~ **learning** [Godot](https://godotengine.org/), I've got the core gameplay loop working, and my creative juices flowing!

Right now, you can:
- Cook food (rice, beans, meat, etc.).
- Chop ingredients to add to the food trays.
- Assemble bowls based on customer orders. (Burritos coming soon)
- Interact with customers and complete transactions.
- Earn money.

It's starting to feel like a game, but there's still a long way to go.

## What's next?

### Gameplay
I'd like to add some more features to make the game more interesting / complete.
- Progression
  - Unlocking more food types
  - Unlocking more weapons
  - Upgrades
  - Emotes?
- Zombies mode
- Customer/Zombie AI
- Day/night cycle
  - I'm still deciding, but I think this is how I'll switch between working and fighting off zombies?
- Being able to save the game would also be nice.

### Art
Right now, the game is very "programmer art" — it works, but it's not pretty. The next big step is **art assets**, so everything looks more like an actual restaurant and less like a debug playground.

Aside from replacing all the 3D models, I need to refine:
- UI elements for order management.
- Better visual feedback for cooking and prepping.
- Animations to make interactions feel smoother.

{{< img-gallery gallery_dir="/img/guac-and-load-gal" width="256px" >}}


### Misc
I've also got to add more stuff to the game for the gameplay that I've already made:
- More food (cheese, sour cream, drinks, chips, and **guac**, for example)
- Changing the way you fill the bowls
  - Right now, you just click to add 1 unit of food to a bowl.
  - Later, I'd like to click and hold to add as much or as little as you'd like
- Fixing some technical debt
  - I won't get into this for now 😁

## What I've learned so far
This project has been a crash course in structuring game code *correctly* — or at least learning how to refactor as I go. 

Here are some of my takeaways so far...

### Refactoring is inevitable
The more I learn about Godot, the more I realize I could have done things better. Instead of rewriting everything, I focus on fixing one system at a time — *MVP first, polish later.*

This works for a while, but eventually the [spaghetti](https://www.youtube.com/shorts/WHQZ1gKUQRo) catches up to you. Reading the Godot docs, and watching Youtube tutorials helped keep me learning the right way to do things. 

For example, calling functions from other scripts is usually a breeze in programming. You'd just import the file and call the function you need, but in Godot you must use [signals](https://docs.godotengine.org/en/stable/getting_started/step_by_step/signals.html).

Signals are an implementation of the [Observer](https://gameprogrammingpatterns.com/observer.html) pattern, and since Godot is Node/tree based, they are used frequently.

Without getting into too much detail, you can set a `signal` on a child class. E.g.`Customer` => `order_updated(order: OrderResource)`. 

From the parent, you can connect a callback function to that, so when a Customer's order has been updated, the parent can know about it.

### Physics and game logic don't always mix
My food objects started as `RigidBody3D`, but handling physics while keeping items manageable was a headache. Switching to custom classes and `Resources` helped keep a separation of concerns. I'm still learning about `Resources`, but a good use case for my game is a Customer's order.

An `OrderResource` has a list of `FoodItemResources` and a function to generate a new random order. These `FoodItemResources` keep track of the type of food they are, the cook state, name, and have a signal that fires when one of these values change.

For example, a piece of chicken might have this data:
- **Name**: `Pollo Asado`
- **CookState**: `COOKED`
- **FoodType**: `CHICKEN`
- **NeedsChopping**: `True`

### State Machines
To get everything moving, I was mixing my logic and animations in 1 `customer.gd` file, but that was proving to be a challenge when I wanted more complex logic. I soon learned about State Machines. 

Essentially, the customer AI can be in 1 of many `State`s, and will play a specific animation and have logic related to that state. 
  - For example, `IdleState` just plays the "Idle" animation.
  - The `WalkingState` moves the AI to the next point in it's navigation, along with playing and looping the "Walking" animation.
  - Finally, when the `Customer` pays and leaves, they enter the `LeaveState`, where they walk away from the building and play the "Death" animation at the end, then despawn.
  
## Where can I see more?
Check out the [Steam store page](https://store.steampowered.com/app/3800880/Guac__Load/)! 

I'm also uploading small updates on my Youtube channel, here's the playlist if you'd like to check out the progression!
<div class="videoWrapper">
<iframe src="https://www.youtube-nocookie.com/embed/videoseries?si=URPdRxzi07To_0BU&amp;list=PLaWBDhKq75KUStN0ub6OqckbAyCvIGxad" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>

## Final Thoughts

This project has been a blast so far, and I'm excited to keep improving it. If you want to follow along, check out the [Steam store page](https://store.steampowered.com/app/3800880/Guac__Load/) for updates.

Back to the code - I've got burritos (and zombies) to deal with.

**Thanks for reading!**

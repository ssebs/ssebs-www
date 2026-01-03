---
title: Creating Procedural Animations to Save Time in Godot
slug: godot-ik
shortdesc: I'm learning how to code procedural animations for my new game, Dank Nooner (v2)!
feature: ./img/dank-nooner-v2/moto-player-controller-wheelie-anim.png
date: 2026-01-01T13:13:15-08:00
weight: 25
tags: [programming, gamedev, godot, python]

---

[Github repo for this blog](https://github.com/ssebs/moto-player-controller-godot/) | [GitHub repo for DankNooner](https://github.com/ssebs/danknooner)

## What is Dank Nooner?

{{< img-float-right src="./img/projects/dank-nooner/screenshot03.png" width="400" alt="dank nooner screenshot" >}}

**Dank Nooner** is a motorcycle stunt game built in Godot. The v1 proof of concept is a simple wheelie balance challenge game where you hold a wheelie as long as you can and earn points to upgrade your bike.

The goal for **V2** is a full rewrite expanding into an open-world 3D game. You'll progress from a bicycle up to sport bikes, learning new tricks and completing missions along the way. 

The physics should feel fun but challenging—managing clutch, throttle, and balance—with ragdoll crashes when you bail. Doing wheelies fills your NOS meter. 

Planned features include upgrades, customization, multiplayer (races, co-op, free roam), and eventually a story mode.

[Play v1 now on the project page!](/projects/dank-nooner)


### Milestones
Here's my rough roadmap for v2:

1. **Multiplayer POC** - Complete, see the [repo](https://github.com/ssebs/multiplayer-poc-godot.git)
2. **Inverse Kinematics POC** - ✓ Complete (this blog post!)
3. **Player Controller + Animations** - Currently in progress, see the [repo](https://github.com/ssebs/moto-player-controller-godot/)
4. **MVP: Freeroam + Tricks Demo** - Multiplayer support, basic customization, open-world, and fundamental tricks
5. **Full Game** - Advanced tricks, unlocks, quests, and story mode

I'm targeting 1-2 years from January 2026 for the full release. We'll see how that goes!

## Procedural Animations? Why not regular animations?

{{< img-float-right src="./img/dank-nooner-v2/moto-player-controller-leaning-anim.png" alt="Player controller leaning over animation" width="500" >}}

Regular animations look great, but they take a lot of work to make look good. AAA game studios use motion capture on real people, but I don't have that kind of budget.

Procedural animations are simply animations that are controlled via code. These are easier to create and update, which is great since I'll need to make a bunch for each trick in my game. There's some math going on behind the scenes ([Inverse Kinematics](https://en.wikipedia.org/wiki/Inverse_kinematics)), but I'm just using it.

{{< img-float-right src="./img/dank-nooner-v2/moto-player-controller-wheelie-anim.png" width="500" alt="moto-player-controller-wheelie-animation" >}}

Basically, I can move a "target" position marker in the game engine, and the IK node (e.g. left arm) will move the hand to it. I can change a bunch of different parameters to make it look real. 

I can use this with godot's AnimationPlayer node to create custom animations. 

{{< clearfix >}}

## Show me an example:
I created IK nodes for the motorcycle rider's arms, legs, and head. Their butt is positioned manually.


<video controls>
  <source src="./img/dank-nooner-v2/godot-inverse-kinematics.mp4" type="video/mp4" />
</video>

> You can see that I'm moving the target and the leg is moving naturally.

## What's next for Dank Nooner?

Now that I have the IK system working, I need to create animations for each trick. The plan is to set up target positions for different poses (wheelie, stoppie, leaning, etc.) and blend between them based on the bike's physics.

I'm also working on the motorcycle physics themselves. Getting the clutch, throttle, and balance to feel fun but challenging is tricky — too realistic and it's frustrating, too easy and there's no skill involved.

Once I have a rideable bike with a few tricks, I'll start building out the open world. I'm thinking of starting with a small test area before committing to a full city.

If you want to follow along, check out the [GitHub repo](https://github.com/ssebs/danknooner) or the [project page](/projects/dank-nooner).

**Thanks for reading!**

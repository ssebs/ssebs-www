---
title: 'Dank Nooner'
slug: dank-nooner
shortdesc: An open-world motorcycle stunt game. Do all the stupid stuff on a bike from the safety of your home.
feature: ./img/dank-nooner-v2/DankNoonerIcon.jpg
date: 2025-10-06T18:24:03-07:00
weight: 21
tags: [programming, gamedev, python, godot]
---

{{< img-float-right src="./img/dank-nooner-v2/dank-nooner-v66.webp" width="400px" alt="Gameplay clip from Dank Nooner V2" loading="lazy" >}}

[Github Repo](https://github.com/ssebs/DankNooner) | [Play in your browser](https://ssebs.github.io/DankNooner)

## What is it?

**Dank Nooner** is an open-world motorcycle game about doing every stupid thing you'd never try in real life. Pull wheelies, stoppies, and backflips, weave through traffic, and race or free-roam online with friends. It mixes realistic bike controls with arcade trick mechanics and a high skill ceiling.

This is the V2 rewrite, a full open-world game built in Godot. It grew out of [V1](/projects/dank-nooner/#v1---the-original), a simple wheelie challenge that started it all.

## Play it now!

> Best played with a controller! But Keyboard + Mouse works too.

- **In-Browser**: [ssebs.github.io/DankNooner](https://ssebs.github.io/DankNooner/)
- **Desktop builds (Win/Mac/Linux)**: [latest release](https://github.com/ssebs/DankNooner/releases/latest)
- **v1 POC (wheelie balance)**: [play it below](/projects/dank-nooner/#v1---the-original)


### What's working now:
- **Multiplayer**: Free-roam and online racing, with friends joining via invite codes
- **Trick system**: Wheelies, stoppies, backflips, frontflips, 360s, and drifts, scored with duration and combo bonuses
- **Bike & character customization**: Skins, color slots, and mods
- **In-world challenges**: Learn by doing. Roll into a challenge to get a goal like "hold a wheelie for 5 seconds" (inspired by the Skate games)
- **Physics-based controls**: Manage clutch, throttle, and balance, with ragdoll crashes when you bail

### Game modes (in progress):
- Street racing with traffic, plus sanctioned races without
- Trick Battle: timed rounds where the highest trick score wins
- Delivery missions, from newspapers up to fragile ceramics
- A story mode tying racing, deliveries, and stunt battles together

<div style="clear:both"> </div>

{{< img-full src="./img/dank-nooner-v2/dank-nooner-v80.jpg" alt="Dank Nooner V2 gameplay" loading="lazy" >}}


## How it's built

{{< img-float-right src="./img/dank-nooner-bike-skin.png" width="400px" alt="Bike customization in Dank Nooner" >}}

Dank Nooner is the most technically involved project I've built. It's a server-authoritative multiplayer game: clients capture input and predict movement locally, while the server runs the authoritative physics and reconciles any mismatches. Networking runs over WebRTC for web play, with NAT punch-through and a relay fallback so people can actually connect.

The player is built with composition, a stack of focused controllers (movement, gearing, tricks, crashes, animation, camera) that each do one thing and run in sequence every tick. Menus and game modes run on state machines, audio goes through FMOD, and I wrote a procedural animation system with inverse kinematics so the rider leans and reacts without hand-made animations. I wrote a whole [blog post on the IK work](/blog/godot-ik/).

It's all open source, check out the code at https://github.com/ssebs/DankNooner

<div style="clear:both"> </div>

{{< img-full src="./img/dank-nooner-v2/dank-nooner-v80-2.jpg" alt="Dank Nooner V2 gameplay" loading="lazy" >}}

## V1 - The Original

V1 is the original proof-of-concept that started it all. It's a simple but fun wheelie balance challenge where you hold a wheelie as long as you can and earn points to upgrade your bike.

### The controls:
- Click & hold your Left Mouse Button to "grip the throttle"
- While holding LMB, move your mouse up/down to speed up, and left/right to steer.
- Pressing Shift while in a run will give you a speed boost.

### But why?
After [Guac & Load](/projects/guac-and-load/)'s development, I was pretty tired of gamedev. I started doing other things with my time, including learning how to ride a [motorcycle](/projects/ninja-500/).

I heard the term "dank nooner", which is basically a crazy wheelie where the bike is so high up, it's close to 12 o'clock (aka noon). I loved this term, and got the idea to come up with a basic wheelie control game similar to those old flash games, so I got to work.

{{< game-embed src="/dank-nooner-v1/" width="100%" height="600px" >}}

## V1 Screenshots

{{< img-full src="./img/projects/dank-nooner/screenshot01.png" alt="Screenshot of the game in the main menu" >}}

{{< img-full src="./img/projects/dank-nooner/screenshot03.png" alt="Screenshot of the gameplay, holding a wheelie" >}}

{{< img-full src="./img/projects/dank-nooner/screenshot02.png" alt="Screenshot of the game in the tutorial" >}}

{{< img-full src="./img/projects/dank-nooner/screenshot04.png" alt="Screenshot of the game in the upgrade menu" >}}

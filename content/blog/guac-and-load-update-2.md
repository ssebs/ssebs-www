---
title: 'Guac and Load Update #2: Lessons learned & Retro'
slug: guac-and-load-update-2
shortdesc: The game launched! Lessons learned and retrospective of making a game in 6 months.
feature: ./img/guac-blog-2/outside.png
date: 2025-08-02T07:26:45-07:00
weight: 25
tags: [programming, gamedev]
---

> This is the second Guac & Load update, check out the [first one](/blog/guac-and-load-update-1) to see how I got started.

## Status Update
{{< img-float-right src="/img/guac-blog-2/outside.png" width="512px" alt="Game screenshot" >}}

Alright, first thing's first: I've completed the game & it's live now on [Steam](https://store.steampowered.com/app/3800880/Guac__Load/)!

My first blog post about Guac & Load went into detail about the development process, but I'll keep that section short this time.

I decided (a bit late in the process) to publish the game on Steam. I wanted to add some end goal without spending *too* much time working on the game, so I added some achievements. 

<div style="clear: both;"></div>

## Achievements 
I won't list all of them, but here are a few notable ones:
### Going deaf
{{< img-float-right src="/img/guac-blog-2/go_deaf.png" width="512px" alt="Screenshot of going deaf button in pause menu" >}}

  - This was mostly just to test the achievement API, but ended up being a fun addition.
  - To get this, you open up the pause menu and click the "Go Deaf" button.
  - Once you click it, the THX sound plays at full volume & you get your achievement. 

<div style="clear: both;"></div>

### Washing your hands
{{< img-float-right src="/img/guac-blog-2/wash_hands.png" width="512px" alt="Screenshot of player washing hands" >}}

  - I had a sink in the kitchen, so I made it useful. 
  - If you wash your hands during a shift, you won't give the customers Z-Coli, meaning they won't turn into zombies.

<div style="clear: both;"></div>

### Lasting 5 zombies rounds
{{< img-float-right src="/img/guac-blog-2/zombie_hallway.png" width="512px" alt="Screenshot of zombies" >}}

  - If you didn't wash your hands, you'd eventually give the customers Z-Coli & turn them into zombies.
  - This achievement is pretty self explanatory.

<div style="clear: both;"></div>

### 100% perfect orders
{{< img-float-right src="/img/guac-blog-2/taking_order.png" width="512px" alt="Screenshot of taking orders" >}}
  - If you make all the bowls perfectly (before the outbreak), you'll get this one.

<div style="clear: both;"></div>

## Lessons Learned
In working on the game for 6 months, I learned a thing or two. 

### 1: To make a game, I had to wear many hats:
- Programming
- Art (3D models + screenshots + trailer for steam page)
- Game / level design
- Project Manager
- Play tester
- ...and more

### 2: To **release** a game, I had to:
- Let it be a bit janky
  - Getting an MVP out there was the goal, so some features were scrapped 
- Context switch for most of the project
- Spent a lot of time working on the game
  - Pushing through the last stages is hard
  - Not letting myself get burnt out was very important too
  - Balance my after-work time, I can't just grind for 6 months and ignore my other duties.

### 3: I needed a clearly scoped goal

It turned out, I didn't have a clear gameplay loop planned out. This proved to be an issue. 

When I started the project, I wanted to make a Chipotle Simulator. Just cooking food & preparing bowls. This got boring to play, and it was going to be a lot of work to add progression to try and make it fun.

I came up with the name "Guac & Load", which was great, but there was no "& Load" aspect to the game yet. I wanted to make a zombie game before, so I figured I could just add that. 

The problem was the transition from one game mode to the next, how would I turn a cooking sim into a zombie game?

This is where the motivation of making the game was starting to get lost, and I had to stick with being disciplined to make it to release.

I ended up making a day cycle, and on the 3rd day there would be a Z-Coli outbreak if you didn't wash your hands. It's okay, but good enough.

### 4: The 90/90 rule is real

If you aren't aware, the 90/90 rule states that:

> The first 90% of a software project takes 90% of the time. The remaining 10% takes another 90% of the time.

In other words, getting the gameplay loop going, adding features, making the game look like it's ready takes up the majority of the time, but the **polish** takes just as long.

Getting the game-breaking bugs fixed, UI working, save systems, exporting, and all the things to make a game feel completed takes just as much time.


## Retrospective

{{< img-block src="/img/guac-blog-2/meme.jpg" class="m-3" width="500px" alt="Meme" >}}

For all the work that it took, it's an okay game. I'm proud of it, but it's not breaking any sales records. 

I'm happy I spent the time learning how to make a game, and I'm really happy that I put in the work to finish the project. I really didn't want a half finished demo that was too buggy to give out.

I released the game as early access, so I'll eventually add some more features & bug fixes. 

I would make another game, for sure. I think instead of planning out how I'd implement a game, I'd plan out what I want the game to be. More focus on the gameplay, and less on the technical side.

I am saying that now that I have made a game & know how that's done.

## What's Next

Now that I've completed my game, I'm going to take a break from game dev. This probably means I'm going to forget my Godot specific knowledge, but that's alright.

I have a backlog of other projects, and other hobbies to get back into. 

Once I get the gamedev itch again, I'll be more prepared.


**Thanks for reading!**

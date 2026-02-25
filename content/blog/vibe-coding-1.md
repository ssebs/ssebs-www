---
title: "Stop Vibe Coding, Keep Using Your Brain: How to Use AI Effectively"
slug: vibe-coding-1
shortdesc: "Vibe coding promises speed but costs you understanding. Here's how to use AI and still stay sharp"
feature: /img/vibe-coding-1.png
date: 2026-02-24T15:28:41-08:00
weight: 25
tags: [programming, gamedev, godot, python, js, genai]
---

# First off, what is AI?

> Note - This section was written by Claude Code! The rest of the blog was me, though

{{< img-float-right src="/img/vibe-coding-1.png" width="400" alt="An illustration of an AI chat prompt input field. The text 'do it all for me' is crossed out in red. Below it, 'help me think through this' has a green checkmark" >}}

### Super Brief Summary

AI, specifically Large Language Models (LLMs), are autocomplete on steroids. They predict the next most likely token based on massive amounts of training data. They don't "understand" your code, they just pattern match really well. That's powerful, but it's not magic.

### How people are using it / hype around replacing SWEs

There's a lot of noise right now about AI replacing software engineers entirely. CEOs love the idea of smaller teams shipping faster. Tools like Cursor, Claude Code, and GitHub Copilot are getting better every month, and some people are shipping entire apps without writing a line of code themselves.

But here's the thing: the people getting the most out of these tools are experienced developers who already know what good code looks like. The AI doesn't replace the skill, it amplifies it.

### Vibe Coding vs AI Assisted Coding

**Vibe coding** is when you let the AI drive. You describe what you want, hit enter, and hope for the best. You're not reading the code, not understanding the architecture, just *vibing*.

**AI assisted coding** is when **you** drive, and the AI rides shotgun. You plan the approach, understand the problem, and use AI to speed up the boring parts (e.g. boilerplate, syntax you'd have to Google, etc.)

One makes you faster today but dumber over time. The other makes you faster *and* keeps you sharp.


{{< clearfix >}}


# Trying out "vibe coding" - **VSCode extension**
> What DOESN'T work (rely on it to think for me)

Check out the [VSCode Extension](https://github.com/ssebs/todo-sidebar) for yourself!


### What I wanted
During the development of [Dank Nooner's rewrite](/projects/dank-nooner), I needed some way to track my todo's & tasks. I didn't want to go full Kanban, but needed more than a simple Markdown file.

I was using a `TODO.md` file with H2 sections & a list of nested checkboxes, but I wanted something that I could drag-n-drop, and check things off. 

Unable to find a decent solution, I decided to give vibe coding a try.

### What I did

I created a brand new [VSCode Extension](https://github.com/ssebs/todo-sidebar) following their docs, and got to work.

By got to work, I mean wrote a `README.md` explaining what I wanted the extension to do, and a sample `TODO.md` file with the format that I was already using.

In about 2-3 days of using Claude Code's Pro plan (damn token limitations!), I got a functional app going. During this time, I simply told it what I wanted added, referenced a `CLAUDE.md` file, and let it rip. I didn't look at the code until it was working, and even then I just skimmed it.

It was able to get things about ~80% of the way there, but actually using the extension gave me more TODOs to copy/paste (and more errors). 


{{< img-full src="/img/todo-sidebar-md.png" alt="screenshot of the extension" >}}

### What's the problem 

(laggy, telling the computer to figure out problems can only get you so far)

### What's next

# Trying out AI assisted coding - **Dank Nooner**

> What DOES work (use it to be more efficient)

[Dank Nooner's project page](/projects/dank-nooner)

### Use AI as a tool, not as a replacement for thinking

### E.g. 1 - Boilerplate (I have `x` pattern, now implement it for `y`, `z`)

### E.g. 2 - Planning (I have this problem, and I think I can do this to solve it, what are alternatives & how do they compare, how will they fit in my codebase)

### E.g. 3 - Implement things I'd have to google, saving time. (AABB bounding box, Skel/Bone generation from Dict)

# How I can stay relevant, and sharp - **Summary / Lessons Learned**

> in a time where the world wants us to rely on AI, find what works for you. 

### Don't give up planning on your own, think the problem through

### Once you have an idea, write it down & verify it

### Use AI to boost productivity, not to replace thinking

---
title: "Stop Vibe Coding, Keep Using Your Brain: How I Use AI Effectively"
slug: vibe-coding-1
shortdesc: "Vibe coding promises speed but costs you understanding. Here's how to use AI and still stay sharp"
feature: /img/vibe-coding-1.png
date: 2026-02-24T15:28:41-08:00
weight: 25
tags: [programming, gamedev, godot, python, js, genai]
---

# First off, what is AI?

> Note - This section was written by Claude Code! The rest of the blog was me, though!

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

> What DOESN'T work (relying on it to think for me)

> Check out the [VSCode Extension](https://github.com/ssebs/todo-sidebar) for yourself!


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

That last 20% was hard, it always is when writing software. Usually things like polish, fixing bugs, and performance issues take up a bunch of time.

In my case, my extension would:
- Freeze after a long time
- Drag-n-drop stops working when a checkbox (task) has nested items
- Corrupt `.vscode/settings.json` when there's already a setting saved
- \<more\>

Since these bugs were pretty annoying, I-*err, claude*- got to debugging them. I copied my bug note into claude code & told it to fix the bug.

Many tokens later, it looked like the bug was fixed! However, a new bug would pop up. This repeated, and since I had no clue how the code worked under the hood, I was at the mercy of Anthropic.

I decided to venture into the generated codebase, and what I found was disgusting.

- Duplicate logic
- Unused variables
- anti-patterns
- snake_case and camelCase mixed!

The next day (when I got more tokens), I made a list of design issues & told claude to refactor them. I used the superpowers plugin to plan a refactor & implement it, but when it came down to it, claude tried its best but couldn't do the whole refactor at once.

I had to split up the refactor into parts, and it was able to clean up the code.

Eventually, I implemented most of the features & fixes, but not having context on how the code works definitely made it harder to keep things tidy to say the least.

### What's next for the extension

I'm going to keep vibe coding it, but keeping a smaller scope. I don't really care enough about this extension (or extension development in general) to clean it up, so it is what it is.

....

# Trying out AI assisted coding - **Dank Nooner**

> What DOES work (use it to be more efficient)

[Dank Nooner's project page](/projects/dank-nooner)

### Use AI as a tool, not as a replacement for thinking

### E.g. 1 - Boilerplate code

{{< img-float-right src="/img/dank-nooner-settings-menu.png" width="600" alt="screenshot dank nooner showing settings menu" >}}

The first good use-case I can think of is to use AI to generate boilerplate code. The basics like a React component already has a VSCode snippet, so that's not what I mean.

Instead, I mean a design pattern that's specific to your project.

Let's say I created a State Machine driven Menu system for my game 👀. 

I created the:
- Main menu
- Lobby menu
- Play menu

And I have a good amount of example code for claude to reference.

Each menu has a set of files (scene, script, @export vars that are attached in the editor, UI elements, button click handlers, etc.)

{{< clearfix >}}

I was able to get claude to generate a settings menu, and a customization menu just by providing it an example of the pattern.

```md
@CLAUDE.md @state_machine.gd @menu_manager.gd @play_menu.gd @play_menu.tscn - Create a settings menu using the same architecture as the files provided. create the following UI elements:
- title
- back button
- username menu (using a Label + LineEdit)
- save button
```

### E.g. 2 - Planning out features

{{< img-float-right src="/img/dank-nooner-bike-skin.png" width="600" alt="screenshot from godot editor showing the generated skeleton" >}}

Another good use case for AI assisted coding is planning. I don't mean "plan mode" to refactor your code, I mean planning out how you're going to solve something.

For instance, I'm adding different motorcycles with "skins" (different colors) that will be unlocked. To achieve this, I need to have some type of skin / color system.

I have a general idea on how I'd implement it, but I wanted to think it through a bit more. 

{{< clearfix >}}

So, I came up with a basic plan:

```md
- I have multiple types of 3d models, some that use a single png texture, and others that have many materials & meshes.
- I want to be able to change certain colors dynamically, and save them as a file using godot resources
- I've created a test scene @sport_bike.tscn with the model
- I'm thinking of adding a skin script that I can attach to a Node3D, which has some options to change colors.
- In the script itself, I need to check if it's a textured material (shader) or a standard material, and find a way to change the color for each.
- <more details>
```

Then asked Claude to help me think it through:

`@CLAUDE.md - I have this plan <paste> to implement skins in my game, this is one solution, provide alternatives I could implement & how do they compare. Share how each will they fit in my existing codebase`

It came back with some options, and I had a back & forth chat with it. 

Eventually, it suggested some code. 

I had to tell it "stop generating code, we're still planning the system. Instead, save this plan to @skin_plan.md".

### E.g. 3 - Implement things I'd have to google

{{< img-float-right src="/img/dank-nooner-skeleton-gen.png" width="600" alt="screenshot from godot editor showing the generated skeleton" >}}

Once really crucial time saver was to delegate some implementation to the AI. Since I know the higher level architecture, and what I'm trying to achieve, I can be specific enough & provide the data the AI needs to solve the problem.

#### Set height of a 3D Mesh dynamically so I don't have to manually scale it

This is something I knew that I should use bounding boxes (AABB) for, but wasn't sure how I'd implement. 

{{< clearfix >}}

I told claude: 

`@CLAUDE.md @filepath_of_script.gd - scale mesh_skin to HEIGHT in a new function. Use AABB bounding boxes to scale Meshinstance3Ds`

```gdscript
. . .
func _ready():
    _spawn_mesh()

func _spawn_mesh():
    . . . # code hidden for brevity
	mesh_node.add_child(mesh_skin)

	_scale_to_height(mesh_skin, HEIGHT) # new func

## AI wrote this
func _scale_to_height(node: Node3D, target_height: float) -> void:
	var aabb := _get_combined_aabb(node)
	if aabb.size.y <= 0:
		return
	var scale_factor := target_height / aabb.size.y
	node.scale *= scale_factor

## AI wrote this
func _get_combined_aabb(node: Node3D) -> AABB:
	var combined := AABB()
	var first := true
	for child in node.get_children():
		if child is MeshInstance3D:
			var mesh_aabb: AABB = child.get_aabb()
			var transformed: AABB = child.transform * mesh_aabb
			if first:
				combined = transformed
				first = false
			else:
				combined = combined.merge(transformed)
		. . . # more code hidden for brevity
	return combined
```

This would have taken me at least an hour or two to code myself, since I'm not familiar with the API. This also supports multiple MeshInstance3D's in 1 scene, which is good.

#### Skeleton generation for ragdoll physics on multiple character skins

Without going too much into the code (see [this file](https://github.com/ssebs/DankNooner/blob/main/v2/entities/player/characters/scripts/ragdoll_controller.gd) if you're interested), I have multiple character skins in my game, and I want them to all be able to ragdoll when you crash on your bike.

The godot docs say to create a skeleton simulation in the UI, then tweak a bunch of values & save it into the scene. This is fine for a single character, but since I'm going to have a bunch, I needed to generate this. 

To get claude to help, I ran the manual steps once, but took note of all the constraint values that were needed. 
> These are needed so when a character ragdolls, their leg doesn't bend forward & through their chest.

I hard-coded these values once in the editor & wrote them into a dictionary. 


Then, I told claude:
`@CLAUDE.md @filepath_of_script.gd - Using ragdoll_bone_constraints_base as a map, create a function to generate bones for skel_root. Only include bones listed in the map, and add constraints following the values.`


```gdscript
## Needs to be generated in code, used in ragdoll simulation
var skel_root: PhysicalBoneSimulator3D = PhysicalBoneSimulator3D.new()

var ragdoll_bone_constraints_base = {
	"Spine": {"type": "CONE", "min_bounds": [-0.5, -0.4, -0.6], "max_bounds": [1, 0.4, 0.6]},
	"Head": {"type": "CONE", "min_bounds": [-0.6, -0.6, -0.3], "max_bounds": [0.35, 0.6, 0.3]},
	"LeftUpperArm": {"type": "CONE", "min_bounds": [-0.3, 1, -0.8], "max_bounds": [1.0, 1, 0.8]},
	"LeftLowerArm": {"type": "CONE", "min_bounds": [-0.1, -2, -2], "max_bounds": [2.5, -0.7, 2]},
	"LeftHand": {"type": "CONE", "min_bounds": [-0.3, 0, -0.3], "max_bounds": [0.5, 3, 0.3]},
	"LeftUpperLeg": {"type": "CONE", "min_bounds": [-0.7, -0.8, 1], "max_bounds": [0.7, 1.2, 1]},
	"LeftLowerLeg": {"type": "HINGE", "min_bounds": [0, 1, 0], "max_bounds": [0, 1, -1.5]},
	"LeftFoot": {"type": "CONE", "min_bounds": [-0.4, 1.5, -1.4], "max_bounds": [0.4, 0.3, 0]},
}
```


Then... it took a bit more tweaking, but eventually, it worked! (Go see the [src code](https://github.com/ssebs/DankNooner/blob/main/v2/entities/player/characters/scripts/ragdoll_controller.gd) to see what it generated) I followed the same process for setting up IK maps, and I was off to the races!


# How I can stay relevant, and sharp - **Summary & Lessons Learned**

> In a time where the world wants us to rely on AI, find what works for you.

### Don't give up planning on your own, think the problem through

The VSCode extension was a good example of what *not* to do. I let Claude drive, and ended up with a codebase I didn't understand. Debugging was rough since I didn't know how the code worked under the hood.

With Dank Nooner, I already knew what I wanted before asking for help. That made all the difference.

Before you open the AI chat, ask yourself: "Do I actually understand what I'm trying to build?" If not, sketch it out first. An excalidraw diagram, a bullet list, whatever works.

### Once you have an idea, write it down & verify it

For the skin system, I didn't just tell Claude "make skins work." I wrote out my constraints, the types of materials I was dealing with, and what I thought the solution might look like.

When Claude suggested alternatives, I could actually evaluate them. I knew enough to say "no, that won't work because..." instead of just accepting whatever it gave me.

Write your plan in a markdown file. Share it with the AI. Have it poke holes in it. But *you* should make the final call.

### Use AI to boost productivity, not to replace thinking

The skeleton generation and AABB scaling examples are the sweet spot. I knew *what* I needed, I just didn't know the exact API calls. That's perfect AI territory. It's like having a really fast Stack Overflow that knows your codebase.

But here's the line I've drawn for myself:
- **AI should handle**: Boilerplate, syntax lookup, implementing well-defined patterns, refactoring with clear instructions
- **I should handle**: Architecture decisions, debugging root causes, understanding *why* something works

Once you stop understanding your own code, you're gonna have a bad time. No amount of "just ask Claude to fix it" will save you when you're on a deadline and the AI keeps hallucinating non-existent APIs.

### The bottom line

AI isn't going away, so you might as well get good at using it. Just don't let it do your thinking for you.

Back to the code - I've got more stuff to add.

**Thanks for reading!**

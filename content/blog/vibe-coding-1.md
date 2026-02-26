---
title: "Stop Vibe Coding, Keep Using Your Brain: How I Use AI Effectively"
slug: vibe-coding-1
shortdesc: "Vibe coding promises speed but costs you understanding. Here's how to use AI and still stay sharp"
feature: /img/vibe-coding-1.png
date: 2026-02-24T15:28:41-08:00
weight: 25
tags: [programming, gamedev, godot, python, js, genai]
---

> Author's note: Long read, but you'll walk away knowing exactly when to let AI help and when to do it yourself.

**tl:dr** - Letting AI drive leads to code you can't debug. Here's how to use AI as a tool, not a replacement for thinking

# First off, what is AI?

> Note - This section was written by Claude Code! The rest of the blog was me, though!

{{< img-float-right src="/img/vibe-coding-1.png" width="400" alt="An illustration of an AI chat prompt input field. The text 'do it all for me' is crossed out in red. Below it, 'help me think through this' has a green checkmark" >}}

### Super Brief Summary

AI, specifically Large Language Models (LLMs), are basically autocomplete on steroids. They predict the next most likely <strong title="Basically a word">token</strong>  based on massive amounts of training data. They don't "understand" your code, they just pattern match really well. That's powerful, but it's not magic.

### How people are using it / hype around replacing SWEs

There's a lot of noise right now about **AI** replacing software engineers entirely. CEOs love the idea of smaller teams shipping faster (see: cheaper). Tools like Cursor, Claude Code, and GitHub Copilot are getting better every month, and some people are shipping entire apps without writing a line of code themselves.

But here's the thing: the people getting the most out of these tools are experienced developers who already know what good code looks like. The AI doesn't replace the skill, it amplifies it.

### Vibe Coding vs AI Assisted Coding

> The main topic of this post

**Vibe coding** is when you let the AI drive. You describe what you want, hit enter, and hope for the best. You're not reading the code, not understanding the architecture, just *vibing*.

**AI assisted coding** is when **you** drive, and the AI rides shotgun. You plan the approach, understand the problem, and use AI to speed up the boring parts (e.g. boilerplate, syntax you'd have to Google, etc.)

Most of the hype is around vibe coding, but I think the more useful thing is AI assisted coding.

{{< clearfix >}}


# Trying out "vibe coding" - Creating a VSCode extension

> This is what does **not** seem to work in my experience

### What I wanted

During the development of my motorcycle stunt game, [Dank Nooner](/projects/dank-nooner), I needed some way to track my todo's & milestones. I didn't want to go full Kanban in a separate app, but needed more than a simple Markdown file.

I had been using a basic `TODO.md` file like this:

```md
## In Progress
- [ ] Create player controller
  - [x] Create scene
  - [x] Add character
## Backlog
- [ ] Add sounds
- [ ] Save system
## Done
- [x] Create level
```

But, I wanted something a bit more complex:
- Drag-n-drop support to move the "tasks" around
- When I check something off, it should move to the "done" section
- Slightly better UI than raw Markdown 
  - (although I've been loving the [Markdown Inline Editor extension](https://marketplace.visualstudio.com/items?itemName=CodeSmith.markdown-inline-editor-vscode)!)

Unable to find a decent existing solution, I decided to give vibe coding a try.

### What I did

I created a brand new VSCode Extension following Microsoft's docs, and got to work.

By got to work, I mean that I wrote a `README.md` explaining what I wanted the extension to do. I also made a basic `TODO.md` file with the format that I was using in my other project.

In about 2-3 days of using Claude Code's Pro plan (damn token limitations slowing me down!), I got a POC going. During this "development", I simply told it what I wanted to add, referenced a `CLAUDE.md` file, and let it rip. I didn't even bother to look at the code, it was a vibe.

It was able to get things about ~80% of the way there, but actually using the extension gave me more things to add to my `TODO.md`.

Here's a screenshot of the working extension:

{{< img-full src="/img/todo-sidebar-md.png" alt="screenshot of the extension" >}}

### What I found to be the problem

That last 20% was hard, as it always is when writing an app. Usually things like polish, fixing bugs, and performance issues take up more time than you think.

In my case, I had these issues:
- Freezing after a long time
- Drag-n-drop stops working when a checkbox has nested items
- Corrupt `.vscode/settings.json` when there's already a setting saved
- General lag

Since these bugs were annoying me, I -*err, claude*- got to debugging them. I copy/pasted these issues into a fresh claude code window and told it to fix the bug.

Many tokens later, it looked like claude fixed the bug! However, a new bug would pop up. This kept happening, and since I had no clue how the code worked under the hood, I was at the mercy of Anthropic to fix it.

I decided to venture into this mysterious codebase, and what I found was *disgusting* (at least to me):

- Duplicate logic
- Unused variables
- Anti-patterns
- Worst of all... `snake_case` and `camelCase` in the same file!

The next day (when I got more tokens), I decided enough was enough. I finally started using my brain again.

I made a list of architectural issues & told claude to refactor them. Using the [superpowers](https://github.com/obra/superpowers) plugin, I made a plan & had claude try to implement it all at once.

Sadly when it came down to it, claude tried its best but couldn't do the whole refactor at once.

I ended up splitting the plan into bite sized chunks (fix duplicate logic, move web view to a separate file, etc.), and started over.

Eventually most of the bugs were fixed, but not having context on how the code works definitely made it harder to keep things tidy to say the least.

### What's next for the extension

I'm still using it on Dank Nooner, so as I get annoyed I'll keep vibe coding features & bug fixes. I'll be sure to have a smaller scope for each context window / session.

I don't really care enough about this extension to find the root cause of the lag, so it is what it is for now.

# Trying out AI assisted coding - **Dank Nooner**

> This is what **does** work in my experience!

With [Dank Nooner](/projects/dank-nooner), I took a different approach...

### Using AI as a tool, not as a replacement for thinking

### The Easiest Use-Case - Boilerplate code

{{< img-float-right src="/img/dank-nooner-settings-menu.png" width="600" alt="screenshot dank nooner showing settings menu" >}}

The first useful thing I found is to use AI to generate boilerplate code. 

I don't mean boilerplate in the literal sense, since snippets already take care of that. 

Instead, I mean a design pattern that's specific to your project.

Let's say... I created a Menu System for my game that uses State Machines 👀. 

I created the system + a few menus manually:
- Main menu
- Lobby menu
- Play menu

Each menu has a set of files (scene, script, godot engine variables, UI elements, button click handlers, etc.)

With that, I have a good amount of example code for claude to reference.

{{< clearfix >}}

I was able to get claude to generate the entire settings menu, as well as a customization menu! I just needed to provide a examples of the pattern.

```md
@CLAUDE.md @state_machine.gd @menu_manager.gd @play_menu.gd @play_menu.tscn - Create a settings menu using the same architecture as the files provided. create the following UI elements:
- title
- back button
- username menu (using a Label + LineEdit)
- save button
```

This is great! Once I figure out how I want something to be implemented, I can use claude to speed up my coding.

### Another Use-Case - Planning out features & thinking it through

{{< img-float-right src="/img/dank-nooner-bike-skin.png" width="600" alt="screenshot from godot editor showing the generated skeleton" >}}

Another good use case for AI is planning: both as someone (thing?) to bounce ideas off of, and someone to help think about how this change will work with your existing code.

> Note that I don't mean "plan mode" in claude, I mean planning out how you're going to solve something.

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
- <more details that I'm leaving out for brevity>
```

Then asked Claude to help me think it through:

`@CLAUDE.md - I have this plan <paste> to implement skins in my game, this is one solution, provide alternatives I could implement & how do they compare. Share how each will they fit in my existing codebase`

It came back with a few alternatives, as well as pros & cons of how it will fit with my existing code. After a bit of back & forth, I had a good sense of what I wanted. 

Eventually though, it started suggesting code. I had to tell it "stop generating code, we're still planning the system. Instead, save this plan to @skin_plan.md".

It saved the plan to a Markdown file, I re-read it, and tweaked it until I was happy. 

From there, I could've had claude implement the plan, but I instead chose to do it myself. An hour or so later, and I can now say that I've added skins to my game! So, I'd call it a success. (And I know how it works, so I can tweak it later if neeed.)


### One more (super useful) Use-Case - Implement things I'd usually have to google

One really **crucial** time saver was to delegate **some** thinking to the AI. Since I knew the architecture, and what I was trying to achieve, I could be specific enough to provide the data the AI needs to solve the problem.

I had 2 of these types of problems:

#### 1. Set height of a 3D Mesh dynamically so I don't have to manually scale it

This is something I knew that I should use bounding boxes (AABB) for, but wasn't sure how I'd implement. 

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

#### 2. Skeleton generation for ragdoll physics on multiple character skins

Without going too much into the code (see [this file](https://github.com/ssebs/DankNooner/blob/main/v2/entities/player/characters/scripts/ragdoll_controller.gd) if you're interested), I wanted to create a ragdoll effect when you crash on your bike for my character skins.

I have multiple characters, each with a "Mesh" (what the character looks like) and a "Skeleton" (what animations & ragdoll use) that needs to be created.

The godot docs say to create a skeleton simulation in the UI, then tweak a bunch of values & save it into the scene. This is fine for a single character, but since I'm going to have a bunch, I needed to automate this. 

To achieve this, I:
- Ran the manual steps once (following the docs)
  - Clicked generate in Godot's UI
  - Performed some bone cleanup (totally normal, I swear)
  - Added constrain values for each bone I cared about. (e.g. not each finger, just the arms/legs/head)
  - > A constraint basically tells a joint to limit it's rotation, say to stop a leg from bending forward or through the body
- Saved each of these contraint values to a Dictionary / map for claude to use later
- Wrote up a prompt for claude


The prompt:

`@CLAUDE.md @filepath_of_script.gd - Using ragdoll_bone_constraints_base as a map, create a function to generate bones for skel_root. Only include bones listed in the map, and add constraints following the values.`


The reference code:

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

After a bit of tweaking, back & forth, and some testing, I had a working solution!
> And in a fraction of the time it would have taken me alone!

> Go see the [src code](https://github.com/ssebs/DankNooner/blob/main/v2/entities/player/characters/scripts/ragdoll_controller.gd) to see what it generated!

The output:

{{< img-full src="/img/dank-nooner-skeleton-gen.png" alt="screenshot from godot editor showing the generated skeleton" >}}


# Lessons Learned & Summary

> In a time where the world wants us to rely on AI, find what works for you.

### Don't give up planning on your own, think the problem through

The VSCode extension was a good example of what *not* to do. I let Claude drive, and ended up with a codebase I didn't understand. Debugging was rough since I didn't know how the code worked under the hood.

With Dank Nooner, I already knew what I wanted before asking for help. That made all the difference.

My advice? Before you open the AI chat, ask yourself: "Do I actually understand what I'm trying to build?" If not, sketch it out first. An excalidraw diagram, a bullet list, whatever works.

### Plan out your code

For the skin system, I didn't just tell Claude "make skins work." I wrote out my constraints, the types of materials I was dealing with, and what I thought the solution might look like.

When Claude suggested alternatives, I could actually evaluate them. I knew enough to say "no, that won't work because..." instead of just accepting whatever it gave me.

Write your plan in a markdown file. Share it with the AI. Have it poke holes in it. But *you* should make the final call.

### Use AI to boost productivity, not to replace thinking

The skeleton generation and AABB scaling examples are the sweet spot. I knew *what* I needed, I just didn't know the exact API calls. That's perfect AI territory. It's like having a really fast Stack Overflow that knows your codebase.

But here's the line I've drawn for myself:
- **AI should handle**: Boilerplate, syntax lookup, implementing well-defined patterns, refactoring with clear instructions
- **I should handle**: Architecture decisions, debugging root causes, understanding *why* something works

Once you stop understanding your own code, you're gonna have a bad time. No amount of "just ask Claude to fix it" will save you when you're on a deadline and the AI keeps hallucinating non-existent APIs.

### Final thoughts

AI isn't going away, so you may as well get good at it. Just don't let it do your thinking for you.

**Thanks for reading!**

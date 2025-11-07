---
title: "Spinning Plates"
layout: post
tags: [ai, reflection, work]
post_summary: "LLMs have made me more productive than ever and somehow worse at the parts of programming that I actually liked. I’m trying to work out what to keep, what to change, and what it means when the work doesn’t feel like it’s mine anymore."
---

Over the last six months, the way I work has changed more than it did in the previous six years.

I have a feeling this isn’t just a "me" thing. Companies and tech influencers are loudly pushing AI-first workflows, YouTube talks and blog posts explain "how I use LLMs" as if that’s now a core part of your stack, and experienced devs keep reporting the same weird combo: they *feel* faster while also suspecting they’re learning less.[^bignote]

Even as I write this, I have Claude Code spun up in another terminal pane, churning out unit tests for a chunk of code that I mostly didn’t write but that’s probably 95% of the way to production-ready.

It’s incredible.

I genuinely don’t know how I feel about it.

## TL;DR

- LLMs have transformed my work into lots of shallow touches on many tasks instead of long focus sessions on a few things.
- I’m shipping more than ever, but I retain less and feel less ownership.
- I now spend as much time optimizing my workflow as I do thinking about the code itself, and the ROI is objectively good and subjectively cursed.
- My deep-focus muscle is weaker; hard problems feel harder.
- I’m increasingly inspired by Andrej Karpathy’s "tab complete first, type it out to learn" approach and Dan Abramov’s worries about people not wanting to learn at all, and I’m trying to decide how far I want to lean into each side.

## The Plate-Spinning Version of Programming

My old "good day" looked like this:

1. load one tricky problem into my head,
2. struggle with it,
3. get stuck,
4. have a small breakthrough,
5. ship a PR.

The feedback loop was long but satisfying: effort in, understanding out. Most of the joy lived in steps 2–4; that’s where I actually learned things. The throughput wasn’t insane, but at least I felt like I owned what I shipped.

Now, a typical "good" day looks more like:

- write a short-to-medium-length prompt about a bug or feature;
- let Claude Code write a first pass over 3–4 files;
- skim the output, fix the obviously wrong bits, add logging, run tests;
- repeat that loop across a few tasks, plus reviews, plus a doc or two.

By the end of the day, my GitHub looks [absolutely cracked](https://github.com/dmarticus/). Lots of green. On a good day I can crank out multiple features that are well tested and work as soon as they hit production.

Under the hood, though, the feedback loop has been re-sized:

1. define the shape of what I want,
2. write a prompt and hand it context,
3. triage whatever comes back,
4. iterate until it compiles / passes / looks fine.

There’s still skill there—prompt design, taste, knowing what "smells wrong"—but the locus of difficulty moves. It’s less "can *I* solve this?" and more "can I supervise this?" The reward structure changes too: less "wow, I learned something deep" and more "nice, another plate spun and didn’t fall." Still satisfying, just in a more managerial way.

And when the model drops a solution fully formed, part of the joy evaporates. The problem gets solved; I don’t get the same little "oh sick, I figured that out" hit. When I scroll through my own diffs, I’ll sometimes realize I can’t actually explain why I did X instead of Y in a given PR without re-reading the whole thing.

The work has my name on it; it just doesn’t always feel like it has my fingerprints. Intellectually, I know that programming has always been "assembly on top of other people’s abstractions." Emotionally, the gap between "I shipped this" and "I understand this" has never felt quite this wide.

## Meta-work All the Way Down

The really cursed bit has been where I’ve redirected my effort in the name of plate-spinning optimization.

Over the last few months I’ve spent a *lot* of time:

- writing and re-writing my [CLAUDE.md](https://gist.github.com/dmarticus/a1a37e816b334f05f4dc90e4965a0b3d) rules to hydrate Claude Code with exactly the right context,
- changing my editor and my Raycast snippets so "send this chunk + spec + failures" is one keystroke,
- structuring projects in ways that are maximally legible to an LLM (Hacker News was not too happy with my [first pass at adding .cursorrules to my main work repo](https://news.ycombinator.com/item?id=43305919)),

and less time doing the traditional "learn new thing from first principles" grind.

2020-me would’ve side-eyed the shit out of this behavior (I read a book called *Haskell Programming from First Principles* in 2020, ffs). But the annoying truth is that the ROI is stupidly good. Small tweaks in how I feed context into models translate into noticeably more throughput. It’s very ["busting the myths of programmer productivity"-coded](https://www.sei.cmu.edu/library/busting-the-myths-of-programmer-productivity/): tooling and environment beat raw keystrokes. This is just an extreme version of the same idea.

It does mean my "craft" feels different. Less "I write elegant code" and more "I design systems so other things can write pretty good code."

That’s defensible if you frame it as leverage. It’s just weird to wake up and realize your job has quietly shifted from "builder" to "foreman" without anyone explicitly deciding that.

## The Deep Work Tax

The part that actually scares me is what these changes have been doing to my ability to go deep.

Some problems are still very much not "vibe-codeable": bizarre perf issues, gnarly data modeling, pathological failure modes where I really do have to build a mental model and play it forward in my head. Those are the problems that historically made me feel like a real engineer.

I am noticeably slower at them now.

If I treat the LLM as a teammate—ask it questions, use it as a rubber duck, let it sketch branches I then reason about—that helps. I’m still doing the thinking; it’s just assisting. But the second I let it slide into "do the thinking for me," my learning curve flattens. I get answers without much intuition attached.

There’s also the raw attention issue. Dev work has been "spinning plates while someone throws more plates at you" for a while: context switching, Slack, video calls, random interrupts. LLMs quietly make that worse:

- starting a new "little task" is cheap, so it’s trivial to keep stacking plates;
- I can make a marginal amount of progress in shallow mode, so my brain learns it doesn’t need to fully load anything.

When I finally try to go deep, all I seem to have left are short bursts of focus, and it’s been a long time since I’ve consistently been able to enter a real "flow state."

Part of why I’m writing this is just to admit that out loud: my focus is worse, and I don’t like that trend.

## Learning from Karpathy

I listened to the recent [interview between Dwarkesh Patel and Andrej Karpathy](https://www.dwarkesh.com/p/andrej-karpathy) while I was in the middle of all this, and I liked the whole thing, but two parts really lodged in my brain since they felt relevant to this "how do I work with LLMs without lobotomizing myself" sentiment I’ve been feeling.

The first was how he actually *uses* them. In the section where he [talks about how he codes day-to-day](https://www.youtube.com/watch?v=lXUZvyajciY&t=2142s), walking through how he built [Nanochat](https://github.com/karpathy/nanochat), he describes his workflow as almost entirely in-editor tab completion—his "sweet spot" for using LLMs—rather than giant freeform prompts in a chat box. He writes comments and partial code, lets the model fill in the rest, and only occasionally does the big "send this whole thing off for a refactor" move.

The second was how he encourages people to *learn* from Nanochat itself. The repo is framed as an educational, hackable, end-to-end LLM stack. His recommended way to study it (and his other materials) is very deliberate:

- keep the reference repo or notebook on one side of your screen;
- on the other side, keep your own empty project;
- *type everything in yourself* when you’re learning a new concept;
- no copy-paste, ideally no fancy completions, at least for the first pass.

The goal is to build a real mental model instead of outsourcing it to autocomplete. It’s very "understand the thing, don’t just trust the abstraction."

I find that mix really compelling: high-leverage tab completion for production work, almost monastic manual typing for learning. And I keep wondering whether I should push myself in that direction—less "prompt in a side pane," more "use completions as a compressed spec," plus explicit "no LLMs, just type" time when I’m adding new primitives to my brain.

## Dan Abramov and the Anti-Learning Vibe

Contrast that with Dan Abramov, [who recently wrote about feeling pessimistic about educational content](https://bsky.app/profile/danabra.mov/post/3lzewnojls226): there’s this sense that people don’t actually want to *learn* anymore, they want pasteable answers and "LLM will do it" workflows instead.

That hits a little too close.

It’s not that I don’t want to learn—I do—but the system I’ve built around myself makes it extremely easy to default to "Eh, I’ll just prompt it." And in a world where content creators are noticing demand shift away from deep explanations toward "just give me the fix," it’s very easy to let my own habits drift the same way.

Karpathy’s "type it all out" energy feels like a deliberate counter-move to that. A personal protest: yes, I *could* vibe code this, but instead I’m going to sit here and actually understand it, line by line.

I don’t really want to become the person Dan is worried about writing for.

## When the Plates Slow Down

There’s also this amplitude thing: the highs are higher, the lows are lower.

On a good plate-spinning day, I feel unstoppable. I’m:

- shipping easy features end-to-end,
- reviewing design docs,
- giving interview feedback,
- triaging bugs,
- keeping up with team chatter.

The bottleneck becomes "How fast can I read, parse, and respond?" and that’s always been one of my strengths, so it feels fantastic — everything aligns with what I’m good at.

But when anything in that loop slows down unclear spec, weird bug, flaky infra, life stuff—everything suddenly feels heavier. The plate stack is tall, and now I’m noticing how many of them are wobbling.

It stops being "Today was kind of unproductive" and turns into "I failed to keep the system at max output," which is a wild standard to hold myself to, and a fast path to burnout if I let it ossify.

## Where Do I Go from Here?

So what do I actually do with all of this, besides write a neurotic blog post about plate metaphors?

Here’s my current plan; future-me can come back and roast me if I bail on any of it:

1. Treat LLMs like power tools, not autopilot.  
   For routine work—CRUD, migrations, boilerplate tests, glue code—I’m fine going full plate-spinner: let the machines churn as long as tests are green. For hard problems, default to "rubber duck that can autocomplete," not "Boss, do my job."

2. Steal Karpathy’s split-brain approach.  
   During normal dev, lean more into in-editor tab completion and inline comments as the primary interface, instead of bouncing to a giant chat window for everything. During learning time, pick one repo / concept, put it on one side of the screen, and type it all out manually on the other. No copy-paste, minimal autocomplete, maximal attention.

3. Protect deep work like a real deliverable.  
   Carve out a few hours a day where I don’t prompt at all. No "just one quick suggestion," no "let me see what the model thinks." Just me, the code, and my own brain. The goal isn’t purity; it’s to keep my intuition from atrophying.

4. Optimize systems, not days.  
   Try to evaluate weeks and months instead of chasing "max output" every single day. Did I learn anything deep? Did I move important things, or just many things? If a week has some sludgy, low-output days but a big conceptual gain, that should count as a win.

5. Be okay with forgettable work.  
   Not every PR needs to be a personal growth moment. Some code can just… exist. The key is being intentional about which problems I’m using to level up, and which ones I’m fine letting the machines mostly handle (my old coworker Glenn has been [writing about this](https://www.statetransition.co/p/the-rise-of-disposable-software) on his Substack for a while now, ahead of the curve as always).

Beyond these steps, I don’t really have a clean conclusion. I’m very much in the middle of this, same as everyone else.

But I’m increasingly convinced that if my whole career turns into "telling a black box what to do," I’ll burn out—even if the metrics say I’m 3x more productive.

For the hard stuff, I want to keep taking some plates down, sitting with them, and remembering what it feels like to hold one thing still for a while.

[^bignote]: Gergely Orosz writes about this and much more in his July 2025 post, [*Software Engineering with LLMs in 2025*](https://newsletter.pragmaticengineer.com/p/software-engineering-with-llms-in-2025).

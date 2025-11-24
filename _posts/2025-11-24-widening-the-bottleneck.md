---
title: "Racing towards Bethlehem"
layout: post
tags: [ai, reflection, work]
post_summary: "We haven't removed the bottlenecks in software engineering, but LLM-assisted tools are reshaping the work surrounding them. Code review, reading comprehension, and shared understanding still cost what they cost, but the difference is that reaching those bottlenecks is getting faster, the necks themselves are getting wider, and all of that changes how I want to work."
---

After I published [Spinning Plates](/2025/11/07/spinning-plates.html), my old coworker [Daniel](https://danielbachhuber.com/) left [a comment](https://www.linkedin.com/feed/update/urn:li:activity:7393663853852557312?commentUrn=urn%3Ali%3Acomment%3A%28activity%3A7393663853852557312%2C7393672175381045248%29&dashCommentUrn=urn%3Ali%3Afsd_comment%3A%287393672175381045248%2Curn%3Ali%3Aactivity%3A7393663853852557312%29) I couldn’t stop thinking about:

> "If your individual velocity has increased, how are you handling the other bottlenecks in the system — code review being an obvious one?"

Around the same time, I’d been revisiting Ordep's [Writing Code was Never the Bottleneck](https://ordep.dev/posts/writing-code-was-never-the-bottleneck) essay, which opens with a line that feels like a koan:

> "Writing lines of code was never the bottleneck in software engineering.  
> The actual bottlenecks were, and still are, code reviews, knowledge transfer, testing, debugging, and the human overhead of coordination."

Right. Exactly. That’s been the shape of the job for decades. When writing becomes nearly free, all the work you can’t automate steps out of the shadows.

And yet something *has* shifted for me. Not the bottlenecks themselves, but the work wrapped around them. That’s what this post is trying to unpack.

## The bottlenecks are still the bottlenecks

Ordep’s core point is, in my experience, correct: reviewing is hard, debugging is hard, understanding intent is hard, maintaining shared mental models is hard, and making judgment calls is hard. His second point lands even harder:

> "The marginal cost of adding new software is approaching zero.  
> But the price of understanding, testing, and trusting that code? Higher than ever."

I feel this. I can ship more working code in an afternoon than I used to ship in a week, but verifying it, reasoning about its behavior, and protecting the shape of the system hasn’t gotten cheaper. If anything, it has expanded the amount of code I’m implicitly responsible for.

## LLMs as connective tissue, not output machines

That said, the work around these bottlenecks has changed. The tools are not solving the hard parts, but they make it easier to reach them. Over the last six months, I have been surprised by how helpful LLM-based tools are as navigational aids rather than generators. They each fill a different gap. [Greptile](https://www.greptile.com/) gives me a second look at my own PRs and catches high-level issues that are easy to miss once you have been staring at a diff for too long. [0github](https://0github.com/) is now my starting point when I review someone else’s changes; its heat-map diff and “risk” slider point me to the sections that deserve real attention. And I have been leveraging Claude Code as a way to understand new parts of the codebase. When I explore a new subsystem, I will ask it to outline the key files and invariants so I can go straight to the important pieces instead of wandering through the directory tree.

The common thread in all of these tools is simple: they cut down the time it takes to gather context. I spend less energy on the overhead and more on the actual reasoning. They do not replace the difficult parts, but they make it easier to get to them. That was the part I did not expect — the bottlenecks stayed where they were, but the road leading to them became much smoother.

## Naming the tension

The smoother road comes with its own tradeoffs, though. After I posted last time, my dad wrote me a long note that helped me put words to the thing I had been circling. He is a [professor of evolutionary biology](https://www.colorado.edu/ebio/andrew-martin), and his message was very him: part philosophy, part evolutionary metaphor. He sent a series of questions and observations:

> "Where is the balance?  
> Is there a shifting baseline?  
> Drift is easy; drift erodes capacity.  
> You’re describing a moving human–machine interface.  
> Being intentional about what you want to learn is a daily practice.  
> This is an adaptationist mindset."

That last line made the whole thing click. If the environment is shifting under my feet, then my habits have to adapt with it. The tools make it easier to reach the real work, but they also make it easier to skip the parts that build intuition. The moment I let them shortcut the reasoning, the learning curve flattens. Drift is quiet at first, then it accelerates, and once it starts, it is hard to undo.

## What responsible use looks like for me

All of this raised a practical question for me: if the road to the bottlenecks is smoother, how do I make sure I am still doing the part of the work that actually builds skill? That is where I started drawing a line for myself. I use LLMs to accelerate navigation, mapping, summarization, risk-surfacing, tracing, onboarding, interpreting test failures, and spotting suspicious patterns. In other words, anything that helps me figure out where to look and what deserves attention. I avoid using them to speed up correctness, design, invariants, architecture, root-cause debugging, or tradeoff decisions. Those parts only improve through repetition and deliberate attention. I am not chasing purity here; I just do not want to weaken the muscles that matter. If a tool helps shrink the search space, I am happy to use it. If it tempts me to ignore the search space entirely, that is where I step back.

## The way has never felt faster

I agree with Ordep: writing code was never the bottleneck, and it still isn’t. Understanding, reviewing, coordinating, and verifying remain the real constraints, and they still require a human brain fully switched on. What feels new is that LLMs finally help with the work around those constraints, the parsing and mapping and sense-making that used to take most of my energy. They make the bottleneck easier to see and easier to reach, even though they don’t change what happens once I’m there. They don’t lower the cost of judgment, but they lower the cost of arriving at the moment where judgment is required. If I can keep adaptation ahead of drift, it improves more than my output; it improves the way I approach problems. The constraints have not moved, but I get to them sooner and with less wandering. The pace has changed. We are not slouching toward the next bottleneck; we are moving straight into it, and I have to decide whether I am meeting that speed on purpose or just being carried along.

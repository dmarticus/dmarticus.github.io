---
title: "Agentic Failure Modes"
layout: post
tags: [ai, work, software engineering]
post_summary: "LLM-assisted work fails in two distinct ways — at the last mile and at the foundation — and they need opposite responses."
---

After hundreds of agent-assisted sessions, two failure modes keep showing up. They look different, feel different, and need different responses.

## Failure mode 1: the last-mile problem

Anyone who's worked with coding agents knows this one — the agent gets me 90% of the way there, especially for UI work and well-specified features. The output compiles, the tests pass, the shape is right. But something's off — a button three pixels too close to the edge, a sluggish loading state, an error message that reads like it was written by a robot (because it was).

The problem is that fit and finish is emergent. Once I see it, it's obvious what to tweak. But I couldn't have written that into the prompt ahead of time, because I didn't know what "wrong" looked like until I was staring at it.

I used to try to capture everything in the initial prompt. Diminishing returns kicked in fast — the prompt got longer, the agent got more confused, and I spent more time specifying the work than it would have taken to just do the finishing touches myself.

The better approach: treat the agent's output as rough framing. Get it directionally correct and plan to finish by hand. The framing doesn't need to be beautiful; it needs to be square. You sand later.

So: let the agent run, accept the 90%, and budget time for human finishing. Don't over-specify. Don't try to prompt your way to perfection.

## Failure mode 2: the convincing-but-wrong plan

This one is scarier because it doesn't feel like a failure until much later.

It happens when I'm not deeply familiar with a domain, or when the relevant context is hard to capture in a prompt. The agent produces something that looks right — coherent design, clean code, passing tests. A reasonable reviewer would approve it.

But the whole direction is wrong.

I ran into this recently. I was building a new form of feature flag targeting for PostHog — one that could target both user and group properties in the same flag. That meant creating a relationship that combined two distinct entities, persons and groups, so we could process properties from both sides when evaluating a flag. The agent helped me design the schema, build the queries, write the tests. Everything worked. The PR looked solid.

The problem: the agent's design added new fields directly to the persons table, which would have increased load on ingestion in a way that wasn't tenable. The correct approach was a join table. You couldn't see that from the code or the tests. You needed to understand the ingestion pipeline's load profile, and I didn't know it well enough to flag the issue before we'd already built the thing.

That's the pattern: the agent didn't get me 90% of the way there. It got me 100% of the way to the wrong destination.

So: slow down *before* you start. Identify the assumptions that would be catastrophic if wrong. Check those assumptions against someone (or something) that knows the domain. The cost of starting in the wrong direction dwarfs the cost of an extra hour on design.

## What's working for me

Before I spin up an agent, I ask myself: is this a "directional and finish" job, or a "deep-domain correctness" job? The answer changes everything about how I spend my time.

For directional work, I sort tasks into a batch, kick off agents in parallel, and then — this is the part I had to learn the hard way — I finish them one at a time. Parallelism works for *starting*, not for *finishing*. A [recent HBR study](https://hbr.org/2026/03/when-using-ai-leads-to-brain-fry) calls the alternative "brain fry" — juggling too many agent threads drives cognitive fatigue rather than reducing it. So I've turned off notifications from my LLM tools. Kick something off, come back when I'm ready. While an agent runs, I write down the follow-up questions I'll need when it's done. By the time it finishes, I've already thought through the next steps.

For deep-domain work, I front-load the thinking. I'm not prompting yet; I'm designing. I use [Steelman](https://steelman.dylanamartin.com/), a tool I built for exactly this, to pressure-test my assumptions before I write a line of code. What are the load-bearing assumptions? What would make this approach catastrophically wrong? Where does my understanding have gaps? Only after that work do I involve the agent, and I watch it more carefully.

Either way, I accept that I won't one-shot the result. I reserve undivided attention for the last 10% of each task. Coming back to something almost-done with fresh eyes is real momentum — easier to push over the finish line than to start from zero, and the fresh perspective catches things I'd have missed after hours of staring.

Not all LLM-assisted work fails the same way. Some fails at the edges and needs human polish. Some fails at the foundation and needs human judgment before it starts. Know which one you're in, and plan accordingly.

*This is the latest in an unplanned series about AI-assisted development. Previously: [Spinning Plates](/2025/11/07/spinning-plates.html), [Racing towards Bethlehem](/2025/11/24/racing-towards-bethlehem.html), [Spinning the Wheel](/2026/02/02/spinning-the-wheel.html), [Contra Yang, et al](/2026/02/21/contra-yang-et-al.html), [Announcing Steelman](/2026/03/11/announcing-steelman.html). Justin Duke's [LLM as advance team](https://www.jmduke.com/posts/llm-advance-team.html) resonated deeply with me re: parallelism and got me thinking about this post in the first place.*

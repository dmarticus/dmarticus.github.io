---
title: "Moving into AI Product Engineering"
layout: post
tags: [ai, career, software engineering, posthog]
post_summary: "I recently moved from \"product engineering\" to \"AI product engineering\" and found that there isn't much of a difference when it comes to the fundamental engineering skills. The new challenges are coming up with systems for validating how (and how well) the model did its job, and designing interfaces that both people and agents can use."
---

A fellow Whitman alum recently sent me a message asking about my move from leading the feature flags team ("traditional" product engineering) into doing [AI product engineering](https://posthog.com/docs/ai-engineering) at PostHog. He, like me, had begun his career primarily doing backend engineering, but he was studying AI and considering a similar transition into applied AI work. He wanted to know how I'd found the shift.[^writing-it-down]

[^writing-it-down]: My family, friends, and a few people at a [recent conference](https://biossphere.dev/) have asked me about the change, too, and it felt like as good a time as any to write down my answer.

The transition hasn't felt as big as the job descriptions might suggest.[^making-the-move] Software engineering itself is changing dramatically (citation not needed). While working on an AI product means spending more of my time in less well-defined waters around these changes, staying in systems engineering (i.e. working on the feature flags product & platform) wouldn't have insulated me from them. To be successful in any engineering role, you still need to understand systems, failure modes, and how to prove correctness.

So that's what this post is about – why I did it, what I've learned so far, and what I'd advise other folks who are considering it.

[^making-the-move]: Okay, so I was actually pretty terrified to make the move. I wasn't apprehensive about the new work; I'd been doing great work on the flags team and was anxious to bring it up with my boss at the time. Turns out he was awesome about it. Thanks, [Ben](https://posthog.com/community/profiles/30205).

## Using (and critiquing) AI tools was already part of my work

On the flags team, [agents had become part of my day-to-day development work](/2025/11/07/spinning-plates.html). I'd learned [how to be productive with them](/2026/10/13/optimizing-for-human-wisdom.html), but I also knew the various ways they could fail and the importance of figuring out systems for validating agentic work.

I've [written about some of those failure modes](/2026/03/24/agentic-failure-modes.html) before, and as a user, I'd learned to mitigate most of them. But as a product engineer, I started thinking about how to build products that could help users get the same productivity gains I'd experienced without falling into some of the traps I'd had to dig out of.

In short: I'd used agents enough to have opinions about where they helped vs where they got in the way, and I wanted to work on smoothing over those rough patches.

## Frontier-shaped problems

I'd already changed up the type of work I'd been doing at PostHog once before. [I wrote earlier this year](/2026/01/28/what-I-talk-about-when-I-talk-about-posthog.html) about wanting to get closer to users after spending much of my time on backend infrastructure and how I had moved to working more on the feature flags product (UI + SDKs).

It was a welcome change at first. I rebuilt the feature flags UI, which was fun – a good feature flag UI needs to make it easy to see what a flag is doing and help someone make changes without surprises.[^progressive-disclosure] The work sharpened my product instincts, but for the most part I was getting better at applying patterns we (as an industry) already understood.

After a few months of that work, I wanted to spend more time on interfaces where we hadn't figured out what "good" looks like yet. That's what drew me to AI product engineering (and what I mean by "frontier-shaped"). I still wanted to be close to users, and I was curious about how building software on top of models could change their current workflows.

[^progressive-disclosure]: I learned (and then abused) the phrase "progressive disclosure" when it came to gradually revealing information on a page.

## I had to learn how to write evals

That said, there are some less obviously applicable skills that are required in AI product engineering that don't really come up much in traditional product engineering, and one big one is writing evals. The concept is similar to how we think (thought?) about testing for typical software products, but modeled around the nondeterministic behavior of LLMs. As with software testing, I had to turn "what does correct look like?" into something I could test, but evals need to be more flexible than traditional tests. The same request can have several good answers, and sometimes the best response is to ask the user a question.

Say I'm testing a new query tool for an analytics agent and ask it, "How many users signed up yesterday?" It'll give me an answer, but an _eval_ could show that this tool now counts **signup events** instead of **unique users** when I ask for the same number by country. That's the kind of regression I want to catch before shipping, and that's the kind of thing an eval helps with.

If you're considering AI product engineering, I'd learn to write evals alongside building the product. My teammate's post on [how to benchmark AI agents](https://posthog.com/blog/how-to-benchmark-ai-agents) is a good place to start.

## The interface is the hardest part for me

The trickiest part for me so far, though, is figuring out the balance between building UI (and thinking about _human_ UX) and making the same capabilities available through [MCP (Model Context Protocol)](https://modelcontextprotocol.io/docs/getting-started/intro) and skills (which requires thinking about the _agent_ UX, so to speak).

I definitely haven't dialed this yet, but here's what I'm thinking about so far:

For workflows, I think MCP and skills generally beat the shit out of clicking through a UI – if I know what I want done, I'd rather tell an agent and let it handle the steps.[^agent-tool-design]

[^agent-tool-design]: That puts more pressure on the tools: the agent needs to know which one to use, and retrying a call shouldn't make a change twice.

But, if we're at a part of the product where we want a human to decide what sort of workflow the agent should actually do, those tend to be areas where I want a UI. Things like an agent rolling out a feature flag (I'd want to see a blast radius and a graph of the potential image) or asking me to fix an error (I'd love to see a visual of "which users are affected") We can do all that with text (and we probably still _need_ text), but designing intentional visual previews in Agent-human UIs can help hmans spot things quickly that might be missed if they're buried in words.

To that point – I don't have a deep take on this yet, but one thing I still think about a lot when designing UX in the age of agents is how humans learn to make sense of what we can see long before we learn to read, and I want to make sure I'm building systems where agents can do things as effectively as possible while reporting back to humans in the way that is highest fidelity for them.

That's the part of AI UI/UX I'm still working on getting my head around, I think. To what extent should agents _do_? To what extent should humans _see_ and decide? We talk about "human in the loop" all the time, but nobody really knows where the human belongs yet, and I think we're all still figuring it out.[^hiring]

It's pretty fun, though.

[^hiring]: My team at PostHog works on exactly this kind of problem. If that sounds like fun, [we're hiring](https://posthog.com/careers).

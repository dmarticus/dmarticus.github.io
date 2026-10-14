---
title: "Optimizing for Human Wisdom"
layout: post
tags: [engineering, software, ai, systems]
post_summary: "How I'm changing the way I work to build and preserve human wisdom now that agents handle most of the implementation"
---

I've been thinking about [this thread](https://x.com/ArtirKel/status/2082548090880635079) a lot, specifically this bit:

> As far as I can tell the answer is something like LLMs are smart but not wise; they don't induce that many of those "Aha!" moments that seem to be best mined through other means (or often, just doing nothing and pondering stuff on walks)

These days, most of my "coding" work consists of me steering agents, and these agents are generally very good at making progress once I've framed the problem. But (as I've [written about](/2025/11/07/spinning-plates.html) [in the past](/2026/02/02/spinning-the-wheel.html)) delegating the implementation work means I no longer get the automatic, prolonged immersion that used to create opportunities for the kind of *aha* moment described in the thread.

Moments when you realize:

- I've been trying to solve the wrong problem
- our customers don't actually care about this
- we tried something similar a few years ago and never encoded that understanding into the codebase 

In other words, agentic coding isn't especially good at producing these moments, but they're clearly valuable, and it feels really important to identify and hold onto practices that promote wisdom and deep thinking without becoming a [meat proxy](https://simonwillison.net/2026/Aug/3/dont-be-a-meat-proxy/). I wanted to talk about some of those practices I've been adopting.

## Coding as wisdom-building

For most of my career, writing code was also how I built a mental model of the system.

In the process of loading the problem into my head and struggling with it, I would gradually develop intuition about:

- why the system worked
- where it would break
- which abstractions made sense

I don't do this as much any more, and in most cases that leads to improved outcomes for my work – agents are much more tireless than I am at repeatedly retrieving and processing local context. I ship more software and spend less time on drudgery. I am increasingly bound by my ambition and creativity, rather than my ability to produce working software.

But the downside is that implementation work used to produce understanding as a side effect. As I do less implementation work, I've been thinking about how to create opportunities for that same kind of wisdom-building in ways that are less time-intensive and less fragile than coding.[^coding-more]

## Thinking sites

I've noticed my useful thinking now mostly happens in three places:

1. Conversations with other humans. The key here is talking to _people_, not chatbots. Other people bring independent context, remember organizational history that I don't, challenge the assumptions baked into my frame, and connect the problem to experiences I haven't had. As an external processor and Olympian free-associator, I do some of my best thinking when a peer pushes on a half-formed idea.
2. Writing. Prose makes vague intuitions concrete and cooks half-baked ideas. If I can't explain the idea in a document, I probably don't understand it. It's also become my primary form of focused work, i.e. the place where I get closest to the flow state I used to find in coding.
3. Walks (and talks). I frequently talk into [Wispr Flow](https://wisprflow.ai/) while walking (which probably looks like an insane, one-sided phone call), which helps me keep a record of my thought process without polluting it with any sort of AI summarization.[^raw-thoughts]

In light of (1), I've also become much more willing to pull a coworker into an ad hoc jam session when I'm stuck on an idea (sorry in advance to my coworkers). In the past (when coding required keeping systems in our heads), these unplanned conversations were oft-maligned as context-switching nightmares, and had a measurable productivity cost. But now that agents carry more of that context, I've found these conversations are cheaper to say yes to _and_ disproportionately good at producing ideas.[^quick-call]

## But isn't the point of engineering to produce wisdom? What are you even doing?

I'm getting there.

The other thing I was thinking about when writing this blog post was Justin Duke's recent piece on how [engineering produces wisdom](https://www.jmduke.com/posts/engineering-produces-wisdom.html).

His framing, roughly:

- engineering rituals are more than just producing code
- writing, reviewing, and operating code creates judgment
- if we automate the process of producing and operating code, we need another way to produce that judgment
- otherwise, every company using the same models converges on the same capabilities

I buy most of this. Humans can be wiser about a codebase than an LLM. Better yet, humans can transfer that wisdom quickly. I was recently at an offsite in London with my whole team, and my coworker was able to explain our [self-driving](https://posthog.com/self-driving) signal ingestion pipeline more completely in 30 minutes than my agents and I had been able to figure out in like 2 weeks.

## The implementation isn't always the durable advantage

For some companies, sure, the technical system is the advantage.[^technical-moat]

But if every company has access to the same tools (and if we increasingly treat software as [disposable](https://www.statetransition.co/p/the-rise-of-disposable-software)), the implementation becomes a weaker source of durable advantage.

For a lot of product/SaaS companies, I think the advantage is the ability to run this loop well:

1. launch something
2. look at the metrics
3. talk to customers about it
4. repeat

Delegating implementation speeds up launch and iteration, but it doesn't yet include the wisdom makes the full loop work: deciding what to launch, interpreting product signals, determining which feedback matters, and knowing what to preserve or discard. Those decisions still require intentional human steering.

If I'm not writing the code myself, then I still need a process to build that wisdom deliberately. I'm talking about product wisdom (which comes from talking to customers, interrogating metrics, and intentionally reflecting on what happens after we ship) _and_ codebase wisdom (which can come from conversations with domain experts, targeted code reviews, writing and reading system design documents without AI[^no-ai-design], and paying attention when the systems fail).

In my experience, the understanding I'm trying to preserve (the kind that formerly happened more frequently during the code writing process) consists of knowing:

- where the load-bearing constraints are
- which assumptions are expensive to reverse
- when local code context is insufficient and I need to widen the frame
- who holds the missing context

These judgments are still important, maybe more so than ever. The faster implementation gets, the more expensive a bad frame of reference becomes. To me, this is the origin of "slop": agents moving quickly within a frame that nobody involved had enough context or wisdom to challenge.

## My wisdom-preserving loop

Tying this all together, here's what my current workflow looks like, more or less:

- talk to customers
- talk to the coworkers who understand domains better than I do
- write down what I think is true
- identify the assumptions that would be expensive if wrong
- iterate on my writing with coworkers, if necessary
- take walks if I get stuck on an idea
- repeat the above until the direction feels clear
- prompt the agents when ready

And once the direction is good, I want all the leverage I can get! Let the agents explore the repository, propose plans, write the implementation, build tests, and argue with each other. Once I've gotten my arms around an idea, I now have the power to explore it more than ever.

If software is disposable, wisdom can't be. When everyone has access to the same tools, I think the comparative advantage is in how efficiently we accumulate wisdom and how well we preserve it across implementations.

[^coding-more]: Yes, I know I could just write more code by hand, no agents. But the point is to adapt to this new way of working without giving up the wisdom the old one produced—not to preserve manual coding for its own sake.

[^raw-thoughts]: Summarization is useful when the goal is compression (and even then, there's [no such thing as lossless text compression](https://sophiebits.com/2026/06/25/there-are-no-lossless-transformations-of-natural-language-text)). Here the goal is the opposite: to preserve half-formed thoughts and orthogonal connections before a model decides which parts matter.

[^quick-call]: I plan on pointing at this post whenever my coworkers ask why I want them to jump on a quick call. I bet it'll help them, too ;)

[^technical-moat]: I haven't worked at enough companies where the technical system itself is the moat to opine on this thoroughly, although clean-room reimplementations of popular services that once seemed too technical to duplicate have me wondering how durable those moats really are.

[^no-ai-design]: The rationale is that writing these documents by hand _is_ the thinking, and one of the downstream effects of producing a design doc is also producing proof of cogitation. Plus, we want to avoid spamming our coworkers with [slop grenades](https://noslopgrenade.com/).

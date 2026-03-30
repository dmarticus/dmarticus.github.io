---
title: "Steelman: an adversarial reasoning tool for decision-making"
layout: post
tags: [AI, decision-making, reasoning, tools, announcement]
post_summary: "Announcing Steelman, a tool I built to help you stress-test your arguments before anyone else does.  State a position, defend it against escalating AI-generated counterarguments, and walk away with a structured Decision Record.  In a world where the default AI interaction is to validate your thinking, Steelman is designed to challenge it.  Currently in closed beta — sign up if you're interested."
---

I've been thinking a lot about how I make decisions; especially the hard ones, where I have a strong opinion and I'm not totally sure if it's right.  The kind where you walk into a meeting, lay out your case, and someone asks a question you hadn't considered, and suddenly you're on your back foot, revising your argument in real time.

That experience of having your position challenged well and coming out the other side with something sharper is genuinely valuable.  But it doesn't scale.  You can't always find the right person to push back on your thinking at the right time.  And most of us don't seek out that kind of friction voluntarily.  What we *do* instead, increasingly, is reach for an AI — and the AI mostly tells us we're right.  It validates, polishes, and helps us build on assumptions we never examined.  We walk away feeling sharper when really we just feel more comfortable.  I wanted something that would make me *less* comfortable with my position before I committed to it.

So I built [Steelman](https://steelman.cloud/).

## What it does

Steelman is an adversarial reasoning tool.  You state a position — "we should rewrite this service in Rust," "single-payer healthcare is the only workable option," "this essay's thesis is airtight,"[^1] whatever — and it puts your argument through a structured gauntlet.

Here's how it works:

1. **Claim decomposition.**  You write your position, and the AI breaks it down into empirical claims (things that are verifiably true or false) and value judgments (trade-offs and priorities).  This is my favorite part tbh; seeing your argument decomposed into its load-bearing components is clarifying in a way that's hard to describe until you've experienced it.

2. **Three rounds of adversarial challenge.**  Three escalating personas target the weakest parts of your argument. Each round, you defend your position. The AI assesses whether your responses actually address the challenges and updates the status of each claim accordingly.

3. **A Decision Record.**  At the end, you get a structured document: your refined position, the challenges you faced, which claims survived and which didn't, and (crucially) falsification criteria.  Conditions under which you'd change your mind.

The important design constraint: the AI never writes *for* you.  It decomposes, mirrors, challenges, and structures, but every word in the final Decision Record is yours.  I didn't want a tool that generates opinions.  I wanted one that pressure-tests them.

## Why I built it

Honestly, I'm worried about what's happened to decision-making in the age of AI. I'm [as guilty of this as anyone](/2026/02/02/spinning-the-wheel.html) — we're all going full-bore into using these thinking machines, and mostly that's great.  But the default mode of every major AI chat app is sycophancy: you state a position, and the model validates it, maybe adds some caveats for plausibility, and helps you build on a premise it never questioned.  It's not that AI *can't* help with decisions — it's that the way we're using it trains us to outsource the thinking rather than sharpen it.  Vaughn Tan has a [great piece on this](https://vaughntan.org/aiux) — he argues that mainstream AI interfaces create a "seductive mirage" of talking to a meaningmaking entity, when really they're just tools, and that we need to design AI experiences that clearly separate the subjective judgment work only humans can do from the non-meaningmaking work that machines are good at.  That framing resonated with me.  The right role for AI in decisions isn't to *make* them for you — it's to force you to make them better yourself.  Steelman is my attempt at that: an AI tool that stays on its side of the line, structuring and challenging your reasoning while every decision about what matters and what to believe remains yours.  The default mode shouldn't be "yes, and."  It should be "okay, but have you considered."

## The stack

For the folks who care about this kind of thing: it's a Next.js app using Claude (via the Vercel AI SDK) for the structured generation, Supabase for persistence, and Tailwind for the UI.  I used Zod schemas to constrain the AI outputs into predictable structures — claim objects, challenge objects, assessment objects — which was essential for making the multi-round flow feel deterministic rather than vibes-based.

## Try it out

Steelman is currently in closed beta.  If you're interested, you can [sign up for the waitlist](https://steelman.cloud/).

I'm especially curious to hear from people who make a lot of high-stakes decisions — engineering managers, staff+ engineers, architects, but also founders, policy folks, anyone who writes arguments for a living — about whether this maps to how they actually think through problems.  The adversarial personas currently skew toward infrastructure and systems decisions, but Steelman works on any kind of argument, and I'd like to expand the persona set to cover more domains.

If you try it out and have thoughts, feel free to reach out to me via [email](mailto:me@dylanamartin.com).  I'm iterating on this actively and feedback from real users is worth more than any amount of me arguing with myself about what to build next (though Steelman is useful for that too).

We're all going to keep using AI to help us think.  The question is whether it makes our thinking better or just makes us more confident.  Steelman is a bet that the right AI tool for decisions is one that challenges you, not one that agrees with you.

[^1]: These are deliberately terse examples for illustration.  In practice, the more detail you provide up front — context, constraints, prior art, why you believe what you believe — the better the adversarial challenges will be.  Steelman rewards specificity.

---
title: "Craftsmen in the Casino"
layout: post
tags: [ai, reflection, work]
post_summary: "I stopped resisting. The tools got too good. Now I'm fully in, spinning Claude Code sessions like slot machines, and trying to figure out whether what I'm doing still counts as craft."
---

A few months ago I wrote about [spinning plates](/2025/11/07/spinning-plates.html) and [racing toward bottlenecks](/2025/11/24/racing-towards-bethlehem.html). The gist was: LLMs had changed how I work, I was faster but learning less, and I was trying to find a balance between leverage and atrophy.

I'm done trying to find balance. I'm in.

Over the holidays I tinkered with Conductor, switched editors to Zed, refined my Claude Code setup, and kept iterating. The models got better. The tooling caught up. And somewhere in there, I crossed a threshold. Now most of my work happens through agents. I'm living in Claude Code, spinning up sessions, watching them churn, merging the output. The 80/20 flip that [Karpathy described](https://x.com/karpathy/status/2015883857489522876) happened to me too: 80% agent coding, 20% edits and touchups.

It feels incredible. It also feels like gambling.

## The casino

There's a moment after you send a prompt where you're just… waiting. The agent is running. You can see it thinking, reading files, making decisions. And there's this little hit of anticipation: *what's it going to do?* It's the same dopamine loop as pulling a slot machine lever. Low effort, variable reward, endlessly repeatable.

Someone on Hacker News [called it "doom tabbing"](https://news.ycombinator.com/item?id=42784594): the AI is already running, the bar to seeing what it does next is so low, so you just… watch. One of my coworkers put it differently: it's like gambling. Pull the lever, spin the wheel, see what happens. The reward gets front-loaded; the difficult part gets pushed further out.

Ryan Broderick, writing in Garbage Day, went even darker. He called generative AI [an "edging machine"](TODO: link to Garbage Day post if public): it charges you for the thrill of feeling like you're building something while caring more about the monetizable loop of engagement than the finished product. I don't cosign his full doom take, but the framing stuck with me. There *is* something seductive about the loop. It simulates progress. It feels like making.

And then there's what Karpathy calls "comprehension debt." Someone [asked him](https://x.com/jeremytwei/status/1883271959850811620) whether he accumulates it—whether the code in his codebase becomes less and less understood over time because the AI one-shotted it and he just moved on. His response: "Love the word 'comprehension debt,' haven't encountered it so far, it's very accurate. It's so very tempting to just move on when the LLM one-shotted something that seems to work ok."

That's the tax. The casino is fun. The casino is fast. But the casino doesn't care whether you understand what you built.

## The fun

Here's the thing though: work has never felt this fun.

I've always believed that energy management matters more than time management. If the work drains you, it doesn't matter how many hours you have. And these tools have changed the energy equation. The drudgery is gone. The copying and pasting of compiler warnings, the boilerplate, the fill-in-the-blanks tedium—I just don't do that anymore. What's left is the creative part: deciding what to build, figuring out the shape of the solution, reviewing whether the output is good.

Karpathy noticed the same thing: "I didn't anticipate that with agents programming feels *more* fun because a lot of the fill in the blanks drudgery is removed and what remains is the creative part."

I also feel less stuck. When I hit a wall, I don't have to grind through it alone. I can throw the problem at Claude, watch it try things, learn from what it attempts. There's almost always a way to make some positive progress. That changes the emotional texture of the day. Less frustration, more momentum.

And the tenacity thing is real. Watching an agent relentlessly work at something—never tired, never demoralized, just trying approach after approach—is genuinely inspiring. I've seen Claude struggle with a problem for thirty minutes and then crack it. That stamina was always a bottleneck for me. Now it's not.

## What I'm doing about it

I don't have a clean answer to the "is this cheating?" question. But I have a working theory about how to stay a craftsman in the casino.

The shift I've made is this: I spend more time defining success criteria and less time doing the mechanical work of achieving them. Karpathy's framing helped here. "Don't tell it what to do, give it success criteria and watch it go." The leverage comes from being declarative instead of imperative.

For frontend work, this means developing strong taste. Can I look at the output and *feel* whether it's right? Does the UI make sense? Are the interactions smooth? The eval is mostly aesthetic judgment, and I'm the one who has to have it.

For backend work, it means building robust test harnesses. Thoughtful edge case analysis. Golden frameworks that I trust, against which I can batter the output. If the tests pass and the invariants hold, the code is probably fine. The work shifts from *writing* the code to *specifying* what correct code looks like.

TODO: maybe add a concrete example of a "golden framework" or test harness you've built recently?

My days have started to split into two modes. There's contemplative time: defining goals, thinking through edge cases, building the reward function. That part is slow and focused. Then there's execution time: spinning up agents, running them in parallel, triaging output. That part is fast and frenetic—caffeine-fueled, multi-stream, casino-mode.

The contemplative work is what makes the casino work productive instead of just fun. Without it, I'm just pulling levers and hoping.

## The question I can't answer

Derek Thompson wrote a piece called "[The Monks in the Casino](https://www.theatlantic.com/ideas/archive/2025/11/monks-casino-young-men/680841/)" about young men who've become risk-averse in the social sphere and risk-chasing in the financial one. They retreat from human friction into dopamine loops: porn, gambling, speculation. The casino gives them variable rewards without requiring vulnerability.

The parallel isn't exact—I'm not retreating from people; I work on a team, I travel for meetups, I care about the product. But the *process* of my work has become casino-shaped. Low friction to start a new attempt. Variable reward on each spin. A seductive loop that keeps me engaged without guaranteeing I understand what I'm building.

The question I keep asking myself: is this still craft?

Craft implies understanding. It implies that the maker could explain every decision, could reproduce the work, could teach someone else how to do it. When I ship something Claude mostly wrote, can I say that? Sometimes yes. Sometimes I'm not sure.

Maybe the answer is that craft is evolving. Maybe the new craft is knowing what to ask for, knowing how to evaluate the output, knowing when to trust and when to dig in. Maybe the skill moves from execution to judgment.

Or maybe I'm rationalizing. Maybe I'm slowly ceding something important—the deep understanding that makes an engineer actually good—in exchange for speed and fun.

I don't know yet. I'm in the casino. The games are good. I'm trying to keep my eyes open.

---

*This is the third post in an unplanned series about AI-assisted development. Previously: [Spinning Plates](/2025/11/07/spinning-plates.html), [Racing Towards Bethlehem](/2025/11/24/racing-towards-bethlehem.html).*

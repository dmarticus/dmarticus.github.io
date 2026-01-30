---
title: "Spinning the Wheel"
layout: post
tags: [ai, reflection, work]
post_summary: "I stopped resisting. The tools got too good. Now I'm fully in, spinning Claude Code sessions like slot machines, and trying to figure out whether what I'm doing still counts as craft."
---

A few months ago I wrote about [spinning plates](/2025/11/07/spinning-plates.html) and [racing toward bottlenecks](/2025/11/24/racing-towards-bethlehem.html). The gist was: LLMs had changed how I work, I was faster but learning less, and I was trying to find a balance between leverage and atrophy.

I've stopped trying to find balance. I'm all in.

Over the holidays I tinkered with [Conductor](https://www.conductor.build/), switched editors to [Zed](https://zed.dev/), refined my [Claude Code setup](https://github.com/dmarticus/dotfiles/tree/main/ai), and kept iterating. The models got better. The tooling caught up. And somewhere in there, I crossed a threshold. Now most of my work happens through agents. I'm living in Claude Code, spinning up sessions, watching them churn, merging the output. The 80/20 flip that Karpathy described happened to me too: 80% agent coding, 20% edits and touchups.[^karpathy]

It feels incredible. It feels like cheating. It feels like gambling.

## The casino

There's a moment after you send a prompt where you're just… waiting. The agent is running. You can see it thinking, reading files, making decisions. And there's this little hit of anticipation: *what's it going to do?* It's the same dopamine loop as pulling a slot machine lever. Low effort, variable reward, endlessly repeatable.

Someone on Hacker News called it "doom tabbing": the AI is already running, the bar to seeing what it does next is so low, so you just… watch.[^doomtab] One of my coworkers put it differently: it's like gambling. Pull the lever, spin the wheel, see what happens. The reward gets front-loaded; the difficult part—understanding what you built, debugging it six months later—gets pushed further out in time.

Ryan Broderick went even darker, calling generative AI an "edging machine": it charges you for the thrill of feeling like you're building something while caring more about the monetizable loop of engagement than the finished product.[^garbageday] I don't cosign his full doom take, but the framing stuck with me. There *is* something seductive about the loop. It simulates progress. It feels like making.

And then there's "comprehension debt" – the tendency for the code in your codebase to become less and less understood over time because the AI one-shotted it and you just moved on.[^comprehension] It's so tempting to just accept something that seems to work. That's the tax. The casino is fun. The casino is fast. But the casino doesn't care whether you understand what you built.

## The fun

But boy, work has never felt this fun.

I've always believed that energy management matters more than time management. If the work drains you, it doesn't matter how many hours you have. And these tools have changed the energy equation. The drudgery is gone. The copying and pasting of compiler warnings, the boilerplate, the fill-in-the-blanks tedium – I just don't do that anymore. What's left is the creative part: deciding what to build, figuring out the shape of the solution, reviewing whether the output is good.

Karpathy, my coworkers, basically every engineer I've talked to who uses these tools – they've all noticed the same thing: programming feels *more* fun now because the fill-in-the-blanks drudgery is removed and what remains is the creative part.

I also feel less stuck. When I hit a wall, I don't have to grind through it alone. I can throw the problem at Claude, watch it try things, learn from what it attempts. There's almost always a way to make some positive progress. That changes the emotional texture of the day. Less frustration, more momentum.

And the tenacity thing is real. Watching an agent relentlessly work at something—never tired, never demoralized, just trying approach after approach—is genuinely inspiring. I've seen Claude struggle with a problem for thirty minutes and then crack it. That stamina was always a bottleneck for me. Now it's not.

## What I'm doing about it

I don't have a clean answer to the "is this cheating?" question. But I have a working theory about how to stay a craftsman in the casino.

The shift I've made is this: I spend more time defining success criteria and less time doing the mechanical work of achieving them. Karpathy's framing helped here. "Don't tell it what to do, give it success criteria and watch it go." The leverage comes from being declarative instead of imperative.

For frontend work, this means developing strong taste. Can I look at the output and *feel* whether it's right? Does the UI make sense? Are the interactions smooth? I've been spending more time on what Jim Nielsen calls "sanding the UI" – the patient, iterative work of smoothing rough edges until something feels right.[^sanding] The agent can generate a component, but I'm the one who has to sand it.

For backend work, it means building robust test harnesses. Types that encode invariants. Property-based testing has been great for this – instead of writing specific test cases, I describe properties the code should always satisfy, and the framework generates hundreds of edge cases to throw at it. If the tests pass and the invariants hold, the code is probably fine. The work shifts from *writing* the code to *specifying* what correct code looks like. I build the acceptance criteria first—the tests, the types, the "what does correct look like?"—and only then let the agent loose against it.

The other thing I've noticed: domain expertise matters more, not less. The better I understand the problem space, the earlier I can catch the agent going down a wrong path. When I'm working in code I know well, I can interrupt a bad approach in the first few seconds. When I'm in unfamiliar territory, I might not realize something's off until it's been spinning for ten minutes. The models still make mistakes – subtle conceptual errors that a hasty junior dev might make, wrong assumptions they run with instead of checking.[^karpathy-mistakes] You have to watch them like a hawk. It ends up looking like pattern-matching on failure modes before they compound.

My days have started to split into two modes. There's contemplative time: defining goals, thinking through edge cases, building the reward function. That part is slow and focused. Then there's execution time: spinning up agents, running them in parallel, triaging output. That part is fast and frenetic – caffeine-fueled, multi-stream, casino-mode.

The contemplative work is what makes the casino work productive instead of just fun. Without it, I'm just pulling levers and hoping.

## The question I can't answer

Derek Thompson wrote a piece called "The Monks in the Casino" about young men who've retreated from social risk into dopamine loops: gambling, speculation, variable rewards without vulnerability.[^thompson] The casino reshapes what feels normal. What starts as entertainment becomes the default texture of experience.

I keep thinking about how that logic spreads. Engineering used to feel like one of the more contemplative corners of work – long stretches of focused thought, deep understanding as the goal. Now the casino has arrived here too. The tools are incredible, and they're also slot machines. The dopamine loop is built into the workflow. And I'm not sure how vigilant I need to be, or whether vigilance is even the right frame.

The question I keep asking myself: is this still craft?

Craft implies understanding. It implies that the maker could explain every decision, could reproduce the work, could teach someone else how to do it. When I ship something Claude mostly wrote, can I say that? Sometimes yes. Sometimes I'm not sure.

There's a comforting story I could tell myself here: that craft is evolving, that the new skill is knowing what to ask for and how to evaluate the output, that judgment is the new execution. Maybe that's true. But I notice how convenient it is. It's exactly the kind of thing you'd say to avoid sitting with the harder question.

What if the answer is actually no? What if I'm slowly trading away the thing that made me good at this—the deep, hard-won understanding—for speed and fun? What if the speed is the bribe that makes the trade feel worth it?

I don't have an answer. I'm in the casino. The games are good. I'm watching myself play, and I'm trying my hardest to pay attention.

---

*This is the third post in an unplanned series about AI-assisted development. Previously: [Spinning Plates](/2025/11/07/spinning-plates.html), [Racing Towards Bethlehem](/2025/11/24/racing-towards-bethlehem.html).*

[^karpathy]: Andrej Karpathy's [thread on AI-assisted coding](https://x.com/karpathy/status/2015883857489522876) (January 2026) captures a lot of what I've been experiencing. The whole thing is worth reading.

[^doomtab]: From a [Hacker News comment](https://news.ycombinator.com/item?id=46784594) that stuck with me: "The end result is very akin to doom scrolling. Doom tabbing?"

[^garbageday]: Ryan Broderick, "[Generative AI is an expensive edging machine](https://www.garbageday.email/p/generative-ai-is-an-expensive-edging-machine)," Garbage Day. His take is darker than mine, but the "edging machine" framing is vivid.

[^comprehension]: Jeremy Wei [coined the term](https://x.com/jeremytwei/status/1883271959850811620) in a reply to Karpathy, who responded: "Love the word 'comprehension debt,' haven't encountered it so far, it's very accurate."

[^sanding]: Jim Nielsen, "[Sanding UI](https://blog.jim-nielsen.com/2024/sanding-ui/)." The metaphor is perfect: you can't sand in one pass, you have to keep coming back with finer grit.

[^karpathy-mistakes]: Karpathy again: "The mistakes have changed a lot – they are not simple syntax errors anymore, they are subtle conceptual errors that a slightly sloppy, hasty junior dev might do. The most common category is that the models make wrong assumptions on your behalf and just run along with them without checking."

[^thompson]: Derek Thompson, "[The Monks in the Casino](https://www.derekthompson.org/p/the-monks-in-the-casino)," November 2025.

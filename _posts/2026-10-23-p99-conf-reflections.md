---
title: "A Few Thoughts on P99 Conf"
layout: post
tags: [engineering, performance, conferences, ai]
post_summary: "Notes on P99 Conf, a conference I liked way more than I expected."
---

I recently spoke at [P99 Conf](https://p99conf.io/) and watched a bunch of the other talks. For me, it was the my favorite conference experience of the year so far, and there few things stood out that I wanted to write down.

## I loved the format

P99 Conf is a fully online (and free!) conference, and because of that, they had some advantages that in-person talks don't have. What I specifically liked was the format of the presentations themselves – the talks were all prerecorded, but the speakers were in the chat while their talks played. This was more engaging than I expected, especially as a presenter. People are also often hesitant to speak up and ask questions (especially if that hasn't been happening a lot during the conference up until that point). In my experience giving talks, the Q&A sessions were often underwhelming, not necessarily because folks didn't have good questions, but the format of the talk didn't really encourage discussion.

Here, someone could ask a question about what I was saying while I was saying it, and I could answer without interrupting the talk. I could follow the conversation, respond to things as they came up, and go deeper where people were interested (the chat platform supported threads, too, which was great UX for going deeper on specific things). All of this combined into what felt like the most engaged audience I'd ever had during one of my talks.

Obviously, it's easier to tune out an online conference, but for people who wanted to engage, this felt like a really good way to do it.

The rest of the logistics worked well, too:

- it was free, and available in US, EU, and APAC-friendly timzones
- talks stuck to the schedule (easy to do when they're pre-recorded), so it felt like everything moved along without any unncessary downtime
- recordings were available quickly, so choosing between competing talks wasn't really a dilemma

Obviousyly, this isn't a full-on replacement to the non-talk-related benefits of attending conferences in person. Every other previous conversation I've had this year has led to proper sit-down conversations with people that I don't think an online conference can really reproduce. But I also watched more P99 talks than I typically manage at an in-person conference, and afterward I could reach out to speakers with a specific question or observation. A surprisingly high proportion of the talks I watched turned into conversations with the people who gave them.

Different kinds of connection, for sure, but I got more out of the conversations I had at P99 than I had initially expected going into it.

## Performance has a lot of layers

I think of myself as an engineer who cares about performant, but my speciality is mostly on application-level performance – e.g. making a web API go fast. Listening to people work on databases, filesystems, storage clients, and OS-level problems was a good reminder of how much more there is. I lost count of the `io_uring` mentions.

Two talks stuck with me: [Amos's on holistic profiling with Stax](https://p99conf.io/session/holistic-profiling-with-stax/) and [Nathan's on searching 100 billion vectors on object storage at turbopuffer](https://p99conf.io/session/searching-100b-vectors-on-object-storage-200ms-p99/). I also liked [Performance Has Layers](https://p99conf.io/session/performance-has-layers/) and [The Fastest Object Storage Client in the World](https://p99conf.io/session/the-fastest-object-storage-client-in-the-world/).

The best ones had a strong narrative or felt like following a proof:

1. here's the problem
2. here's the math for what we're up against
3. here's what we tried
4. here's how the measurements worked out

That made hairy engineering easy to follow. I don't need to know the domain if you can walk me through how you thought about the problem.

I got some good feedback on framing my own talk as an I/O-bound mystery.[^talk-slides] It was also rewarding to have engineers whose work I respect engage with the details.

## Can't have a conference in 2026 without mentioning AI

Despite this being a conference about performance engineering, many talks inevitably discussed AI.

The point that stuck with me the most was Amos's point that a lot of useful AI-built software is internal tools – they were responding to the oft-referenced rhetoric that "if AI is so productive, where's all the new software?" Well, it's out there, we just don't see it. Some of it will probably never be a public product because the economics work better as an internal tool. Why buy SaaS when you can just build it for your specific use case? Why buy software at all?

There were also a lot of talks of the "AI made developoment faster" variety, which is obviously fun to talk about but less interesting overall, and in a lot of cases the speed boost was a function of the model family. But there were some interesting nuggets (to me) that a few references, mostly around which parts of performance engineering do models. The specific anecdote I remember was a model coming back pleased with a roughly 4% improvement when the engineer was looking for 4x. Classic example of the model ostensibly doing good work, but the domain wasn't being appropriately specified.

This connects to [what I've been thinking about lately](/2026/10/13/optimizing-for-human-wisdom.html): agents are very good at making progress once I've framed the problem, but it still feels like framing the right problems is still a domain where humans outperforms the models (for now).

In a lot of these talks around AI-assisted performance engineering, it seem like the eventual solution was a simple idea that took real investigation to find. I would've liked to heard more about how people use AI in *that* process: forming hypotheses, measuring, discarding approaches, and figuring out what can be made simpler. Maybe I need to seek out this type of research more; I'm sure it's out there.

Overall, though I finished up the week excited that there are so many dimensions of performance engineering I haven't worked in yet, and glad I'd gotten to hear from people who have.

Oh, and the swag was awesome.

[^talk-slides]: [Slides from my talk, "From Snakes to Crabs (and what happened after the rewrite!)"](/media/p99-conf-2026.pdf).

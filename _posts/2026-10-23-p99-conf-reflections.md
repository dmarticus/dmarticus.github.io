---
title: "A Few Thoughts on P99 Conf"
layout: post
published: false
tags: [engineering, performance, conferences, ai]
post_summary: "A conference format I really liked, some excellent performance engineering, and a few thoughts on where AI helps."
---

I recently spoke at [P99 Conf](https://p99conf.io/) and watched a bunch of the other talks. For me, it was the best conference experience of the year, and there few things stood out that I wanted to write down (mostly about the format and the kinds of engineering people were doing).

## More conferences should do this format 

The talks were prerecorded, but the speakers were in the chat while their talks played. This was more engaging than I expected, especially as a presenter.

Usually, giving a talk and answering questions are separate activities. You present, people listen, and then there's a time-bound Q&A where someone has to remember the question they had twenty minutes ago. I've generally found these sessions underwhelming.

Here, someone could ask a question about what I was saying *while I was saying it*, and I could answer without interrupting the talk. I could follow the conversation, respond to things as they came up, and go deeper where people were interested. There was also a written record afterward. This felt like the most engaged I'd seen an audience during one of my talks.

Obviously, it's easier to tune out an online conference. Nobody can see you looking at your phone. But for people who wanted to engage, this was a really good way to do it.

The rest of the logistics worked well, too:

- it was free
- the schedule moved along without much awkward downtime
- recordings were available quickly, so choosing between competing talks wasn't much of a dilemma

I did miss the warmth of meeting people in person. At Dev Week, I had proper sit-down conversations with people that I don't think an online conference can really reproduce. But I also watched more P99 talks than I typically manage at an in-person conference, and afterward I could reach out to speakers with a specific question or observation. A surprisingly high proportion of the talks I watched turned into conversations with the people who gave them.

Different kinds of connection, but I got a lot out of both.

## Performance has a lot of layers

I think of myself as a performance engineer, but my talk was on application performance. Listening to people work on databases, filesystems, storage clients, and OS-level problems was a good reminder of how much more there is. I lost count of the `io_uring` mentions.

Two talks stuck with me: [Amos's on holistic profiling with Stax](https://p99conf.io/session/holistic-profiling-with-stax/) and [Nathan's on searching 100 billion vectors on object storage at turbopuffer](https://p99conf.io/session/searching-100b-vectors-on-object-storage-200ms-p99/). I also liked [Performance Has Layers](https://p99conf.io/session/performance-has-layers/) and [The Fastest Object Storage Client in the World](https://p99conf.io/session/the-fastest-object-storage-client-in-the-world/).

The best ones had a strong narrative or felt like following a proof:

1. here's the problem
2. here's the math for what we're up against
3. here's what we tried
4. here's how the measurements worked out

That made hairy engineering easy to follow. I don't need to know the domain if you can walk me through how you thought about the problem.

I got some good feedback on framing my own talk as an I/O-bound mystery. It was also rewarding to have engineers whose work I respect engage with the details.

## And, inevitably, AI

I liked Amos's point that a lot of useful AI-built software is internal tools. It's out there, we just don't see it. Some of it will probably never be a public product because the economics work as an internal tool, not as another SaaS business.

I was less interested in the general "AI made development faster" accounts. Those are useful, but the specifics age fast as the models improve. I'm more curious about which parts of performance engineering make a good or bad fit for these tools.

One anecdote captured it: a model coming back pleased with a roughly 4% improvement when the engineer was looking for 4x. I can imagine having exactly that conversation. The implementation might be getting better, but the approach itself needs questioning.

This connects to [what I've been thinking about lately](/2026/10/13/optimizing-for-human-wisdom.html): agents are very good at making progress once I've framed the problem. Finding a better frame is less automatic.

What stuck with me across the talks was how often the eventual solution was a simple idea that took real investigation to find. Complicated domains, but an explanation you could follow once someone had done the work of understanding them. I'd like to hear more about how people use AI in *that* process: forming hypotheses, measuring, discarding approaches, and figuring out what can be made simpler.

Mostly, I left excited that there are so many dimensions of performance engineering I haven't worked in yet, and glad I'd gotten to hear from people who have.

Oh, and the swag was awesome.

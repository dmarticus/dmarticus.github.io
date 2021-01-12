---
title: "Reflections on my career in 2020"
layout: post
tags: [career, reflection, software engineering]
post_summary: "2020 felt like a particularly long year for a variety of reasons, and one of the reasons it felt long for me was because I changed companies twice after 5 years at Qualtrics!  After starting the year there, I did a stint at 47 Degrees before joining Mercury at the start of December.  Since this was the first time in my career that I'd actually changed companies, I wanted to write down some of my reflections on what I learned (both good and bad) throughout the process."
---

2020 felt like a particularly long year for a variety of reasons.  For me, one of the reasons was because I changed companies twice after 5 years at the same place!  After starting the year at  [Qualtrics](https://www.qualtrics.com/qualtrics-life/why-qualtrics-dylan-martin-software-engineer-seattle-wa/), I did a stint at [47 Degrees](https://www.47deg.com/) before joining [Mercury](https://mercury.com/) at the start of December.  Since this was the first time in my career that I'd changed companies, I wanted to write down some of my reflections on what I learned (both good and bad) throughout the process.  

In my opinion (and the opinion of [others](https://lethain.com/learn-when-you-reflect/)), reflecting is really valuable; while some of the things that I realized this past year aren't necessarily advice for you, I hope that this process of reflection it's an example of how you can reflect on yourself and maybe you'll find some helpful wisdom from my experiences.  Like everything that you read on the internet: your mileage may vary.

### Timeline

I've loosely ordered my reflections chronologically, but I wanted to open with a brief timeline of my year to provide some context around the timing of my career moves.

From January to June, I worked at Qualtrics.  During my time there, I launched a new, more performant backend to [my team's](https://www.qualtrics.com/customer-experience/digital/) analytics pipeline and did a bunch of testing for it (we deployed the new backend into a homemade shadow-test environment, which was a very interesting technical challenge if you'd ever like to ask me about it) to make sure that we were able to increase the performance of the system without regressing the functionality.  I was in the middle of leading the development of a new, cross-team feature for our service when I took the job offer at 47 Degrees.

From June to December, I worked at 47 Degrees.  While there, I worked on some open-source libraries in the [higherkindness ecosystem](https://github.com/higherkindness), wrote [some](https://www.47deg.com/blog/validatedNel-in-the-wild/) [blog posts](https://www.47deg.com/blog/47-days-at-47-degrees/), and did some proprietary consulting work for several west-coast tech companies.  

Finally, in December, I started working at Mercury.  I haven't done much there yet, but I did write and record a song for the [Mercury Christmas Album](https://www.youtube.com/watch?v=gvrv1My-pFY&feature=youtu.be) (my song is at 13:27).

### Reflection #1: I do my best work when using technology that excites me

One of the most resonant things that I've learned about myself this year is that my motivation for doing good, impactful work is directly tied to the type of software engineering that I get to do.  Specifically for me, I do my best work when I get to do strongly-typed (and preferably) functional programming in well-designed languages alongside of a team of people who share that enthusiasm and are eager to both share knowledge and listen (look, I know that previous sentence sounds obnoxious as hell, but this is my blog and these are my reflections, so let me live).

Last year, I first started working in Scala (after doing TypeScript and Go before that), and I was hooked on the elegance and expressiveness of functional programming while maintaining my appreciation for strong, static typing as a way to model domains effectively and reduce bugs. However, the downside to Scala at Qualtrics was that the company didn't specialize or invest much in the language from an organizational level (they had a "each team rolls their own tech stack" policy), and the Scala users at Qualtrics ran the gamut from the occasional functional programming savants to the more common "Scala is a better Java for enterprise" users.  This lack of a unified appreciation for functional programming in Scala at Qualtrics led me to search externally for places that did pure FP with that language, and that's how I stumbled across (and ultimately landed a job at) 47 Degrees.  

Once I joined 47 Degrees, I realized that I loved writing code in a paradigm that I enjoyed -- I was regularly falling into the mythical "flow state" that I'd never experienced prior, and I was generally much more productive when it came to designing and writing software.  After a few weeks doing this, I realized that much of my motivation to work comes from my underlying appreciation for the software that I'm working on.  Functional programming isn't a silver bullet, and work is still work, but I'm much more excited when I wake up if I know I'm going to work on something that is intrinsically interesting to me.

### Reflection #2: I can leave my job without burning bridges

I was nervous to leave Qualtrics.  I was scared of burning bridges, I was scared of being judged negatively by my peers, and I didn't want to hurt the feelings of my coworkers, all of whom I liked.  In hindsight, most of these fears were pretty irrational, and they largely manifested because it was the first time I'd ever considered leaving a company that I'd worked at full-time.  Qualtrics will always be a special place for me -- I owe my career to the chance that they took on me -- but once I'd realized that there were better opportunities to work on functional programming outside of Qualtrics, I couldn't stop thinking about what it would be like to try something different.  Since I was leaving in the middle of a multi-quarter project and as someone who was relatively well-liked on my team, I was worried that folks would begrudge me for leaving, but fortunately, the opposite was true.  My manager wished me the best, my teammates all encouraged me to go, and the CTO even shouted me out on my last day.  

Evidently, this positive memory of departure managed to stick with me, as I ended up leaving 47 Degrees this year as well.  Again, I was nervous to leave, and again, even though I didn't have the same tenure with 47 as I'd had with Qualtrics, folks were incredibly kind to me when I announced my departure.  Everyone from my boss, to the executives, to my direct coworkers, to my clients (!) wished me the best, and I never felt as though there were any hard feelings or broken connections created by my departure.  I wish the circumstances could've allowed me to stay at 47 Degrees longer, but I'm very grateful to my time there and the connections that I made.  And I'm particularly grateful that these connections will persist even though I'm we're no longer coworkers.

This year in particular, many of my peers have expressed similar fears that I had regarding wanting to leave their role, or their company.  While my experience is obviously different than theirs (or yours, dear reader), my experience with departures this year taught me that the likelihood of the negative possibilities of burning bridges is much lower than your mind is likely to assume.  Unless you, y'know, [steal $10 million of gift cards from your former employer](https://www.justice.gov/usao-wdwa/pr/former-microsoft-software-engineer-sentenced-nine-years-prison-stealing-more-10-million).

### Reflection #3: Getting involved in open-source was less frightening and more rewarding than I'd thought

One of the things I was excited about when I took the job at 47 Degrees was that I'd be able to work on open-source software full-time.  I'm a big fan of open-source software; I share [Danny McClanahan's sentiment](https://twitter.com/hipsterelectron) that good open-source helps to "to unlock the shoulders of giants from golden handcuffs", but prior to this year I'd never made any serious contributions to open-source software outside of one-off patches.  I thought open-source was for programmers that were more serious, more talented, more motivated, than someone like me.  

Working on open-source fulltime at 47 helped dispel basically all of these notions, and my biggest takeaway was that contributing to open-source was much less difficult than it appeared from the outside.  Mind, I still think there's still some opacity to the process(so much so that I felt inspired to [write a guide](https://dylanamartin.com/2020/10/15/my-experience-getting-started-in-open-source.html) about how to get involved), but I now feel like can be a much more confident and useful open-source contributor going forward.  

Finally, working on open-source helped me appreciate the things that make good open-source possible are also incredible valuable in any software working context.  I specifically appreciated (1) automated PRs and CI, (2) a focus on asynchronous, distributed work (3) a bias towards good issues descriptions with context and (4) good writing as a force multiplier.  Going forward, I want any project that I work on (open-source or not) to emphasize those four components as essential processes.

### Reflection #4: I'm more motivated at work when my coworkers and I are working on a shared vision

One of the biggest career risks that I took this year was going from product engineering to software consulting.  As I mentioned before, I made the move to 47 Degrees primarily to deepen my expertise in functional programming, but I wasn't sure how I'd feel about consulting.  On one hand, I saw it as an opportunity ot explore a branch of software engineering that I hadn't spent much time doing yet.  On the other hand, because I had no experience in consulting, I had no idea how I'd find it.  In short, I struggled as a consultant, and one of the reasons that I did was because I didn't have the chance work with my coworkers that I valued so much.  

47 Degrees is full of passionate, hard-working engineers who were helpful and communicative, but since we were all spread across various different consulting projects, there wasn't much unity in how we all worked together.  This meant that my rate of absorbing and transfusing knowledge across the company was significant slowed, due to the simple fact that we didn't work together as much.  I didn't think I'd mind this unduly when I first noticed this disconnect at 47 Degrees, but by the time I finished my time there, it was really eating at me.  Perhaps one day, when I'm a more experienced engineer, I think I'll get more out of consulting.  But at this point in my career, I really get a lot out of being part of a unified team that's working on a product, together.  

With Mercury, I'm back at a company where I'm running in the same direction as all my inspiring coworkers, and that helps keep me motivated on days when life is bringing me down.  It's a little too early for my to tell if this unified team has a positive effect on my productivity, but the folks at Mercury have definitely gone out of their way to make me feel at home :)  

### Reflection #5: I need to set long-term goals for myself when joining a new company

My big career regret for this past year was not setting measurable long-term goals when joining 47, since this led to me to not having a sense of completion when I left the company.  When I joined 47 Degrees, I knew what I wanted _from_ the job (open-source work, functional programming tech stack), but I didn't have a very clear idea of what I wanted to do _in_ the job.  

For example, when I was considering leaving 47 Degrees, I talked with a coworker about which criteria she would use to know if it's a good time to leave, and she mentioned that she'd set 3 big goals at 47 Degrees for when she started that included (1) working on 3 different client consulting projects (2) mentoring at least 2 junior engineers, and (3) joining some sort of open-source steering committee for Scala.  

When I heard those answers, I was both impressed with her and dejected: outside of my goals for contributing to open-source and writing more FP Scala, none of the goals that I'd set for 47 Degrees were very measurable or time-bound.  As a result, when I left the company, I couldn't help but feel as though I'd left something on the table, since I'd never clearly set a goal for what I wanted to do while there.  I knew that going into my new role at Mercury, I was going to set at least 3 long-term, big-picture goals for myself so I could better assess the impact of my time at Mercury.  

### Reflection #6: I discovered I like learning things from first principles

My final reflection comes from my last month and a half at Mercury, the vast majority of which I've spent learning Haskell from first principles (via the [appropriately-titled book](https://haskellbook.com/)).  Despite having done plenty of functional programming in Scala over the last year, I'd never written any serious Haskell, and I'm grateful that the folks at Mercury are letting me ramp up by learning the language from scratch before diving into the codebase (Mercury has a backend that's 100% Haskell).  

Learning a new programming language from first principles is something I'd never done before in a previous job, and now that I'm wrapping up the last few chapters of the book and starting in on my first tickets on the Mercury codebase, it's incredible how comfortable I feel diving into the language.  While there will no doubt be some quirks within how our codebase works, I'm optimistic that I'll be able to ramp onto the codebase much more quickly than if I had started without seriously studying Haskell.  I'd recommend that if any software engineer reading this should jump on any opportunity they may have to convince their managers to let them seriously study a new programming language before expecting them to deliver value.  In my brief experience actually touching the Mercury backend, my time invested in learning Haskell is paying off big-time.  

### Final Thoughts

When I was reflecting back on this year, I was a little sad that I felt as though I hadn't accomplished as many involved projects as I likely would have had a stayed on at Qualtrics for the full year.  However, I think that through changing companies and going through the process of:

* assessing and interviewing for external roles,
* setting goals for myself at the beginning of new roles, and
* determining what my values and motivators are

I learned a lot about how I work, what I value at work, and the environmental factors that motivate me.  Going into 2021, I feel more prepared and motivated than ever to make an impact on my work, and to do it in a way that doesn't burn me out.  I'm fired up for the year to come.

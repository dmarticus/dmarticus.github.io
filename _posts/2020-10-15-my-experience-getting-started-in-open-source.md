---
title: "Getting Started in Open-Source"
layout: post
tags: [tips, reflection, work, open-source]
post_summary: "As a software engineer at 47 Degrees, I'm ostensibly a member of the open-source community, since 47 Degrees spends a lot of time and resources on maintaining a few hundred libraries in Scala, Haskell, Kotlin, and Swift.  However, unlike other folks at the company who were involved in open-source before they joined, I was never involved in a significant open-source project before joining."
---

# Getting Started in Open-Source

So Hacktoberfest is happening and many folks are saying how it is [the worst](https://drewdevault.com/2020/10/01/Spamtoberfest.html), and [bad for open-source](https://blog.domenic.me/hacktoberfest/), so I wanted to write something how to get involved in open-source without chasing some stupid t-shirt based on a number of commits. (EDIT: Hacktoberfest realized that no one loved the spam PRs that happened to start the month off, and added [some guardrails](https://hacktoberfest.digitalocean.com/details) to improve the experience.  Good for them).

Furthermore, as a software engineer at 47 Degrees, I'm ostensibly a member of the open-source community, since 47 Degrees spends a lot of time and resources on maintaining a few hundred libraries in Scala, Haskell, Kotlin, and Swift.  However, unlike other folks at the company who were involved in open-source before they joined, I was never involved in a significant open-source project before joining.  I'd used GitHub for my own side projects or as a place to [publicly share my learnings](https://www.swyx.io/learn-in-public/))), but I'd never really gotten involved in a project that involved collaboration outside of myself.   So, when I accepted my offer from 47, one of the first things that I wanted to do was to make my first significant open-source contribution.

## Involvement as a community member

However, one of the key things I wanted to do with respect to my open-source contribution was to do it from the perspective of a non-employee as much as possible to simulate the experience of what approaching a popular open-source project as an outsider might feel like.  I think this is an important perspective to take when thinking about open-source contributions; tons of really good open-source is done by teams that are sponsored by companies (ADD LINKS), and while that's great for the software overall, it can sometimes look like a barrier to contributors because non-employees don't have the same level of access to the library maintainers as internal folks do (they're not on company slack, can't just roll over to their desk, etc).  So, I decided that my first open-source contribution (LINK)  on one of 47Deg's projects would happen before I got hired, as a community member, with access to the same tools and context as any other engineer would have.  

## Using community resources

Fortunately, since open-source is such a community-driven effort, there is a relatively mature ecosystem of tools that help bridge the gap between wannabe contributors and maintainers.  In my opinion, the most important thing you need as a new open-source contributor is a way to communicate with the more knowledgeable folks in the ecosystem in an open way, so that you can get as many helpful eyes on your question as possible.  Emailing the contributor can be a good start, but emails are not transparent, nor are they linkable, and if all collaboration efforts happened over email you'd likely have to repeat yourself much more.  Here's a brief list of the tools I used to facilitate communication between myself and the library maintainers: (ADD LINKS TO BELOW)

* Github -- knowing how to use Github (and, IMO, Gitlab) is an essential part of open-source contributions, since the vast majority of projects are hosted there
* Gitter -- This is a chat service that integrates natively with Github and Gitlab, so it's a good location for discussions about a specific repository or ecosystem.  It's particular popular in the Scala open-source world, but that's also coming from someone who almost exclusively contributes to Scala libraries 
* Slack -- Slack doesn't integrate with Github as neatly as Gitter, but it's a better chat experience and is a useful place to find folks to ask questions.

There are other tools out there, of course, but these were the only ones that I found both (a) essential and (b) transparent.

## Ways to get involved without external direction

That said, despite having _implemented_ my open-source contributions from the perspective of a community member, I still had one big advantage in my experience that differentiated me from many other folks looking to get involved in open-source: direction.  An engineer at 47 Degrees, during a conversation that we had prior to me receiving my offer, mentioned that were several open issues in the project that needed some attention from the community, and even showed me where I could look in the code base to address these issues.  For me, this was a great help in overcoming the barrier to entry for open-source, since before I even touched the codebase I had a concrete task to work on and some idea of how the implementation could be done.  

I recognize that most people won't have this experience of having their first open-source contribution handed to them like mine was, and so before I wrap up this post I want to share a few ideas that I've come across that I think are helpful for folks who seek that initial motivation and direction to get involved in open-source

* In ([The Ultimate Hack for Learning In Public](https://www.swyx.io/learn-in-public-hack/)), the author outlines a "pick up what they put down" approach, where "they" whoever is working on something you find cool, and "what they put down" is a new release, version, or demo of the thing that you find cool.  There's a lot of good content in this post that I'd rather not paraphrase since it's so worth reading, but the bottom line is that a great place to find direction is to emulate the people who look up to.
* In [Getting Involved in Open-Source](https://alexeyzabelin.com/getting-involved-in-open-source/), the author recommends [Your First Pull Request - Showcasing good starter issues](https://yourfirstpr.github.io/), which is a great resource for folks who have the enthusiasm for open-source but aren't sure specifically which project or area to dive into first.  In addition to the tool he recommends, I want to add [GitHub explore](https://github.com/explore) and [CodeTriage](https://codetriage.com/)) as tools that have a proven track record of successfully getting people into the open-source game.

## Conclusion

I had a lot of fun working on my first open-source contributions, and I look forward to maintaining the libraries I've become involved with for hopefully some time.  That said, my last warning I want to give is that in addition to all the other things you need to know to get involved in open-source, the biggest resource you need to be willing to dedicate is _time_.  Open-source isn't something that you can occasionally drop in and out of and expect to feel useful and fulfilled.  But, if you have the time, are willing to put in the effort, and are open to talking to strangers about their work, open-source can be incredibly rewarding.  As with most intimidating tasks, the feeling of achievement afterwards makes any struggle with the initial process worth it. 
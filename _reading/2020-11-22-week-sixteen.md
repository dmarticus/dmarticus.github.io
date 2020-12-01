---
title: "11/16 - 11/22"
layout: post
tags: ["capitalism", "finance", "tiktok", "entrepeneurship", "scala", "haskell", "postgresql", "linux"]
summary: "This week I did a lot more production than consumption; work was pretty hectic and I also wanted to finish part two of my fantasy football data science blog post (here's part one, if you want the full story).  As a result, I've got fewer pieces that I read and thought about this week, and I definitely skewed more towards interesting cultural tidbits than deeply technical pieces.  Enjoy!"
---

This week I did a lot more production than consumption; work was pretty hectic and I also wanted to finish part two of my fantasy football data science blog post (here's part one, if you want the full story).  As a result, I've got fewer pieces that I read and thought about this week, and I definitely skewed more towards interesting cultural tidbits than deeply technical pieces.  Enjoy!

#### Business

* [DoorDash and Societal Arbitrage](https://themargins.substack.com/p/doordash-and-societal-arbitrage).  This is the best thing I read last week.  Absolutely captivating content about (among other things) how well-moneyed startups are weaponizing government programs that were intended to help small businesses.
* [This tweet by patio11 about execution vs innovation](https://twitter.com/patio11/status/1328965644528783362?s=20).  Specifically, I liked the question of "how would we reliably and safely get every American $10 every week?"

#### Culture

* ['It's the screams of the damned!' The eerie AI world of deepfake music](https://www.theguardian.com/music/2020/nov/09/deepfake-pop-music-artificial-intelligence-ai-frank-sinatra).  I think a lot about the effect of ML on music generation and this article does a decent job summarizing the current state of AI music generation.  Worth checking out Google's [Magenta Project](https://magenta.tensorflow.org/), too.

#### Work

* [The Gods on HackerNews](https://www.riknieu.com/the-gods-on-hackernews/) and [Holy heck this is hard](https://www.indiehackers.com/post/holy-heck-this-is-hard-8ebe864174).  Hackernews is mostly a great thing to read if you're interested in cool content but the comment sections can be a a total cesspool and the first link is a tongue-in-cheek commentary on how any time someone does something cool and shares it with Hackernews then there's always a bunch of folks who think it's _super edgy_ to just dunk on it.  And the second link is a reflection on how hard making and scaling a product independently is really difficult.  
* [I sold Baremetrics](https://baremetrics.com/blog/i-sold-baremetrics).  In the same spirit of the previous link, this one is a story of someone who did successfully accomplish the very difficult challenge of building, scaling, and selling his technology business.  
* [Simple Explanations without Sounding Condescending](https://jvns.ca/blog/2020/11/15/simple-explanations-without-sounding-condescending/).  Another excellent read from Julia Evans about how to explain things well.  Some of her techniques include (1) write true explanations (as compared to ELI5-esque ones) (2) only use visuals if the visuals are easy to understand (3) tell a relevant story and (4) have a specific audience (explanations are not one-size fits all).

#### Tech

* [Managing Multiple Java, SBT, and Scala Versions with SDKMAN](https://mungingdata.com/java/sdkman-multiple-versions-java-sbt-scala/).  One of the trickiest challenges of getting started effectively with Scala can be managing the various different dependency versions.  While I prefer [coursier](https://github.com/coursier/coursier) for dependency management myself, many of my coworkers like SDKMAN and this post provides a thorough overview of using it.  
* [Neil Mitchell's Blog (Haskell etc): Turing Incomplete Languages](https://neilmitchell.blogspot.com/2020/11/turing-incomplete-languages.html).  Long and technical read about how some languages ban recursion to ensure programs "terminate". While that's technically true, its usually irrelevant.
* [How to get root on Ubuntu 20.04 by pretending nobody’s /home - GitHub Security Lab](https://securitylab.github.com/research/Ubuntu-gdm3-accountsservice-LPE).  I love reading about exploits and this one was a thorough writeup (complete with a video) and an engaging read.
* [Postgres Observability](https://pgstats.dev/).  PostGRES is probably my favorite open-source technology and it's amazing to see how many good resources there are to learn about it.  This link visualizes every part of the PostGRES stack and explains what it does.

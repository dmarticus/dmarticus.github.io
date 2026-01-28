---
title: "10/26 - 11/01"
layout: post
tags: [career, computer science, culture, scala, excel, entrepeneurship, distributed systems, life, business, consulting]
summary: "This week the theme of my selected readings is about careers: how to succeed in your respective one, how to apply theoretical concepts in CS to a software engineering day job, and how to know when it's time to quit a typical day job.  I also included a few beautiful musings on life and death.  There's also a bunch of other unrelated things that run the gamut from distributed systems, hackathons at scale, and more indictments of Facebook (as per usual) :)  Enjoy!"
---

This week the theme of my selected readings is about careers: how to succeed in your respective one, how to apply theoretical concepts in CS to a software engineering day job, and how to know when it's time to quit a typical day job.  I also included a few beautiful musings on life and death.  There's also a bunch of other unrelated things that run the gamut from distributed systems, hackathons at scale, and more indictments of Facebook (as per usual) :)  Enjoy!

#### Culture

* [Inside Foxconn’s empty buildings, empty factories, and empty promises in Wisconsin](https://www.theverge.com/21507966/foxconn-empty-factories-wisconsin-jobs-loophole-trump).  You should listen to this [Reply All](https://gimletmedia.com/shows/reply-all/wbhjwd) podcast before reading this piece :)
* [Facebook is censoring me](https://themargins.substack.com/p/facebook-is-censoring-me).  Delete your Facebook account.
* [Ghislaine Maxwell deposition redactions: How to crack them](https://slate.com/news-and-politics/2020/10/ghislaine-maxwell-deposition-redactions-epstein-how-to-crack.html).  Fascinating read on how to decode censorship patterns used by the secret service when redacting public information, and then applying those decoding techniques to decode the Ghisliane Maxwell deposition.  
* [Meet the Excel warriors saving the world from spreadsheet disaster](https://www.wired.co.uk/article/spreadsheet-excel-errors).  Just trust me.

#### Life

* [Notes on My Colon Cancer](https://www.charlieharrington.com/colon-cancer).  This piece was a fun read on decidedly not fun topic topic.  I'd never heard of this author before, but his candor in writing about such an intense topic drew me in and makes me want to read more of his writing.  Definitely worth a read if you need a refresher on things to be grateful for.
* [Life & Death](https://www.profgalloway.com/life-death).  Another intense read about intense subject matter, this piece is Scott Galloway at my favorite -- he gets deep to the human element of a reader question and dispenses sage advice on how to deal with the passing of a parent.  Having lost my Grandmother recently and gone through both my own grief and the secondhalf grief of my parents during this time, this piece rang especially true for me.

#### Tech

* [Helios: Hyperscale Indexing for the Cloud & Edge](http://www.vldb.org/pvldb/vol13/p3231-potharaju.pdf).  Deep dive into the details of Helios, a distributed, highly-scalable system used at Microsoft for flexible ingestion, indexing, and aggregation of large streams of real-time data that is designed to plug into relationals engines.  As an ingestion and indexing system, Helios separates ingestion and indexing and introduces a novel bottoms-up index construction algorithm. It exposes tables and secondary indices for use by relational query engines through standard access path selection mechanisms during query optimisation. As a reference blueprint, Helios’ main feature is the ability to move computation to the edge.
* [virtualizing a hackathon at ScalaMatsuri 2020](https://eed3si9n.com/virtualizing-hackathon-at-scalamatsuri2020).  A report of running a virtual hackathon at ScalaMatsuri Day 2 Unconference.
* [Timekeeping in Financial Exchanges](https://lucaspauker.ml/articles/20).  This piece challenges the reader to think about the difficulties of clock synchronization in distributed architectures.  Makes for a great read when coupled with [this podcast from Signals and Threads](https://signalsandthreads.com/clock-synchronization/).

#### Work

* [Advice to my young self: to succeed in your career, forget side projects and focus on your job](https://manuel.darcemont.fr/posts/focus-on-jour-job/).  I really needed to read this post this past week.  I've been spending a ton of time lately working on my side project and I've found myself burning out at both my day job and my side project.  Despite the title of this post: this blog doesn;t encourage readers to quit their side hustles, but simply asks them to consider if the opportunity cost of working on a side project is worth the tradeoff of excelling in their existing day job.  Many of us tend to write off the benefits that come from doing your day job well.  
* [Talking, Typing, Thinking: Software Is Not a Desk Job](https://daniel.fone.net.nz/blog/2020/10/21/talking-typing-thinking-software-is-not-a-desk-job/).  As a software consultant, I don't bill my clients for the time spent thinking in the shower, but this post convinces me that maybe I _should_ ;)
* [Applying Textbook Data Structures for Real Life Wins](https://heap.io/blog/engineering/applying-textbook-data-structures-for-real-life-wins).  I love blog posts like this one that take common industrial software engineering challenges and employ fundamental CS concepts to solve them.
* [When is it time to quit my 9-5?](https://letterstoanewdeveloper.com/2020/10/26/when-is-it-time-to-quit-my-9-5/).  Interesting perpsective on the heuristics and hard metrics used by Pariss Athena (the founder of Black Tech Pipeline (BTP)) to calculate the best time for her to quit her day job and focus on her passion project.

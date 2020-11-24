---
title: "10/19 - 10/25"
layout: post
tags: [history, computer science, machine learning, ocaml, programming languages, operations, scala, nanotechnology, poker, blogging]
summary: "This week I have a mixed bag of pretty dense content, and other than the two podcasts and the first link I mostly skimmed the content, but many of these links are rich resources that you can continue to come back to.  I recommend bookmarking any link you find interesting.  Enjoy!"
---

This week I have a mixed bag of pretty dense content, and other than the two podcasts and the first link I mostly skimmed the content, but many of these links are rich resources that you can continue to come back to.  I recommend bookmarking any link you find interesting.  Enjoy!

#### Culture

* [The Island That Humans Can’t Conquer](https://www.hakaimagazine.com/features/the-island-humans-cant-conquer/).  Humans can only live in a comparatively small range of climates on the planet, and I find it interesting to see how we've pushed those boundaries throughout human history.  If you find that interesting, too, you'll probably like this.
* [Johns Hopkins Poker Course](https://hopkinspokercourse.com/).  I loved this link!  If you've ever wanted to improve your poker playing skills (and, by extension, your betting abilities) through a grounding in first principles, Avi Rubin's course provides a thorough overview of how you can do that (the only thing to really do after, of course, is practice).
* [Why Life Can’t Be Simpler](https://fs.blog/2020/10/why-life-cant-be-simpler/).  The answer, of course, is because the "simplest" things are the things that require the least amount of assumptions, which are some of the hardest things in the world to actually find.  
* [This website is killing the planet](https://visitmy.website/2020/07/13/this-website-is-killing-the-planet/). Just trust me.

#### Tech

* [Orbital Edge Computing: Nanosatellite Constellations as a New Class of Computer System](https://abstract.ece.cmu.edu/pubs/oec-asplos2020.pdf). This paper is a wild ride into the world of true "edge computing" as it outlines some of the interesting approaches used by semi-autonomous micro-satellites that work together to send information to space to earth with limited bandwidth.
* [The Case for a Learned Sorting Algorithm](https://dl.acm.org/doi/10.1145/3318464.3389752).  Sorting is one of _the_ classic problems in computer science and this paper provides some interesting benchmarks for a new type of ML-driven sorting algorithm that significantly outperforms RadixSort on a massive (1 billion item) dataset, and that performance _includes_ time to train the model.  This is a pretty exciting result for anyone interested in sorting data at a large scale.
* [Effect Runtime](https://alexn.org/snippets/2020/10/12/effect-runtime.html) and [Generic IOApp alternative](https://alexn.org/snippets/2020/10/15/generic-ioapp-alternative.html).  Alexandru Nedelcu is an excellent Scala engineer and prolific writer, and these two pieces are great foundations (with plenty of example code) for understanding how to build pure IOApps and effect runtimes using Cats and Cats-Effect.  If you're interested in pure FP for Scala, understanding this is the equivalent to a 101 course, and Alex makes it really easy to grok.  
* [Signals and Threads: Python, OCaml, and Machine Learning](https://signalsandthreads.com/python-ocaml-and-machine-learning/) and [Signals and Threads: Language Design](https://signalsandthreads.com/language-design/).  Signals and Threads is my favorite podcast in tech right now: Ron Minsky is an engaging and enthusiastic host and he has a plethora of incredible engineering talent at Jane Street to pull information from.  This weeks podcasts covered my two areas of programming interest: language design, and machine learning, and I especially enjoyed both of them.

#### Work

* [GitHub - danluu/post-mortems: A collection of postmortems](https://github.com/danluu/post-mortems).  Dan Luu is a great writer and teacher of industrial software engineering and this repo is a cool collection of postmortems published by a variety of different industries.  If you work in operations at all, postmortems are an unfortunate but vital part of the job, and this cache of postmortems makes for great inspiration when it comes to designing and implementing a postmortem process. 
* [SEO mistakes I've made and how I fixed them](https://blog.maximeheckel.com/posts/seo-mistakes-i-have-made-and-how-i-fixed-them).  I'm pretty new to the blogging game but even I recognize the importance that good SEO can have on getting my posts in front of a wider audience.  This article provides a great summary on low-hanging SEO fruit for your blog or website that can be tackled without making any major changes to your content production flow.

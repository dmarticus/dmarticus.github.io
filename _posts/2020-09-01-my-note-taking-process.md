---
title: "My Note-Taking Process"
layout: post
tags: [tips, reflection, work]
---

# My Note-Taking Process

TL;DR: I take rough notes on my approach before coding it, then I take a break when I’m done coding to clear my head and note force myself to write when I’m exhausted. Later (either before bed or earlier in the following day), I use those notes as a way to re-contextualize myself with my solution and flesh them out if I feel inclined to write more about it.
Longer answer: Like you, I’m a software developer and I resonate with the sentiment of feeling too cooked to write anything else after coding for a while. While I occasionally find success in taking notes on what I’m doing as I’m working, I (again, like you) find that it interrupts my flow and it’s only something I do when I’m noodling on a problem, rather than actually working through the implementation.
The most successful approach for me, however, has been to write my ideas down /before/ I start coding them (kinda like a scientific notebook; I’ll write a rough hypothesis of what I’m about to attempt to implement, and then my implementation almost serves as my experiment), and then when I’m done with my implementation, I come back and fill in the details later if I feel like what I just did is worth fleshing out in more detail. These initial ideas are intentionally pretty sparse; they’re more like a memory hook that I can come back to as I’m working through my implementation, but they’re helpful as a guide when re-reading my notes later.
Here’s some notes from my work journal about a task I did yesterday as an example:

```
Okay, it looks like all of this logic is in ParseProto.scala; 
since ParseProto is what inherits the definitions of the 
protobuf descriptors and actually composes 
all of our algebras together.  

The problem is that right now I’m not sure how to 
visualize what a protobuf file representation looks like; 
I think once I can do that I’ll have a better idea 
of where I’m going wrong currently

Hell yeah I cracked it.  The tricky part was having to rely 
on Google’s `file.getTypeName` call to the protobuf descriptor 
but once I figured that out the implementation wasn’t hard
```

Yeah, super rough clay, but the key is that when I read these notes later, it’s much easier to re-contextualize where my head was when I was working through this problem, and so now that I’ve taken a break from coding and don’t feel so exhausted, I’m more inclined to be able to write these ideas into a more detailed explanation of what I just did.
Anyway, sorry for the long response, but I hope it’s helpful! Even if my approach doesn’t work for you, hopefully having more data on the process is generally useful.
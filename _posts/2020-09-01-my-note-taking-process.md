---
title: "My Note-Taking Process"
layout: post
tags: [tips, reflection, work]
---

# My Note-Taking Process

The other day I was asked about writing my approach to packaging up knowledge into a format that's ready to share with others:

> My question to you is at what point do you package up what you have learnt to share with others? I’m a software dev and forming a habit of writing what I have done seems like it might distract me out of flow if i’m to take notes to share later when i’m working, consequently, I think i’m a little exhausted after coding to write something decent. That’s the little quagmire I find myself in at the moment, I wish to share, just don’t have the method. Any tips?[^bignote]

[^bignote]: Link to the original post is [here](https://lobste.rs/s/cpfvxb/what_are_you_doing_this_weekend#c_0dodez)

It was a great question, I figured it deserved an involved response, and when I finished writing my thoughts I'd written almost 500 words.  Since my advice is pretty generic to anyone who does creative work (i.e. slips between flow states throughout the day), I figured it was worth sharing to a broader audience.  Finally, I just want to disclaim that this process I'm about to outline is something that I've iterated towards over the last few years, and while it's been working for me now, it'll likely change as I continue to hone myself and my processes.  

## TL;DR

I take rough notes on my approach before coding it, then I take a break when I’m done coding to clear my head and not force myself to write when I’m exhausted. Later (either before bed or earlier in the following day), I use those notes as a way to re-contextualize myself with my solution and flesh them out if I feel inclined to write more about it.

## Additional Context

Like many of the people who probably read this, I'm a software developer and I resonate with the sentiment of feeling too cooked to write anything else after coding for a while. While I occasionally find success in taking notes on what I’m doing as I’m working, I (again, like you) find that it interrupts my flow and it’s only something I do when I’m noodling on a problem, rather than actually working through the implementation.
The most successful approach for me, however, has been to write my ideas down _before_ I start coding them (kinda like a scientific notebook; I’ll write a rough hypothesis of what I’m about to attempt to implement, and then my implementation almost serves as my experiment), and then when I’m done with my implementation, I come back and fill in the details later if I feel like what I just did is worth fleshing out in more detail. These initial ideas are intentionally pretty sparse; they’re more like a memory hook that I can come back to as I’m working through my implementation, but they’re helpful as a guide when re-reading my notes later.

## Example 
Here’s a raw cut from my work journal about a task I did the other day as an example of how sparse my notes are:

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

As you can see, these notes are super rough clay, but they do the job -- when I read these notes later, it’s much easier to re-contextualize where my head was when I was working through this problem, and so now that I’ve taken a break from coding and don’t feel so exhausted, I’m more inclined to be able to write these ideas into a more detailed explanation of what I just did.
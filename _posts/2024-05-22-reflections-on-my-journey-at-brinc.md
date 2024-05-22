---
title: "Moving On: Reflections on My Journey at BRINC"
layout: post
tags: [career, reflection, software engineering]
post_summary: "After a year at BRINC, where I stood up the web app team and built the first version of LiveOps, I'm moving on to a new role at PostHog. I reflect on the things I learned, the things I liked and didn't like, and what I'm looking forward to in my new role."
---

After a whirlwind of a year at [BRINC](https://brincdrones.com/), where I founded the web app team and built the first version of [LiveOps](https://brincdrones.com/liveops/), I'm moving on to a new role at [PostHog](https://posthog.com/). It has been a transformative year filled with valuable lessons, both enjoyable and challenging. As I transition, I want to reflect on my experiences–what worked, what didn't, and what I learned in the process.  Finally, I'll share a bit about what I'm looking forward to at PostHog.

## Reflecting on my goals

When I first joined BRINC, I had a few key goals in mind:

1. Build a product from scratch and scale it to bring in revenue
2. Build a product that I'm proud of
3. Stand up an engineering team and build a world-class engineering culture

Looking back, I had mixed success in achieving these goals.

### Building a Product from Scratch

This was the biggest goal I had for myself; a personal itch that I've wanted to scratch for years. And this is the goal that I am happiest about accomplishing – while at BRINC, I was able to both build a 0 -> 1 product in less than a year, and by the time I left this product was doing 6 figures in ARR. It was an indescribably special feeling to see my first ever users in my production DB.

I learned a lot about tying together managed AWS services into a cohesive product (BRINC is heavily leveraged into AWS, and at times I felt more like a solutions architect than a software engineer). I had a codebase that had 100% test coverage, fully automated deployments in dev, staging, and production environments, fast deployments, and excellent typing, linting and documentation (which IMO are force multipliers; having a codebase that you can trust makes rapidly prototyping new features much easier).

However, while I was happy with how the product was made, I think I struggled to really figure out what to make. I didn't really build a strong intuition on what the right things to build were, and I didn't push back on the opinions from external forces (CEO, other engineering leadership) on what the products we needed to make were. I think I made the mistake of blindly following user inputs too much; in my goal to listen to my users, I ended up building more things than I think the product needed, and I felt like I didn't spend enough time stepping back from (what ended up being a pretty robust) product and focusing more on ironing out core functionality and defining explicit CTAs on the website. By the end of my time at BRINC, I felt like my team was becoming a feature factory.

### Building a World-Class Engineering Culture

This is the area where I think I struggled the most. On one hand, I had the pleasure to hire some excellent engineers, and working with them will be the thing I miss the most about my time at BRINC. The team I assembled is humble, motivated, thoughtful, and kind. I was lucky to work with them.

However, I never really figured out how to build this team into a juggernaut. I think I was doomed from the beginning: one of things I learned about myself during my time at BRINC was that my ideal workplace environment is remote, async, transparent, and biased towards written communication with an intentional focus on minimizing meetings and maximizing focus time.

BRINC, on the other hand, had an existing engineering culture of in-person work with many alignment meetings, a focus on synchronous decision-making, and no real support for the remote flexibility. To its credit, this was an artifact of its original DNA: BRINC is a hardware company first and foremost, and many of the ways that I know about effectively building software don't translate to the hardware front. But my regret was that I never got the company to understand that different types of product development can (and maybe should) introduce different modalities of working.

## Lessons Learned

I learned a lot while working at BRINC.  Here's the stuff that stuck with me; some of it was about technology, but most of it was about myself.

### Technology

- Types, automated testing & deployments, and documentation are all worth investing in early because they are all force multipliers that make it easier to rapidly prototype high-quality features. I obsessed over these things when building LiveOps because IMO they are all essential parts of building a good developer experience, and I think a good developer experience helps make building things much easier.

- Rapidly prototyping high-quality features means you can get them in the hands of customers/users early and get feedback often.

- Getting feedback early and often means you build what people actually want.

- A strong and opinionated developer experience also makes it easy to onboard new engineers, as they will be able to rapidly prototype stuff too, and being able to ship on day 1 is a great flywheel for new hires.

- I learned more than I ever needed to know about AWS managed services. This wasn't necessarily all good (building on top of abstractions of complex processes often means you never really learn how those underlying processes work), but leveraging existing SaaS solutions let me stand on a lot of giant shoulders in my goal of building end-user products.

### Self-Reflection

This might sound cliche or banal, but the biggest positive thing I learned about myself was: I can do this. I am capable of building things from scratch, and with the power of managed AWS products, an intentional focus on DX, the glut of very good AI-assisted tools, and time to really focus and grind – it turns out I was capable of building a lot, just by myself. I never thought I could really do this until I actually did.

I also learned (or re-learned) a bunch of things that ultimately made me want to depart:

- I learned I want to work on product-led growth instead of sales-led growth. It's more creatively fulfilling to me to build something that "sells itself", that users would use just because it's a joy to use, instead of because it's vendor software that they have to use because it came bundled with their drone[^bignote].

- I learned that I want to work on products that are the core value prop of a business, rather than a SaaS add-on. The web software products I worked on at BRINC were never as important as the drones themselves.

- I proved to myself that I was capable of building out a fully-featured product from scratch and getting my first ever users to sign up. I'd been chasing this goal for over a year, but once I got there, I kinda realized I had nothing left that I wanted to prove on that front.

- I realized that my goal of building an engineering organization, scaling engineering culture, and attempting to make this team world-class was extremely difficult due to the existing engineering culture (synchronous, in-person, largely non-transparent, segmented) that ran counter to many of the facets that I wanted to build. I also learned that I am less excited about building culture from scratch than I am about building products from scratch.

- Building culture from scratch is a full-time job that gets exponentially more difficult without leadership buy in on being open to changing existing culture.

- Challenging existing team dynamics is an exhausting and largely fruitless game. If you want to come into a company and make changes to the culture, be prepared for it to take over your life.

- I regret not building closer relationships with other engineers. Overlapping in meetings and technologies could have bridged gaps and reduced isolation. The lack of shared engineering languages was difficult for me to overcome, and I regret not pushing myself to branch out more.

- I am a better worker, employee, and peer when I can work in a hybrid environment. I need remote work for the flexibility, access to async comms, and makers schedule. I need in-person work for onboarding, bonding, and camaraderie. I need a vibrant Slack culture to build a shared ethos across the org while still letting people focus on getting things done. BRINC had none of those things: the slack groups were closed, the work was mostly in-person and synchronous, and there were too many meetings. It was very hard to find a makers schedule, and therefore became quite hard to get things done as my team grew.

## What's next

I'll always be grateful for what I learned while at BRINC. I achieved my most meaningful goals, I learned a lot, and I genuinely enjoyed working alongside my teammates there. But, I am really excited for my [new role at PostHog](https://posthog.com/careers/product-engineer); I'm only a week in, but it feels like the kind of place where I can do my best work, and I'm so excited to continue to sink my teeth into the work. Before I wrap up, though, I wanted to reflect on a few factors that stood out to me while I was interviewing that strongly contributed to my belief that PostHog was the right next step for me.

- Incredible interview process: The interview process at PostHog was outstanding, reinforcing my decision to join. It felt like a new wave in engineering interviewing, and I'm looking forward to seeing more companies adopt this model.  It felt both high-signal for PostHog, and challenging but respectful as a candidate.  Plus, it makes me more impressed by my peers that they all went through a similar process.  Learn more about it [here](https://posthog.com/careers).
- Extreme focus on product-led growth (PostHog has scaled to 10M+ ARR with basically no sales team) and their customers. PostHog does an amazing job of [working with their users](https://posthog.com/blog/how-to-work-out-what-users-need) and obsesses over building projects that users would love.
- They're [ridiculously transparent](https://posthog.com/founders/how-to-run-a-transparent-company).
- The engineering team is absolutely cracked: The team is composed of ex-founders and ex-founding engineers from diverse domains, promising a rich exchange of ideas and experiences. The bar for talent is so high I can barely see it.
- The onboarding experience: Technically, my first week at PostHog was last week, but it quite the atypical (and incredible) onboarding experience: my first week was the week of the annual company offsite, so I did my onboarding in Mykonos, where I got to meet the entire company, learn my team's tech stack in-person while overlooking the Aegean Sea[^bignote2], and presented my team's hackathon project to the whole company.  I had so much fun, ramped up on the codebase quickly, got a chance to build my personal brand with a bunch of interesting and terrifyingly intelligent people, and came away exceptionally grateful to have had this experience.  I can't imagine a more auspicious way to start a new role.

## Closing thoughts

Moving on from BRINC is bittersweet. The experiences and lessons learned there have shaped my professional journey significantly. As I step into my new role at PostHog, I carry these learnings with me, ready to contribute, learn, and grow further.

[^bignote]: I understand why BRINC was a sales-driven company and why products were largely motivated by who was willing to pay, and what they wanted.  And I think it makes sense for BRINC to follow this strategy; their primary customers of governments, which, in their long and convoluted sales cycles, oftentimes turn into a discussion of feature parity, so making sure that your product _has the feature_ oftentimes felt more important than _if that feature worked well_.  Furthermore, because the lead time between signing a contract and actually shipping users their drones was so long, it led to a lot of "building the engines while the airplane was in the air" type of development, which can feel exhausting if not carefully managed.  Again, these attributes are not necessarily inherently bad, and I think BRINC following this strategy makes sense for them. However, I learned that I find much more value and meaning in my work when the focus is on building excellent products that could "sell themselves", rather than pushing out seemingly arbitrary features to comply with an RFP.

[^bignote2]: While I'm a proponent of remote work, I think that the best remote jobs mix in a healthy amount of in-person socializing to help foster camaraderie and team-building. To this point, I'm a big fan of in-person onboarding, even for jobs that are primarily remote.  [PostHog does this for every new hire](https://posthog.com/handbook/people/onboarding), I'm just the lucky guy who got to do his in-person onboarding during the company offsite.

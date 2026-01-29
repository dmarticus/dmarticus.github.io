---
title: "What I Talk About When I Talk About PostHog"
layout: post
tags: [career, reflection, software engineering, posthog]
post_summary: "Eighteen months at PostHog: the autonomy that made it special, the outages that tested me, and the shift from platform engineering to product work."
---

I've been at PostHog for about eighteen months now. Long enough to ship meaningful work, long enough to break things in production, long enough to feel the weight of both. This is my attempt to write down what that's been like.

## Part One: The Excellent

The thing I keep coming back to is the combination of autonomy, opportunity, and impact. These three words get thrown around a lot in job postings, but at PostHog they actually mean something. I've worked on genuinely interesting problems that matter to the business, and I've been given real freedom in how I solve them. Most days I wake up excited about the work. That's rare, and I don't take it for granted.

The feature flags team sits at an interesting intersection: we're responsible for infrastructure that needs to be fast and reliable (we serve billions of flag evaluations), but we're also building product that developers interact with directly. I've gotten to do both. I [rewrote our evaluation service in Rust](https://posthog.com/blog/even-faster-more-reliable-flags), shaving latency and improving reliability. I've also shipped product features, worked on SDK improvements, and thought deeply about developer experience. The breadth is energizing.

The learning has been extraordinary. I came to PostHog wanting to write Rust professionally. At my previous startup, I'd read Luca Palmieri's *Zero to Production in Rust* and knew the language was a good fit for the performance-critical work I wanted to do, but the existing tech stack and hiring concerns made it impractical. At PostHog, I finally got the chance. I've now built and shipped production Rust services handling real scale. I've learned how to operate distributed systems, how to debug cascading failures, how to think about reliability as a discipline rather than an afterthought. All of this through the lens of actual work, not side projects or tutorials.

And then there are the people. PostHog has assembled an extraordinary group of engineers from around the world. The talent density is intimidating in the best way; I'm constantly learning from my teammates. The company also invests heavily in bringing people together in person. In my eighteen months, I've done team meetups and offsites in Toronto, New York, Amsterdam, and San Francisco, plus company-wide offsites in Mykonos and Mexico. I have another one coming up in London. These trips aren't just perks; they're how a distributed team builds the trust and rapport that makes async collaboration actually work[^meetups].

## Part Two: The Challenges

I want to be honest about this part, because I think the hard stuff is where the real learning happens.

The biggest challenge was rebuilding our feature flags evaluation engine while it was running in production. You can't feature flag the feature flag service. Every change ships to everyone, immediately. This constraint forced me to think carefully about testing, validation, and rollout strategies. I built extensive test harnesses, shadow testing infrastructure, and tooling to validate behavior before shipping. It was some of the most disciplined engineering work I've done.

The rewrite itself went well. What came after was harder.

In late 2025, we had a series of incidents. Four outages in October alone, totaling over fourteen hours of customer impact. The technical details are in our [post-mortems](https://github.com/PostHog/post-mortems/blob/main/2025-10-21-feature-flags-recurring-outages.md), but the short version is: we discovered failure modes in the new service that we hadn't anticipated. CPU resource sizing issues caused cascading failures. Connection pools exhausted under load. Retry logic amplified problems instead of containing them. Each incident taught us something, but the lessons came at a cost.

Those weeks were some of the hardest of my career. I wasn't sleeping well. The feeling of letting customers down was awful; these are developers who depend on our service to ship their own products, and we were failing them. I took some time off. I seriously considered whether I wanted to keep doing this kind of work.

What got me through was the team and the culture. Folks from the leadership team reached out to me directly to check in and offer support – I typically don't hear much from them, but they all reached out when I needed it, and that affected me more than I expected it would. PostHog practices blameless post-mortems, and they really mean it. After each incident, the question was never "who screwed up?" but "what allowed this to happen?" My coworker Phil Haack [wrote about this](https://haacked.com/archive/2026/01/06/one-year-at-posthog/) in his own reflection on his first year. That approach made it possible to actually learn from the failures instead of just feeling bad about them.

The incidents also forced us to rethink our team structure. Before, we had one feature flags team with a sprawling scope: SDKs, product UI, platform infrastructure. After, we split into two focused teams. Phil now leads the Flags Platform team, laser-focused on performance, reliability, and architecture. I lead the Feature Flags product team, focused on the configuration UI, cohorts, early access features, and SDKs. The split lets each team go deep on their domain without feeling pulled in competing directions.

Looking back, I think the hardest part wasn't the technical debugging. It was sitting with the uncertainty while we were still figuring things out. There's a specific kind of dread that comes from knowing something is broken, knowing people are affected, and not yet knowing why. Learning to function in that state, to keep investigating methodically instead of panicking, was its own kind of growth.

## Part Three: What's Next

For my first eighteen months, I was hired as a product engineer but spent most of my time on platform work. Rust, performance, reliability, infrastructure. I loved it, and I'm proud of what we built. But I'm ready for a change.

I'm shifting my focus toward product engineering. I want to get closer to our users and think more directly about business impact. Feature flags is already a sticky product, which is solid for something that isn't a daily-use feature. But our activation rate is lower than I'd like. There's a gap between people who express interest during onboarding and people who actually end up using the product. That gap feels like an opportunity.

I want to understand why people bounce. I want to make the product so good that trying it feels effortless. I want PostHog to be the obvious choice for teams who care about feature flags and want to understand what those flags actually do.

This is different work than writing Rust services. It's more ambiguous, more user-facing, more tied to metrics I can't fully control. I'm excited to learn how to be good at it.

---

If any of this resonates, we're hiring.

Phil's [Flags Platform team](https://posthog.com/teams/flags-platform) is looking for [backend engineers](https://posthog.com/careers/backend-engineer) who want to tackle hard problems at scale: Rust, distributed systems, reliability engineering. If you want to work on infrastructure that serves billions of requests and learn from some genuinely excellent engineers, this is the role.

My [Feature Flags product team](https://posthog.com/teams/feature-flags) is hiring [product engineers](https://posthog.com/careers/product-engineer) who care about developer experience and want to ship features that users actually love. If you're energized by the intersection of product thinking and technical depth, come work with us.

[^meetups]: PostHog gives every team a meetup budget to get together in person several times a year, separate from the company-wide offsites. It's one of those policies that sounds nice on paper but genuinely changes how the work feels. Hard to overstate how much easier it is to collaborate async with someone after you've spent a week working alongside them.

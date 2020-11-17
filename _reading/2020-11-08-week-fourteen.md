---
title: "11/01 - 11/08"
layout: post
tags: ["haskell", "managers", "profiles", "economics", "functional programming", "software architecture", "fun"]
---

This was a big week!  The USA had its presidential election and while it's not officially done yet, it looks like Joe Biden has won, which is a positive development.  When I woke up on Saturday morning and read the news it felt like the first time I'd woken up to good news in years.  I don't have as many reads for this week because once election coverage began on Tuesday night I just kept refreshing [the open-source election tracker](https://alex.github.io/nyt-2020-election-scraper/battleground-state-changes.html) every few minutes alongside reading as insipid hot takes about voting trends as much as I could.  It was a bad week for careful, thoughtful, reading for me.  But a good week overall :)

But in addition to this being a big week for politics, it was a big week for Haskell, as the [Haskell Foundation](https://haskell.foundation/) was launched this week at Haskell eXchange.  This is really exciting news; it's encouraging to see Haskell -- which has historically been a very distributed language with no clear leadership -- take clear steps towards centralizing governance, which can hopefully lead to more industrial engineering applications, and optimally more usage.  Haskell is a great language and I'd be thrilled to see more folks adopting it.

Finally, I have some personal Haskell-related news that I'd love to share but it isn't quite public yet; stay tuned for a newsletter coming soon!  Okay, on to the links!

#### Business

* [Supply-Side Shocks Don't Cause Ample Increases in Nominal Income](https://www.nominalthoughts.com/2020/08/supply-side-shocks-dont-cause-amples.html?m=1).  This was written a while ago, but I only found out about the author this week (an economist named Jason Harrison), and I thought this was an interesting analysis of why recessions tended to lead to "Great Inflations" due to the policies put in place by the Fed, rather than recessions being a result of significant supply-side shocks.  It's a nice contrarian take to classic macroeconomics and worth considering.

#### Life

* [What was fun?](https://www.vox.com/the-goods/21523704/fun-quarantine-home).  I found this incredibly relatable; it talks about the foundational component of "fun" and how the quarantine has denied us one of the critical factors, which is spontaneity and the freedom to push ourselves outside of our comfort zone.  With caution being espoused so liberally in these pandemic times, fun is clearly suffering.  
* [Kelsey Hightower](https://www.protocol.com/kelsey-hightower-google-cloud).  Inspiring profile on one of the most inspiring guys in tech.  I'm not really a Go or K8s user but I have big respect for Kelsey's work and work ethic.
* [When Terrible Things Happen, our Numbers Go Up](https://digiday.com/media/when-terrible-things-happen-our-numbers-go-up-how-nyt-cooking-is-approaching-the-pandemic-politics-and-inclusion/).  As the world shut down this spring, The New York Times dropped the paywall to its What To Cook collection.  It was a sign of goodwill to the millions of people stranded at home looking for a culinary project — or just some comfort food — but it was also a timely ploy to lure more subscribers into NYT Cooking, the paper’s standalone recipe storehouse and home kitchen guide.

#### Work

* [When your Manager Isn't Supporting you, Build a Voltron](https://larahogan.me/blog/manager-voltron/).  Julia Evans tipped me off to this excellent read from Lara Hogan about how to effectively drive your career even in a situation where your manager isn't providing the support that you need.  I know a few of folks who have been in this situation and I think anyone who's struggled with their relationship with their boss would get something useful from this piece.

#### Tech

* [Names are not Type Safety](https://lexi-lambda.github.io/blog/2020/11/01/names-are-not-type-safety/).  Another excellent technical deep dive on accidental misuse of the `newtype` keyword to attempt to provide type safety that only ends up providing an alias.  It's long but excellent.  
* [Edsger Dijkstra: The Man Who Carried Computer Science on His Shoulders](https://inference-review.com/article/the-man-who-carried-computer-science-on-his-shoulders).  Grab a coffee for this one.  Probably 2.  Dijkstra is one of the pioneers of computer science as a discipline and this is a detailed profile on his life.
* [How to Seriously Read a Scientific Paper](https://www.sciencemag.org/careers/2016/03/how-seriously-read-scientific-paper).  My graduate school friends likely know this stuff already, but as someone who is trying to read more papers for fun, I got a lot out of this piece, which profiles several academics providing tidbits of advice on how to read papers effectively.  A big consistent theme: have an engaging task (note-taking, highlighting, writing) to do alongside the paper read to encourage active engagement with the material and prevent eye-glazing.
* [Grand Unified Theory of Software Architecture](https://danuker.go.ro/the-grand-unified-theory-of-software-architecture.html).  A pragmatic approach to designing software.  Good content to consider when code reviewing or writing your own code.  
* [Ugliest App](https://ugliest.app/).  As someone with a lot of backend development experience who hasn't worked as much on building a pretty frontend to match, this app platform speaks to my soul.

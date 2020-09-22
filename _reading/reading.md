---
layout: default
title: Reading
redirect_from: /links.html
---

## Link Archive (updated weekly)

### 2020

#### 9/14 - 9/20

  * [When you browse Instagram and find former Australian Prime Minister Tony Abbott's passport number.](https://mango.pdf.zone/finding-former-australian-prime-minister-tony-abbotts-passport-number-on-instagram) This is the most fun vulnerability disclosure I've ever read. "Alex" is hilarious and their posts are both insightful and a great read.
  * [A Robot Wrote this Article.](https://cacm.acm.org/news/247248-a-robot-wrote-this-entire-article-are-you-scared-yet-human/fulltext) I'm not worried about AGI coming for my job as an engineer just yet, but it's still cool seeing software write an op-ed without any human input.
  * [Nothing to see here, folks.](https://heated.world/p/nothing-to-see-here-folks) The West Coast of the US is extremely on fire currently and it's incredibly hard to ignore; as of writing this my city has some of the worst air quality of all the major west coast cities. This piece makes the case that major media outlets in the US are refusing to acknowledge systemic climate change as a cause for these fires. This type of negligence makes many folks (including yours truly) pretty outraged.
  * [It was never enough.](https://www.texasmonthly.com/articles/it-was-never-enough/) Fun long read from the Texas Monthly that profiles a prolific businessman / erstwhile scam artist who committed the wildest insurance fraud in the history of Texas.
  * [An intuition for optics.](https://about.chatroulette.com/posts/optics/) Tony Morris has written a bunch of intuitions on useful FP Algebraic Data Types over the last few weeks and I finally am getting around to reading them. I wish I'd read them earlier, honestly. If you're keen on trying to understand some genuinely useful FP concepts and their associated algebraic jargon, start here.
  * [A Deep Dive Into the 'Gentrification Font'.](https://www.vice.com/en_us/article/ep499w/gentrification-font-meme-neutraface) If, like me, you live in a neighborhood where it seems like bougie construction is cropping up everywhere, you may sometimes feel that all new development looks the same. This story sheds some light on how some aspects of new development (such as the typefaces used) are exactly as isomorphic as you may think.
  * [Thoughts on Haskell in 2020.](https://alpacaaa.net/thoughts-on-haskell-2020/) This week I read a lot about the "pragmatic" Haskell, which the concept of writing Haskell code that (while maybe not as powerful or fancily-typed as possible) is readable, maintainable, and takes advantages of Haskell's static typing and ergonomics. There's this whole movement called Boring Haskell that's been espousing this concept for years, (see writings from [Fommil](https://medium.com/@fommil/simple-haskell-is-best-haskell-6a1ea59c73b), [Snoyman](https://www.snoyman.com/blog/2019/11/boring-haskell-manifesto), and [Matt Parsons](https://www.parsonsmatt.org/2019/12/26/write_junior_code.html)), but it's still a hard habit to break, especially for people who are drawn to Haskell because of all the type-level abstractions you get to do with it. In my opinion, this post is best-targeted at (a) someone who wants to use Haskell at work and needs some data to help their manager or director sign off on a project or (b) someone who works on an existing Haskell team that's struggling to hire developers with the necessary pre-requisite programming skills to write complex Haskell code.
  * [Dependent and refinement types: why?](https://www.47deg.com/blog/why-types/) LMAO so I know I just got off my soapbox talking about why simple Haskell is best, but that doesn't mean it's not worth understanding some of the strong types in Haskell so that you can take advantage of them when you code. In this post by my coworker Alejandro, he walks through the benefits of understanding rudimentary types in Haskell and how you can ultimately use dependent types to prove things to the compiler, which leads to writing code that is free of (software) bugs by definition
  * [Safe, Expressive Code with Refinement Types](https://tech.ovoenergy.com/safe-expressive-code-with-refinement-types/) On the heels of Alejandro's post about the theoretical benefits of refinement types is this post from Gordon Rennie at OVO Energy that goes through an example of how to use refinement types to safely and elegantly handle input validation, which is a problem that is the scourge of many a web developer but, as Rennie argues in this post, is trivial to handle if you use a language that supports refinement types like Scala.

#### 9/7 - 9/13

  * [Vocational Awe.](https://annehelen.substack.com/p/vocational-awe) This piece discusses capitalism's impact in devaluing essential services through the les of American libraries. I recommend it if you're curious about how libraries work in the US and you want to get mad about how little they tend to be valued financially.
  * [SoftBank, Robinhood, and a Margins Singularity](https://themargins.substack.com/p/softbank-robinhood-and-a-margins). The best pop-finance you'll read all week imo. This piece attempts to explain what the hell the stock market has been up to during these last few months that's accessible for an everyman. I recommend it to anyone who's curious about why everyone is talking about stonks.
  * [Incomplete List of Mistakes in the Design of CSS.](https://wiki.csswg.org/ideas/mistakes) I'm into language design and it's cool to see the CSS working group being so transparent in sharing the mistakes that were made when developing the language. CSS is also a very different language than many other programming languages so the fact that many of the mistakes appear syntactic belies the fact that they are often related to the architecture. This list is also interesting to consider if you wanted to work on developing a DSL that transpiles to CSS, for example.
  * [Living in Someone Else's Portland.](https://annehelen.substack.com/p/living-in-someone-elses-portland) I'm obsessed with AHP's _Culture Study_ , so forgive me if I post about it a lot. But this piece resonated with me because it interviewed actual people in Portland to get their perspective on what's happening there, which (of course), is much mellower than entertainment media wants us to believe. As a Seattleite who dealt with this same overblown crap when CHOP was happening, this piece feels vindicating.
  * [America Is Trapped in a Pandemic Spiral.](https://www.theatlantic.com/health/archive/2020/09/pandemic-intuition-nightmare-spiral-winter/616204/) Another awesome COVID-19 piece from Ed Yong, this one focuses on the idea of why it's so hard to feel like you have any stability in US (largely due to systemic gaslight by the institutions meant to protect the US citizens). Good read if you're feeling helpless and you want to assign a mental model towards the helplessness.
  * [Generative Language Modeling for Automated Theorem Proving.](https://arxiv.org/pdf/2009.03393.pdf) This is a potentially seminal paper from OpenAI that lays the foundation of AI-driven automated theorem proving, which goes a long way towards training AI towards writing software. The ramifications are exciting and terrifying.
  * [Timeline of low-temperature technology.](https://en.wikipedia.org/wiki/Timeline_of_low-temperature_technology) In a world that seems to be heating up constantly, it's interesting to reflect on all the various times where humans moved to a place, set up shop to keep things cold, and innovated.
  * [How can you not be romantic about programming?](https://thorstenball.com/blog/2020/09/08/how-can-you-not-be-romantic-about-programming/) I love Thorsten's writings and this blog is a great koan about how cool programming is. Say what you want about tech as an economic or social system, a lot of us got into the industry because of the pure joy of programming, and this read helped rekindle some of that love.
  * [Why software projects take longer than you think: a statistical model.](https://erikbern.com/2019/04/15/why-software-projects-take-longer-than-you-think-a-statistical-model.html) I read this a year ago but it came up again in my work Slack today and generated a lot of buzz. I like ErikBern's writing in general and this is one of the few pieces with a "Why X is Y" title that, instead of being a puff piece, tackles an ambiguous problem (project planning) with statistics. I recommend it for any engineer, but especially an engineering manager who's looking to improve their metrics around project planning. 
  * [Lucid Dreaming with Neural Nets.](https://mikelynch.org/2015/Aug/29/lucid-dreaming-with-neural-nets/) My buddy [Jack](https://twitter.com/JFK_but_lamer) sent me this one and it's a great little post that showcases what remains my favorite application of Neural Nets: making trippy art in a programmic way. I'm hopeless at fine motor skills but I love that programs like this help people like me make art with nothing but computers and a little creativity.
  * [How to speed up the rust compiler.](https://blog.mozilla.org/nnethercote/2020/09/08/how-to-speed-up-the-rust-compiler-one-last-time/) The last in a series of 10 posts dating back to 2016 from the principal engineer on the rust compiler. The whole list is worth reading if you're the type of person who's curious about compiler technical details and micro-optimizations.
  * [Android build and the journey to the end game.](https://proandroiddev.com/android-build-and-the-journey-to-the-end-game-55c9766325c5) This post is also on micro-optimizations, only this time on a higher-level: it outlines how to speed up an android gradle build. I recommend it to anyone who's familiar with Android and gradle and is looking to improve the speed of their builds through a few accessible micro-optimizations.

#### 8/31 - 9/6

  * [Typing is Hard.](https://typing-is-hard.ch/) This post outlines type checking and decidability in an accessible way. I recommend it to someone who's familiar with the concepts of type systems and can understand the difference between statically and dynamically typed languages but wants to learn more about the subtle differences across popular statically typed langages. If you're into compilers you'll probably like it :)
  * [Against Online Tooling.](https://www.jvt.me/pƒosts/2020/09/01/against-online-tooling/) The TL;DR is that online tools for things like JWT generation, diff checking, or anything else are access points for accidentally leaking sensitive data. The author encourages doing these operations locally as much as possible.
  * [The Bicycle Threat Model.](http://calpaterson.com/bicycle-threat-model.html) An introduction to threat modeling via a practical example: keeping your bicycle safe in a city. I recommend for anyone who wants a practical example for threat modeling (perhaps to explain to a non-tech-y family member or friend).
  * [The Case of the top secret iPod.](https://tidbits.com/2020/08/17/the-case-of-the-top-secret-ipod/) Cool read on an internal project at Apple that sheds some insights into what work at one of the most secretive companies in the US is like.
  * [Microcovid Calculator.](https://www.microcovid.org/calculator) Play around with your COVID-19 risk level! If you're someone who likes extrapolating risk from incomplete data sets, you'll probably have fun with it. This is a reminder that I am Not A Doctor.
  * [Lofi-Player.](https://magenta.tensorflow.org/lofi-player) Creative project from Google Brain's magenta project that creates lo-fi beeps n boops using RNNs and provides a cute pixelated UI to boot. Not quite robust enough to have running in the background during work to try and flow to, but definitely good for spending a break to play around with it.
  * [How NAT Traversal.](https://tailscale.com/blog/how-nat-traversal-works/) Tailscale is a cool company that is tackling the challenge of building a secure network without needing to rely on sysadmins for each intersection, and their blog is generally great. I recommend this piece if you're curious about the technical specifics of how networked devices actually connect with each other.
  * [An Overview on the Science of Function Length.](https://softwarebyscience.com/very-short-functions-are-a-code-smell-an-overview-of-the-science-on-function-length/) More empirical analysis of software quality, this time trying to answer the hypothesis of whether very short functions are actually a code smell (one of my many pieces that challenges the "clean code" style of programming). I recommend it if you like reading attempted objective analysis of a relatively ambiguous subject.
  * [Shell Commands Rewritten in Rust.](https://zaiste.net/posts/shell-commands-rust/) List of shell utilities (traditionally written in C) that have been re-written and improved in Rust. You'll probably like this if you're into system utilities or are a big Rust fan.
  * [Describing Microservices using Modern Haskell.](https://dl.acm.org/doi/pdf/10.1145/3406088.3409018) This was written by my coworkers and is an example of a formal paper about industry-specific CS (in contrast with formal papers about more theoretical or abstract concepts). I recommend it if you're curious about microservice design using purely functional architectures, and I'm also biased because I work on the Scala version of this library so I think the work is personally cool.
  * [Towards rigorous design of domain-specific distributed systems.](https://dl.acm.org/doi/10.1145/2897667.2897674) So much of modern cloud computing is in distributed systems, and one of the killer apps of domain-specific modeling that many static FP languages do well is the ability to create programmatic DSLs (i.e. NOT yaml) to define complex distributed systems. This paper lays out a potential DSL design using that idea.
  * [Amazon Drivers Are Hanging Smartphones in Trees to Get More Work.](https://www.bloomberg.com/news/articles/2020-09-01/amazon-drivers-are-hanging-smartphones-in-trees-to-get-more-work) Your weekly dose of gig economy dystopia.
  * [Hic Sunt Dracones.](https://aelkus.github.io/void/2020/06/01/opening.html) You'll like this is you're either (a) a doomer neolib who thinks we're on the cusp of societal collapse (b) someone who enjoys dunking on doomer neolibs but you're curious what sort of content they read and share. I'll let you guess which one I am ;)
  * [Github Audio](https://github.audio/). When paired with mynoise.net you can attain focus bliss
  * [The Arc of the Covenant](https://offtherun.substack.com/p/the-arc-of-the-covenant). I recommend this piece if you want to get some data on what the fuck is happening in international finance.
  * [What if Facebook is the real silent majority](https://www.nytimes.com/2020/08/27/technology/what-if-facebook-is-the-real-silent-majority.html). "But what sticks out, when you dig in to the data, is just how dominant the Facebook right truly is. Pro-Trump political influencers have spent years building a well-oiled media machine that swarms around every major news story, creating a torrent of viral commentary that reliably drowns out both the mainstream media and the liberal opposition".

#### 8/24 - 8/30

  * [Capitalists Or Cronyists.](https://www.profgalloway.com/capitalists-or-cronyists) If you're looking for some well-reasoned words on why you think the US is bungling things on a massive scale but are pro-capitalism and you can't understand why it's not working in the US, you might find this piece insightful.
  * [United States Corona Corps.](https://www.profgalloway.com/united-states-corona-corps)
  * [GPT-3, Bloviator: OpenAI’s language generator has no idea what it’s talking about.](https://www.technologyreview.com/2020/08/22/1007539/gpt3-openai-language-generator-artificial-intelligence-ai-opinion/) If you're super over GPT-3 FUD and want to read an empirical study about GPT-3 that isn't just full of bombastic takes, this is a good read. Despite the title, it's not really a hit piece on GPT-3 -- but it does lay out some specific edge cases where GPT-3 fails.
  * [between fked and a hard place.](https://annehelen.substack.com/p/between-fked-and-a-hard-place) This article interviews a bunch of higher education workers across the country to paint a worrying picture of higher education's response to COVID-19 in the US. Solid doomscrolling content.
  * [Is WFH affecting the S&P;?](https://themargins.substack.com/p/is-wfh-affecting-the-s-and-p) I recommend this article if you're curious about the affect that WFH has on the stock market
  * [Formal methods intro.](https://migue.github.io/post/formal-methods-intro/) I recommend this for anybody who wants to learn more about Formal Verification but is intimidated by some of the methodologies and jargon (i.e. me).
  * [But does it help you ship?.](https://thorstenball.com/blog/2020/08/25/but-does-it-help-you-ship/) Fun read on the actual cost of adding automations.
  * [Parser Combinators.](https://bodil.lol/parser-combinators/) Technical deep dive on writing a parse combinator in Rust from scratch. I recommend it to anyone who's into parsers, programming language, Rust, or any combination of the three.
  * [Reachability Modulo Theories](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/rmt.pdf) and [A Solver for Reachability Modulo Theories.](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/paper-45.pdf)
  * [The Friendship that made Google Huge](https://www.newyorker.com/magazine/2018/12/10/the-friendship-that-made-google-huge). The story of Jeff Dean and Sanjay Ghemawat at Google. The least gloomy thing I've read in the last 5 months.
  * [Why Efficiency is Dangerous and Slowing Down Makes Life Better](https://psyche.co/ideas/why-efficiency-is-dangerous-and-slowing-down-makes-life-better). Click bait title aside, this post makes a compelling case for being cautious about aiming for efficiency at all costs.
  * [Don't Ask to Ask, Just Ask.](https://dontasktoask.com/) This piece speaks to my soul: it's a quick read on a best practice for async communication. Reminds me of [nohello.com](https://www.nohello.com/).
  * [Questions.](https://patrickcollison.com/questions) Patrick Collison writes some great posts on the big questions he's chewing on. Inspirational stuff.
  * [Empirical Investigation into Programming Language Syntax.](https://www.vidarholen.net/~vidar/An_Empirical_Investigation_into_Programming_Language_Syntax.pdf) A cool read that attempts to answer the question of "which parts programming language syntax is good and which ones are bad?"
  * [Insane Story about the Kidnapping of Sultan bin Turki II.](https://www.vanityfair.com/news/2020/08/how-saudi-prince-sultan-disappeared)
  * [Building a Digital Garden.](https://tomcritchlow.com/2019/02/17/building-digital-garden/) This post inspired me to set up automated processes to share my learning publicly in a consolidated location.
  * [Shadows.](https://www.profgalloway.com/shadows) Chilling piece on the state of political discourse in the US.
  * [Hack Your Career by Troy Hunt.](https://www.youtube.com/watch?v=-MUhcgXBj_A&t=0s) As an aspiring independent consultant this is a great watch
  * [Just quit your job at Facebook already.](https://themargins.substack.com/p/facebook-the-pr-firm)

#### 8/17 - 8/23

  * [sled.rs.](http://sled.rs/perf)An very thorough read on performance engineering within the context of sled, an open-source DB written in Rust.
  * [Steve Yegge's Google Platform rant from 2011.](https://gist.github.com/chitchcock/1281611) TL;DR Google treats its employees better than its customers and that's why Amazon ate Google's lunch in the cloud platform space.
  * [Steve Yegge's Google Deprecation rant from 2020.](https://medium.com/@steve.yegge/dear-google-cloud-your-deprecation-policy-is-killing-you-ee7525dc05dc) TL;DR it's more of the same from the above post, just 9 years later.
  * [Gabriel Gonzalez's talk on marketing Haskell to mainstream programmers.](https://youtu.be/fNpsgTIpODA) A bunch of good takeaways from marketing not just Haskell, but any non-mainstream technology.
  * [Low-Water Mark (part of a series on design patterns for distributed systems).](https://martinfowler.com/articles/patterns-of-distributed-systems/low-watermark.html) This post focuses on how to telling logging machinery which portion of the log can be safely discarded to avoid runaway disk storage.
  * [Learn in Public.](https://www.swyx.io/writing/learn-in-public/) Incredibly inspirational post on blogging, writing, speaking, and embracing the public growth that comes therein. 
  * [What's the best thing?](https://best.tomscott.com/) Fun Tom Scott Project that compares things and shows you how you did against others.
  * [Open-sourcing Have I Been Pwned.](https://www.troyhunt.com/im-open-sourcing-the-have-i-been-pwned-code-base/) I loved all of the specifics that Troy Hunt goes into about running a massively successful open-source project.
  * [Attack of the Clones: TikTok’s Rival Kuaishou Lands in the US.](https://turner.substack.com/p/attack-of-the-clones-tiktoks-rival) Ponderous and thorough deep dive of Kuaishou.
  * [Open-Source Knowledge.](https://www.swyx.io/speaking/open-source-knowledge/) Like the above link about learning in public, the author encourages using blogging, speaking, presenting to open-source your knowledge as well as your tech.
  * [Gateway Pages prevent PDF Shock.](https://www.nngroup.com/articles/gateway-pages-prevent-pdf-shock/) PDFs on the internet are still a rough experience and the author encourages alternatives to them.
  * [On Being a Principal Engineer.](https://blog.dbsmasher.com/2019/01/28/on-being-a-principal-engineer.html) Silvia Botros talks about the specifics of succeeding as a senior Individual Contributor.

#### 8/10 - 8/16

  * [The Rise of TikTok and Understanding Its Parent Company ByteDance.](https://turner.substack.com/p/the-rise-of-tiktok-and-understanding) Deep dive on TikTok. One of the most interesting reads on TikTok that I've ever encountered. Scares the shit out of me.
  * [Pinduoduo and Vertically Integrated Social Commerce.](https://turner.substack.com/p/pinduoduo-and-vertically-integrated) How to build a tech giant. Also scares the shit out of me. 
  * [Can you know too much about your organization?.](https://hbr.org/2019/12/can-you-know-too-much-about-your-organization) This piece helps shed some light on why you feel disenchanted about working at the same place for a while despite enjoying your day job.
  * [Dorking: How to find anything on the internet.](https://www.alec.fyi/dorking-how-to-find-anything-on-the-internet.html) I use Google all the time and this post is a summary of some useful heuristics on how to Google more efficiently. 
  * [Oatly: The New Coke.](https://divinations.substack.com/p/oatly-the-new-coke#) Oatly probably doesn't care agbout your health.
  * [Drive and Listen.](https://driveandlisten.herokuapp.com/) Traveling in the time of travel bans.
  * [The Truth Is Paywalled But The Lies Are Free.](https://www.currentaffairs.org/2020/08/the-truth-is-paywalled-but-the-lies-are-free/)
  * [Twitter, George Soros, and Porn](https://themargins.substack.com/p/twitter-george-soros-and-porn) (this is my 3rd _Margins_ post in as many weeks; if you like pop finance you should just sub to them already)
  * [GaryVee Is Still Preaching the Hustle Gospel in the Middle of a Pandemic.](https://marker.medium.com/garyvee-is-still-preaching-the-hustle-gospel-in-the-middle-of-a-pandemic-b033b25f0dc) Just trust me.
  * [Software disenchantment](https://tonsky.me/blog/disenchantment/) (an oldie but goodie). There's so much software out there that just hasn't been made well and there's many reasons why (and this post explains a bunch of them) but it's still sad.

#### 8/3 - 8/9

  * [Investing for Designers and Developers.](https://brianlovin.com/overthought/investing-for-designers-and-developers) Tech often provides large incomes to younger people who have little experience with making tons of money; this post helps a lot with understanding how to make the most out of that money.
  * [Cloud Computing Is Not the Energy Hog That Had Been Feared.](https://www.nytimes.com/2020/02/27/technology/cloud-computing-energy-usage.html) Positive news about the improvements in energy efficiency and how these improvements benefit cloud computing.
  * [ CodeGen: Semantic’s improved language support system.](https://github.blog/2020-08-04-codegen-semantics-improved-language-support-system/) Amazing post about applying ASTs to represent code as data and query it as such.
  * [ The Impact of Toxic Influencers on Communities.](https://intenseminimalism.com/2020/the-impact-of-toxic-influencers-on-communities/) Scala has some notorious bad actors in the open-source community and this read is a great overview on how to deal with it. Relevant for any community who has struggled with powerful but dangerous influences.
  * [ Adventures with Scala Collections.](https://www.47deg.com/blog/adventures-with-scala-collections/) Technical deep-dive written by one of my coworkers on the oft-maligned Scala collections library that makes a case for how effective the library is for solving common programming problems at work.
  * [ Winning the Internet.](https://pudding.cool/projects/newsletter/) It's a newsletter about newsletters across the internet! V meta.

#### 7/26 - 8/2

  * [The summer job as we know it is over.](https://www.vox.com/the-highlight/21319985/covid-19-coronavirus-summer-jobs-gig-internship) I mean, we knew this already.
  * [How Ferrero Rocher Chocolates Became a Status Symbol for Immigrants.](https://www.thrillist.com/eat/nation/ferrero-rocher-chocolates-status-symbol-immigrants) I recommend this piece if you're interested in the power that capitalizing on fortuitous impact can have on a food brand
  * [Chuck Norris and Hacking Twitter.](https://themargins.substack.com/p/chuck-norris-and-hacking-twitter) I recommend this piece if you've ever wondered how big tech companies seem to get hacked so easily.

## Book Archive (updated whenever I finish one)

### 2020

  * _Men without Women_ by Haruki Murakami
  * _Small Great Things_ by Jodi Picoult
  * _Educated_ by Tara Westover
  * _Little Fires Everywhere_ by Celeste Ng
  * _Between the World and Me_ by Ta-Nehisi Coates
  * _Hard-Boiled Wonderland and the End of the World_ by Haruki Murakami
  * _The Order of Time_ by Carlo Rovelli
  * _Sapiens_ by Noah Yuval Harari
  * _Neuromancer_ by William Gibson
  * (re-read) _Little Brother_ by Cory Doctorow
  * _The Three-Body Problem_ by Cixin Liu
  * _The Dark Forest_ by Cixin Liu
  * _Burning Chrome_ by William Gibson
  * _Count Zero_ by William Gibson
  * _Release It!_ by Michael T. Nygard
  * _Consider the Lobster and Other Essays_ by David Foster Wallace
  * _On Writing_ by Steven King
  * _Zen and the Art of Motorcycle Maintenance_ by Robert M. Pirsig
  * _Why Nations Fail: The Origins of Power, Prosperity, and Poverty_ by Daron Acemoglu and James A. Robinson 
  * _Seinfeldia: How a Show About Nothing Changed Everything_ by Jennifer Keishin Armstrong

### 2019

  * _All the Light We Cannot See_ by Anthony Doerr
  * _The Gene_ by Siddhartha Mukherjee
  * _High Output Management_ by Andrew S. Grove
  * _American Gods_ by Neil Gaiman
  * _Killers of the Flower Moon_ by David Grann
  * _Border Songs_ by Jim Lynch
  * _The Shortest Way Home_ by Pete Buttigieg
  * _You Shall Know our Velocity!_ by Dave Eggers
  * _Sirens of Titan_ by Kurt Vonnegut
  * _REAMDE_ by Neal Stephenson
  * _Redemption Road_ by John Hart
  * _AI Superpowers_ by Kai-Fu Lee
  * _The Overstory_ by Richard Powers
  * _Pump Six and Other Stories_ by Paolo Bacigalupi
  * _Where the Crawdads Sing_ by Delia Owens
  * _Deep Work_ by Cal Newport
  * _Digital Minimalism_ by Cal Newport
  * _The Harder They Come_ by TC Boyle
  * _The Remains of the Day_ by Kazuo Ishiguro
  * _The Great Alone_ by Kristin Hannah
  * _The Goldfinch_ by Donna Tartt
  * _The Gift of Struggle_ Bobby Herrera
  * _My Sister, the Serial Killer_ by Oyinkan Braithwaite


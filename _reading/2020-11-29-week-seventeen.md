---
title: "11/23 - 11/29"
layout: post
tags: ["politics", "postgres", "haskell", "scala", "accessibility", "distributed systems", "career"]
summary: "Sorry I'm late!  This week I took a road trip down the Oregon coastline with my partner and I mostly unplugged.  As a result, though, I forgot to post my reading!  My bad!  This week, I read some great pieces on careers, a hodgepodge of technical content, and an interesting piece on the intersection of politics and big tech.  Enjoy!"
---

Sorry I'm late!  This week I took a road trip down the Oregon coastline with my partner and I mostly unplugged.  As a result, though, I forgot to post my reading!  My bad!  This week, I read some great pieces on careers, a hodgepodge of technical content, and an interesting piece on the intersection of politics and big tech.  Enjoy!

#### Business

* [Playing on Hard Mode](https://stratechery.com/2020/playing-on-hard-mode/).  World-class piece from Ben Thompson on why it's no longer easy to make the new Facebook or Google.
* [Big Tech Sees Like a State](https://diff.substack.com/p/big-tech-sees-like-a-state).  Fascinating read on the overlap between state-run economic engines and the exploitative policies of certain big tech companies that mirror them.

#### Work

* [Being Glue](https://noidea.dog/glue).  Long read on how being good at your job can often lead to not being recognized as such because many workplaces measure and reward the wrong things.
* [Shai Mendel's Dev Blog](https://shaimendel.dev/docs/2020-11-02-turn-the-senior-around).  Interesting perspective on reframing the role of a senior engineer to focus more on mentorship and guidance and less on actually churning out code and owning features.  In my experience, this is the best way that senior engineers can maximize their value.
* [Six months of Tiny Projects](https://tinyprojects.dev/posts/six_months_of_tiny_projects).  The author transparently lays out his work, projects, and ROI for a bunch of side hustles that he'd done over the last 6 months.  Engaging read.

#### Tech

* [Building the most inaccessible site possible with a perfect Lighthouse score](https://www.matuzo.at/blog/building-the-most-inaccessible-site-possible-with-a-perfect-lighthouse-score/).  I used to use lighthouse for my site, and while it does some things well, I've since upgraded to a new tool -- the reasons in this article aren't the reason why, but they're funny.
* [PostgresqlCO.NF: PostgreSQL configuration for humans](https://postgresqlco.nf/en/doc/param/) and [psql command line tutorial and cheat sheet](https://tomcam.github.io/postgres/).  More useful PostGRES tools.  My workplace is a big PostGRES shop and I'm sharing the things I've been reading.
* [The True Size Of ...](https://thetruesize.com/) This is cute!
* [Managing Database Migrations in Scala](https://alexn.org/blog/2020/11/15/managing-database-migrations-scala.html).  DB migrations are a common operation when database changes are needed to accommodate, say, 3rd-Party API changes.  This is a useful guide on how to do these DB migrations in a type-safe way.
* [Elle: inferring isolation anomalies from experimental observations](https://people.ucsc.edu/~palvaro/elle_vldb21.pdf).  Is there anything more terrifying, and at the same time more useful, to a database vendor than Kyle Kingsbury’s Jepsen? As the abstract of this paper wryly puts it, “experience shows that many databases do not provide the isolation guarantees they claim.” Jepsen captures execution histories, and then examines them for evidence of isolation anomalies.
* [Parse, don’t type-check](https://neilmadden.blog/2020/11/25/parse-dont-type-check/).  Fantastic follow-up to [this piece](https://lexi-lambda.github.io/blog/2020/11/01/names-are-not-type-safety/) by another excellent Haskell engineer.  

---
title: "Getting the blog back together"
layout: post
tags: [meta, jekyll, ruby]
post_summary: "My triumphant return to blogging, some notes on bringing this site back to life, and setting the stage for what's coming next"
---

The other day I was reading one of my [old blog posts](https://www.dylanamartin.com/2022/10/31/use-newtypes-for-typesafe-data-validation-with-aeson.html), and I was struck by how happy it made me to read.  I wrote that post during a time in my life where I was programming a lot and really enjoying it, and returning to that post brought me back to that time in my life where my joy for my work was overflowing and I could scarcely contain my excitement to share what I was learning with the world.  A few exhausting jobs later, and I almost don't recognize the guy who wrote those posts.  For the last several months, programming (and frankly, much of my work in general) hasn't felt joyful at all.  I miss that old version of myself.  I wanted to bring him back.

To that end, I made some changes. I quit my job and took a new one that I'm extremely excited about (more on that in a future post).  I did the [75 Hard](https://andyfrisella.com/pages/75hard-info) and re-evaluated my diet, exercise, and substance use habits.  I got engaged.  A lot has changed since the last time I wrote here, but I also feel like my old self in a major way: I want to write again.

So, I'm back. I have a few posts cooking in the near future that I'm looking forward to releasing soon, but today I'm just announcing my return.  But, to do that, I needed to make sure I could actually build my site to preview my posts.  Turns out, some bitrot had set in, and so I needed to make a few tweaks to get my site working again.  This ended up turning into a bit of a rabbithole, so I figured I'd share that story, too.  Let's dive in.

## Is this thing on?

One of the reasons I've loved working with Jekyll over the years is that it just _works_. It's always been easy for me to build, run, and test my posts; and configuring plugins and other goodies has been simple and well-documented.  However, it'd been a few years (and several new laptops) since my last post, and so when I tried and I found that stuff isn't working any more.  My trusty `bundle exec jekyll serve` command ended up puking up some absolute nonsense, which mostly boiled down to this

```sh
Installing commonmarker 0.17.13 with native extensions
Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory: /private/var/folders/t1/f1qn55zs1ms8m0q6n4mdf7sh0000gp/T/bundler20240427-78980-sbeze4commonmarker-0.17.13/gems/commonmarker-0.17.13/ext/commonmarker
/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/bin/ruby -I /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/2.6.0 -r ./siteconf20240427-78980-ujdl51.rb extconf.rb
creating Makefile

current directory: /private/var/folders/t1/f1qn55zs1ms8m0q6n4mdf7sh0000gp/T/bundler20240427-78980-sbeze4commonmarker-0.17.13/gems/commonmarker-0.17.13/ext/commonmarker
make "DESTDIR=" clean

current directory: /private/var/folders/t1/f1qn55zs1ms8m0q6n4mdf7sh0000gp/T/bundler20240427-78980-sbeze4commonmarker-0.17.13/gems/commonmarker-0.17.13/ext/commonmarker
make "DESTDIR="
make: *** No rule to make target `/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/include/ruby-2.6.0/universal-darwin23/ruby/config.h',
needed by `arena.o'.  Stop.

make failed, exit code 2

Gem files will remain installed in /var/folders/t1/f1qn55zs1ms8m0q6n4mdf7sh0000gp/T/bundler20240427-78980-sbeze4commonmarker-0.17.13/gems/commonmarker-0.17.13 for inspection.
Results logged to /var/folders/t1/f1qn55zs1ms8m0q6n4mdf7sh0000gp/T/bundler20240427-78980-sbeze4commonmarker-0.17.13/extensions/universal-darwin-23/2.6.0/commonmarker-0.17.13/gem_make.out

An error occurred while installing commonmarker (0.17.13), and Bundler cannot continue.
Make sure that `gem install commonmarker -v '0.17.13' --source 'https://rubygems.org/'` succeeds before bundling.

In Gemfile:
  github-pages was resolved to 209, which depends on
    jekyll-commonmark-ghpages was resolved to 0.1.6, which depends on
      jekyll-commonmark was resolved to 1.3.1, which depends on
        commonmarker
```

After poking around online a bit and trying a few more things to fix it, I realized that the problem was that my dependencies were just too old to be compatible with the version of Ruby on my system.  I briefly considered trying to use [rbenv](https://github.com/rbenv/rbenv) to install an older version that was compatible, but then I had a better idea: why not just upgrade my site to use a later version of Ruby, delete my `Gemfile.lock`, and just try everything from scratch?

Turned out, that worked perfectly.  The change, as with most things like this, ended up being [quite simple](https://github.com/dmarticus/dmarticus.github.io/pull/94)

## We're back baby

`bundle exec jekyll serve` works perfectly, everything looks great, and I'm good to start writing some new posts (just so long as I don't take another 2-year hiatus, ha).  Very pleased that Jekyll just works again.  See y'all soon :)

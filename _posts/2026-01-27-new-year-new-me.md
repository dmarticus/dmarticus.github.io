---
title: "New Year, New Me"
layout: post
tags: [website, design, css]
post_summary: "I redesigned my personal site from scratch. Here's what changed and the design principles behind the decisions."
---

I redesigned this site over the weekend. If you're reading this, you're looking at the new version.

The old design was fine. It worked, it loaded fast, it was readable. But it had the classic "developer blog" energy: purely functional, zero personality. I wanted something that felt more like a design studio homepage and less like a default Jekyll theme with the serial numbers filed off.

## What I was going for

I spend a lot of time looking at personal sites. The ones I keep coming back to share a few traits:

- **Monospace as a design choice.** The best personal sites I've seen use monospace because it creates a specific mood: technical, deliberate, slightly editorial. I wanted that same energy; Berkeley Mono in particular has enough personality to carry body text while still feeling sharp at small sizes for nav labels and metadata.

- **Strong typographic hierarchy.** Big bold headings, tight letter-spacing, uppercase labels for navigation and section headers. The kind of thing where you can squint at the page and still understand its structure. Type size, weight, and spacing do the heavy lifting; color and decoration stay minimal.

- **Structural borders.** I like sites where the borders do real work: separating navigation from content, delineating sidebar sections, anchoring lists. Intentional 2px lines that say "this is a boundary." The nav and footer get strong borders; everything else stays subtle.

- **Light and dark, automatically.** I've had dark mode on this site since [2020](/2020/12/04/implementing-dark-mode-for-my-website.html), but the old palette was an afterthought. This time both modes are first-class citizens via `prefers-color-scheme`, with warm off-whites and deep charcoals.

- **Sidebars that earn their space.** Each sidebar section is a discrete card with its own purpose: stats, links, subscribe options, fun facts. If a page has a sidebar, the sidebar has a job.

## The font

I switched everything to [Berkeley Mono](https://berkeleygraphics.com/typefaces/berkeley-mono/). I've been using it in my editor for a while and I think it's the best monospace font available right now. It has enough character to carry long-form prose and it looks great at the small sizes I use for navigation and section labels.

Self-hosting was straightforward: four `@font-face` declarations pointing at `.otf` files, with `font-display: swap` to avoid FOUT. The fallback stack goes TX-02, JetBrains Mono, SF Mono, Fira Code, Cascadia Code, so it degrades gracefully.

## The layout

The grid is simple: a main content area and a 260px sidebar on desktop, collapsing to a single column on mobile. CSS Grid makes this trivially easy:

```css
.page-content.with-sidebar {
  grid-template-columns: 1fr var(--sidebar-width);
}
```

Every page that benefits from a sidebar gets one. The writing index has stats and subscribe links. Individual posts have an info table with publish date, word count, and slug. The homepage has social links, feeds, and fun facts. Pages like speaking and projects use the full width.

## The details

A few smaller decisions that I think matter:

**Navigation** is uppercase, bold, and letterspaced. More design studio masthead than list of links. The nav and footer both use 2px borders against the strong color, so the page has clear top and bottom anchors.

**Section headers** ("Currently", "Previously", "Interests" on the homepage) are `display: inline-block` with a 2px underline. This gives them visual weight while keeping them compact.

**The post list** has a bold top border and per-post word counts inline with the date. I added aggregate word count stats to the sidebar too; partly because I'm curious, partly because it's the kind of thing I like seeing on other people's sites.

**Sidebar sections** are bordered cards with uppercase headings and a subtle bottom border inside each card. Small thing, but it makes the sidebar feel intentional.

## Content changes

While I was in there, I made some structural changes too:

- **Renamed "Blog" to "Writing"** since that's more accurate and I like how it reads in the nav.
- **Renamed "Talks" to "Speaking"** for the same reason.
- **Created a Digest page** by pulling the reading list out of the Media page and giving it its own home. It felt buried before.
- **Added a Uses page** because I've always liked `/uses` pages on other developers' sites (h/t to [UsesThis.com](https://usesthis.com/)).
- **Added word counts** to the writing index, the stats sidebar, and each post's info box.

## The tools

This is still a Jekyll site hosted on GitHub Pages. One CSS file, a few Liquid templates, some HTML. The whole design system lives in CSS custom properties:

```css
:root {
  --bg: #fafaf8;
  --text: #1a1a2e;
  --accent: #3d5af1;
  --border: #d0d0d0;
  --border-strong: #1a1a2e;
}
```

Dark mode is a `prefers-color-scheme: dark` media query that swaps those values. Your OS decides.

The spirit here, as it's been since I made the [first commit](https://github.com/dmarticus/dmarticus.github.io/pull/1/changes#diff-3729493d031f7e2d26243070815ce0be4cc97590732407d8bcb15735452f0afbR1-R17) to this site, is basically [motherfuckingwebsite.com](https://motherfuckingwebsite.com/): no JS, no build step, no dependencies beyond what a browser already gives you. HTML, CSS, and content. The whole site loads fast, works everywhere, and I can understand every line of it.

---
title: "Implementing Dark Mode for my Website"
layout: post
tags: [tips, css, website, blog]
post_summary: "Now that both Windows and Mac have native dark modes for their respective operating systems, I figured I was overdue for enabling a dark mode on my personal website.  Specifically, I wanted a site that inherited the dark mode settings from the user's operating system so that they didn't have to toggle in on the ,my website itself.  Also, I wanted a solution that used pure CSS so that I didn't have to add any additional javascript to my site and modify any DOM elements at runtime.  In this post, I cover how to configure dark mode based on your browser's OS, and how I went about picking CSS for dark mode that made sense for my page."
---

Like many tired-eyed software developers, I love dark mode for my tools.  All of my editors, browsers, and operating systems use dark mode with dark themes, and now that both [Windows](https://www.cnet.com/how-to/windows-10-dark-mode-is-here-turn-it-on-now/) and [Mac](https://developer.apple.com/videos/play/wwdc2018/210/) have native dark modes for their respective operating systems (Mac OS has had it since 2018), I figured I was overdue for enabling a dark mode on my personal website.  Specifically, I wanted a site that inherited the dark mode settings from the user's operating system so that they didn't have to toggle in on the ,my website itself.  Also, I wanted a solution that used pure CSS so that I didn't have to add any additional javascript to my site and modify any DOM elements at runtime.  In this post, I cover how to configure dark mode based on your OS, and how I went about picking CSS for dark mode that made sense for my page.

## Configuring Dark Mode

Fortunately, it turns out it's really easy to configure dark mode with pure CSS on the modern web.  The [W3C Level 5 Media Queries](https://drafts.csswg.org/mediaqueries-5/) currently support a media (TODO ADD BIGNOTE) feature called `prefers-color-scheme`, which lets you conditionally display different CSS based on the browser color scheme (which is set from the OS level).  This is supported on Chrome/Chromium Edge since v76, Firefox since v67, and Safari since v12.1 (even iOS Safari supports it!).  Like any media elements for CSS, it's easy to use; here's a simple example:

```css
@media (prefers-color-scheme: dark) {
  body {
    /*
    Dark Mode CSS
    */
  }
}
@media (prefers-color-scheme: light) {
  body {
    /*
    Light Mode CSS
    */
  }
}
```

(TODO show screenshots of both versions and add a note on how to change it up if you want to).

## Choosing the Dark Mode CSS

Now that I knew how to enable dark mode with pure CSS, my next challenge was coming up with the actual CSS colors.  I used NightEye, then I stole the colors with the dev tools, and then I just pasted them into my CSS file.  For the code snippets, I used rougify to auto-generate it.

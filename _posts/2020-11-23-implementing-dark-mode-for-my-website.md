---
title: "Implementing Dark Mode for my Website"
layout: post
tags: [tips, css, website, blog]
post_summary: "Now that both Windows and Mac have native dark modes for their respective operating systems, I figured I was overdue for enabling a dark mode on my personal website.  Specifically, I wanted a site that inherited the dark mode settings from the user's operating system so that they didn't have to toggle in on the ,my website itself.  Also, I wanted a solution that used pure CSS so that I didn't have to add any additional javascript to my site and modify any DOM elements at runtime.  In this post, I cover how to configure dark mode based on your browser's OS, and how I went about picking CSS for dark mode that made sense for my page."
---

Like many tired-eyed software developers, I love dark mode for my tools.  All of my editors, browsers, and operating systems use dark mode with dark themes, and now that both [Windows](https://www.cnet.com/how-to/windows-10-dark-mode-is-here-turn-it-on-now/) and [Mac](https://developer.apple.com/videos/play/wwdc2018/210/) have native dark modes for their respective operating systems (Mac OS has had it since 2018), I figured I was overdue for enabling a dark mode on my personal website.  Specifically, I wanted a site that inherited the dark mode settings from the user's operating system so that no additional actions were required from the user to get a dark website.  Also, I wanted a solution that used pure CSS so that I didn't have to add any additional javascript to my site and modify any DOM elements at runtime.  In this post, I cover how to configure dark mode based on your OS, and how I went about picking CSS for dark mode that made sense for my page.

## Configuring Dark Mode

Fortunately, it turns out it's really easy to configure dark mode with pure CSS on the modern web.  The [W3C Level 5 Media Queries](https://drafts.csswg.org/mediaqueries-5/) currently support a media feature[^bignote] called `prefers-color-scheme`, which lets you conditionally display different CSS based on the browser color scheme -- which itself is set from the OS level.  This media feature is supported on Chrome/Chromium Edge since v76, Firefox since v67, and Safari since v12.1 (even iOS Safari supports it!).  Like any media element for CSS, it's easy to use; here's a simple example:

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

And that's it!  Depending on the color scheme your OS is using, my site uses the CSS within the appropriate media block to style the page.  Since this toggle is implement in pure CSS, there's no extra javascript required, and it _just works_.  

## Coming up with a Color Palette

Now that I knew how to enable dark mode with pure CSS, my next challenge was coming up with the colors -- I wanted a color palette that would complement my light mode palette,but I wasn't sure which colors would make good complements.  To get these colors, I used a little chrome extension trickery.  There's a popular chrome extension for automatically generating night mode for any browser page called [NightEye](https://nighteye.app/), so what I did was install NightEye on my browser, navigate to my site, and then use [ColorPicker](https://chrome.google.com/webstore/detail/colorpick-eyedropper/ohcpnigalekghcmgcdcenkpelffpdolg?hl=en) (another chrome extension) to determine the colors for the text, background, and links.  Low-tech?  Maybe, but it worked well and only took about 15 minutes for me to have all the colors I needed for a complementary dark mode.  The only thing that NightEye didn't provide great CSS for was my code blocks, but fortunately I had a solution for that: [Rouge](https://github.com/rouge-ruby/rouge).  Rouge is a Jekyll tool that auto-generates CSS for several different code blocks syntax highlight formats, and since I was already using the `base16.solarized.light` theme for my original code blocks, all I had to do was run `rougify style base16.solarized.dark` to generate the CSS for my code block syntax highlighting.

## Conclusion

My biggest takeaway from this project was gratitude; I'm grateful for all of the hard work that folks at the W3C committee have been putting in to make better tools for web developers that make it so everyone has to write less custom (and potentially buggy) code.  When I first thought about implement dark mode for my website, I though that I'd absolutely have to do it with some custom javascript, and it's really cool to see how easy this project ended up being because the state of the web development ecosystem continues to improve.  

[^bignote]: I learned about this feature from Flavio Copes' excellent blog post about it [here](https://flaviocopes.com/dark-mode/).

---
layout: post
---

# Installing Jekyll (and all the tools that come with it) on macOS Catalina

This post is inspired by the [Desired Persona's](https://desiredpersona.com/) [helpful post](https://desiredpersona.com/install-jekyll-on-macos/) on how to install Jekyll for Mac OS Mojave.  If you're not using Catalina and are running into Jekyll installation issues, I recommend starting with their post first.

However, when I tried to install Jekyll on macOS Catalina, I ran into some issues that the aforementioned post did not solve -- in fact, in the several hours I spent trying to debug my setup, I didn't find any website, forum post, or StackOverflow that solved answered all of my questions in an end-to-end way.  So, dear reader, this post is for people like me: people who want to install Jekyll on Mac OS Catalina, are running into dumb errors along the way, and just want one place where all the steps are laid out in an easy-to-follow way.  

## How to do the thing: the easy parts

Chances are you've gotten this far because you want to install Jekyll on macOS.  If you've followed all of the steps outlined in the various places where this question is asked on the internet, you've probably already

1. Installed the Xcode Command Line tools via `xcode-select --install` and installed 
the macOS headers via `open /Library/Developer/CommandLineTools/Packages/
macOS_SDK_headers_for_macOS_10.14.pkg`
2. Installed Ruby via Homebrew[^bignote] via `brew install ruby` and then updated your shell profile 
(bash, zsh, whatever) with the following entries (don't forget to run `source $PROFILE (e.g. bash_profile or zshrc)` or restart your terminal to save these changes)
```bash
# Ruby
export PATH=/usr/local/opt/ruby/bin:$PATH
export GEM_HOME=$HOME/gems
export PATH=$HOME/gems/bin:$PATH
```
3. Checked that the `which ruby` command outputs something like `/usr/local/opt/ruby/bin/ruby` 
(this means you're using the brew installed version of ruby, rather than system ruby, which is what we want)
4. Installed bundler via gem, e.g. `gem install bundler`

[^bignote]: We need to install ruby via homebrew because macOS ships with system Ruby since Mojave, 
            but a lot of the system directories that the system ruby would point to are locked down, meaning 
            you'd have to do a bunch of stuff with `sudo`, which increases the possibility that 
            you can mess up your system in a bad way.

Now, if you're like me, these steps all went relatively smoothly, and you should be full of optimism that installed Jekyll will be just as straightforward.  Unfortunately, dear reader, this is where you'd be wrong.  

## How to do the thing: the hard part

So you've installed all of your dependencies (non-system Ruby and Bundler), and all that's left to do is run `gem install jekyll` and you'll be ready to Jekyll your heart out.  And, there's a distinct possibility that this command works great for you and that jekyll just installs the first time and you'll be good to go (this is a likely outcome if you had no problems with installing the Xcode command line tools and compiling the header files).  Howeverm if you're like me and the `xcode-select --install` command turned up something like ```xcode-select: error: command line tools are already installed, use "Software Update" to install updates```, then you'll probably need this next bit.

What will likely happen for you is that you'll run `gem install jekyll` and then you see something like this:

    Gem::Ext::BuildError: ERROR: Failed to build gem native extension.

    current directory:
    /Users/foobar/.rbenv/versions/2.5.1/lib/ruby/
    gems/2.5.0/gems/ffi-1.9.21/ext/ffi_c
    /Users/foobar/.rbenv/versions/2.5.1/bin/ruby -r 
    ./siteconf20181118-49440-k8mjki.rb
    extconf.rb
    checking for ffi.h... no
    checking for ffi.h in /usr/local/include,/usr/include/ffi... no
    checking for shlwapi.h... no
    checking for rb_thread_blocking_region()... no
    checking for rb_thread_call_with_gvl()... yes
    checking for rb_thread_call_without_gvl()... yes
    creating extconf.h
    creating Makefile

    current directory:
    /Users/foobar/.rbenv/versions/2.5.1/lib/ruby/
    gems/2.5.0/gems/ffi-1.9.21/ext/ffi_c
    make "DESTDIR=" clean

    current directory:
    /Users/foobar/.rbenv/versions/2.5.1/lib/ruby/
    gems/2.5.0/gems/ffi-1.9.21/ext/ffi_c
    make "DESTDIR="
    Running autoreconf for libffi
    autoreconf: Entering directory .'
    autoreconf: configure.ac: not using Gettext
    autoreconf: running: aclocal -I m4 --output=aclocal.m4t
    Can't exec "aclocal": No such file or directory at
    /usr/local/Cellar/autoconf/2.69/share/autoconf/Autom4te/FileUtils.pm line 326.
    autoreconf: failed to run aclocal: No such file or directory
    make: ***
    ["/Users/foobar/.rbenv/versions/2.5.1/lib/ruby/gems/2.5.0/gems/
    ffi-1.9.21/ext/ffi_c/libffi-x86_64-darwin18"/
    .libs/libffi_convenience.a]
    Error 1

    make failed, exit code 2

    Gem files will remain installed in
    /Users/foobar/.rbenv/versions/2.5.1/lib/ruby/
    gems/2.5.0/gems/ffi-1.9.21 for inspection.
    Results logged to
    /Users/foobar/.rbenv/versions/2.5.1/lib/ruby/
    gems/2.5.0/extensions/x86_64-darwin-18/
    2.5.0-static/ffi-1.9.21/gem_make.out

    An error occurred while installing ffi (1.9.21), and Bundler cannot continue.

Some of the path-specific details may not match your setup, but the root of the problem is that gem is trying to build some system-native code (in my case it was the `libffi` library) and it can't do it because of incompatibilites between the brew-installed Ruby and the system Ruby.  If you run into any problems building these gem native extensions, here's what I recommend:

1. Reinstall the native extension through brew so that the brew-install ruby can sync with it.  
In the case with this issue, run `brew reinstall libffi`.  
2. Add specific install flags to your shell that point to the brew-installed version of the new gem native extension.  
To do this run the following commands in your shell:
```
export LDFLAGS="-L/usr/local/opt/libffi/lib"
export PKG_CONFIG_PATH="/usr/local/opt/libffi/lib/pkgconfig"
```
3. Finally, you should be good to go!  Rerun `gem install jekyll` and you should be 
rewarded by your system finally installing jekyll.  Note that you may see some issues with that install 
re: version of themes or other jekyll dependencies being out of date, simply run `bundler update` to resolve those errors

And that should do it!  I hope putting all these steps in the same place saves a future hapless Jekyll user from having to scour the internet like I did.

## Kudos

Shoutout to @ffleming (whoever you are) for [this solution](https://www.bountysource.com/issues/65069406-failed-to-build-gem-native-extension-on-macos-high-sierra) the the `libffi` problem, and shoutout again to Desired Persona's [original post](https://desiredpersona.com/install-jekyll-on-macos/) for a detailed description on all of the install steps that I glossed over here.  Also, since writing this I added a [StackOverflow](https://stackoverflow.com/questions/60807971/issues-building-the-libffi-gem-native-extension-when-trying-to-install-jekyll-on/60807981#60807981) post that references fixing the `libffi` problem that I ran into when trying to install that gem native package.
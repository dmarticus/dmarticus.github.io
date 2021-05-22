---
title: "macOS Catalina 10.15.4: Development Setup for my new Mac"
layout: post
tags: [guide]
post_summary: "I bought a new personal laptop recently and I'm starting a new job soon, which means that I'm going to have a few new Mac laptops to set up in the near future.  So, I figured it would be prudent to write my new Mac setup steps before I get the new computers and publish these steps somewhere so that I can easily get up and running with my new machine.  My configurations isn't too crazy, but it is custom, and I think I have enough 3rd-party development and productivity tools installed that it's worth a blog post to cover all of the bases.  On a final note, I'm primarily a backend/distributed-systems/data engineer, so my needs mostly revolve around Scala, Java, Go, Node, Python, and Haskell.  YMMV!"
---

I bought a new personal laptop recently and I'm starting a new job soon, which means that I'm going to have a few new Mac laptops to set up in the near future.  So, I figured it would be prudent to write my new Mac setup steps before I get the new computers and publish these steps somewhere so that I can easily get up and running with my new machine.  My configurations isn't too crazy, but it is custom, and I think I have enough 3rd-party development and productivity tools installed that it's worth a blog post to cover all of the bases.  On a final note, I'm primarily a backend/distributed-systems/data engineer, so my needs mostly revolve around Scala, Java, Kotlin, Go, Node, Python, and Haskell.  YMMV!

This blog will be broken into two sections: a "Before" section that covers what to do before setting up a new Mac (it's a shorter section that covers exporting/porting existing system settings) and an "Setup" section that covers that actual steps required to get up and running.  Finally, before we get started, I wanted to make available a [todoist template](https://todoist.com/API/v8.6/import/project_from_url?t_url=https%3A%2F%2Fd1aspxi4rjqbaz.cloudfront.net%2Fa09297b0f06267f2d38f384b86fc5b9f_New%2520Macbook%2520Setup.csv) for all of these tasks that you can easily import into Todoist if you'd just prefer to see the steps without all of the extra explanations.  Alright, let's get started!

## Before

There's not too many steps here, but I definitely recommend making sure that these tasks are done before configuring a new machine since my .rc files and my editor keybindings are specific and integral parts to my efficient workflow.  Here's are the recommended tasks:

* Save any custom shell configs (.bashrc, .zshrc, etc) and custom editor keybindings (VSCode, Sublime, Intellij, .vimrc, etc) in Github, Dropbox, or anywhere safe, really.
* Create a [Brewfile](https://github.com/Homebrew/homebrew-bundle) for your brew-installed packages (this will make it much easier to add all of your brew dependencies on your new machine).
* Export existing secrets from LastPass to a secure cloud location (Dropbox, GDrive, etc) so that you can access them on your new machine without having to reset all of your passwords.  My secrets are located at *REDACTED* (lol nice try NSA).
* Make sure any files, folders, photos, or anything else you want saved are backed up to iCloud, Google Photos, or Dropbox.

## Setup

These are all the tasks I recommend doing after you've gotten your new Mac and want to configure it so that all of the settings match the old one.

### The basics: browser, backups, and secrets

* download and install system update
* turn on FileVault for encryption
* download [Chrome](https://www.google.com/chrome/) and do the following
  * sign into your Google account
    * install [uBlock origin](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)
    * install [DevTools Theme](https://chrome.google.com/webstore/detail/devtools-theme-zero-dark/bomhdjeadceaggdgfoefmpeafkjhegbo?hl=en-US)
    * add the following settings:
      * turn on "warn before quitting"
      * Set theme to "Dark"
      * Go to `chrome://flags` and set Developer Tools Experiments to "Enabled"
      * Go to Experiments and select "Allow custom UI themes"
* sign in to [Dropbox](https://www.dropbox.com/) using Google authentication
* download [LastPass](https://www.lastpass.com/)

### Terminal, SSH, GitHub, Shell, and other System Default Settings

#### Terminal

* install [iTerm2](https://www.iterm2.com/)
* make any other non-default changes to your terminal:
  * reuse session directory
  * make sure home is the baseline
  * bold text with brighten enabled
  * enable bold and italic
  * monaco size 15 font
  * enable status bar and configure it to show battery, CPU, RAM, git branch, time, and network throughput

#### SSH

* simplify the process of SSHing into other boxes. Create an SSH config file via `mkdir ~/.ssh && touch ~/.ssh/config`
* modify your ssh config so that every time you run `ssh <command>` it will alias to `ssh -i ~/.ssh/key.pem user@example.com`

Your `~/.ssh/config` file should look like this

```sh
Host *
  AddKeysToAgent yes
  UseKeychain yes
  IdentityFile ~/.ssh/id_rsa

Host myssh
  HostName example.com
  User user
  IdentityFile ~/.ssh/key.pem
```

Now just run the alias (`ssh myssh`) to connect.

#### Git

* create [new SSH key for github](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
* edit your git config using the `.gitconfig` file from your dotfiles directory

#### Shell

* [install oh-my-zsh](https://ohmyz.sh/) to install `zsh` (the superior Unix shell)
  * use your `.zshrc` from your dotfiles repo for configuring your `zsh` instance

#### System Defaults

* clone system customization setup scripts (`git clone git@github.com:dmarticus/sixarm_mac_setup.git`) and save them somewhere reasonable (e.g. `~/Personal/github/dmarticus/`)
  * `cd` into that reasonable location and run `sh defaults-write-our-favorites.sh` to automatically apply a bunch of sane defaults to your computer

### Installing 3rd-Party Apps

#### Install all 3rd-party apps via Homebrew

* install [Homebrew](https://brew.sh/) (awesome 3rd-party Mac package manager)
  * make sure your [Brewfile](https://github.com/dmarticus/dotfiles/blob/master/Brewfile) is at `~/Brewfile`
* run `brew bundle install` to install all relevant brew and mas depedendencies.  This will take a minute but should work great

#### Install Additional Programming Languages that weren't handled by Homebrew

* install [Go](https://golang.org/doc/install)
* install [Haskell](https://www.haskell.org/platform/mac.html)
* install [node and NVM](https://www.taniarascia.com/setting-up-a-brand-new-mac-for-development/#nodejs)
* install [Jekyll and other blog tools](https://dylanamartin.com/2020/03/22/installing-jekyll-and-its-toolchain-on-mac-os-catalina.html)

#### Install Additional Non-Programming-Related Mac Apps

* download [Spotify](https://www.spotify.com/us/download/mac/)
* download [Spectacle](https://www.spectacleapp.com/)
  * Configure Spectacle for your computer.  My settings look like this:
    * Center = ctrl+cmd+T
    * Fullscreen = ctrl+cmd+B
    * Next Display = ctrl+shift+cmd+A
    * Previous Display = ctrl+shift+cmd+F
    * Left Half = ctrl+cmd+A
    * Right Half = ctrl+cmd+F
    * Top Half = ctrl+cmd+E
    * Bottom Half = ctrl+cmd+C
    * Upper Left = ctrl+cmd+W
    * Lower Left = ctrl+cmd+X
    * Upper Right = ctrl+cmd+R
    * Lower Right = ctrl+cmd+V
    * Make Larger = ctrl+cmd+->
    * Make Smaller = ctrl+cmd+<-

### Customize Additional Settings

Finally, we need to customize any additional settings that could not be configured with the `defaults-write-our-favorites.sh` script (Mac OS loves to make it hard to change default settings).

* Add [custom keymaps](https://beebom.com/how-modify-or-create-custom-keyboard-layouts-mac/)
  * command-shift-Q = Display sleep
  * caps lock = ESC

## Conclusion

At this point, all of the essentials should be installed and ready to go.  As of writing this (6/6/2020), I've currently used this setup guide for one (1) of my new Macs and have updated it slightly from the original draft form to reflect the actually installation process, but now this post has officially been end-to-end tested!

Finally, I want to give credit to the following blog posts for paving the way for mine :)

* [http://dreynaud.fail/new-mac-setup/](http://dreynaud.fail/new-mac-setup/)
* [https://www.taniarascia.com/setting-up-a-brand-new-mac-for-development/](http://dreynaud.fail/new-mac-setup/)

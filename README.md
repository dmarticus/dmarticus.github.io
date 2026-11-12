# Personal Website

Source code for my personal website.

## Running locally

This site uses Jekyll with Ruby **3.3.12** (`.ruby-version`) and Bundler **2.5.22** (`Gemfile.lock`). Keep those pins; you don't need to uninstall other Ruby versions.

One-time setup with `rbenv`:

```sh
rbenv install -s
rbenv exec gem install bundler -v 2.5.22
```

Start the local preview at <http://localhost:4000>:

```sh
./scripts/site
```

The script uses the repo's Ruby through `rbenv exec`, installs any missing locked dependencies, and starts Jekyll. It works even when Homebrew's Ruby comes before the rbenv shims in your shell's `PATH`.

Build without starting a server, or pass other Jekyll options:

```sh
./scripts/site build
./scripts/site serve --drafts
```

### If plain `ruby` or `bundle` uses the wrong version

Run `rbenv init` and follow its shell-specific setup instructions. Make sure rbenv initialization comes **after** Homebrew and other `PATH` changes in your shell config, then restart the shell. From this repo, `ruby -v` should report 3.3.12 and `command -v ruby` should point to an rbenv shim.

You can keep using `./scripts/site` without changing your shell configuration.

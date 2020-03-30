---
layout: post
---

# Uncovering emergent bugs using git bisect

Recently I came across a weird bug in our codebase that I didn't recognize and wasn't sure where it had come from, but it was blocking my ability to build my branch.
In this case, the bug had to do with a scalastyle rule being violated that prevented our service from building, but while in most cases scalastyle does a great job of
specifying where the style issue is being violated, in this case even the scalastyle tool was confused as to where the issue was and the error messages it was printing weren't
helpful in diagnosing where the problem was.  In addition, after looking at the issue a little bit, I realized that it had been present in our codebase several weeks of commits,
and it wasn't immediately obvious which commit had introduced the change because we'd been making a ton of commits to this repo over the past few weeks (what with the end of quarter rush and all that).  

Fortunately, git has a tool for this situation: git bisect.  [Git bisect is a command](https://git-scm.com/docs/git-bisect) that uses a binary search to identify the commit that introduced the issue.

## Usage
Using it is really straightforward.  To begin the process, you enter `git bisect start`.

Next, you need to identify two commits, one in which the issue exists and one in which the issue does not exist.

In my case, `master` was busted, so I just ran `git bisect bad` and my master branch.  This created an endpoint for the git bisect binary search.

Now, you need to find a commit where the bug doesn’t exist. To do that, you can look through your repo’s recent commits by entering `git log --oneline`. 

This command will give you a list of past commits, working its way backwards from the commit you’re currently on, with each commit being on its own line.

Use your own judgment to pick a commit that you think might not have the bug.  In my case, I wasn't sure, so I just picked a commit from 2 months prior, checked it out, compiled and built it, and called
it good when everything came back green.Once I found that good commit, I told `git bisect` that it was a "healthy" commit by entering `git bisect good <good commit hash here>`.

Now, git kicks off its binary search. It grabs the middle commit between your good and bad commits and checks it out automatically.
Now that the commit is checked out, you can compile your code and test to see if the issue exists or not.

If the issue exists on this commit, you tell git by entering `git bisect bad`. If the issue does not exist on this commit, you tell git by entering `git bisect good`.

Upon receiving this feedback, git checks out another commit in the middle of this commit and the good/bad starting points, depending on the feedback you gave it.

Again, you compile your code, test it, and let git know if you see the issue or not with git bisect bad or git bisect good.
This process repeats, and it’s in the most efficient way possible with the least number of steps because of the binary search (git gives you an approximate number of remaining steps per search)

Once you’ve finished, you’ll have identified the commit that introduced the issue. At this point, you're done bisecting!  To tell git you’re done, you enter `git bisect reset`.  At this point you should
be able to find the issue that was breaking your situation and make a fix.  In my case, it turns out there was a comma at the end of map of tuples (our scalastyle rules forbid interables from ended with commas. but our tool didn't make that error obvious in my case).

## Conclusion 
`git bisect` was a major timesaver in debugging my issues because it saved me having to trawl through potentially bad commits manually.  Hopefully, next time you find yourself in a situation where there's an emergent bug and you're not sure where it came from, `git bisect` can help you, too! 
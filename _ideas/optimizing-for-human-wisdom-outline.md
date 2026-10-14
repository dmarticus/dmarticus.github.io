# Optimizing for Human Wisdom — distilled outline

## Raw draft


Been thinking about this tweet a lot: https://x.com/ArtirKel/status/2082548090880635079

> As far as I can tell the answer is something like LLMs are smart but not wise they don't induce that many of those "Aha!" moments that seem to be best mined through other means (or often, just doing nothing and pondering stuff on walks)

for me, this means i've been optimizing time away from focus work and into more conversations with humans. focus work has also changed, since i code less and am less often in a flow state where i am modeling the entire system in my head the same way i was when writing software. 

now flow state is mostly writing prose.

my two states are free-associating (I do this best with another person) or on walks (I am an external processor so i speak into wisprflow a lot)

still keeps me at a point where i still am able to generate interesting ideas.

another thing: https://www.jmduke.com/posts/engineering-produces-wisdom.html

tldr i wanted to response to the idea that humans can be wiser about codebases than an LLM. generally i think this is true, or at the very least i think i can take shortcuts to wisdom by working with humans on building mental models about the codebase early, so i have intuition around subsequent changes.

i kinda disagree with this point though

> My experience with running a business is such that, at least today, wisdom is a useful lever to build a codebase which provides competitive advantage over incumbents. (Reasonable people can disagree!)

I like this position

> Discussions about our current rituals (hand-writing code, reviewing pull requests, etc.) are really discussions about the value of engineering as a process vs. the value of engineering as something which produces an artifact.
> 
> It is a reasonable position for someone to think that the value of engineering as a process is going to zero. But if you believe that, you better have a coherent answer of where your competitive advantage is coming from once every other organization you compete with is using the same tools as you.

at this point my coherent answer is:
- customer feedback from large amount of existing customers
- strong branding + distribution
- capital to deploy while we figure out best solution

imo the fastest feedback loop is launch -> metrics about launch -> customer feedback -> iterate. wisdom about codebase helps but is the type of thing that doesn't need to be done as frequently. much more software is disposable.

so i think my competitive advantage is that ^

future post coming about how my actual work goes

## Core claim

- LLMs are smart, but not wise
  - strong at making progress inside an existing frame
  - weak at generating the reframes that produce “aha” moments
- Agentic work makes execution cheap
- Human work moves earlier in the process
  - build judgment
  - find the frame
  - then delegate execution

## What changed in my work

- Before agents
  - coding was focus work
  - coding created a mental model of the system
  - implementation and understanding happened together
- Now
  - agents do nearly all of the coding
  - less time holding the whole system in my head
  - less implementation-driven flow
  - flow state has moved to writing prose
- Goal
  - retain wisdom and deep thinking
  - avoid becoming a meat proxy for agents

## Where wisdom comes from now

- Conversations with humans
  - best environment for free association
  - other people expose assumptions and missing context
  - domain experts provide shortcuts to codebase wisdom
- Deliberately spending more time ideating with coworkers
  - agentic work has made our implementation rhythms more asynchronous
  - fewer people are protecting the same kind of uninterrupted coding flow
  - the cost of an ad hoc conversation feels lower than it used to
  - I am more willing to pause and “jam” on an idea instead of treating it as a distraction
  - these loosely structured conversations are disproportionately effective at producing good ideas
  - the point is not coordination or status sharing; it is thinking together
- Writing prose
  - forces vague ideas into explicit claims
  - current primary form of focused work
- Walking
  - creates unstructured thinking time
  - speaking into Wispr Flow supports external processing
- Common feature
  - each creates room to reframe the problem
  - none is primarily about producing code

## What an “aha” moment looks like

- “We’re solving the wrong problem”
- “This constraint isn’t real”
- “Customers don’t care about the thing we’re optimizing”
- “We tried this before and it failed for a non-obvious reason”
- “These two unrelated failures are actually the same failure”

## Why LLMs struggle here

- They optimize within the user’s stated frame
- They defer to user preferences
- They seek the requested outcome
- They are less likely to challenge the premise
- Risk
  - human becomes an execution proxy
  - lots of motion without independent judgment

## Engineering as process vs. artifact

- Justin Duke’s useful distinction
  - engineering as a process that produces wisdom
  - engineering as a process that produces software
- Traditional engineering rituals may provide both
  - hand-writing code
  - reviewing pull requests
  - operating systems
- Agentic work separates them
  - software can be produced without the same wisdom-building process
- Open question
  - if the old process disappears, where does the wisdom come from?

## Position I agree with

- Humans can be wiser about a codebase than LLMs
- Full codebase mastery is not always necessary
- Human collaboration can accelerate wisdom acquisition
  - build the mental model early
  - identify load-bearing constraints
  - borrow context from people who already have it
  - use that intuition to evaluate later agent output

## Position I disagree with

- Codebase wisdom is not necessarily the competitive advantage
- For much product software, the code itself is increasingly disposable
- Deep understanding of every implementation is not the goal
- Codebase wisdom matters selectively
  - architecture
  - irreversible decisions
  - dangerous constraints
  - areas where mistakes are expensive

## Where the competitive advantage comes from

- Customer feedback
  - especially from a large existing customer base
- Brand
- Distribution
- Capital
  - ability to keep deploying resources while discovering the right solution
- Product judgment
  - implied by knowing what feedback means and what to do next

## The important feedback loop

1. Launch
2. Observe metrics
3. Get customer feedback
4. Iterate

- Agents compress the launch and iteration steps
- Existing customers strengthen the feedback step
- Competitive advantage comes from running this loop well and often
- Codebase wisdom supports the loop
- Codebase wisdom is not necessarily the loop’s scarce input

## Emerging working model

### Before agents

- Talk to customers
- Talk to domain experts
- Explicitly make more room for ad hoc ideation with coworkers
  - treat “jamming” as valuable work rather than an interruption
  - take advantage of the lower cost of breaking implementation flow
- Free-associate with other humans
- Write to clarify the problem
- Walk / think without forcing immediate output
- Build enough of the system model to recognize bad directions

### With agents

- Delegate implementation
- Use judgment to evaluate direction, not every line
- Re-engage humans when assumptions or constraints are unclear

### Optimize for

- maximum human wisdom accumulation
- early reframing
- fast feedback
- knowing where deep understanding is necessary

### Do not optimize for

- maximum human participation in implementation
- hand-writing code as a ritual
- exhaustive understanding of disposable software
- visible output at the expense of independent judgment

## Tensions worth preserving


- Coding less creates leverage but removes a former source of understanding
- More capable agents may make human conversation more valuable, not less
- As implementation becomes more asynchronous, spontaneous collaboration may become easier
- Protecting flow used to mean avoiding interruptions; now it may mean making room for the right ones
- Software can be disposable while judgment remains durable
- Codebase wisdom is useful without being the company’s moat
- Fast execution increases the cost of choosing the wrong direction

## Likely conclusion

- Human value shifts from implementation toward:
  - framing
  - judgment
  - taste
  - customer understanding
  - domain intuition
- Acquire wisdom before agents take control of execution
- Let agents make software cheap
- Preserve the human processes that produce better directions

## Out of scope / separate post

- Exact day-to-day workflow
- Specific agent setup
- Detailed prompt or planning process
- How implementation review works
- Concrete examples from a normal workday

# Racing towards Bethlehem — distilled outline

## Core claim

- LLMs have not removed software engineering’s fundamental bottlenecks
  - understanding
  - review
  - testing and verification
  - debugging
  - coordination
  - judgment
- They have reduced the cost of reaching those bottlenecks
  - faster context gathering
  - easier navigation
  - earlier risk identification
  - less undirected searching
- The useful role is connective tissue around human reasoning, not a replacement for it
- The required adaptation is to gain speed without allowing convenience to erode the capacity for judgment

## Question inherited from the previous post

- Individual implementation velocity has increased
- System throughput still depends on slower shared constraints
- Code review is the clearest example
- Central question
  - what changes when one stage accelerates but the rest of the system remains expensive?

## What has not become cheap

- Reviewing changes
- Understanding intent
- Maintaining shared mental models
- Verifying behavior
- Protecting the architecture and overall shape of a system
- Making tradeoff decisions
- Trusting newly added code
- More generated code can increase the surface area for which an engineer is responsible
- Near-zero marginal implementation cost does not imply near-zero ownership cost

## What has changed

- The surrounding path to hard reasoning is shorter
- LLM tools can reduce preliminary cognitive overhead
  - locating relevant files
  - summarizing a subsystem
  - identifying invariants
  - tracing behavior
  - interpreting failures
  - surfacing risky areas
- Human attention can begin closer to the consequential question
- The bottleneck remains intact
- Its approach becomes faster and clearer

## Evidence from current tools

### Greptile

- Provides an additional pass over the author’s own pull requests
- Surfaces high-level issues that familiarity with a diff can hide
- Functions as a second perspective rather than final authority

### 0github

- Provides a heat-map view of someone else’s changes
- Uses risk signals to prioritize review attention
- Helps determine where careful human inspection should begin

### Claude Code

- Maps unfamiliar areas of the codebase
- Identifies key files and invariants
- Replaces aimless directory exploration with directed reading
- Accelerates onboarding to a subsystem without completing the judgment step

### Shared value

- Compress context acquisition
- Shrink the search space
- Direct attention toward likely points of consequence
- Preserve the need for a human to reason about what is found

## Connective tissue versus output generation

- Output-machine framing
  - optimize for producing more code
  - risk flooding existing review and trust constraints
- Connective-tissue framing
  - connect a question to the relevant context
  - connect a reviewer to risky sections
  - connect a failure to a plausible subsystem
  - connect an unfamiliar codebase to its important invariants
- The second framing better matches where the author has found unexpected value
- Speed is useful when it removes wandering rather than thought

## The adaptation problem

- The human–machine boundary is moving
- Habits built for the prior environment may no longer preserve the same skills
- Easier shortcuts create a shifting baseline for acceptable effort
- Unnoticed drift can weaken capacity
- Drift pattern
  1. A tool removes preliminary effort
  2. The shortcut expands into reasoning work
  3. Repetition of the reasoning skill decreases
  4. Intuition and capability flatten
  5. The weaker capability increases dependence on the shortcut
- Intentional learning therefore becomes a daily adaptive practice
- Adaptation must stay ahead of drift

## Boundary for responsible use

### Use LLMs to improve orientation

- navigation
- mapping
- summarization
- risk surfacing
- tracing
- onboarding
- interpreting test failures
- spotting suspicious patterns

### Keep human attention on judgment

- correctness
- design
- invariants
- architecture
- root-cause debugging
- tradeoff decisions

### Decision rule

- Use the tool when it narrows where to look
- Step back when it encourages skipping the investigation altogether
- Optimize for retained capability, not tool abstinence

## Emerging working model

1. Begin with a question, unfamiliar change, or failure
2. Use LLM-based tools to gather and organize context
3. Identify high-risk files, behavior, and invariants
4. Transfer full attention to the actual bottleneck
5. Perform correctness, design, and tradeoff reasoning directly
6. Verify before trust is granted
7. Reassess whether the shortcut improved orientation or displaced practice

## How this extends the previous position

- Earlier concern
  - LLM use fragments attention and weakens learning
- Added distinction
  - not all acceleration has the same cognitive cost
- Useful acceleration
  - removes search and parsing overhead
  - delivers the engineer to meaningful reasoning sooner
- Harmful acceleration
  - supplies the judgment that the engineer needs to practice
- Revised objective
  - do not reject speed
  - aim speed at the path around the hard work

## Tensions worth preserving

- Code production can become cheap while code trust becomes more expensive
- More working code can create more implicit responsibility
- Tools can widen access to a bottleneck without eliminating the bottleneck
- Context summaries save energy but may also tempt the user to accept an incomplete model
- Faster arrival at a judgment point is valuable only if judgment remains active
- The same technology can strengthen or erode skill depending on where it enters the loop
- Avoiding purity allows practical leverage; avoiding complacency preserves capacity
- Adaptation is necessary, but adaptation can become surrender if it is not deliberate

## Likely conclusion

- Accept that the core constraints of engineering remain human and expensive
- Use LLMs to reduce the friction before those constraints
- Reserve direct attention for correctness, architecture, debugging, and tradeoffs
- Treat preserved reasoning ability as part of responsible tool use
- Move faster on purpose rather than inheriting the pace passively

## Out of scope / unresolved

- Eliminating review, testing, coordination, or knowledge-transfer bottlenecks
- A quantitative account of whether overall team throughput improves
- Comparative evaluation of the named tools
- Exact safeguards for errors in generated maps, summaries, or risk scores
- How organizations should absorb much larger volumes of generated code
- Whether future tools will reduce the cost of judgment itself

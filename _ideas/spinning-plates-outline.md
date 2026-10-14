# Spinning Plates — distilled outline

## Core claim

- LLMs have sharply increased personal software output
- The same workflow has weakened several parts of programming the author values
  - sustained attention
  - learning through struggle
  - retention
  - authorship and ownership
  - confidence on genuinely difficult problems
- The problem is not whether to use LLMs
- The problem is deciding where leverage is worth the human capacity it may displace

## What changed in the work

### Before LLM-heavy development

1. Hold one difficult problem in mind
2. Struggle with it
3. Reach an impasse
4. Find a breakthrough
5. Ship the result

- Lower throughput
- Longer feedback loop
- Understanding accumulated during implementation
- Satisfaction came mainly from the difficult middle stages
- The finished work felt owned because the reasoning had been lived through

### With LLM-heavy development

1. Specify the desired shape
2. Package context into a prompt
3. Inspect and repair the response
4. Test and repeat
5. Run the same loop across several tasks

- Higher throughput
  - multiple features can reach production in a day
  - generated work can be well tested and mostly correct
- Work becomes supervisory
  - prompting
  - triage
  - taste
  - recognizing suspicious output
- Satisfaction shifts
  - less discovery
  - more orchestration
  - more reward for managing parallel activity
- Resulting gap
  - code can be shipped without being retained
  - responsibility remains even when reasoning is not fully internalized
  - authorship is visible in Git history but less present in felt ownership

## The plate-spinning model

- Cheap task initiation encourages many concurrent shallow loops
- Marginal progress remains possible without fully loading any one problem
- The workflow rewards rapid reading, parsing, and response
- Personal strengths align with that workflow
  - fast comprehension
  - triage
  - switching among responsibilities
- Strong days therefore feel unusually productive
- Slowdowns expose the fragility of the system
  - unclear requirements
  - difficult bugs
  - unreliable infrastructure
  - interruptions from life
- A local delay can make the entire stack feel unstable
- Productivity pressure escalates from doing useful work to maintaining maximum output

## Meta-work has become real work

- Effort has moved toward making models effective
  - maintaining repository instructions
  - improving editor and launcher shortcuts
  - packaging specifications and failures efficiently
  - organizing code for model legibility
- This reduces time spent learning technical subjects from first principles
- The investment is difficult to dismiss
  - small workflow improvements produce meaningful throughput gains
  - better tools and environments have long mattered more than raw typing speed
- The craft changes form
  - from directly producing elegant implementations
  - toward designing systems that reliably produce acceptable implementations
- The role changes without an explicit decision
  - builder
  - foreman

## The deep-work tax

- Some problems still require a detailed mental model
  - performance anomalies
  - difficult data modeling
  - unusual failure modes
- These problems cannot be safely handled through shallow supervision
- The author feels slower at them than before
- Two modes of LLM use have different effects
  - teammate / rubber duck
    - asks and answers questions
    - sketches possibilities
    - leaves the core reasoning with the human
  - substitute thinker
    - supplies conclusions before intuition forms
    - produces answers without durable understanding
- Frequent shallow work trains attention away from full immersion
- Consequence
  - shorter focus bursts
  - less frequent flow
  - weaker confidence in deep technical reasoning

## Why the loss of ownership matters

- The concern is not that all abstraction is illegitimate
- Programming has always depended on work the programmer did not personally build
- The new difference is the distance between:
  - shipping a change
  - understanding why that change took its particular form
- Fully formed model answers remove part of the discovery reward
- Re-reading one’s own diff to reconstruct its reasoning is evidence of reduced retention
- A career dominated by directing a black box may be productive but personally unsustainable

## Karpathy’s useful split

### Production work

- Prefer constrained, local assistance
  - in-editor completions
  - inline comments as compressed specifications
- Preserve more human control over the direction of the implementation
- Use leverage without handing over the whole problem-solving loop

### Learning work

- Keep a reference implementation visible
- Rebuild it manually in a separate project
- Avoid copy-paste
- Minimize completion assistance
- Use typing and reconstruction to force a mental model to form

### Why the split is compelling

- Different goals require different optimization
  - production work values leverage
  - learning work values durable understanding
- A single default workflow should not govern both

## Abramov’s warning

- Educational demand may be moving from understanding toward immediately usable answers
- The author still wants to learn
- The surrounding workflow makes non-learning the path of least resistance
- Repeatedly choosing generated fixes can turn convenience into habit
- Deliberate manual practice becomes a defense against that drift
- Personal fear
  - becoming an audience that no longer wants deep explanation

## Emerging working model

### Delegate freely

- CRUD work
- migrations
- boilerplate tests
- glue code
- work whose main value is its finished existence

### Keep the human in the reasoning loop

- difficult or ambiguous problems
- work that depends on intuition
- decisions the author wants to be able to explain later
- areas where a detailed system model is necessary

### Protect learning explicitly

- schedule prompt-free development time
- rebuild selected concepts manually
- use minimal autocomplete during first-pass learning
- choose which problems are intended to produce growth

### Evaluate the system over longer intervals

- assess weeks and months rather than maximizing each day
- count conceptual gains as progress
- distinguish important movement from a high number of completed tasks
- allow low-output days without treating them as system failure

### Accept disposable work

- Not every pull request needs to deepen the author’s craft
- Some implementation can remain forgettable
- Intentional selection matters more than universal manual effort

## The intended operating loop

1. Classify the work as routine, difficult, or educational
2. Choose the level and interface of model assistance accordingly
3. Preserve direct reasoning where intuition or learning matters
4. Let tools maximize throughput where implementation is disposable
5. Review longer-term learning, focus, and output
6. Adjust before convenience becomes capacity loss

## Tensions worth preserving

- Output is objectively higher while the work can feel less meaningful
- Workflow optimization is both highly effective and emotionally alienating
- Supervising generated work still requires skill, but it develops a different skill set
- Abstraction has always separated programmers from implementation details, yet this separation feels qualitatively larger
- LLMs can support deep thinking or replace it depending on how they are used
- The author excels at plate-spinning and is also harmed by making it the default mode
- Maximum daily productivity can reduce long-term capability
- Manual work is valuable for selected learning goals, not as a purity test
- Some code can be disposable even when engineering judgment cannot

## Likely conclusion

- Continue using LLMs because their leverage is real
- Stop allowing one high-throughput workflow to govern every kind of work
- Use models aggressively for routine implementation
- Use them as constrained collaborators for hard problems
- Create protected spaces where understanding must be built manually
- Judge success by sustained capability and meaningful progress, not constant maximum output
- Preserve the experience of holding one difficult problem long enough to understand it

## Out of scope / unresolved

- A clean final answer about the right long-term balance
- Quantitative measurement of productivity versus learning loss
- A universal workflow for other engineers
- Organization-level effects on teams, review, and coordination
- Whether model capabilities will make the proposed boundaries obsolete
- Evidence that the planned habits will restore focus

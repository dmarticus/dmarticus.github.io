# Spinning the Wheel — distilled outline

## Core claim

- Agentic coding has crossed a personal threshold
  - no longer seeking balance
  - most implementation now delegated
  - roughly 80% agent work, 20% edits and touchups
- The new workflow is unusually fun and productive
- The same workflow resembles a casino
  - low-effort prompts
  - variable rewards
  - repeated anticipation
  - progress-shaped dopamine
- Central unresolved question
  - whether judgment around agent output still constitutes craft
  - whether speed and enjoyment are purchasing leverage with lost understanding

## What changed

- Earlier position
  - faster output
  - weaker learning
  - active search for balance between leverage and atrophy
- Current position
  - full commitment to Claude Code and Conductor
  - parallel sessions across worktrees
  - agent output as the default implementation path
  - human work concentrated in prompting, monitoring, merging, and correction
- Causes of the shift
  - refined personal setup
  - better orchestration tools
  - stronger models
  - personal comfort with the modality

## The casino loop

1. Send a prompt
2. Wait while the agent works
3. Anticipate an uncertain result
4. Inspect the reward
5. Repeat at negligible activation cost

- Two failure modes during the wait
  - watch continuously and remain inside the reward loop
  - switch to Slack or another task and fragment attention
- Accumulated effects
  - repeated daily fatigue
  - immediate reward separated from delayed maintenance cost
  - apparent movement without guaranteed understanding
- Darker interpretation from Ryan Broderick
  - engagement loop monetized more reliably than finished work
  - sensation of building substituted for completed, understood output
- Author’s qualification
  - rejection of the fully pessimistic interpretation
  - acceptance that the loop is genuinely seductive

## Comprehension debt

- Agent-generated code can enter the codebase faster than human understanding
- Explanations provide short-term clarity
- Explanation plus delegated implementation may not create durable knowledge
- Delayed liabilities
  - weaker system mental models
  - harder debugging months later
  - uncertainty about why decisions were made
  - reduced ability to reproduce or teach the work
- Open question
  - whether assisted understanding compounds like implementation-earned understanding

## Why the workflow is compelling

- Energy management as the relevant constraint
  - drained attention limits useful work more than available hours
- Drudgery removed
  - compiler-error transcription
  - boilerplate
  - repetitive fill-in-the-blank implementation
- Human attention redirected toward
  - choosing what to build
  - shaping the solution
  - judging output quality
- Emotional gains
  - fewer prolonged dead ends
  - easier positive progress
  - less frustration
  - more momentum
- Agent tenacity
  - repeated attempts without fatigue or discouragement
  - former personal stamina bottleneck reduced
  - persistence itself experienced as motivating

## How the work is being reorganized

### Contemplative mode

- Slow
- Focused
- Define goals
- Identify edge cases
- Specify success criteria
- Build the reward function
- Decide what correctness means before implementation

### Execution mode

- Fast
- Frenetic
- Parallel
- Launch agents
- Monitor trajectories
- Triage results
- Merge acceptable output
- Re-plan when work goes sideways

### Key shift

- From imperative direction
  - detailed instructions for how to perform the work
- Toward declarative specification
  - desired outcomes
  - constraints
  - acceptance criteria
  - observable success

## Planning pattern

- Complex work begins in plan mode
- Planning receives more human effort than implementation
- Possible adversarial review
  - one agent drafts the plan
  - another evaluates it from a staff-engineer perspective
- Failure response
  - stop pushing a degraded approach
  - return to planning
  - revise assumptions and direction
- Goal
  - front-load human thought
  - make one-shot agent execution more reliable

## What still matters for frontend work

- Taste
  - immediate recognition of whether an interface feels right
  - judgment about coherence and interaction quality
- Iterative refinement
  - repeated passes over rough edges
  - finer adjustments after initial generation
- Division of labor
  - agent produces the component
  - human performs the final “sanding”

## What still matters for backend work

- Robust test harnesses
- Types that encode invariants
- Property-based tests
  - specify behavior that must always hold
  - generate broad edge-case coverage
- Acceptance criteria before generation
- Shift in craft
  - less direct code production
  - more precise specification of correct behavior

## Why domain expertise becomes more valuable

- Familiar systems
  - bad trajectories recognizable almost immediately
  - implicit constraints already known
- Unfamiliar systems
  - wrong assumptions can run longer before detection
  - apparent progress is harder to evaluate
- Current model failure pattern
  - fewer trivial syntax errors
  - more subtle conceptual errors
  - unchecked assumptions compounded through implementation
- Human role
  - watch for known failure shapes
  - interrupt early
  - prevent local mistakes from becoming system-level mistakes
- Distinction
  - AI can accelerate learning in a new domain
  - effective high-leverage delegation still depends on existing expertise

## Emerging working model

1. Define the goal
2. Specify success criteria and edge cases
3. Encode correctness in tests, types, and invariants
4. Produce and review a plan
5. Delegate mechanical execution
6. Monitor for familiar failure modes
7. Stop and re-plan at the first meaningful deviation
8. Evaluate with taste, rigor, and domain knowledge
9. Sand the result before shipping

### Optimize for

- human attention on consequential choices
- explicit definitions of correctness
- early detection of wrong assumptions
- reduced implementation drudgery
- sustained energy and momentum
- genuine cognitive engagement

### Do not optimize for

- maximum number of simultaneous spins
- passive watching
- constant context switching
- output volume without comprehension
- explanations mistaken for durable learning
- speed treated as proof of skill

## Evidence that the concern is real

- Anthropic randomized experiment
  - weaker conceptual understanding with AI assistance
  - weaker code-reading ability
  - weaker debugging ability
  - no significant average efficiency gain
- Protective interaction pattern
  - active cognitive engagement
  - learning preserved when the developer continued doing substantive thinking
- Implication
  - AI-supported output does not automatically produce competence
  - workflow design determines whether leverage also erodes skill

## What craft might mean now

- Candidate surviving components
  - taste
  - rigor
  - expertise
  - specification
  - evaluation
  - correction
- Traditional craft standard
  - understand each decision
  - reproduce the work
  - explain the work
  - teach the work
- Problem
  - mostly agent-written output does not consistently satisfy that standard
- Convenient alternative story
  - judgment replaces execution as the new craft
- Reason for skepticism
  - the story also protects continued access to speed and fun
  - usefulness to the author does not establish its truth

## Tensions worth preserving

- The workflow is energizing and exhausting
- Agent output can be real progress and simulated progress
- Explanations can clarify immediately without creating durable knowledge
- Removing drudgery exposes creative work while removing a source of learning
- Agent tenacity expands capability while intensifying the reward loop
- Parallel execution increases throughput while fragmenting attention
- Existing expertise enables delegation while delegation may weaken future expertise
- Judgment may be an evolved form of craft or a rationalization for losing craft
- Vigilance may be necessary without being sufficient
- Research validates the concern without supplying a practical stopping rule

## Likely conclusion

- No return to pre-agent development
  - tools too capable
  - work too enjoyable
- No confident declaration that the new modality is still craft
- Best available posture
  - front-load thought
  - preserve cognitive engagement
  - encode correctness
  - retain taste, rigor, and expertise
  - monitor personal comprehension debt
  - remain suspicious of speed as a reward
- Final stance
  - continued participation
  - unresolved concern
  - sustained attention to what the workflow is changing

## Out of scope / separate post

- Full Claude Code and Conductor setup
- Detailed multi-worktree operating procedure
- Organizational policy for agent-assisted development
- Long-term measurement of comprehension debt
- A settled definition of agent-era craft
- Training practices for novices who lack domain expertise
- Concrete threshold for when to stop delegating and write code directly

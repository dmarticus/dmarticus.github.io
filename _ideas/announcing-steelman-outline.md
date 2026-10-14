# Announcing Steelman — distilled outline

## Core claim

- Default AI chat interactions make users more comfortable with existing beliefs
  - validation
  - polishing
  - extension of unexamined assumptions
- Better role for AI in decisions
  - challenge reasoning
  - expose weak claims
  - structure reflection
  - leave judgment and authorship to the human
- Steelman as the product bet
  - deliberate adversarial friction
  - stronger decisions rather than faster opinion generation
- Product status tension
  - announced in closed beta
  - later moved into maintenance mode
  - no longer actively maintained as of October 13, 2026

## The decision-making problem

- Hard decisions often begin with
  - strong prior belief
  - incomplete confidence
  - hidden assumptions
- High-value challenge
  - unexpected question
  - forced revision
  - sharper argument after defense
- Human challenge does not scale cleanly
  - right interlocutor not always available
  - right timing not guaranteed
  - people avoid voluntary friction
- Common substitute
  - ask an AI
  - receive affirmation
  - gain confidence without testing the premise
- Desired emotional result
  - less comfort before commitment
  - more clarity about what could make the position fail

## What Steelman does

- Input
  - user-stated position
  - stronger results from detailed context, constraints, prior art, and rationale
- Domain range claimed
  - technical architecture
  - public policy
  - essay arguments
  - other defensible positions
- Output
  - decomposed claims
  - escalating challenges
  - tracked claim status
  - human-authored Decision Record
  - falsification criteria

## Stage 1: claim decomposition

- Separate the position into
  - empirical claims
    - verifiable as true or false
  - value judgments
    - priorities
    - tradeoffs
- Benefit
  - reveal load-bearing components
  - distinguish factual disagreement from preference disagreement
  - make hidden structure inspectable
- Author’s strongest product affinity
  - decomposition as the most clarifying part of the flow

## Stage 2: adversarial challenge

- Three rounds
- Escalating personas
- Focus on the weakest parts of the argument
- User responsibility
  - defend the position directly
  - answer rather than outsource the answer
- AI responsibility
  - assess whether each response addresses the challenge
  - update the status of affected claims
- Intended effect
  - pressure rather than affirmation
  - revision under structured opposition

## Stage 3: Decision Record

- Refined position
- Challenges encountered
- Claims that survived
- Claims that failed or weakened
- Falsification criteria
  - observable conditions for changing one’s mind
- Authorship constraint
  - final words remain the user’s
  - tool does not generate the user’s opinion

## Decision loop

1. State a specific position
2. Supply context, constraints, prior art, and rationale
3. Decompose empirical claims and value judgments
4. Target weak points with escalating counterarguments
5. Defend the position in the user’s own words
6. Assess whether the defense addresses each challenge
7. Update claim status
8. Refine the position
9. Define conditions that would reverse it
10. Preserve the reasoning in a Decision Record

## The design boundary

### AI may

- decompose
- mirror
- challenge
- assess responses
- track structure
- organize the record

### AI may not

- decide what matters
- choose what the user believes
- author the final position
- substitute generated opinions for human judgment

### Purpose of the boundary

- prevent outsourced meaning-making
- retain subjective judgment with the person
- use machine capability for non-meaning-making structure and pressure
- make the user perform the decisive cognitive work

## Why the default AI interface is insufficient

- Sycophantic interaction pattern
  - accept the premise
  - add modest caveats
  - help elaborate the position
- User-level risk
  - outsourced thinking
  - polished assumptions
  - comfort mistaken for rigor
  - confidence rising faster than accuracy
- Broader UX critique from Vaughn Tan
  - conversational interface creates the appearance of a meaning-making entity
  - tool boundaries become psychologically blurred
  - subjective human work and machine-suitable work should remain legible
- Steelman’s answer
  - replace automatic agreement with structured objection

## Underlying model of good AI-assisted decisions

- Humans retain
  - values
  - priorities
  - belief formation
  - interpretation
  - final judgment
- Machines provide
  - decomposition
  - consistency of challenge
  - repeatable friction
  - structured records
- Quality comes from
  - specificity of initial input
  - seriousness of human defense
  - willingness to revise
  - explicit falsification conditions
- Failure mode to avoid
  - generated certainty without examined assumptions

## Technical implementation

- Next.js application
- Claude for structured generation
- Vercel AI SDK integration
- Supabase persistence
- Tailwind UI
- Zod schemas for constrained model output
  - claim objects
  - challenge objects
  - assessment objects
- Product goal of schemas
  - predictable multi-round state
  - less vibes-based flow
  - more deterministic interaction structure

## Initial audience and validation target

- People making frequent high-stakes decisions
  - engineering managers
  - staff-plus engineers
  - architects
  - founders
  - policy professionals
  - argument-focused writers
- Initial persona bias
  - infrastructure
  - systems decisions
- Expansion ambition
  - more domains
  - broader adversarial persona set
- Validation method
  - real-user feedback
  - compare product assumptions against actual reasoning habits
- Author’s priority
  - user evidence over solitary speculation about what to build

## Product lifecycle

### At announcement

- Closed beta
- Waitlist-based access
- Active iteration
- Explicit request for user feedback
- Planned persona expansion

### Later update

- Maintenance mode as of October 13, 2026
- No continued active maintenance
- Retrospective characterization
  - useful experiment
  - first substantial AI-product project
- Missing explanation
  - no stated reason for winding down
  - no reported outcome data

## Tensions worth preserving

- AI is used to counter harms created by default AI interaction
- Adversarial challenge can sharpen judgment while still relying on model-generated framing
- Human authorship is preserved even though AI selects claims and weak points
- Structured schemas improve predictability without making the underlying reasoning deterministic
- The tool claims broad argument coverage while initial personas favor infrastructure and systems work
- More input specificity improves challenge quality but raises the effort required before value appears
- Discomfort is treated as useful without proof that greater discomfort yields better decisions
- The product rejects opinion generation while the AI still evaluates whether defenses are adequate
- Real-user feedback was treated as essential, but no findings from that feedback are presented
- Strong conceptual conviction coexists with a product that later entered maintenance mode

## Likely conclusion

- Continued AI use for thinking is assumed
- Central choice
  - AI that increases confidence
  - AI that improves reasoning quality
- Steelman’s wager
  - challenge is more valuable than agreement
  - explicit weak points are more valuable than polished premises
  - falsifiability is more valuable than unconditional confidence
- Human responsibility remains irreducible
  - decide what matters
  - defend beliefs
  - revise when warranted
  - own the final record
- Product-specific conclusion after the update
  - experiment ended as an actively developed service
  - design thesis remains distinct from the product’s maintenance status

## Out of scope / separate post

- Evidence that Steelman improves real-world decision quality
- Results from beta users
- Accuracy or bias of claim decomposition
- Evaluation of adversarial persona quality
- Privacy and security treatment for sensitive decisions
- Pricing or business model
- Reason the product entered maintenance mode
- Detailed technical architecture beyond the named stack
- Comparison with human review, debate, or red-team processes
- Method for resolving cases where the AI assessment is itself wrong

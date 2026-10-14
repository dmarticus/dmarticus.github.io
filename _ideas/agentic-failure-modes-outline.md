# Agentic Failure Modes — distilled outline

## Core claim

- LLM-assisted work has two recurring failure modes
  - edge failure
    - agent reaches a directionally correct result
    - human judgment is needed for fit and finish
  - foundational failure
    - agent executes a coherent plan toward the wrong destination
    - domain judgment is needed before implementation begins
- The two modes require opposite allocations of human attention
  - defer polish for directional work
  - front-load scrutiny for deep-domain work

## Failure mode 1: long-tail implementation churn

- Common shape
  - output compiles
  - tests pass
  - feature structure is correct
  - final experience still feels wrong
- Typical defects
  - visual spacing
  - loading behavior
  - unnatural error copy
  - other details visible only in the finished artifact
- Root cause
  - fit and finish are emergent
  - the evaluator often cannot name the defect before seeing it
  - initial specifications cannot fully encode unknown taste judgments
- Failed response
  - expand the initial prompt until it anticipates every detail
- Why it fails
  - prompt complexity creates agent confusion
  - specification effort exceeds manual finishing effort
  - more upfront detail cannot eliminate discoveries made through use

## Response to long-tail churn

- Treat agent output as rough framing
  - require sound direction and structure
  - do not require final polish from the first pass
- Accept the first 90% as leverage
- Reserve human attention for the final 10%
- Avoid prompting past the point of diminishing returns
- Use fresh eyes to identify issues hidden during initial execution

## Failure mode 2: being misled by a plausible plan

- Common shape
  - domain familiarity is weak
  - important context is absent from the prompt
  - design appears coherent
  - code is clean
  - tests pass
  - implementation satisfies the wrong architecture
- Higher risk than edge failure
  - defects surface late
  - visible quality signals provide false confidence
  - implementation progress deepens commitment to a bad direction
- Result
  - not partial progress toward the goal
  - complete progress toward the wrong goal

## PostHog feature-flag example

- Goal
  - target person and group properties in one feature flag
  - connect two distinct entity types for evaluation
- Agent-supported work
  - schema design
  - queries
  - tests
  - reviewable pull request
- Hidden problem
  - new fields placed directly on the persons table
  - added ingestion load would not be operationally tenable
- Better architecture
  - join table
- Missing context
  - ingestion pipeline load profile
  - operational consequences not visible in local code or tests
- Outcome
  - code review caught the issue before production impact
  - first pull request had already committed effort to the wrong direction

## Response to foundational failure

- Slow down before implementation
- Identify load-bearing assumptions
  - which beliefs determine the architecture?
  - which errors would be catastrophic?
  - which constraints are missing from the prompt?
- Validate assumptions against domain knowledge
  - experienced people
  - reliable systems or documentation
  - structured pressure-testing tools
- Spend extra time on design when reversal costs are high
- Involve the agent only after the direction survives scrutiny
- Monitor execution more closely than in directional work

## Task classification before using an agent

- Directional-and-finish work
  - correct shape is easy to recognize
  - mistakes are local and cheap to repair
  - polish emerges after implementation
- Deep-domain-correctness work
  - hidden constraints determine viability
  - tests may not capture operational failure
  - a wrong decision creates expensive rework or risk
- Classification determines where human time goes
  - after execution for directional work
  - before execution for deep-domain work

## Directional-work loop

1. Group suitable tasks into a batch
2. Start agents in parallel
3. Disable interruption-heavy notifications
4. Record follow-up questions while agents run
5. Return when ready to review
6. Finish tasks one at a time
7. Give the final pass undivided attention

- Parallelism is useful for starting work
- Serial focus is necessary for finishing work
- HBR “brain fry” finding
  - switching among many agent threads increases cognitive fatigue
  - agent concurrency does not remove the human review bottleneck

## Deep-domain-work loop

1. Design before prompting
2. Surface assumptions and knowledge gaps
3. Ask what would make the approach catastrophically wrong
4. Pressure-test the plan with domain expertise
5. Use Steelman or an equivalent challenge process
6. Hand a validated direction to the agent
7. Review implementation with heightened attention

## Role of the last 10%

- One-shot completion is not the operating assumption
- Nearly finished work creates useful momentum
- Fresh attention improves final judgment
- Human finishing serves different purposes by task type
  - polish for edge failures
  - verification for foundational risks

## Emerging working model

### Before agents

- Classify the task by failure mode
- Estimate the cost of a wrong direction
- Front-load domain learning only where hidden constraints matter
- Decide what quality can emerge through later review

### With agents

- Use parallel execution for independent starts
- Avoid continuous thread switching
- Track questions rather than reacting immediately
- Watch deep-domain work more carefully

### After agents

- Review one result at a time
- Apply taste to directionally correct output
- Recheck load-bearing assumptions in high-risk output
- Finish deliberately rather than extending prompt churn

### Optimize for

- correct placement of human attention
- cheap iteration where errors are reversible
- early validation where errors are structural
- protected focus during final review

### Do not optimize for

- perfect first prompts
- one-shot completion
- maximum simultaneous review
- passing tests as sufficient proof of architectural correctness
- agent autonomy where domain context is incomplete

## Tensions worth preserving

- Agents can produce high-quality artifacts from unsound premises
- Passing tests can coexist with operationally dangerous design
- More prompt detail can reduce rather than improve performance
- Parallel execution creates leverage while parallel finishing creates fatigue
- Human involvement should move later for polish and earlier for architecture
- Accepting imperfect output can improve efficiency without lowering final quality
- Fresh eyes help both aesthetic judgment and structural skepticism

## Likely conclusion

- Diagnose the likely failure mode before delegating
- Let agents move quickly through directionally safe implementation
- Preserve human taste for the emergent final details
- Apply human judgment before execution when hidden domain constraints are decisive
- Do not use the same workflow for every kind of agent-assisted task

## Out of scope / separate post

- Exhaustive taxonomy of agent failure modes
- Detailed Steelman workflow
- Prompt templates for either task class
- Quantitative comparison of agent productivity
- Full treatment of code-review and testing strategy
- Tool-specific notification or orchestration setup

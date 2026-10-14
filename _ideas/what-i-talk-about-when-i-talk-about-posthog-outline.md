# What I Talk About When I Talk About PostHog — distilled outline

## Core claim

- Eighteen months at PostHog combined unusually meaningful autonomy and learning with costly production failures
- The same role supplied both the best opportunities and some of the hardest experiences of the author’s career
- The incidents changed more than the system
  - deepened operational judgment
  - tested personal resilience
  - demonstrated the company’s culture under pressure
  - led to a clearer team structure
  - contributed to a shift from platform work toward product work

## What made the role excellent

- Combination of autonomy, opportunity, and impact
  - interesting problems tied to the business
  - genuine freedom over solutions
  - regular excitement about the work
  - experience presented as rare rather than normal
- Feature flags span two kinds of engineering
  - high-scale, low-latency infrastructure
  - developer-facing product
- Breadth is a source of energy
  - evaluation service rewrite
  - product features
  - SDK improvements
  - developer experience

## Evidence of impact

- Rust rewrite of the feature flag evaluation service
  - reduced latency
  - improved reliability
- Production system serves billions of flag evaluations
- Work shipped at real scale rather than as a tutorial or side project
- Responsibilities affected both infrastructure and customer-facing surfaces

## Learning through production work

- Original career goal
  - write Rust professionally
- Earlier constraint
  - Rust appeared suitable for performance-critical work
  - previous startup’s stack and hiring concerns made adoption impractical
- Opportunity at PostHog
  - build and ship production Rust services
  - operate distributed systems
  - debug cascading failures
  - treat reliability as a discipline
- Learning mechanism
  - consequences from real systems
  - operational responsibility
  - repeated exposure to scale

## People and distributed culture

- High talent density creates productive intimidation
- Teammates are a continuous learning source
- In-person investment supports remote collaboration
  - team meetups
  - company-wide offsites
  - repeated contact across cities and countries
- Meetups are operational infrastructure, not only perks
  - build trust
  - build rapport
  - make later asynchronous work easier

## Hard constraint of the rewrite

- The feature flag service cannot use itself for safe feature-flagged rollout
- Every change reaches every customer immediately
- Constraint increased the need for pre-release confidence
  - extensive test harnesses
  - shadow testing infrastructure
  - behavior-validation tooling
  - careful rollout strategy
- Result
  - unusually disciplined engineering process
  - successful rewrite itself
  - incomplete anticipation of later production failure modes

## Incident evidence

- Late 2025 brought a cluster of outages
- October alone
  - four outages
  - more than fourteen hours of customer impact
- Failure modes discovered after the rewrite
  - CPU resource sizing problems
  - cascading failures
  - connection-pool exhaustion under load
  - retry behavior that amplified rather than contained failure
- Each incident produced learning
- Customers paid part of the cost of that learning

## Personal impact

- Poor sleep
- Strong sense of having failed customers
- Higher emotional weight because other developers depend on the service to ship their own products
- Time away from work became necessary
- Serious reconsideration of whether to continue doing this kind of work
- Hardest experience was not purely technical
  - knowing the service was broken
  - knowing customers were affected
  - not yet knowing the cause

## Cultural response to failure

- Leadership reached out directly when support was needed
- Contact mattered partly because it was unusual
- Blameless post-mortems held up under real pressure
- Central question
  - not who caused the incident
  - what conditions allowed it
- Effect
  - failure remained painful
  - learning remained possible
  - individual shame did not replace systems analysis

## Operational lesson

- Debugging technique was only part of the growth
- Uncertainty management became a learned capability
  - remain functional before the cause is known
  - investigate methodically
  - resist panic
- Reliability learning includes emotional and procedural discipline, not only technical knowledge

## Team structure before the incidents

- One feature flags team
- Sprawling scope
  - SDKs
  - product UI
  - platform infrastructure
- Competing responsibilities limited depth and focus

## Team structure after the incidents

- Flags Platform team led by Phil Haack
  - performance
  - reliability
  - architecture
- Feature Flags product team led by the author
  - configuration UI
  - cohorts
  - early access features
  - SDKs
- Split enables each team to specialize without constant competition between platform and product priorities

## Why the author is changing focus

- Hired as a product engineer
- Spent the first eighteen months primarily on platform work
  - Rust
  - performance
  - reliability
  - infrastructure
- Pride and enjoyment in the platform work remain intact
- Desire for change is additive rather than a rejection of the previous work
- New direction
  - closer contact with users
  - more direct attention to business impact
  - product engineering leadership

## Product opportunity

- Feature flags already show stickiness
- Stickiness is meaningful for a product that is not necessarily used every day
- Activation remains weaker than desired
- Funnel gap
  - users express interest during onboarding
  - fewer users ultimately adopt the product
- Central product question
  - why interested users bounce before activation
- Desired outcome
  - effortless trial
  - clear value
  - PostHog as the obvious choice for teams that need feature flags and insight into their effects

## Product learning loop

1. Observe expressed interest during onboarding
2. Measure the drop before actual use
3. Investigate why prospective users leave
4. Remove friction from trying the product
5. Improve activation
6. Strengthen the product’s position for teams that need both flags and behavioral understanding

## Emerging working model

### For reliability work

- Assume production exposes failure modes pre-release validation will miss
- Build safeguards for a service that cannot roll itself out behind a flag
- Analyze enabling system conditions instead of assigning individual blame
- Separate scopes when one team cannot give platform and product concerns sufficient depth

### For product work

- Move closer to users and business outcomes
- Treat onboarding intent without activation as an opportunity to understand friction
- Combine technical depth with developer experience
- Accept more ambiguity and less direct control over success metrics

### For career growth

- Seek work with real autonomy and consequences
- Learn through production responsibility
- Let difficult experiences reveal the next capability to develop
- Change focus without devaluing prior work

## Tensions worth preserving

- The rewrite improved latency and reliability, yet its unanticipated failure modes contributed to severe outages
- Extensive validation produced disciplined engineering but could not eliminate production surprises
- Every incident taught the team something, but customers bore real harm while that learning happened
- Autonomy creates meaningful impact and meaningful responsibility when systems fail
- The hardest part of an infrastructure crisis can be uncertainty rather than debugging
- Blamelessness does not erase accountability or emotional cost
- Distributed work benefits from deliberate, expensive in-person contact
- The author loved platform engineering and is still choosing to move away from it
- Product work offers closer business impact but more ambiguity and less control over outcomes
- Team specialization improves focus while formally separating concerns that still belong to one product

## Hiring coda

- Platform role
  - backend engineers
  - Rust
  - distributed systems
  - reliability at high request volume
- Product role
  - product engineers
  - developer experience
  - user-loved features
  - intersection of product judgment and technical depth
- Recruiting pitch is grounded in the opportunities and difficulties described in the reflection

## Likely conclusion

- PostHog’s value as a workplace comes from meaningful freedom, high-impact problems, strong peers, and a culture that remains supportive during failure
- Production incidents were costly and personally destabilizing, but they produced technical, organizational, and emotional growth
- The next chapter shifts from making the platform reliable to making the product easier to adopt and more valuable to users
- The author remains committed to PostHog while redefining the kind of impact to pursue there

## Out of scope / separate post

- Full technical chronology of each outage
- Detailed remediation work after the incidents
- Architecture of the Rust evaluation service
- Exact shadow-testing and validation design
- Specific activation rate or funnel metrics
- User research findings about onboarding drop-off
- Planned product experiments
- Detailed management approach for the new product team
- Broader comparison with previous employers
- Long-term career direction beyond the next role shift

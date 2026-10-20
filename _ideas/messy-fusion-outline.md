# Messy Fusion — distilled outline

## Core claim

- Bad technical choices are survivable when surrounding systems can still learn and change
- Lock-in emerges when dependencies spread until boundaries stop containing change
- Relevant boundaries separate
  - implementation from public interface
  - state from service behavior
  - one deployment unit from another
  - technology from institutions, labor, finance, and customers
- Boundaries that hold let one layer change while others remain stable
- Collapsed boundaries turn local correction into system-wide transformation
- The decisive question
  - not only whether a choice is correct
  - what else must move if the choice becomes wrong

## British industrial puzzle

- Shipbuilding
  - Britain launched nearly 80% of global shipping tonnage around 1900
  - Britain built no commercial ships in 2023
- Nuclear power
  - Britain operated more reactors than the US, USSR, and France combined by 1965
  - Hinkley Point C became the world’s most expensive power plant
  - cost estimated near six times a comparable Korean reactor
  - more than thirteen years of construction before power generation
- Incomplete explanation
  - Britain selected the wrong reactor and production model
- Stronger explanation
  - technical choices became inseparable from systems unable to adapt

## Nuclear evidence: repetition mattered more than reactor purity

- British choice
  - AGR instead of the globally standardized American PWR
  - greater complexity
  - early defects
  - Dungeness B as emblematic delay and cost failure
- Evidence against technological determinism
  - later AGR projects repeated a shared design
  - Heysham 2 and Torness built in roughly eight years
  - costs within about 5% of estimate
- Learning mechanism
  - fewer bespoke stations
  - convergence among construction consortia
  - repetition made a difficult design manageable
- Inverse case
  - Sizewell B used the de-risked PWR design
  - broader British delivery capacity still deteriorated
- Implication
  - reactor choice affected project difficulty
  - repeatable delivery determined program viability

## Shipbuilding evidence: a rational model became immovable

- Common diagnosis
  - labor-intensive
  - undercapitalized
  - slow to mechanize
- Why the old model once made sense
  - custom-order market
  - physically cramped yards
  - limited capital
  - cyclical demand
  - familiar ships for familiar domestic owners
  - low fixed-cost preference
- Market shift
  - larger standardized vessels
  - welded prefabricated blocks
  - heavier equipment
  - tighter production planning
- Performance gap
  - British output grew 18% from 1947 to 1957
  - global output grew more than 300%
- Why modernization was not local
  - yards required physical reconstruction
  - craft demarcations constrained labor changes
  - finance favored the existing model
  - demand still centered on custom British orders
- Implication
  - tools alone could not modernize the industry
  - the boundary between production architecture and the surrounding business had collapsed

## Shared lesson from the British cases

- Nuclear entanglement
  - reactor design
  - delivery system
  - public legitimacy
- Shipbuilding entanglement
  - production methods
  - yards
  - labor
  - finance
  - demand
- Reversibility depends on boundaries that hold
  - one layer can move while others remain stable
- Irreversibility grows as boundaries collapse
  - dependencies propagate from one layer into the next
  - every correction requires coordinated movement across the system

## Coupling, fusion, and lock-in

- Coupling
  - layers constrain one another
  - often necessary to create a functioning artifact
- Fusion
  - boundaries between layers collapse
  - changes propagate beyond their original layer
- Lock-in
  - fusion becomes lock-in when dependencies spread beyond any affordable boundary
  - dependencies extend past the artifact
  - no affordable local correction remains
- Evaluation shift
  - from whether the original decision was right
  - to whether the system preserves a path to change it

## Critical Design Review as bounded coupling

- Before CDR
  - architecture remains adjustable
  - implementation options remain open
  - interfaces can move
  - supply choices are not fully committed
- At CDR
  - parts ordered against current geometry
  - tooling cut to current tolerances
  - interface assumptions become physical constraints
  - budget, procurement, and lead times commit to one shape
- After CDR
  - changing one layer requires paying to change connected layers
- Why this is not automatically lock-in
  - dependency boundaries are visible
  - change costs are legible
  - teams consciously accept the coupling to build a physical object
- Hardware reality
  - reach, battery, runtime, enclosure, heat, wiring, mass, and price interact
  - implementation and interface often occupy the same physical form

## How boundaries collapsed in the British cases

- Shipbuilding lost internal separability
  - production method, yard layout, labor model, finance, and customers could no longer change independently
  - modernization required whole-system replacement
- Nuclear lost external containment
  - one reactor decision expanded into safety, legitimacy, and enterprise-wide debate
  - Sizewell B inquiry lasted 340 days
- Shared failure
  - technical decisions became social and institutional commitments without a bounded correction path

## Why software is easier to change

- Software is primarily information architecture
  - code
  - interfaces
  - state
  - expectations
- Most changes move symbols and behavior
- Boundaries that hold preserve local change
  - implementation changes behind a stable interface
  - callers continue working
  - state moves without breaking consumers
- Difference from hardware
  - fewer atoms, suppliers, and physical tolerances must move

## How software hardens into infrastructure

- Schema with production data
- API with customer integrations
- deployment relationship among services
- observable behavior depended on by unknown callers
- Information becomes hard to move once other systems coordinate around it
- State is the closest software analogue to atoms
  - billions of rows form an installed base
  - moving data remains physical and operational work

## Constraint on LLM acceleration

- Models reduce implementation cost inside a boundary that already holds
- Models help less with
  - deciding which contract may change
  - proving compatibility
  - migrating state
  - shifting traffic safely
  - coordinating active users and services
- Flag-evaluation rewrite evidence
  - Django service moved to Rust in about seven months
  - current models could likely accelerate code production
  - dominant work was preserving externally visible behavior
- When boundaries hold
  - faster implementation creates larger gains
- When boundaries collapse
  - faster implementation can accelerate the spread of coupling

## Software failure patterns

- Data boundary collapse
  - schema, service behavior, and rollout can no longer change independently
  - database migration expands into service rewrite and rollout
- Hyrum’s Law
  - every observable behavior can become a dependency
  - accidental behavior hardens into contract
- Distributed monolith
  - services are separated by network
  - deployment and failure remain coupled
- Refactoring limit
  - useful inside a boundary
  - insufficient when dependency crosses boundaries
- Required work beyond generation
  - interface design
  - migration planning
  - compatibility policy
  - operational discipline

## CUDA as a hybrid case

- Physical layer
  - GPU performance
  - memory bandwidth
  - chip supply
  - export controls
- Information layer
  - programming model
  - optimized libraries
  - compiler tooling
  - driver contract
- Durable switching cost
  - developer surface
  - mature ecosystem
  - nearly two decades of accumulated tooling and usage
- NVIDIA’s architectural advantage
  - silicon changes beneath a relatively stable interface
  - users keep continuity across hardware generations
  - implementation remains flexible below the contract
- Result
  - hardware gains a software-like durable interface

## How NVIDIA protects the interface

- Competitor path 1
  - preserve CUDA compatibility
  - run existing workloads on non-NVIDIA hardware
  - compete below the established interface
- Foreclosure mechanism
  - license restrictions on translation layers since CUDA 11.6 documentation
  - ZLUDA removal after demonstrating CUDA execution on other hardware
- Strategic meaning
  - abstraction could enable implementation substitution
  - licensing prevents competitors from using that property against NVIDIA

## China’s parallel-stack strategy

- Competitor path 2
  - build a separate hardware and software ecosystem
- Core stack
  - Huawei Ascend hardware
  - CANN software
- Ecosystem requirements
  - tooling
  - framework integrations
  - developer adoption
  - real workloads
  - enough demand to force maturation
- Analogy to successful national infrastructure
  - political backing
  - coordinated approvals
  - predictable demand
  - supportive industrial base
- Chinese policy supports those conditions
  - pressure on domestic firms to avoid NVIDIA
  - CANN open-sourcing and co-construction
  - export controls redirecting workloads toward domestic alternatives

## Export controls as second-order software policy

- US restrictions
  - H100 and A100 controls in 2022
  - H800 and A800 workaround closed in 2023
  - newer parts kept inaccessible
- First-order effect
  - hardware access constrained
- Second-order effect
  - captive demand for domestic accelerators and tooling
  - protected adoption environment for a rival software stack
- H200 episode
  - US later allowed approved sales with a 25% surcharge
  - Beijing delayed imports
  - domestic-purchase pressure continued
- Strategic implication
  - NVIDIA access became less attractive when it threatened domestic ecosystem formation
  - China’s rival-stack policy moved from aspiration to active preference

## The target abstraction may be moving upward

- Current moat
  - CUDA remains real and load-bearing
- Emerging developer behavior
  - many developers target PyTorch or other frameworks
  - fewer write directly to CUDA
- Possible shift
  - portability moves into frameworks and compilers
  - driver-level CUDA versus CANN becomes only one layer of competition
- NVIDIA response
  - compiler-level work defends the interface above the traditional driver surface
- Forecasting constraint
  - outcome depends on which abstraction developers ultimately target
  - current CUDA dominance does not prove permanent control of the developer-facing interface

## Reversibility test

1. Identify the technical decision
2. Locate its interfaces, state, and deployment boundaries
3. List every surrounding system coordinated around it
4. Ask what must move if the decision changes
5. Separate local, bounded costs from system-wide dependencies
6. Preserve a stable contract where implementation may need replacement
7. Plan migration and compatibility before coupling spreads
8. Re-evaluate which abstraction layer users actually target

## Emerging working model

### Preserve local change

- Keep interfaces stable where possible
- Allow implementation replacement below the contract
- Isolate state movement
- Make deployment boundaries real rather than nominal
- Keep coupling visible and bounded

### Treat these as warning signs

- one schema change requires multiple service rewrites
- operational rollout dominates implementation
- accidental behavior has external dependents
- institutions or customers must change alongside technology
- migration requires synchronized movement of the full system

### Use LLMs where they create leverage

- implementation within boundaries that already hold
- refactoring that does not cross contracts
- code production after migration constraints are understood

### Do not expect LLMs to remove

- compatibility obligations
- installed-state movement
- operational risk
- institutional coordination
- ecosystem adoption requirements

## Tensions worth preserving

- A difficult technology can succeed through repetition, while a standard technology can fail without delivery capacity
- Britain’s old shipbuilding model was rational before it became constraining
- Hardware coupling is necessary; unbounded coupling is the failure
- Software is intrinsically easier to alter, but coordinated dependencies make it infrastructure
- Faster implementation raises productivity and can produce entanglement faster than teams understand it
- Stable interfaces enable competition, while NVIDIA preserves its moat by restricting interface compatibility
- Export controls weaken access to leading chips and strengthen demand for a rival ecosystem
- CUDA is currently durable, while the strategically important interface may be moving above it
- Code can be rewritten quickly; users, state, contracts, and processes cannot

## Likely conclusion

- Technical quality alone does not determine long-term adaptability
- Architecture should be judged by the cost and scope of reversing it
- The most valuable boundaries contain change: they let implementations change without moving the whole surrounding system
- LLM productivity remains bounded by migration, compatibility, and operational coordination
- Control of the interface that workloads target creates strategic power
- Preserve reversibility before dependencies harden beyond the artifact

## Out of scope / separate post

- Complete history of British industrial decline
- Detailed nuclear-reactor comparison
- Hardware CDR process guide
- Step-by-step software migration playbook
- Quantitative benchmark of LLM implementation gains
- Prediction that CANN will defeat CUDA
- Final forecast of the framework or compiler layer that will control portability

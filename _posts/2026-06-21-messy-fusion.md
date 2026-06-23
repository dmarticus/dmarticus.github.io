---
title: "Messy Fusion"
layout: post
tags: [engineering, software, ai, geopolitics, systems]
post_summary: "How did Britain go from launching most of the world’s ships and reactors to building neither? Bad technology choices are survivable; what sinks you is the system around them hardening until every correction becomes a system-wide one. I trace that failure mode from British industry into software rewrites, the real ceiling on LLM productivity, and the CUDA moat."
---

At the turn of the 20th century, British shipyards launched something close to eighty percent of worldwide shipping tonnage.[^uk-shipbuilding] Yards like John Brown, Swan Hunter, and Harland & Wolff supplied much of the world's merchant fleet.

In 2023, Britain built zero commercial ships.[^uk-shipbuilding]

Britain's nuclear story follows the same pattern. By 1965 Britain had more operating reactors than the United States, the Soviet Union, and France combined.[^uk-nuclear] It had, more or less, helped create the nuclear power industry. Today its flagship project is Hinkley Point C: the most expensive power plant ever built, roughly six times the cost of an equivalent Korean reactor,[^uk-nuclear] thirteen-plus years into construction before delivering a single watt.

So how did Britain manage to fumble this multi-generational industrial engineering bag?

The easy answer is that Britain made bad technical choices and then got stuck with them: the wrong reactor, the wrong production model. But wrong choices are survivable when the system around them can still learn. Britain's failure was that the systems around those choices hardened.

In other words, interfaces, state boundaries, and deployment boundaries are where dependencies accumulate. A bad architecture with clean seams can be replaced. A decent architecture with fused seams can become permanent.

---

In the 1960s, Britain backed the AGR (Advanced Gas-cooled Reactor) for its next generation of plants, while much of the rest of the world standardized on the American PWR (Pressurized Water Reactor). The AGR was more complex, and the early builds were defect-prone. Dungeness B became the emblem: years late, far over budget, and still used as shorthand for the failure of the whole program.[^uk-nuclear]

However, while AGR made individual projects harder, it didn't have to make a nuclear program impossible. The evidence is that Britain got better at building AGRs once it repeated the design – Heysham 2 and Torness were built in roughly eight years and came in within about five percent of estimate.[^uk-nuclear] The decisive change was repetition: Britain stopped treating each station as a bespoke project, and the construction consortia converged on a common design. The same difficult reactor became more manageable once the build system could learn.

Sizewell B shows the inverse. It was Britain's lone PWR, the design the rest of the world had already de-risked. If reactor type were the main constraint, moving from AGR to PWR should have fixed more than it did. Instead, Britain's nuclear buildout deteriorated around the supposedly correct design.[^uk-nuclear] Reactor design changed the difficulty of the work; repeatable delivery determined whether the program could survive.

Shipbuilding shows the same pattern from the other direction. British yards are often described as backward: labor-intensive, undercapitalized, and slow to mechanize.[^uk-shipbuilding] That description is true but incomplete. The labor-intensive model was a rational adaptation for decades. It matched Britain's custom-order market, cramped yards, and limited capital. These manufacturers built familiar ships for familiar owners in a cyclical market where keeping fixed costs low mattered.

The problem was that the market changed. Postwar shipbuilding moved toward larger standardized vessels, welded prefabricated blocks, heavier equipment, and tighter production planning. Between 1947 and 1957, British output rose only 18 percent while worldwide output rose more than 300 percent.[^uk-shipbuilding] Modernization meant rebuilding the production system, not just buying better tools — and that was exactly where Britain was constrained: many yards were physically cramped, labor was organized around craft demarcations, and the commercial model still depended on custom orders from British shipowners. The old production architecture was tied into the whole business.

These two cases point to the same conclusion. Technology choices matter, but they become lock-in through the systems that form around them. In nuclear, reactor design became entangled with delivery and legitimacy. In shipbuilding, production methods became entangled with yards, labor, finance, and demand.

The useful insight is in what makes that entanglement reversible or irreversible. Some systems preserve enough separation that one layer can change while the others hold still. Others collapse those layers together until every correction becomes a system-wide change.

---

Hardware engineering shows this collapse happening at a specific, scheduled moment called a Critical Design Review (CDR). A CDR is the point in a hardware project when the open design choices get fixed enough to build against. Before it, the layers are still separable: architecture, implementation, interfaces, supply. At the review they get locked together. Parts are ordered against the current geometry, tooling is cut for the current tolerances, and interface assumptions harden into physical constraints. After the CDR you can't move one layer without paying to move the others, because the budget, the lead times, and the procurement schedule have all been committed to a single shape.

That coupling isn't a failure of the process; it is the process. In physical systems the implementation and the interface tend to be the same thing. A robot's reach, its battery life, its runtime target, and its enclosure aren't independent knobs — they're dimensions, tolerances, heat, wiring, and mass that constrain one another. Change the motor and you may have to change the chassis, the power budget, and the price.

This is fusion in its most literal form — but fusion isn't yet _lock-in_. A CDR couples the layers on purpose: changing the geometry now means re-cutting tooling and re-running the budget, and you accept that because it's the price of building a real object. Coupling like this is bounded. You can see what moves with what, and you can pay for it.

Lock-in is coupling that has lost its edges. The dependencies keep spreading past the artifact until there's no bounded change left to make — every correction becomes a change to the whole system, and the bill is one nobody can pay. The useful question stops being whether a decision was right when it was made, and becomes whether the system still leaves a path to change it.

The British cases failed that test in opposite directions. Shipbuilding fused inward: the production model was bound up with the yards, labor, finance, and customers around it, so it could only change as a whole. Nuclear fused outward: the Sizewell B inquiry ran 340 days[^uk-nuclear] and expanded a single reactor decision into a referendum on safety, legitimacy, and the whole enterprise. In both, the technical choice mattered, but the irreversibility came from the coupling around it.

Software is supposed to be the exception.

---

Software is mostly information architecture: code, interfaces, state, and expectations. That is why it is easier to change than hardware; most software changes move symbols and behavior, not atoms or suppliers.

But information hardens once other systems coordinate around it. A schema with production data behind it, an API customers build against, or a deployment relationship between services stops being ordinary code and becomes infrastructure. Stable boundaries keep that infrastructure local: the interface holds while the implementation changes; callers keep working while state moves underneath them.

IMO, that's one of the constraints on LLM acceleration. Models make implementation cheaper inside a boundary, but they don't make it much cheaper to decide what the boundary may change, prove compatibility, migrate state, or shift traffic safely.

The flag-evaluation rewrite I worked on is a useful example of this characteristic.[^rust-rewrite] I moved a service from Django to Rust in about seven months, which felt fast at the time, and current models would probably make the implementation work much faster. But most of the work wasn't literally typing Rust; it was preserving externally visible behavior while the implementation changed.

Faster implementation helps most when boundaries are clean. When they are not, it can make fusion worse. A fused schema turns a database migration into a service rewrite and rollout. Hyrum's Law[^hyrums-law] turns observable behavior into contract. A distributed monolith gives you network-separated services that still change and fail as one unit.

State is where information architecture gets closest to atoms. Moving billions of rows is still moving an installed base, even if the installed base is data rather than steel.

Refactoring helps inside a boundary. Fusion crosses boundaries. Breaking it requires interface design, migration work, compatibility policy, and operational discipline — the parts code generation only partially helps with.

This is the software version of the British cases. Hardware lock-in moves atoms. Software lock-in moves dependencies. Once users, state, contracts, and processes have to move together, the system has lost the ability to adapt incrementally.

CUDA[^cuda] is the hybrid case: physical chips underneath, information architecture above, lock-in created by the way the two are fused.

---

At the bottom of the software engineering stack, the chips matter. Performance, memory bandwidth, supply, and export controls are real physical constraints. But CUDA's durable advantage comes from the stack wrapped around the hardware: the programming model, optimized libraries, compiler tooling, and driver contract developed over nearly twenty years. The switching cost is in the developer surface and the ecosystem behind it.

And NVIDIA's behavior reflects that structure. It treats hardware as an implementation detail beneath a durable interface. Each generation changes the silicon underneath CUDA while the programming surface stays stable enough for existing users to remain in place. That gives NVIDIA the software property hardware normally lacks: implementation flexibility below the contract and continuity above it. Competitors face the inverse. They cannot legally reproduce the same interface: the CUDA license has barred translation layers since the 11.6 docs,[^cuda-eula] and ZLUDA was pulled down after demonstrating CUDA code running on non-NVIDIA hardware.[^zluda]

A theoretical challenger has two basic paths.

The first is CUDA compatibility: run CUDA workloads on non-NVIDIA hardware and compete below the existing interface. This is what software abstraction is supposed to make possible — preserve the developer surface, swap the implementation underneath. NVIDIA has worked to foreclose that path through licensing.

The second is a parallel stack. Huawei's Ascend hardware and CANN software stack are the clearest example. CANN has existed since 2018 and is now being open-sourced,[^cann-os] with Huawei describing the goal as becoming the "neutral steward of a unified AI software ecosystem."[^cann-os] This is an ecosystem project: tooling, framework integrations, developer adoption, and enough real workloads to force the stack to mature. The software cannot mature in the abstract. It needs chips under it and users on top of it.

The comparison to national infrastructure matters here. Successful nuclear buildouts needed political backing, coordinated approvals, predictable demand, and a supportive industrial base.[^uk-nuclear] A rival compute stack needs analogous conditions. China is trying to assemble them through policy.

The policy pieces are visible. The CAC is pushing domestic firms away from NVIDIA hardware.[^cac-ban] CANN is being open-sourced as a co-construction project meant to pull a fragmented domestic accelerator market toward one software layer.[^cann-coconstruction] Export controls create demand by routing workloads toward domestic alternatives.

The H200 episode shows the mechanism. The United States restricted H100 and A100 exports in 2022,[^h100-controls] closed the H800/A800 workaround in 2023,[^h800-controls] and kept newer parts such as B200 out of reach. Those restrictions acted on hardware, but their second-order effect was software adoption: they protected demand for domestic accelerators and tooling. When Washington later allowed H200 sales to approved Chinese customers with a 25 percent surcharge,[^h200-relaxation] Beijing slow-walked imports and continued urging firms to buy domestic.[^h200-slowwalking] The strategic preference had changed: access to NVIDIA chips was less valuable if it weakened the domestic stack China had been forced to build.

There is an important caveat. The decisive seam may be moving upward. Most developers write to frameworks such as PyTorch rather than directly to CUDA. If portability increasingly lives in framework and compiler layers, then the driver-level fight between CUDA and CANN is only part of the story. The more important question becomes who controls the abstraction layer developers actually target.

NVIDIA appears to recognize this. Its recent compiler-level work is best understood as defending the seam above the traditional CUDA driver layer, beyond the old CUDA surface. The CUDA moat remains real and load-bearing today. At the same time, the location of the relevant interface may be changing, which makes any simple forecast fragile.

The narrower point is enough: export controls supplied demand and a captive user base for a rival stack; China is trying to assemble the rest of the ecosystem; and Beijing's slow-walking of H200 imports shows that the domestic-stack strategy has moved from theory into policy. Whether that ultimately counts as a backfire depends on how the higher-level framework seam develops.

---

The question is the same at every scale: not just whether a technical choice is right, but what has to move if it turns out wrong. A decision stays reversible when it can be changed locally. It becomes lock-in when the surrounding system has to move with it.

LLMs don't meaningfully move the needle on this constraint. Faster implementation helps, but code is only one layer – the hard work is preserving correctness and compatibility while changing the system underneath active users. If anything, faster implementation raises the stakes: teams can now create coupling faster than they can understand it.

CUDA is the same lesson at strategic scale. The chips set the physical floor, but the developer interface decides which chips workloads can realistically use. Whoever owns that seam owns the system around it.

---

[^uk-shipbuilding]: Brian Potter, Construction Physics, ["How the UK Lost its Shipbuilding Industry."](https://www.construction-physics.com/p/how-the-uk-lost-its-shipbuilding) Source for the UK shipbuilding figures and the Lorenz account of the industry's labor-intensive production model.

[^uk-nuclear]: Tim Gregory, Works in Progress, ["Why British nuclear flopped."](https://www.worksinprogress.news/p/why-british-nuclear-flopped) Source for the British nuclear figures, AGR/PWR history, Sizewell B inquiry, and the Chalmers framework for successful nuclear buildouts.

[^rust-rewrite]: PostHog, ["Even faster, more reliable feature flags."](https://posthog.com/blog/even-faster-more-reliable-flags)

[^hyrums-law]: ["Hyrum's Law."](https://www.hyrumslaw.com/)

[^cuda]: NVIDIA, ["CUDA Toolkit Documentation."](https://docs.nvidia.com/cuda/) NVIDIA's documentation defines CUDA as a parallel computing platform and programming model for NVIDIA GPUs.

[^cuda-eula]: Anton Shilov, Tom's Hardware, ["Nvidia bans using translation layers for CUDA software to run on other chips."](https://www.tomshardware.com/pc-components/gpus/nvidia-bans-using-translation-layers-for-cuda-software-to-run-on-other-chips-new-restriction-apparently-targets-zluda-and-some-chinese-gpu-makers)

[^zluda]: Anton Shilov, Tom's Hardware, ["AMD asks developer to take down open-source ZLUDA."](https://www.tomshardware.com/pc-components/gpus/amd-asks-developer-to-take-down-open-source-zluda-dev-vows-to-rebuild-his-project)

[^cann-os]: TechPowerUp, ["Huawei Open-Sources AI Software Stack, Aiming to Rival CUDA."](https://www.techpowerup.com/339664/huawei-open-sources-ai-software-stack-aiming-to-rival-cuda)

[^cac-ban]: Bonny Lin et al., The Diplomat, ["NVIDIA's H200 Chips Re-Enter China, but Beijing Isn't Giving Up on Huawei."](https://thediplomat.com/2026/02/nvidias-h200-chips-re-enter-china-but-beijing-isnt-giving-up-on-huawei/)

[^cann-coconstruction]: Huawei, ["Huawei Announces Open-Source Plan for CANN, Calls for Joint Construction of AI Ecosystem."](https://www.huawei.com/en/news/2025/9/hc-shengten-opensource)

[^h100-controls]: Introl, ["Trump's H200 Export Policy Reversal: December 2025."](https://introl.com/blog/trump-h200-export-china-policy-reversal-december-2025)

[^h800-controls]: Asia Times, ["Beijing bans Nvidia's top graphics card to back domestic rivals."](https://asiatimes.com/2026/05/beijing-bans-nvidias-top-graphics-card-to-back-domestic-rivals/)

[^h200-relaxation]: Sam Winter-Levy, CFR, ["Consequences of Exporting Nvidia's H200 Chips to China."](https://www.cfr.org/expert-brief/consequences-exporting-nvidias-h200-chips-china)

[^h200-slowwalking]: CNAS, ["Unpacking the H200 Export Policy."](https://www.cnas.org/publications/commentary/cnas-insights-unpacking-the-h200-export-policy)

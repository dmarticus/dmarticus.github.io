# P99 Conf — brief reflections outline

Short reflections from attending and speaking: a format I liked, some excellent performance engineering, and a few thoughts on AI. No grand thesis required.

## 1. Meta takes: prerecorded talks, live conversation

- **Prerecorded talk + presenter in the live chat worked surprisingly well.** People could ask questions when they occurred, rather than holding them until an end-of-talk Q&A. As a presenter, I could actually focus on answering them, and the conversation left a written record.
- This felt like the most engaged audience I'd had for a talk. Online attendance makes disengaging easy, but this format gave people who wanted to participate a good way to do it.
- The logistics were excellent: free, well paced, little awkward downtime, and recordings available quickly. Competing sessions mattered less when catching up was so easy.
- **Less in-person warmth, but easier talk-specific follow-up.** Not a substitute for the sit-down conversations at something like Dev Week. Still, watching more talks and reaching out with a specific question or observation led to an unusually high rate of connections for me.

## 2. Favorite material: performance has a lot of layers

- My talk lived at the application-performance layer. Hearing about OS, database, filesystem, and storage work was a reminder of how much deeper the field goes. I lost count of the `io_uring` mentions.
- Two standouts:
  - [Amos: Holistic Profiling with Stax](https://p99conf.io/session/holistic-profiling-with-stax/).
  - [Nathan / turbopuffer: Searching 100B Vectors on Object Storage, <200ms p99](https://p99conf.io/session/searching-100b-vectors-on-object-storage-200ms-p99/).
- **What made the best talks work:** either a strong narrative or a clear, almost proof-like progression: here's the problem, here's the model/math, here's what we tried, here's what the measurements showed.
- Nice personal validation: people responded well to framing my own talk as an I/O-bound mystery, and getting substantive feedback from strong engineers was rewarding.

Other favorites to choose from when drafting (not necessarily recap all of them):
- [Hardwood: Building a Parquet Parser from Scratch with a Little Help from AI](https://p99conf.io/session/hardwood-building-a-parquet-parser-from-scratch-with-a-little-help-from-ai/)
- [The Age of Slow Apps Is Over: Topcoat Brings Rust to Web Apps](https://p99conf.io/session/the-age-of-slow-apps-is-over-topcoat-brings-rust-to-web-apps/)
- [Performance Has Layers](https://p99conf.io/session/performance-has-layers/)
- [The Fastest Object Storage Client in the World](https://p99conf.io/session/the-fastest-object-storage-client-in-the-world/)
- [How to Improve Your Cache Algorithm Using AI](https://p99conf.io/session/how-to-improve-your-cache-algorithm-using-ai/)

## 3. Takes on AI: faster implementation isn't the whole problem

- Amos's point about internal tools resonated: useful AI-built software is already out there, but much of it may never become a public product. The economics can make sense for an internal tool without making sense for another SaaS business.
- "AI made development faster" accounts have a short shelf life as models improve. The more interesting question is **which parts of performance engineering AI handles well, and which still require human judgment.**
- The telling mismatch: a model reporting a 4% improvement when the engineer is looking for 4x. Optimizing the current approach isn't the same as finding the right approach.
- Possible closing observation: the solutions that stuck with me found simple ideas inside complicated domains. AI can help explore and implement, but choosing the direction, testing hypotheses, and refining it into something simple still looked like the important work—not just repeatedly prompting for faster code.

Final aside: the swag was awesome.

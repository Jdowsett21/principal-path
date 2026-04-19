# Principal Path Curriculum

Goal: train principal-level engineering judgment for AWS-native systems, with AI as a tool, a constraint, and a product surface.

---

## Phase 1 — AI-Accelerated Engineering
> Use AI to move faster without losing correctness, review discipline, or ownership.

### Unit 1: The AI-First Engineering Workflow (55 min) `BUILT`
| # | Lesson | Type | Minutes |
|---|--------|------|---------|
| 1 | Where AI fits in the delivery loop | Audio | 10 |
| 2 | Prompt, inspect, verify, commit | Audio | 18 |
| 3 | The over-trusted refactor | Case Study (decision tree) | 20 |
| 4 | Check your understanding | Quiz (4 questions) | 5 |

### Unit 2: Turning Fuzzy Requirements into Precise Specs with AI (55 min) `BUILT`
| # | Lesson | Type | Minutes |
|---|--------|------|---------|
| 1 | Why framing is the highest-leverage skill | Audio | 10 |
| 2 | Converting vague asks into testable requirements | Audio | 18 |
| 3 | The "handle more traffic" email | Case Study (decision tree) | 20 |
| 4 | Check your understanding | Quiz (3 questions) | 5 |

### Unit 3: Reviewing AI Output for Hidden Risk
- Correctness vs plausibility
- Data leakage, permission drift, and unsafe defaults
- Operational risk hidden behind clean-looking code
- When to reject output and ask for a different approach

### Unit 4: AI-Assisted Design Review
- Turning architecture ideas into reviewable artifacts
- Identifying missing constraints
- Spotting implicit scaling assumptions
- Comparing alternatives before implementation starts

---

## Phase 2 — Data Systems at Scale `NOT STARTED`
> Data modeling, query behavior, write amplification, replication, and consistency choices once your data stops fitting the happy path.

Planned topics:
- When Postgres, MySQL, DynamoDB, MongoDB, Redis, and OpenSearch are the right fit
- Query planning, execution plans, vacuum, bloat, lock contention, and hot rows
- Schema design for append-only, mutable, and event-sourced data models
- Index strategy: composite, partial, covering, BRIN, and index maintenance cost
- Partitioning: range, hash, list, sharding, and the operational cost of each
- Replica lag, read-after-write behavior, and consistency expectations
- Connection pooling, backpressure, and saturation at the database edge
- CDC pipelines, replayability, deduplication, and schema evolution
- OLTP vs OLAP boundaries: Aurora, DynamoDB, Redshift, Snowflake, and S3 lake patterns
- Multi-region write conflict handling and recovery strategy

---

## Phase 3 — AWS Services Deep Dive `NOT STARTED`
> Service selection, failure modes, and operational tradeoffs across the AWS stack.

Planned topics:
- Aurora: writer/reader topology, failover behavior, global database, serverless v2
- DynamoDB: partition keys, sort keys, GSIs, hot partitions, adaptive capacity, TTL
- Kinesis Data Streams vs Firehose vs MSK: retention, ordering, replay, consumer scaling
- Glue, EMR, Athena, Lake Formation: when each helps and where each becomes overhead
- OpenSearch: shard sizing, indexing cost, vector search, filtering, and latency tuning
- Bedrock: model routing, provisioned throughput, prompt management, guardrails, and cost control
- SageMaker: endpoints, async inference, batch transform, multi-model endpoints, autoscaling
- Step Functions: orchestration boundaries, retries, compensation, and saga patterns
- EventBridge, SNS, and SQS: fanout, decoupling, ordering, and delivery semantics
- Lambda vs Fargate vs Batch vs EMR: cold starts, runtime limits, concurrency, and operational burden

---

## Phase 4 — Building Blocks at Scale `NOT STARTED`
> The core primitives you already use, plus the failure modes that appear under real load.

Planned topics:
- Queues: ordering guarantees, deduplication, poison messages, DLQs, and replay strategy
- Caches: TTL strategy, stampede prevention, hot keys, cache warming, invalidation
- APIs: tail latency, hedged requests, timeout budgets, circuit breakers, and load shedding
- Jobs: scheduling fairness, priority inversion, starvation, and resumable execution
- Storage: hot/warm/cold data placement, lifecycle policies, archival, and retrieval cost
- Compute: cold starts, warm pools, autoscaling behavior, bin packing, and isolation models
- Network: service mesh overhead, mTLS, gRPC tradeoffs, connection reuse, and latency budgets

---

## Phase 5 — AI Systems in Production `NOT STARTED`
> Retrieval, inference, evaluation, guardrails, and the operational patterns that keep AI systems reliable.

Planned topics:
- RAG architectures: chunking, metadata design, hybrid search, reranking, and retrieval evals
- Vector stores at scale: sharding, metadata filtering, recall/latency tradeoffs, and reindexing
- Inference infrastructure: batching, streaming, fallbacks, routing, and provider abstraction
- LLMOps: offline evals, golden sets, prompt versioning, regression tests, and rollout gates
- Guardrails: jailbreak resistance, prompt injection, PII handling, moderation, and policy checks
- Cost and latency control: caching, model cascades, routing thresholds, and token budgeting
- Agent systems: tool selection, orchestration, retries, state handling, and failure containment
- Human-in-the-loop review for high-risk outputs and low-confidence cases

---

## Phase 6 — Reliability & Distributed Systems `NOT STARTED`
> How systems fail, how to contain the blast radius, and how to recover without guessing.

Planned topics:
- Failure modes at scale: gray failures, metastability, partial degradation, split brain
- Load shedding, brownouts, graceful degradation, and fallback behavior
- Cell-based architecture and blast-radius reduction
- Multi-region active-active vs active-passive recovery models
- SLO math, error budgets, alert quality, and paging policy
- Incident response: triage, containment, comms, rollback, and postmortems
- Legacy system comprehension and strangler-fig modernization
- Chaos engineering, game days, and fault injection with production guardrails

---

## Phase 7 — Architecture & Principal Judgment `NOT STARTED`
> The judgment layer: boundaries, tradeoffs, documentation, influence, and decision quality.

Planned topics:
- Service boundaries with coupling, ownership, and scaling constraints
- Cost modeling across compute, storage, data transfer, and human maintenance
- Build vs buy when integration, lock-in, and staffing matter
- Conway's law, team topology, and platform/product friction
- RFC and design doc quality: alternatives, risks, rollout, and rejection criteria
- Stakeholder framing: translating technical risk into business impact
- Decision-making with incomplete information and reversible vs irreversible choices
- Principal-level review habits: what you challenge, what you accept, and why

---

## Summary

| Phase | Status | Units | Lessons | Minutes |
|-------|--------|-------|---------|---------|
| 1. AI-Accelerated Engineering | **In progress** | 2/4 | 8 | 110 |
| 2. Data Systems at Scale | Not started | 0 | 0 | 0 |
| 3. AWS Services Deep Dive | Not started | 0 | 0 | 0 |
| 4. Building Blocks at Scale | Not started | 0 | 0 | 0 |
| 5. AI Systems in Production | Not started | 0 | 0 | 0 |
| 6. Reliability & Distributed Systems | Not started | 0 | 0 | 0 |
| 7. Architecture & Principal Judgment | Not started | 0 | 0 | 0 |
| **Total** | | **2** | **8** | **110 min** |

---

## Legacy Lessons (pre-curriculum, 20 lessons)
These exist from the earlier track-based system and have not been migrated to the unit format yet:
- Architecture (2): Boundaries, Designing for Change
- Data (2): Index Reading, Replica vs Cache
- Reliability (1): Incident Response
- Leadership (3): Push Back, AI Code Review, RAG vs Fine-Tuning
- Cloud/AWS (12): VPCs, ECS, SSM, NAT, CloudFront, Observability, Queues, Data Lakes, ML Services, etc.

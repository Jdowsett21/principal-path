import type { DailyChallengeSeed } from './curriculum.types';

export const dailyChallenges: DailyChallengeSeed[] = [
  {
    id: 'daily-001',
    trackId: 'architecture',
    type: 'tradeoff',
    title: 'Pick the Right Boundary',
    durationMinutes: 6,
    scenario: 'A small product team is growing fast, and every release now needs three engineers to coordinate.',
    prompt: 'Choose the best next move: keep one codebase, split by domain, or move to services immediately. Explain why.',
    choices: [
      'Keep one codebase and tighten module boundaries',
      'Split by domain inside a shared deployment model',
      'Move straight to microservices'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'Recognize that coordination cost is the real problem',
      'Prefer the smallest change that reduces coupling',
      'Avoid microservices unless the operational maturity is already there'
    ],
    whyItMatters: 'Principal engineers do not just separate systems; they separate them at the right time and for the right reason.'
  },
  {
    id: 'daily-002',
    trackId: 'data',
    type: 'quiz',
    title: 'Index Behavior Check',
    durationMinutes: 5,
    scenario: 'A feed page filters by user_id and sorts by created_at desc.',
    prompt: 'What index is most likely to help this query pattern?',
    choices: [
      'user_id, created_at desc',
      'created_at desc, user_id',
      'Only an index on created_at'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'Understand filter plus sort order',
      'Prefer column order that matches the query path',
      'Connect the answer to how the query planner uses the index'
    ],
    whyItMatters: 'The right index order is a tiny decision with major production impact.'
  },
  {
    id: 'daily-003',
    trackId: 'reliability',
    type: 'incident',
    title: 'Latency After Deploy',
    durationMinutes: 7,
    scenario: 'P95 latency doubled within ten minutes of a release, but only for authenticated requests.',
    prompt: 'What do you inspect first, and what do you freeze while you investigate?',
    idealSignals: [
      'Check rollback safety and blast radius first',
      'Compare the deploy diff to the timing of the regression',
      'Use metrics to isolate the affected path before opening logs'
    ],
    whyItMatters: 'Senior operators stabilize the system first and investigate second.'
  },
  {
    id: 'daily-004',
    trackId: 'distributed-systems',
    type: 'quiz',
    title: 'Retry Safety',
    durationMinutes: 5,
    scenario: 'A worker occasionally times out after charging a card.',
    prompt: 'What property makes retrying the request safer?',
    choices: [
      'Idempotency',
      'Caching',
      'Horizontal scaling'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'Recognize idempotency as the core safety property',
      'Understand why retries can duplicate side effects',
      'Connect the concept to payment and job-processing flows'
    ],
    whyItMatters: 'Distributed systems are mostly about preventing small failures from becoming repeated failures.'
  },
  {
    id: 'daily-005',
    trackId: 'leadership',
    type: 'tradeoff',
    title: 'Push Back on a Deadline',
    durationMinutes: 6,
    scenario: 'Product wants a risky feature shipped in five days, but you know the blast radius is wide.',
    prompt: 'Choose the most effective response: say no, say yes, or offer a safer plan.',
    choices: [
      'Say no and stop there',
      'Say yes and hope for the best',
      'Offer a smaller scoped plan with explicit risks'
    ],
    correctChoiceIndex: 2,
    idealSignals: [
      'Communicate risk clearly and without drama',
      'Offer a realistic alternative',
      'Keep trust high while protecting the system'
    ],
    whyItMatters: 'Leadership is often the ability to make hard trade-offs legible.'
  },
  {
    id: 'daily-006',
    trackId: 'data',
    type: 'tradeoff',
    title: 'Replica or Cache?',
    durationMinutes: 6,
    scenario: 'Read traffic is rising, but the hottest page still needs fresh data every few seconds.',
    prompt: 'What should you try first: read replicas, Redis, or CDN caching?',
    choices: [
      'Read replicas',
      'Redis cache',
      'CDN edge cache'
    ],
    correctChoiceIndex: 1,
    idealSignals: [
      'Separate freshness needs from read volume needs',
      'Understand that cache invalidation is a real engineering cost',
      'Pick the simplest fit for the user-facing freshness requirement'
    ],
    whyItMatters: 'Scaling choices are really freshness, cost, and complexity choices in disguise.'
  },
  {
    id: 'daily-007',
    trackId: 'architecture',
    type: 'quiz',
    title: 'What Makes a Boundary Good?',
    durationMinutes: 5,
    scenario: 'Two modules share the same database tables but rarely call each other directly.',
    prompt: 'Which signal suggests the boundary still needs work?',
    choices: [
      'Shared ownership and unclear change responsibility',
      'Both modules have unit tests',
      'The app uses TypeScript'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'See that a shared database can hide real coupling',
      'Prefer boundaries that match change patterns and ownership',
      'Tie architecture to team velocity'
    ],
    whyItMatters: 'Good architecture reduces coordination, not just method calls.'
  },
  {
    id: 'daily-008',
    trackId: 'reliability',
    type: 'tradeoff',
    title: 'Alert Design',
    durationMinutes: 6,
    scenario: 'The team gets paged too often and ignores alerts now.',
    prompt: 'What should you improve first: more alerts, better thresholds, or fewer but more meaningful signals?',
    choices: [
      'More alerts',
      'Better thresholds and fewer meaningful signals',
      'Disable alerting entirely'
    ],
    correctChoiceIndex: 1,
    idealSignals: [
      'Recognize alert fatigue as a system problem',
      'Prefer signal quality over noise',
      'Connect alerting to actionable response'
    ],
    whyItMatters: 'Operational systems should help humans act, not punish them for existing.'
  },
  {
    id: 'daily-009',
    trackId: 'cloud-platform',
    type: 'tradeoff',
    title: 'Public or Private?',
    durationMinutes: 6,
    scenario: 'A staging app needs to receive traffic from the internet, but the database should remain hidden.',
    prompt: 'Which part belongs in a public subnet and which part should stay private?',
    choices: [
      'Only the load balancer is public; the app tasks and database stay private',
      'Everything is public because it is easier to debug',
      'The database should be public so the app can connect to it'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'Recognize the edge versus internal boundary',
      'Keep the blast radius small',
      'Separate exposure from reachability'
    ],
    whyItMatters: 'A senior cloud engineer protects the sensitive core while keeping the public edge simple.'
  },
  {
    id: 'daily-010',
    trackId: 'cloud-platform',
    type: 'incident',
    title: 'Fargate Task Keeps Restarting',
    durationMinutes: 7,
    scenario: 'A new ECS task starts, passes one health check, then repeatedly restarts under load.',
    prompt: 'What do you check first: task logs, ALB health checks, or image/build changes?',
    idealSignals: [
      'Check the real health signal and container logs together',
      'Compare the new task definition to the previous version',
      'Look for silent configuration or resource issues before assuming app logic is broken'
    ],
    whyItMatters: 'Deployment failures are often configuration failures wearing an application-shaped mask.'
  },
  {
    id: 'daily-011',
    trackId: 'cloud-platform',
    type: 'tradeoff',
    title: 'NAT Gateway or No NAT?',
    durationMinutes: 6,
    scenario: 'A private ECS workload needs limited outbound internet access, but you want to avoid unnecessary cost and complexity.',
    prompt: 'Should you add a NAT gateway now or wait until there is a concrete need?',
    choices: [
      'Wait until the need is proven and the cost is justified',
      'Add it by default because private systems need it',
      'Skip the discussion and expose everything publicly'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'Treat NAT as a trade-off, not a default',
      'Balance outbound access against recurring cost',
      'Prefer the simplest shape that solves the real need'
    ],
    whyItMatters: 'Senior cloud engineers know when to pay for convenience and when to keep the architecture lean.'
  },
  {
    id: 'daily-012',
    trackId: 'cloud-platform',
    type: 'tradeoff',
    title: 'Batch or Stream for This Pipeline?',
    durationMinutes: 6,
    scenario: 'Product wants near-real-time dashboards, but the actual user decision cadence is hourly and the data model is still evolving.',
    prompt: 'Do you start with a stream processor or a simpler batch pipeline?',
    choices: [
      'Start with batch and revisit streaming when freshness truly matters',
      'Start with streaming because real time is always better',
      'Skip the pipeline and query the production database directly forever'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'Match the architecture to the true freshness requirement',
      'Avoid premature streaming complexity',
      'Protect the transactional system from analytical misuse'
    ],
    whyItMatters: 'Platform judgment often means resisting exciting systems until the problem deserves them.'
  },
  {
    id: 'daily-013',
    trackId: 'cloud-platform',
    type: 'quiz',
    title: 'What Makes a Queue Consumer Safe?',
    durationMinutes: 5,
    scenario: 'A queue may deliver the same message more than once during retries.',
    prompt: 'Which property matters most for keeping the side effect safe?',
    choices: [
      'Idempotency',
      'Bigger worker instances',
      'More metrics dashboards'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'Recognize duplicate delivery as a normal distributed-systems condition',
      'Tie queue safety to side-effect design',
      'Separate reliability from brute-force scaling'
    ],
    whyItMatters: 'A lot of event-driven failures are really consumer contract failures.'
  },
  {
    id: 'daily-014',
    trackId: 'cloud-platform',
    type: 'tradeoff',
    title: 'Managed ML or Custom Stack?',
    durationMinutes: 6,
    scenario: 'A team is just starting to train and serve models, but one engineer wants to build a custom platform immediately.',
    prompt: 'What is the better default move?',
    choices: [
      'Use a managed ML service first and specialize later if the workflow demands it',
      'Build the custom platform now so you have maximum flexibility',
      'Avoid evaluation and focus only on faster training'
    ],
    correctChoiceIndex: 0,
    idealSignals: [
      'Optimize for speed of learning before platform ownership',
      'Use managed services until friction becomes real',
      'Keep evaluation and inference needs in view'
    ],
    whyItMatters: 'Principal-level thinking weighs control against team maturity and delivery speed.'
  }
];

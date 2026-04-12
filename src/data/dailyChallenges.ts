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
  }
];

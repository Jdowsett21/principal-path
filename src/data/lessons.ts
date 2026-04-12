import type { LessonSeed } from './curriculum.types';

export const lessons: LessonSeed[] = [
  {
    id: 'arch-01',
    trackId: 'architecture',
    title: 'Monolith or Microservices?',
    durationMinutes: 8,
    level: 'builder',
    format: 'audio-first',
    hook: 'The wrong service boundary can slow a team down for months.',
    objective: 'Learn how team size, deployment risk, and product scope shape architecture decisions.',
    keyPoints: [
      'A monolith is not a failure state when the team is small and the domain is still changing fast.',
      'Microservices add coordination cost, observability burden, and failure modes.',
      'Boundaries should reduce coupling, not impress reviewers.'
    ],
    walkPractice: 'Explain out loud when you would keep one service, when you would split, and what signal would convince you to change course.',
    reflectionPrompt: 'What hidden cost would I accept first: deployment friction, team friction, or runtime complexity?'
  },
  {
    id: 'data-01',
    trackId: 'data',
    title: 'Reading an Index Like a Senior Engineer',
    durationMinutes: 9,
    level: 'owner',
    format: 'audio-first',
    hook: 'A slow query is often a product problem, a schema problem, and an indexing problem at the same time.',
    objective: 'Build intuition for why indexes help, when they hurt, and how to connect them to query shape.',
    keyPoints: [
      'Indexes speed reads by reducing work, but they add write cost and storage cost.',
      'The most useful index is the one that matches the actual filter and sort pattern.',
      'Query plans expose what the database is really doing, not what you hoped it would do.'
    ],
    walkPractice: 'Look at a fake query pattern and describe the index you would add, the trade-off it creates, and what you would monitor after release.',
    reflectionPrompt: 'If this table grows 10x, what breaks first: query latency, write throughput, or index maintenance?'
  },
  {
    id: 'ops-01',
    trackId: 'reliability',
    title: 'What to Check First in an Incident',
    durationMinutes: 8,
    level: 'senior',
    format: 'audio-first',
    hook: 'The first five minutes of an incident are about stabilizing thinking, not proving a theory.',
    objective: 'Learn a calm first-response sequence for latency spikes, errors, and deploy regressions.',
    keyPoints: [
      'Check blast radius before diving into root cause.',
      'Compare recent changes against the failure window.',
      'Use metrics to narrow the problem before reading logs line by line.'
    ],
    walkPractice: 'Practice a verbal incident triage: what you would ask, what you would freeze, and what you would inspect first.',
    reflectionPrompt: 'What signal would make me pause debugging and roll back immediately?'
  },
  {
    id: 'dist-01',
    trackId: 'distributed-systems',
    title: 'Retries, Timeouts, and Idempotency',
    durationMinutes: 10,
    level: 'senior',
    format: 'mixed',
    hook: 'Most distributed bugs start as reasonable assumptions about a network that does not behave reasonably.',
    objective: 'Understand why retries help, when they amplify failure, and how idempotency protects downstream systems.',
    keyPoints: [
      'Retries without timeouts can create runaway load.',
      'Timeouts need to reflect user value and dependency behavior.',
      'Idempotency turns repeated requests into safe outcomes.'
    ],
    walkPractice: 'Describe a payment, notification, or job-processing flow and explain exactly where retries belong and where they do not.',
    reflectionPrompt: 'Where would duplicate execution be harmless, and where would it be catastrophic?'
  },
  {
    id: 'lead-01',
    trackId: 'leadership',
    title: 'Push Back Without Blocking',
    durationMinutes: 7,
    level: 'principal',
    format: 'audio-first',
    hook: 'Principal-level judgment often sounds like calm, specific pushback with an alternative path.',
    objective: 'Practice responding to a rushed deadline with risk framing and options, not just objections.',
    keyPoints: [
      'State the risk in business language, not only technical language.',
      'Offer a safer alternative and a clear decision point.',
      'Be crisp about what is reversible and what is not.'
    ],
    walkPractice: 'Say the response you would give to product when quality risk is too high for the requested timeline.',
    reflectionPrompt: 'How do I preserve trust while making risk visible?'
  },
  {
    id: 'arch-02',
    trackId: 'architecture',
    title: 'Designing for Change Without Overbuilding',
    durationMinutes: 9,
    level: 'senior',
    format: 'mixed',
    hook: 'The best architecture is usually the one that buys flexibility only where the product needs it.',
    objective: 'Identify which parts of a system deserve abstraction and which should stay boring.',
    keyPoints: [
      'Abstraction has a maintenance cost.',
      'Use stable boundaries around volatile business rules.',
      'Favor simple data flow when the roadmap is uncertain.'
    ],
    walkPractice: 'Pick one feature from a familiar app and explain what you would not abstract yet.',
    reflectionPrompt: 'Where am I creating future flexibility I probably will not need?'
  }
];

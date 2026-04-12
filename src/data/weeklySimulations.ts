import type { WeeklySimulationSeed } from './curriculum.types';

export const weeklySimulations: WeeklySimulationSeed[] = [
  {
    id: 'week-01',
    week: 1,
    title: 'Design a Growing Product Without Premature Microservices',
    primaryTrackId: 'architecture',
    scenario: 'You are joining a product with fast growth, a small team, and increasing release coordination overhead.',
    constraints: [
      'The team is only four engineers',
      'You need to keep shipping every week',
      'The domain is still changing',
      'Operational maturity is modest'
    ],
    tasks: [
      'Propose the current architecture',
      'Explain the first boundaries you would improve',
      'List the signals that would justify a later split',
      'Describe one thing you would intentionally not optimize yet'
    ],
    scoringRubric: [
      {
        dimension: 'Judgment',
        whatGreatLooksLike: 'Chooses the smallest design that solves the real coordination problem.'
      },
      {
        dimension: 'Trade-offs',
        whatGreatLooksLike: 'Explains the runtime, delivery, and maintenance costs of the chosen design.'
      },
      {
        dimension: 'Communication',
        whatGreatLooksLike: 'Makes the recommendation easy for product and engineering to align on.'
      }
    ]
  },
  {
    id: 'week-02',
    week: 2,
    title: 'Fix a Saturating Postgres Checkout Path',
    primaryTrackId: 'data',
    scenario: 'Checkout latency is climbing, database CPU is high, and the hot path is starting to time out during peak traffic.',
    constraints: [
      'You can only make one risky change this week',
      'Checkout must remain correct',
      'The team cannot rewrite the whole data model',
      'You need a rollback path'
    ],
    tasks: [
      'Identify likely bottlenecks',
      'Propose the first safe performance move',
      'Describe how you would validate the fix',
      'Explain what you would monitor after deploy'
    ],
    scoringRubric: [
      {
        dimension: 'Diagnosis',
        whatGreatLooksLike: 'Looks at query shape, indexes, and write pressure before suggesting scale-out.'
      },
      {
        dimension: 'Risk management',
        whatGreatLooksLike: 'Keeps correctness intact and preserves a rollback path.'
      },
      {
        dimension: 'Operations',
        whatGreatLooksLike: 'Names the post-deploy metrics that prove the change worked.'
      }
    ]
  },
  {
    id: 'week-03',
    week: 3,
    title: 'Handle an AI-Generated Code Incident',
    primaryTrackId: 'leadership',
    scenario: 'An AI-assisted PR shipped quickly, but production behavior is wrong and the code passed review because it looked plausible.',
    constraints: [
      'The team wants fast recovery',
      'The original author is unavailable',
      'You need to explain the failure without blame',
      'You also need a process improvement'
    ],
    tasks: [
      'Triage the incident',
      'Decide what to roll back or patch',
      'Describe how you would communicate the issue',
      'Propose a better review checklist for future AI-generated work'
    ],
    scoringRubric: [
      {
        dimension: 'Operational thinking',
        whatGreatLooksLike: 'Prioritizes restoring service, then root cause, then process improvement.'
      },
      {
        dimension: 'Judgment',
        whatGreatLooksLike: 'Notices that plausible code still needs strong correctness checks.'
      },
      {
        dimension: 'Leadership',
        whatGreatLooksLike: 'Frames the incident as a systems lesson instead of a blame exercise.'
      }
    ]
  },
  {
    id: 'week-04',
    week: 4,
    title: 'Plan a Safe Monolith Migration',
    primaryTrackId: 'distributed-systems',
    scenario: 'You inherited a legacy monolith that is stable but hard to change, and the business wants a migration plan.',
    constraints: [
      'No large rewrite is allowed',
      'The product cannot stop shipping',
      'The team is under headcount pressure',
      'You need measurable milestones'
    ],
    tasks: [
      'Choose the first extraction candidate',
      'Explain how to protect the existing system',
      'Describe the rollback and coexistence plan',
      'Name the metrics that prove the migration is improving things'
    ],
    scoringRubric: [
      {
        dimension: 'Phasing',
        whatGreatLooksLike: 'Breaks the migration into reversible steps.'
      },
      {
        dimension: 'System design',
        whatGreatLooksLike: 'Uses boundaries that reduce risk rather than multiplying it.'
      },
      {
        dimension: 'Business judgment',
        whatGreatLooksLike: 'Matches the plan to team capacity and product urgency.'
      }
    ]
  }
];

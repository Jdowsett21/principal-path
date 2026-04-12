import type { TrackSeed } from './curriculum.types';

export const tracks: TrackSeed[] = [
  {
    id: 'architecture',
    title: 'Architecture and System Design',
    priority: 1,
    summary: 'Learn how to shape systems that stay simple, evolvable, and clear under real product pressure.',
    color: '#134E4A',
    accent: '#2DD4BF',
    modules: [
      {
        id: 'service-boundaries',
        title: 'Service Boundaries and Modularity',
        outcomes: [
          'Choose reasonable boundaries for teams and codebases',
          'Explain monolith versus microservices trade-offs',
          'Spot coupling risk before it becomes delivery drag'
        ]
      },
      {
        id: 'tradeoffs',
        title: 'Design Trade-Offs',
        outcomes: [
          'Compare latency, throughput, cost, and complexity',
          'Defend a design using business constraints, not hype'
        ]
      }
    ]
  },
  {
    id: 'data',
    title: 'Databases and Data Systems',
    priority: 1,
    summary: 'Build practical judgment around Postgres, schema design, indexing, consistency, and data growth.',
    color: '#4C1D95',
    accent: '#A78BFA',
    modules: [
      {
        id: 'postgres-core',
        title: 'Postgres Fundamentals',
        outcomes: [
          'Read query plans and identify bottlenecks',
          'Reason about transactions and isolation levels',
          'Avoid common schema mistakes early'
        ]
      },
      {
        id: 'data-scale',
        title: 'Scaling Data Access',
        outcomes: [
          'Choose between caching, replicas, and partitioning',
          'Understand how consistency changes user experience'
        ]
      }
    ]
  },
  {
    id: 'reliability',
    title: 'Reliability and Operations',
    priority: 1,
    summary: 'Train the instincts that keep production calm: observability, safe deploys, incidents, and postmortems.',
    color: '#7C2D12',
    accent: '#FB923C',
    modules: [
      {
        id: 'observability',
        title: 'Observability',
        outcomes: [
          'Use logs, metrics, and traces correctly',
          'Define useful service health indicators'
        ]
      },
      {
        id: 'incident-response',
        title: 'Incident Response',
        outcomes: [
          'Triage incidents calmly',
          'Reduce blast radius',
          'Write useful postmortems'
        ]
      }
    ]
  },
  {
    id: 'distributed-systems',
    title: 'Distributed Systems',
    priority: 2,
    summary: 'Learn what breaks when services stop being local and how senior engineers design around failure.',
    color: '#1E3A8A',
    accent: '#60A5FA',
    modules: [
      {
        id: 'failure-modes',
        title: 'Failure Modes',
        outcomes: [
          'Understand retries, timeouts, and idempotency',
          'Recognize network assumptions that break systems'
        ]
      },
      {
        id: 'consistency',
        title: 'Consistency and Coordination',
        outcomes: [
          'Explain CAP-style trade-offs in practical terms',
          'Choose acceptable consistency for a product need'
        ]
      }
    ]
  },
  {
    id: 'leadership',
    title: 'Leadership and Technical Judgment',
    priority: 2,
    summary: 'Practice the communication and decision-making patterns that turn strong engineers into trusted leaders.',
    color: '#3F2A1D',
    accent: '#F59E0B',
    modules: [
      {
        id: 'stakeholder-tradeoffs',
        title: 'Stakeholder Trade-Offs',
        outcomes: [
          'Communicate risk clearly',
          'Push back without sounding obstructive'
        ]
      },
      {
        id: 'ai-code-review',
        title: 'Reviewing AI-Generated Code',
        outcomes: [
          'Inspect correctness beyond surface plausibility',
          'Catch hidden operational and maintenance risk'
        ]
      }
    ]
  }
];

import type { LessonSeed } from './curriculum.types';

export const lessons: LessonSeed[] = [
  {
    id: 'arch-01',
    trackId: 'architecture',
    title: 'How to Choose a Boundary',
    durationMinutes: 10,
    level: 'builder',
    format: 'audio-first',
    hook: 'Most architecture mistakes are really boundary mistakes.',
    objective: 'Learn how to place boundaries around change, ownership, and coupling without overengineering.',
    summary: 'A walk lesson on choosing the smallest boundary that meaningfully reduces coordination cost.',
    spokenIntro:
      'Today we are training one judgment call: where a boundary should live. Do not think about elegance first. Think about change cost, team ownership, and the smallest move that makes the system easier to evolve.',
    spokenWrap:
      'The takeaway is simple. Good boundaries reduce coordination, not just method calls. If the boundary does not lower real friction, it is probably decoration.',
    diagramCue: 'Sketch the current system as one box, then draw the first boundary you would add and label what changes across it.',
    keyPoints: [
      'A monolith is fine when the team is small and the domain is still moving fast.',
      'The first split should reduce coupling, not impress reviewers.',
      'A boundary is only good if it matches ownership and change patterns.'
    ],
    walkPractice: 'Explain out loud what signal would tell you that the current module boundaries are too expensive.',
    reflectionPrompt: 'What friction am I actually trying to remove: deployment, coordination, or cognitive load?',
    steps: [
      {
        type: 'listen',
        title: 'Set the frame',
        detail: 'Start by naming the change problem before you talk about architecture style.'
      },
      {
        type: 'explain',
        title: 'Why boundaries fail',
        detail: 'Use one recent product example where bad ownership or shared tables created coordination cost.'
      },
      {
        type: 'diagram',
        title: 'Draw the boundary',
        detail: 'Sketch the current box, the future split, and the one thing that becomes simpler.'
      },
      {
        type: 'practice',
        title: 'Say the decision aloud',
        detail: 'Practice a short recommendation: keep, modularize, or split later.'
      },
      {
        type: 'reflect',
        title: 'Name the trigger',
        detail: 'State the one concrete signal that would justify revisiting the design.'
      }
    ]
  },
  {
    id: 'arch-02',
    trackId: 'architecture',
    title: 'Designing for Change Without Overbuilding',
    durationMinutes: 9,
    level: 'senior',
    format: 'mixed',
    hook: 'Flexibility is valuable only where the roadmap is actually volatile.',
    objective: 'Separate stable structure from volatile business rules and avoid premature abstraction.',
    summary: 'A practical lesson on when to leave things boring and when to introduce a boundary.',
    spokenIntro:
      'A senior engineer does not abstract everything. They protect only the parts that are likely to change and keep everything else boring.',
    spokenWrap:
      'The best architecture often feels slightly underbuilt today and much easier to evolve tomorrow.',
    diagramCue: 'Circle the parts of a feature that are volatile. Leave the rest plain.',
    keyPoints: [
      'Abstraction has a maintenance cost.',
      'Stable boundaries belong around volatile rules.',
      'Sometimes the best move is to defer flexibility until the pattern is real.'
    ],
    walkPractice: 'Pick a feature you know well and identify one place where you would refuse to abstract yet.',
    reflectionPrompt: 'Where am I creating future flexibility I probably will not need?',
    steps: [
      {
        type: 'listen',
        title: 'What to protect',
        detail: 'Identify the one or two surfaces likely to change most often.'
      },
      {
        type: 'explain',
        title: 'What not to abstract',
        detail: 'Call out the boring parts that should stay direct and easy to read.'
      },
      {
        type: 'diagram',
        title: 'Volatility map',
        detail: 'Mark stable and unstable zones in a simple sketch.'
      },
      {
        type: 'practice',
        title: 'Choose the smallest useful change',
        detail: 'Say what you would implement now and what you would explicitly defer.'
      }
    ]
  },
  {
    id: 'data-01',
    trackId: 'data',
    title: 'Reading an Index Like a Senior Engineer',
    durationMinutes: 10,
    level: 'owner',
    format: 'audio-first',
    hook: 'A slow query is usually a schema decision, a query-shape decision, and a product decision.',
    objective: 'Build intuition for why indexes help, when they hurt, and how to reason from query shape.',
    summary: 'A walk lesson on matching indexes to actual filters and sorts.',
    spokenIntro:
      'Today we are not memorizing database facts. We are training a habit: read the query shape, then decide whether the index actually matches that path.',
    spokenWrap:
      'The useful index is the one that serves the real request pattern, not the one that sounds clever.',
    diagramCue: 'Draw the table, the filter, the sort order, and the index in the same left-to-right flow.',
    keyPoints: [
      'Indexes speed reads but increase write cost and storage.',
      'The best index matches the filter and sort pattern together.',
      'Query plans reveal the real execution path.'
    ],
    walkPractice: 'Explain what index you would add for a feed query filtered by user and sorted by recency.',
    reflectionPrompt: 'If this table grows 10x, what breaks first: reads, writes, or maintenance?',
    steps: [
      {
        type: 'listen',
        title: 'Read the request',
        detail: 'Name the filter and sort pattern before you touch the schema.'
      },
      {
        type: 'diagram',
        title: 'Map query to index',
        detail: 'Draw the request path and show exactly why the column order matters.'
      },
      {
        type: 'practice',
        title: 'Pick the trade-off',
        detail: 'Say what the index improves and what cost it creates.'
      },
      {
        type: 'reflect',
        title: 'Monitor after deploy',
        detail: 'Name the production signals you would watch after the change ships.'
      }
    ]
  },
  {
    id: 'data-02',
    trackId: 'data',
    title: 'Replica or Cache?',
    durationMinutes: 8,
    level: 'owner',
    format: 'audio-first',
    hook: 'Scaling reads is really about freshness, cost, and complexity.',
    objective: 'Choose between replicas, Redis, and edge caching based on freshness requirements and traffic patterns.',
    summary: 'A decision lesson that turns scaling into a trade-off conversation instead of a buzzword hunt.',
    spokenIntro:
      'When people say the system needs to scale, that usually means one of three things: too much traffic, too much cost, or too much user-visible delay.',
    spokenWrap:
      'Do not pick infrastructure first. Pick the freshness requirement first.',
    diagramCue: 'Draw three boxes labeled replica, cache, and edge. Put freshness requirements beside each one.',
    keyPoints: [
      'Replicas help read volume, not freshness.',
      'Caches solve hot-path latency but add invalidation work.',
      'The right answer depends on how stale the data can be.'
    ],
    walkPractice: 'Describe which tool you would choose for a page that must stay fresh every few seconds.',
    reflectionPrompt: 'What is the simplest scaling move that still respects freshness?',
    steps: [
      {
        type: 'listen',
        title: 'Define the constraint',
        detail: 'State freshness first, then traffic, then cost.'
      },
      {
        type: 'explain',
        title: 'Compare the tools',
        detail: 'Say what each option is best at and what it makes harder.'
      },
      {
        type: 'practice',
        title: 'Make the call',
        detail: 'Pick one approach and defend it in one minute.'
      }
    ]
  },
  {
    id: 'ops-01',
    trackId: 'reliability',
    title: 'What to Check First in an Incident',
    durationMinutes: 9,
    level: 'senior',
    format: 'audio-first',
    hook: 'The first minutes of an incident are about stabilizing thinking, not proving a theory.',
    objective: 'Learn a calm first-response sequence for latency spikes, errors, and deploy regressions.',
    summary: 'A walk lesson for incident triage, rollback thinking, and blast-radius control.',
    spokenIntro:
      'An incident response is a decision tree under stress. The work is to narrow the problem quickly without making the system worse.',
    spokenWrap:
      'First stabilize the blast radius, then investigate the root cause.',
    diagramCue: 'Draw a simple incident path: alert, blast radius, recent change, rollback, deeper diagnosis.',
    keyPoints: [
      'Check blast radius before digging into logs.',
      'Compare the failure window against recent changes.',
      'Use metrics to narrow the scope before reading everything.'
    ],
    walkPractice: 'Practice the first three questions you would ask when p95 latency doubles after a deploy.',
    reflectionPrompt: 'What signal would make me stop debugging and roll back immediately?',
    steps: [
      {
        type: 'listen',
        title: 'Stabilize first',
        detail: 'Start with blast radius, user impact, and rollback safety.'
      },
      {
        type: 'explain',
        title: 'Narrow the scope',
        detail: 'Name the specific request path or release window most likely involved.'
      },
      {
        type: 'practice',
        title: 'Say the incident plan',
        detail: 'Talk through what you freeze, what you inspect, and what you communicate.'
      }
    ]
  },
  {
    id: 'lead-01',
    trackId: 'leadership',
    title: 'Push Back Without Blocking',
    durationMinutes: 8,
    level: 'principal',
    format: 'audio-first',
    hook: 'Principal-level judgment sounds like calm pushback plus a safer path.',
    objective: 'Practice responding to a risky request with risk framing and options, not just objections.',
    summary: 'A communication lesson for leading without becoming the bottleneck.',
    spokenIntro:
      'The goal is not to say no elegantly. The goal is to make risk visible and offer a path that still moves the business forward.',
    spokenWrap:
      'Strong pushback is specific, calm, and paired with an alternative.',
    diagramCue: 'Draw three boxes: risk, option, and decision point.',
    keyPoints: [
      'State the risk in business language.',
      'Offer a safer alternative and a decision point.',
      'Be explicit about what is reversible and what is not.'
    ],
    walkPractice: 'Say the response you would give when product wants a risky release too soon.',
    reflectionPrompt: 'How do I preserve trust while making risk visible?',
    steps: [
      {
        type: 'listen',
        title: 'Frame the risk',
        detail: 'Describe the business consequence before the technical detail.'
      },
      {
        type: 'explain',
        title: 'Offer an option',
        detail: 'Present a smaller scope, safer sequence, or later milestone.'
      },
      {
        type: 'practice',
        title: 'Say it clearly',
        detail: 'Practice a concise response that is firm without sounding defensive.'
      }
    ]
  },
  {
    id: 'ai-01',
    trackId: 'leadership',
    title: 'Reviewing AI-Generated Code',
    durationMinutes: 10,
    level: 'principal',
    format: 'mixed',
    hook: 'Plausible code is not the same thing as correct code.',
    objective: 'Learn how to inspect AI-assisted work for correctness, safety, and maintenance risk.',
    summary: 'A walking lesson on using AI output without outsourcing judgment.',
    spokenIntro:
      'AI can accelerate implementation, but it does not replace review. Your job is to check behavior, failure modes, tests, and maintenance cost.',
    spokenWrap:
      'Use AI for speed, but keep ownership of correctness and design.',
    diagramCue: 'Draw a review pipeline: generated code, tests, edge cases, operational risk, and merge decision.',
    keyPoints: [
      'Plausible code still needs validation.',
      'AI review should include edge cases and operational risk.',
      'The human owns the final design and the failure modes.'
    ],
    walkPractice: 'Explain the three checks you would run before trusting an AI-generated change.',
    reflectionPrompt: 'Where would I trust AI to draft, and where would I require deeper proof?',
    steps: [
      {
        type: 'listen',
        title: 'Set the review bar',
        detail: 'Name the correctness standard before you inspect the output.'
      },
      {
        type: 'diagram',
        title: 'Trace the risk path',
        detail: 'Show where wrong assumptions would leak into production.'
      },
      {
        type: 'practice',
        title: 'Run the review',
        detail: 'List the tests, edge cases, and operational checks you would demand.'
      },
      {
        type: 'reflect',
        title: 'Keep ownership',
        detail: 'State what should never be delegated to the model.'
      }
    ]
  },
  {
    id: 'ai-02',
    trackId: 'leadership',
    title: 'When to Use RAG Instead of Fine-Tuning',
    durationMinutes: 9,
    level: 'principal',
    format: 'audio-first',
    hook: 'Most AI knowledge problems are retrieval problems in disguise.',
    objective: 'Choose the simplest path for adding knowledge or behavior to an AI system.',
    summary: 'A lesson on picking retrieval, prompt design, or fine-tuning based on the actual problem.',
    spokenIntro:
      'Before you reach for heavier model customization, ask a simpler question: is the problem knowledge, behavior, or formatting?',
    spokenWrap:
      'RAG often wins because it is simpler, cheaper, and easier to evaluate.',
    diagramCue: 'Draw a triangle labeled knowledge, behavior, and formatting, then place RAG or fine-tuning beside each.',
    keyPoints: [
      'Retrieval is often enough when the problem is missing information.',
      'Fine-tuning is more appropriate when the model needs new behavior.',
      'If you cannot evaluate the gain, do not add complexity yet.'
    ],
    walkPractice: 'Describe a situation where retrieval would be enough and fine-tuning would be wasteful.',
    reflectionPrompt: 'What is the simplest solution that still gives me measurable improvement?',
    steps: [
      {
        type: 'listen',
        title: 'Classify the problem',
        detail: 'Ask whether the issue is knowledge, behavior, or formatting.'
      },
      {
        type: 'diagram',
        title: 'Place the tool',
        detail: 'Map retrieval and fine-tuning to the parts of the problem they actually solve.'
      },
      {
        type: 'practice',
        title: 'Choose the lightest tool',
        detail: 'Say why you would not overbuild the solution.'
      }
    ]
  }
];

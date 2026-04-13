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
  },
  {
    id: 'cloud-01',
    trackId: 'cloud-platform',
    title: 'Reading a Staging Stack Like an Architect',
    durationMinutes: 10,
    level: 'owner',
    format: 'audio-first',
    hook: 'A staging stack is a map of what the team thinks matters right now.',
    objective: 'Learn to read a real AWS stack as a set of trade-offs rather than a pile of services.',
    summary: 'A walk lesson that turns a CloudFormation stack into architecture judgment.',
    spokenIntro:
      'Today we are looking at cloud infrastructure as a design story. Every service in the stack exists to solve a specific problem, and every choice creates a new constraint.',
    spokenWrap:
      'The question is not whether the stack is technically valid. The question is whether it is safe, understandable, and easy to change.',
    diagramCue: 'Sketch the request path from user to CDN to load balancer to service to database.',
    keyPoints: [
      'CloudFormation is infrastructure expressed as code.',
      'The shape of the stack reveals the team’s assumptions about reliability and change.',
      'A staging environment should be close enough to catch real issues but cheap enough to evolve.'
    ],
    walkPractice: 'Explain what the stack tells you about where this team has chosen simplicity and where it has chosen control.',
    reflectionPrompt: 'Which part of this infrastructure would be the first thing to simplify if the system were being rebuilt today?',
    steps: [
      {
        type: 'listen',
        title: 'Read the request path',
        detail: 'Follow the user request from edge to app to database.'
      },
      {
        type: 'diagram',
        title: 'Map the stack',
        detail: 'Draw CDN, load balancer, ECS, S3, and Aurora in a single path.'
      },
      {
        type: 'explain',
        title: 'Call out the trade-offs',
        detail: 'Describe what each service buys you and what operational cost it introduces.'
      },
      {
        type: 'reflect',
        title: 'Name the first simplification',
        detail: 'Pick one part you would reduce if you were redesigning from scratch.'
      }
    ]
  },
  {
    id: 'cloud-02',
    trackId: 'cloud-platform',
    title: 'VPCs, Subnets, and Security Groups',
    durationMinutes: 10,
    level: 'senior',
    format: 'audio-first',
    hook: 'Networking is where cloud architecture becomes real.',
    objective: 'Understand how VPC layout, subnet choice, and security groups affect exposure and operational safety.',
    summary: 'A practical lesson on why public and private placement matters.',
    spokenIntro:
      'If you can explain the difference between a subnet and a security group, you are already past beginner AWS usage. The next step is understanding why those boundaries matter for blast radius.',
    spokenWrap:
      'The goal is to make the public surface area as small and intentional as possible.',
    diagramCue: 'Draw public subnets for entry points and private subnets for data and runtime. Mark allowed traffic arrows.',
    keyPoints: [
      'VPCs define the network boundary.',
      'Subnets and route tables determine traffic flow.',
      'Security groups should be treated as explicit trust contracts.'
    ],
    walkPractice: 'Describe why an ALB might be public while the database stays private.',
    reflectionPrompt: 'Where is my stack exposed unnecessarily, and what could move behind a boundary?',
    steps: [
      {
        type: 'listen',
        title: 'Define the boundary',
        detail: 'State what belongs in the public edge and what should remain private.'
      },
      {
        type: 'diagram',
        title: 'Mark the traffic',
        detail: 'Draw allowed ingress and egress instead of only drawing boxes.'
      },
      {
        type: 'practice',
        title: 'Explain the rule',
        detail: 'Say why one component can be reached from the internet and another cannot.'
      }
    ]
  },
  {
    id: 'cloud-03',
    trackId: 'cloud-platform',
    title: 'ECS Fargate, Health Checks, and Reversibility',
    durationMinutes: 11,
    level: 'principal',
    format: 'mixed',
    hook: 'Deployment safety is architecture too.',
    objective: 'Understand how ECS service configuration, health checks, and task definitions shape release risk.',
    summary: 'A lesson on running containerized services with a reversible deployment mindset.',
    spokenIntro:
      'A production deployment is only good if you can observe it, roll it back, and understand when it is healthy. ECS gives you a lot of control, but that control has to be used deliberately.',
    spokenWrap:
      'Your goal is not just to start the service. Your goal is to make a bad release easy to detect and undo.',
    diagramCue: 'Draw the deployment path: image build, ECR push, ECS task definition, service, ALB health check.',
    keyPoints: [
      'Fargate removes server management but not deployment responsibility.',
      'Health checks should test the real user path as much as possible.',
      'Every deployment strategy should have an obvious rollback path.'
    ],
    walkPractice: 'Explain how you would know a deployment is safe to keep before traffic ramps up.',
    reflectionPrompt: 'Which part of this deployment flow would fail loudly enough, and which failure would be silent?',
    steps: [
      {
        type: 'listen',
        title: 'Understand the release path',
        detail: 'Trace the image, task, service, and load balancer together.'
      },
      {
        type: 'diagram',
        title: 'Mark the health check',
        detail: 'Show where a failing task gets detected and replaced.'
      },
      {
        type: 'practice',
        title: 'Call the rollback',
        detail: 'Say what conditions would make you revert immediately.'
      },
      {
        type: 'reflect',
        title: 'Reduce risk',
        detail: 'Name one configuration choice that would make releases safer.'
      }
    ]
  },
  {
    id: 'cloud-04',
    trackId: 'cloud-platform',
    title: 'SSM, Secrets, and Parameter Boundaries',
    durationMinutes: 9,
    level: 'senior',
    format: 'audio-first',
    hook: 'Secrets management is where convenience and safety collide.',
    objective: 'Learn how to reason about runtime config, secret injection, and access boundaries in AWS.',
    summary: 'A practical lesson on keeping credentials and environment settings under control.',
    spokenIntro:
      'A good cloud setup does not put secrets in code, in images, or in loose config files. It gives the runtime only the values it needs, when it needs them.',
    spokenWrap:
      'If the app can read it, the app should need it. If it does not need it, it should not have it.',
    diagramCue: 'Draw the path from SSM parameter store to ECS task to application process.',
    keyPoints: [
      'SSM Parameter Store is useful for configuration and secret distribution.',
      'KMS permissions matter as much as parameter names.',
      'Least privilege should shape both human access and runtime access.'
    ],
    walkPractice: 'Explain why the task execution role should have only the narrowest read path it needs.',
    reflectionPrompt: 'Which secret or config value in a typical stack is most often overexposed?',
    steps: [
      {
        type: 'listen',
        title: 'Trace the secret path',
        detail: 'Name where the value lives and who is allowed to read it.'
      },
      {
        type: 'explain',
        title: 'Separate config from code',
        detail: 'Say why environment values should not be hard-coded into the app.'
      },
      {
        type: 'practice',
        title: 'Apply least privilege',
        detail: 'Practice a one-sentence rule for who can read what.'
      }
    ]
  },
  {
    id: 'cloud-05',
    trackId: 'cloud-platform',
    title: 'Why We Skip NAT Gateway Until It Is Worth It',
    durationMinutes: 9,
    level: 'senior',
    format: 'audio-first',
    hook: 'NAT gateways are a cost trade-off, not a default badge of maturity.',
    objective: 'Understand when a NAT gateway is useful, when it is overkill, and what alternative shapes exist.',
    summary: 'A lesson about egress design, operational simplicity, and cost discipline.',
    spokenIntro:
      'A NAT gateway solves a real problem: private workloads reaching the internet without being exposed. But that convenience comes with a recurring cost and another moving part to operate.',
    spokenWrap:
      'Skipping NAT was not a shortcut. It was a decision to avoid paying for an abstraction before the workload needed it.',
    diagramCue: 'Draw private compute, an internet path, and the missing NAT hop. Mark the cost and complexity that would be added.',
    keyPoints: [
      'A NAT gateway is useful when private workloads need outbound internet access.',
      'It adds recurring cost and another component to monitor.',
      'You should justify it with a concrete need, not with habit.'
    ],
    walkPractice: 'Explain when you would add NAT later and what evidence would make it worth the spend.',
    reflectionPrompt: 'What egress need am I actually solving for, and is there a cheaper shape that still works?',
    steps: [
      {
        type: 'listen',
        title: 'Name the problem',
        detail: 'State what outbound access is needed for and how often.'
      },
      {
        type: 'explain',
        title: 'Price the convenience',
        detail: 'Say what cost and complexity the NAT adds.'
      },
      {
        type: 'diagram',
        title: 'Show the missing hop',
        detail: 'Draw the path the traffic would take if NAT were introduced.'
      },
      {
        type: 'practice',
        title: 'Defend the omission',
        detail: 'Practice explaining why not adding NAT was a deliberate architectural choice.'
      }
    ]
  },
  {
    id: 'cloud-06',
    trackId: 'cloud-platform',
    title: 'CloudFront, S3, and the Edge',
    durationMinutes: 9,
    level: 'owner',
    format: 'audio-first',
    hook: 'The edge should absorb the boring traffic so the app can focus on the hard parts.',
    objective: 'Learn how CloudFront and S3 separate static delivery from dynamic app behavior.',
    summary: 'A lesson on edge caching, asset hosting, and origin protection.',
    spokenIntro:
      'If your application serves static assets, the edge can take work off the app path and make delivery faster and cheaper. The important part is knowing what should be cached and what should stay dynamic.',
    spokenWrap:
      'Use the edge to reduce load and shrink exposure, not to hide unclear architecture.',
    diagramCue: 'Draw browser, CloudFront, S3, and the app origin. Mark which requests should stop at the edge.',
    keyPoints: [
      'CloudFront reduces origin load and improves latency.',
      'S3 is a strong fit for immutable static assets.',
      'Origin access control helps keep the bucket from being directly public.'
    ],
    walkPractice: 'Explain why the asset bucket should not be directly exposed when CloudFront can front it.',
    reflectionPrompt: 'Which requests in my stack are static enough to move to the edge?',
    steps: [
      {
        type: 'listen',
        title: 'Identify static work',
        detail: 'List the requests that do not need the application server.'
      },
      {
        type: 'diagram',
        title: 'Draw the edge path',
        detail: 'Show browser to CloudFront to S3 and where the app origin still matters.'
      },
      {
        type: 'practice',
        title: 'Explain the protection',
        detail: 'Say how origin access control reduces direct exposure.'
      }
    ]
  },
  {
    id: 'cloud-07',
    trackId: 'cloud-platform',
    title: 'Observability for Cloud Stacks',
    durationMinutes: 10,
    level: 'principal',
    format: 'mixed',
    hook: 'If you cannot see it, you cannot safely change it.',
    objective: 'Build a practical view of logs, metrics, health checks, and alerts across the AWS stack.',
    summary: 'A lesson on making staging useful as a signal source instead of just a place to deploy.',
    spokenIntro:
      'A mature cloud stack is observable at the edges and inside the runtime. That means logs for details, metrics for trends, and health checks for release safety.',
    spokenWrap:
      'Observability is what turns deployment from hope into evidence.',
    diagramCue: 'Draw the system and attach one logging signal, one metric, and one health check to each important layer.',
    keyPoints: [
      'Health checks tell you if the service is alive enough to receive traffic.',
      'Logs explain why something happened.',
      'Metrics tell you when the shape of the system is changing.'
    ],
    walkPractice: 'Name the three signals you would want before trusting a new deployment.',
    reflectionPrompt: 'What would I need to observe before I would call a change safe?',
    steps: [
      {
        type: 'listen',
        title: 'Pick the signals',
        detail: 'Choose one log, one metric, and one health check for the system.'
      },
      {
        type: 'explain',
        title: 'Connect the layers',
        detail: 'Describe how app, load balancer, and database signals fit together.'
      },
      {
        type: 'practice',
        title: 'Define safe to ship',
        detail: 'Say what would need to be true before you would increase traffic.'
      },
      {
        type: 'reflect',
        title: 'Spot blind spots',
        detail: 'Identify one failure mode you would still not see clearly.'
      }
    ]
  },
  {
    id: 'cloud-08',
    trackId: 'cloud-platform',
    title: 'Batch, Queue, or Stream?',
    durationMinutes: 10,
    level: 'senior',
    format: 'audio-first',
    hook: 'Most pipeline design mistakes come from choosing the wrong processing shape too early.',
    objective: 'Learn when to use batch jobs, queue-driven workers, or true streaming systems.',
    summary: 'A lesson on picking the simplest data movement shape that matches the business need.',
    spokenIntro:
      'Not every data problem needs Kafka, and not every workflow should wait for a nightly batch. The right question is how fresh the data must be, how much load you expect, and what failure model you can tolerate.',
    spokenWrap:
      'Choose the lightest pipeline shape that meets the freshness and reliability requirement.',
    diagramCue: 'Draw three columns labeled batch, queue, and stream, then place a real use case under each.',
    keyPoints: [
      'Batch is often the simplest answer when freshness is measured in hours.',
      'Queues are strong when work is event-driven and can be processed asynchronously.',
      'Streaming adds power but also operational and debugging complexity.'
    ],
    walkPractice: 'Take one product use case and explain why you would choose batch, queue, or streaming for it.',
    reflectionPrompt: 'What freshness requirement is actually real, and which one is assumed?',
    steps: [
      {
        type: 'listen',
        title: 'Name the freshness target',
        detail: 'Decide whether the system needs seconds, minutes, or hours of freshness.'
      },
      {
        type: 'diagram',
        title: 'Map the pipeline shape',
        detail: 'Sketch the data path for each of the three processing modes.'
      },
      {
        type: 'practice',
        title: 'Choose the simplest fit',
        detail: 'Defend one shape and explain why the others are too heavy or too weak.'
      }
    ]
  },
  {
    id: 'cloud-09',
    trackId: 'cloud-platform',
    title: 'Queues, Retries, and Poison Messages',
    durationMinutes: 9,
    level: 'senior',
    format: 'audio-first',
    hook: 'Asynchronous systems fail more often through retries than through the original error.',
    objective: 'Understand queue semantics, retry behavior, dead-letter handling, and idempotency.',
    summary: 'A lesson on making event-driven systems stable instead of noisy.',
    spokenIntro:
      'Queues make systems more resilient only when retry behavior is safe. If processing is not idempotent, retries can amplify bad outcomes instead of protecting the system.',
    spokenWrap:
      'The queue is not the safety guarantee. The processing contract is.',
    diagramCue: 'Draw producer, queue, worker, retry path, and dead-letter queue. Mark where duplicate handling matters.',
    keyPoints: [
      'Retries need idempotent work or deduplication.',
      'Dead-letter queues are for visibility and recovery, not for forgetting bad events.',
      'Backpressure and retry storms are architecture problems, not just worker problems.'
    ],
    walkPractice: 'Explain how you would process a payment or webhook queue safely under retries.',
    reflectionPrompt: 'Where would duplicate processing be harmless, and where would it be damaging?',
    steps: [
      {
        type: 'listen',
        title: 'Trace the failure path',
        detail: 'Name what happens when one event fails once, twice, and repeatedly.'
      },
      {
        type: 'diagram',
        title: 'Draw the retry loop',
        detail: 'Show the worker, the retry path, and the dead-letter path.'
      },
      {
        type: 'practice',
        title: 'Protect the side effect',
        detail: 'Say how you would make the consumer safe under duplicate delivery.'
      }
    ]
  },
  {
    id: 'cloud-10',
    trackId: 'cloud-platform',
    title: 'Data Lakes, Warehouses, and Analytical Paths',
    durationMinutes: 10,
    level: 'owner',
    format: 'mixed',
    hook: 'Analytics systems are mostly about choosing where truth should live and how expensive it should be to query.',
    objective: 'Build intuition for operational databases versus warehouses and where transformation should happen.',
    summary: 'A lesson on moving from app data to usable analytical systems.',
    spokenIntro:
      'Production databases are optimized for application behavior. Analytical systems are optimized for questions. Good platform design keeps those goals from fighting each other.',
    spokenWrap:
      'Do not ask the transactional system to become the warehouse unless you enjoy paying twice for the same mistake.',
    diagramCue: 'Draw app database, ingestion path, storage layer, transformation layer, and warehouse query layer.',
    keyPoints: [
      'Operational databases and analytical warehouses solve different problems.',
      'Transformation can happen before storage, after storage, or in the warehouse itself.',
      'Freshness, cost, and modeling discipline define the right analytical path.'
    ],
    walkPractice: 'Explain how you would move product events from the app into a reporting system without hurting the app database.',
    reflectionPrompt: 'Where should the source of analytical truth live in a system like this?',
    steps: [
      {
        type: 'listen',
        title: 'Separate the workloads',
        detail: 'Name what belongs in the transactional path and what belongs in analytics.'
      },
      {
        type: 'diagram',
        title: 'Sketch the pipeline',
        detail: 'Map operational storage to analytical storage through an ingestion step.'
      },
      {
        type: 'practice',
        title: 'Choose the transform point',
        detail: 'Say where you would clean and shape the data and why.'
      }
    ]
  },
  {
    id: 'cloud-11',
    trackId: 'cloud-platform',
    title: 'Managed ML Service or Custom Platform?',
    durationMinutes: 10,
    level: 'principal',
    format: 'audio-first',
    hook: 'Most ML platform decisions are build-versus-buy decisions wearing technical clothing.',
    objective: 'Reason about when managed services like SageMaker are enough and when a custom ML platform is justified.',
    summary: 'A lesson on training, inference, experimentation, and operational ownership in ML systems.',
    spokenIntro:
      'A lot of teams overbuild ML infrastructure before they have enough model maturity to justify it. The first decision is not what is possible. It is what level of control the team actually needs.',
    spokenWrap:
      'Use managed ML until control, cost, or workflow friction creates a strong reason to own more of the platform.',
    diagramCue: 'Draw data prep, training, model registry, deployment, inference, and evaluation. Mark which layers are managed versus custom.',
    keyPoints: [
      'Managed ML services reduce setup cost and speed up experimentation.',
      'Custom platforms become attractive when workflows are repeated, specialized, or constrained.',
      'Inference latency, evaluation, and model lifecycle often matter more than training glamour.'
    ],
    walkPractice: 'Explain when you would stay on a managed ML stack and when you would start carving out custom pieces.',
    reflectionPrompt: 'Which part of an ML system would create enough friction to justify owning more platform?',
    steps: [
      {
        type: 'listen',
        title: 'Define the workflow',
        detail: 'Name the actual training and inference needs before talking tooling.'
      },
      {
        type: 'diagram',
        title: 'Split managed from custom',
        detail: 'Show which layers could stay managed and which might need specialization.'
      },
      {
        type: 'practice',
        title: 'Make the platform call',
        detail: 'Defend managed or custom based on control, speed, and team maturity.'
      }
    ]
  },
  {
    id: 'cloud-12',
    trackId: 'cloud-platform',
    title: 'Feature Stores, Evaluation, and ML Operations',
    durationMinutes: 10,
    level: 'principal',
    format: 'mixed',
    hook: 'ML systems break less often in the model than in the data and evaluation loop around it.',
    objective: 'Understand why feature consistency, offline evaluation, and production feedback loops matter.',
    summary: 'A lesson on turning ML from a demo into a system that can be trusted over time.',
    spokenIntro:
      'The most expensive ML mistake is believing the model problem is solved once training finishes. In practice, the hard work is keeping features, evaluation, and live behavior aligned.',
    spokenWrap:
      'A model without evaluation and feedback is just a temporary success waiting to expire.',
    diagramCue: 'Draw offline data, feature generation, training, evaluation, serving, and feedback back into the system.',
    keyPoints: [
      'Feature consistency between training and serving is a core reliability problem.',
      'Offline evaluation should connect to real business outcomes, not only model metrics.',
      'Production monitoring needs to catch drift, latency, and degraded user impact.'
    ],
    walkPractice: 'Explain how you would know a model is helping in production rather than merely scoring well offline.',
    reflectionPrompt: 'What would I need to monitor before trusting an ML system with user-facing decisions?',
    steps: [
      {
        type: 'listen',
        title: 'Name the reliability loop',
        detail: 'Start from data and trace the loop through training, serving, and feedback.'
      },
      {
        type: 'diagram',
        title: 'Show training-serving alignment',
        detail: 'Mark where feature drift or evaluation gaps could appear.'
      },
      {
        type: 'practice',
        title: 'Define success in production',
        detail: 'State what metric would prove the system is actually helping users or the business.'
      }
    ]
  }
];

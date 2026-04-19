import type { TrackId } from "./curriculum.types";

export type SkillIntakeTopic = {
  key: string;
  label: string;
  description: string;
  trackId: TrackId;
};

export type SkillIntakeSection = {
  trackId: TrackId;
  title: string;
  intro: string;
  topics: SkillIntakeTopic[];
};

export const skillIntakeSections: SkillIntakeSection[] = [
  {
    trackId: "architecture",
    title: "Architecture & system design",
    intro: "Where to draw lines in a system, and when to redraw them.",
    topics: [
      {
        key: "architecture.boundaries",
        label: "Boundaries & coupling",
        description: "Deciding what belongs inside a service or module and what belongs outside.",
        trackId: "architecture"
      },
      {
        key: "architecture.tradeoffs",
        label: "Architectural tradeoffs",
        description: "Weighing monolith vs. service split, sync vs. async, shared db vs. owned db.",
        trackId: "architecture"
      }
    ]
  },
  {
    trackId: "data",
    title: "Databases & data systems",
    intro: "Storage engines, consistency, indexing, and query tradeoffs.",
    topics: [
      {
        key: "data.indexing",
        label: "Indexes & query plans",
        description: "When to add an index, what composite indexes actually do, reading query plans.",
        trackId: "data"
      },
      {
        key: "data.consistency",
        label: "Consistency models",
        description: "Strong, eventual, read-your-writes, and what actually matters for your workload.",
        trackId: "data"
      }
    ]
  },
  {
    trackId: "reliability",
    title: "Reliability & operations",
    intro: "Keeping the thing up, debugging it live, and surviving incidents.",
    topics: [
      {
        key: "reliability.observability",
        label: "Observability basics",
        description: "Logs, metrics, traces — when to use which, and how to correlate them.",
        trackId: "reliability"
      },
      {
        key: "reliability.incidents",
        label: "Incident response",
        description: "Running an incident, writing useful postmortems, owning followups.",
        trackId: "reliability"
      }
    ]
  },
  {
    trackId: "distributed-systems",
    title: "Distributed systems",
    intro: "Coordination, failure modes, and consensus at scale.",
    topics: [
      {
        key: "distributed.failure",
        label: "Failure modes",
        description: "Partial failure, timeouts, retries with backoff, idempotency.",
        trackId: "distributed-systems"
      },
      {
        key: "distributed.consensus",
        label: "Consensus & coordination",
        description: "When you need it (leader election, ordering) and when you can dodge it.",
        trackId: "distributed-systems"
      }
    ]
  },
  {
    trackId: "leadership",
    title: "Leadership & communication",
    intro: "Influence without authority, technical judgment, writing it down.",
    topics: [
      {
        key: "leadership.docs",
        label: "Technical writing & RFCs",
        description: "Writing a decision doc that actually gets engineers aligned.",
        trackId: "leadership"
      },
      {
        key: "leadership.influence",
        label: "Cross-team influence",
        description: "Getting the right decision made without being in the room to enforce it.",
        trackId: "leadership"
      }
    ]
  },
  {
    trackId: "cloud-platform",
    title: "Cloud architecture & AWS",
    intro: "Platform primitives, networking, and what the managed services really cost you.",
    topics: [
      {
        key: "cloud.networking",
        label: "VPC & networking",
        description: "Subnets, NAT, security groups, private vs. public pathing.",
        trackId: "cloud-platform"
      },
      {
        key: "cloud.managed",
        label: "Managed service tradeoffs",
        description: "When Lambda, RDS, SQS, and friends actually pay for themselves.",
        trackId: "cloud-platform"
      }
    ]
  }
];

export const skillIntakeTopics: SkillIntakeTopic[] = skillIntakeSections.flatMap((s) => s.topics);

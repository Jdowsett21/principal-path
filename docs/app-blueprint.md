# App Blueprint

## Working Name

Principal Path

Other strong names:

- Engineer's Gym
- CTO Walk
- System Design Coach
- Upgrade Loop

## Product Promise

Help a working software engineer grow from feature delivery to architectural judgment, systems thinking, and technical leadership through daily mobile practice.

## User

Primary user:

- a mid-level or senior developer who can already code
- wants stronger CS, system design, and architecture intuition
- has 30 to 60 minutes per day in low-friction time slots like walking or commuting
- wants progress that feels practical, measurable, and career-relevant

## Core Design Principles

- audio first, because walking is the main use case
- short interaction loops
- scenario-based learning over textbook learning
- explain trade-offs, not just answers
- focus on judgment under constraints
- build visible momentum with levels and streaks

## Main Loop

### Daily Walk Mode

The user opens the app and starts a session made up of:

1. 5 minute concept primer
2. 5 question quiz
3. 1 design trade-off challenge
4. 1 debugging, scaling, or incident scenario
5. short recap of strengths and weak spots

### Weekly Simulation

Once per week, the user gets a longer scenario such as:

- "Design a payments platform for 1 million users"
- "Your Postgres database is saturating during checkout"
- "An AI-generated PR caused a production incident"
- "You inherited a legacy monolith and need a migration plan"

The app scores the response on:

- correctness
- trade-off quality
- operational thinking
- communication clarity

## Skill Areas

1. Computer science foundations
2. Backend systems
3. Data and databases
4. Distributed systems
5. Scalability and performance
6. Reliability and operations
7. Architecture and design
8. Security and risk
9. Product and business judgment
10. Leadership and technical communication

## Content Types

### Quiz Cards

Fast checks for:

- algorithms
- complexity
- networking
- databases
- caching
- architecture patterns

### Trade-Off Battles

Prompt:
"You need global low-latency reads. Pick between read replicas, Redis, CDN edge caching, or denormalization."

The user chooses and explains.
The app explains what each option optimizes for and what it costs.

### Incident Drills

Prompt:
"Latency doubled after a deploy. What do you inspect first?"

These build operational instinct, not just theory.

### System Design Reps

Prompt:
"Design a URL shortener."

Then the app progressively adds constraints:

- 10x traffic spike
- strict auditability
- multi-region failover
- low engineering headcount

### Leadership Scenarios

Prompt:
"Product wants it in one week. Reliability risk is high. How do you respond?"

This trains principal-level decision making rather than just implementation.

## Game Mechanics

- skill tree with unlocks
- XP by domain
- mastery levels per skill
- boss battles for each competency area
- streaks tied to consistency, not volume
- "explain it out loud" bonus for communication practice

## MVP Screens

1. Onboarding assessment
2. Home dashboard
3. Daily walk session
4. Skill map
5. Weekly simulation
6. Progress and weak spots

## Recommended Technical Approach

### Frontend

- React Native with Expo
- TypeScript
- expo-router

### Backend

- Supabase or Postgres-backed API
- row-level user progress tracking
- content generation and scoring pipeline

### AI Layer

Use AI for:

- generating scenario variants
- grading open-ended answers
- turning lessons into conversational audio summaries
- adapting the next session to weak areas

Do not rely on AI for:

- canonical correctness for foundational concepts without validation
- uncontrolled curriculum generation

### Content Strategy

Start with hand-authored core lessons for the highest-value topics.
Use AI later to create variants around a validated curriculum.

## Best MVP Wedge

If we want this to actually ship, the narrowest strong first version is:

- one user
- solo experience
- audio-first daily sessions
- system design, databases, reliability, and architecture only

That wedge is small enough to build and strong enough to be useful.

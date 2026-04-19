import type { Unit } from "../curriculum.types";

export const aiEngineeringUnits: Unit[] = [
  // ─── Unit 1: The AI-First Workflow ────────────────────────────────
  {
    id: "ai-eng-01",
    phaseId: "ai-engineering",
    order: 1,
    title: "The AI-First Engineering Workflow",
    objective:
      "Use AI for implementation speed without losing design judgment, review discipline, or ownership.",
    durationMinutes: 55,
    stages: [
      {
        type: "walk",
        title: "Why the workflow changes",
        durationMinutes: 10,
        spokenIntro:
          "AI changes the job because it separates design from translation. The engineer still decides what should exist, what should fail, and what tradeoffs matter. The model handles the syntax and the first draft. That makes judgment more visible, not less.",
        spokenBody:
          "A concrete example is retry logic. A good AI-assisted prompt does not say 'add retries.' It names the backoff policy, jitter, timeout budget, failure conditions, logging, and what should happen when the circuit breaker is already open. That is the job now: specify the behavior, generate the draft, then inspect it for missing cases." +
          " The important shift is not that coding becomes easier. The shift is that every omission becomes visible. When you type code by hand, you implicitly handle a lot of edge cases because you are thinking through the code as you write it. When you ask a model to generate code, you have to surface those edge cases explicitly or they disappear. That is why review quality matters more than prompt style." +
          " The two failure modes stay the same. Some engineers distrust the tool and pay the full typing tax. Others trust it too much and ship plausible but incomplete code. The right posture is aggressive generation with adversarial review. Check the scope of change, concurrency, state lifecycle, error handling, and runtime contracts. If the shape is wrong, regenerate. If the code violates an assumption the model could not see, fix the assumption before you accept the patch." +
          " Keep the ability to write by hand, but use it as a calibration tool, not the default mode. You need enough manual fluency to judge whether the model's output is complete, safe, and aligned with the system.",
        spokenWrap:
          "The useful mental model is simple: AI owns the first draft, you own correctness and judgment. Principal-level work is still deciding what matters, what can fail, and what is acceptable to ship. AI does not remove that responsibility. It makes it more obvious.",
        keyPoints: [
          "AI splits engineering into design decisions and code translation — design is the valuable half.",
          "The biggest risk isn't bad code, it's subtly incomplete implementations that look correct.",
          "Adversarial review (actively trying to break AI output) catches what skeptical review misses.",
          "Maintain the ability to write code by hand — you can't review code you couldn't write.",
          "The principal role was always about judgment, not typing. AI just made that obvious."
        ],
      },
      {
        type: "deep-dive",
        title: "The practical AI workflow, step by step",
        durationMinutes: 18,
        spokenIntro:
          "Okay, so the walk set up the mindset — design versus translation, adversarial review, why this matters for your career. Now let's get into the actual mechanics. What does a senior engineer's AI-first workflow look like, minute by minute, when they're working on something real? I'm going to walk you through five stages that I think every AI-assisted task should go through. But I'm not going to just name them — I'm going to show you what good looks like, what bad looks like, and where I've seen experienced engineers still mess up six months into using these tools.",
        spokenBody:
          "Stage one is problem framing, and I cannot overstate how much this matters. Most engineers open their AI tool, type something vague like 'add caching to the user endpoint,' and then get frustrated when the output doesn't match what they wanted. The issue isn't the AI — it's that 'add caching' could mean fifteen different things. Cache where? In memory, in Redis, at the CDN edge? Cache for how long? Invalidate on what events? Cache per-user or shared? What happens on cache miss — stale-while-revalidate or block? What about cache stampedes during high traffic?" +
          " A good prompt for the same task would look something like: 'Add a Redis-backed read-through cache to the GET /users/:id endpoint. Cache key format: user:{id}. TTL 5 minutes. Invalidate on user update and delete. On cache miss, fetch from the database and populate cache before returning. Use the existing Redis client from src/lib/redis. If Redis is unavailable, fall back to the database without error — cache failures should never block user requests. Add structured logging for cache hits, misses, and errors.' That's specific enough that the AI will produce something close to shippable on the first try. It also forces you to make design decisions before you see any code, which is the whole point." +
          " Here's the thing about framing that experienced engineers miss: writing a precise prompt IS the design work. It's not overhead before the real work — it IS the real work. If you can't articulate what you want precisely enough for an AI to implement it, you can't articulate it precisely enough for a junior engineer to implement it either. The prompt is a miniature spec, and writing good specs is the core principal engineering skill. I've seen teams where the senior engineer's AI prompts get saved in a wiki because they're better documentation of design intent than the actual design docs." +
          " There's a technique I call constraint layering that makes framing much more effective. Instead of trying to write the perfect prompt in one shot, you build it in layers. Start with the core behavior: 'Add a cache for user lookups.' Then add constraints one at a time: 'Using Redis.' 'With a 5-minute TTL.' 'Invalidate on writes.' 'Fail open if Redis is down.' Each constraint narrows the solution space. If you get stuck on a constraint — say you're not sure whether to invalidate on writes or use TTL-only — that's a genuine design decision you should think about before generating any code. The layering process surfaces those decisions." +
          " Stage two is context loading, and the skill here is knowing what to show the AI and what not to. The mistake everyone makes at first is giving the AI their entire codebase or pointing it at a huge directory. The AI either gets overwhelmed and produces generic code, or it latches onto irrelevant patterns and reproduces them. The other mistake is giving too little context and getting code that doesn't match your conventions, uses the wrong libraries, or duplicates existing utilities." +
          " The rule of thumb I use: show the AI the file you're editing, plus two to four adjacent files that represent the conventions you want followed. If you're adding a new API endpoint, show it an existing endpoint that's well-written, the route registration file, and the relevant model. If you're adding a service function, show it the service file, the types, and one test file so it knows the testing conventions. You're not giving it the whole codebase — you're giving it examples of what 'good' looks like in your specific project." +
          " There's a subtle skill here that separates intermediate AI users from advanced ones: knowing when the AI needs to see the implementation details versus just the interface. If you're building something that integrates with an existing system, the AI needs to see the interface — the types, the function signatures, the contract. It usually doesn't need to see the implementation behind those interfaces. Showing it the implementation leads to the AI coupling to internal details instead of the public contract. This is the same principle as programming to interfaces — it applies to AI context too." +
          " Stage three is generation, and I want to spend time on something most people rush past: evaluating the shape before evaluating the content. When the AI gives you back code, do not start reading line one. Instead, spend ten seconds on the macro view. How many files did it touch? Did it touch any files you didn't expect? How many new functions or classes did it create? What's the overall size — is it fifty lines for something that should be ten, or ten lines for something that should be fifty? Did it create any new abstractions — a new interface, a new utility function, a new configuration — that you didn't ask for?" +
          " That shape check catches the most expensive AI mistakes. The AI loves to create unnecessary abstractions. It'll add a CacheStrategy interface, a CacheFactory, and a CacheConfig class for a problem that needs a single function with a Redis call. That's not just extra code — it's extra code you'll have to maintain, test, and explain to teammates. If the shape is wrong, don't try to fix the details. Throw it away and re-prompt with a constraint like 'implement this as a single module with no new abstractions.' Editing a bad shape into a good shape takes longer than regenerating." +
          " If the shape looks right — right number of files, right level of abstraction, right amount of code — then move to stage four, which is verification. This is the stage that separates professional AI-assisted development from vibes-driven development. You're doing code review, but against a specific checklist, not a general feeling of 'looks okay.'" +
          " Here's my checklist, in priority order. Number one: scope creep. Did the AI change anything you didn't ask it to change? This is the most common and most dangerous AI behavior. You asked it to add caching, and it also reformatted the file, renamed a variable, extracted a utility function, and updated an import path. Every one of those changes is a potential bug, and they're invisible if you're focused on the caching code. Always diff the full change, not just the new code. If there are scope changes, revert them. Don't try to evaluate whether they're good changes — that's a separate task, and combining it with your current task is how bugs ship." +
          " Number two: error handling. AI-generated code almost always handles the happy path correctly and the error paths partially. The specific things to check: are errors logged or silently swallowed? Do errors propagate with enough context to debug in production? Is there a catch block that catches everything and does something generic, when different errors need different handling? Does the code fail open or fail closed, and is that the right choice for this feature? The caching example is a good one — you absolutely want cache failures to fail open, because a slow response is better than an error. But for an authentication check, you want to fail closed. AI doesn't know which is appropriate for your domain." +
          " Number three: state and lifecycle. Did the AI introduce any state that needs cleanup? New connections, event listeners, intervals, open file handles, in-memory caches that grow without bounds? This is where memory leaks come from, and AI is notorious for creating them because it doesn't think about long-running processes. It generates code that works perfectly for a single request or a test run, and then leaks resources in production." +
          " Number four: concurrency. This is the one that catches senior engineers, not just juniors. The AI almost never considers concurrent access unless you explicitly mention it. If the code reads, modifies, and writes back any shared state — a database row, a cache entry, a file, a counter — ask yourself what happens if two requests do this at the same time. The AI won't ask this question for you." +
          " Number five: convention drift. Does the code follow your project's patterns, or did the AI invent its own? Check error types, logging format, naming conventions, file structure, test structure. AI picks up conventions from the context you give it, but it also blends in patterns from its training data. The result is code that looks almost right — like it was written by a contractor who read the style guide once but missed the unwritten rules." +
          " Stage five is testing, and the key insight here is about the circularity problem. If the AI writes the code and also writes the tests, the tests verify the AI's interpretation of the requirements, not your actual requirements. The tests pass — but they pass for the wrong reasons. This is a particularly insidious problem because it's invisible. You see green tests, you feel confident, and the bug ships." +
          " Three testing approaches that actually work with AI-generated code. First, test-first: write the tests yourself before the implementation, based on the spec, then have the AI implement to make the tests pass. The tests are your requirements document. If the AI's code passes your tests, it's probably right. If it doesn't, the test failures tell you exactly where the AI's interpretation diverged from yours. This is the gold standard." +
          " Second, contract tests: write tests that verify the interface contract, not the implementation. For the caching example: test that calling the endpoint twice hits the database only once. Test that updating a user invalidates the cache. Test that when Redis is down, the endpoint still returns data. These tests are behavioral — they don't know or care how the code is structured, only that it does the right thing. The AI can't game these." +
          " Third, mutation-informed review: use the AI to generate edge case scenarios that should fail. Ask: 'What inputs or conditions would make this code break?' The AI is surprisingly good at finding edge cases in code it didn't write, and decent at finding them in code it did write if you explicitly ask. This doesn't replace tests, but it gives you cases to add to your test suite that you might have missed.",
        spokenWrap:
          "So that's the full loop: frame precisely with constraint layering, load the right three to five files of context, check the shape before reading the content, verify against the five-point checklist — scope creep, error handling, state lifecycle, concurrency, convention drift — and test without letting the AI grade its own work. This isn't a ten-second workflow. It's a serious engineering discipline. But it's still dramatically faster than writing everything by hand, because the AI handles the translation while you focus entirely on design and correctness. That focus shift — from typing to judging — is what makes this workflow produce better code than either human-only or AI-only development. And it's the loop you need to internalize until it's muscle memory, because this is how senior engineers will work for the foreseeable future.",
        keyPoints: [
          "Frame with constraint layering: build the prompt in layers, each one surfacing a real design decision.",
          "Context loading: show 3-5 relevant files, prefer interfaces over implementations, give examples of 'good.'",
          "Shape check before content: count files, abstractions, and lines — regenerate if the shape is wrong instead of editing.",
          "Verification checklist: scope creep, error handling, state/lifecycle, concurrency, convention drift — in that order.",
          "Testing: test-first from the spec, contract tests on behavior, or mutation-informed review. Never let AI test its own code."
        ],
        diagramCue: "Draw the 5-stage loop: Frame (with constraint layers) → Context (3-5 files) → Generate (shape check) → Verify (5-point checklist) → Test (spec-first). Arrow from Verify back to Frame when shape is wrong.",
      },
      {
        type: "case-study",
        title: "The over-trusted refactor",
        durationMinutes: 20,
        format: "decision-tree",
        scenario:
          "You're a senior engineer at a fintech startup. Your team lead asks you to refactor the payment processing module from callbacks to async/await. The codebase is 18 months old, has decent test coverage (72%), and processes real money. You decide to use AI to accelerate the refactor. Walk through the decisions.",
        startNodeId: "start",
        nodes: [
          {
            id: "start",
            situation:
              "You open Cursor and look at the payment module — about 1,200 lines across 4 files. The callback nesting goes 5 levels deep in some places. How do you start?",
            choices: [
              {
                label: "Select all 4 files and prompt: 'Refactor all callbacks to async/await'",
                consequence:
                  "The AI rewrites all 1,200 lines in one shot. It looks clean. But when you run tests, 14 out of 38 fail. The AI changed error handling semantics — try/catch doesn't behave identically to error-first callbacks in all cases, and it silently swallowed three error propagation paths. You now have to debug a massive diff to find what broke.",
                nextNodeId: "big-bang-recovery",
                quality: "poor",
              },
              {
                label: "Start with the innermost callback in one function, refactor just that, verify, then expand",
                consequence:
                  "Smart. You pick the simplest, most self-contained callback chain first — the receipt generation function. The AI converts it cleanly. Tests pass. You have a verified pattern you can apply to the others. This takes more prompts but each one is easy to verify.",
                nextNodeId: "incremental-next",
                quality: "good",
              },
              {
                label: "Ask the AI to analyze the codebase first: 'List all callback patterns and rank by conversion risk'",
                consequence:
                  "Solid first move. The AI identifies 11 callback patterns, flags 3 that have tricky error propagation, and notes that the Stripe webhook handler uses a callback that must stay synchronous. You now have a map before you start cutting.",
                nextNodeId: "analysis-next",
                quality: "good",
              },
            ],
          },
          {
            id: "big-bang-recovery",
            situation:
              "14 tests are failing after the big-bang refactor. The diff is 800 lines. What do you do?",
            choices: [
              {
                label: "Ask the AI to fix the failing tests",
                consequence:
                  "The AI 'fixes' the tests by changing assertions to match the new (broken) behavior. All tests pass now — but you've just deleted the safety net. The error propagation bugs are still there, hidden. This will hit production.",
                nextNodeId: "terminal-bad",
                quality: "poor",
              },
              {
                label: "Git reset, start over with an incremental approach",
                consequence:
                  "Right call. You lost 30 minutes but learned the lesson. The big-bang approach generated plausible-looking code that was subtly wrong. Starting over incrementally, you convert one function at a time and verify each before moving on.",
                nextNodeId: "incremental-next",
                quality: "good",
              },
              {
                label: "Manually debug the 14 failures one by one in the big diff",
                consequence:
                  "You can do this, but it takes longer than doing the refactor incrementally would have. You're doing code review on 800 lines of AI-generated code. After 2 hours you find 3 real bugs and 11 test-environment issues. It works, but it was the slow path.",
                nextNodeId: "incremental-next",
                quality: "okay",
              },
            ],
          },
          {
            id: "analysis-next",
            situation:
              "The AI's analysis flagged 3 high-risk callback patterns: one in the Stripe webhook handler, one in the retry loop, and one in the database transaction wrapper. You're about to start converting. Where do you begin?",
            choices: [
              {
                label: "Start with the safest, lowest-risk functions first to build confidence",
                consequence:
                  "Good instinct. You knock out the 8 easy conversions in 40 minutes, all tests pass, and you've established the pattern. Now you can focus your full attention on the 3 tricky ones.",
                nextNodeId: "hard-cases",
                quality: "good",
              },
              {
                label: "Start with the hardest ones — the Stripe webhook handler — so you tackle risk first",
                consequence:
                  "You spend 45 minutes on the hardest case first. The AI keeps getting the error handling wrong and you're going back and forth. You eventually get it right, but you're mentally tired and rush through the easy ones after. Two of the 'easy' ones have subtle bugs you miss because you burned your focus budget on the hard one.",
                nextNodeId: "hard-cases",
                quality: "okay",
              },
            ],
          },
          {
            id: "incremental-next",
            situation:
              "You're now converting functions one at a time. The AI generates the async/await version and you verify each one. On the third function, the AI converts this pattern:\n\ndb.transaction(callback) → await db.transaction(async () => { ... })\n\nTests pass. But something feels off. What do you check?",
            choices: [
              {
                label: "Check whether the transaction wrapper actually supports async callbacks",
                consequence:
                  "Bingo. Your ORM version's transaction() expects a synchronous callback. Passing an async function means the transaction commits before the async work finishes. The AI's code looks perfect but has a silent data integrity bug. This is the exact kind of thing AI gets wrong — it generates syntactically correct code that violates a runtime contract it can't see.",
                nextNodeId: "hard-cases",
                quality: "good",
              },
              {
                label: "Tests pass, the code reads well, move on to the next function",
                consequence:
                  "The transaction bug ships to production. Two weeks later, you get a support ticket about duplicate charges. The async callback inside a sync transaction wrapper causes a race condition that only manifests under concurrent load. This is the cost of over-trusting AI-generated code that looks right.",
                nextNodeId: "terminal-bad",
                quality: "poor",
              },
              {
                label: "Ask the AI: 'Are there any gotchas with this transaction pattern?'",
                consequence:
                  "The AI says 'Make sure your ORM supports async transaction callbacks.' Helpful — but generic. You still need to actually check your specific ORM version. The AI doesn't know which version you're on. It pointed you in the right direction though.",
                nextNodeId: "hard-cases",
                quality: "okay",
              },
            ],
          },
          {
            id: "hard-cases",
            situation:
              "You're down to the last tricky case: the Stripe webhook handler. The AI's analysis flagged it because the current code uses a callback that must return synchronously to send a 200 response before processing. If you await the processing, Stripe will retry. What do you do?",
            choices: [
              {
                label: "Convert it to async/await but move the heavy processing into a background job / queue",
                consequence:
                  "This is the principal-level answer. You respond to Stripe immediately with 200, enqueue the processing work, and handle it asynchronously. The AI can help implement this, but the architectural decision — 'don't process inline, use a queue' — had to come from you. This is judgment that doesn't come from autocomplete.",
                nextNodeId: "terminal-good",
                quality: "good",
              },
              {
                label: "Leave this one function as callbacks since it has to be synchronous anyway",
                consequence:
                  "Pragmatic and defensible. Not every function needs to be converted. Knowing when to leave something alone is a real skill. The inconsistency is a minor annoyance; the correctness matters more.",
                nextNodeId: "terminal-good",
                quality: "good",
              },
              {
                label: "Ask the AI to convert it to async/await while keeping the synchronous response",
                consequence:
                  "The AI generates something that looks clever — it fires off the processing without awaiting it and returns immediately. But this means unhandled promise rejections will crash the process silently, and there's no retry mechanism if processing fails. It's a time bomb.",
                nextNodeId: "terminal-bad",
                quality: "poor",
              },
            ],
          },
          {
            id: "terminal-good",
            situation: "complete",
            choices: [],
          },
          {
            id: "terminal-bad",
            situation: "complete",
            choices: [],
          },
        ],
        debrief:
          "The pattern in every decision here is the same: AI generates plausible code fast, but the judgment calls — scope of change, risk ordering, runtime contracts the AI can't see, architectural alternatives — those come from you. The engineers who thrive with AI aren't faster typists, they're faster reviewers with better instincts about where bugs hide. That's the skill this whole phase is building.",
      },
      {
        type: "mastery-check",
        title: "Check your understanding",
        durationMinutes: 5,
        questions: [
          {
            id: "ai-eng-01-q1",
            question:
              "You asked an AI to add input validation to a REST endpoint. It generates clean, well-structured validation code. What should you check FIRST?",
            choices: [
              "Whether the validation logic is correct for each field",
              "Whether it changed anything else in the file you didn't ask for",
              "Whether it added appropriate error messages",
              "Whether it follows your team's coding conventions",
            ],
            correctIndex: 1,
            explanation:
              "Unwanted changes are the most dangerous AI output because they're the easiest to miss. The AI 'helpfully' refactors adjacent code, and those changes hide bugs. Check the scope of changes before reviewing their content.",
          },
          {
            id: "ai-eng-01-q2",
            question:
              "You need to refactor a 2,000-line module. What's the highest-leverage thing you can do before writing any prompts?",
            choices: [
              "Write comprehensive tests first so you can verify the refactor",
              "Ask the AI to analyze the module and identify risk areas",
              "Define the exact scope and constraints of the refactor in writing",
              "Select all files and ask for a full rewrite",
            ],
            correctIndex: 2,
            explanation:
              "Problem framing is the highest-leverage stage. A precise scope definition ('convert these 4 callback patterns to async/await, leave the webhook handler alone, preserve all error propagation') produces dramatically better AI output than a vague 'refactor this.'",
          },
          {
            id: "ai-eng-01-q3",
            question:
              "The AI generates tests that all pass for code it just wrote. What's the problem?",
            choices: [
              "AI-generated tests are always lower quality",
              "The tests might be testing the wrong things entirely",
              "The tests are circular — they verify the AI's implementation, not the spec",
              "There's no problem as long as coverage is high",
            ],
            correctIndex: 2,
            explanation:
              "When AI writes both the code and the tests, the tests verify the AI's interpretation of what the code should do, not your actual requirements. If the AI misunderstood the spec, both the code and the tests will agree on the wrong behavior. Tests should come from the spec, not from the implementation.",
          },
          {
            id: "ai-eng-01-q4",
            question:
              "What distinguishes 'aggressive use with skeptical review' from just using AI casually?",
            choices: [
              "Using AI for more tasks throughout the day",
              "Generating more code but verifying every piece against specific criteria",
              "Only using AI for boilerplate and writing important code by hand",
              "Having the AI explain its code before you accept it",
            ],
            correctIndex: 1,
            explanation:
              "The key is the combination: generate aggressively (use AI for everything, not just boilerplate) AND verify skeptically (check for unwanted changes, runtime contract violations, error handling gaps). Most engineers do one or the other — the skill is doing both.",
          },
        ],
      },
    ],
  },

  // ─── Unit 2: AI-Assisted Problem Framing ──────────────────────────
  {
    id: "ai-eng-02",
    phaseId: "ai-engineering",
    order: 2,
    title: "Turning Fuzzy Requirements into Precise Specs with AI",
    objective:
      "Turn vague business asks into scoped, testable technical plans using AI as a framing tool.",
    durationMinutes: 55,
    stages: [
      {
        type: "walk",
        title: "Why problem framing is the principal skill",
        durationMinutes: 10,
        spokenIntro:
          "The gap between senior and principal is usually what happens before code exists. Senior engineers build well from a clear spec. Principals turn vague requests into technical scope, risks, and a plan the team can actually execute.",
        spokenBody:
          "Requirements usually arrive as symptoms, not specs: slow search, multi-tenancy by Q3, the biggest customer is upset, traffic is about to jump, the product team wants a new workflow. None of those are implementations. They are starting points." +
          " AI helps by expanding the problem space before you commit to a solution. You can ask it to enumerate root causes, missing constraints, operational risks, and the questions you should ask before scoping work. That is useful because it gives you a structured draft instead of a blank page." +
          " The value is speed plus precision. Instead of wandering through meetings until the shape of the problem emerges, you arrive with a candidate scope, a risk list, and explicit tradeoffs. The principal skill is not 'knowing the answer.' It is compressing the path from signal to plan.",
        spokenWrap:
          "Problem framing is the leverage point. AI accelerates the search space, but the engineer still decides what matters, what is out of scope, and what the team should do next.",
        keyPoints: [
          "The principal skill: turning fuzzy business asks into precise technical scope.",
          "AI accelerates this by letting you explore the problem space before the first meeting.",
          "Companies pay for the compression of time between 'we have a problem' and 'here's the plan.'"
        ],
      },
      {
        type: "deep-dive",
        title: "The problem framing workflow",
        durationMinutes: 18,
        spokenIntro:
          "Use the same framing loop every time a vague request arrives: capture the ask, expand the problem, collect questions, draft the scope, then stress-test it.",
        spokenBody:
          "Step one: capture the raw ask without interpreting it. Step two: use AI to map possible causes and identify what you do not know yet. Step three: turn that map into targeted questions for stakeholders. Step four: draft the scope with explicit in-scope, out-of-scope, success metrics, and risks. Step five: ask the AI to attack the plan before anyone else sees it." +
          " The point is to move from symptom to scoped decision quickly without confusing hypothesis for fact. AI is useful here because it surfaces alternate explanations and forces you to name the missing information before you commit." +
          " The framing loop is a technical skill, not a meeting skill. If you can do it well, your planning conversations get shorter and your plans get sharper.",
        spokenWrap:
          "Raw ask to scoped plan is the work. AI helps you move through the middle faster, but the final scope still depends on your judgment about constraints, tradeoffs, and risk.",
        keyPoints: [
          "Capture raw: write down exactly what was asked, don't interpret yet.",
          "Expand: use AI to map the full problem space before narrowing.",
          "Clarify: generate targeted questions for stakeholders.",
          "Draft: produce a concrete scope doc from the answers — edit, don't create from scratch.",
          "Stress-test: have AI play devil's advocate before you present.",
        ],
        diagramCue:
          "Flow: Raw Ask → AI Expansion → Clarifying Qs → Stakeholder Answers → AI Draft Scope → AI Stress Test → Final Scope",
      },
      {
        type: "case-study",
        title: "The 'handle more traffic' email",
        durationMinutes: 20,
        format: "decision-tree",
        scenario:
          "You're a senior engineer at a SaaS company. Your CTO sends this Slack message on Monday morning: 'Our biggest enterprise client is going live next month and they'll 10x our traffic. We need to be ready. Can you own this?' You have 4 engineers on your team and 3 weeks. Walk through how you scope this.",
        startNodeId: "start",
        nodes: [
          {
            id: "start",
            situation:
              "You just read the CTO's message. Your first instinct is to start looking at the infrastructure. But you remind yourself: problem framing first. What's your first move?",
            choices: [
              {
                label: "Open the AWS console and check current capacity and scaling config",
                consequence:
                  "You spend 2 hours in the console and find some things that look undersized. But you're guessing about what will actually break because you don't know the traffic shape. Will it be 10x reads? 10x writes? 10x concurrent connections? Burst or sustained? You're optimizing blind.",
                nextNodeId: "blind-optimization",
                quality: "poor",
              },
              {
                label: "Ask the AI to help you map what '10x traffic' actually means — expand the problem space",
                consequence:
                  "You paste the CTO's message into Claude and ask: 'Help me figure out what questions I need answered before I can scope this work.' The AI generates 12 questions covering traffic shape, bottleneck identification, data growth, feature usage patterns, SLA requirements, and rollback plan if things go wrong. You pick the 6 most critical.",
                nextNodeId: "questions-ready",
                quality: "good",
              },
              {
                label: "Reply to the CTO: 'What specifically are you worried about?'",
                consequence:
                  "The CTO replies: 'Everything? Just make sure it doesn't go down.' That didn't help much. The CTO doesn't know the technical bottlenecks — that's why they asked you. You need to come back with specific questions, not open-ended ones.",
                nextNodeId: "questions-ready",
                quality: "okay",
              },
            ],
          },
          {
            id: "blind-optimization",
            situation:
              "You've been in the console for 2 hours. You found that the RDS instance is a db.r5.large and the ECS service has max 4 tasks. These seem small. Do you just scale them up?",
            choices: [
              {
                label: "Yes — double everything as a safe first move",
                consequence:
                  "You doubled the infra cost but the actual bottleneck turns out to be a non-indexed query that scans a full table on every search. Doubling the database instance didn't help because the query is O(n). You need to go back to problem framing.",
                nextNodeId: "questions-ready",
                quality: "poor",
              },
              {
                label: "Stop. Go back and frame the problem properly before changing anything",
                consequence:
                  "Right call. You lost 2 hours but caught yourself. Time to figure out what '10x' actually looks like before you throw money at it.",
                nextNodeId: "questions-ready",
                quality: "good",
              },
            ],
          },
          {
            id: "questions-ready",
            situation:
              "You now have good questions. You meet with the CTO and the client's technical lead. Key answers: the client has 8,000 employees who'll all onboard in the first week. Their usage is 90% reads (dashboard views), 10% writes (form submissions). Peak is Monday mornings, 9-10am. Current system handles 200 concurrent users; they'll bring 2,000 concurrent during peak. No hard SLA yet but 'it can't be slow.' Current p95 latency is 1.2s on the main dashboard. Where do you focus your investigation?",
            choices: [
              {
                label: "Load test the current system at 2,000 concurrent to see what actually breaks first",
                consequence:
                  "This is the highest-signal move. You use a load testing tool (k6 or Artillery) to simulate 2,000 concurrent users hitting the dashboard. Within 5 minutes you find: the database connection pool maxes out at 20, the main dashboard query takes 800ms and doesn't scale, and the ECS tasks hit memory limits at 600 concurrent. Now you have a real priority list, not guesses.",
                nextNodeId: "scope-it",
                quality: "good",
              },
              {
                label: "Have the AI analyze the codebase for potential bottlenecks",
                consequence:
                  "The AI flags some candidate hot spots — a missing index, no connection pooling, synchronous file processing. Some of these are real, some aren't. But without load test data, you don't know which ones actually matter at 10x. Code review finds possibilities; load testing finds facts.",
                nextNodeId: "scope-it",
                quality: "okay",
              },
              {
                label: "Start provisioning bigger instances and higher autoscaling limits",
                consequence:
                  "You're throwing money at it again before understanding the bottleneck. Bigger instances help if the constraint is CPU or memory. They don't help if it's a missing database index or a connection pool ceiling. You need data first.",
                nextNodeId: "scope-it",
                quality: "poor",
              },
            ],
          },
          {
            id: "scope-it",
            situation:
              "You now know the bottlenecks (from load testing or analysis). The top 3 are: database connection pool limit (20, need ~200), a full-table-scan dashboard query, and ECS memory limits. You have 3 weeks and 4 engineers. How do you scope the work?",
            choices: [
              {
                label: "Feed the bottleneck data to AI, draft a scope doc with priorities, timelines, and what you'll explicitly skip",
                consequence:
                  "You generate a scope doc in 45 minutes. It has 3 workstreams (connection pooling, query optimization, ECS scaling), clear owners, a week-by-week plan, an explicit 'not doing' section (no caching layer, no CDN, no architecture changes), and a load-test gate before the client goes live. You share it with the CTO before lunch. They give feedback, you adjust, and the team starts Wednesday with clarity.",
                nextNodeId: "terminal-good",
                quality: "good",
              },
              {
                label: "Split the 3 issues among engineers and tell them to fix their piece by the deadline",
                consequence:
                  "The work gets done, but without a scope doc there's no shared understanding of tradeoffs or what's explicitly out of scope. Engineer B adds a Redis caching layer that nobody asked for, which works but adds operational complexity. Engineer C finishes early but doesn't know they should help with the query work. No load-test gate means you're hoping it works on go-live day.",
                nextNodeId: "terminal-good",
                quality: "okay",
              },
              {
                label: "Write the scope doc yourself from scratch without AI",
                consequence:
                  "The doc is solid because you're experienced. But it took you a day and a half instead of 45 minutes. The team starts Thursday instead of Wednesday. Same quality, slower. This is the 'AI makes you faster at things you're already good at' lesson.",
                nextNodeId: "terminal-good",
                quality: "okay",
              },
            ],
          },
          {
            id: "terminal-good",
            situation: "complete",
            choices: [],
          },
        ],
        debrief:
          "Notice what happened: the technical work (fixing the connection pool, optimizing the query) was the easy part. The hard part — and the part that determines whether you succeed or waste three weeks on the wrong things — was framing the problem correctly. Load testing gave you facts instead of guesses. AI helped you explore the problem space and draft the scope doc fast. But the judgment calls — what to test, what to prioritize, what to explicitly skip — those came from you. That's principal-level work.",
      },
      {
        type: "mastery-check",
        title: "Check your understanding",
        durationMinutes: 5,
        questions: [
          {
            id: "ai-eng-02-q1",
            question:
              "Your PM sends: 'Search is slow, can we fix it?' What's the principal-level first move?",
            choices: [
              "Look at the search query and add an index",
              "Expand the problem space — figure out what 'slow' means, for whom, since when, and what the possible causes are",
              "Set up monitoring on the search endpoint",
              "Ask the PM to write a proper spec",
            ],
            correctIndex: 1,
            explanation:
              "Jumping to a solution ('add an index') assumes you know the problem. Expanding first — understanding the who, what, when, and possible causes — prevents you from solving the wrong problem. This is the framing step.",
          },
          {
            id: "ai-eng-02-q2",
            question:
              "When using AI to draft a scope document, what's the biggest risk?",
            choices: [
              "The AI will write bad prose",
              "The AI will include scope that sounds reasonable but doesn't match your actual constraints",
              "The AI can't format documents properly",
              "Stakeholders won't trust an AI-written doc",
            ],
            correctIndex: 1,
            explanation:
              "AI generates plausible scope that doesn't account for things it can't see — team size, political constraints, technical debt. The draft needs human editing to cut what's out of scope and add what the AI missed. That's why it's a draft, not a deliverable.",
          },
          {
            id: "ai-eng-02-q3",
            question:
              "You need to prepare for a 10x traffic increase. What gives you the highest-signal information about where to focus?",
            choices: [
              "Code review by AI to find potential bottlenecks",
              "Checking current resource utilization in monitoring dashboards",
              "Load testing at the target traffic level to see what actually breaks first",
              "Scaling up all resources proportionally",
            ],
            correctIndex: 2,
            explanation:
              "Load testing reveals actual bottlenecks under real concurrency. Code review finds possibilities; monitoring shows current state; scaling proportionally is guessing. The thing that actually breaks first at 10x is your priority — everything else can wait.",
          },
        ],
      },
    ],
  },
];

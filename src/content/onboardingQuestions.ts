import type { OnboardingQuestionSeed } from '../data/curriculum.types';

export const onboardingQuestions: OnboardingQuestionSeed[] = [
  {
    id: 'oq-01',
    title: 'What are you trying to become?',
    prompt: 'Which direction best matches the engineer you want to grow into?',
    purpose: 'Route the user into the right long-term skill emphasis.',
    options: [
      {
        id: 'principal',
        label: 'Principal-level engineer',
        helpText: 'I want stronger system design, architecture, and influence.'
      },
      {
        id: 'cto',
        label: 'CTO or technical leader',
        helpText: 'I want strategy, scale, and leadership judgment.'
      },
      {
        id: 'consultant',
        label: 'Independent consultant',
        helpText: 'I want broad technical depth and sharper decision-making.'
      }
    ]
  },
  {
    id: 'oq-02',
    title: 'What is your biggest gap?',
    prompt: 'Where do you feel least confident today?',
    purpose: 'Tailor the first lessons to the area that will create the fastest confidence gain.',
    options: [
      {
        id: 'cs',
        label: 'Computer science fundamentals',
        helpText: 'I need better theory, complexity, and core concepts.'
      },
      {
        id: 'architecture',
        label: 'Architecture and system design',
        helpText: 'I need better high-level judgment and trade-offs.'
      },
      {
        id: 'ops',
        label: 'Reliability and operations',
        helpText: 'I need stronger incident and production instincts.'
      }
    ]
  },
  {
    id: 'oq-03',
    title: 'How much time do you actually have?',
    prompt: 'What does a realistic learning session look like on most days?',
    purpose: "Tune session length and challenge density to the user's walk routine.",
    options: [
      {
        id: 'short',
        label: '15 to 20 minutes',
        helpText: 'I need a tight session with a small number of reps.'
      },
      {
        id: 'medium',
        label: '30 to 45 minutes',
        helpText: 'I can do a full walk-mode session most days.'
      },
      {
        id: 'long',
        label: '45 to 60 minutes',
        helpText: 'I want enough depth for lessons plus simulations.'
      }
    ]
  },
  {
    id: 'oq-04',
    title: 'What kind of learning feels best?',
    prompt: 'How should the app teach you most of the time?',
    purpose: 'Balance audio lessons, quizzes, and scenario reps.',
    options: [
      {
        id: 'audio',
        label: 'Audio first',
        helpText: 'I want to listen while walking and answer briefly.'
      },
      {
        id: 'mixed',
        label: 'Mixed audio and interaction',
        helpText: 'I want both explanations and hands-on practice.'
      },
      {
        id: 'challenge',
        label: 'Challenge heavy',
        helpText: 'I want more hard problems and fewer explanations.'
      }
    ]
  },
  {
    id: 'oq-05',
    title: 'What should the app optimize for?',
    prompt: 'What kind of progress would feel most valuable in the first month?',
    purpose: 'Set the early motivation model and progress feedback style.',
    options: [
      {
        id: 'confidence',
        label: 'Confidence under pressure',
        helpText: 'I want to feel calmer in design and incident situations.'
      },
      {
        id: 'depth',
        label: 'Deeper theory',
        helpText: 'I want to understand the why behind senior engineering decisions.'
      },
      {
        id: 'promotion',
        label: 'Career advancement',
        helpText: 'I want to become ready for stronger roles and interviews.'
      }
    ]
  }
];

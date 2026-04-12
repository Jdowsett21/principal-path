# Career Builder

This project is the seed of a mobile learning app designed to help an experienced developer grow into a staff, principal, or CTO-capable engineer.

The core idea is simple:

- turn "I need more computer science and architecture depth" into a visible skill graph
- use short daily sessions that work while walking
- teach through scenarios, trade-offs, and judgment, not just flashcards
- optimize for the skills senior technical leaders actually use in real roles

## Product Direction

The app should feel more like "Duolingo for senior engineering judgment" than a traditional course.

Each day, the user completes a 45 to 60 minute walking-friendly study loop:

1. Audio lesson
2. Short quiz
3. Architecture trade-off challenge
4. Debugging or incident scenario
5. Reflection and confidence rating

## Why This Exists

Many developers can ship code but still feel underpowered in:

- systems design
- databases and scaling
- distributed systems thinking
- reliability and incident response
- architectural trade-offs
- leadership judgment
- reading legacy systems
- translating business goals into engineering decisions

That gap is exactly what this app is meant to close.

## What To Build First

The best first version is not a full social learning platform. It is a focused solo coach.

Recommended MVP:

- onboarding assessment
- skill map with levels
- daily walk mode with audio-first lessons
- 3 challenge types: quiz, scenario, trade-off
- spaced repetition for weak areas
- weekly "principal engineer simulation"

## Repo Contents

- [docs/app-blueprint.md](/Users/jamesdowsett-cooper/Documents/careerBuilder/docs/app-blueprint.md)
- [docs/skill-map.md](/Users/jamesdowsett-cooper/Documents/careerBuilder/docs/skill-map.md)
- [docs/mvp-curriculum.json](/Users/jamesdowsett-cooper/Documents/careerBuilder/docs/mvp-curriculum.json)

## Getting Started

This repo now includes a real Expo / React Native MVP scaffold for the app concept.

To run it locally, install a current Node.js toolchain first, then:

1. `npm install`
2. `npm run start`
3. open the Expo QR code on your phone or run the iOS / Android target

The current environment where this repo was created did not have `node`, `npm`, or `npx` on the PATH, so the app structure was built but not executed here.

## Notes From Initial Role Analysis

One of the job posts provided was accessible on Indeed on April 12, 2026:

- Shakepay Senior Software Engineer, Toronto, ON

That role emphasized:

- ownership of production systems
- working through ambiguity
- reliability and correctness
- product judgment
- on-call and incident response
- Node.js and TypeScript
- Postgres
- cloud and containerized environments
- observability and monitoring
- thoughtful review of AI-assisted code

This project treats those as signals for the kind of deeper capability the app should train.

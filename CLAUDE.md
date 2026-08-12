# Wellness Marketplace — Claude Code Instructions

## Project
Wellness Marketplace is a creator-led wellness coaching platform. Subscribers follow individual certified wellness creators (nutrition, fitness, mental health) rather than generic content libraries — relationship-first, credential-verified, with creator-economy growth mechanics (referrals, tiered subscriptions, creator-authored re-engagement).

Two personas: **Creators** (certified wellness professionals monetizing an audience) and **Subscribers** (people wanting ongoing guidance from a specific trusted person). Identity is mocked via name/email only — no real authentication, payments, or certification verification in this MVP.

Design/UX references: Patreon (creator-subscriber relationship, tiers, referral mechanics), Whoop and Oura (trust-building through data/credential presentation, dashboard patterns), Noom (coaching relationship, check-in cadence, behavior-change framing).

## Tech Stack
- React (Vite): frontend UI
- Supabase: database and data layer (PostgreSQL)
- Claude API (claude-sonnet-4-20250514): AI-assisted content (e.g. bio/check-in drafting), where used
- Vercel: deployment
- Tailwind CSS: styling

## Conventions
- Components: PascalCase filenames, one component per file, lives in /src/components/
- Utility functions: camelCase, lives in /src/lib/
- API calls: all external API calls through /src/lib/api/, never inline in components
- Styling: Tailwind only. No inline styles. No CSS modules.
- State: React useState and useContext only. No Redux, no Zustand.
- File naming: kebab-case for all non-component files

## Do Not
- Do not add real authentication (passwords, OAuth, sessions, password reset). Identity is mocked via name/email only, supporting both creator and subscriber personas.
- Do not build real payment processing — checkout is mocked/stubbed.
- Do not build real certification verification — credentials use a pre-set `verified` flag.
- Do not add streaks, points, or badges. Retention is relationship-driven (creator check-ins, re-engagement nudges), not gamified.
- Do not use CSS other than Tailwind
- Do not add features outside the current build phase without asking first
- Do not create new components when an existing component in the component library covers the use case
- Do not use any AI model other than claude-sonnet-4-20250514
- Always ask before creating a new component file. Confirm the name and location with me first

## References
- Capstone brief: See /docs/wellness-marketplace-capstone-brief.md -- full product brief, personas, build spec, data model, and screen build order
- Design system & component library: See /docs/design.md -- tokens, component inventory/specs, and finalized screen decisions; use existing components before creating new ones
- Build plan: See /docs/build-plan.md -- build phase by phase, do not jump ahead (to be created)

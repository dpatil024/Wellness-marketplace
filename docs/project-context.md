# Project Context Document
**Project:** Wellness Marketplace
**Date:** 2026-08-04
**Source:** `docs/wellness-marketplace-capstone-brief.md` (Creator-Led Wellness Coaching Marketplace — MVP Brief)
**Version:** 1.0

---

## 1. Problem Statement
Wellness apps optimize for content consumption, not relationships. Users churn because there's no accountability or human connection — just libraries of workouts and articles.

## 2. ICP (Ideal Customer Profile)
Two personas:
- **Creators** ("Maya") — certified wellness professionals (nutrition, fitness, mental health) with an existing audience (e.g. IG/TikTok), looking to monetize beyond 1:1 sessions.
- **Subscribers** ("Jordan") — people who follow wellness content and want ongoing, accessible guidance from a specific trusted person — structure and to feel *seen*, not just tracked.

## 3. Pain Points
- No accountability or human connection in existing wellness content apps
- Generic content libraries don't build a relationship between creator and follower
- Retention in wellness apps typically relies on gamification (streaks/points/badges) rather than genuine engagement

## 4. Proposed Solution
A marketplace where subscribers follow individual certified wellness creators, not programs — relationship-first, credential-verified, with creator-economy growth mechanics:
- Creator profiles: bio, credentials (with verified badge), content preview, scope-of-practice disclaimer
- Subscribe flow: free tier + paid tier(s), mocked checkout
- Subscriber dashboard: check-in feed from creator, referral link, credits earned
- Creator dashboard: subscribers, MRR (mocked), check-in composer, referral performance, "nudge inactive subscribers" action
- Referral loop: give/get credit scoped to a specific creator's community, creator-branded invite link
- Growth dashboard: mocked activation, retention (30/60/90-day cohort), and referral conversion metrics
- Retention model: no streaks/points/badges — driven by creator check-ins and creator-authored re-engagement nudges to lapsed subscribers

## 5. Success Metrics
Framed as a case study rather than live KPIs — the growth dashboard mocks three metrics: activation (% of free-tier signups converting to paid), retention (cohort chart at 30/60/90 days), and referral conversion (invites sent vs. converted). No live/computed metrics in MVP; data is seeded.

## 6. Design Constraints
- **Platform:** React (Vite) web app, responsive
- **Auth:** No real authentication — identity mocked via name/email only, supporting both creator and subscriber personas (not single-user, unlike Clean Shopper)
- **Payments:** Mocked/stubbed checkout — no real payment processing
- **Credentialing:** Certification verification is mocked via a pre-set `verified` flag, not real-time verification
- **Data layer:** Supabase (PostgreSQL) — chosen for consistency with the existing Clean Shopper stack, though the brief's suggested default was local JSON/localStorage for a lighter capstone demo
- **AI:** Claude API (claude-sonnet-4-20250514) available for optional AI-assisted content (e.g. bio or check-in drafting); no ingredient/product-analysis use case like Clean Shopper
- **Styling:** Tailwind CSS only
- **Design/UX references:** Patreon (creator-subscriber relationship, tiers, referral mechanics), Whoop and Oura (trust-building through data/credential presentation, dashboard patterns), Noom (coaching relationship, check-in cadence, behavior-change framing)
- **Deployment:** Vercel
- **Out of scope for MVP:** real payments, real certification verification, real authentication, gamified retention (streaks/points/badges)

## 7. Open Questions
1. Should Claude API actually be wired into any MVP screen (e.g. drafting check-in messages), or held in reserve for a later phase?
2. What's the launch niche scope for seed data — brief recommends starting with nutrition coaches only (RD/CNS credentials) for the initial 4-5 seeded creators?
3. Should the re-engagement nudge ("nudge inactive subscribers") be a manual creator action only, or eventually automated/suggested?

## 8. Gaps
1. **Component library** — now documented in `docs/design.md` (tokens, component inventory, screen decisions). Screens 1 (browse) and 2 (creator profile, visual spec only) are covered; screens 3-7 are still unbuilt.
2. **Build plan** — `docs/build-plan.md` not yet created; the brief's suggested build sequence (scaffold → discovery → profile → subscribe/dashboard → referral → creator dashboard → growth dashboard → polish) has not yet been converted into a phased build plan.
3. **Data model detail** — brief defines Creator, Subscriber, Subscription, CheckIn, and ReferralEvent shapes at a minimal level; Supabase schema/migrations not yet designed.
4. **Case study write-up** — brief notes each screen should map to a case-study section; no case study document started yet.

---
*Generated to document decisions made while setting up the Wellness Marketplace project (scaffold, CLAUDE.md, tech stack choices).*

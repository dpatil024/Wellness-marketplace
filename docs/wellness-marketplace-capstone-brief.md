# Creator-Led Wellness Coaching Marketplace — MVP Brief

## Product Brief

### Problem

Wellness apps optimize for content consumption, not relationships. Users churn because there's no accountability or human connection — just libraries of workouts and articles.

### Solution

A marketplace where subscribers follow individual certified wellness creators (nutrition, fitness, mental health), not programs. Relationship-first, credential-verified, creator-economy growth mechanics.

### Target users

- **Creators**: certified wellness professionals wanting to monetize an audience beyond 1:1 sessions  
- **Subscribers**: people wanting ongoing, accessible guidance from a specific trusted person

### Core features (MVP)

1. Creator profile (bio, credentials, content preview)  
2. Subscribe flow (free tier \+ paid tier)  
3. Subscriber dashboard (updates/messages from creator)  
4. Referral mechanic (invite link)  
5. Mocked growth dashboard (activation, retention, referral conversion)

### Differentiator

Trust and credentialing layer: verified certification badges, clear scope-of-practice boundaries, disclaimers separating coaching from clinical care.

### Go-to-market angle

Launch with **nutrition coaches** first: clearest outcome metrics, easiest credential verification, strong existing creator-economy precedent (many nutrition creators already have audiences on Instagram/TikTok). This is also the easiest niche to prototype convincingly — credentials (RD, CNS) are well-known and verification logic is simple to mock credibly.

### Growth loops

1. **Creator-driven referral** — subscriber invites a friend into their creator's community (not "share the app")  
2. **Tiered upsell** — free content to paid 1:1/group access  
3. **Re-engagement nudge** — a lapsed subscriber gets a check-in prompt *from their creator*, not the app. This is the one most worth building carefully: it's the clearest expression of "relationship, not gamification," since the re-engagement trigger is a person reaching out, not a system notification.

---

## Case Study Outline (for the write-up)

1. **Problem & insight** — why wellness apps churn; the relationship-vs-content insight  
2. **Strategic bet** — why creator-led beats program-led; who you'd launch with and why (nutrition coaches)  
3. **Domain expertise applied** — credentialing/trust design, scope-of-practice reasoning, how this reflects health-plan trust patterns  
4. **Design decisions** — key screens, why relationship-first UX shapes the flows  
5. **Growth mechanics** — the 3 loops, what metric each moves, how they avoid pure gamification  
6. **Metrics dashboard** — mocked activation/retention/referral data, framed like a real product report  
7. **Outcomes/reflection** — what this demonstrates about your strategy and growth thinking, tied back to UPMC results

Each MVP screen below should map to one of these sections when you write the case study — build with the write-up in mind, not just the demo.

---

## Build Spec (for Claude Code)

### Personas

- **Creator ("Maya")** — certified nutrition coach with an existing IG/TikTok audience, converting followers into recurring revenue.  
- **Subscriber ("Jordan")** — follows wellness content, wants structure and to feel *seen*, not just tracked.

### Core flows

**A. Creator profile flow**

1. Onboarding: name, niche, bio, certification (type \+ verified flag), photo  
2. Scope-of-practice disclaimer tied to niche, shown on profile \+ at subscribe time  
3. Offer setup: free tier (public content) \+ paid tier(s)  
4. Public profile: bio, verified badge, testimonials, content preview, subscribe CTA  
5. Creator dashboard: subscribers, MRR (mocked), referral performance, check-in composer

**B. Subscriber flow**

1. Discovery: browse/search, filterable by niche \+ credential type  
2. Profile view → subscribe CTA  
3. Subscribe: pick tier → mock checkout → confirmation  
4. Subscriber dashboard: active subscriptions, check-in feed from creator, referral link, credits earned

**C. Retention: relationship, not gamification** No streaks/points/badges. Retention \= creator check-ins landing in the subscriber's feed, plus the re-engagement nudge (creator-authored prompt to a lapsed subscriber) from the growth loops above.

**D. Referral loop** Give/get credit, scoped to a specific creator's community: referrer gets 1 free month when a referred friend subscribes to the *same creator*; referred friend gets a discount on their first month. Invite link is creator-branded ("Jordan invited you to join Maya's community").

**E. Growth dashboard (mocked)**

- Activation: % of free-tier signups converting to paid within X mock days  
- Retention: mock cohort chart, active at 30/60/90 days  
- Referral conversion: invites sent vs. converted

### Minimal data model

Creator {

  id, name, niche, bio, photoUrl,

  credentials: \[{ type, verified: bool }\],

  scopeOfPracticeNote,

  tiers: \[{ id, name, price, description }\]

}

Subscriber {

  id, name, email, referredBy (subscriberId | null), referralCode,

  lastActiveAt

}

Subscription {

  id, subscriberId, creatorId, tierId, status, startDate

}

CheckIn {

  id, creatorId, subscriberId (null \= broadcast to all), message, createdAt, type ("update" | "reengagement")

}

ReferralEvent {

  id, referrerId, referredId, creatorId, rewardApplied (bool), rewardType

}

(`CheckIn.type` distinguishes a normal update from a re-engagement nudge, so the growth loop \#3 has something concrete to point to in the data.)

### Screens (build order)

1. Landing/browse — creator grid, filter by niche \+ credential type  
2. Creator public profile — bio, verified badge, scope-of-practice note, tiers  
3. Subscribe flow (tier → confirm)  
4. Subscriber dashboard — check-in feed \+ referral link \+ credits earned  
5. Creator dashboard — subscribers, MRR, check-in composer, referral leaderboard  
6. Referral landing page — creator-branded invite page  
7. Growth dashboard — activation/retention/referral charts (mocked)

### What to mock vs. build for real

- **Build for real**: navigation, state, referral attribution logic, check-in feed, credential filter logic, re-engagement nudge trigger (e.g. a button on creator dashboard: "nudge inactive subscribers")  
- **Mock/stub**: payments, certification verification (pre-set flag), auth (name/email only), growth dashboard numbers (seeded, not computed live)

### Suggested Claude Code build sequence

1. Scaffold app shell \+ routing \+ mock data (4-5 creators across niches, seed subscribers, at least one lapsed subscriber for the re-engagement demo)  
2. Browse/discovery page with filters  
3. Creator profile page  
4. Subscribe flow \+ subscriber dashboard with check-in feed  
5. Referral code generation \+ creator-branded landing page \+ attribution logic  
6. Creator dashboard (MRR, subscribers, check-in composer, referral leaderboard, "nudge inactive" action)  
7. Growth dashboard with mocked charts  
8. Polish pass: empty states, loading states, responsive layout  
9. Write case study alongside, screenshotting each flow as it's finished

### Suggested stack

Next.js (or React \+ Vite) \+ Tailwind, local JSON/localStorage or in-memory store, deployed via Vercel for a shareable link.

### Where your background adds credibility

Health-plan/payer-side experience (credentialing, scope-of-practice, trust requirements) is the reason this MVP has a trust layer a generic Patreon clone wouldn't need — and it's the throughline for case study section 3 and the "tied back to UPMC results" close in section 7\.  

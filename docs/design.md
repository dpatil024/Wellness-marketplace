# Wellness Marketplace — Design System

Single source of truth for the visual system and component inventory —
tokens, components, and screen decisions, in one place.

Visual source of truth (static HTML, open directly in a browser):
- `docs/design-tokens-reference.html` — color ramps, type scale, radii, shadow
- `docs/creator-profile-reference.html` — creator profile mockup (screen 2)
- `docs/landing-page-reference.html` — creator grid mockup (screen 1)

Tokens live in `src/index.css` via Tailwind v4's `@theme` — every value
below is a real utility class (e.g. `bg-primary-700`, `text-metric-hero`),
not just documentation.

---

## Principles (inspiration → rule)

| Reference | Takeaway | Rule |
|---|---|---|
| Patreon | Tier cards live directly under the bio | Creator profile stacks bio → scope note → tiers, nothing in between. |
| Cameo | Uncluttered profile: photo, price, one CTA | One CTA color (`--color-accent-*`) per screen. No card or screen gets two competing buttons — this killed a Fay-style dual-CTA browse card. |
| Noom / Ro | Disclaimer copy is short, sits right before the gated action | Scope-of-practice note sits immediately above the subscribe button, small text, never a footer/modal. |
| Whoop / Oura | Dashboards lead with one hero metric | `--text-metric-hero` on exactly one number per dashboard view; everything else uses `--text-metric-secondary` or smaller. |
| Zencare (research) | Credential/specialty tags visible on the card itself | Browse-grid cards carry credential chips, not just a name — judge fit without a click-through. |
| Fay Nutrition (research) | Photo + credential + rating + specialty pills + bio + CTA | Closest structural match for our `CreatorCard`; we kept everything except its second CTA. |
| Wyzant (research) | Stats/price/response-time/reviews all on one card | Negative example — too dense for a browse grid; that detail belongs on the profile, not the card. |

---

## Tokens

### Color — primary (trust)
`--color-primary-50…900`, deep teal-green. Nav, headers, verified badge,
paid-tier background tint (`--color-primary-tint`).

### Color — accent (the one CTA color)
`--color-accent-50…900`, warm terracotta/coral. Subscribe / Join / Confirm
only. Never a second action on the same screen.

### Color — verified
`--color-verified-50/100/500/600/700`, distinct blue. Badges only, never a
button, so a credential signal is never mistaken for something clickable.

### Color — neutral
`--color-neutral-0…900`. `neutral-50` = page background, `neutral-0` =
card/surface white. **Light-only** — no dark-mode variant (see Theme note
below).

### Color — semantic
`--color-success-500` / `--color-warning-500` / `--color-danger-500`.
System feedback, not brand actions.

### Color — creator-profile accents
- `--color-mauve-50/200/600` — Community (free) tier card
- `--color-slate-50/200/600` — reserved slate palette (RD chip explored this, ultimately shipped blue instead)
- `--color-slate-blue-50/600` — scope-of-practice note background
- `--color-plum-50/200/600` — "Certified Nutrition Specialist" chip family
- `--color-cream` — page background for the profile and browse screens

### Typography
- `--font-sans` / `--font-heading`: Inter — body copy and general UI headings
- `--font-display`: Source Serif 4 (falls back to Iowan Old Style, Charter, Georgia) — creator name/headline only
- Standard scale: `--text-xs` (12px) → `--text-4xl` (36px)
- Dashboard scale: `--text-metric-hero` (64px, one per view) / `--text-metric-secondary` (24px)

### Radius
`--radius-sm` (6px) → `--radius-xl` (24px), `--radius-full` for pills/avatars/badges. Cards default to `--radius-lg`.

### Shadow
`--shadow-card` (resting) → `--shadow-card-hover` → `--shadow-popover`. Low elevation throughout — flat-plus-soft, not skeuomorphic.

### Theme
Light-only, warm base. `body { color-scheme: light }` is set deliberately —
an earlier pass had a `prefers-color-scheme: dark` override that flipped
`neutral-900` text to near-white against the fixed `--color-cream`
background, making text unreadable. Removed; this system does not invert.

---

## Component inventory

### Built (`/src/components/`)

| Component | Props | Notes |
|---|---|---|
| `Button.jsx` | `variant` (`primary` \| `ghost`), standard button props | `primary` = accent fill, the one-CTA color. `ghost` = neutral outline. Pill-shaped. Not used by `TierCard` (see below). |
| `Card.jsx` | `className`, children | Plain surface: white, `neutral-200` border, `radius-lg`, `shadow-card`. No baked-in padding. |
| `TierCard.jsx` | `variant` (`free` \| `paid`), `name`, `description`, `price`, `onSelect` | `free` = mauve tint + mauve ghost button ("Join free"); `paid` = teal tint + solid teal button ("Subscribe"). Uses its own button markup (not `Button.jsx`) so it can hit the exact mauve/teal colors instead of the generic accent/ghost variants. |
| `CreatorCard.jsx` | `slug`, `name`, `niche`, `verified`, `credentials` (`[{label, variant}]`), `bio` | Avatar, name + `VerifiedBadge`, niche, credential chips, one-line bio, single "View profile" link (routes to `/creators/:slug`). `variant` on each credential is `verified` \| `plum` \| `mauve`. |
| `BrowseCreators.jsx` | none (self-contained, owns filter state) | Filter pills (niche + verified-only) + responsive 3→2→1 column grid of `CreatorCard`. Reads from `src/lib/mock-creators.js`. |
| `CreatorProfile.jsx` | none (reads `:slug` from the route via `useParams`) | Full profile screen — avatar, name + `VerifiedBadge`, niche/tagline, credential chips, bio, `ScopeOfPracticeNote`, `TierCard` list, check-in card. Looks up data via `getCreatorBySlug`. |
| `VerifiedBadge.jsx` | `size` (`sm` \| `lg`) | Small teal checkmark badge. Used on both the browse card and the profile. |
| `ScopeOfPracticeNote.jsx` | children (the note text) | Blue-gray box, fixed "What this is (and isn't):" lead-in bolded. |
| `SubscribeFlow.jsx` | none (reads `:slug` + `?tier=` from the route) | Two-step: tier picker (reuses `TierCard`, pre-selects if `?tier=free\|paid` is present) → name/email form → writes a real subscriber + subscription via `createSubscription`. Route `/creators/:slug/subscribe`. |
| `ConfirmationScreen.jsx` | `creatorName`, `tierName`, `slug` | Success state after subscribing — checkmark, "You're in", link back to the creator's profile. |

### Data

`src/lib/mock-creators.js` — `CREATORS` array + `getCreatorBySlug(slug)`.
Shared by `BrowseCreators` and `CreatorProfile` so both screens show the
same 4 seeded creators (Maya/RD+CNS, Jordan/CSCS, Sam/LPC, Priya/CPT),
including real Unsplash photo URLs.

### Data layer / Supabase — live

The app is connected to a real Supabase project (Postgres). `BrowseCreators`
and `CreatorProfile` read from it, not mock data, in the current build.

`src/lib/api/supabase-client.js` — Supabase client. `isSupabaseConfigured`
still gates it (`.env.local`, copied from `.env.example`), so the app falls
back to `mock-creators.js` automatically if credentials are ever missing —
useful for running the app without touching the database, but not the
normal path anymore.

`src/lib/api/creators.js` — `getCreators()`, `getCreatorBySlug(slug)`,
`getLatestCheckIn(creator)`, all querying the live tables below.

`src/lib/api/subscriptions.js` — `createSubscription({creatorId, tierId,
name, email})`, called from `SubscribeFlow`. Writes real `subscribers` +
`subscriptions` rows. IDs are generated client-side
(`crypto.randomUUID()`) rather than read back from the insert, because
those tables have no SELECT grant for anon (see below) — requesting
`.select()` after an insert needs SELECT to return the row, which would
undo the lock-down, so the code inserts with an explicit id instead.

`supabase/schema.sql` — full table set matching the brief's data model
(creators, credentials, tiers, subscribers, subscriptions, check_ins,
referral_events), with RLS enabled everywhere. Public read policies +
explicit `grant select` on the creator-facing tables (`creators`,
`credentials`, `tiers`, `check_ins`). `subscribers`/`subscriptions` have
RLS on with an **insert-only** policy + `grant insert` (no select/update/
delete) — the subscribe flow can create real rows, but the anon key can
never read them back. `referral_events` stays fully closed (no policies at
all) until the referral flow (screen 4/6) is built.

`supabase/seed.sql` — fake data, already loaded into the live project: 4
creators, 4 subscribers (one lapsed 45 days, for the re-engagement nudge
demo), subscriptions, broadcast check-ins, one re-engagement check-in, one
referral event.

**Known gotcha hit during setup**: RLS policies alone don't grant PostgREST
access — Postgres also needs an explicit `grant select` for the `anon`
role, and PostgREST caches permissions, so a `NOTIFY pgrst, 'reload
schema';` was needed after granting for the change to take effect
immediately. Both the grants and this note are captured in `schema.sql`.

### Routing

`react-router-dom`, `BrowserRouter` wraps `<App />` in `main.jsx`. Routes:
`/` → `BrowseCreators`, `/creators/:slug` → `CreatorProfile`.

### Planned (not yet built — per the capstone brief's screen order)

Confirm name/location with the user before creating any of these, per
`CLAUDE.md`.

| Screen (brief order) | Likely components | Notes |
|---|---|---|
| 1. Landing/browse | `CreatorCard`, `BrowseCreators` | **Built.** |
| 2. Creator public profile | `CreatorProfile`, `VerifiedBadge`, `ScopeOfPracticeNote` | **Built.** |
| 3. Subscribe flow | `SubscribeFlow`, `ConfirmationScreen` | **Built.** Route `/creators/:slug/subscribe`. |
| 4. Subscriber dashboard | `CheckInFeed`, `CheckInCard`, `ReferralLinkCard`, `CreditsSummary` | "Relationship not content library" — check-in cards should read as authored messages (see the check-in preview in the profile reference), not system notifications. |
| 5. Creator dashboard | `StatTile`/metric components, `CheckInComposer`, `ReferralLeaderboard`, `NudgeInactiveButton` | Apply the Whoop/Oura hero-metric rule: one `text-metric-hero` number, rest `text-metric-secondary`. |
| 6. Referral landing page | `ReferralLandingHero` | Creator-branded invite page ("X invited you to join Maya's community"). |
| 7. Growth dashboard | Chart components (mocked data) | Same hero-metric rule as the creator dashboard — one dominant number per view. |

---

## Screen decisions

### Screen 1 — Landing / browse (finalized)

| Element | Decision |
|---|---|
| Card CTA | Single "View profile" button. A Fay-style second "Subscribe" button was mocked up and rejected — flow is browse → profile → subscribe, and skipping to subscribe would skip the scope-of-practice note. |
| Card contents | Avatar, name + verified badge, niche, credential chips, one-line bio. No rating/price/stats (rejected the Wyzant-style density). |
| Filter bar | Pills: niche (single-select) + "Verified only" (toggle), above the grid. |
| Grid | 3 columns → 2 → 1, responsive. |

Open: exact filter-pill multi-select behavior, final niche list for v1.

### Screen 2 — Creator profile (built)

| Element | Decision |
|---|---|
| Background | Warm cream (`--color-cream`). Apricot/peach/sky/sage tried and rejected. |
| Verified badge | Teal (`--color-primary-tint` bg, `--color-primary-700` text). |
| "Registered Dietitian" chip | Blue — clinical/trust-coded. Teal, clay, and ink-outline alternatives rejected. |
| "Certified Nutrition Specialist" chip | Pink (plum family). A mauve match-the-tier alternative rejected. |
| Community (free) tier | Mauve, quiet. A blue-gray/mauve two-tone pairing was tried and rejected in favor of this single tone. |
| 1:1 Coaching (paid) tier | Light teal tint — chosen so it doesn't clash with the mauve Community card beside it. |
| Scope-of-practice note | Blue-gray background, 12.2px. Sage-teal and deeper-teal variants rejected. |
| Name/headline | Source Serif 4, 31.3px. |
| Bio | Inter, 14.7px. |

Implemented as `CreatorProfile.jsx`. The mauve/plum/slate-blue/primary-tint
tokens listed under "Color — creator-profile accents" are all live in this
component (previously only used in the static reference file).

---

## Usage example

```jsx
<div className="bg-cream min-h-screen">
  <h1 className="font-display text-3xl text-neutral-900">Maya Reyes</h1>
  <span className="bg-primary-tint text-primary-700 rounded-full px-2.5 py-0.5 text-xs">
    Verified RD
  </span>
  <p className="text-sm text-slate-blue-600 bg-slate-blue-50 rounded-lg p-3">
    What this is (and isn't): coaching, not clinical care.
  </p>
  <button className="bg-accent-500 hover:bg-accent-600 text-neutral-0 rounded-full px-5 py-2.5">
    Subscribe
  </button>
</div>
```

No inline styles, no CSS modules — Tailwind utilities only, per `CLAUDE.md`.

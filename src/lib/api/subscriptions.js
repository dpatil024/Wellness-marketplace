import { supabase, isSupabaseConfigured } from './supabase-client'

// Mocked identity (per CLAUDE.md: no real auth) — every subscribe creates a
// fresh subscriber row rather than looking one up by email. Fine for this
// MVP demo; a real auth layer would replace this with a session lookup.
//
// IDs are generated client-side (crypto.randomUUID()) rather than read back
// from the insert, because subscribers/subscriptions intentionally have no
// SELECT grant for anon (PII tables — see supabase/schema.sql). Requesting
// `.select()` on an insert needs SELECT to return the row, which would
// undo that lock-down; inserting with an explicit id avoids needing it.
export async function createSubscription({ creatorId, tierId, name, email }) {
  if (!isSupabaseConfigured) {
    // No database connected — just simulate success so the flow still works.
    return { id: 'mock-subscription', name, email }
  }

  const subscriberId = crypto.randomUUID()
  const subscriptionId = crypto.randomUUID()
  const referralCode = `${name.split(' ')[0].toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 7)
    .toUpperCase()}`

  const { error: subscriberError } = await supabase.from('subscribers').insert({
    id: subscriberId,
    name,
    email,
    referral_code: referralCode,
  })

  if (subscriberError) throw subscriberError

  const { error: subscriptionError } = await supabase.from('subscriptions').insert({
    id: subscriptionId,
    subscriber_id: subscriberId,
    creator_id: creatorId,
    tier_id: tierId,
  })

  if (subscriptionError) throw subscriptionError

  return { id: subscriptionId, subscriberId, name, email }
}

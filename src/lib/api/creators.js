import { supabase, isSupabaseConfigured } from './supabase-client'
import { CREATORS as MOCK_CREATORS } from '../mock-creators'

function mapCreatorRow(row) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    niche: row.niche,
    tagline: row.tagline,
    verified: true,
    photoUrl: row.photo_url,
    bio: row.bio,
    fullBio: row.bio,
    scopeNote: row.scope_of_practice_note,
    credentials: (row.credentials ?? []).map((c) => ({
      label: c.label,
      variant: c.variant,
      fullName: c.full_name,
    })),
    tiers: (row.tiers ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((t) => ({
        id: t.id,
        variant: t.variant,
        name: t.name,
        description: t.description,
        price: t.price_cents ? `$${(t.price_cents / 100).toFixed(0)}` : undefined,
      })),
  }
}

export async function getCreators() {
  if (!isSupabaseConfigured) return MOCK_CREATORS

  const { data, error } = await supabase
    .from('creators')
    .select('*, credentials(*), tiers(*)')
    .order('created_at')

  if (error) throw error
  return data.map(mapCreatorRow)
}

export async function getCreatorBySlug(slug) {
  if (!isSupabaseConfigured) {
    return MOCK_CREATORS.find((creator) => creator.slug === slug) ?? null
  }

  const { data, error } = await supabase
    .from('creators')
    .select('*, credentials(*), tiers(*)')
    .eq('slug', slug)
    .maybeSingle()

  if (error) throw error
  return data ? mapCreatorRow(data) : null
}

export async function getLatestCheckIn(creator) {
  if (!isSupabaseConfigured) return creator.checkIn ?? null

  const { data, error } = await supabase
    .from('check_ins')
    .select('message, created_at')
    .eq('creator_id', creator.id)
    .is('subscriber_id', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) throw error
  if (!data) return null

  return {
    message: data.message,
    time: new Date(data.created_at).toLocaleString('en-US', {
      weekday: 'long',
      hour: 'numeric',
      minute: '2-digit',
    }),
  }
}

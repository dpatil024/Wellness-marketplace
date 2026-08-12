import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import { getCreatorBySlug } from '../lib/api/creators'
import { createSubscription } from '../lib/api/subscriptions'
import TierCard from './TierCard'
import ConfirmationScreen from './ConfirmationScreen'

export default function SubscribeFlow() {
  const { slug } = useParams()
  const [searchParams] = useSearchParams()

  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedTier, setSelectedTier] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    getCreatorBySlug(slug).then((found) => {
      setCreator(found)
      if (found) {
        const requestedVariant = searchParams.get('tier')
        const preselected = found.tiers.find(
          (t) => t.variant === requestedVariant,
        )
        setSelectedTier(preselected ?? null)
      }
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <p className="text-neutral-500 text-sm">Loading…</p>
      </div>
    )
  }

  if (!creator) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center gap-4">
        <p className="text-neutral-600">Creator not found.</p>
        <Link to="/" className="text-primary-700 font-semibold text-sm">
          Back to browse
        </Link>
      </div>
    )
  }

  if (confirmed) {
    return (
      <ConfirmationScreen
        creatorName={creator.name}
        tierName={selectedTier.name}
        slug={creator.slug}
      />
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      await createSubscription({
        creatorId: creator.id,
        tierId: selectedTier.id,
        name,
        email,
      })
      setConfirmed(true)
    } catch (err) {
      setError('Something went wrong — please try again.')
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-md mx-auto px-6 py-14">
        <Link
          to={`/creators/${creator.slug}`}
          className="block text-center text-xs font-semibold tracking-wide uppercase text-primary-700 mb-10"
        >
          ← Back to {creator.name}'s profile
        </Link>

        {!selectedTier ? (
          <>
            <h1 className="font-display font-semibold text-2xl text-neutral-900 text-center m-0 mb-1">
              Choose a tier
            </h1>
            <p className="text-sm text-neutral-500 text-center mb-8">
              Join {creator.name}'s community
            </p>
            <div className="flex flex-col gap-3">
              {creator.tiers.map((tier) => (
                <TierCard
                  key={tier.name}
                  {...tier}
                  onSelect={() => setSelectedTier(tier)}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display font-semibold text-2xl text-neutral-900 text-center m-0 mb-1">
              {selectedTier.name}
            </h1>
            <p className="text-sm text-neutral-500 text-center mb-8">
              {selectedTier.price
                ? `${selectedTier.price} / month · `
                : 'Free · '}
              {selectedTier.description}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-0 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary-700"
                  placeholder="Jordan Smith"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-neutral-600 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-neutral-200 bg-neutral-0 px-3.5 py-2.5 text-sm text-neutral-900 outline-none focus:border-primary-700"
                  placeholder="jordan@example.com"
                />
              </div>

              {error && <p className="text-xs text-danger-500">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="mt-2 w-full text-sm font-semibold text-neutral-0 bg-primary-700 hover:bg-primary-800 disabled:opacity-60 rounded-full py-2.5 transition-colors"
              >
                {submitting
                  ? 'Confirming…'
                  : selectedTier.price
                    ? `Subscribe — ${selectedTier.price}/month`
                    : 'Join free'}
              </button>
              <button
                type="button"
                onClick={() => setSelectedTier(null)}
                className="text-xs font-semibold text-neutral-500"
              >
                Choose a different tier
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

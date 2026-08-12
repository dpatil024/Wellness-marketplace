import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getCreatorBySlug, getLatestCheckIn } from '../lib/api/creators'
import VerifiedBadge from './VerifiedBadge'
import ScopeOfPracticeNote from './ScopeOfPracticeNote'
import TierCard from './TierCard'

const CHIP_VARIANTS = {
  verified: 'text-verified-600 bg-verified-50',
  plum: 'text-plum-600 bg-plum-50',
  mauve: 'text-mauve-600 bg-mauve-50',
}

export default function CreatorProfile() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [checkIn, setCheckIn] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)

    getCreatorBySlug(slug).then((found) => {
      if (cancelled) return
      setCreator(found)
      if (found) {
        getLatestCheckIn(found).then((ci) => !cancelled && setCheckIn(ci))
      }
      setLoading(false)
    })

    return () => {
      cancelled = true
    }
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

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-lg mx-auto px-6 py-14">
        <Link
          to="/"
          className="block text-center text-xs font-semibold tracking-wide uppercase text-primary-700 mb-10"
        >
          ← Back to browse
        </Link>

        <div className="text-center mb-8">
          {creator.photoUrl ? (
            <img
              src={creator.photoUrl}
              alt={creator.name}
              className="w-24 h-24 rounded-full mx-auto mb-2 object-cover object-center aspect-square block"
            />
          ) : (
            <>
              <div className="w-24 h-24 rounded-full bg-neutral-200 mx-auto mb-2" />
              <p className="text-[11px] text-neutral-400 mb-5">
                photo placeholder
              </p>
            </>
          )}

          <div className="flex items-center justify-center gap-2.5 flex-wrap">
            <h1 className="font-display font-semibold text-[31.3px] text-neutral-900 m-0">
              {creator.name}
            </h1>
            <VerifiedBadge size="lg" />
          </div>

          <p className="text-[15px] text-neutral-500 mt-2">
            {creator.niche} · {creator.tagline}
          </p>

          <div className="flex justify-center gap-1.5 flex-wrap mt-3.5">
            {creator.credentials.map(({ label, variant, fullName }) => (
              <span
                key={label}
                className={`text-[10.5px] font-semibold rounded-full px-2.5 py-1 ${CHIP_VARIANTS[variant]}`}
              >
                {fullName}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[14.7px] leading-relaxed text-neutral-900 text-center mb-5">
          {creator.fullBio}
        </p>

        <ScopeOfPracticeNote>{creator.scopeNote}</ScopeOfPracticeNote>

        <p className="text-xs font-semibold tracking-wide uppercase text-neutral-400 mt-9 mb-3">
          Tiers
        </p>
        <div className="flex flex-col gap-3">
          {creator.tiers.map((tier) => (
            <TierCard
              key={tier.name}
              {...tier}
              onSelect={() =>
                navigate(`/creators/${creator.slug}/subscribe?tier=${tier.variant}`)
              }
            />
          ))}
        </div>

        {checkIn && (
          <>
            <p className="text-xs font-semibold tracking-wide uppercase text-neutral-400 mt-10 mb-3">
              From {creator.name.split(' ')[0]}, this week
            </p>
            <div className="bg-neutral-0 border border-neutral-200 rounded-2xl p-4.5 flex gap-3.5">
              {creator.photoUrl ? (
                <img
                  src={creator.photoUrl}
                  alt={creator.name}
                  className="w-9 h-9 rounded-full object-cover object-center aspect-square flex-shrink-0"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-neutral-200 flex-shrink-0" />
              )}
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-sm text-neutral-900">
                    {creator.name.split(' ')[0]}
                  </span>
                  <span className="text-xs text-neutral-400">
                    {checkIn.time}
                  </span>
                </div>
                <p className="text-sm text-neutral-900 leading-relaxed m-0">
                  {checkIn.message}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

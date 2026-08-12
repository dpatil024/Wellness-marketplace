import { useEffect, useState } from 'react'
import CreatorCard from './CreatorCard'
import { getCreators } from '../lib/api/creators'

const NICHES = ['All niches', 'Nutrition', 'Fitness', 'Mental health']

export default function BrowseCreators() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeNiche, setActiveNiche] = useState('All niches')
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  useEffect(() => {
    getCreators()
      .then(setCreators)
      .finally(() => setLoading(false))
  }, [])

  const visible = creators.filter((creator) => {
    if (verifiedOnly && !creator.verified) return false
    if (activeNiche === 'All niches') return true
    return creator.niche.toLowerCase().includes(activeNiche.toLowerCase())
  })

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="font-display font-semibold text-3xl text-neutral-900 text-center m-0 mb-2">
          Find your wellness coach
        </h1>
        <p className="text-sm text-neutral-500 text-center mb-7">
          Browse certified creators by niche and credential
        </p>

        <div className="flex justify-center gap-2.5 flex-wrap mb-10">
          {NICHES.map((niche) => (
            <button
              key={niche}
              onClick={() => setActiveNiche(niche)}
              className={`text-sm font-semibold rounded-full px-4 py-2 border transition-colors ${
                activeNiche === niche
                  ? 'text-primary-700 bg-primary-tint border-primary-200'
                  : 'text-neutral-600 bg-neutral-0 border-neutral-200'
              }`}
            >
              {niche}
            </button>
          ))}
          <button
            onClick={() => setVerifiedOnly((v) => !v)}
            className={`text-sm font-semibold rounded-full px-4 py-2 border transition-colors ${
              verifiedOnly
                ? 'text-primary-700 bg-primary-tint border-primary-200'
                : 'text-neutral-600 bg-neutral-0 border-neutral-200'
            }`}
          >
            Verified only
          </button>
        </div>

        {loading && (
          <p className="text-sm text-neutral-500 text-center mt-10">
            Loading creators…
          </p>
        )}

        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {visible.map((creator) => (
              <CreatorCard key={creator.slug} {...creator} />
            ))}
          </div>
        )}

        {!loading && visible.length === 0 && (
          <p className="text-sm text-neutral-500 text-center mt-10">
            No creators match these filters yet.
          </p>
        )}
      </div>
    </div>
  )
}

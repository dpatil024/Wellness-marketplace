import { Link } from 'react-router-dom'

export default function ConfirmationScreen({ creatorName, tierName, slug }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <div className="w-14 h-14 rounded-full bg-primary-tint flex items-center justify-center mx-auto mb-5">
          <svg viewBox="0 0 20 20" fill="none" className="w-7 h-7 text-primary-700">
            <path
              d="M6.5 10.2l2.4 2.4 4.6-5.2"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className="font-display font-semibold text-2xl text-neutral-900 m-0 mb-2">
          You're in
        </h1>
        <p className="text-sm text-neutral-600 mb-8">
          You've joined {creatorName}'s {tierName} tier. Look out for check-ins
          from {creatorName.split(' ')[0]} soon.
        </p>

        <Link
          to={`/creators/${slug}`}
          className="inline-block text-sm font-semibold text-neutral-0 bg-primary-700 hover:bg-primary-800 rounded-full px-6 py-2.5 transition-colors"
        >
          Back to {creatorName.split(' ')[0]}'s profile
        </Link>
      </div>
    </div>
  )
}

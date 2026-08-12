export default function VerifiedBadge({ size = 'sm' }) {
  const dimensions = size === 'lg' ? 'w-3.5 h-3.5' : 'w-3 h-3'

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-primary-tint text-primary-700 flex-shrink-0 ${dimensions}`}
    >
      <svg viewBox="0 0 20 20" fill="none" className="w-2.5 h-2.5">
        <path
          d="M6.5 10.2l2.4 2.4 4.6-5.2"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}

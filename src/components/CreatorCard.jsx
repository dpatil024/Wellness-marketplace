import { Link } from 'react-router-dom'
import Card from './Card'
import VerifiedBadge from './VerifiedBadge'

const CHIP_VARIANTS = {
  verified: 'text-verified-600 bg-verified-50',
  plum: 'text-plum-600 bg-plum-50',
  mauve: 'text-mauve-600 bg-mauve-50',
}

export default function CreatorCard({
  slug,
  name,
  niche,
  verified = false,
  credentials = [],
  bio,
  photoUrl,
}) {
  return (
    <Card className="flex flex-col p-5">
      {photoUrl ? (
        <img
          src={photoUrl}
          alt={name}
          className="w-14 h-14 rounded-full mb-3 object-cover object-center aspect-square flex-shrink-0"
        />
      ) : (
        <div className="w-14 h-14 rounded-full bg-neutral-200 mb-3 flex-shrink-0" />
      )}

      <div className="flex items-center gap-1.5 mb-0.5">
        <p className="font-display font-semibold text-lg text-neutral-900 m-0">
          {name}
        </p>
        {verified && <VerifiedBadge />}
      </div>

      <p className="text-sm text-neutral-500 mb-2.5">{niche}</p>

      {credentials.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {credentials.map(({ label, variant = 'verified' }) => (
            <span
              key={label}
              className={`text-[10.5px] font-semibold rounded-full px-2.5 py-0.5 ${CHIP_VARIANTS[variant]}`}
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <p className="text-xs text-neutral-500 leading-relaxed mb-4 flex-grow">
        {bio}
      </p>

      <Link
        to={`/creators/${slug}`}
        className="w-full text-center text-xs font-semibold text-neutral-0 bg-primary-700 hover:bg-primary-800 rounded-full py-2 transition-colors"
      >
        View profile
      </Link>
    </Card>
  )
}

import Card from './Card'

export default function TierCard({
  variant = 'free',
  name,
  description,
  price,
  onSelect,
}) {
  const isPaid = variant === 'paid'

  return (
    <Card
      className={
        isPaid
          ? 'flex items-center justify-between gap-4 p-5 !bg-primary-tint !border-primary-100'
          : 'flex items-center justify-between gap-4 p-5 !bg-mauve-50 !border-mauve-200 shadow-none'
      }
    >
      <div>
        <span
          className={
            isPaid
              ? 'inline-block text-xs font-semibold text-primary-700 bg-primary-50 rounded-sm px-2 py-0.5 mb-1.5'
              : 'inline-block text-xs font-semibold text-mauve-600 bg-neutral-0 border border-mauve-200 rounded-sm px-2 py-0.5 mb-1.5'
          }
        >
          {isPaid ? 'Most popular' : 'Free'}
        </span>
        <p
          className={
            isPaid
              ? 'font-display text-lg font-semibold text-neutral-900 m-0'
              : 'font-display text-base font-semibold text-mauve-600 m-0'
          }
        >
          {name}
        </p>
        <p
          className={`text-sm mt-0.5 ${isPaid ? 'text-neutral-600' : 'text-mauve-600/80'}`}
        >
          {description}
        </p>
        {isPaid && price && (
          <p className="text-sm text-neutral-500 mt-1">
            <span className="text-base font-semibold text-neutral-900">
              {price}
            </span>{' '}
            / month
          </p>
        )}
      </div>
      <button
        onClick={onSelect}
        className={
          isPaid
            ? 'text-sm font-semibold text-neutral-0 bg-primary-700 hover:bg-primary-800 rounded-full px-5 py-2.5 whitespace-nowrap transition-colors'
            : 'text-sm font-semibold text-mauve-600 bg-neutral-0 border border-mauve-200 rounded-full px-5 py-2.5 whitespace-nowrap transition-colors'
        }
      >
        {isPaid ? 'Subscribe' : 'Join free'}
      </button>
    </Card>
  )
}

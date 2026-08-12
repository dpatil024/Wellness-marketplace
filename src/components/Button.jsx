const VARIANTS = {
  primary:
    'bg-accent-500 text-neutral-0 hover:bg-accent-600 shadow-card',
  ghost:
    'bg-transparent text-neutral-600 border border-neutral-200 hover:bg-neutral-100',
}

export default function Button({
  variant = 'primary',
  children,
  className = '',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors disabled:opacity-50 disabled:pointer-events-none ${VARIANTS[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-neutral-0 border border-neutral-200 rounded-lg shadow-card ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

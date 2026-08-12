export default function ScopeOfPracticeNote({ children }) {
  return (
    <div className="bg-slate-blue-50 text-slate-blue-600 rounded-lg px-4.5 py-3.5 text-center text-[12.2px] leading-relaxed">
      <b className="font-semibold">What this is (and isn't): </b>
      {children}
    </div>
  )
}

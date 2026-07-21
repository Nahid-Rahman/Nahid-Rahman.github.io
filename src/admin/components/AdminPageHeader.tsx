export function AdminPageHeader({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="mb-7 flex flex-col gap-5 border-b border-white/[.07] pb-7 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">{eyebrow}</p><h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h1><p className="mt-3 text-sm leading-7 text-slate-400">{description}</p></div>
      {action}
    </div>
  )
}

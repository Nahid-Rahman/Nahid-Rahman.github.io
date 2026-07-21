import { ExternalLink } from 'lucide-react'
import { useState } from 'react'
import { usePortfolio } from '../content/PortfolioContext'

export function FavouriteShelf() {
  const { favorites } = usePortfolio()
  const categories = Object.keys(favorites)
  const [active, setActive] = useState(categories[0])
  const items = favorites[active]

  return (
    <div>
      <div className="grid gap-2 rounded-[1.75rem] border border-white/10 bg-white/[.025] p-2 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <button key={category} onClick={() => setActive(category)} className={`rounded-full px-4 py-2.5 text-center text-sm font-bold transition ${active === category ? 'bg-white text-slate-950' : 'border border-white/10 bg-white/[.035] text-slate-300 hover:bg-white/[.08] hover:text-white'}`}>
            {category}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a key={item.title} href={item.externalUrl} target="_blank" rel="noreferrer" className="group flex overflow-hidden rounded-3xl border border-white/10 bg-[#121522] transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-soft">
            <div className="w-28 shrink-0 overflow-hidden bg-slate-900 sm:w-36">
              {item.image ? (
                <img src={item.image} alt={`${item.title} poster`} loading="lazy" decoding="async" className="h-full min-h-[220px] w-full object-cover" />
              ) : (
                <div className="grid h-full min-h-[220px] place-items-center px-4 text-center" style={{ background: item.gradient }}>
                  <div>
                    <span className="mx-auto block h-10 w-10 rounded-full border border-white/20 bg-white/10" />
                    <p className="mt-4 text-xs font-bold uppercase tracking-[.16em] text-white/80">{active}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex min-h-[220px] flex-1 flex-col p-5">
              <p className="text-xs font-semibold text-cyan-200/85">{item.meta}</p>
              <h3 className="mt-2 font-display text-xl font-bold leading-tight text-white">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-300">{item.note}</p>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-xs font-bold text-cyan-300">{item.linkLabel ?? 'Open Reference'} <ExternalLink size={14} className="transition group-hover:translate-x-0.5" /></span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

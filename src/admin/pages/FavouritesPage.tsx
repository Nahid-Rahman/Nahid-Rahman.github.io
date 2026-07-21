import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import type { Favorite } from '../../data/portfolio'
import { useAdminData } from '../AdminDataContext'
import { AdminPageHeader } from '../components/AdminPageHeader'
import { StructuredEditor } from '../components/StructuredEditor'

const emptyFavorite: Favorite = {
  title: '',
  meta: '',
  note: '',
  externalUrl: '',
  gradient: 'linear-gradient(145deg, #0b0f1e, #30224f 55%, #67e8f9)',
  image: '',
  linkLabel: 'Open Reference',
}

export function FavouritesPage() {
  const { content, setSection } = useAdminData()
  const categories = Object.keys(content.favorites)
  const [active, setActive] = useState(categories[0] ?? '')
  const activeCategory = categories.includes(active) ? active : categories[0] ?? ''
  const items = activeCategory ? content.favorites[activeCategory] : []

  function setItems(nextItems: Favorite[]) {
    setSection('favorites', { ...content.favorites, [activeCategory]: nextItems })
  }

  function addCategory() {
    const name = window.prompt('New category name')?.trim()
    if (!name || content.favorites[name]) return
    setSection('favorites', { ...content.favorites, [name]: [] })
    setActive(name)
  }

  function removeCategory() {
    if (!activeCategory || !window.confirm(`Delete the “${activeCategory}” category and all its items?`)) return
    const next = { ...content.favorites }
    delete next[activeCategory]
    setSection('favorites', next)
    setActive(Object.keys(next)[0] ?? '')
  }

  return (
    <>
      <AdminPageHeader eyebrow="Personal content" title="Favourites manager" description="Manage movies, series, anime, books, manga, manhwa, games, posters, notes, and external reference links." action={<button onClick={addCategory} className="admin-add-button"><Plus size={15} />New category</button>} />
      <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
        <aside className="self-start rounded-[2rem] border border-white/10 bg-[#111421] p-3 xl:sticky xl:top-28">
          {categories.map((category) => <button key={category} onClick={() => setActive(category)} className={`mb-1 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold ${category === activeCategory ? 'bg-violet-500/20 text-white ring-1 ring-violet-300/20' : 'text-slate-400 hover:bg-white/[.05] hover:text-white'}`}><span>{category}</span><span className="text-xs text-slate-500">{content.favorites[category].length}</span></button>)}
          {activeCategory && <button onClick={removeCategory} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-rose-300/15 px-3 py-2.5 text-xs font-semibold text-rose-200 hover:bg-rose-300/[.05]"><Trash2 size={14} />Delete category</button>}
        </aside>
        <section className="rounded-[2rem] border border-white/10 bg-[#111421] p-4 shadow-soft sm:p-6">
          <div className="mb-6 flex items-center justify-between border-b border-white/[.07] pb-5"><div><p className="text-xs font-bold uppercase tracking-[.14em] text-cyan-300">Current category</p><h2 className="mt-2 font-display text-2xl font-bold text-white">{activeCategory || 'No categories'}</h2></div>{activeCategory && <button className="admin-add-button" onClick={() => setItems([...items, { ...emptyFavorite }])}><Plus size={15} />Add favourite</button>}</div>
          {activeCategory ? <StructuredEditor value={items as never} onChange={(next) => setItems(next as Favorite[])} path={`favorites.${activeCategory}`} /> : <p className="text-sm text-slate-400">Create a category to begin.</p>}
        </section>
      </div>
    </>
  )
}

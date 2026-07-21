import { BookOpen, Camera, Gamepad2, Heart, ShieldCheck, Sparkles, Trophy } from 'lucide-react'
import { FavouriteShelf } from '../components/FavouriteShelf'
import { PageHeader } from '../components/PageHeader'
import { usePortfolio } from '../content/PortfolioContext'

const icons = [Gamepad2, Sparkles, Camera, Trophy, BookOpen]

export function BeyondWorkPage() {
  const { enjoyment, galleryPhotos, interests, values } = usePortfolio()
  return (
    <>
      <PageHeader eyebrow="Beyond work" title="The things that keep me curious." description="I enjoy stories that leave an emotional trace, games that invite exploration, sport that creates a shared moment, and quiet details that make ordinary life feel worth noticing." />

      <section className="container-wide py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div className="rounded-3xl border border-white/10 bg-white/[.03] p-7 sm:p-9">
            <p className="eyebrow"><Heart size={14} />A little beyond work</p>
            <h2 className="section-title">Stories, quiet moments, and worlds worth returning to.</h2>
            <p className="section-copy">Outside work, I like stories with atmosphere, thoughtful games, quiet moments, and everyday details worth noticing. It keeps the personal side of this portfolio warm without taking the focus away from work.</p>
            <div className="mt-7 flex flex-wrap gap-2">{interests.map((item) => <span key={item.label} className="tag">{item.label}</span>)}</div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {galleryPhotos.map((photo) => <img key={photo.src} src={photo.src} alt={photo.alt} loading="lazy" decoding="async" className="aspect-[4/3] w-full rounded-3xl object-cover shadow-soft" />)}
          </div>
        </div>
      </section>

      <section className="container-wide py-8 sm:py-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {interests.map((interest, index) => {
            const Icon = icons[index]
            return (
              <article key={interest.label} className="grid min-h-[150px] place-items-center rounded-3xl border border-white/10 bg-white/[.03] p-5 text-center transition hover:border-cyan-300/25 hover:bg-white/[.05]">
                <div>
                  <Icon size={24} className="mx-auto text-cyan-300" />
                  <h2 className="mt-5 font-display text-lg font-bold text-white">{interest.label}</h2>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="container-wide py-8 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[.03] p-7"><Heart size={22} className="text-rose-300" /><h2 className="mt-5 font-display text-2xl font-bold text-white">Little Things I Enjoy</h2><div className="mt-6 grid gap-3 sm:grid-cols-2">{enjoyment.map((item) => <div key={item} className="rounded-2xl border border-white/10 bg-[#0b0d16]/45 p-4 text-sm leading-6 text-slate-300">{item}</div>)}</div></article>
          <article className="rounded-3xl border border-white/10 bg-white/[.03] p-7"><ShieldCheck size={22} className="text-emerald-300" /><h2 className="mt-5 font-display text-2xl font-bold text-white">Faith & Grounding</h2><p className="mt-4 text-sm leading-7 text-slate-300"><strong className="text-white">Muslim (Sunni).</strong> I try to keep my faith present in everyday life through salah and a consistent relationship with the Qur’an. It keeps me grounded and shapes the way I approach humility, gratitude, responsibility, and how I treat others.</p><div className="mt-6 flex flex-wrap gap-2">{['Humility', 'Gratitude', 'Accountability', 'Respect', 'Continuous self-improvement'].map((tag) => <span key={tag} className="tag">{tag}</span>)}</div></article>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-20"><div className="max-w-3xl"><p className="eyebrow">Things I value</p><h2 className="section-title">Clean systems. Clear intentions. Better everyday effort.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{values.map((value) => <div key={value} className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[.045] to-transparent p-5 text-sm leading-7 text-slate-300">{value}</div>)}</div></section>

      <section className="container-wide pb-16 sm:pb-24"><div className="mb-8 max-w-3xl"><p className="eyebrow">All-time favourites</p><h2 className="section-title">A few worlds I keep coming back to.</h2><p className="section-copy">Choose a category to browse. Cards open relevant IMDb, Goodreads, MyAnimeList, or official/reference pages in a new tab.</p></div><FavouriteShelf /></section>
    </>
  )
}

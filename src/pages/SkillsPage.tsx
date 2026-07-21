import { Award, BadgeCheck, Wrench } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { usePortfolio } from '../content/PortfolioContext'

export function SkillsPage() {
  const { certifications, skillGroups } = usePortfolio()
  return (
    <>
      <PageHeader eyebrow="Skills" title="Tools matter. Context matters more." description="I use the right level of testing and automation for the product risk—not automation for its own sake, and not manual repetition where a reliable check can help." />
      <section className="container-wide py-12 sm:py-20"><div className="grid gap-5 md:grid-cols-2">{skillGroups.map((group, index) => <article key={group.title} className="rounded-3xl border border-white/10 bg-white/[.03] p-6 transition hover:border-violet-300/25 hover:bg-white/[.05] sm:p-7"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/25 to-cyan-400/15 text-cyan-200"><Wrench size={20} /></span><div><p className="text-xs font-bold uppercase tracking-[.16em] text-violet-200">0{index + 1}</p><h2 className="mt-1 font-display text-2xl font-bold text-white">{group.title}</h2></div></div><p className="mt-5 text-sm leading-7 text-slate-300">{group.description}</p><div className="mt-6 flex flex-wrap gap-2">{group.skills.map((skill) => <span key={skill} className="tag">{skill}</span>)}</div></article>)}</div></section>
      <section className="container-wide pb-16 sm:pb-24"><div className="glass-card p-7 sm:p-9"><p className="eyebrow"><Award size={14} />Certifications & continuous learning</p><h2 className="section-title">Learning beyond the day-to-day.</h2><p className="section-copy">I keep building depth in QA while maintaining supporting skills that help with data validation, communication, and systems thinking.</p><div className="mt-8 grid gap-4 md:grid-cols-2">{certifications.map((certification) => <div key={certification.title} className="rounded-2xl border border-white/10 bg-[#0b0d16]/45 p-5"><BadgeCheck size={20} className="text-cyan-300" /><h3 className="mt-4 font-display text-lg font-bold text-white">{certification.title}</h3><p className="mt-2 text-sm text-slate-400">{certification.issuer} · {certification.year}</p></div>)}</div></div></section>
    </>
  )
}

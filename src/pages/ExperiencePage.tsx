import { ArrowUpRight, BriefcaseBusiness, CheckCircle2, ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { usePortfolio } from '../content/PortfolioContext'

export function ExperiencePage() {
  const { experiences } = usePortfolio()
  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="A quality journey across product teams."
        description="I have worked across HR tech, recruitment, edtech, logistics, real-estate investment, and business-management systems, combining structured manual testing with practical automation across web, mobile, API, and backend workflows."
      />
      <section className="container-wide py-12 sm:py-20">
        <div className="relative max-w-5xl before:absolute before:left-[18px] before:top-5 before:h-[calc(100%-40px)] before:w-px before:bg-gradient-to-b before:from-violet-400/70 before:via-cyan-300/30 before:to-transparent sm:before:left-[26px]">
          <div className="space-y-7">
            {experiences.map((experience, index) => (
              <article key={experience.company} className="relative pl-12 sm:pl-16">
                <span className={`absolute left-0 top-7 grid h-9 w-9 place-items-center rounded-full border border-white/15 ${index === 0 ? 'bg-violet-500 text-white shadow-glow' : 'bg-[#151827] text-cyan-200'} sm:h-[53px] sm:w-[53px]`}><BriefcaseBusiness size={18} /></span>
                <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 transition hover:border-white/20 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-cyan-300/15 bg-white font-display text-xs font-bold text-cyan-100 sm:h-14 sm:w-14">{experience.logoImage ? <img src={experience.logoImage} alt={`${experience.company} logo`} className="h-full w-full object-contain p-1.5" loading="lazy" decoding="async" /> : experience.logoText}</div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-display text-2xl font-bold text-white">{experience.role}</h2>
                          {experience.current && <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-bold text-emerald-200">Current</span>}
                        </div>
                        <p className="mt-2 font-semibold text-violet-200">
                          <a href={experience.website} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 hover:text-cyan-200">
                            {experience.company} <ExternalLink size={14} />
                          </a>
                          <span className="font-normal text-slate-500"> · {experience.location}</span>
                        </p>
                      </div>
                    </div>
                    <p className="shrink-0 text-sm font-semibold text-slate-400">{experience.period}</p>
                  </div>
                  <p className="mt-5 max-w-3xl leading-7 text-slate-300">{experience.summary}</p>
                  <ul className="mt-6 space-y-3">{experience.contributions.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-cyan-300" />{item}</li>)}</ul>
                  <div className="mt-6 flex flex-wrap gap-2">{experience.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container-wide pb-16"><div className="rounded-3xl border border-amber-300/15 bg-amber-300/[.04] p-6 sm:p-7"><div className="flex gap-4"><ArrowUpRight className="mt-1 shrink-0 text-amber-200" size={20} /><div><h2 className="font-display text-xl font-bold text-white">A note on work samples</h2><p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">I keep client data, internal dashboards, product screenshots, credentials, bug records, and confidential documentation private. This page focuses on public, high-level responsibilities and outcomes only.</p></div></div></div></section>
    </>
  )
}

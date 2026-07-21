import { BookOpenText, ExternalLink, GraduationCap, Microscope } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { usePortfolio } from '../content/PortfolioContext'

export function EducationResearchPage() {
  const { currentResearch, earlierResearch, education, site } = usePortfolio()
  return (
    <>
      <PageHeader eyebrow="Education & research" title="Learning that connects systems, people, and questions." description="My academic path has given me technical foundations, research discipline, and a lasting interest in how people interact with technology." />

      <section className="container-wide py-12 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[.92fr_1.08fr]">
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-[#121624] to-cyan-500/10 p-7 sm:p-9">
            <Microscope size={24} className="text-cyan-200" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-cyan-200">Current research · {currentResearch.status}</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white">{currentResearch.title}</h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-300">{currentResearch.summary}</p>
            <p className="mt-6 text-sm font-semibold text-violet-200">BRAC University · MSc in Computer Science</p>
          </article>

          <article className="rounded-3xl border border-white/10 bg-white/[.03] p-7 sm:p-9">
            <BookOpenText size={24} className="text-amber-200" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-amber-200">Earlier research</p>
            <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-white">{earlierResearch.title}</h2>
            <p className="mt-5 max-w-2xl leading-7 text-slate-300">{earlierResearch.summary}</p>
            <p className="mt-6 text-sm font-semibold text-amber-100">BRAC University · BSc Thesis</p>
            <a href={site.thesisPdfPath} target="_blank" rel="noreferrer" className="button-secondary mt-7 w-full sm:w-auto">
              View Thesis PDF <ExternalLink size={16} />
            </a>
          </article>
        </div>
      </section>

      <section className="container-wide pb-16 sm:pb-24">
        <div className="max-w-4xl"><p className="eyebrow"><GraduationCap size={14} />Academic journey</p><h2 className="section-title">The path so far.</h2></div>
        <div className="mt-9 grid gap-4">
          {education.map((item) => (
            <article key={item.credential} className="rounded-3xl border border-white/10 bg-white/[.03] p-6 transition hover:border-white/20 sm:p-7">
              <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:items-start">
                <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-2xl border border-cyan-300/15 bg-white p-1.5 font-display text-[11px] font-bold text-cyan-900">
                  {item.logoImage ? <img src={item.logoImage} alt={`${item.institution} logo`} className="h-full w-full object-contain" loading="lazy" /> : item.logoText}
                </div>
                <div>
                  <p className="font-display text-xl font-bold text-white">{item.credential}</p>
                  <p className="mt-2 text-sm font-semibold text-violet-200">{item.institution}</p>
                </div>
                <p className="w-fit rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-sm font-semibold text-slate-300">{item.period}</p>
              </div>
              <p className="mt-4 text-sm text-slate-300 sm:ml-[4.5rem]">{item.meta}</p>
              {item.highlight && <p className="mt-4 max-w-3xl border-l-2 border-cyan-300/60 pl-4 text-sm leading-6 text-slate-400 sm:ml-[4.5rem]">{item.highlight}</p>}
            </article>
          ))}
        </div>
      </section>
    </>
  )
}

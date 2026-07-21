import { ArrowRight, BriefcaseBusiness, CheckCircle2, Code2, Download, ExternalLink, GraduationCap, HeartHandshake, Microscope, Send, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { usePortfolio } from '../content/PortfolioContext'
import type { Project } from '../data/portfolio'
import { ProjectModal } from '../components/ProjectModal'
import { SectionHeading } from '../components/SectionHeading'

const skillPreview = [
  { title: 'Manual & Automation Testing', text: 'Structured manual checks with practical, repeatable automation.', icon: CheckCircle2 },
  { title: 'Web, Mobile & API Testing', text: 'Quality coverage across connected product experiences.', icon: Code2 },
  { title: 'Load & Stress Testing', text: 'Checking how systems behave under pressure, traffic, and edge usage.', icon: Sparkles },
  { title: 'Performance & Reliability', text: 'Evidence-led checks for throughput, stability, and release risk.', icon: Sparkles },
  { title: 'Regression & Release Testing', text: 'Making sure new changes do not break important existing flows.', icon: CheckCircle2 },
  { title: 'QA Process & Product Quality', text: 'Clear defects, useful evidence, and product-aware collaboration.', icon: HeartHandshake },
]

export function HomePage() {
  const { homeAbout, glanceStats, projects, experiences, site } = usePortfolio()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const currentRole = experiences[0]

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[.07]">
        <div className="grid-fade absolute inset-0 opacity-70" />
        <div className="absolute -left-32 top-20 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="container-wide relative grid gap-12 py-16 sm:py-24 lg:grid-cols-[1.13fr_.87fr] lg:items-center lg:py-28">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1.5 text-xs font-bold tracking-wide text-violet-200"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />Software QA Engineer</div>
            <h1 className="mt-7 max-w-4xl font-display text-5xl font-bold leading-[.98] tracking-tight text-white sm:text-6xl lg:text-7xl">Shaikh Mahmudur<br /><span className="bg-gradient-to-r from-violet-300 via-white to-cyan-200 bg-clip-text text-transparent">Rahman (Nahid)</span></h1>
            <p className="mt-6 font-display text-lg font-medium text-cyan-100 sm:text-xl">{site.role}</p>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{site.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/projects" className="button-primary">View My Work <ArrowRight size={17} /></Link>
              <a href={site.cvPath} download className="button-secondary"><Download size={17} /> Download CV</a>
            </div>
            <p className="mt-8 text-sm text-slate-500">Currently contributing to quality across web, mobile, API, and backend systems.</p>
          </div>

          <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:120ms] lg:max-w-none">
            <div className="hero-ring absolute inset-0 animate-float" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.25rem] border border-white/15 bg-slate-800 shadow-2xl">
              <img src="/assets/photos/hero-nahid.webp" alt="Shaikh Mahmudur Rahman Nahid" fetchPriority="high" decoding="async" className="h-full w-full object-cover object-center transition duration-700 hover:scale-105" />
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-cyan-300/15 bg-[#121625]/80 px-4 py-3 shadow-soft backdrop-blur-xl">
                <p className="text-xs text-slate-400">Focus</p>
                <p className="mt-0.5 text-sm font-bold text-white">Reliable, user-ready releases</p>
              </div>
              <div className="rounded-2xl border border-violet-300/15 bg-[#121625]/80 px-4 py-3 shadow-soft backdrop-blur-xl">
                <p className="text-xs text-slate-400">Style</p>
                <p className="mt-0.5 text-sm font-bold text-cyan-100">Product-aware · Structured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container-wide py-10 sm:py-14">
        <div className="grid divide-y divide-white/[.08] overflow-hidden rounded-3xl border border-white/[.09] bg-white/[.025] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {glanceStats.map((item) => <div key={item.label} className="p-6 sm:p-7"><p className="font-display text-xl font-bold text-white sm:text-2xl">{item.value}</p><p className="mt-2 text-sm text-slate-400">{item.label}</p></div>)}
        </div>
      </section>

      <section className="container-wide py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
          <div className="relative mx-auto max-w-sm lg:mx-0 lg:max-w-none">
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-violet-500/15 to-cyan-400/10 blur-2xl" />
            <img src="/assets/photos/about-window.webp" loading="lazy" decoding="async" alt="Nahid by a window" className="relative aspect-[4/5] w-full rounded-[2rem] border border-white/10 object-cover shadow-soft" />
          </div>
          <div>
            <p className="eyebrow">About me</p>
            <h2 className="section-title">Quality is more than finding bugs.</h2>
            <div className="mt-5 space-y-4 text-base leading-8 text-slate-300">{homeAbout.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <Link to="/about" className="button-secondary mt-7">More About Me <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-20">
        <div className="glass-card overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow"><BriefcaseBusiness size={14} />Current role</p>
              <h2 className="font-display text-3xl font-bold text-white">{currentRole.role}</h2>
              <p className="mt-2 text-base font-semibold text-violet-200">{currentRole.company} <span className="font-normal text-slate-500">· {currentRole.period}</span></p>
              <p className="mt-5 max-w-3xl leading-7 text-slate-300">{currentRole.summary}</p>
              <div className="mt-5 flex flex-wrap gap-2">{currentRole.tags.map((tag) => <span key={tag} className="tag">{tag}</span>)}</div>
            </div>
            <Link to="/experience" className="button-primary self-start lg:self-auto">View Full Experience <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-20">
        <SectionHeading eyebrow="Selected work" title="A few ways I put quality into practice." description="A compact look at QA projects across API automation, browser automation, and performance testing. Click a project for the essentials, then dive into the repository for the full work." action={<Link className="button-secondary" to="/projects">All Projects <ArrowRight size={17} /></Link>} />
        <div className="mt-9 grid gap-5 lg:grid-cols-3">
          {projects.slice(0, 3).map((project) => (
            <button key={project.id} onClick={() => setSelectedProject(project)} className="group flex min-h-[330px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111421] text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-cyan-300/70">
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap items-center gap-2"><span className="rounded-full border border-cyan-300/15 bg-cyan-300/[.06] px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-cyan-200">{project.type}</span></div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[.16em] text-cyan-300">{project.kind}</p>
                <h3 className="mt-3 font-display text-2xl font-bold text-white">{project.shortTitle}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-300">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.chips.slice(0, 3).map((chip) => <span key={chip} className="tag">{chip}</span>)}</div>
                <div className="mt-auto flex items-center justify-between pt-6 text-sm font-bold text-violet-200"><span>View Details</span><ArrowRight size={17} className="transition group-hover:translate-x-1" /></div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="container-wide py-12 sm:py-20">
        <SectionHeading eyebrow="What I work with" title="Built around coverage, clarity, and confidence." description="I do not use percentage bars. Context matters more than a number—these are the areas I use to help teams ship with confidence." action={<Link className="button-secondary" to="/skills">Explore Skills <ArrowRight size={17} /></Link>} />
        <div className="mt-9 flex snap-x gap-4 overflow-x-auto pb-3 [scrollbar-width:none] lg:grid lg:grid-cols-3 lg:overflow-visible">
          {skillPreview.map(({ title, text, icon: Icon }) => <article key={title} className="min-w-[260px] snap-start rounded-3xl border border-white/10 bg-white/[.03] p-5 transition hover:border-violet-300/30 hover:bg-white/[.05]"><Icon size={20} className="text-cyan-300" /><h3 className="mt-5 font-display text-lg font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-400">{text}</p></article>)}
        </div>
      </section>

      <section className="container-wide py-12 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <article className="glass-card p-7 sm:p-9">
            <p className="eyebrow"><GraduationCap size={14} />Education</p>
            <h2 className="section-title">Always learning, always asking better questions.</h2>
            <div className="mt-7 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><p className="font-display text-lg font-bold text-white">MSc in Computer Science <span className="text-violet-200">· 2024 — Present</span></p><p className="mt-2 text-sm text-slate-400">BRAC University · CGPA 3.43 / 4.00</p></div>
              <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><p className="font-display text-lg font-bold text-white">BSc in Computer Science & Engineering <span className="text-violet-200">· 2017 — 2021</span></p><p className="mt-2 text-sm text-slate-400">BRAC University · CGPA 3.36 / 4.00</p></div>
            </div>
            <Link to="/education-research" className="button-secondary mt-7">Explore Education <ArrowRight size={17} /></Link>
          </article>
          <article className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/20 via-[#13182a] to-cyan-500/10 p-7 sm:p-9">
            <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-cyan-200"><Microscope size={15} />Research highlight</p>
            <h3 className="mt-4 font-display text-2xl font-bold leading-tight text-white">Livestream Gaming Communities — Trust & Viewer Engagement Research</h3>
            <p className="mt-4 text-sm leading-7 text-slate-300">Exploring trust, viewer engagement, and response behaviour in livestream gaming communities.</p>
            <Link to="/education-research" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-cyan-200">See research context <ArrowRight size={17} /></Link>
          </article>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-20">
        <div className="grid gap-8 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">Beyond work</p>
            <h2 className="section-title">Stories, games, books, and everyday details.</h2>
            <p className="section-copy">Outside work, I like stories with atmosphere, thoughtful games, quiet moments, and everyday details worth noticing.</p>
            <div className="mt-7 flex flex-wrap gap-2"><span className="tag">Gaming</span><span className="tag">Photography</span><span className="tag">Sci-Fi & Stories</span><span className="tag">Football & Esports</span></div>
            <Link to="/beyond-work" className="button-secondary mt-7">Explore Beyond Work <ArrowRight size={17} /></Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src="/assets/photos/cafe-candid.webp" loading="lazy" decoding="async" alt="Café candid" className="aspect-[4/3] w-full rounded-3xl object-cover" />
            <img src="/assets/photos/library.webp" loading="lazy" decoding="async" alt="Library moment" className="aspect-[4/3] w-full rounded-3xl object-cover" />
            <img src="/assets/photos/traditional.webp" loading="lazy" decoding="async" alt="Traditional outfit" className="aspect-[4/3] w-full rounded-3xl object-cover" />
            <img src="/assets/photos/graduation.webp" loading="lazy" decoding="async" alt="Graduation portrait" className="aspect-[4/3] w-full rounded-3xl object-cover" />
          </div>
        </div>
      </section>

      <section className="container-wide py-12 sm:py-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#161332] via-[#101622] to-[#122b33] p-7 sm:p-11">
          <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="relative max-w-2xl"><p className="eyebrow"><Send size={14} />Get in touch</p><h2 className="section-title">Have a product quality question, a testing need, or simply want to connect?</h2><p className="section-copy">You can write directly, use the contact form, or find me on the platforms I keep active.</p><Link to="/contact" className="button-primary mt-7">Contact Me <ExternalLink size={17} /></Link></div>
        </div>
      </section>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

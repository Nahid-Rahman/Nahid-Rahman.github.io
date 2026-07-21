import { ArrowUpRight, Code2 } from 'lucide-react'
import { useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { ProjectModal } from '../components/ProjectModal'
import { usePortfolio } from '../content/PortfolioContext'
import type { Project } from '../data/portfolio'

export function ProjectsPage() {
  const { projects } = usePortfolio()
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <PageHeader eyebrow="Projects" title="Practical QA work, kept focused." description="These projects reflect how I approach test coverage, validation, automation, performance, documentation, and evidence. Click a card for the concise context; the repository holds the detailed work." />
      <section className="container-wide py-12 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <button key={project.id} onClick={() => setSelectedProject(project)} className="group flex min-h-[390px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#111421] text-left transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-soft focus:outline-none focus:ring-2 focus:ring-cyan-300/70">
              <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex flex-wrap gap-2"><span className="rounded-full border border-cyan-300/15 bg-cyan-300/[.06] px-3 py-1 text-[11px] font-bold uppercase tracking-[.14em] text-cyan-200">{project.type}</span></div>
                <p className="mt-4 text-xs font-bold uppercase tracking-[.16em] text-cyan-300">{project.kind}</p>
                <h2 className="mt-3 font-display text-2xl font-bold text-white">{project.title}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">{project.summary}</p>
                <div className="mt-5 flex flex-wrap gap-2">{project.chips.map((chip) => <span key={chip} className="tag">{chip}</span>)}</div>
                <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm font-bold text-violet-200">View Details</span><ArrowUpRight size={18} className="text-cyan-300 transition group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
              </div>
            </button>
          ))}
        </div>
      </section>
      <section className="container-wide pb-16 sm:pb-24"><div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="eyebrow"><Code2 size={14} />More context lives in GitHub</p><h2 className="font-display text-2xl font-bold text-white">The repository is the source of truth.</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">I keep portfolio project summaries deliberately lean. Documentation, execution details, reports, test cases, and implementation evidence stay with each project repository instead of being duplicated here.</p></div><a href="https://github.com/Nahid-Rahman" target="_blank" rel="noreferrer" className="button-primary shrink-0">Visit GitHub <ArrowUpRight size={17} /></a></div></div></section>
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </>
  )
}

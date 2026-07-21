import { ExternalLink, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import type { Project } from '../data/portfolio'

type Props = { project: Project | null; onClose: () => void }

const focusableSelector = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'

export function ProjectModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => closeButtonRef.current?.focus())

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector)).filter((element) => !element.hasAttribute('disabled'))
      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
      previousFocusRef.current?.focus()
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="project-modal-title" aria-describedby="project-modal-summary">
      <button className="absolute inset-0 cursor-default bg-[#03040a]/85 backdrop-blur-sm" aria-label="Close project details" onClick={onClose} />
      <article ref={dialogRef} className="relative z-10 max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-white/15 bg-[#111421] shadow-2xl">
        <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-5">
            <div>
              <p className="text-xs font-bold uppercase tracking-[.18em] text-cyan-300">{project.kind}</p>
              <h2 id="project-modal-title" className="mt-2 font-display text-3xl font-bold text-white">{project.title}</h2>
            </div>
            <button ref={closeButtonRef} onClick={onClose} className="sticky top-0 rounded-full border border-white/10 bg-[#111421] p-2 text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-cyan-300/70" aria-label="Close project details"><X size={20} /></button>
          </div>

          <p id="project-modal-summary" className="mt-5 leading-7 text-slate-300">{project.summary}</p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
              <h3 className="font-display font-bold text-white">Objective</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{project.objective}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[.035] p-4">
              <h3 className="font-display font-bold text-white">What I tested</h3>
              <p className="mt-2 text-sm leading-6 text-slate-300">{project.tested}</p>
            </div>
          </div>

          <div className="mt-7">
            <h3 className="font-display font-bold text-white">QA focus</h3>
            <ul className="mt-3 grid gap-2 sm:grid-cols-3">
              {project.focus.map((item) => <li key={item} className="rounded-xl border border-white/10 bg-white/[.035] px-3 py-2 text-sm text-slate-200">{item}</li>)}
            </ul>
          </div>

          <div className="mt-7">
            <h3 className="font-display font-bold text-white">Tools & framework</h3>
            <div className="mt-3 flex flex-wrap gap-2">{project.tools.map((tool) => <span key={tool} className="tag">{tool}</span>)}</div>
          </div>

          <a href={project.github} target="_blank" rel="noreferrer" className="button-primary mt-8 w-full sm:w-auto">
            View on GitHub <ExternalLink size={16} />
          </a>
        </div>
      </article>
    </div>
  )
}

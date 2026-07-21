import { Download, FileJson, RotateCcw, Upload } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import { isPortfolioContent, type PortfolioContent } from '../../content/defaultContent'
import { useAdminData } from '../AdminDataContext'
import { AdminPageHeader } from '../components/AdminPageHeader'

export function DataPage() {
  const { content, setContent, resetToBundled } = useAdminData()
  const [message, setMessage] = useState('')

  function downloadJson() {
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `nahid-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  async function importJson(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const parsed = JSON.parse(await file.text()) as unknown
      if (!isPortfolioContent(parsed)) throw new Error('The selected file is not a valid Nahid Portfolio backup.')
      setContent(parsed as PortfolioContent)
      setMessage('Backup loaded into the unsaved draft. Review it, then save or publish.')
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Could not import this JSON file.')
    } finally {
      event.target.value = ''
    }
  }

  function reset() {
    if (!window.confirm('Replace the current unsaved draft with the original Portfolio V1 bundled content?')) return
    resetToBundled()
    setMessage('Original Portfolio V1 content loaded into the unsaved draft.')
  }

  return (
    <>
      <AdminPageHeader eyebrow="Portability" title="Backup, import, and recovery" description="Keep an offline JSON backup, migrate the portfolio between environments, or restore the original bundled V1 content without touching the published site." />
      {message && <p className="mb-5 rounded-2xl border border-cyan-300/15 bg-cyan-300/[.05] p-4 text-sm text-cyan-100">{message}</p>}
      <div className="grid gap-5 md:grid-cols-3">
        <article className="rounded-[2rem] border border-white/10 bg-[#111421] p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-500/15 text-violet-200"><Download size={21} /></span><h2 className="mt-5 font-display text-xl font-bold text-white">Export backup</h2><p className="mt-3 text-sm leading-7 text-slate-400">Download the complete current draft as a readable JSON file.</p><button onClick={downloadJson} className="button-secondary mt-6 w-full"><Download size={16} />Download JSON</button></article>
        <article className="rounded-[2rem] border border-white/10 bg-[#111421] p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-400/10 text-cyan-200"><Upload size={21} /></span><h2 className="mt-5 font-display text-xl font-bold text-white">Import backup</h2><p className="mt-3 text-sm leading-7 text-slate-400">Load a valid portfolio JSON file into the unsaved draft.</p><label className="button-secondary mt-6 w-full cursor-pointer"><Upload size={16} />Choose JSON<input type="file" accept="application/json,.json" className="sr-only" onChange={(e) => void importJson(e)} /></label></article>
        <article className="rounded-[2rem] border border-white/10 bg-[#111421] p-6"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-amber-300/10 text-amber-200"><RotateCcw size={21} /></span><h2 className="mt-5 font-display text-xl font-bold text-white">Reset to V1</h2><p className="mt-3 text-sm leading-7 text-slate-400">Load the original source content included in this build.</p><button onClick={reset} className="button-secondary mt-6 w-full"><RotateCcw size={16} />Load original V1</button></article>
      </div>
      <div className="mt-6 rounded-[2rem] border border-white/10 bg-[#111421] p-6"><div className="flex items-center gap-3"><FileJson className="text-cyan-300" size={21} /><h2 className="font-display text-xl font-bold text-white">Current document summary</h2></div><pre className="mt-5 max-h-96 overflow-auto rounded-2xl border border-white/[.07] bg-[#05070d] p-4 text-xs leading-6 text-slate-400">{JSON.stringify({ projects: content.projects.length, experiences: content.experiences.length, education: content.education.length, skillGroups: content.skillGroups.length, favouriteCategories: Object.keys(content.favorites), favouriteItems: Object.values(content.favorites).reduce((sum, items) => sum + items.length, 0) }, null, 2)}</pre></div>
    </>
  )
}

import { Clock3, LoaderCircle, RotateCcw } from 'lucide-react'
import { useEffect, useState } from 'react'
import { isPortfolioContent, type PortfolioContent } from '../../content/defaultContent'
import { supabase } from '../../lib/supabase'
import { useAdminData } from '../AdminDataContext'
import { AdminPageHeader } from '../components/AdminPageHeader'

type Revision = { id: number; document_type: 'draft' | 'published'; content: unknown; changed_at: string }

export function RevisionsPage() {
  const [revisions, setRevisions] = useState<Revision[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { setContent } = useAdminData()

  async function load() {
    setLoading(true)
    const { data, error: queryError } = await supabase.from('portfolio_revisions').select('id, document_type, content, changed_at').order('changed_at', { ascending: false }).limit(100)
    if (queryError) setError(queryError.message)
    else setRevisions((data ?? []) as Revision[])
    setLoading(false)
  }

  useEffect(() => { void load() }, [])

  function restore(revision: Revision) {
    if (!isPortfolioContent(revision.content)) {
      setError('This revision does not contain a valid portfolio document.')
      return
    }
    if (!window.confirm(`Load revision #${revision.id} into the current unsaved draft?`)) return
    setContent(revision.content as PortfolioContent)
  }

  return (
    <>
      <AdminPageHeader eyebrow="Safety net" title="Revision history" description="Every draft save and publish creates a database snapshot. Restore any valid snapshot into the editor, then save or publish it deliberately." />
      {error && <p className="mb-5 rounded-2xl border border-rose-300/20 bg-rose-300/[.05] p-4 text-sm text-rose-100">{error}</p>}
      {loading ? <div className="admin-loading-card"><LoaderCircle className="animate-spin" size={18} />Loading revisions…</div> : revisions.length === 0 ? <div className="admin-loading-card">No revisions yet. Save or publish the portfolio first.</div> : <div className="space-y-3">{revisions.map((revision) => <article key={revision.id} className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-[#111421] p-5 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-4"><span className={`grid h-11 w-11 place-items-center rounded-2xl ${revision.document_type === 'published' ? 'bg-emerald-400/10 text-emerald-200' : 'bg-violet-500/15 text-violet-200'}`}><Clock3 size={19} /></span><div><p className="font-display text-base font-bold text-white">Revision #{revision.id} · {revision.document_type}</p><p className="mt-1 text-xs text-slate-500">{new Date(revision.changed_at).toLocaleString()}</p></div></div><button onClick={() => restore(revision)} className="admin-top-button"><RotateCcw size={15} />Load into draft</button></article>)}</div>}
    </>
  )
}

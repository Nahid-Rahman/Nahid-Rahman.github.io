import { Copy, ExternalLink, FileText, Image as ImageIcon, LoaderCircle, RefreshCw, Trash2, Upload } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { portfolioMediaBucket, supabase } from '../../lib/supabase'
import { AdminPageHeader } from '../components/AdminPageHeader'

type MediaAsset = {
  id: string
  object_path: string
  public_url: string
  category: string
  title: string
  alt_text: string
  mime_type: string | null
  size_bytes: number | null
  created_at: string
}

const categories = ['photo', 'company-logo', 'education-logo', 'poster', 'project', 'document', 'other']

function sanitizeFileName(name: string) {
  const extension = name.includes('.') ? `.${name.split('.').pop()?.toLowerCase()}` : ''
  const base = name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'asset'
  return `${base}${extension}`
}

function formatSize(size: number | null) {
  if (!size) return 'Unknown size'
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
  return `${(size / 1024 / 1024).toFixed(1)} MB`
}

export function MediaPage() {
  const [assets, setAssets] = useState<MediaAsset[]>([])
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [notice, setNotice] = useState('')
  const [category, setCategory] = useState('photo')
  const [title, setTitle] = useState('')
  const [altText, setAltText] = useState('')
  const [file, setFile] = useState<File | null>(null)

  async function loadAssets() {
    setLoading(true)
    const { data, error } = await supabase.from('media_assets').select('*').order('created_at', { ascending: false })
    if (error) setNotice(error.message)
    else setAssets((data ?? []) as MediaAsset[])
    setLoading(false)
  }

  useEffect(() => { void loadAssets() }, [])

  async function uploadAsset(event: FormEvent) {
    event.preventDefault()
    if (!file) return
    setUploading(true)
    setNotice('')
    const objectPath = `${category}/${Date.now()}-${sanitizeFileName(file.name)}`
    const { error: uploadError } = await supabase.storage.from(portfolioMediaBucket).upload(objectPath, file, { cacheControl: '3600', upsert: false })
    if (uploadError) {
      setNotice(uploadError.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from(portfolioMediaBucket).getPublicUrl(objectPath)
    const { error: metadataError } = await supabase.from('media_assets').insert({
      bucket_id: portfolioMediaBucket,
      object_path: objectPath,
      public_url: urlData.publicUrl,
      category,
      title: title.trim() || file.name.replace(/\.[^.]+$/, ''),
      alt_text: altText.trim(),
      mime_type: file.type || null,
      size_bytes: file.size,
    })

    if (metadataError) {
      await supabase.storage.from(portfolioMediaBucket).remove([objectPath])
      setNotice(metadataError.message)
      setUploading(false)
      return
    }

    setNotice('Upload complete. Copy the public URL into any image or document field.')
    setFile(null)
    setTitle('')
    setAltText('')
    const fileInput = document.getElementById('portfolio-media-file') as HTMLInputElement | null
    if (fileInput) fileInput.value = ''
    await loadAssets()
    setUploading(false)
  }

  async function deleteAsset(asset: MediaAsset) {
    if (!window.confirm(`Delete “${asset.title || asset.object_path}” permanently? Existing portfolio references will stop working.`)) return
    setNotice('')
    const { error: storageError } = await supabase.storage.from(portfolioMediaBucket).remove([asset.object_path])
    if (storageError) {
      setNotice(storageError.message)
      return
    }
    const { error } = await supabase.from('media_assets').delete().eq('id', asset.id)
    if (error) setNotice(error.message)
    else setAssets((current) => current.filter((item) => item.id !== asset.id))
  }

  const visibleAssets = useMemo(() => filter === 'all' ? assets : assets.filter((asset) => asset.category === filter), [assets, filter])

  return (
    <>
      <AdminPageHeader eyebrow="Assets" title="Media library" description="Upload photos, company logos, education logos, posters, project images, PDFs, and other portfolio files. Each file receives a stable public URL." />
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <form onSubmit={uploadAsset} className="self-start rounded-[2rem] border border-white/10 bg-[#111421] p-5 shadow-soft xl:sticky xl:top-28">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">New asset</p>
          <h2 className="mt-2 font-display text-2xl font-bold text-white">Upload media</h2>
          <div className="mt-6 space-y-4">
            <label className="block text-xs font-bold uppercase tracking-[.12em] text-slate-400">Category<select className="admin-input mt-2" value={category} onChange={(e) => setCategory(e.target.value)}>{categories.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
            <label className="block text-xs font-bold uppercase tracking-[.12em] text-slate-400">File<input id="portfolio-media-file" className="admin-input mt-2 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-500/20 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-violet-100" type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml,application/pdf" onChange={(e) => setFile(e.target.files?.[0] ?? null)} required /></label>
            <label className="block text-xs font-bold uppercase tracking-[.12em] text-slate-400">Title<input className="admin-input mt-2" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Optional display title" /></label>
            <label className="block text-xs font-bold uppercase tracking-[.12em] text-slate-400">Alt text<textarea className="admin-input mt-2 min-h-[90px]" value={altText} onChange={(e) => setAltText(e.target.value)} placeholder="Describe the image for accessibility" /></label>
            <button className="button-primary w-full" disabled={!file || uploading}>{uploading ? <LoaderCircle className="animate-spin" size={17} /> : <Upload size={17} />}{uploading ? 'Uploading…' : 'Upload asset'}</button>
          </div>
          {notice && <p className="mt-4 rounded-2xl border border-white/10 bg-white/[.03] p-3 text-xs leading-6 text-slate-300">{notice}</p>}
        </form>

        <section>
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2"><button onClick={() => setFilter('all')} className={`admin-filter ${filter === 'all' ? 'admin-filter-active' : ''}`}>All ({assets.length})</button>{categories.map((item) => <button key={item} onClick={() => setFilter(item)} className={`admin-filter ${filter === item ? 'admin-filter-active' : ''}`}>{item} ({assets.filter((asset) => asset.category === item).length})</button>)}</div>
            <button className="admin-top-button" onClick={() => void loadAssets()}><RefreshCw size={15} />Refresh</button>
          </div>
          {loading ? <div className="admin-loading-card"><LoaderCircle className="animate-spin" size={18} />Loading media…</div> : visibleAssets.length === 0 ? <div className="admin-loading-card">No assets in this category yet.</div> : (
            <div className="grid gap-4 sm:grid-cols-2 2xl:grid-cols-3">
              {visibleAssets.map((asset) => {
                const isImage = asset.mime_type?.startsWith('image/')
                return <article key={asset.id} className="overflow-hidden rounded-3xl border border-white/10 bg-[#111421] shadow-soft"><div className="grid aspect-[4/3] place-items-center bg-[#05070d]">{isImage ? <img src={asset.public_url} alt={asset.alt_text || asset.title} loading="lazy" className="h-full w-full object-cover" /> : <FileText size={50} className="text-violet-300" />}</div><div className="p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-display text-base font-bold text-white">{asset.title || asset.object_path}</p><p className="mt-1 text-[11px] text-cyan-300">{asset.category} · {formatSize(asset.size_bytes)}</p></div><span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/[.05] text-slate-400">{isImage ? <ImageIcon size={15} /> : <FileText size={15} />}</span></div><p className="mt-3 truncate text-[11px] text-slate-500">{asset.object_path}</p><div className="mt-4 grid grid-cols-3 gap-2"><button className="admin-media-action" onClick={() => { void navigator.clipboard.writeText(asset.public_url); setNotice('Public URL copied.') }}><Copy size={14} />Copy</button><a className="admin-media-action" href={asset.public_url} target="_blank" rel="noreferrer"><ExternalLink size={14} />Open</a><button className="admin-media-action text-rose-200" onClick={() => void deleteAsset(asset)}><Trash2 size={14} />Delete</button></div></div></article>
              })}
            </div>
          )}
        </section>
      </div>
    </>
  )
}

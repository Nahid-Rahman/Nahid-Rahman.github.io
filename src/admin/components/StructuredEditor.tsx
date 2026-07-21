import { ArrowDown, ArrowUp, Copy, ExternalLink, Image as ImageIcon, Plus, Trash2 } from 'lucide-react'

type EditableValue = string | number | boolean | null | EditableObject | EditableValue[]
type EditableObject = { [key: string]: EditableValue }

type Props = {
  value: EditableValue
  onChange: (value: EditableValue) => void
  path?: string
  label?: string
  depth?: number
}

function labelize(value: string) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[-_]/g, ' ')
    .replace(/^./, (letter) => letter.toUpperCase())
}

function emptyLike(value: EditableValue): EditableValue {
  if (typeof value === 'string') return ''
  if (typeof value === 'number') return 0
  if (typeof value === 'boolean') return false
  if (value === null) return null
  if (Array.isArray(value)) return []
  return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, emptyLike(item)]))
}

function itemTitle(item: EditableValue, index: number) {
  if (!item || typeof item !== 'object' || Array.isArray(item)) return `Item ${index + 1}`
  const candidate = item.title ?? item.company ?? item.institution ?? item.label ?? item.name ?? item.role
  return typeof candidate === 'string' && candidate.trim() ? candidate : `Item ${index + 1}`
}

function isLongText(key: string, value: string) {
  return value.length > 100 || /(summary|description|objective|tested|note|tagline|highlight|detail|contribution|content)/i.test(key)
}

function isImageField(key: string, value: string) {
  return /(image|logo|poster|photo|src)/i.test(key) || /\.(png|jpe?g|webp|gif|svg)(\?.*)?$/i.test(value)
}

function PrimitiveInput({ fieldKey, value, onChange }: { fieldKey: string; value: string | number | boolean | null; onChange: (value: EditableValue) => void }) {
  if (typeof value === 'boolean') {
    return (
      <label className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-[#0b0d16]/45 px-4 py-3">
        <span className="text-sm font-semibold text-slate-200">{labelize(fieldKey)}</span>
        <input type="checkbox" checked={value} onChange={(event) => onChange(event.target.checked)} className="h-5 w-5 accent-cyan-300" />
      </label>
    )
  }

  if (typeof value === 'number') {
    return (
      <label className="block text-xs font-bold uppercase tracking-[.12em] text-slate-400">
        {labelize(fieldKey)}
        <input className="admin-input mt-2" type="number" value={value} onChange={(event) => onChange(Number(event.target.value))} />
      </label>
    )
  }

  const stringValue = value ?? ''
  const imageField = isImageField(fieldKey, stringValue)
  const inputType = /(url|website|github|external|endpoint)/i.test(fieldKey) ? 'url' : /(email)/i.test(fieldKey) ? 'email' : 'text'

  return (
    <div>
      <label className="block text-xs font-bold uppercase tracking-[.12em] text-slate-400">
        {labelize(fieldKey)}
        {isLongText(fieldKey, stringValue) ? (
          <textarea className="admin-input mt-2 min-h-[110px] resize-y" value={stringValue} onChange={(event) => onChange(event.target.value)} />
        ) : (
          <input className="admin-input mt-2" type={inputType} value={stringValue} onChange={(event) => onChange(event.target.value)} />
        )}
      </label>
      {imageField && stringValue && (
        <div className="mt-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-[#080a12] p-3">
          <img src={stringValue} alt="Current media preview" className="h-16 w-16 rounded-xl object-cover" onError={(event) => { event.currentTarget.style.display = 'none' }} />
          <div className="min-w-0 flex-1"><p className="text-xs font-semibold text-slate-300">Media preview</p><p className="mt-1 truncate text-[11px] text-slate-500">{stringValue}</p></div>
          <a href="/admin/media" className="rounded-xl border border-white/10 p-2 text-slate-300 hover:border-cyan-300/30 hover:text-cyan-200" title="Open media library"><ImageIcon size={16} /></a>
        </div>
      )}
    </div>
  )
}

function ArrayEditor({ value, onChange, path, depth }: { value: EditableValue[]; onChange: (value: EditableValue[]) => void; path: string; depth: number }) {
  const primitive = value.every((item) => item === null || ['string', 'number', 'boolean'].includes(typeof item))

  function move(index: number, direction: -1 | 1) {
    const next = [...value]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    ;[next[index], next[target]] = [next[target], next[index]]
    onChange(next)
  }

  function add() {
    const template = value.length ? emptyLike(value[0]) : ''
    onChange([...value, template])
  }

  if (primitive) {
    return (
      <div className="space-y-2">
        {value.map((item, index) => (
          <div key={`${path}-${index}`} className="flex items-start gap-2">
            <input className="admin-input" value={item === null ? '' : String(item)} onChange={(event) => {
              const next = [...value]
              next[index] = typeof item === 'number' ? Number(event.target.value) : typeof item === 'boolean' ? event.target.value === 'true' : event.target.value
              onChange(next)
            }} />
            <div className="flex shrink-0 gap-1">
              <button className="admin-icon-button" onClick={() => move(index, -1)} disabled={index === 0} title="Move up"><ArrowUp size={15} /></button>
              <button className="admin-icon-button" onClick={() => move(index, 1)} disabled={index === value.length - 1} title="Move down"><ArrowDown size={15} /></button>
              <button className="admin-icon-button admin-danger" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} title="Delete"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        <button className="admin-add-button" onClick={add}><Plus size={15} />Add item</button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {value.map((item, index) => (
        <article key={`${path}-${index}`} className="rounded-3xl border border-white/10 bg-[#0b0d16]/45 p-4 sm:p-5">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[.07] pb-4">
            <div><p className="text-[11px] font-bold uppercase tracking-[.14em] text-cyan-300">{`Item ${index + 1}`}</p><h3 className="mt-1 font-display text-lg font-bold text-white">{itemTitle(item, index)}</h3></div>
            <div className="flex gap-1">
              <button className="admin-icon-button" onClick={() => move(index, -1)} disabled={index === 0}><ArrowUp size={15} /></button>
              <button className="admin-icon-button" onClick={() => move(index, 1)} disabled={index === value.length - 1}><ArrowDown size={15} /></button>
              <button className="admin-icon-button" onClick={() => { const next = [...value]; next.splice(index + 1, 0, JSON.parse(JSON.stringify(item)) as EditableValue); onChange(next) }} title="Duplicate"><Copy size={15} /></button>
              <button className="admin-icon-button admin-danger" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))}><Trash2 size={15} /></button>
            </div>
          </div>
          <StructuredEditor value={item} onChange={(nextItem) => { const next = [...value]; next[index] = nextItem; onChange(next) }} path={`${path}.${index}`} depth={depth + 1} />
        </article>
      ))}
      <button className="admin-add-button" onClick={add}><Plus size={15} />Add new entry</button>
    </div>
  )
}

export function StructuredEditor({ value, onChange, path = 'root', label, depth = 0 }: Props) {
  if (value === null || ['string', 'number', 'boolean'].includes(typeof value)) {
    return <PrimitiveInput fieldKey={label ?? path.split('.').pop() ?? 'Value'} value={value as string | number | boolean | null} onChange={onChange} />
  }

  if (Array.isArray(value)) {
    return <ArrayEditor value={value} onChange={onChange} path={path} depth={depth} />
  }

  const objectValue = value as EditableObject
  return (
    <div className={depth === 0 ? 'space-y-5' : 'grid gap-4 md:grid-cols-2'}>
      {Object.entries(objectValue).map(([key, item]) => {
        const complex = item !== null && typeof item === 'object'
        return (
          <div key={`${path}.${key}`} className={complex ? 'md:col-span-2' : ''}>
            {complex ? (
              <section className={depth > 0 ? 'rounded-2xl border border-white/[.07] bg-white/[.02] p-4' : ''}>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-bold text-white">{labelize(key)}</h3>
                  {typeof item === 'string' && /^https?:/.test(item) && <a href={item} target="_blank" rel="noreferrer" className="text-cyan-300"><ExternalLink size={15} /></a>}
                </div>
                <StructuredEditor value={item} onChange={(nextItem) => onChange({ ...objectValue, [key]: nextItem })} path={`${path}.${key}`} label={key} depth={depth + 1} />
              </section>
            ) : (
              <StructuredEditor value={item} onChange={(nextItem) => onChange({ ...objectValue, [key]: nextItem })} path={`${path}.${key}`} label={key} depth={depth + 1} />
            )}
          </div>
        )
      })}
    </div>
  )
}

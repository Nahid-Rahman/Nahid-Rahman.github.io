import type { PortfolioContent } from '../../content/defaultContent'
import { useAdminData } from '../AdminDataContext'
import { AdminPageHeader } from '../components/AdminPageHeader'
import { StructuredEditor } from '../components/StructuredEditor'

type SectionDefinition = { key: keyof PortfolioContent; title: string; description?: string }

export function MultiSectionPage({ eyebrow, title, description, sections }: { eyebrow: string; title: string; description: string; sections: SectionDefinition[] }) {
  const { content, setSection, loading } = useAdminData()
  if (loading) return <div className="admin-loading-card">Loading portfolio data…</div>

  return (
    <>
      <AdminPageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="space-y-6">
        {sections.map((section) => (
          <section key={section.key} className="rounded-[2rem] border border-white/10 bg-[#111421] p-4 shadow-soft sm:p-6">
            <div className="mb-6 border-b border-white/[.07] pb-5"><h2 className="font-display text-2xl font-bold text-white">{section.title}</h2>{section.description && <p className="mt-2 text-sm leading-6 text-slate-400">{section.description}</p>}</div>
            <StructuredEditor value={content[section.key] as never} onChange={(next) => setSection(section.key, next as never)} path={String(section.key)} />
          </section>
        ))}
      </div>
    </>
  )
}

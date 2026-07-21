import type { PortfolioContent } from '../../content/defaultContent'
import { useAdminData } from '../AdminDataContext'
import { AdminPageHeader } from '../components/AdminPageHeader'
import { StructuredEditor } from '../components/StructuredEditor'

type Props<K extends keyof PortfolioContent> = {
  section: K
  eyebrow: string
  title: string
  description: string
}

export function SectionEditorPage<K extends keyof PortfolioContent>({ section, eyebrow, title, description }: Props<K>) {
  const { content, setSection, loading } = useAdminData()
  if (loading) return <div className="admin-loading-card">Loading portfolio data…</div>

  return (
    <>
      <AdminPageHeader eyebrow={eyebrow} title={title} description={description} />
      <div className="rounded-[2rem] border border-white/10 bg-[#111421] p-4 shadow-soft sm:p-6">
        <StructuredEditor value={content[section] as never} onChange={(nextValue) => setSection(section, nextValue as PortfolioContent[K])} path={String(section)} />
      </div>
    </>
  )
}

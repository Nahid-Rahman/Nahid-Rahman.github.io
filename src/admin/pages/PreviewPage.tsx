import { useState } from 'react'
import { PortfolioProvider } from '../../content/PortfolioContext'
import { AboutPage } from '../../pages/AboutPage'
import { BeyondWorkPage } from '../../pages/BeyondWorkPage'
import { ContactPage } from '../../pages/ContactPage'
import { EducationResearchPage } from '../../pages/EducationResearchPage'
import { ExperiencePage } from '../../pages/ExperiencePage'
import { HomePage } from '../../pages/HomePage'
import { ProjectsPage } from '../../pages/ProjectsPage'
import { SkillsPage } from '../../pages/SkillsPage'
import { useAdminData } from '../AdminDataContext'
import { AdminPageHeader } from '../components/AdminPageHeader'

const pages = {
  Home: HomePage,
  About: AboutPage,
  Experience: ExperiencePage,
  'Education & Research': EducationResearchPage,
  Projects: ProjectsPage,
  Skills: SkillsPage,
  'Beyond Work': BeyondWorkPage,
  Contact: ContactPage,
}

export function PreviewPage() {
  const { content } = useAdminData()
  const [selected, setSelected] = useState<keyof typeof pages>('Home')
  const SelectedPage = pages[selected]

  return (
    <>
      <AdminPageHeader eyebrow="Private preview" title="Preview the current draft" description="This preview uses your unsaved editor state. It does not affect the live portfolio until you publish." action={<select className="admin-input min-w-52" value={selected} onChange={(e) => setSelected(e.target.value as keyof typeof pages)}>{Object.keys(pages).map((page) => <option key={page}>{page}</option>)}</select>} />
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0d16] shadow-soft">
        <div className="flex items-center justify-between border-b border-white/[.07] bg-[#111421] px-5 py-3"><p className="text-xs font-semibold text-slate-400">Draft preview · {selected}</p><a href="/" target="_blank" className="text-xs font-semibold text-cyan-300">Open published site ↗</a></div>
        <div className="max-h-[75vh] overflow-y-auto">
          <PortfolioProvider previewContent={content}><SelectedPage /></PortfolioProvider>
        </div>
      </div>
    </>
  )
}

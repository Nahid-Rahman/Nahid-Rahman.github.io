import { Route, Routes } from 'react-router-dom'
import { AdminAuthProvider } from './AdminAuthContext'
import { AdminDataProvider } from './AdminDataContext'
import { AdminGate } from './components/AdminGate'
import { AdminShell } from './components/AdminShell'
import { DashboardPage } from './pages/DashboardPage'
import { DataPage } from './pages/DataPage'
import { FavouritesPage } from './pages/FavouritesPage'
import { MediaPage } from './pages/MediaPage'
import { MultiSectionPage } from './pages/MultiSectionPage'
import { PreviewPage } from './pages/PreviewPage'
import { RevisionsPage } from './pages/RevisionsPage'
import { SectionEditorPage } from './pages/SectionEditorPage'

export function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminGate>
        <AdminDataProvider>
          <Routes>
            <Route element={<AdminShell />}>
              <Route index element={<DashboardPage />} />
              <Route path="site" element={<MultiSectionPage eyebrow="Core identity" title="Site and homepage" description="Manage your name, role, links, contact information, hero copy, homepage statistics, introduction, and quick facts." sections={[{ key: 'site', title: 'Site identity & links' }, { key: 'glanceStats', title: 'At-a-glance statistics' }, { key: 'homeAbout', title: 'Homepage about copy' }, { key: 'quickFacts', title: 'Quick facts' }]} />} />
              <Route path="experience" element={<SectionEditorPage section="experiences" eyebrow="Professional journey" title="Experience manager" description="Add, edit, remove, duplicate, and reorder companies, roles, contributions, tags, official websites, and company logos." />} />
              <Route path="projects" element={<SectionEditorPage section="projects" eyebrow="Work evidence" title="Projects manager" description="Manage project cards, detailed modal content, tools, focus areas, GitHub links, and display order." />} />
              <Route path="skills" element={<MultiSectionPage eyebrow="Capabilities" title="Skills and certifications" description="Maintain skill groups, descriptions, individual tools, certifications, issuers, and years." sections={[{ key: 'skillGroups', title: 'Skill groups' }, { key: 'certifications', title: 'Certifications' }]} />} />
              <Route path="education" element={<MultiSectionPage eyebrow="Academic journey" title="Education and research" description="Manage institutions, credentials, academic results, logos, current research, and earlier research." sections={[{ key: 'education', title: 'Education history' }, { key: 'currentResearch', title: 'Current research' }, { key: 'earlierResearch', title: 'Earlier research' }]} />} />
              <Route path="beyond-work" element={<MultiSectionPage eyebrow="Personal side" title="Beyond work" description="Manage interests, values, things you enjoy, and the personal photo gallery." sections={[{ key: 'interests', title: 'Interests' }, { key: 'enjoyment', title: 'Little things I enjoy' }, { key: 'values', title: 'Values' }, { key: 'galleryPhotos', title: 'Photo gallery' }]} />} />
              <Route path="favourites" element={<FavouritesPage />} />
              <Route path="media" element={<MediaPage />} />
              <Route path="preview" element={<PreviewPage />} />
              <Route path="revisions" element={<RevisionsPage />} />
              <Route path="data" element={<DataPage />} />
              <Route path="*" element={<DashboardPage />} />
            </Route>
          </Routes>
        </AdminDataProvider>
      </AdminGate>
    </AdminAuthProvider>
  )
}

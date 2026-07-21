import { BriefcaseBusiness, Database, GraduationCap, Heart, Image, Rocket, Save, Wrench } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAdminData } from '../AdminDataContext'
import { AdminPageHeader } from '../components/AdminPageHeader'

function StatCard({ label, value, icon: Icon, to }: { label: string; value: number | string; icon: typeof Rocket; to: string }) {
  return <Link to={to} className="group rounded-3xl border border-white/10 bg-[#111421] p-5 transition hover:-translate-y-1 hover:border-cyan-300/25 hover:shadow-soft"><div className="flex items-center justify-between"><span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-400/10 text-cyan-200"><Icon size={20} /></span><span className="font-display text-3xl font-bold text-white">{value}</span></div><p className="mt-5 text-sm font-semibold text-slate-300">{label}</p><p className="mt-1 text-xs text-slate-500 group-hover:text-cyan-300">Open manager →</p></Link>
}

export function DashboardPage() {
  const { content, loading, dirty, saveDraft, publish, draftUpdatedAt, publishedAt } = useAdminData()
  const favouriteCount = Object.values(content.favorites).reduce((total, items) => total + items.length, 0)
  const mediaReferences = [content.site.cvPath, content.site.thesisPdfPath, ...content.galleryPhotos.map((item) => item.src), ...content.experiences.map((item) => item.logoImage ?? ''), ...content.education.map((item) => item.logoImage ?? ''), ...Object.values(content.favorites).flat().map((item) => item.image ?? '')].filter(Boolean).length

  if (loading) return <div className="admin-loading-card">Loading dashboard…</div>

  return (
    <>
      <AdminPageHeader eyebrow="Overview" title="Everything in one control room." description="Edit the private draft, preview it, then publish when you are ready. The public portfolio only reads the published snapshot." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Projects" value={content.projects.length} icon={Rocket} to="/admin/projects" />
        <StatCard label="Experience entries" value={content.experiences.length} icon={BriefcaseBusiness} to="/admin/experience" />
        <StatCard label="Education entries" value={content.education.length} icon={GraduationCap} to="/admin/education" />
        <StatCard label="Skill groups" value={content.skillGroups.length} icon={Wrench} to="/admin/skills" />
        <StatCard label="Favourite items" value={favouriteCount} icon={Heart} to="/admin/favourites" />
        <StatCard label="Referenced media" value={mediaReferences} icon={Image} to="/admin/media" />
        <StatCard label="Draft status" value={dirty ? 'Edited' : 'Saved'} icon={Save} to="/admin/preview" />
        <StatCard label="Revision log" value="Auto" icon={Database} to="/admin/revisions" />
      </div>

      <section className="mt-7 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-violet-500/15 via-[#111421] to-cyan-400/10 p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-cyan-300">Publishing workflow</p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white">Draft first. Publish deliberately.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Changes stay private until you press Publish. Saving a draft creates a revision; publishing creates another permanent revision and updates the public portfolio snapshot.</p>
          <div className="mt-6 flex flex-wrap gap-3"><button className="button-secondary" onClick={() => void saveDraft()}><Save size={16} />Save draft</button><button className="button-primary" onClick={() => { if (window.confirm('Publish the current draft to the live portfolio?')) void publish() }}><Rocket size={16} />Publish current draft</button></div>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-[#111421] p-6">
          <p className="text-xs font-bold uppercase tracking-[.16em] text-violet-200">Current state</p>
          <dl className="mt-5 space-y-4 text-sm"><div className="flex justify-between gap-4 border-b border-white/[.07] pb-4"><dt className="text-slate-500">Draft saved</dt><dd className="text-right font-semibold text-slate-200">{draftUpdatedAt ? new Date(draftUpdatedAt).toLocaleString() : 'Not yet'}</dd></div><div className="flex justify-between gap-4 border-b border-white/[.07] pb-4"><dt className="text-slate-500">Last published</dt><dd className="text-right font-semibold text-slate-200">{publishedAt ? new Date(publishedAt).toLocaleString() : 'Not yet'}</dd></div><div className="flex justify-between gap-4"><dt className="text-slate-500">Unpublished edits</dt><dd className={dirty ? 'font-semibold text-amber-200' : 'font-semibold text-emerald-200'}>{dirty ? 'Yes' : 'No'}</dd></div></dl>
        </div>
      </section>
    </>
  )
}

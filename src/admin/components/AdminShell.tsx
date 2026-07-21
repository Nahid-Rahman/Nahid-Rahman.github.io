import {
  BookOpen,
  BriefcaseBusiness,
  Database,
  Eye,
  FileJson,
  GraduationCap,
  Heart,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  Rocket,
  Save,
  Settings,
  Sparkles,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAdminAuth } from '../AdminAuthContext'
import { useAdminData } from '../AdminDataContext'

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/site', label: 'Site & Home', icon: Home },
  { to: '/admin/experience', label: 'Experience', icon: BriefcaseBusiness },
  { to: '/admin/projects', label: 'Projects', icon: Rocket },
  { to: '/admin/skills', label: 'Skills', icon: Wrench },
  { to: '/admin/education', label: 'Education & Research', icon: GraduationCap },
  { to: '/admin/beyond-work', label: 'Beyond Work', icon: Sparkles },
  { to: '/admin/favourites', label: 'Favourites', icon: Heart },
  { to: '/admin/media', label: 'Media Library', icon: Image },
  { to: '/admin/preview', label: 'Draft Preview', icon: Eye },
  { to: '/admin/revisions', label: 'Revision History', icon: Database },
  { to: '/admin/data', label: 'Backup & JSON', icon: FileJson },
]

function formatDate(value: string | null) {
  if (!value) return 'Not yet'
  return new Intl.DateTimeFormat('en-BD', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value))
}

export function AdminShell() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { signOut, session } = useAdminAuth()
  const { saveDraft, publish, dirty, saving, notice, draftUpdatedAt, publishedAt } = useAdminData()

  useEffect(() => {
    function saveShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault()
        void saveDraft()
      }
    }
    window.addEventListener('keydown', saveShortcut)
    return () => window.removeEventListener('keydown', saveShortcut)
  }, [saveDraft])

  async function publishNow() {
    if (!window.confirm('Publish the current draft to the live portfolio?')) return
    await publish()
  }

  return (
    <div className="min-h-screen bg-[#080a12] text-slate-100">
      <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/[.07] bg-[#080a12]/95 backdrop-blur-xl lg:left-72">
        <div className="flex min-h-[76px] items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <button className="admin-icon-button lg:hidden" onClick={() => setMenuOpen(true)}><Menu size={19} /></button>
            <div className="min-w-0"><p className="truncate font-display text-lg font-bold text-white">Portfolio Admin</p><p className="truncate text-[11px] text-slate-500">{dirty ? 'Unsaved changes' : `Draft: ${formatDate(draftUpdatedAt)}`}</p></div>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a href="/" target="_blank" className="admin-top-button hidden sm:inline-flex"><Eye size={15} />View site</a>
            <button onClick={() => void saveDraft()} disabled={saving || !dirty} className="admin-top-button"><Save size={15} />Save draft</button>
            <button onClick={() => void publishNow()} disabled={saving} className="button-primary px-4 py-2.5 text-xs"><Rocket size={15} />Publish</button>
          </div>
        </div>
        {notice && <div className={`border-t px-4 py-2 text-center text-xs font-semibold ${notice.tone === 'error' ? 'border-rose-300/20 bg-rose-300/[.06] text-rose-100' : notice.tone === 'success' ? 'border-emerald-300/20 bg-emerald-300/[.06] text-emerald-100' : 'border-cyan-300/20 bg-cyan-300/[.05] text-cyan-100'}`}>{notice.message}</div>}
      </header>

      <aside className={`fixed inset-y-0 left-0 z-[110] w-72 border-r border-white/[.07] bg-[#0b0d16] transition-transform duration-200 lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-[76px] items-center justify-between border-b border-white/[.07] px-5">
          <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 font-display text-xs font-bold shadow-glow">SMR</span><div><p className="font-display text-sm font-bold text-white">NAHID</p><p className="text-[10px] uppercase tracking-[.15em] text-cyan-300">Content studio</p></div></div>
          <button className="admin-icon-button lg:hidden" onClick={() => setMenuOpen(false)}><X size={18} /></button>
        </div>
        <nav className="h-[calc(100vh-168px)] overflow-y-auto p-3" aria-label="Admin navigation">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `mb-1 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${isActive ? 'bg-gradient-to-r from-violet-500/20 to-cyan-400/10 text-white ring-1 ring-violet-300/20' : 'text-slate-400 hover:bg-white/[.05] hover:text-white'}`}><Icon size={17} />{label}</NavLink>
          ))}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-white/[.07] p-4">
          <div className="mb-3 flex items-center gap-3 rounded-2xl bg-white/[.03] p-3"><span className="grid h-9 w-9 place-items-center rounded-xl bg-cyan-400/10 text-cyan-200"><Settings size={16} /></span><div className="min-w-0"><p className="truncate text-xs font-semibold text-white">{session?.user.email}</p><p className="text-[10px] text-emerald-300">MFA protected</p></div></div>
          <button onClick={() => void signOut()} className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2.5 text-xs font-semibold text-slate-400 hover:border-rose-300/20 hover:text-rose-200"><LogOut size={15} />Sign out</button>
        </div>
      </aside>

      {menuOpen && <button aria-label="Close menu" className="fixed inset-0 z-[105] bg-black/70 lg:hidden" onClick={() => setMenuOpen(false)} />}

      <main className="min-h-screen pt-[76px] lg:ml-72">
        <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      <div className="fixed bottom-3 right-3 z-50 hidden rounded-full border border-white/10 bg-[#111421]/95 px-3 py-1.5 text-[10px] text-slate-500 shadow-soft sm:block">Published: {formatDate(publishedAt)}</div>
    </div>
  )
}

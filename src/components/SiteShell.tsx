import { Download, Mail, Menu, X } from 'lucide-react'
import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { navigation } from '../data/portfolio'
import { usePortfolio } from '../content/PortfolioContext'
import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from './BrandIcons'

type Props = { children: ReactNode }

export function SiteShell({ children }: Props) {
  const { site } = usePortfolio()
  const social = [
    { label: 'GitHub', href: site.links.github, icon: GitHubIcon },
    { label: 'LinkedIn', href: site.links.linkedin, icon: LinkedInIcon },
    { label: 'Facebook', href: site.links.facebook, icon: FacebookIcon },
    { label: 'Instagram', href: site.links.instagram, icon: InstagramIcon },
  ]
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()
  const close = () => setOpen(false)

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 8)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => window.removeEventListener('scroll', updateHeader)
  }, [])

  useEffect(() => {
    close()
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <div className="page-shell min-h-screen">
      <header className={`sticky top-0 z-50 border-b backdrop-blur-xl transition duration-200 ${scrolled ? 'border-cyan-300/15 bg-[#080a12]/95 shadow-[0_14px_42px_rgba(0,0,0,.32)]' : 'border-white/[.06] bg-[#0b0d16]/84'}`}>
        <div className="container-wide flex h-[76px] items-center justify-between gap-4">
          <Link to="/" className="group inline-flex items-center gap-3" aria-label="Go to home" onClick={close}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 via-violet-500 to-cyan-400 font-display text-sm font-bold text-white shadow-glow">SMR</span>
            <span className="hidden font-display text-sm font-bold tracking-wide text-white sm:block">NAHID</span>
          </Link>

          <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Primary navigation">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <a href={site.cvPath} download className="button-secondary px-4 py-2.5 text-xs"><Download size={15} /> Download CV</a>
            <Link to="/contact" className="button-primary px-4 py-2.5 text-xs">Let’s Connect</Link>
          </div>

          <button
            className="rounded-xl border border-white/10 p-2.5 text-white transition hover:border-cyan-300/40 hover:bg-white/[.06] focus:outline-none focus:ring-2 focus:ring-cyan-300/70 xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            aria-controls="mobile-navigation"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <>
            <button className="fixed inset-x-0 bottom-0 top-[76px] z-0 cursor-default bg-[#03040a]/45 xl:hidden" aria-label="Close navigation" onClick={close} />
            <div id="mobile-navigation" className="relative z-10 max-h-[calc(100vh-76px)] overflow-y-auto border-t border-white/[.07] bg-[#0b0d16]/98 px-5 py-4 shadow-2xl xl:hidden">
              <nav className="container-wide grid gap-1 px-0" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <NavLink key={item.to} to={item.to} onClick={close} className={({ isActive }) => `nav-link min-h-11 px-4 py-3 ${isActive ? 'nav-link-active' : ''}`}>
                  {item.label}
                </NavLink>
              ))}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a href={site.cvPath} download className="button-secondary px-3 py-2.5 text-xs"><Download size={15} /> CV</a>
                <Link to="/contact" onClick={close} className="button-primary px-3 py-2.5 text-xs">Connect</Link>
              </div>
              </nav>
            </div>
          </>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t border-white/[.07] py-10">
        <div className="container-wide flex flex-col justify-between gap-7 md:flex-row md:items-end">
          <div>
            <p className="font-display text-xl font-bold text-white">Shaikh Mahmudur Rahman <span className="text-violet-300">(Nahid)</span></p>
            <p className="mt-2 text-sm text-slate-400">Software QA Engineer | Manual & Automation Testing</p>
            <p className="mt-4 text-sm text-slate-500">© 2026 Shaikh Mahmudur Rahman (Nahid). Quality checked. Overthinking included at no extra cost.</p>
          </div>
          <div className="flex items-center gap-2">
            <a href={`mailto:${site.email}`} className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-cyan-300/50 hover:text-cyan-200" aria-label="Send an email"><Mail size={18} /></a>
            {social.map(({ label, href, icon: Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 p-3 text-slate-300 transition hover:border-violet-300/50 hover:text-violet-200" aria-label={label}><Icon size={18} /></a>)}
          </div>
        </div>
      </footer>
    </div>
  )
}

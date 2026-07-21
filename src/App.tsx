import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Component, Suspense, lazy, type ErrorInfo, type ReactNode, useEffect } from 'react'
import { SiteShell } from './components/SiteShell'
import { AboutPage } from './pages/AboutPage'
import { BeyondWorkPage } from './pages/BeyondWorkPage'
import { ContactPage } from './pages/ContactPage'
import { EducationResearchPage } from './pages/EducationResearchPage'
import { ExperiencePage } from './pages/ExperiencePage'
import { HomePage } from './pages/HomePage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SkillsPage } from './pages/SkillsPage'
import { PortfolioProvider } from './content/PortfolioContext'

const AdminApp = lazy(() => import('./admin/AdminApp').then((module) => ({ default: module.AdminApp })))

const routeMeta: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Nahid | Software QA Engineer',
    description: 'Shaikh Mahmudur Rahman (Nahid) — Software QA Engineer focused on manual and automation testing across web, mobile, APIs, and backend systems.',
  },
  '/about': {
    title: 'About Nahid | Software QA Engineer',
    description: 'Learn about Nahid’s quality-focused approach to web, mobile, API, and backend testing.',
  },
  '/experience': {
    title: 'Experience | Nahid Rahman',
    description: 'Software QA experience across HR tech, recruitment, edtech, real estate, and product operations.',
  },
  '/education-research': {
    title: 'Education & Research | Nahid Rahman',
    description: 'Education, research interests, and continuous learning from Shaikh Mahmudur Rahman (Nahid).',
  },
  '/projects': {
    title: 'QA Projects | Nahid Rahman',
    description: 'QA projects covering API automation, Selenium, Appium, performance testing, and test evidence.',
  },
  '/skills': {
    title: 'QA Skills | Nahid Rahman',
    description: 'Manual testing, automation, API testing, web and mobile QA, performance testing, and release readiness.',
  },
  '/beyond-work': {
    title: 'Beyond Work | Nahid Rahman',
    description: 'A closer look at the interests and values that keep Nahid curious outside software quality assurance.',
  },
  '/contact': {
    title: 'Contact Nahid | Software QA Engineer',
    description: 'Contact Shaikh Mahmudur Rahman (Nahid) for QA discussions, product quality needs, and professional opportunities.',
  },
}

function updateMeta(name: string, content: string) {
  const selector = `meta[name="${name}"], meta[property="${name}"]`
  const element = document.querySelector<HTMLMetaElement>(selector)
  if (element) element.content = content
}

function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)

    const meta = routeMeta[pathname] ?? routeMeta['/']
    const canonicalUrl = `${window.location.origin}${pathname === '/' ? '/' : pathname}`

    document.title = meta.title
    updateMeta('description', meta.description)
    updateMeta('og:title', meta.title)
    updateMeta('og:description', meta.description)
    updateMeta('og:url', canonicalUrl)
    updateMeta('twitter:title', meta.title)
    updateMeta('twitter:description', meta.description)

    document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.setAttribute('href', canonicalUrl)
  }, [pathname])

  return null
}

type BoundaryProps = { children: ReactNode }
type BoundaryState = { hasError: boolean }

class PortfolioErrorBoundary extends Component<BoundaryProps, BoundaryState> {
  state: BoundaryState = { hasError: false }

  static getDerivedStateFromError(): BoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Portfolio route failed to render.', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="page-shell flex min-h-screen items-center justify-center px-5">
          <div className="max-w-md rounded-3xl border border-white/10 bg-[#111421] p-7 text-center shadow-soft">
            <p className="eyebrow justify-center">Portfolio navigation</p>
            <h1 className="font-display text-3xl font-bold text-white">This page did not load correctly.</h1>
            <p className="mt-4 text-sm leading-7 text-slate-300">Please return to the homepage and try again.</p>
            <a className="button-primary mt-7" href="/">Return Home</a>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

function PublicSite() {
  return (
    <PortfolioProvider>
      <SiteShell>
        <RouteEffects />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/education-research" element={<EducationResearchPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/beyond-work" element={<BeyondWorkPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </SiteShell>
    </PortfolioProvider>
  )
}

function RoutedApp() {
  return (
    <Routes>
      <Route path="/admin/*" element={<Suspense fallback={<div className="admin-loading-card m-5">Loading admin panel…</div>}><AdminApp /></Suspense>} />
      <Route path="/*" element={<PublicSite />} />
    </Routes>
  )
}

export default function App() {
  return (
    <PortfolioErrorBoundary>
      <BrowserRouter>
        <RoutedApp />
      </BrowserRouter>
    </PortfolioErrorBoundary>
  )
}

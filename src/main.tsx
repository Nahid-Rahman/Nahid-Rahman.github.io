import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

function restoreGitHubPagesRoute() {
  const url = new URL(window.location.href)
  const requestedPath = url.searchParams.get('redirect')

  // GitHub Pages serves 404.html for direct SPA routes. The fallback stores the
  // intended path in ?redirect=..., then this restores it before React mounts.
  if (!requestedPath || !requestedPath.startsWith('/') || requestedPath.startsWith('//')) return

  window.history.replaceState(null, '', requestedPath)
}

restoreGitHubPagesRoute()

createRoot(document.getElementById('root')!).render(<App />)

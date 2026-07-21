import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { supabase } from '../lib/supabase'
import { clonePortfolioContent, defaultPortfolioContent, isPortfolioContent, type PortfolioContent } from './defaultContent'

type PortfolioContextValue = {
  content: PortfolioContent
  loading: boolean
  source: 'default' | 'published' | 'preview'
}

const PortfolioContext = createContext<PortfolioContextValue>({
  content: defaultPortfolioContent,
  loading: false,
  source: 'default',
})

type Props = {
  children: ReactNode
  previewContent?: PortfolioContent
}

export function PortfolioProvider({ children, previewContent }: Props) {
  const [content, setContent] = useState<PortfolioContent>(() => clonePortfolioContent(previewContent ?? defaultPortfolioContent))
  const [loading, setLoading] = useState(!previewContent)
  const [source, setSource] = useState<PortfolioContextValue['source']>(previewContent ? 'preview' : 'default')

  useEffect(() => {
    if (previewContent) {
      setContent(clonePortfolioContent(previewContent))
      setSource('preview')
      setLoading(false)
      return
    }

    let cancelled = false

    async function loadPublishedContent() {
      setLoading(true)
      const { data, error } = await supabase.from('portfolio_public').select('content').eq('id', 'main').maybeSingle()

      if (cancelled) return

      if (!error && isPortfolioContent(data?.content)) {
        setContent(clonePortfolioContent(data.content))
        setSource('published')
      } else {
        setContent(clonePortfolioContent(defaultPortfolioContent))
        setSource('default')
        if (error && error.code !== 'PGRST116') {
          console.warn('Published portfolio content could not be loaded; using bundled fallback.', error.message)
        }
      }
      setLoading(false)
    }

    void loadPublishedContent()
    return () => {
      cancelled = true
    }
  }, [previewContent])

  const value = useMemo(() => ({ content, loading, source }), [content, loading, source])
  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>
}

export function usePortfolio() {
  return useContext(PortfolioContext).content
}

export function usePortfolioStatus() {
  const { loading, source } = useContext(PortfolioContext)
  return { loading, source }
}

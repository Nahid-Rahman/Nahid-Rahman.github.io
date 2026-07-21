import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { clonePortfolioContent, defaultPortfolioContent, isPortfolioContent, type PortfolioContent } from '../content/defaultContent'
import { supabase } from '../lib/supabase'

type Notice = { tone: 'success' | 'error' | 'info'; message: string } | null

type AdminDataContextValue = {
  content: PortfolioContent
  loading: boolean
  saving: boolean
  dirty: boolean
  notice: Notice
  draftUpdatedAt: string | null
  publishedAt: string | null
  setContent: (content: PortfolioContent) => void
  setSection: <K extends keyof PortfolioContent>(key: K, value: PortfolioContent[K]) => void
  saveDraft: () => Promise<boolean>
  publish: () => Promise<boolean>
  reload: () => Promise<void>
  resetToBundled: () => void
  clearNotice: () => void
}

const AdminDataContext = createContext<AdminDataContextValue | null>(null)

export function AdminDataProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<PortfolioContent>(() => clonePortfolioContent(defaultPortfolioContent))
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [notice, setNotice] = useState<Notice>(null)
  const [draftUpdatedAt, setDraftUpdatedAt] = useState<string | null>(null)
  const [publishedAt, setPublishedAt] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setNotice(null)

    const [draftResult, publicResult] = await Promise.all([
      supabase.from('portfolio_drafts').select('content, updated_at').eq('id', 'main').maybeSingle(),
      supabase.from('portfolio_public').select('content, published_at').eq('id', 'main').maybeSingle(),
    ])

    if (draftResult.error && draftResult.error.code !== 'PGRST116') {
      setNotice({ tone: 'error', message: draftResult.error.message })
    }

    const draftContent = draftResult.data?.content
    const publicContent = publicResult.data?.content
    const selected = isPortfolioContent(draftContent)
      ? draftContent
      : isPortfolioContent(publicContent)
        ? publicContent
        : defaultPortfolioContent

    setContentState(clonePortfolioContent(selected))
    setDraftUpdatedAt(draftResult.data?.updated_at ?? null)
    setPublishedAt(publicResult.data?.published_at ?? null)
    setDirty(false)
    setLoading(false)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  function setContent(nextContent: PortfolioContent) {
    setContentState(clonePortfolioContent(nextContent))
    setDirty(true)
  }

  function setSection<K extends keyof PortfolioContent>(key: K, value: PortfolioContent[K]) {
    setContentState((current) => ({ ...current, [key]: value }))
    setDirty(true)
  }

  async function saveDraft() {
    setSaving(true)
    setNotice(null)
    const { data, error } = await supabase
      .from('portfolio_drafts')
      .upsert({ id: 'main', content }, { onConflict: 'id' })
      .select('updated_at')
      .single()

    setSaving(false)
    if (error) {
      setNotice({ tone: 'error', message: error.message })
      return false
    }

    setDraftUpdatedAt(data.updated_at)
    setDirty(false)
    setNotice({ tone: 'success', message: 'Draft saved securely.' })
    return true
  }

  async function publish() {
    setSaving(true)
    setNotice(null)

    const draftResult = await supabase
      .from('portfolio_drafts')
      .upsert({ id: 'main', content }, { onConflict: 'id' })
      .select('updated_at')
      .single()

    if (draftResult.error) {
      setSaving(false)
      setNotice({ tone: 'error', message: draftResult.error.message })
      return false
    }

    const publicResult = await supabase
      .from('portfolio_public')
      .upsert({ id: 'main', content }, { onConflict: 'id' })
      .select('published_at')
      .single()

    setSaving(false)
    if (publicResult.error) {
      setNotice({ tone: 'error', message: publicResult.error.message })
      return false
    }

    setDraftUpdatedAt(draftResult.data.updated_at)
    setPublishedAt(publicResult.data.published_at)
    setDirty(false)
    setNotice({ tone: 'success', message: 'Portfolio published. The public site will use this content now.' })
    return true
  }

  const value = useMemo<AdminDataContextValue>(
    () => ({
      content,
      loading,
      saving,
      dirty,
      notice,
      draftUpdatedAt,
      publishedAt,
      setContent,
      setSection,
      saveDraft,
      publish,
      reload,
      resetToBundled: () => setContent(clonePortfolioContent(defaultPortfolioContent)),
      clearNotice: () => setNotice(null),
    }),
    [content, loading, saving, dirty, notice, draftUpdatedAt, publishedAt, reload],
  )

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>
}

export function useAdminData() {
  const context = useContext(AdminDataContext)
  if (!context) throw new Error('useAdminData must be used inside AdminDataProvider')
  return context
}

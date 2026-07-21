import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

const requireMfa = import.meta.env.VITE_REQUIRE_ADMIN_MFA === 'true'

type AuthStage = 'loading' | 'signed-out' | 'enroll-mfa' | 'challenge-mfa' | 'ready' | 'denied'

type AuthContextValue = {
  stage: AuthStage
  session: Session | null
  error: string
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  refreshAccess: () => Promise<void>
  clearError: () => void
}

const AdminAuthContext = createContext<AuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [stage, setStage] = useState<AuthStage>('loading')
  const [session, setSession] = useState<Session | null>(null)
  const [error, setError] = useState('')

  const evaluateSession = useCallback(async (nextSession?: Session | null) => {
    setError('')
    setStage('loading')

    let activeSession = nextSession
    if (activeSession === undefined) {
      const { data, error: sessionError } = await supabase.auth.getSession()
      if (sessionError) {
        setError(sessionError.message)
        setStage('signed-out')
        return
      }
      activeSession = data.session
    }

    setSession(activeSession ?? null)
    if (!activeSession) {
      setStage('signed-out')
      return
    }

    if (requireMfa) {
      const [{ data: aalData, error: aalError }, { data: factorData, error: factorError }] = await Promise.all([
        supabase.auth.mfa.getAuthenticatorAssuranceLevel(),
        supabase.auth.mfa.listFactors(),
      ])

      if (aalError || factorError) {
        setError(aalError?.message ?? factorError?.message ?? 'Could not verify the admin session.')
        setStage('signed-out')
        return
      }

      const verifiedTotp = factorData.totp.find((factor) => factor.status === 'verified')
      if (!verifiedTotp) {
        setStage('enroll-mfa')
        return
      }

      if (aalData.currentLevel !== 'aal2') {
        setStage('challenge-mfa')
        return
      }
    }

    const { data: adminRow, error: adminError } = await supabase
      .from('admin_users')
      .select('user_id, active')
      .eq('user_id', activeSession.user.id)
      .eq('active', true)
      .maybeSingle()

    if (adminError || !adminRow) {
      setError(adminError?.message ?? 'This account is not authorized to manage the portfolio.')
      setStage('denied')
      return
    }

    setStage('ready')
  }, [])

  useEffect(() => {
    void evaluateSession()
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      window.setTimeout(() => void evaluateSession(nextSession), 0)
    })
    return () => data.subscription.unsubscribe()
  }, [evaluateSession])

  async function signIn(email: string, password: string) {
    setError('')
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })
    if (signInError) {
      setError(signInError.message)
      return
    }
    await evaluateSession(data.session)
  }

  async function signOut() {
    await supabase.auth.signOut()
    setSession(null)
    setStage('signed-out')
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      stage,
      session,
      error,
      signIn,
      signOut,
      refreshAccess: () => evaluateSession(),
      clearError: () => setError(''),
    }),
    [stage, session, error, evaluateSession],
  )

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext)
  if (!context) throw new Error('useAdminAuth must be used inside AdminAuthProvider')
  return context
}

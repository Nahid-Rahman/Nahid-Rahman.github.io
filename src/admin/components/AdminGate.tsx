import type { ReactNode } from 'react'
import { useAdminAuth } from '../AdminAuthContext'
import { ChallengeMfaScreen, DeniedScreen, EnrollMfaScreen, LoadingScreen, LoginScreen } from './AuthScreens'

export function AdminGate({ children }: { children: ReactNode }) {
  const { stage } = useAdminAuth()
  if (stage === 'loading') return <LoadingScreen />
  if (stage === 'signed-out') return <LoginScreen />
  if (stage === 'enroll-mfa') return <EnrollMfaScreen />
  if (stage === 'challenge-mfa') return <ChallengeMfaScreen />
  if (stage === 'denied') return <DeniedScreen />
  return children
}

import { KeyRound, LoaderCircle, LockKeyhole, LogOut, ShieldCheck } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { supabase } from '../../lib/supabase'
import { useAdminAuth } from '../AdminAuthContext'

function AuthCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-shell flex min-h-screen items-center justify-center px-5 py-12">
      <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-[#111421] p-7 shadow-soft sm:p-9">
        <div className="mb-7 flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 text-white shadow-glow"><ShieldCheck size={23} /></span>
          <div><p className="font-display text-xl font-bold text-white">Nahid Portfolio</p><p className="text-xs text-slate-400">Private administration</p></div>
        </div>
        {children}
      </div>
    </div>
  )
}

export function LoadingScreen() {
  return <AuthCard><div className="flex items-center gap-3 text-sm text-slate-300"><LoaderCircle className="animate-spin text-cyan-300" size={20} /> Verifying secure session…</div></AuthCard>
}

export function LoginScreen() {
  const { signIn, error, clearError } = useAdminAuth()
  const [email, setEmail] = useState('nahid.glab@gmail.com')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function submit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    await signIn(email.trim(), password)
    setSubmitting(false)
  }

  return (
    <AuthCard>
      <p className="eyebrow"><LockKeyhole size={14} />Admin sign in</p>
      <h1 className="font-display text-3xl font-bold text-white">Manage your portfolio.</h1>
      <p className="mt-3 text-sm leading-7 text-slate-400">Use your private admin email and password to open the dashboard.</p>
      <form onSubmit={submit} className="mt-7 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-[.14em] text-slate-400">Email<input className="admin-input mt-2" type="email" value={email} onChange={(e) => { setEmail(e.target.value); clearError() }} autoComplete="username" required /></label>
        <label className="block text-xs font-bold uppercase tracking-[.14em] text-slate-400">Password<input className="admin-input mt-2" type="password" value={password} onChange={(e) => { setPassword(e.target.value); clearError() }} autoComplete="current-password" required /></label>
        {error && <p className="rounded-2xl border border-rose-300/20 bg-rose-300/[.05] p-3 text-sm text-rose-100">{error}</p>}
        <button className="button-primary w-full" disabled={submitting}>{submitting ? <LoaderCircle className="animate-spin" size={17} /> : <KeyRound size={17} />}{submitting ? 'Signing in…' : 'Continue securely'}</button>
      </form>
      <a href="/" className="mt-5 block text-center text-xs font-semibold text-slate-500 hover:text-slate-300">Return to public portfolio</a>
    </AuthCard>
  )
}

export function EnrollMfaScreen() {
  const { refreshAccess, signOut } = useAdminAuth()
  const [factorId, setFactorId] = useState('')
  const [qrCode, setQrCode] = useState('')
  const [secret, setSecret] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const started = useRef(false)

  useEffect(() => {
    if (started.current) return
    started.current = true

    void (async () => {
      setLoading(true)
      const { data: existing } = await supabase.auth.mfa.listFactors()
      for (const factor of existing?.all ?? []) {
        if (factor.factor_type === 'totp' && factor.status === 'unverified') {
          await supabase.auth.mfa.unenroll({ factorId: factor.id })
        }
      }

      const { data, error: enrollError } = await supabase.auth.mfa.enroll({ factorType: 'totp', friendlyName: 'Nahid Portfolio Admin' })
      if (enrollError) {
        setError(enrollError.message)
      } else {
        setFactorId(data.id)
        setQrCode(data.totp.qr_code)
        setSecret(data.totp.secret)
      }
      setLoading(false)
    })()
  }, [])

  async function verify(event: FormEvent) {
    event.preventDefault()
    setError('')
    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({ factorId, code: code.trim() })
    if (verifyError) {
      setError(verifyError.message)
      return
    }
    await refreshAccess()
  }

  const qrSource = qrCode

  return (
    <AuthCard>
      <p className="eyebrow"><ShieldCheck size={14} />One-time setup</p>
      <h1 className="font-display text-3xl font-bold text-white">Connect Google Authenticator.</h1>
      <p className="mt-3 text-sm leading-7 text-slate-400">Scan this QR code, then enter the current six-digit code. This step is mandatory for admin access.</p>
      {loading ? <div className="mt-7 flex items-center gap-3 text-sm text-slate-300"><LoaderCircle className="animate-spin" size={20} />Creating secure factor…</div> : (
        <>
          {qrSource && <div className="mx-auto mt-7 w-fit rounded-3xl bg-white p-4"><img src={qrSource} alt="Authenticator enrollment QR code" className="h-52 w-52" /></div>}
          {secret && <div className="mt-4 rounded-2xl border border-white/10 bg-[#080a12] p-3"><p className="text-[11px] uppercase tracking-[.14em] text-slate-500">Manual setup key</p><code className="mt-1 block break-all text-xs text-cyan-200">{secret}</code></div>}
          <form className="mt-5 space-y-4" onSubmit={verify}>
            <input className="admin-input text-center text-xl tracking-[.35em]" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} placeholder="000000" required />
            {error && <p className="rounded-2xl border border-rose-300/20 bg-rose-300/[.05] p-3 text-sm text-rose-100">{error}</p>}
            <button className="button-primary w-full" disabled={!factorId || code.length !== 6}>Enable authenticator</button>
          </form>
        </>
      )}
      <button onClick={() => void signOut()} className="mt-5 inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300"><LogOut size={14} />Sign out</button>
    </AuthCard>
  )
}

export function ChallengeMfaScreen() {
  const { refreshAccess, signOut } = useAdminAuth()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function verify(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const { data: factors, error: factorError } = await supabase.auth.mfa.listFactors()
    const factor = factors?.totp.find((item) => item.status === 'verified')
    if (factorError || !factor) {
      setError(factorError?.message ?? 'No verified authenticator was found.')
      setSubmitting(false)
      return
    }

    const { error: verifyError } = await supabase.auth.mfa.challengeAndVerify({ factorId: factor.id, code: code.trim() })
    if (verifyError) {
      setError(verifyError.message)
      setSubmitting(false)
      return
    }
    await refreshAccess()
    setSubmitting(false)
  }

  return (
    <AuthCard>
      <p className="eyebrow"><ShieldCheck size={14} />Two-step verification</p>
      <h1 className="font-display text-3xl font-bold text-white">Enter your authenticator code.</h1>
      <p className="mt-3 text-sm leading-7 text-slate-400">Open Google Authenticator and enter the current six-digit code for Nahid Portfolio Admin.</p>
      <form className="mt-7 space-y-4" onSubmit={verify}>
        <input className="admin-input text-center text-xl tracking-[.35em]" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))} placeholder="000000" required autoFocus />
        {error && <p className="rounded-2xl border border-rose-300/20 bg-rose-300/[.05] p-3 text-sm text-rose-100">{error}</p>}
        <button className="button-primary w-full" disabled={submitting || code.length !== 6}>{submitting && <LoaderCircle className="animate-spin" size={17} />}Verify and open dashboard</button>
      </form>
      <button onClick={() => void signOut()} className="mt-5 inline-flex w-full items-center justify-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-300"><LogOut size={14} />Sign out</button>
    </AuthCard>
  )
}

export function DeniedScreen() {
  const { error, signOut } = useAdminAuth()
  return <AuthCard><h1 className="font-display text-3xl font-bold text-white">Access denied.</h1><p className="mt-4 text-sm leading-7 text-rose-100">{error || 'This account is not on the portfolio admin allowlist.'}</p><button onClick={() => void signOut()} className="button-secondary mt-7 w-full"><LogOut size={16} />Sign out</button></AuthCard>
}

import { CheckCircle2, Mail, MapPin, Send } from 'lucide-react'
import { type FormEvent, useState } from 'react'
import { PageHeader } from '../components/PageHeader'
import { usePortfolio } from '../content/PortfolioContext'
import { FacebookIcon, GitHubIcon, InstagramIcon, LinkedInIcon } from '../components/BrandIcons'

const contributions = [
  'Manual testing, regression, and release validation',
  'API testing and API automation with practical evidence',
  'Web and mobile QA with automation support',
  'Smoke, sanity, and end-to-end verification',
  'Performance, load, and reliability testing support',
]

type FormStatus = { tone: 'success' | 'error'; message: string } | null

export function ContactPage() {
  const { site } = usePortfolio()
  const socials = [
    { label: 'GitHub', href: site.links.github, icon: GitHubIcon, priority: true },
    { label: 'LinkedIn', href: site.links.linkedin, icon: LinkedInIcon, priority: true },
    { label: 'Facebook', href: site.links.facebook, icon: FacebookIcon },
    { label: 'Instagram', href: site.links.instagram, icon: InstagramIcon },
  ]
  const [status, setStatus] = useState<FormStatus>(null)
  const [sending, setSending] = useState(false)

  async function submitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return

    setSending(true)
    setStatus(null)

    try {
      const form = event.currentTarget
      const response = await fetch(site.formspreeEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('Could not send message')

      form.reset()
      setStatus({ tone: 'success', message: 'Thanks — your message has been sent. I will get back to you as soon as I can.' })
    } catch {
      setStatus({ tone: 'error', message: 'Your message could not be sent right now. Please use the direct email link instead.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="Let’s start with a conversation." description="For professional questions, QA discussions, product quality needs, or a thoughtful hello—email and the contact form are both open." />
      <section className="container-wide py-12 sm:py-20">
        <div className="grid gap-7 lg:grid-cols-[.95fr_1.05fr] lg:items-stretch">
          <aside className="grid gap-5">
            <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/15 via-white/[.03] to-cyan-400/10 p-7">
              <p className="eyebrow">Reach out directly</p>
              <h2 className="font-display text-2xl font-bold text-white">Email is always the quickest route.</h2>
              <a href={`mailto:${site.email}`} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-cyan-200 hover:text-cyan-100"><Mail size={17} />{site.email}</a>
              <p className="mt-5 flex items-center gap-2 text-sm text-slate-400"><MapPin size={16} />{site.location}</p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/[.03] p-7">
              <p className="eyebrow">How I can contribute</p>
              <ul className="space-y-3">{contributions.map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300"><CheckCircle2 size={17} className="mt-0.5 shrink-0 text-violet-300" />{item}</li>)}</ul>
            </article>

            <article className="rounded-3xl border border-white/10 bg-white/[.03] p-7 lg:flex lg:flex-col lg:justify-end">
              <p className="eyebrow">Find me online</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {socials.map(({ label, href, icon: Icon, priority }) => (
                  <a key={label} className={`button-secondary px-3 py-3 text-xs ${priority ? 'border-violet-300/25 text-white' : 'text-slate-300'}`} href={href} target="_blank" rel="noreferrer">
                    <Icon size={16} />{label}
                  </a>
                ))}
              </div>
            </article>
          </aside>

          <form onSubmit={submitForm} className="flex min-h-full flex-col rounded-3xl border border-white/10 bg-white/[.03] p-6 sm:p-8">
            <div>
              <p className="eyebrow"><Send size={14} />Contact form</p>
              <h2 className="font-display text-3xl font-bold text-white">Write a message.</h2>
              <p className="mt-3 text-sm leading-7 text-slate-400">Fields are deliberately simple. A reply email makes follow-up easier.</p>
            </div>
            <input type="hidden" name="_subject" value="New message from Nahid’s QA portfolio" />
            <label className="sr-only" aria-hidden="true">Leave this field empty<input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" /></label>
            <div className="mt-7 grid gap-5">
              <label className="grid gap-2 text-sm font-bold text-slate-200">Name<input required name="name" autoComplete="name" className="rounded-2xl border border-white/10 bg-[#0b0d16]/70 px-4 py-3.5 text-sm font-normal text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10" placeholder="Your name" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-200">Email<input required type="email" name="email" autoComplete="email" className="rounded-2xl border border-white/10 bg-[#0b0d16]/70 px-4 py-3.5 text-sm font-normal text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10" placeholder="you@example.com" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-200">Subject<input required name="subject" className="rounded-2xl border border-white/10 bg-[#0b0d16]/70 px-4 py-3.5 text-sm font-normal text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10" placeholder="What would you like to discuss?" /></label>
              <label className="grid gap-2 text-sm font-bold text-slate-200">Message<textarea required name="message" rows={7} className="resize-y rounded-2xl border border-white/10 bg-[#0b0d16]/70 px-4 py-3.5 text-sm font-normal text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/10" placeholder="Your message" /></label>
            </div>
            <button className="button-primary mt-7 w-full disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto" disabled={sending} aria-busy={sending}>
              {sending ? 'Sending…' : <>Send Message <Send size={16} /></>}
            </button>
            {status && (
              <p aria-live="polite" className={`mt-4 rounded-2xl border px-4 py-3 text-sm leading-6 ${status.tone === 'success' ? 'border-cyan-300/15 bg-cyan-300/[.05] text-cyan-100' : 'border-rose-300/20 bg-rose-300/[.05] text-rose-100'}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </section>
    </>
  )
}

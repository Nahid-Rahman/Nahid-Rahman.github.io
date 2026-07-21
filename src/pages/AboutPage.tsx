import { CheckCircle2, Heart, MapPin, Sparkles } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { usePortfolio } from '../content/PortfolioContext'

export function AboutPage() {
  const { quickFacts, values } = usePortfolio()
  return (
    <>
      <PageHeader eyebrow="About me" title="Quality-minded by profession. Curious by nature." description="I enjoy understanding how a product should work, exploring it from a real user’s perspective, and finding the small gaps that can change a release experience." />
      <section className="container-wide py-12 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch">
          <div className="relative flex">
            <div className="absolute -inset-5 rounded-[2rem] bg-violet-500/15 blur-2xl" />
            <img src="/assets/photos/about-window.webp" loading="lazy" decoding="async" alt="Nahid by a window" className="relative h-full min-h-[520px] w-full rounded-[2rem] border border-white/10 object-cover shadow-soft" />
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">My approach</p>
            <h2 className="section-title">I look for the gap between “it works” and “it is ready.”</h2>
            <div className="mt-6 space-y-5 text-base leading-8 text-slate-300">
              <p>I work across web applications, mobile apps, APIs, and backend systems—combining structured manual testing with practical automation. My goal is simple: help teams catch issues early, make better product decisions, and ship experiences people can trust.</p>
              <p>For me, quality is not only about finding bugs. It is about making products feel smooth, reliable, and ready for the people who use them. That means asking the right questions, keeping evidence clear, and caring about the details that make an experience feel effortless.</p>
              <p>I value a calm, organized way of working: understand the requirement, test the meaningful risks, communicate clearly, and verify the fix without making the process heavier than it needs to be.</p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">{quickFacts.map((fact) => <div key={fact} className="flex min-h-[64px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-sm font-semibold text-slate-200"><MapPin size={16} className="text-cyan-300" />{fact}</div>)}</div>
          </div>
        </div>
      </section>

      <section className="container-wide py-8 sm:py-16">
        <div className="glass-card p-7 sm:p-9"><div className="max-w-3xl"><p className="eyebrow"><Sparkles size={14} />How I like to work</p><h2 className="section-title">Structured without being rigid.</h2><p className="section-copy">I enjoy collaborating with people who care about the product, are open to feedback, and want problems to be visible early rather than expensive later.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{values.map((value) => <div key={value} className="flex gap-3 rounded-2xl border border-white/10 bg-[#0b0d16]/40 p-4 text-sm leading-6 text-slate-300"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-violet-300" />{value}</div>)}</div></div>
      </section>

      <section className="container-wide py-8 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch">
          <article className="rounded-3xl border border-white/10 bg-white/[.03] p-7"><Heart size={22} className="text-amber-300" /><h2 className="mt-5 font-display text-2xl font-bold text-white">A little more personal</h2><p className="mt-4 text-sm leading-7 text-slate-300">Outside work, I am drawn to good stories, nature photography, games, sports, quiet reading time, and everyday moments that carry a little atmosphere. I prefer authenticity over polish-for-the-sake-of-polish.</p></article>
          <article className="rounded-3xl border border-white/10 bg-white/[.03] p-7"><Sparkles size={22} className="text-cyan-300" /><h2 className="mt-5 font-display text-2xl font-bold text-white">What keeps me grounded</h2><p className="mt-4 text-sm leading-7 text-slate-300">Humility, gratitude, accountability, and a willingness to keep improving matter to me. I try to bring the same care to my work, learning, and relationships.</p><p className="mt-4 text-sm leading-7 text-slate-300">I try to stay mindful that my time, effort, and responsibilities are amanah — and that I will be accountable to Allah for how I use them.</p></article>
        </div>
      </section>
    </>
  )
}

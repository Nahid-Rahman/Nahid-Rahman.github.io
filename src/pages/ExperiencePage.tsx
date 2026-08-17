import { ArrowUpRight, BriefcaseBusiness, Building2, CheckCircle2, ExternalLink } from 'lucide-react'
import { PageHeader } from '../components/PageHeader'
import { usePortfolio } from '../content/PortfolioContext'

const neura = {
  company: 'Neura Solutions Limited',
  website: 'https://neura-solutions.vercel.app/',
  logoImage: '/assets/company-logos/neura-mark.jpeg',
  location: 'Dhaka, Bangladesh',
  role: 'Co-Founder & Director',
  summary:
    'I co-founded a software technology venture focused on custom software, ERP solutions, digital products, and long-term product development.',
  contributions: [
    'Contribute to product and business direction, including service delivery and the roadmap for Neura’s own software products.',
    'Support team structure, technical and quality decisions, project oversight, and cross-functional coordination.',
    'Help shape client delivery processes while building the operational foundation for a sustainable product-focused company.',
  ],
  tags: ['Product Strategy', 'Team Leadership', 'Quality Strategy', 'Software Delivery', 'ERP & SaaS'],
}

export function ExperiencePage() {
  const { experiences } = usePortfolio()

  return (
    <>
      <PageHeader
        eyebrow="Experience"
        title="Building quality across products and teams."
        description="I have worked across HR tech, recruitment, edtech, logistics, real-estate investment, and business-management systems, combining hands-on software quality assurance with product thinking, practical automation, and growing leadership responsibilities."
      />

      <section className="container-wide py-12 sm:py-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">
            Professional Experience
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Hands-on quality work across product teams.
          </h2>
        </div>

        <div className="relative max-w-5xl before:absolute before:left-[18px] before:top-5 before:h-[calc(100%-40px)] before:w-px before:bg-gradient-to-b before:from-violet-400/70 before:via-cyan-300/30 before:to-transparent sm:before:left-[26px]">
          <div className="space-y-7">
            {experiences.map((experience, index) => (
              <article key={experience.company} className="relative pl-12 sm:pl-16">
                <span
                  className={`absolute left-0 top-7 grid h-9 w-9 place-items-center rounded-full border border-white/15 ${
                    index === 0
                      ? 'bg-violet-500 text-white shadow-glow'
                      : 'bg-[#151827] text-cyan-200'
                  } sm:h-[53px] sm:w-[53px]`}
                >
                  <BriefcaseBusiness size={18} />
                </span>

                <div className="rounded-3xl border border-white/10 bg-white/[.03] p-6 transition hover:border-white/20 sm:p-7">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-cyan-300/15 bg-white font-display text-xs font-bold text-cyan-100 sm:h-14 sm:w-14">
                        {experience.logoImage ? (
                          <img
                            src={experience.logoImage}
                            alt={`${experience.company} logo`}
                            className="h-full w-full object-contain p-1.5"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          experience.logoText
                        )}
                      </div>

                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-display text-2xl font-bold text-white">
                            {experience.role}
                          </h2>
                          {experience.current && (
                            <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-xs font-bold text-emerald-200">
                              Current
                            </span>
                          )}
                        </div>

                        <p className="mt-2 font-semibold text-violet-200">
                          <a
                            href={experience.website}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 hover:text-cyan-200"
                          >
                            {experience.company} <ExternalLink size={14} />
                          </a>
                          <span className="font-normal text-slate-500">
                            {' '}
                            · {experience.location}
                          </span>
                        </p>
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-semibold text-slate-400">
                      {experience.period}
                    </p>
                  </div>

                  <p className="mt-5 max-w-3xl leading-7 text-slate-300">
                    {experience.summary}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {experience.contributions.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                        <CheckCircle2
                          size={17}
                          className="mt-0.5 shrink-0 text-cyan-300"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {experience.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-wide pb-12 sm:pb-20">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-violet-300">
            Leadership & Venture
          </p>
          <h2 className="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">
            Building beyond my core QA role.
          </h2>
          <p className="mt-3 leading-7 text-slate-300">
            Alongside my professional career, I help build a technology venture where I
            contribute to product direction, team coordination, quality strategy, and key
            business and technical decisions.
          </p>
        </div>

        <div className="max-w-5xl">
          <article className="relative overflow-hidden rounded-3xl border border-violet-300/15 bg-gradient-to-br from-violet-500/[.08] via-white/[.03] to-cyan-400/[.04] p-6 transition hover:border-violet-300/25 sm:p-7">
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex gap-4">
                  <div className="grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-2xl border border-violet-300/20 bg-white sm:h-14 sm:w-14">
                    <img
                      src={neura.logoImage}
                      alt={`${neura.company} logo`}
                      className="h-full w-full object-contain p-1.5"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-display text-2xl font-bold text-white">
                        {neura.role}
                      </h2>
                      <span className="rounded-full bg-violet-400/15 px-2.5 py-1 text-xs font-bold text-violet-200">
                        Leadership
                      </span>
                    </div>

                    <p className="mt-2 font-semibold text-violet-200">
                      <a
                        href={neura.website}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 hover:text-cyan-200"
                      >
                        {neura.company} <ExternalLink size={14} />
                      </a>
                      <span className="font-normal text-slate-500">
                        {' '}
                        · {neura.location}
                      </span>
                    </p>
                  </div>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-xs font-semibold text-slate-300">
                  <Building2 size={14} className="text-cyan-300" />
                  Venture leadership
                </span>
              </div>

              <p className="mt-5 max-w-3xl leading-7 text-slate-300">{neura.summary}</p>

              <ul className="mt-6 space-y-3">
                {neura.contributions.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                    <CheckCircle2
                      size={17}
                      className="mt-0.5 shrink-0 text-violet-300"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {neura.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="container-wide pb-16">
        <div className="rounded-3xl border border-amber-300/15 bg-amber-300/[.04] p-6 sm:p-7">
          <div className="flex gap-4">
            <ArrowUpRight className="mt-1 shrink-0 text-amber-200" size={20} />
            <div>
              <h2 className="font-display text-xl font-bold text-white">
                A note on work samples
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-300">
                I keep client data, internal dashboards, product screenshots, credentials,
                bug records, and confidential documentation private. This page focuses on
                public, high-level responsibilities and outcomes only.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

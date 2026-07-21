import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  description: string
  children?: ReactNode
}

export function PageHeader({ eyebrow, title, description, children }: Props) {
  return (
    <section className="page-hero">
      <div className="container-wide">
        <div className="max-w-3xl animate-fade-up">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">{description}</p>
          {children}
        </div>
      </div>
    </section>
  )
}

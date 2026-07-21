import type { ReactNode } from 'react'

type Props = {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, description, action, align = 'left' }: Props) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-3xl text-center' : 'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between'}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2 className="section-title">{title}</h2>
        {description && <p className={centered ? 'section-copy mx-auto' : 'section-copy'}>{description}</p>}
      </div>
      {action && <div className={centered ? 'mt-6' : 'shrink-0'}>{action}</div>}
    </div>
  )
}

import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface SectionHeadingProps {
  index: string
  kicker: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ index, kicker, title, description, align = 'left' }: SectionHeadingProps) {
  return (
    <Reveal className={`section-head section-head--${align}`}>
      <div className="section-head__meta">
        <span className="section-head__index mono">{index}</span>
        <span className="section-head__rule" />
        <span className="section-head__kicker">{kicker}</span>
      </div>
      <h2 className="section-head__title">{title}</h2>
      {description ? <p className="section-head__description">{description}</p> : null}
    </Reveal>
  )
}

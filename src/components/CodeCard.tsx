import { Fragment, type ReactNode } from 'react'
import { TiltCard } from './TiltCard'

const snippet = `import { useMemo } from 'react'
import { motion } from 'motion/react'

export function Portfolio() {
  const projects = useProjects()

  const featured = useMemo(
    () => projects.filter(p => p.featured),
    [projects],
  )

  return (
    <motion.main layout>
      <Hero name="Imanih" />
      <Projects items={featured} />
      <Contact email="hola@imanih.dev" />
    </motion.main>
  )
}`

const tokenPattern =
  /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`[^`]*`)|\b(import|from|const|export|function|return|new|await|async|if|else|type|interface)\b|\b([A-Z][A-Za-z0-9_]*)\b/g

function tokenize(line: string): ReactNode[] {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  tokenPattern.lastIndex = 0
  while ((match = tokenPattern.exec(line)) !== null) {
    const index = match.index
    if (index > lastIndex) nodes.push(line.slice(lastIndex, index))

    const token = match[0]
    let className = 'tok-punct'
    if (match[1]) className = 'tok-comment'
    else if (match[2]) className = 'tok-string'
    else if (match[3]) className = 'tok-keyword'
    else if (match[4]) className = 'tok-component'

    nodes.push(
      <span key={`${index}-${token}`} className={className}>
        {token}
      </span>,
    )
    lastIndex = index + token.length
  }

  if (lastIndex < line.length) nodes.push(line.slice(lastIndex))
  return nodes
}

export function CodeCard() {
  const lines = snippet.split('\n')

  return (
    <TiltCard className="code-card-wrap" max={6}>
      <div className="code-card">
        <div className="code-card__chrome">
          <span className="code-card__dots" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="code-card__file mono">Portfolio.tsx</span>
          <span className="code-card__version mono">react@19.3</span>
        </div>

        <div className="code-card__body mono" aria-hidden="true">
          {lines.map((line, index) => (
            <div className="code-line" key={index}>
              <span className="code-line__num">{String(index + 1).padStart(2, '0')}</span>
              <span className="code-line__code">
                {line ? tokenize(line).map((node, i) => <Fragment key={i}>{node}</Fragment>) : '\u00A0'}
              </span>
            </div>
          ))}
        </div>

        <div className="code-card__footer">
          <span className="status-dot" />
          <span className="mono">strict mode</span>
          <span className="mono code-card__footer-ok">0 errores</span>
        </div>
      </div>

      <div className="float-card float-card--lighthouse" aria-hidden="true">
        <div className="gauge">
          <span className="gauge__value">99</span>
        </div>
        <div>
          <p className="float-card__title">Lighthouse</p>
          <p className="float-card__meta">performance</p>
        </div>
      </div>

      <div className="float-card float-card--components" aria-hidden="true">
        <span className="float-card__kicker mono">42 componentes</span>
        <span className="float-card__bar">
          <i style={{ width: '86%' }} />
        </span>
        <span className="float-card__meta">design system</span>
      </div>
    </TiltCard>
  )
}

import type { CSSProperties } from 'react'
import type { ProjectVisual as VisualKind } from '../data/portfolio'

interface ProjectVisualProps {
  visual: VisualKind
  gradient: [string, string]
  compact?: boolean
}

export function ProjectVisual({ visual, gradient, compact = false }: ProjectVisualProps) {
  const style = {
    '--c1': gradient[0],
    '--c2': gradient[1],
  } as CSSProperties

  return (
    <div className={`visual visual--${visual} ${compact ? 'visual--compact' : ''}`} style={style} aria-hidden="true">
      <div className="visual__wash" />
      <div className="visual__grid" />

      {visual === 'orbit' ? (
        <div className="visual__orbit">
          <span className="visual__ring visual__ring--1" />
          <span className="visual__ring visual__ring--2" />
          <span className="visual__ring visual__ring--3" />
          <span className="visual__core" />
          <span className="visual__satellite" />
        </div>
      ) : null}

      {visual === 'waves' ? (
        <svg className="visual__waves" viewBox="0 0 400 220" preserveAspectRatio="none">
          <path d="M0 150 C 70 90, 130 200, 210 140 S 330 60, 400 110" />
          <path d="M0 180 C 80 120, 140 220, 220 165 S 340 100, 400 140" />
          <path d="M0 205 C 90 160, 160 240, 240 190 S 350 140, 400 170" />
        </svg>
      ) : null}

      {visual === 'grid' ? (
        <div className="visual__brackets">
          {[0, 1, 2, 3].map((item) => (
            <span key={item} className={`visual__bracket visual__bracket--${item + 1}`} />
          ))}
          <span className="visual__focus" />
        </div>
      ) : null}

      {visual === 'mesh' ? (
        <div className="visual__mesh">
          <span />
          <span />
          <span />
        </div>
      ) : null}

      {visual === 'prism' ? (
        <div className="visual__prism">
          <span className="visual__prism-disc" />
          <svg viewBox="0 0 120 120" className="visual__prism-tri">
            <path d="M60 16 104 96H16Z" />
          </svg>
        </div>
      ) : null}

      {visual === 'terminal' ? (
        <div className="visual__terminal mono">
          <span className="visual__terminal-bar">
            <i />
            <i />
            <i />
          </span>
          <span className="visual__terminal-line">
            <b>~</b> npm run build
          </span>
          <span className="visual__terminal-line visual__terminal-line--ok">✓ 42 componentes</span>
          <span className="visual__terminal-line visual__terminal-line--dim">0 errores · 0 warnings</span>
        </div>
      ) : null}

      <div className="visual__flare" />
      <div className="visual__grain" />
    </div>
  )
}

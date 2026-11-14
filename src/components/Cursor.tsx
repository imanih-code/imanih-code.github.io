import { useEffect, useRef, useState } from 'react'
import { useMediaQuery, usePrefersReducedMotion } from '../hooks'

/**
 * Cursor personalizado: punto + anillo con interpolación.
 * Solo se activa en dispositivos con puntero fino.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const finePointer = useMediaQuery('(pointer: fine)')
  const reducedMotion = usePrefersReducedMotion()
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!finePointer) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let activated = false
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY
    let frame = 0

    const render = () => {
      const ease = reducedMotion ? 1 : 0.18
      ringX += (targetX - ringX) * ease
      ringY += (targetY - ringY) * ease
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`
      frame = requestAnimationFrame(render)
    }

    const onMove = (event: PointerEvent) => {
      if (!activated) {
        activated = true
        document.documentElement.classList.add('has-cursor')
      }
      targetX = event.clientX
      targetY = event.clientY
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) translate(-50%, -50%)`
      setVisible(true)
    }

    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null
      const interactive = target?.closest<HTMLElement>('a, button, [data-cursor], input, textarea, select, label')
      setHovering(Boolean(interactive))
      setLabel(interactive?.dataset.cursorLabel ?? '')
    }

    const onLeave = () => setVisible(false)
    const onDown = () => ring.classList.add('is-pressed')
    const onUp = () => ring.classList.remove('is-pressed')

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerover', onOver, { passive: true })
    window.addEventListener('pointerleave', onLeave)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerover', onOver)
      window.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [finePointer, reducedMotion])

  if (!finePointer) return null

  return (
    <div className={`cursor ${visible ? 'is-visible' : ''}`} aria-hidden="true">
      <div ref={dotRef} className="cursor__dot" />
      <div ref={ringRef} className={`cursor__ring ${hovering ? 'is-hovering' : ''} ${label ? 'is-labeled' : ''}`}>
        <span className="cursor__label">{label}</span>
      </div>
    </div>
  )
}

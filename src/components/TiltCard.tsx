import { useRef, type MouseEvent, type ReactNode } from 'react'
import { usePrefersReducedMotion } from '../hooks'

interface TiltCardProps {
  children: ReactNode
  className?: string
  max?: number
}

/**
 * Inclina el contenido siguiendo el cursor. Los valores se exponen como
 * variables CSS (--rx, --ry, --mx, --my) para que el contenido pueda reaccionar.
 */
export function TiltCard({ children, className = '', max = 7 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const element = ref.current
    if (!element || reducedMotion) return
    const rect = element.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width
    const py = (event.clientY - rect.top) / rect.height
    element.style.setProperty('--rx', `${(0.5 - py) * max * 2}deg`)
    element.style.setProperty('--ry', `${(px - 0.5) * max * 2}deg`)
    element.style.setProperty('--mx', `${px * 100}%`)
    element.style.setProperty('--my', `${py * 100}%`)
  }

  const handleLeave = () => {
    const element = ref.current
    if (!element) return
    element.style.setProperty('--rx', '0deg')
    element.style.setProperty('--ry', '0deg')
    element.style.setProperty('--mx', '50%')
    element.style.setProperty('--my', '50%')
  }

  return (
    <div ref={ref} className={`tilt ${className}`} onMouseMove={handleMove} onMouseLeave={handleLeave}>
      {children}
    </div>
  )
}

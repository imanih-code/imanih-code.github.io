import { useEffect, useState } from 'react'
import { stats } from '../data/portfolio'
import { useInView } from '../hooks'

function useCountUp(target: number, active: boolean, duration = 1500) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setValue(target)
      return
    }

    let frame = 0
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [active, target, duration])

  return value
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.4 })
  const current = useCountUp(value, inView)

  return (
    <div className="stat" ref={ref}>
      <span className="stat__value">
        {current}
        <span className="stat__suffix">{suffix}</span>
      </span>
      <span className="stat__label">{label}</span>
    </div>
  )
}

export function Stats() {
  return (
    <section className="stats" aria-label="Números">
      <div className="container stats__inner">
        {stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  )
}

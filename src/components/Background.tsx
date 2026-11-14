import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../hooks'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

/**
 * Fondo generativo: constelación de partículas en canvas que reacciona al cursor.
 * Se pinta una sola vez si el usuario prefiere movimiento reducido.
 */
export function Background({ theme }: { theme: 'dark' | 'light' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let width = window.innerWidth
    let height = window.innerHeight
    let particles: Particle[] = []
    let frame = 0
    let last = performance.now()
    const mouse = { x: -9999, y: -9999 }

    const computed = getComputedStyle(document.documentElement)
    let particleColor =
      computed.getPropertyValue('--fx-particle').trim() || (theme === 'dark' ? '255, 110, 80' : '200, 60, 40')
    let lineColor = computed.getPropertyValue('--fx-line').trim() || (theme === 'dark' ? '255, 255, 255' : '30, 30, 45')
    const linkDistance = 132

    const refreshColors = () => {
      const styles = getComputedStyle(document.documentElement)
      particleColor = styles.getPropertyValue('--fx-particle').trim() || particleColor
      lineColor = styles.getPropertyValue('--fx-line').trim() || lineColor
    }

    const paint = () => {
      context.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i]
        if (!a) continue
        for (let j = i + 1; j < particles.length; j += 1) {
          const b = particles[j]
          if (!b) continue
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          if (distance > linkDistance) continue
          const alpha = (1 - distance / linkDistance) * 0.22
          context.strokeStyle = `rgba(${lineColor}, ${alpha})`
          context.lineWidth = 0.7
          context.beginPath()
          context.moveTo(a.x, a.y)
          context.lineTo(b.x, b.y)
          context.stroke()
        }
      }

      for (const particle of particles) {
        context.fillStyle = `rgba(${particleColor}, 0.65)`
        context.beginPath()
        context.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2)
        context.fill()
      }
    }

    const resize = () => {
      refreshColors()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(72, Math.max(26, Math.round((width * height) / 28000)))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.6,
      }))

      paint()
    }

    const tick = (now: number) => {
      const delta = Math.min(32, now - last)
      last = now
      const step = delta / 16.667

      for (const particle of particles) {
        const dx = mouse.x - particle.x
        const dy = mouse.y - particle.y
        const distance = Math.hypot(dx, dy)
        if (distance < 170 && distance > 0.001) {
          const force = (1 - distance / 170) * 0.02
          particle.vx += (dx / distance) * force * step
          particle.vy += (dy / distance) * force * step
        }

        particle.vx = Math.max(-0.6, Math.min(0.6, particle.vx * 0.995))
        particle.vy = Math.max(-0.6, Math.min(0.6, particle.vy * 0.995))
        particle.x += particle.vx * step
        particle.y += particle.vy * step

        if (particle.x < -20) particle.x = width + 20
        if (particle.x > width + 20) particle.x = -20
        if (particle.y < -20) particle.y = height + 20
        if (particle.y > height + 20) particle.y = -20
      }

      paint()
      frame = requestAnimationFrame(tick)
    }

    const onPointerMove = (event: PointerEvent) => {
      mouse.x = event.clientX
      mouse.y = event.clientY
    }
    const onPointerLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    // Los efectos de los hijos corren antes que los del padre: repintamos con
    // los tokens del tema nuevo en el siguiente tick.
    const refresh = window.setTimeout(() => {
      refreshColors()
      paint()
    }, 0)
    if (!reducedMotion) {
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
      frame = requestAnimationFrame(tick)
    }

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(refresh)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [reducedMotion, theme])

  return (
    <div className="backdrop" aria-hidden="true">
      <canvas ref={canvasRef} className="backdrop__canvas" />
      <div className="backdrop__glow backdrop__glow--one" />
      <div className="backdrop__glow backdrop__glow--two" />
      <div className="backdrop__grid" />
      <div className="backdrop__noise" />
    </div>
  )
}

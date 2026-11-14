import { ArrowUpRight, MapPin } from 'lucide-react'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { profile, terminalScript } from '../data/portfolio'
import { useInView, usePrefersReducedMotion } from '../hooks'
import { GithubIcon } from './BrandIcons'
import { Reveal } from './Reveal'
import { SectionHeading } from './SectionHeading'

const OUTPUT_TICKS = 6

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.25 })
  const reducedMotion = usePrefersReducedMotion()
  const [ticks, setTicks] = useState(0)

  const totalTicks = useMemo(
    () =>
      terminalScript.reduce(
        (total, item) => total + (item.type === 'cmd' ? item.text.length : OUTPUT_TICKS),
        0,
      ) + 6,
    [],
  )

  useEffect(() => {
    if (!inView) return
    if (reducedMotion) {
      setTicks(totalTicks)
      return
    }
    if (ticks >= totalTicks) return
    const timeout = window.setTimeout(() => setTicks((current) => current + 1), 16)
    return () => window.clearTimeout(timeout)
  }, [inView, reducedMotion, ticks, totalTicks])

  const lines = useMemo(() => {
    let remaining = ticks
    const output: ReactNode[] = []

    terminalScript.forEach((item, index) => {
      if (remaining <= 0) return

      if (item.type === 'cmd') {
        const visible = Math.max(0, Math.min(item.text.length, remaining))
        remaining -= item.text.length
        output.push(
          <div className="term__line term__line--cmd" key={index}>
            <span className="term__prompt">➜ ~</span>
            <span>{item.text.slice(0, visible)}</span>
            {visible < item.text.length ? <span className="caret" /> : null}
          </div>,
        )
      } else {
        remaining -= OUTPUT_TICKS
        output.push(
          <div className="term__line term__line--out" key={index}>
            {item.text}
          </div>,
        )
      }
    })

    return output
  }, [ticks])

  return (
    <section className="section about" id="sobre-mi" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading
          index="04"
          kicker="Sobre mí"
          title={<span id="about-title">Hola, soy Imanih.</span>}
          description="Llevo media década convirtiendo ideas en interfaces. Esto es lo que pasa cuando abro una terminal."
        />

        <div className="about__grid">
          <Reveal className="about__terminal-wrap">
            <div className="term" ref={ref}>
              <div className="term__bar">
                <span className="term__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="term__title mono">imanih@portfolio — zsh</span>
                <span className="term__status mono">● online</span>
              </div>
              <div className="term__body mono" role="log" aria-label="Presentación en formato terminal">
                {lines}
                {ticks >= totalTicks ? (
                  <div className="term__line term__line--cmd">
                    <span className="term__prompt">➜ ~</span>
                    <span className="caret" />
                  </div>
                ) : null}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="about__side">
            <div className="profile-card">
              <div className="profile-card__avatar" aria-hidden="true">
                <span className="profile-card__ring" />
                <span className="profile-card__initials">I</span>
              </div>
              <div>
                <h3 className="profile-card__name">{profile.name}</h3>
                <p className="profile-card__role">{profile.role}</p>
                <p className="profile-card__location mono">
                  <MapPin size={13} /> {profile.location}
                </p>
              </div>
              <span className="badge badge--small">
                <span className="status-dot" />
                {profile.availability}
              </span>
            </div>

            <dl className="about__facts">
              <div>
                <dt>Ahora</dt>
                <dd>Construyendo interfaces de datos en tiempo real</dd>
              </div>
              <div>
                <dt>Aprendiendo</dt>
                <dd>React Server Components y render en el edge</dd>
              </div>
              <div>
                <dt>Idiomas</dt>
                <dd>Español nativo · Inglés profesional</dd>
              </div>
              <div>
                <dt>Fuera del código</dt>
                <dd>Café de origen, fotografía analógica y bici</dd>
              </div>
            </dl>

            <div className="about__actions">
              <a className="btn btn--primary" href={`mailto:${profile.email}`}>
                Hablemos
                <ArrowUpRight size={17} />
              </a>
              <a className="btn btn--ghost" href={profile.github} target="_blank" rel="noreferrer">
                <GithubIcon size={17} />
                GitHub
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

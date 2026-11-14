import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MapPin } from 'lucide-react'
import { profile } from '../data/portfolio'
import { useTypewriter } from '../hooks'
import { CodeCard } from './CodeCard'

export function Hero() {
  const typed = useTypewriter(profile.roles)

  const lineVariants = {
    hidden: { y: '110%' },
    show: (custom: number) => ({
      y: '0%',
      transition: { duration: 0.9, delay: 0.12 + custom * 0.1, ease: [0.22, 1, 0.36, 1] as const },
    }),
  }

  return (
    <section className="hero" id="inicio" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.span
            className="badge"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            <span className="status-dot" />
            {profile.availability}
          </motion.span>

          <h1 className="hero__title" id="hero-title">
            <span className="hero__line">
              <motion.span variants={lineVariants} custom={0} initial="hidden" animate="show">
                Interfaces
              </motion.span>
            </span>
            <span className="hero__line">
              <motion.span variants={lineVariants} custom={1} initial="hidden" animate="show">
                que <em>piensan</em>
              </motion.span>
            </span>
            <span className="hero__line">
              <motion.span variants={lineVariants} custom={2} initial="hidden" animate="show">
                contigo.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="hero__lead"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            Soy <strong>{profile.name}</strong>, frontend engineer especializado en <strong>React</strong>. Diseño
            y construyo producto donde la performance, la accesibilidad y el movimiento se sienten en cada detalle.
          </motion.p>

          <motion.div
            className="hero__typing mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            aria-live="off"
          >
            <span className="hero__prompt">~/</span>
            <span>{typed}</span>
            <span className="caret" aria-hidden="true" />
          </motion.div>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62 }}
          >
            <a className="btn btn--primary" href="#proyectos">
              Ver proyectos
              <ArrowUpRight size={18} />
            </a>
            <a className="btn btn--ghost" href="#contacto">
              Hablemos
            </a>
          </motion.div>

          <motion.ul
            className="hero__facts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.72 }}
          >
            <li>
              <MapPin size={14} /> {profile.location}
            </li>
            <li>{profile.focus}</li>
            <li className="hero__facts-live">
              <span className="status-dot" /> abierto a remoto
            </li>
          </motion.ul>
        </div>

        <div className="hero__visual">
          <CodeCard />
        </div>
      </div>

      <a className="scroll-cue" href="#proyectos" aria-label="Bajar a proyectos">
        <span className="mono">scroll</span>
        <ArrowDown size={15} />
      </a>
    </section>
  )
}

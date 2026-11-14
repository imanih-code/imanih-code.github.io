import { AnimatePresence, motion } from 'framer-motion'
import { Check, Mail, X } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { profile } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { useLockBodyScroll } from '../hooks'
import { GithubIcon } from './BrandIcons'
import { ProjectVisual } from './ProjectVisual'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

const categoryLabels: Record<Project['category'], string> = {
  producto: 'Producto',
  lab: 'UI Lab',
  'open-source': 'Open Source',
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  useLockBodyScroll(Boolean(project))

  useEffect(() => {
    if (!project) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    closeRef.current?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }
      if (event.key !== 'Tab' || !panelRef.current) return

      const focusable = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.offsetParent !== null)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [project, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {project ? (
        <div className="modal" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
          <motion.div
            className="modal__backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />
          <motion.div
            ref={panelRef}
            className="modal__panel"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <button
              ref={closeRef}
              type="button"
              className="modal__close"
              onClick={onClose}
              aria-label="Cerrar caso de estudio"
            >
              <X size={18} />
            </button>

            <ProjectVisual visual={project.visual} gradient={project.gradient} compact />

            <div className="modal__content">
              <div className="modal__meta mono">
                <span>{project.year}</span>
                <span>{categoryLabels[project.category]}</span>
                <span>{project.role}</span>
              </div>

              <h2 className="modal__title" id="project-modal-title">
                {project.title}
              </h2>
              <p className="modal__tagline">{project.tagline}</p>
              <p className="modal__description">{project.description}</p>

              <h3 className="modal__subtitle">Qué construí</h3>
              <ul className="modal__highlights">
                {project.highlights.map((highlight) => (
                  <li key={highlight}>
                    <Check size={15} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <h3 className="modal__subtitle">Stack</h3>
              <ul className="modal__tags">
                {project.tags.map((tag) => (
                  <li key={tag} className="chip">
                    {tag}
                  </li>
                ))}
              </ul>

              <div className="modal__actions">
                {project.code ? (
                  <a className="btn btn--ghost" href={project.code} target="_blank" rel="noreferrer">
                    <GithubIcon size={17} />
                    Ver código
                  </a>
                ) : null}
                <a
                  className="btn btn--primary"
                  href={`mailto:${profile.email}?subject=${encodeURIComponent(`Hablemos de ${project.title}`)}`}
                >
                  <Mail size={17} />
                  Hablemos de {project.title}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

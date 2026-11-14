import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '../data/portfolio'
import { ProjectVisual } from './ProjectVisual'
import { TiltCard } from './TiltCard'

const categoryLabels: Record<Project['category'], string> = {
  producto: 'Producto',
  lab: 'UI Lab',
  'open-source': 'Open Source',
}

interface ProjectCardProps {
  project: Project
  index: number
  onSelect: (project: Project) => void
}

export function ProjectCard({ project, index, onSelect }: ProjectCardProps) {
  return (
    <motion.article
      layout
      className={`project-card ${project.featured ? 'project-card--featured' : ''}`}
      initial={{ opacity: 0, y: 26, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: 'easeOut' }}
    >
      <TiltCard className="project-card__tilt">
        <button
          type="button"
          className="project-card__button"
          onClick={() => onSelect(project)}
          data-cursor
          data-cursor-label="Ver caso"
          aria-label={`Abrir caso de estudio: ${project.title}`}
        >
          <ProjectVisual visual={project.visual} gradient={project.gradient} />

          <div className="project-card__body">
            <div className="project-card__meta">
              <span className="mono">{project.year}</span>
              <span className="project-card__cat mono">{categoryLabels[project.category]}</span>
            </div>

            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__tagline">{project.tagline}</p>

            <ul className="project-card__tags">
              {project.tags.slice(0, 4).map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <span className="project-card__cta">
              Ver caso de estudio
              <ArrowUpRight size={16} />
            </span>
          </div>
        </button>
      </TiltCard>
    </motion.article>
  )
}

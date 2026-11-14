import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { categories, profile, projects } from '../data/portfolio'
import type { Project, ProjectCategory } from '../data/portfolio'
import { ProjectCard } from './ProjectCard'
import { SectionHeading } from './SectionHeading'

type Filter = 'todos' | ProjectCategory

interface ProjectsProps {
  onOpenProject: (project: Project) => void
}

export function Projects({ onOpenProject }: ProjectsProps) {
  const [filter, setFilter] = useState<Filter>('todos')

  const visible = useMemo(
    () => (filter === 'todos' ? projects : projects.filter((project) => project.category === filter)),
    [filter],
  )

  return (
    <section className="section projects" id="proyectos" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading
          index="01"
          kicker="Proyectos seleccionados"
          title={
            <span id="projects-title">
              Trabajo que <em>se siente</em>.
            </span>
          }
          description="Productos reales donde el estado, el rendimiento y el detalle visual importan. Toca cualquier tarjeta para ver qué hay debajo."
        />

        <div className="projects__toolbar">
          <div className="filters" role="group" aria-label="Filtrar proyectos por categoría">
            {categories.map((category) => {
              const count =
                category.id === 'todos'
                  ? projects.length
                  : projects.filter((project) => project.category === category.id).length
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`filter ${filter === category.id ? 'is-active' : ''}`}
                  onClick={() => setFilter(category.id)}
                  aria-pressed={filter === category.id}
                >
                  {category.label}
                  <span className="filter__count">{count}</span>
                </button>
              )
            })}
          </div>

          <a className="projects__github" href={profile.github} target="_blank" rel="noreferrer">
            Más en GitHub
            <ArrowUpRight size={15} />
          </a>
        </div>

        <motion.div layout className="projects__grid">
          <AnimatePresence mode="popLayout">
            {visible.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} onSelect={onOpenProject} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

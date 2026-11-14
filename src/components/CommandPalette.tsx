import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  Check,
  Copy,
  FlaskConical,
  FolderGit2,
  Home,
  Layers,
  Mail,
  Moon,
  Search,
  Sun,
  User,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { navLinks, profile, projects } from '../data/portfolio'
import type { Project } from '../data/portfolio'
import { useCopyToClipboard, useLockBodyScroll } from '../hooks'
import type { Theme } from '../types'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

type Group = 'Navegación' | 'Acciones' | 'Proyectos'

interface PaletteCommand {
  id: string
  label: string
  group: Group
  hint?: string
  keywords?: string
  icon: ReactNode
  run: () => void
}

interface CommandPaletteProps {
  open: boolean
  theme: Theme
  onClose: () => void
  onToggleTheme: () => void
  onOpenProject: (project: Project) => void
}

const sectionIcons: Record<string, ReactNode> = {
  inicio: <Home size={16} />,
  proyectos: <FolderGit2 size={16} />,
  playground: <FlaskConical size={16} />,
  stack: <Layers size={16} />,
  'sobre-mi': <User size={16} />,
  contacto: <Mail size={16} />,
}

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

export function CommandPalette({ open, theme, onClose, onToggleTheme, onOpenProject }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { copied, copy } = useCopyToClipboard()

  useLockBodyScroll(open)

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const commands = useMemo<PaletteCommand[]>(() => {
    const nav: PaletteCommand[] = navLinks.map((link) => ({
      id: `nav-${link.id}`,
      label: link.label,
      group: 'Navegación',
      hint: `#${link.id}`,
      icon: sectionIcons[link.id] ?? <ArrowRight size={16} />,
      keywords: link.label,
      run: () => goTo(link.id),
    }))

    const actions: PaletteCommand[] = [
      {
        id: 'action-theme',
        label: theme === 'dark' ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro',
        group: 'Acciones',
        hint: 'Tema',
        keywords: 'theme dark light apariencia',
        icon: theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />,
        run: onToggleTheme,
      },
      {
        id: 'action-copy-email',
        label: copied ? 'Email copiado' : 'Copiar mi email',
        group: 'Acciones',
        hint: profile.email,
        keywords: 'mail correo contacto copiar',
        icon: copied ? <Check size={16} /> : <Copy size={16} />,
        run: () => {
          void copy(profile.email)
        },
      },
      {
        id: 'action-github',
        label: 'Abrir GitHub',
        group: 'Acciones',
        hint: '@' + profile.handle,
        keywords: 'github codigo repos',
        icon: <GithubIcon size={16} />,
        run: () => window.open(profile.github, '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'action-linkedin',
        label: 'Abrir LinkedIn',
        group: 'Acciones',
        hint: 'Perfil profesional',
        keywords: 'linkedin trabajo',
        icon: <LinkedinIcon size={16} />,
        run: () => window.open(profile.linkedin, '_blank', 'noopener,noreferrer'),
      },
    ]

    const projectCommands: PaletteCommand[] = projects.map((project) => ({
      id: `project-${project.slug}`,
      label: project.title,
      group: 'Proyectos',
      hint: project.year,
      keywords: [project.tagline, ...project.tags].join(' '),
      icon: <FolderGit2 size={16} />,
      run: () => onOpenProject(project),
    }))

    return [...nav, ...actions, ...projectCommands]
  }, [copied, copy, onOpenProject, onToggleTheme, theme])

  const filtered = useMemo(() => {
    const term = normalize(query.trim())
    if (!term) return commands
    return commands.filter((command) => normalize(`${command.label} ${command.group} ${command.keywords ?? ''}`).includes(term))
  }, [commands, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    setQuery('')
    setActiveIndex(0)
    const raf = requestAnimationFrame(() => inputRef.current?.focus())
    return () => {
      cancelAnimationFrame(raf)
      previouslyFocused?.focus?.()
    }
  }, [open])

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`)
      ?.scrollIntoView({ block: 'nearest' })
  }, [activeIndex, filtered.length])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const execute = (command: PaletteCommand | undefined) => {
    if (!command) return
    command.run()
    onClose()
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((index) => (filtered.length === 0 ? 0 : (index + 1) % filtered.length))
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((index) => (filtered.length === 0 ? 0 : (index - 1 + filtered.length) % filtered.length))
    } else if (event.key === 'Enter') {
      event.preventDefault()
      execute(filtered[activeIndex])
    }
  }

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {open ? (
        <div className="palette" role="dialog" aria-modal="true" aria-label="Menú de comandos">
          <motion.div
            className="palette__backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="palette__panel"
            initial={{ opacity: 0, y: -14, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <div className="palette__search">
              <Search size={18} />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={onKeyDown}
                placeholder="Busca una sección, un proyecto o una acción…"
                aria-label="Buscar comandos"
                role="combobox"
                aria-expanded="true"
                aria-controls="palette-list"
                aria-autocomplete="list"
                aria-activedescendant={filtered[activeIndex] ? `palette-option-${filtered[activeIndex].id}` : undefined}
                spellCheck={false}
                autoComplete="off"
              />
              <button type="button" className="palette__esc" onClick={onClose} aria-label="Cerrar menú de comandos">
                esc
              </button>
            </div>

            <div className="palette__list" id="palette-list" role="listbox" ref={listRef}>
              {filtered.length === 0 ? (
                <p className="palette__empty">Sin resultados para «{query}».</p>
              ) : (
                filtered.map((command, index) => {
                  const showGroup = index === 0 || filtered[index - 1]?.group !== command.group
                  return (
                    <div key={command.id}>
                      {showGroup ? <p className="palette__group">{command.group}</p> : null}
                      <button
                        type="button"
                        id={`palette-option-${command.id}`}
                        data-index={index}
                        role="option"
                        aria-selected={index === activeIndex}
                        className={`palette__item ${index === activeIndex ? 'is-active' : ''}`}
                        onMouseEnter={() => setActiveIndex(index)}
                        onClick={() => execute(command)}
                      >
                        <span className="palette__icon">{command.icon}</span>
                        <span className="palette__label">{command.label}</span>
                        {command.hint ? <span className="palette__hint">{command.hint}</span> : null}
                        <ArrowRight size={14} className="palette__arrow" />
                      </button>
                    </div>
                  )
                })
              )}
            </div>

            <div className="palette__footer">
              <span>
                <kbd>↑</kbd>
                <kbd>↓</kbd> navegar
              </span>
              <span>
                <kbd>↵</kbd> abrir
              </span>
              <span>
                <kbd>esc</kbd> cerrar
              </span>
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  )
}

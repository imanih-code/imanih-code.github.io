import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { Menu, Moon, Search, Sun, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { navLinks, profile } from '../data/portfolio'
import { useActiveSection, useLockBodyScroll, useMediaQuery } from '../hooks'
import type { Theme } from '../types'

const sectionIds = navLinks.map((link) => link.id)

interface NavProps {
  theme: Theme
  onToggleTheme: () => void
  onOpenPalette: () => void
}

export function Nav({ theme, onToggleTheme, onOpenPalette }: NavProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = useActiveSection(sectionIds)
  const { scrollYProgress } = useScroll()
  const links = useMemo(() => navLinks, [])
  const isDesktop = useMediaQuery('(min-width: 901px)')

  useLockBodyScroll(menuOpen)

  useEffect(() => {
    if (isDesktop) setMenuOpen(false)
  }, [isDesktop])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''}`}>
      <motion.div className="nav__progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <div className="container nav__inner">
        <a className="brand" href="#inicio" aria-label="Imanih — ir al inicio">
          <span className="brand__mark" aria-hidden="true">
            i
          </span>
          <span className="brand__text">
            imanih<span className="brand__accent">.dev</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Navegación principal">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={active === link.id ? 'is-active' : undefined}
              aria-current={active === link.id ? 'true' : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <button className="nav__search" type="button" onClick={onOpenPalette} aria-label="Abrir menú de comandos">
            <Search size={15} strokeWidth={2} />
            <span>Buscar</span>
            <kbd>⌘K</kbd>
          </button>
          <button
            className="icon-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Activar tema claro' : 'Activar tema oscuro'}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            className="icon-btn nav__burger"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <nav className="mobile-menu__links" aria-label="Navegación móvil">
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.045, duration: 0.35 }}
                >
                  <span className="mono">0{index + 1}</span>
                  {link.label}
                </motion.a>
              ))}
            </nav>
            <div className="mobile-menu__footer">
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

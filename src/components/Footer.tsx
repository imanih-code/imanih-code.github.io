import { ArrowUp, Mail } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'
import { GithubIcon, LinkedinIcon } from './BrandIcons'

export function Footer() {
  const backToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <a className="brand" href="#inicio">
              <span className="brand__mark" aria-hidden="true">
                i
              </span>
              <span className="brand__text">
                imanih<span className="brand__accent">.dev</span>
              </span>
            </a>
            <p>Interfaces que piensan contigo. React, TypeScript y detalle obsesivo.</p>
            <div className="footer__socials">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubIcon size={17} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedinIcon size={17} />
              </a>
              <a href={`mailto:${profile.email}`} aria-label="Email">
                <Mail size={17} />
              </a>
            </div>
          </div>

          <nav className="footer__nav" aria-label="Enlaces del pie">
            {navLinks.map((link) => (
              <a key={link.id} href={`#${link.id}`}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="mono">
            © {new Date().getFullYear()} {profile.name} · construido con React 19 + TypeScript + Vite
          </p>
          <button type="button" className="footer__top-btn" onClick={backToTop}>
            Volver arriba
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  )
}

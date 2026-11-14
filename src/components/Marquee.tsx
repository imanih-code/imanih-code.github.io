import { techMarquee } from '../data/portfolio'

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__fade marquee__fade--left" />
      <div className="marquee__fade marquee__fade--right" />
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <div className="marquee__group" key={copy}>
            {techMarquee.map((tech) => (
              <span className="marquee__item" key={`${copy}-${tech}`}>
                {tech}
                <span className="marquee__star">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

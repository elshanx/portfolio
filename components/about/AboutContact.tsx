import { LinkRow } from '@/components/link-row/LinkRow'
import { site } from '@/content/site'
import styles from './AboutContact.module.css'

const arrow = (display: string, external: boolean): string => `${display} ${external ? '↗' : '↓'}`

export function AboutContact() {
  return (
    <section className={styles.section} aria-label="About and contact">
      <div className={styles.column}>
        <h2 id="about" className={`mono-label ${styles.label}`}>
          About
        </h2>
        {site.about.map((paragraph) => (
          <p key={paragraph} className={styles.body}>
            {paragraph}
          </p>
        ))}
      </div>
      <div className={styles.column}>
        <h2 id="contact" className={`mono-label ${styles.label}`}>
          Contact
        </h2>
        <p className={styles.big}>
          Let’s build
          <br />
          something.
        </p>
        <div className={styles.links}>
          {site.links.map((link) => (
            <LinkRow key={link.label} link={{ ...link, display: arrow(link.display, true) }} />
          ))}
          <LinkRow link={{ label: 'CV', href: '/cv', display: arrow('One page', false) }} />
        </div>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import { PrintButton } from '@/components/cv/PrintButton'
import { LinkRow } from '@/components/link-row/LinkRow'
import { projects } from '@/content/projects'
import { site } from '@/content/site'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'CV',
  description: `${site.fullName} — ${site.role} in ${site.location}. Experience, selected projects and skills.`,
}

const experience: { period: string; title: string; detail?: string }[] = [
  { period: '2023 — now', title: `${site.employerRole}, ${site.employer}` },
  { period: '2026 — now', title: 'Freelance, dayaq', detail: 'Built and run a trilingual marketing site and admin for a home-care service.' },
]

const skills: string[] = [...new Set(projects.flatMap(({ stack }) => stack))]

export default function Cv() {
  return (
    <main id="main" className={styles.page}>
      <div className={`no-print ${styles.actions}`}>
        <a href="/cv.pdf" download className={`mono-label ${styles.button}`}>
          Download PDF
        </a>
        <PrintButton className={`mono-label ${styles.button} ${styles.outline}`} />
      </div>
      <header className={styles.header}>
        <h1 className={styles.name}>{site.fullName}</h1>
        <p className={styles.role}>
          {site.role} · {site.location}
        </p>
      </header>
      <section className={styles.section} aria-labelledby="cv-contact">
        <h2 id="cv-contact" className="mono-label">
          Contact
        </h2>
        <div>
          {site.links.map((link) => (
            <LinkRow key={link.label} link={link} />
          ))}
        </div>
      </section>
      <section className={styles.section} aria-labelledby="cv-experience">
        <h2 id="cv-experience" className="mono-label">
          Experience
        </h2>
        <ul className={styles.list}>
          {experience.map(({ period, title, detail }) => (
            <li key={title} className={styles.item}>
              <p className={`mono-label ${styles.muted}`}>{period}</p>
              <div>
                <h3 className={styles.itemTitle}>{title}</h3>
                {detail && <p className={styles.muted}>{detail}</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section} aria-labelledby="cv-projects">
        <h2 id="cv-projects" className="mono-label">
          Selected projects
        </h2>
        <ul className={styles.list}>
          {projects.map(({ slug, title, period, summary, stack }) => (
            <li key={slug} className={styles.item}>
              <p className={`mono-label ${styles.muted}`}>{period}</p>
              <div>
                <h3 className={styles.itemTitle}>{title}</h3>
                <p className={styles.muted}>{summary}</p>
                <p className="mono-label">{stack.join(' · ')}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <section className={styles.section} aria-labelledby="cv-skills">
        <h2 id="cv-skills" className="mono-label">
          Skills
        </h2>
        <p>{skills.join(' · ')}</p>
      </section>
    </main>
  )
}

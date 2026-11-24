import Link from 'next/link'
import type { ReactNode } from 'react'
import { site } from '@/content/site'
import { LocalTime } from './LocalTime'
import styles from './Hero.module.css'

const cells: { label: string; value: ReactNode }[] = [
  {
    label: 'Local time',
    value: (
      <span>
        <LocalTime timeZone={site.timeZone} /> · Baku, {site.utcOffsetLabel}
      </span>
    ),
  },
  {
    label: 'Status',
    value: (
      <>
        <span className={styles.dot} aria-hidden="true" />
        {site.availability}
      </>
    ),
  },
  { label: 'Now', value: `Front-end at ${site.employer}` },
  {
    label: 'Get in touch',
    value: (
      <>
        <a href={`mailto:${site.email}`}>Email ↗</a>
        <Link href="/cv">CV ↗</Link>
      </>
    ),
  },
]

export function StatusStrip() {
  return (
    <dl className={styles.strip}>
      {cells.map(({ label, value }) => (
        <div key={label} className={styles.cell}>
          <dt className="mono-label">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

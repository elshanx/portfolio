import Link from 'next/link'
import { Badge } from '@/components/badge/Badge'
import { filterLabel } from '@/lib/timeline'
import type { TimelineEntry } from '@/lib/types'
import styles from './Timeline.module.css'

export function TimelineRow({ entry }: { entry: TimelineEntry }) {
  const { period, title, description, tags, inProgress, href } = entry
  return (
    <li className={`reveal ${styles.row}`} data-timeline-entry="">
      <p className={`mono-label ${styles.period}`}>{period}</p>
      <div className={styles.body}>
        <h3 className={styles.title}>{href ? <Link href={href}>{title}</Link> : title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.meta}>
        <p className="mono-label">{tags.map(filterLabel).join(' · ')}</p>
        {inProgress && <Badge>In progress</Badge>}
      </div>
    </li>
  )
}

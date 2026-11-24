import Link from 'next/link'
import { Badge } from '@/components/badge/Badge'
import type { Project } from '@/lib/types'
import { ProjectMedia } from './ProjectMedia'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  const { slug, index, title, period, summary, stack, inProgress, media } = project
  return (
    <Link href={`/work/${slug}`} className={`reveal ${styles.card}`}>
      <ProjectMedia media={media} />
      <div className={styles.titleRow}>
        <span className={`mono-label ${styles.muted}`}>{index}</span>
        <h3 className={styles.title}>{title}</h3>
        {inProgress && <Badge>In progress</Badge>}
        <span className={`mono-label ${styles.muted} ${styles.period}`}>{period}</span>
      </div>
      <p className={styles.summary}>{summary}</p>
      <p className="mono-label">{stack.join(' · ')}</p>
    </Link>
  )
}

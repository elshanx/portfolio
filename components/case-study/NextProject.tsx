import Link from 'next/link'
import type { Project } from '@/lib/types'
import styles from './CaseStudy.module.css'

export function NextProject({ project }: { project: Project }) {
  return (
    <Link href={`/work/${project.slug}`} className={styles.next}>
      <span className={`mono-label ${styles.muted}`}>Next project</span>
      <span className={styles.nextTitle}>{project.title} →</span>
    </Link>
  )
}

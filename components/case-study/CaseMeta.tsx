import type { Project } from '@/lib/types'
import styles from './CaseStudy.module.css'

export function CaseMeta({ project }: { project: Project }) {
  const rows: [string, string][] = [
    ['Role', project.role],
    ['Period', project.period],
    ['Stack', project.stack.join(' · ')],
    ['Status', project.inProgress ? 'In progress' : 'Live'],
  ]
  return (
    <dl className={styles.meta}>
      {rows.map(([label, value]) => (
        <div key={label} className={styles.metaCell}>
          <dt className="mono-label">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  )
}

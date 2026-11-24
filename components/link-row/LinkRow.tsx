import type { ExternalLink } from '@/lib/types'
import styles from './LinkRow.module.css'

export function LinkRow({ link }: { link: ExternalLink }) {
  const { label, href, display } = link
  const external = href.startsWith('http')
  return (
    <a className={styles.row} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      <span>{label}</span>
      <span className={styles.display}>{display}</span>
    </a>
  )
}

import type { ReactNode } from 'react'
import styles from './Badge.module.css'

export function Badge({ children }: { children: ReactNode }) {
  return <span className={`mono-label ${styles.badge}`}>{children}</span>
}

import Link from 'next/link'
import styles from '@/components/case-study/CaseStudy.module.css'

export default function NotFound() {
  return (
    <main id="main" className={styles.page}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.summary}>This page does not exist.</p>
      <p>
        <Link href="/" className={`mono-label ${styles.linkButton}`}>
          Back home
        </Link>
      </p>
    </main>
  )
}

import { site } from '@/content/site'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`mono-label ${styles.meta}`}>
        <p>© 2026 {site.name}</p>
        <p className={styles.built}>Built with Next.js · Hosted on Vercel</p>
        <a href="#main">Back to top ↑</a>
      </div>
      <p className={styles.wordmark} aria-hidden="true">
        elshan®
      </p>
    </footer>
  )
}

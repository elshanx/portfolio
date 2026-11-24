import Link from 'next/link'
import { site } from '@/content/site'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
import { Menu } from './Menu'
import styles from './Nav.module.css'

export function Nav() {
  return (
    <header className={styles.nav}>
      <Link href="/" className={styles.logo} aria-label={`${site.name}, home`}>
        elshan®
      </Link>
      <p className={`mono-label ${styles.role}`}>
        {site.role} — {site.location}
      </p>
      <div className={styles.actions}>
        <ThemeToggle />
        <Menu />
      </div>
    </header>
  )
}

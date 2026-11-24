'use client'

import Link from 'next/link'
import styles from './Menu.module.css'

const MENU_ID = 'site-menu'

const items: { label: string; href: string }[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
  { label: 'CV', href: '/cv' },
]

function closeMenu(): void {
  document.getElementById(MENU_ID)?.hidePopover()
}

export function Menu() {
  return (
    <>
      <button type="button" className={`mono-label ${styles.pill}`} popoverTarget={MENU_ID}>
        Menu
      </button>
      <nav id={MENU_ID} popover="auto" aria-label="Site" className={styles.panel}>
        <button type="button" className={`mono-label ${styles.pill} ${styles.close}`} popoverTarget={MENU_ID} popoverTargetAction="hide">
          Close
        </button>
        <ul className={styles.list}>
          {items.map(({ label, href }) => (
            <li key={href}>
              <Link href={href} className={styles.link} onClick={closeMenu}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

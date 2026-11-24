'use client'

import { useSyncExternalStore } from 'react'
import { THEME_STORAGE_KEY } from './theme-script'
import styles from './ThemeToggle.module.css'

type Theme = 'light' | 'dark'

const DARK_QUERY = '(prefers-color-scheme: dark)'

function currentTheme(): Theme {
  const stored = document.documentElement.dataset.theme
  if (stored === 'light' || stored === 'dark') return stored
  return matchMedia(DARK_QUERY).matches ? 'dark' : 'light'
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
  const query = matchMedia(DARK_QUERY)
  query.addEventListener('change', onChange)
  return () => {
    observer.disconnect()
    query.removeEventListener('change', onChange)
  }
}

export function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, currentTheme, () => 'light')

  const toggle = (): void => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next)
    } catch {}
  }

  return (
    <button type="button" className={styles.toggle} onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <circle cx="9" cy="9" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 1a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </button>
  )
}

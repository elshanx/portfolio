import { site } from '@/content/site'
import { StatusStrip } from './StatusStrip'
import styles from './Hero.module.css'

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-name">
      <div className={styles.nameBox}>
        <h1 id="hero-name" className={styles.name}>
          {site.name}
        </h1>
      </div>
      <div className={styles.introRow}>
        <p className={styles.intro}>
          Front-end engineer in Baku. I build fast, accessible web products — by day at {site.employer}, after hours for clients and for myself.
        </p>
        <p className={`mono-label ${styles.hint}`} aria-hidden="true">
          Scroll ↓
        </p>
      </div>
      <StatusStrip />
    </section>
  )
}

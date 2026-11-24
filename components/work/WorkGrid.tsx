import { Marquee } from '@/components/marquee/Marquee'
import { projects } from '@/content/projects'
import { ProjectCard } from './ProjectCard'
import styles from './WorkGrid.module.css'

export function WorkGrid() {
  const [first, second, third] = projects
  return (
    <section id="work" aria-labelledby="work-heading">
      <Marquee text="Selected work" id="work-heading" />
      <div className={styles.grid}>
        <div className={styles.column}>
          <div className={styles.first}>
            <ProjectCard project={first} />
          </div>
          <div className={styles.third}>
            <ProjectCard project={third} />
          </div>
        </div>
        <div className={`${styles.column} ${styles.offset}`}>
          <div className={styles.second}>
            <ProjectCard project={second} />
          </div>
          <div className={`reveal ${styles.note} ${styles.last}`}>
            <p className={`mono-label ${styles.noteLabel}`}>More in the timeline</p>
            <p className={styles.noteBody}>Smaller tools, experiments and work in progress live in the timeline below.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

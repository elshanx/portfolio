import { Marquee } from '@/components/marquee/Marquee'
import { projects } from '@/content/projects'
import { ProjectCard } from './ProjectCard'
import styles from './WorkGrid.module.css'

const slots: string[] = [styles.first, styles.second, styles.third]

export function WorkGrid() {
  return (
    <section id="work" aria-labelledby="work-heading">
      <Marquee text="Selected work" id="work-heading" />
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <div key={project.slug} className={slots[index]}>
            <ProjectCard project={project} />
          </div>
        ))}
        <div className={`reveal ${styles.note}`}>
          <p className={`mono-label ${styles.noteLabel}`}>More in the timeline</p>
          <p className={styles.noteBody}>Smaller tools, experiments and work in progress live in the timeline below.</p>
        </div>
      </div>
    </section>
  )
}

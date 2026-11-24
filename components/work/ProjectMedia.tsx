import Image from 'next/image'
import type { ProjectMediaInfo } from '@/lib/types'
import styles from './ProjectMedia.module.css'

export function ProjectMedia({ media, priority = false }: { media: ProjectMediaInfo; priority?: boolean }) {
  const { tone, label, src, video, width, height } = media
  return (
    <div className={`${styles.media} ${styles[tone]}`}>
      {video ? (
        <video className={styles.contain} src={video} poster={src} width={width} height={height} autoPlay muted loop playsInline preload="none" aria-label={label} />
      ) : src && width && height ? (
        <Image className={styles.cover} src={src} alt={label} width={width} height={height} priority={priority} sizes="(min-width: 768px) 50vw, 100vw" />
      ) : (
        <span className="mono-label">{label}</span>
      )}
    </div>
  )
}

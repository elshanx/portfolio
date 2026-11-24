import Image from 'next/image'
import type { ProjectMediaInfo } from '@/lib/types'
import { DemoVideo } from './DemoVideo'
import styles from './ProjectMedia.module.css'

interface ProjectMediaProps {
  media: ProjectMediaInfo
  priority?: boolean
  playable?: boolean
  sizes?: string
}

export function ProjectMedia({ media, priority = false, playable = false, sizes = '(min-width: 768px) 50vw, 100vw' }: ProjectMediaProps) {
  const { tone, label, src, video, width, height } = media
  const fit = video ? styles.contain : styles.cover
  return (
    <div className={`${styles.media} ${styles[tone]}`}>
      {src && width && height ? (
        playable && video ? (
          <DemoVideo className={fit} src={video} poster={src} width={width} height={height} label={label} />
        ) : (
          <Image className={fit} src={src} alt={label} width={width} height={height} priority={priority} sizes={sizes} />
        )
      ) : (
        <span className="mono-label">{label}</span>
      )}
    </div>
  )
}

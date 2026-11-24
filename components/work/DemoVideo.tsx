'use client'

import { useEffect, useRef } from 'react'

interface DemoVideoProps {
  src: string
  poster: string
  width: number
  height: number
  label: string
  className: string
}

export function DemoVideo({ src, poster, width, height, label, className }: DemoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const sync = (): void => {
      if (!video) return
      if (query.matches) video.pause()
      else void video.play().catch(() => undefined)
    }
    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  return <video ref={ref} className={className} src={src} poster={poster} width={width} height={height} muted loop playsInline controls preload="metadata" aria-label={label} />
}

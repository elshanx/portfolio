'use client'

import { useEffect, useState } from 'react'
import { ReactLenis } from 'lenis/react'

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)'

export function SmoothScroll() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const query = matchMedia(REDUCED_MOTION)
    const update = (): void => setEnabled(!query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return enabled ? <ReactLenis root options={{ anchors: true }} /> : null
}

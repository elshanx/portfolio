'use client'

import { useSyncExternalStore } from 'react'
import { formatClock } from '@/lib/time'

const PLACEHOLDER = '--:--'

function subscribe(onChange: () => void): () => void {
  const id = setInterval(onChange, 30_000)
  return () => clearInterval(id)
}

export function LocalTime({ timeZone }: { timeZone: string }) {
  const time = useSyncExternalStore(subscribe, () => formatClock(new Date(), timeZone), () => PLACEHOLDER)
  return <time suppressHydrationWarning>{time}</time>
}

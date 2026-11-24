'use client'

import { useState } from 'react'
import { timeline } from '@/content/timeline'
import { filterLabel, filterTimeline, TIMELINE_FILTERS } from '@/lib/timeline'
import type { TimelineFilter } from '@/lib/types'
import { TimelineRow } from './TimelineRow'
import styles from './Timeline.module.css'

export function Timeline() {
  const [filter, setFilter] = useState<TimelineFilter>('all')
  const entries = filterTimeline(timeline, filter)
  const count = `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`

  return (
    <section id="timeline" className={styles.timeline} aria-labelledby="timeline-heading">
      <div className={styles.header}>
        <div className={styles.headingBox}>
          <p className={`mono-label ${styles.muted}`}>2020 — 2026 · {count}</p>
          <h2 id="timeline-heading" className={styles.heading}>
            Timeline
          </h2>
        </div>
        <div role="group" aria-label="Filter timeline" className={styles.filters}>
          {TIMELINE_FILTERS.map((option) => (
            <button key={option} type="button" className={`mono-label ${styles.chip}`} aria-pressed={filter === option} onClick={() => setFilter(option)}>
              {filterLabel(option)}
            </button>
          ))}
        </div>
      </div>
      <p className="visually-hidden" aria-live="polite">
        Showing {count}
      </p>
      <ol className={styles.list}>
        {entries.map((entry) => (
          <TimelineRow key={entry.title} entry={entry} />
        ))}
      </ol>
    </section>
  )
}

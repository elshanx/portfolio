import type { TimelineEntry, TimelineFilter } from './types.ts'

export const TIMELINE_FILTERS: readonly TimelineFilter[] = ['all', 'career', 'shipped', 'craft']

export function filterTimeline(entries: TimelineEntry[], filter: TimelineFilter): TimelineEntry[] {
  return filter === 'all' ? entries : entries.filter(({ tags }) => tags.includes(filter))
}

export function filterLabel(filter: TimelineFilter): string {
  return filter.charAt(0).toUpperCase() + filter.slice(1)
}

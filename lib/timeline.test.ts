import { test } from 'node:test'
import { deepEqual, equal } from 'node:assert/strict'
import { filterLabel, filterTimeline, TIMELINE_FILTERS } from './timeline.ts'
import type { TimelineEntry } from './types.ts'

const entry = (title: string, tags: TimelineEntry['tags']): TimelineEntry => ({
  period: '2026',
  title,
  description: '',
  tags,
  inProgress: false,
})

const fixture: TimelineEntry[] = [entry('A', ['career']), entry('B', ['shipped', 'career']), entry('C', ['craft'])]
const titles = (entries: TimelineEntry[]): string[] => entries.map(({ title }) => title)

test('all returns every entry in order', () => {
  deepEqual(titles(filterTimeline(fixture, 'all')), ['A', 'B', 'C'])
})

test('career keeps entries tagged career', () => {
  deepEqual(titles(filterTimeline(fixture, 'career')), ['A', 'B'])
})

test('craft keeps only craft entries', () => {
  deepEqual(titles(filterTimeline(fixture, 'craft')), ['C'])
})

test('filterLabel capitalises', () => {
  equal(filterLabel('shipped'), 'Shipped')
})

test('filters are all, career, shipped, craft', () => {
  deepEqual([...TIMELINE_FILTERS], ['all', 'career', 'shipped', 'craft'])
})

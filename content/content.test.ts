import { test } from 'node:test'
import { deepEqual, equal, ok } from 'node:assert/strict'
import { projects } from './projects.ts'
import { site } from './site.ts'
import { timeline } from './timeline.ts'

test('timeline has 10 entries', () => {
  equal(timeline.length, 10)
})

test('qaqash, budget-tracker and gamelog are in progress on the timeline', () => {
  deepEqual(timeline.filter(({ inProgress }) => inProgress).map(({ title }) => title), ['qaqash', 'budget-tracker', 'gamelog'])
})

test('every timeline entry has at least one tag', () => {
  ok(timeline.every(({ tags }) => tags.length > 0))
})

test('only the qaqash project is in progress', () => {
  deepEqual(projects.filter(({ inProgress }) => inProgress).map(({ slug }) => slug), ['qaqash'])
})

test('site links are email, GitHub, LinkedIn, Telegram in that order', () => {
  deepEqual(site.links.map(({ label }) => label), ['Email', 'GitHub', 'LinkedIn', 'Telegram'])
})

test('no link points to fll.az', () => {
  const hrefs = [...site.links, ...projects.flatMap(({ links }) => links)].map(({ href }) => href)
  ok(hrefs.every((href) => !href.includes('fll.az')))
})

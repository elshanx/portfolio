import { test } from 'node:test'
import { deepEqual, equal } from 'node:assert/strict'
import { getProject, nextProject, projectSlugs } from './projects.ts'

test('getProject finds by slug', () => {
  equal(getProject('frontpage')?.title, 'frontpage')
})

test('getProject returns undefined for unknown slug', () => {
  equal(getProject('nope'), undefined)
})

test('nextProject wraps from last to first', () => {
  equal(nextProject('qaqash').slug, 'dayaq')
})

test('nextProject moves forward', () => {
  equal(nextProject('dayaq').slug, 'frontpage')
})

test('projectSlugs keeps content order', () => {
  deepEqual(projectSlugs(), ['dayaq', 'frontpage', 'qaqash'])
})

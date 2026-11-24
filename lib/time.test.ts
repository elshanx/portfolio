import { test } from 'node:test'
import { equal } from 'node:assert/strict'
import { formatClock } from './time.ts'

test('shows Baku time for a UTC instant', () => {
  equal(formatClock(new Date('2026-11-25T10:32:00Z'), 'Asia/Baku'), '14:32')
})

test('pads hours and minutes', () => {
  equal(formatClock(new Date('2026-11-25T20:05:00Z'), 'Asia/Baku'), '00:05')
})

import { test } from 'node:test'
import { equal } from 'node:assert/strict'
import { siteUrl } from './site-url.ts'

test('uses the Vercel production host when set', () => {
  equal(siteUrl({ VERCEL_PROJECT_PRODUCTION_URL: 'elshanx.vercel.app' }), 'https://elshanx.vercel.app')
})

test('falls back to localhost', () => {
  equal(siteUrl({}), 'http://localhost:3000')
})

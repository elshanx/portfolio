import type { MetadataRoute } from 'next'
import { projectSlugs } from '@/lib/projects'
import { siteUrl } from '@/lib/site-url'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl(process.env)
  const paths = ['', '/cv', ...projectSlugs().map((slug) => `/work/${slug}`)]
  return paths.map((path) => ({ url: `${base}${path}` }))
}

import { projects } from '../content/projects.ts'
import type { Project } from './types.ts'

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function projectSlugs(): string[] {
  return projects.map(({ slug }) => slug)
}

export function nextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug)
  return projects[(index + 1) % projects.length]
}

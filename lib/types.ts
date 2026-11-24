export type TimelineTag = 'career' | 'shipped' | 'craft'

export type TimelineFilter = 'all' | TimelineTag

export interface TimelineEntry {
  period: string
  title: string
  description: string
  tags: TimelineTag[]
  inProgress: boolean
  href?: string
}

export interface ExternalLink {
  label: string
  href: string
  display: string
}

export type MediaTone = 'surface' | 'surface-strong' | 'inverse'

export interface ProjectMediaInfo {
  tone: MediaTone
  label: string
  src?: string
  width?: number
  height?: number
}

export interface CaseSection {
  heading: string
  paragraphs: string[]
}

export interface Project {
  slug: string
  index: string
  title: string
  period: string
  role: string
  summary: string
  stack: string[]
  inProgress: boolean
  media: ProjectMediaInfo
  links: ExternalLink[]
  sections: CaseSection[]
}

export interface Site {
  name: string
  fullName: string
  role: string
  location: string
  timeZone: string
  utcOffsetLabel: string
  employer: string
  employerRole: string
  availability: string
  email: string
  links: ExternalLink[]
  about: string[]
}

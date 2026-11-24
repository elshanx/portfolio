import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/badge/Badge'
import { CaseMeta } from '@/components/case-study/CaseMeta'
import { NextProject } from '@/components/case-study/NextProject'
import styles from '@/components/case-study/CaseStudy.module.css'
import { ProjectMedia } from '@/components/work/ProjectMedia'
import { getProject, nextProject, projectSlugs } from '@/lib/projects'

interface CaseStudyProps {
  params: Promise<{ slug: string }>
}

export function generateStaticParams(): { slug: string }[] {
  return projectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: CaseStudyProps): Promise<Metadata> {
  const project = getProject((await params).slug)
  return project ? { title: project.title, description: project.summary } : {}
}

export default async function CaseStudy({ params }: CaseStudyProps) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  return (
    <main id="main" className={styles.page}>
      <header>
        <Link href="/#work" className={`mono-label ${styles.back}`}>
          ← All work
        </Link>
        <div className={styles.titleRow}>
          <h1 className={styles.title}>{project.title}</h1>
          {project.inProgress && <Badge>In progress</Badge>}
        </div>
      </header>
      <p className={styles.summary}>{project.summary}</p>
      <CaseMeta project={project} />
      <ProjectMedia media={project.media} priority />
      <div className={styles.content}>
        {project.sections.map(({ heading, paragraphs }) => (
          <section key={heading} className={styles.section}>
            <h2>{heading}</h2>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}
        <div className={styles.links}>
          {project.links.map(({ label, href }) => (
            <a key={href} href={href} target="_blank" rel="noopener noreferrer" className={`mono-label ${styles.linkButton}`}>
              {label} ↗
            </a>
          ))}
        </div>
      </div>
      <NextProject project={nextProject(project.slug)} />
    </main>
  )
}

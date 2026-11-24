import { ImageResponse } from 'next/og'
import { OG_SIZE, ogFrame } from '@/components/og/og-frame'
import { getProject, projectSlugs } from '@/lib/projects'

export const alt = 'Case study'
export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams(): { slug: string }[] {
  return projectSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }): Promise<ImageResponse> {
  const project = getProject((await params).slug)
  return new ImageResponse(ogFrame(project?.title ?? 'Elshan', project?.summary ?? ''), size)
}

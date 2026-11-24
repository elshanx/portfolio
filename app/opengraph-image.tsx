import { ImageResponse } from 'next/og'
import { OG_SIZE, ogFrame } from '@/components/og/og-frame'
import { site } from '@/content/site'

export const alt = `${site.name} — ${site.role}`
export const size = OG_SIZE
export const contentType = 'image/png'

export default function Image(): ImageResponse {
  return new ImageResponse(ogFrame(site.name, `${site.role} in ${site.location}`), size)
}

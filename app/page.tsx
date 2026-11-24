import { AboutContact } from '@/components/about/AboutContact'
import { Hero } from '@/components/hero/Hero'
import { Timeline } from '@/components/timeline/Timeline'
import { WorkGrid } from '@/components/work/WorkGrid'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <WorkGrid />
      <Timeline />
      <AboutContact />
    </main>
  )
}

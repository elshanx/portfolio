import { Hero } from '@/components/hero/Hero'
import { Marquee } from '@/components/marquee/Marquee'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <Marquee text="Selected work" id="work-heading" />
    </main>
  )
}

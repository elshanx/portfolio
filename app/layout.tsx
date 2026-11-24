import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Geist, Geist_Mono } from 'next/font/google'
import { Footer } from '@/components/footer/Footer'
import { Nav } from '@/components/nav/Nav'
import { SmoothScroll } from '@/components/smooth-scroll/SmoothScroll'
import { THEME_SCRIPT } from '@/components/theme/theme-script'
import './globals.css'

const sans = Geist({ variable: '--font-sans', subsets: ['latin'] })
const mono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: { default: 'Elshan — Front-end engineer', template: '%s — Elshan' },
  description: 'Front-end engineer in Baku building fast, accessible web products.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="visually-hidden-focusable">
          Skip to content
        </a>
        <SmoothScroll />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  )
}

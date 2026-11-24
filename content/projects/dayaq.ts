import type { Project } from '../../lib/types.ts'

export const dayaq: Project = {
  slug: 'dayaq',
  index: '01',
  title: 'dayaq',
  period: 'Freelance · 2026 — now',
  role: 'Sole developer, freelance',
  summary: 'Marketing site and admin for a home-care service in Azerbaijan. Three languages, edited by the client in a rich-text admin, built to rank in local search.',
  stack: ['Next.js 16', 'Prisma', 'Postgres', 'Playwright'],
  inProgress: false,
  media: { tone: 'surface', label: 'dayaq — home page', src: '/work/dayaq.webp', width: 1440, height: 1000 },
  links: [{ label: 'Live site', href: 'https://dayaq.vercel.app', display: 'dayaq.vercel.app' }],
  sections: [
    {
      heading: 'Overview',
      paragraphs: [
        'Dayaq is a home-care (patronaj) service in Azerbaijan. The site presents its services, careers, blog and news in Azerbaijani, Russian and English, and every call to action opens WhatsApp — the channel the client’s customers already use.',
        'Behind it is a small admin where the team publishes blog posts, news and vacancies without asking a developer.',
      ],
    },
    {
      heading: 'My role',
      paragraphs: ['I build and run the whole thing as a freelancer: product plan, design implementation, back end, deploys and the handover to the client’s team.'],
    },
    {
      heading: 'Key decisions',
      paragraphs: [
        'Search is the main source of customers, so SEO is a requirement, not a polish step. Every page has its canonical URL, hreflang links for the three languages, JSON-LD structured data and a sitemap entry.',
        'Public pages are prerendered and cached, then refreshed when something is published. Visitors get static speed and the client still sees changes right away.',
        'Translations move between the code and the translator as a spreadsheet (key, az, ru, en), so the translator never edits code. End-to-end tests run against a seeded database before each release.',
      ],
    },
    {
      heading: 'Status',
      paragraphs: ['Live and in active development.'],
    },
  ],
}

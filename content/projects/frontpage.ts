import type { Project } from '../../lib/types.ts'

export const frontpage: Project = {
  slug: 'frontpage',
  index: '02',
  title: 'frontpage',
  period: '2026',
  role: 'Design and development',
  summary: 'RSS and Atom reader with search, a ranked daily digest and full keyboard control. Started as a Frontend Mentor brief, grown into a real product.',
  stack: ['Next.js 16', 'Prisma 7', 'Better Auth', 'Tailwind 4'],
  inProgress: false,
  media: { tone: 'surface-strong', label: 'frontpage — reader view', src: '/work/frontpage.webp', width: 1440, height: 1000 },
  links: [
    { label: 'Live app', href: 'https://frontpage-delta.vercel.app', display: 'frontpage-delta.vercel.app' },
    { label: 'Source', href: 'https://github.com/elshanx/frontpage', display: 'github.com/elshanx/frontpage' },
  ],
  sections: [
    {
      heading: 'Overview',
      paragraphs: [
        'frontpage turns the blogs, newsletters and changelogs you follow into one calm front page. You can start as a guest with real feeds already loaded, or create an account, then organize feeds, read in a distraction-free reader, save items, search everything and catch up with a ranked digest.',
        'It started from a Frontend Mentor brief and grew into a full product with accounts, a database and an optional AI briefing.',
      ],
    },
    {
      heading: 'My role',
      paragraphs: ['Everything: product decisions, interface, data model, feed parsing and deployment, built in ten planned phases.'],
    },
    {
      heading: 'Key decisions',
      paragraphs: [
        'An empty RSS reader is a dead end, so guests land on real feeds, new accounts get one-click starter packs, and a guest who signs up keeps everything they did.',
        'The digest ranks unread items by freshness and by how often a feed posts, so a rare post from a quiet blog gets a fair chance against a busy changelog. The ranking is pure and unit-tested; AI is an extra on top, not a dependency.',
        'Feeds in the wild break the spec in every way. The parser handles conflicting encodings, truncated items, odd dates and hostile content, with a test for each case.',
      ],
    },
    {
      heading: 'Status',
      paragraphs: ['Live. Keyboard shortcuts, high-contrast and reduced-motion settings, and reader typography controls are all shipped.'],
    },
  ],
}

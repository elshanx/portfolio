import type { Project } from '../../lib/types.ts'

export const qaqash: Project = {
  slug: 'qaqash',
  index: '03',
  title: 'qaqash',
  period: '2026',
  role: 'Design and development',
  summary: 'A macOS notch companion for Claude Code and music. Allow or deny from the notch, see sessions on hover. Runs fully on your Mac.',
  stack: ['Swift 6', 'SwiftUI', 'macOS'],
  inProgress: true,
  media: { tone: 'inverse', label: 'qaqash — notch demo', src: '/work/qaqash-poster.webp', video: '/work/qaqash.mp4', width: 608, height: 240 },
  links: [{ label: 'Source', href: 'https://github.com/elshanx/qaqash', display: 'github.com/elshanx/qaqash' }],
  sections: [
    {
      heading: 'Overview',
      paragraphs: [
        'qaqash lives in the Mac’s notch. A pair of eyes shows what Claude Code is doing, and the notch grows like the iPhone’s Dynamic Island when something needs you: a permission request, a question, or a finished task.',
        'It also shows what Spotify or Apple Music is playing, with playback controls. Everything runs on your Mac — no account, no cloud, no telemetry.',
      ],
    },
    {
      heading: 'My role',
      paragraphs: ['A personal project: idea, interaction design and the Swift code for the Mac and iPhone apps.'],
    },
    {
      heading: 'Key decisions',
      paragraphs: [
        'Claude Code talks to qaqash through its hooks. For a permission request the hook waits until you answer in the notch, and if qaqash isn’t running the hook does nothing, so Claude Code behaves normally.',
        'The window is a fixed transparent area at the top of the screen that lets clicks through everywhere except the island, so it never gets in the way of the app below.',
        'Music is read only from apps that are already running, so qaqash never launches Spotify or Music on its own.',
      ],
    },
    {
      heading: 'Status',
      paragraphs: ['The Mac app works today. An iPhone app with notifications, Allow/Deny and a Live Activity is in progress.'],
    },
  ],
}

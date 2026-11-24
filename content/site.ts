import type { Site } from '../lib/types.ts'

const email = 'elshanxakbarov@gmail.com'

export const site: Site = {
  name: 'Elshan',
  fullName: 'Elshan Akbarov',
  role: 'Front-end engineer',
  location: 'Baku, AZ',
  timeZone: 'Asia/Baku',
  utcOffsetLabel: 'GMT+4',
  employer: 'Pasha Bank',
  employerRole: 'Front-end engineer',
  availability: 'Open to freelance',
  email,
  links: [
    { label: 'Email', href: `mailto:${email}`, display: email },
    { label: 'GitHub', href: 'https://github.com/elshanx', display: '@elshanx' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/elshanx/', display: 'in/elshanx' },
    { label: 'Telegram', href: 'https://t.me/ElshanAkbarov', display: '@ElshanAkbarov' },
  ],
  about: [
    'I’m Elshan, a front-end engineer in Baku. Since 2023 I’ve worked at Pasha Bank. Outside of it I take on a few freelance builds and make small tools for myself — mostly Next.js and TypeScript, lately Swift and Rust too.',
    'I care about pages that load fast, read well and work from the keyboard.',
  ],
}

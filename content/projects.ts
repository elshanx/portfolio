import type { Project } from '../lib/types.ts'
import { dayaq } from './projects/dayaq.ts'
import { frontpage } from './projects/frontpage.ts'
import { qaqash } from './projects/qaqash.ts'

export const projects: Project[] = [dayaq, frontpage, qaqash]

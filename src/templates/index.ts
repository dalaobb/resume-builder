import type { ResumeTemplate } from '../types/resume'
import { ModernPreview } from './modern'
import { ClassicPreview } from './classic'
import { ProPreview } from './pro'

export const templates: ResumeTemplate[] = [
  {
    id: 'modern',
    nameKey: 'templates.modern',
    Preview: ModernPreview,
  },
  {
    id: 'classic',
    nameKey: 'templates.classic',
    Preview: ClassicPreview,
  },
  {
    id: 'pro',
    nameKey: 'templates.pro',
    Preview: ProPreview,
  },
]

export function getTemplate(id: string): ResumeTemplate {
  return templates.find((t) => t.id === id) ?? templates[0]
}

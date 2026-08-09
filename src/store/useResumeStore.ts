import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { EducationItem, Lang, ProjectItem, ResumeBasics, ResumeData, SkillItem, WorkItem } from '../types/resume'
import { createId, defaultResume } from '../data/defaultResume'
import { detectLanguage } from '../utils/language'

const STORAGE_KEY = 'resume-maker'

const PRERENDER_LANG = (globalThis as { __PRERENDER_LANG__?: Lang }).__PRERENDER_LANG__

type ListSectionKey = 'education' | 'work' | 'projects'
type SectionKey = ListSectionKey | 'skills'

type LegacyBasics = Partial<ResumeBasics> & { website?: string; age?: string }

function normalizeBasics(basics: LegacyBasics): ResumeBasics {
  const links = Array.isArray(basics.links) ? [...basics.links] : []
  if (typeof basics.website === 'string' && basics.website) {
    links.unshift({ id: createId(), label: '', url: basics.website })
  }
  const { website: _website, age, ...rest } = basics
  const birthDate = basics.birthDate || age || ''
  return { ...rest, birthDate, links } as ResumeBasics
}

const blank = {
  education: (): EducationItem => ({
    id: createId(),
    school: '',
    degree: '',
    major: '',
    startDate: '',
    endDate: '',
    description: '',
  }),
  work: (): WorkItem => ({
    id: createId(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
  }),
  projects: (): ProjectItem => ({
    id: createId(),
    name: '',
    role: '',
    link: '',
    startDate: '',
    endDate: '',
    description: '',
  }),
  skills: (): SkillItem => ({ id: createId(), name: '', level: '' }),
}

interface ResumeStore {
  resume: ResumeData
  templateId: string
  lang: Lang
  showIcons: boolean
  setResume: (resume: ResumeData) => void
  updateBasics: (patch: Partial<ResumeData['basics']>) => void
  updateItem: (section: SectionKey, id: string, patch: Record<string, string>) => void
  addItem: (section: ListSectionKey) => void
  addSkill: () => void
  removeItem: (section: SectionKey, id: string) => void
  addLink: () => void
  updateLink: (id: string, patch: Record<string, string>) => void
  removeLink: (id: string) => void
  setTemplateId: (id: string) => void
  setShowIcons: (show: boolean) => void
  resetResume: () => void
}

const patchSection = (data: ResumeData, section: SectionKey, id: string, patch: Record<string, string>): ResumeData => {
  switch (section) {
    case 'education':
      return { ...data, education: data.education.map((i) => (i.id === id ? { ...i, ...patch } : i)) }
    case 'work':
      return { ...data, work: data.work.map((i) => (i.id === id ? { ...i, ...patch } : i)) }
    case 'projects':
      return { ...data, projects: data.projects.map((i) => (i.id === id ? { ...i, ...patch } : i)) }
    case 'skills':
      return { ...data, skills: data.skills.map((i) => (i.id === id ? { ...i, ...patch } : i)) }
  }
}

const removeFromSection = (data: ResumeData, section: SectionKey, id: string): ResumeData => {
  switch (section) {
    case 'education':
      return { ...data, education: data.education.filter((i) => i.id !== id) }
    case 'work':
      return { ...data, work: data.work.filter((i) => i.id !== id) }
    case 'projects':
      return { ...data, projects: data.projects.filter((i) => i.id !== id) }
    case 'skills':
      return { ...data, skills: data.skills.filter((i) => i.id !== id) }
  }
}

const appendToSection = (data: ResumeData, section: ListSectionKey): ResumeData => {
  switch (section) {
    case 'education':
      return { ...data, education: [...data.education, blank.education()] }
    case 'work':
      return { ...data, work: [...data.work, blank.work()] }
    case 'projects':
      return { ...data, projects: [...data.projects, blank.projects()] }
  }
}

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      resume: defaultResume(PRERENDER_LANG ?? detectLanguage()),
      templateId: 'modern',
      lang: PRERENDER_LANG ?? detectLanguage(),
      showIcons: false,

      setResume: (resume) => set({ resume }),
      updateBasics: (patch) =>
        set((s) => ({ resume: { ...s.resume, basics: { ...s.resume.basics, ...patch } } })),
      updateItem: (section, id, patch) =>
        set((s) => ({ resume: patchSection(s.resume, section, id, patch) })),
      addItem: (section) => set((s) => ({ resume: appendToSection(s.resume, section) })),
      addSkill: () => set((s) => ({ resume: { ...s.resume, skills: [...s.resume.skills, blank.skills()] } })),
      removeItem: (section, id) =>
        set((s) => ({ resume: removeFromSection(s.resume, section, id) })),
      addLink: () =>
        set((s) => ({
          resume: {
            ...s.resume,
            basics: {
              ...s.resume.basics,
              links: [...s.resume.basics.links, { id: createId(), label: '', url: '' }],
            },
          },
        })),
      updateLink: (id, patch) =>
        set((s) => ({
          resume: {
            ...s.resume,
            basics: {
              ...s.resume.basics,
              links: s.resume.basics.links.map((l) => (l.id === id ? { ...l, ...patch } : l)),
            },
          },
        })),
      removeLink: (id) =>
        set((s) => ({
          resume: {
            ...s.resume,
            basics: {
              ...s.resume.basics,
              links: s.resume.basics.links.filter((l) => l.id !== id),
            },
          },
        })),
      setTemplateId: (id) => set({ templateId: id }),
      setShowIcons: (show) => set({ showIcons: show }),
      resetResume: () => set((s) => ({ resume: defaultResume(s.lang) })),
    }),
    {
      name: STORAGE_KEY,
      partialize: (s) => ({ resume: s.resume, templateId: s.templateId, showIcons: s.showIcons }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<ResumeStore>
        const pr = p.resume
        if (!pr) return { ...current, ...p }
        const resume: ResumeData = {
          ...current.resume,
          ...pr,
          basics: normalizeBasics({ ...current.resume.basics, ...pr.basics }),
        }
        return { ...current, ...p, resume }
      },
    },
  ),
)

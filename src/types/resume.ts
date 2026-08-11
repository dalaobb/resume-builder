export type Lang = 'zh-CN' | 'en-US'

export interface ResumeLink {
  id: string
  label: string
  url: string
}

export interface ResumeBasics {
  name: string
  title: string
  email: string
  phone: string
  location: string
  gender: string
  birthDate: string
  nativePlace: string
  // politicalStatus: string
  // expectedSalary: string
  availableOn: string
  links: ResumeLink[]
  summary: string
}

export interface EducationItem {
  id: string
  school: string
  degree: string
  major: string
  startDate: string
  endDate: string
  description: string
}

export interface WorkItem {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface ProjectItem {
  id: string
  name: string
  role: string
  link: string
  startDate: string
  endDate: string
  description: string
}

export interface SkillItem {
  id: string
  name: string
  level: string
}

export interface ResumeData {
  basics: ResumeBasics
  education: EducationItem[]
  work: WorkItem[]
  projects: ProjectItem[]
  skills: SkillItem[]
}

export interface ResumeTemplate {
  id: string
  nameKey: string
  Preview: React.ComponentType<{ data: ResumeData; lang: Lang; showIcons?: boolean }>
}

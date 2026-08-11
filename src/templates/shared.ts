import type { Lang, ResumeBasics } from '../types/resume'

export const dateRange = (start: string, end: string): string =>
  [start, end].filter(Boolean).join(' - ')

export type ContactKind =
  | 'email'
  | 'phone'
  | 'location'
  | 'link'
  | 'gender'
  | 'birth'
  | 'native'
  | 'political'
  | 'salary'
  | 'available'

export interface ContactEntry {
  kind: ContactKind
  label: string
  value: string
  href?: string
  showLabel?: boolean
}

export function buildContacts(basics: ResumeBasics, lang: Lang): ContactEntry[] {
  const zh = lang === 'zh-CN'
  const entries: ContactEntry[] = []

  if (basics.email)
    entries.push({
      kind: 'email',
      label: zh ? '邮箱' : 'Email',
      value: basics.email,
      href: `mailto:${basics.email}`,
    })
  if (basics.phone) entries.push({ kind: 'phone', label: zh ? '电话' : 'Phone', value: basics.phone })

  for (const link of basics.links ?? []) {
    if (link.url)
      entries.push({
        kind: 'link',
        label: link.label || (zh ? '链接' : 'Link'),
        value: link.url,
        href: link.url,
        showLabel: true,
      })
  }

  return entries
}

export function buildPersonal(basics: ResumeBasics, lang: Lang): ContactEntry[] {
  const zh = lang === 'zh-CN'
  const entries: ContactEntry[] = []

  if (basics.location)
    entries.push({ kind: 'location', label: zh ? '所在地' : 'Location', value: basics.location })

  if (zh) {
    const extra: Array<[ContactKind, string, string]> = [
      ['gender', '性别', basics.gender],
      ['birth', '出生日期', basics.birthDate],
      ['native', '籍贯', basics.nativePlace],
      // ['political', '政治面貌', basics.politicalStatus],
      // ['salary', '期望薪资', basics.expectedSalary],
      ['available', '到岗时间', basics.availableOn],
    ]
    for (const [kind, label, value] of extra) {
      if (value) entries.push({ kind, label, value, showLabel: true })
    }
  }

  return entries
}

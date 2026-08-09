export const DOMAINS = {
  zh: 'https://jianli.dalaobb.com',
  en: 'https://resume.dalaobb.com',
} as const

export function alternateDomain(lang: 'zh-CN' | 'en-US'): string {
  return lang === 'zh-CN' ? DOMAINS.en : DOMAINS.zh
}

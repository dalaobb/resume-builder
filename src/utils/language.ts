import type { Lang } from '../types/resume'

export function detectLanguage(): Lang {
  const host = window.location.hostname
  if (host.includes('jianli')) return 'zh-CN'
  if (host.includes('resume')) return 'en-US'
  return navigator.language.toLowerCase().startsWith('zh') ? 'zh-CN' : 'en-US'
}

export function applyHtmlLang(lang: Lang): void {
  document.documentElement.lang = lang
  document.documentElement.dataset.lang = lang
}

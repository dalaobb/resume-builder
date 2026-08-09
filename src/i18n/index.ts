import zhCN from './zh-CN'
import enUS from './en-US'
import type { Lang } from '../types/resume'
import { useResumeStore } from '../store/useResumeStore'
import { applyHtmlLang } from '../utils/language'

const messages = { 'zh-CN': zhCN, 'en-US': enUS } as const

export type Messages = (typeof messages)[Lang]

function resolve(obj: unknown, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>((acc, key) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[key] : undefined), obj)
}

function format(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    vars[key] !== undefined ? String(vars[key]) : `{${key}}`,
  )
}

export function translate(lang: Lang, path: string, vars?: Record<string, string | number>): string {
  const value = resolve(messages[lang], path)
  if (typeof value === 'string') return format(value, vars)
  const fallback = resolve(messages['zh-CN'], path)
  return typeof fallback === 'string' ? format(fallback, vars) : path
}

export function useI18n() {
  const lang = useResumeStore((s) => s.lang)
  const msg = messages[lang]

  return {
    lang,
    msg,
    t: (path: string, vars?: Record<string, string | number>) => translate(lang, path, vars),
  }
}

export { applyHtmlLang }

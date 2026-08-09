import { useI18n } from '../i18n'
import { applyHtmlLang } from '../utils/language'
import { alternateDomain } from '../utils/domains'
import { useEffect } from 'react'

const navItems = [
  { to: '/', key: 'common.navHome' },
  { to: '/create', key: 'common.navCreate' },
  { to: '/privacy', key: 'common.navPrivacy' },
]

function LangSwitch({ path }: { path: string }) {
  const { lang } = useI18n()
  const href = alternateDomain(lang) + path
  return (
    <a
      href={href}
      className="flex h-9 items-center rounded-md border border-line px-3 text-xs font-medium text-ink-muted transition hover:border-accent hover:text-accent-dark"
    >
      {lang === 'zh-CN' ? 'EN' : '中文'}
    </a>
  )
}

export default function Header({ pathname }: { pathname?: string }) {
  const { t, lang } = useI18n()
  const path = pathname ?? (typeof window !== 'undefined' ? window.location.pathname : '/')
  const wide = path === '/create'

  useEffect(() => {
    applyHtmlLang(lang)
  }, [lang])

  const isActive = (to: string) => (to === '/' ? path === '/' : path === to)
  const linkClass = (to: string) =>
    `rounded-md px-3 py-1.5 text-sm transition ${
      isActive(to)
        ? 'bg-emerald-50 font-medium text-accent-dark'
        : 'text-ink-muted hover:bg-canvas hover:text-ink'
    }`

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <div
        className={`mx-auto flex h-16 items-center justify-between px-4 ${
          wide ? 'max-w-[1440px] md:px-5' : 'max-w-6xl md:px-8'
        }`}
      >
        <a href="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
            R
          </span>
          <span className="text-sm font-semibold text-ink">{t('common.appName')}</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.to}
              href={item.to}
              aria-current={isActive(item.to) ? 'page' : undefined}
              className={linkClass(item.to)}
            >
              {t(item.key)}
            </a>
          ))}
          <div className="ml-2">
            <LangSwitch path={path} />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch path={path} />
          <details className="group relative">
            <summary className="flex h-9 w-9 cursor-pointer list-none items-center justify-center rounded-md border border-line">
              <span className="relative block h-3.5 w-4">
                <span className="absolute left-0 top-0 h-0.5 w-4 rounded bg-ink transition-transform duration-200 group-open:top-1/2 group-open:-translate-y-1/2 group-open:rotate-45" />
                <span className="absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-ink transition-opacity duration-200 group-open:opacity-0" />
                <span className="absolute left-0 bottom-0 h-0.5 w-4 rounded bg-ink transition-transform duration-200 group-open:bottom-1/2 group-open:translate-y-1/2 group-open:-rotate-45" />
              </span>
            </summary>
            <nav className="absolute right-0 top-full z-30 mt-1 w-48 rounded-lg border border-line bg-white p-2 shadow-lg">
              {navItems.map((item) => (
                <a
                  key={item.to}
                  href={item.to}
                  aria-current={isActive(item.to) ? 'page' : undefined}
                  className={`block rounded-md px-3 py-2.5 text-sm transition ${
                    isActive(item.to)
                      ? 'bg-emerald-50 font-medium text-accent-dark'
                      : 'text-ink-muted hover:bg-canvas hover:text-ink'
                  }`}
                >
                  {t(item.key)}
                </a>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}

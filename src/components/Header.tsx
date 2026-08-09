import { Link, NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'
import { applyHtmlLang } from '../utils/language'
import { useEffect, useState } from 'react'

const navItems = [
  { to: '/', key: 'common.navHome' },
  { to: '/create', key: 'common.navCreate' },
  { to: '/privacy', key: 'common.navPrivacy' },
]

function LangSwitch({ compact }: { compact?: boolean }) {
  const { lang, setLang } = useI18n()

  const switchLang = (next: 'zh-CN' | 'en-US') => {
    if (next !== lang) setLang(next)
  }

  return (
    <div
      className={`flex h-9 items-center overflow-hidden rounded-md border border-line ${
        compact ? 'w-full justify-between' : ''
      }`}
    >
      {(['zh-CN', 'en-US'] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchLang(l)}
          className={`flex h-full items-center px-2.5 text-xs transition ${
            lang === l ? 'bg-ink font-medium text-white' : 'text-ink-muted hover:text-ink'
          }`}
        >
          {l === 'zh-CN' ? '中文' : 'EN'}
        </button>
      ))}
    </div>
  )
}

export default function Header() {
  const { t, lang } = useI18n()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const wide = pathname === '/create'

  useEffect(() => {
    applyHtmlLang(lang)
  }, [lang])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
      <div
        className={`mx-auto flex h-16 items-center justify-between px-4 ${
          wide ? 'max-w-[1440px] md:px-5' : 'max-w-6xl md:px-8'
        }`}
      >
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-sm font-bold text-white">
            R
          </span>
          <span className="text-sm font-semibold text-ink">{t('common.appName')}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `rounded-md px-3 py-1.5 text-sm transition ${
                  isActive ? 'bg-emerald-50 font-medium text-accent-dark' : 'text-ink-muted hover:bg-canvas hover:text-ink'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
          <div className="ml-2">
            <LangSwitch />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitch />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-line"
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 h-0.5 w-4 rounded bg-ink transition-transform duration-200 ${
                  open ? 'top-1/2 -translate-y-1/2 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 rounded bg-ink transition-opacity duration-200 ${
                  open ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute left-0 h-0.5 w-4 rounded bg-ink transition-transform duration-200 ${
                  open ? 'top-1/2 -translate-y-1/2 -rotate-45' : 'bottom-0'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-white px-4 py-2 md:hidden">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2.5 text-sm transition ${
                  isActive ? 'bg-emerald-50 font-medium text-accent-dark' : 'text-ink-muted hover:bg-canvas hover:text-ink'
                }`
              }
            >
              {t(item.key)}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

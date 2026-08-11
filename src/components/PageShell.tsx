import { useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useResumeStore } from '../store/useResumeStore'
import { applyHtmlLang } from '../utils/language'

export default function PageShell({
  children,
  pathname,
}: {
  children: React.ReactNode
  pathname?: string
}) {
  const lang = useResumeStore((s) => s.lang)

  useEffect(() => {
    applyHtmlLang(lang)
  }, [lang])

  return (
    <div className="app-shell flex min-h-screen flex-col bg-canvas text-ink">
      <Header pathname={pathname} />
      {children}
      <Footer />
    </div>
  )
}

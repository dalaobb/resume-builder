import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import PrivacyPage from './pages/PrivacyPage'
import PrintResume from './components/PrintResume'
import { useResumeStore } from './store/useResumeStore'
import { applyHtmlLang } from './utils/language'

export default function App() {
  const lang = useResumeStore((s) => s.lang)

  useEffect(() => {
    applyHtmlLang(lang)
  }, [lang])

  return (
    <>
      <div className="app-shell flex min-h-screen flex-col bg-canvas text-ink">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </div>
      <PrintResume />
    </>
  )
}

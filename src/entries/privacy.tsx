import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PageShell from '../components/PageShell'
import PrivacyPage from '../pages/PrivacyPage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageShell>
      <PrivacyPage />
    </PageShell>
  </StrictMode>,
)

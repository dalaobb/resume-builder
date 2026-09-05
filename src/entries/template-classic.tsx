import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PageShell from '../components/PageShell'
import TemplatePage from '../pages/TemplatePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageShell pathname="/template/classic">
      <TemplatePage templateId="classic" />
    </PageShell>
  </StrictMode>,
)

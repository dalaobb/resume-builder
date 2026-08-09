import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PageShell from '../components/PageShell'
import CreatePage from '../pages/CreatePage'
import PrintResume from '../components/PrintResume'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageShell>
      <CreatePage />
    </PageShell>
    <PrintResume />
  </StrictMode>,
)

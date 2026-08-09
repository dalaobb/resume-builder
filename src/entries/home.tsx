import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../index.css'
import PageShell from '../components/PageShell'
import HomePage from '../pages/HomePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PageShell>
      <HomePage />
    </PageShell>
  </StrictMode>,
)

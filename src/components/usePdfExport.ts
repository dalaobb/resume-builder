import { printResume } from '../utils/pdf'

export function usePdfExport() {
  const handleExport = () => {
    printResume()
  }

  return { handleExport }
}

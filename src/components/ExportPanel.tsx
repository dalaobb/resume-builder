import { useI18n } from '../i18n'
import { usePdfExport } from './usePdfExport'

export default function ExportPanel() {
  const { t } = useI18n()
  const { handleExport } = usePdfExport()

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-white p-8">
      <div className="text-center">
        <h3 className="text-base font-semibold text-ink">{t('editor.exportTab')}</h3>
        <p className="mt-1 text-sm text-ink-muted">{t('editor.exportHint')}</p>
      </div>
      <button
        type="button"
        onClick={handleExport}
        className="rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-dark"
      >
        {t('common.exportPdf')}
      </button>
      <div className="w-full max-w-sm rounded-lg border border-line bg-canvas p-4 text-left">
        <p className="mb-2 text-xs font-semibold text-ink">{t('editor.exportTipsTitle')}</p>
        <ul className="space-y-1.5 text-xs leading-relaxed text-ink-muted">
          <li>{t('editor.exportTipDesktop')}</li>
          <li>{t('editor.exportTipIos')}</li>
          <li>{t('editor.exportTipAndroid')}</li>
        </ul>
      </div>
    </div>
  )
}

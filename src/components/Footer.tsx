import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="border-t border-line bg-white py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4 text-center">
        <p className="text-sm font-medium text-ink">{t('common.appName')}</p>
        <p className="text-xs text-ink-muted">{t('common.appSlogan')}</p>
      </div>
    </footer>
  )
}

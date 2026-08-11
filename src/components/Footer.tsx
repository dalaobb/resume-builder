import { useI18n } from '../i18n'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line bg-white py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-1 px-4 text-center">
        <p className="text-sm font-medium text-ink">{t('common.appName')}</p>
        <p className="text-xs text-ink-muted">{t('common.appSlogan')}</p>
        <p className="mt-2 text-xs text-ink-muted">{t('common.footerCopyright', { year })} · By <a className="hover:underline" href="https://dalaobb.com" target="_blank">DaLaoBB</a></p>
      </div>
    </footer>
  )
}

import { useI18n } from '../i18n'

export default function PrivacyPage() {
  const { t, msg } = useI18n()

  return (
    <div className="flex-1 bg-canvas">
      <div className="mx-auto max-w-2xl px-4 py-14 md:py-20">
        <h1 className="text-3xl font-bold text-ink">{t('privacy.title')}</h1>
        <p className="mt-1 text-xs text-ink-faint">
          {t('privacy.updateDate')}: 2026-08
        </p>
        <p className="mt-6 text-sm leading-relaxed text-ink">{t('privacy.intro')}</p>
        <div className="mt-8 space-y-4">
          {msg.privacy.items.map((item) => (
            <div key={item.title} className="rounded-xl border border-line bg-white p-5">
              <h2 className="font-semibold text-ink">{item.title}</h2>
              <p className="mt-1 text-sm text-ink-muted">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          {t('privacy.note')}
        </p>
      </div>
    </div>
  )
}

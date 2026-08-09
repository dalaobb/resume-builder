import { useResumeStore } from '../store/useResumeStore'
import { useI18n } from '../i18n'
import { templates } from '../templates'

export default function TemplateSelector() {
  const templateId = useResumeStore((s) => s.templateId)
  const setTemplateId = useResumeStore((s) => s.setTemplateId)
  const showIcons = useResumeStore((s) => s.showIcons)
  const setShowIcons = useResumeStore((s) => s.setShowIcons)
  const resume = useResumeStore((s) => s.resume)
  const { t, lang } = useI18n()

  return (
    <div className="p-4">
      <h3 className="mb-3 text-sm font-semibold text-ink">{t('editor.templateTitle')}</h3>
      <div className="space-y-3">
        {templates.map((tmpl) => {
          const active = tmpl.id === templateId
          const Preview = tmpl.Preview
          return (
            <button
              key={tmpl.id}
              type="button"
              onClick={() => setTemplateId(tmpl.id)}
              className={`w-full rounded-lg border-2 p-2 text-left transition ${
                active ? 'border-accent' : 'border-line hover:border-accent/50'
              }`}
            >
              <div className="mb-1.5 flex items-center justify-between px-1">
                <span className={`text-sm font-medium ${active ? 'text-accent-dark' : 'text-ink'}`}>
                  {t(tmpl.nameKey)}
                </span>
                {active && <span className="text-xs text-accent-dark">✓</span>}
              </div>
              <div className="pointer-events-none h-[71.3mm] w-[50.4mm] overflow-hidden rounded bg-white shadow-sm">
                <div className="w-[210mm] origin-top-left scale-[0.24]">
                  <Preview data={resume} lang={lang} showIcons={showIcons} />
                </div>
              </div>
            </button>
          )
        })}

        <button
          type="button"
          role="switch"
          aria-checked={showIcons}
          onClick={() => setShowIcons(!showIcons)}
          className="flex w-full items-center justify-between rounded-lg border border-line p-3 text-left transition hover:border-accent/50"
        >
          <span className="text-sm text-ink">{t('editor.showIcons')}</span>
          <span
            className={`flex h-5 w-9 items-center rounded-full p-0.5 transition ${
              showIcons ? 'bg-accent' : 'bg-line'
            }`}
          >
            <span
              className={`h-4 w-4 rounded-full bg-white shadow transition-transform ${
                showIcons ? 'translate-x-4' : ''
              }`}
            />
          </span>
        </button>
      </div>
    </div>
  )
}

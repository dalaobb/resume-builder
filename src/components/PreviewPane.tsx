import { useResumeStore } from '../store/useResumeStore'
import { useI18n } from '../i18n'
import { getTemplate } from '../templates'
import { ScaledResume } from './ScaledResume'

export default function PreviewPane() {
  const resume = useResumeStore((s) => s.resume)
  const templateId = useResumeStore((s) => s.templateId)
  const showIcons = useResumeStore((s) => s.showIcons)
  const { lang, t } = useI18n()
  const template = getTemplate(templateId)
  const TemplatePreview = template.Preview

  return (
    <div className="h-full overflow-y-auto bg-canvas">
      <div className="px-4 py-3">
        <p className="mb-2 text-center text-xs text-ink-faint">{t('editor.previewHint')}</p>
        <ScaledResume>
          <TemplatePreview data={resume} lang={lang} showIcons={showIcons} />
        </ScaledResume>
      </div>
    </div>
  )
}
